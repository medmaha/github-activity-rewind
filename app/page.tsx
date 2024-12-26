import GitHubForm from '@/components/GitHubForm'
import { GithubIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <GithubIcon className="h-20 w-20 text-white" />
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            GitHub Rewind 2024
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-2xl">
            Discover your GitHub journey through an AI-powered year in review. Generate stunning visuals and insights to share your coding achievements.
          </p>
          <GitHubForm />
        </div>
      </main>
    </div>
  )
}

