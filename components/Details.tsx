import React from "react";
import HighlightsCard from "./HighlightsCard";
import DownloadableCard from "./DownloadableCard";
import { AnalyzedData } from "@/lib/types";
import AIInsightsDisplay from "./AIInsightsDisplay";
import AchievementBadges from "./AchievementBadges";

type Props = {
  userData: AnalyzedData;
};

export default function Details({ userData }: Props) {
  return (
    <div className="mt-12 space-y-8 animate-fade-in-up max-w-4xl mx-auto">
      <div className="mx-auto max-w-2xl space-y-8">
        <HighlightsCard userData={userData} />
        <DownloadableCard
          userData={userData}
          username={userData.user.username}
        />
      </div>
      <AchievementBadges userData={userData} />
      {/* <LinkedInPost userData={userData} /> */}
      <AIInsightsDisplay userData={userData} />
    </div>
  );
}
