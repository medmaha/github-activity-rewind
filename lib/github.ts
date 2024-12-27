"use server";

import { Octokit } from "@octokit/rest";

import { readFileSync, writeFileSync } from "node:fs";
import { AnalyzedData } from "./types";
import { protectRequest } from "./req.middleware";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function fetchGitHubData(username: string): Promise<AnalyzedData> {
  // Dev Only
  // const savedData = readFileSync("db.json", "utf-8");
  // const parsedData: any[] = JSON.parse(savedData || "[]") || [];

  try {
    // const cachedData = parsedData.find(
    //   (data: any) => data.analysis.user.username === username
    // );
    // if (cachedData) {
    //   return cachedData.analysis;
    // }
    protectRequest();
    // throw new Error("");
    const [user, repos, events] = await Promise.all([
      octokit.users.getByUsername({ username }),

      octokit.repos.listForUser({
        username,
        sort: "updated",
        per_page: 100,
      }),

      octokit.activity.listPublicEventsForUser({
        username,
        per_page: 100,
      }),
    ]);

    // Analyze the data to extract relevant information
    const analyzedData: AnalyzedData = {
      recentEvents: recentEvents(events.data),
      totalContributions: calculateTotalContributions(events.data),
      topRepositories: getTopRepositories(repos.data),
      languagesUsed: await getLanguagesUsed(repos.data),
      followers: user.data.followers,
      publicRepos: user.data.public_repos,
      pullRequests: calculatePullRequests(events.data),
      starsEarned: calculateStarsEarned(events.data),
      user: {
        username,
        avatar: user.data.avatar_url,
        bio: user.data.bio!,
        name: user.data.name!,
      },
    };

    // Dev Only
    // parsedData.push({
    // meta: { user: user.data, repos: repos.data, events: events.data },
    // analysis: analyzedData,
    // });

    // writeFileSync("db.json", JSON.stringify(parsedData));

    return analyzedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error! ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching GitHub data");
    }
  }
}

function recentEvents(
  events: Awaited<
    ReturnType<typeof octokit.activity.listPublicEventsForUser>
  >["data"]
) {
  return events
    .filter((event) =>
      ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(event.type!)
    )
    .map((event) => ({
      type: event.type,
      payload: event.payload,
      created_at: event.created_at,
    }));
}
function calculateTotalContributions(
  events: Awaited<
    ReturnType<typeof octokit.activity.listPublicEventsForUser>
  >["data"]
): number {
  return events.filter((event) =>
    ["PushEvent", "PullRequestEvent", "IssuesEvent"].includes(event.type!)
  ).length;
}

function getTopRepositories(
  repos: Awaited<ReturnType<typeof octokit.repos.listForUser>>["data"]
): any[] {
  return repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      description: repo.description,
      created_at: repo.created_at,
      pushed_at: repo.pushed_at,
      forked: repo.forks_count,
    }));
}

async function getLanguagesUsed(
  repos: Awaited<ReturnType<typeof octokit.repos.listForUser>>["data"]
): Promise<Record<string, number>> {
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

function calculatePullRequests(
  events: Awaited<
    ReturnType<typeof octokit.activity.listPublicEventsForUser>
  >["data"]
): number {
  return events.filter((event) => event.type === "PullRequestEvent").length;
}

function calculateStarsEarned(
  events: Awaited<
    ReturnType<typeof octokit.activity.listPublicEventsForUser>
  >["data"]
): number {
  return events.filter((event) => event.type === "WatchEvent").length;
}
