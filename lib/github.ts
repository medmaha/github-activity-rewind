"use server";

import { Octokit } from "@octokit/rest";

import { readFileSync, writeFileSync } from "node:fs";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function fetchGitHubData(username: string) {
  const savedData = readFileSync("db.json", "utf-8");
  const parsedData: any[] = JSON.parse(savedData || "[]") || [];
  try {
    const user = await octokit.users.getByUsername({ username });
    const repos = await octokit.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });
    const events = await octokit.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });

    // Analyze the data to extract relevant information
    const analyzedData = {
      totalContributions: calculateTotalContributions(events.data),
      topRepositories: getTopRepositories(repos.data),
      languagesUsed: await getLanguagesUsed(repos.data),
      followers: user.data.followers,
      publicRepos: user.data.public_repos,
      pullRequests: calculatePullRequests(events.data),
      starsEarned: calculateStarsEarned(events.data),
    };

    parsedData.push(analyzedData);
    writeFileSync("public/data.json", JSON.stringify(parsedData));

    return analyzedData;
  } catch (error) {
    const cachedData = parsedData.find(
      (data: any) => data.username === username
    );
    if (cachedData) {
      return cachedData;
    }
    if (error instanceof Error) {
      throw new Error(`GitHub API Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching GitHub data");
    }
  }
}

function calculateTotalContributions(events: any[]): number {
  return events.filter((event) =>
    ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(event.type)
  ).length;
}

function getTopRepositories(repos: any[]): any[] {
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      description: repo.description,
    }));
}

async function getLanguagesUsed(repos: any[]): Promise<Record<string, number>> {
  const languages: Record<string, number> = {};
  for (const repo of repos) {
    const repoLanguages = await octokit.repos.listLanguages({
      owner: repo.owner.login,
      repo: repo.name,
    });
    Object.entries(repoLanguages.data).forEach(([lang, bytes]) => {
      languages[lang] = (languages[lang] || 0) + bytes;
    });
  }
  return languages;
}

function calculatePullRequests(events: any[]): number {
  return events.filter((event) => event.type === "PullRequestEvent").length;
}

function calculateStarsEarned(events: any[]): number {
  return events.filter((event) => event.type === "WatchEvent").length;
}
