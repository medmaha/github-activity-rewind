import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalyzedData } from "@/lib/types";
import { GitBranch, GitCommit, GitPullRequest, Star, Users } from "lucide-react";
import Image from "next/image";

type Props = {
    userData: AnalyzedData;
};

export default function HighlightsCard({ userData }: Props) {
    const stats = [
        {
            icon: GitCommit,
            label: "Contributions",
            value: userData.totalContributions,
        },
        { icon: Users, label: "Followers", value: userData.followers },
        { icon: GitBranch, label: "Repositories", value: userData.publicRepos },
        {
            icon: GitPullRequest,
            label: "Pull Requests",
            value: userData.pullRequests,
        },
        { icon: Star, label: "Stars Earned", value: userData.starsEarned },
    ];

    const year = new Date().getFullYear();

    return (
        <Card className="bg-gray-800 text-white border-gray-700">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {year} GitHub Highlights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center gap-4 pb-8">
                    <Image
                        priority
                        fetchPriority="high"
                        src={userData.user.avatar || "https://picsum.photos/200"}
                        alt={userData.user.name}
                        width={100}
                        height={100}
                        className="rounded-full border border-muted-foreground motion-duration-2000 motion-preset-confetti"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg"
                        >
                            <stat.icon className="h-8 w-8 mb-2 text-purple-400" />
                            <span className="text-sm text-gray-300 text-center">{stat.label}</span>
                            <span className="text-2xl font-bold">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
