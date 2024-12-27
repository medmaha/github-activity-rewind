"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  MessageCircle,
  Twitter,
  Facebook,
  Instagram,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AIGeneratedResponse, AnalyzedData } from "@/lib/types";
import useAIQuery from "@/hooks/useAIQuery";
import { Accordion } from "./ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

interface AIInsightsDisplayProps {
  userData: AnalyzedData;
}

export default function AIInsightsDisplay({
  userData,
}: AIInsightsDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { data, isLoading } = useAIQuery(userData);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  if (!data) return;

  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          <Sparkles className="inline-block mr-2 text-yellow-400" />
          Your AI-Powered GitHub Insights
        </CardTitle>
        <CardDescription className="text-center text-gray-300">
          Discover the story behind your code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Accordion
          key={userData.user.username}
          type="multiple"
          defaultValue={["2024 Summary"]}
          className="space-y-6"
        >
          {!!data.summary?.trim() && (
            <Section
              title="2024 Summary"
              content={data.summary}
              isExpanded={isExpanded("summary")}
              onToggle={() => toggleSection("summary")}
            />
          )}

          {!!data.YearlyOverview?.trim() && (
            <Section
              title="Yearly Overview"
              content={data.YearlyOverview}
              isExpanded={isExpanded("overview")}
              onToggle={() => toggleSection("overview")}
            />
          )}
          {!!data.mostSignificantAchievement?.trim() && (
            <Section
              title="Most Significant Achievement"
              content={data.mostSignificantAchievement}
              isExpanded={isExpanded("achievement")}
              onToggle={() => toggleSection("achievement")}
            />
          )}
          {!!data.areasForPotentialGrowth?.trim() && (
            <Section
              title="Areas for Growth"
              content={data.areasForPotentialGrowth}
              isExpanded={isExpanded("growth")}
              onToggle={() => toggleSection("growth")}
            />
          )}
        </Accordion>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Share Your Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="linkedin" className="w-full ">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="linkedin">
                  <MessageCircle className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  <Twitter className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="facebook">
                  <Facebook className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="instagram">
                  <Instagram className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="linkedin" className="mt-4">
                <SocialPost
                  platform="LinkedIn"
                  content={data.posts.linkedPost}
                />
              </TabsContent>
              <TabsContent value="twitter" className="mt-4">
                <SocialPost
                  platform="Twitter"
                  content={data.posts.twitterPost}
                />
              </TabsContent>
              <TabsContent value="facebook" className="mt-4">
                <SocialPost
                  platform="Facebook"
                  content={data.posts.facebookPost}
                />
              </TabsContent>
              <TabsContent value="instagram" className="mt-4">
                <SocialPost
                  platform="Instagram"
                  content={data.posts.instagramPost}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4 text-center">
          <p className="text-lg font-medium text-gray-300">
            {data.encouragementText}
          </p>
          <p className="text-xl font-bold text-yellow-400">
            {data.motivationMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({
  title,
  content,
  isExpanded,
  onToggle,
}: {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <AccordionItem value={title}>
      <Card className="bg-gray-700 border-gray-700 text-white">
        <AccordionTrigger className="w-full" asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full p-4 h-12 hover:bg-gray-600 hover:text-white items-center justify-between text-left flex"
          >
            {title}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </AccordionTrigger>
        {isExpanded && (
          <CardContent className="p-0 px-4 pb-4 pt-1">
            <AccordionContent>
              <p className="text-gray-300 leading-relaxed">{content}</p>
            </AccordionContent>
          </CardContent>
        )}
      </Card>
    </AccordionItem>
  );
}

function StyleCard({ title, content }: { title: string; content: string }) {
  return (
    <Card className="bg-gray-700 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{content}</p>
      </CardContent>
    </Card>
  );
}

function SocialPost({
  platform,
  content,
}: {
  platform: string;
  content: string;
}) {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">{platform} Post</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-300">{content}</p>
        <Button className="mt-4 w-full">Share on {platform}</Button>
      </CardContent>
    </Card>
  );
}
