"use client";

import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchGitHubData } from "@/lib/github";
import { Loader2, GithubIcon } from "lucide-react";
import { AnalyzedData } from "@/lib/types";

const DetailsLazy = lazy(() => import("./Details"));

export default function GitHubForm() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<AnalyzedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubData(username.trim());
      setUserData(data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              autoFocus
              placeholder="Enter GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="pl-10 bg-gray-700 text-white border-gray-600 focus:border-purple-500 focus:ring-purple-500"
            />
            <GithubIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Rewind...
              </>
            ) : (
              "Generate Rewind"
            )}
          </Button>
        </form>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      {userData && (
        <Suspense>
          <DetailsLazy userData={userData} />
        </Suspense>
      )}
    </div>
  );
}
