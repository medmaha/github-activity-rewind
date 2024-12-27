export interface AnalyzedData {
  totalContributions: number;
  topRepositories: any[];
  languagesUsed: Record<string, number>;
  followers: number;
  publicRepos: number;
  pullRequests: number;
  starsEarned: number;
  recentEvents: {
    type?: string | null;
    payload: Record<string, any>;
  }[];
  user: {
    name: string;
    bio: string;
    username: string;
    avatar: string;
  };
}

export interface AIGeneratedResponse {
  summary: string;
  YearlyOverview: string;
  mostSignificantAchievement: string;
  areasForPotentialGrowth: string;

  userStyle: {
    vibe: string;
    superpower: string;
    topQuote: string;
  };

  posts: {
    linkedPost: string;
    twitterPost: string;
    facebookPost: string;
    instagramPost: string;
  };

  encouragementText: string;
  motivationMessage: string;
}
