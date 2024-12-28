"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Moon,
  Code2,
  Bug,
  Rocket,
  Users,
  Star,
  GitFork,
  MessageSquare,
} from "lucide-react";
import { AnalyzedData } from "@/lib/types";

interface Achievement {
  icon: React.ElementType;
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  color: string;
}

interface AchievementBadgesProps {
  userData: AnalyzedData;
}

export default function AchievementBadges({
  userData,
}: AchievementBadgesProps) {
  const achievements: Achievement[] = [
    {
      icon: Moon,
      name: "Night Owl",
      description: "Made contributions during night hours (10 PM - 4 AM)",
      earned: userData.recentEvents.some((event) => {
        const value =
          event.created_at &&
          // Check if commit time falls within night hours
          new Date(event.created_at).getHours() >= 22;
        return value;
      }),
      color: "bg-indigo-500",
    },
    {
      icon: Code2,
      name: "Polyglot",
      description: `Used ${
        Object.keys(userData.languagesUsed).length
      }+ programming languages`,
      earned: Object.keys(userData.languagesUsed).length >= 2,
      progress: Object.keys(userData.languagesUsed).length,
      color: "bg-emerald-500",
    },
    {
      icon: Bug,
      name: "Bug Hunter",
      description: `Closed ${userData.pullRequests}+ issues`,
      earned: userData.pullRequests >= 1,
      progress: userData.pullRequests,
      color: "bg-red-500",
    },
    {
      icon: Rocket,
      name: "Fast Merger",
      description: "Average PR merge time under 24 hours",
      earned: false, // Still requires PR creation and merge timestamps
      color: "bg-blue-500",
    },
    // {
    //   icon: Users,
    //   name: "Team Player",
    //   description: "Collaborated with 10+ developers",
    //   earned: userData.collaborators >= 10, // Assuming you have collaborators data
    //   progress: userData.collaborators,
    //   color: "bg-purple-500",
    // },
    {
      icon: GitFork,
      name: "Project Starter",
      description: `Had ${
        userData.topRepositories.filter((r) => !!r.forked).length
      } repositories forked`,
      earned: userData.topRepositories.some((r) => r.forked),
      color: "bg-orange-500",
    },
    // {
    //   icon: MessageSquare,
    //   name: "Code Reviewer",
    //   description: `Left ${userData.reviewComments} PR comments`,
    //   earned: userData.reviewComments >= 100,
    //   progress: userData.reviewComments,
    //   color: "bg-teal-500",
    // },
    // Most Starred Repository Achievement
    {
      icon: Star,
      name: "Star Lord",
      description: `Your most starred repository is ${
        userData.topRepositories.length > 0
          ? userData.topRepositories[0].stars + " stars"
          : "unstarred"
      }`,
      earned: userData.topRepositories.some((r) => Number(r.stars) > 0),
      color: "bg-yellow-500",
    },
    // Newest Repository Achievement
    {
      icon: Code2,
      name: "Fresh Start",
      description: `Your newest repository is ${
        userData.topRepositories.length > 0
          ? userData.topRepositories.sort(
              (a, b) =>
                new Date(a.created_at).getMilliseconds() -
                new Date(b.created_at).getMilliseconds()
            )[0].name
          : "unnamed"
      }`,
      // earned: userData.topRepositories.length > 0,
      earned: false,
      color: "bg-teal-500",
    },
  ];

  const _achievements = achievements.filter((a) => a.earned);

  if (!_achievements.length) return null;

  const year = new Date().getFullYear();

  return (
    <Card className="bg-gray-800 text-white border-gray-700 motion-preset-fade-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {year} Achievements
        </CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ex
          corrupti autem at recusandae quasi?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center">
          {_achievements.map((achievement) => (
            <TooltipProvider key={achievement.name}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className={`
                      relative p-4 rounded-lg motion-preset-fade-sm
                      ${achievement.earned ? achievement.color : "bg-gray-700"} 
                      ${!achievement.earned && "opacity-50"}
                      transition-all duration-300 hover:scale-105
                    `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <achievement.icon className="w-8 h-8" />
                      <span className="font-semibold text-sm text-center">
                        {achievement.name}
                      </span>
                      {achievement.progress && !achievement.earned && (
                        <Badge variant="secondary" className="text-xs">
                          {achievement.progress}/100
                        </Badge>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="motion-preset-focus">
                  <p>{achievement.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
