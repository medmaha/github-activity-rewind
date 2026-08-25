export type RewindProfile = {
    login: string;
    name: string | null;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    followers: number;
    following: number;
    createdAt: string;
    htmlUrl: string;
};

export type RepoSummary = {
    name: string;
    fullName: string;
    url: string;
    description: string | null;
    stars: number;
    forks: number;
    watchers: number;
    language: string | null;
    isPrivate: boolean;
    isFork: boolean;
    sizeKb: number;
    createdAt: string;
    pushedAt: string;
    topics: string[];
};

export type LanguageStat = {
    name: string;
    bytes: number;
    percent: number;
    repos: number;
};

export type Achievement = {
    id: string;
    title: string;
    description: string;
    tier: "bronze" | "silver" | "gold";
};

export type MonthlyPoint = { month: string; commits: number; repos: number };

export type RewindData = {
    year: number;
    scope: "public" | "authenticated";
    generatedAt: string;
    profile: RewindProfile;
    totals: {
        repos: number;
        reposCreatedThisYear: number;
        privateRepos: number;
        stars: number;
        forks: number;
        commits: number;
        commitsThisYear: number;
        prs: number;
        prsMerged: number;
        issues: number;
        reviews: number;
        estimatedLinesOfCode: number;
        linesEstimated: boolean;
        activeDays: number;
        longestStreak: number;
    };
    languages: LanguageStat[];
    topRepos: RepoSummary[];
    recentRepos: RepoSummary[];
    monthly: MonthlyPoint[];
    achievements: Achievement[];
    notes: string[];
    events: any;
};

export type AiInsights = {
    headline: string;
    yearlyOverview: string;
    significantAchievements: string[];
    areasOfGrowth: string[];
    codingStyle: string;
    personaTitle: string;
    shareCaption: string;
};
