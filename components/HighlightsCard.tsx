import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GitBranch, GitCommit, GitPullRequest, Star, Users } from 'lucide-react'

export default function HighlightsCard({ userData }: { userData: any }) {
  const stats = [
    { icon: GitCommit, label: 'Contributions', value: userData.totalContributions },
    { icon: Users, label: 'Followers', value: userData.followers },
    { icon: GitBranch, label: 'Repositories', value: userData.publicRepos },
    { icon: GitPullRequest, label: 'Pull Requests', value: userData.pullRequests },
    { icon: Star, label: 'Stars Earned', value: userData.starsEarned },
  ]

  return (
    <Card className="bg-gray-800 text-white border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">2024 GitHub Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg">
              <stat.icon className="h-8 w-8 mb-2 text-purple-400" />
              <span className="text-sm text-gray-300">{stat.label}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

