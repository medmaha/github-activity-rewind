"use server";

import { Octokit } from "@octokit/rest";

import { AnalyzedData } from "./types";
import { after } from "next/server";
import { recordUserActivity } from "./record";
import { enforceRateLimit } from "./rate-limit.server";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export async function fetchGitHubData(
  username: string
): Promise<AnalyzedData | { err: string }> {
  // Dev Only
  // const savedData = readFileSync("db.json", "utf-8");
  // const parsedData: any[] = JSON.parse(savedData || "[]") || [];

  let notFound = false;
  try {
    await enforceRateLimit("api");
    // const cachedData = parsedData.find(
    //   (data: any) => data.analysis.user.username === username
    // );
    // if (cachedData) {
    //   return cachedData.analysis;
    // }
    // throw new Error("");
    const [user, repos, events] = await Promise.all([
      (async () => {
        const user = await octokit.users.getByUsername({ username });
        if (user.status === 200) return user;
        notFound = true;
        throw Error("This username does not exists");
      })(),
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

    after(recordUserActivity(user.data.login, user.data.email || undefined));

    // Dev Only
    // parsedData.push({
    // meta: { user: user.data, repos: repos.data, events: events.data },
    // analysis: analyzedData,
    // });

    // writeFileSync("db.json", JSON.stringify(parsedData));

    return analyzedData;
  } catch (error: any) {
    return {
      err: `Error! ${error?.message || "An unknown error occurred while fetching GitHub data"
        }`,
    };
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
