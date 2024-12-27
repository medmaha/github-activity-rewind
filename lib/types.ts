export interface AnalyzedData {
  totalContributions: number;
  topRepositories: {
    name: string;
    stars: string;
    description: string;
    created_at: string;
    pushed_at: string;
    forked: number | null;
  }[];
  languagesUsed: Record<string, number>;
  followers: number;
  publicRepos: number;
  pullRequests: number;
  starsEarned: number;
  recentEvents: {
    type: string | null;
    created_at: string | null;
    payload: {
      action?: string;
      issue?: Record<string, any>;
      comment?: Record<string, any>;
      pages?: {
        page_name?: string;
        title?: string;
        summary?: string | null;
        action?: string;
        sha?: string;
        html_url?: string;
      }[];
    };
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
