import { generateAIInsights } from "@/lib/ai";
import { AIGeneratedResponse, AnalyzedData } from "@/lib/types";
import { useQuery } from "react-query";

export default function useAIQuery(userData: AnalyzedData) {
  const query = useQuery<AIGeneratedResponse>({
    enabled: !!userData.user,
    staleTime: Infinity,
    queryKey: [userData?.user.username],
    queryFn: async () => {
      if (!userData) return null;

      const savedData = localStorage.getItem("data");
      if (savedData) return JSON.parse(savedData);
      return generateAIInsights(userData);
    },
  });

  return query;
}
