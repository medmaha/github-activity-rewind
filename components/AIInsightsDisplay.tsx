"use client";

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
  Twitter,
  Facebook,
  Instagram,
  Loader2,
  InfoIcon,
  ChevronsUpDown,
  Linkedin,
  CopyIcon,
} from "lucide-react";
import { AnalyzedData } from "@/lib/types";
import useAIQuery from "@/hooks/useAIQuery";
import { Accordion } from "./ui/accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface AIInsightsDisplayProps {
  userData: AnalyzedData;
}

export default function AIInsightsDisplay({
  userData,
}: AIInsightsDisplayProps) {
  const { data, isLoading, error: queryError } = useAIQuery(userData);

  if (isLoading)
    return (
      <Card className="w-full min-h-[100px] p-8 bg-gray-800 border-gray-700 text-white motion-preset-fade-lg">
        <div className="flex flex-col gap-6 items-center justify-center h-full w-full">
          <p className="text-xl font-semibold">Generating AI Insights</p>
          <Loader2 className="w-10 h-10 stroke-[3px] animate-spin" />
        </div>
      </Card>
    );

  if (queryError || !data) {
    return (
      <Card className="w-full min-h-[100px] p-8 bg-gray-800 border-gray-700 motion-preset-fade-lg">
        <div className="flex flex-col gap-6 items-center text-red-600 justify-center h-full w-full">
          <InfoIcon className="w-10 h-10" />
          <p className="text-xl font-semibold">
            {(queryError as any).message ||
              "Unknown Error While generating insights"}
          </p>
        </div>
      </Card>
    );
  }

  const year = new Date().getFullYear();

  return (
    <Card className="w-full bg-gray-800 border-gray-700 text-white motion-preset-fade-lg">
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
        <Accordion type="multiple" className="space-y-6">
          {!!data.summary?.trim() && (
            <Section
              key={userData.user.username}
              title={`${year} Summary`}
              content={data.summary}
            />
          )}

          {!!data.YearlyOverview?.trim() && (
            <Section
              key={userData.user.username}
              title="Yearly Overview"
              content={data.YearlyOverview}
            />
          )}
          {!!data.mostSignificantAchievement?.trim() && (
            <Section
              key={userData.user.username}
              title="Most Significant Achievement"
              content={data.mostSignificantAchievement}
            />
          )}
          {!!data.areasForPotentialGrowth?.trim() && (
            <Section
              key={userData.user.username}
              title="Areas for Growth"
              content={data.areasForPotentialGrowth}
            />
          )}
        </Accordion>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Your Coding Style
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StyleCard
              title={`${new Date().getFullYear()} Vibe`}
              content={data.userStyle.vibe}
            />
            <StyleCard title="Superpower" content={data.userStyle.superpower} />
            <StyleCard title="Top Quote" content={data.userStyle.topQuote} />
          </CardContent>
        </Card>

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
                  <Linkedin className="w-5 h-5" />
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
                  icon={Linkedin}
                  content={data.posts.linkedPost}
                />
              </TabsContent>
              <TabsContent value="twitter" className="mt-4">
                <SocialPost
                  platform="Twitter"
                  icon={Twitter}
                  content={data.posts.twitterPost}
                />
              </TabsContent>
              <TabsContent value="facebook" className="mt-4">
                <SocialPost
                  platform="Facebook"
                  icon={Facebook}
                  content={data.posts.facebookPost}
                />
              </TabsContent>
              <TabsContent value="instagram" className="mt-4">
                <SocialPost
                  platform="Instagram"
                  icon={Instagram}
                  content={data.posts.instagramPost}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6 text-center">
          <p className="text-sm font-medium text-gray-300">
            {data.encouragementText}
          </p>
          <p className="text-sm font-bold text-yellow-400">
            {data.motivationMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <Card className="bg-gray-700 border-gray-700 text-white">
      <AccordionItem value={title}>
        <AccordionTrigger value={title} className="w-full" asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-full p-4 h-12 hover:bg-gray-600 hover:text-white items-center justify-between text-left flex"
          >
            {title}
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </AccordionTrigger>
        <AccordionContent className="motion-preset-fade-md">
          <CardContent className="p-0 px-4 pb-4 pt-1">
            <p className="text-gray-300 leading-relaxed">{content}</p>
          </CardContent>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );
}

function StyleCard({ title, content }: { title: string; content: string }) {
  return (
    <Card className="bg-gray-700 border-gray-700 text-white motion-preset-fade-md">
      <CardContent className="p-4 space-y-2">
        <div className="text-lg font-medium capitalize">{title}</div>
        <p className="text-sm text-gray-300 capitalize">{content}</p>
      </CardContent>
    </Card>
  );
}

function SocialPost({
  platform,
  content,
  icon: Icon,
}: {
  icon: any;
  platform: "LinkedIn" | "Twitter" | "Facebook" | "Instagram";
  content: string;
}) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  function copyContent() {
    if (!contentRef.current) return;
    if (copied) return;

    window.navigator.clipboard.writeText(contentRef.current?.innerText);
    toast("Copied");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  function postContent() {
    if (!sharable) return;
    if (!contentRef.current) return;
    if (copied) return;

    const year = new Date().getFullYear();
    const title = "Github Rewind " + year;
    const text = contentRef.current?.innerText;
    const hashtags = getHashtags(text);
    const cleanedText = cleanPostContent(text);

    let url: URL | undefined;

    switch (platform) {
      case "Twitter":
        const tContent =
          `
${title}
${cleanedText}

----
Get yours rewind at https://github-r.vercel.app 
----
`.trim() + "\n";

        url = new URL("https://x.com/intent/post");
        url.searchParams.set("text", tContent);
        url.searchParams.set("hashtags", hashtags.join(","));
        break;
      case "LinkedIn":
        const lContent = `
${title}
${cleanedText}

----
Get yours rewind at https://github-r.vercel.app 
----

${hashtags.map((h) => `#${h}`).join(" ")}
`.trim();

        url = new URL("https://www.linkedin.com/shareArticle");
        url.searchParams.set("text", lContent);
        break;
      default:
        break;
    }

    if (!url) return;

    const link = document.createElement("a");

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.href = url.toString();

    link.click();
    link.remove();
  }

  // Attempts to cleaned the AI generated for content for social medial posts
  function cleanPostContent(text: string) {
    // Used a regular expression to find and replace all hashtags
    const regex = /#\w+/g;
    const mdUrl = /(\[.+\))/g;
    const placeholders = /(\[.+\])/g;
    text = text
      .replace(regex, "")
      .replace(placeholders, "")
      .replace(mdUrl, "")
      .replace("https://github-r.vercel.app", "");
    return text.trim();
  }

  function getHashtags(text: string) {
    // Used a regular expression to find all hashtags
    const regex = /#\w+/g;
    const matches = text.match(regex);

    // If no hashtags are found, return an empty array
    if (!matches) {
      return [];
    }

    // Extract the hashtag text (remove the leading #)
    const hashtags = matches.map((match) => match.substring(1));

    return hashtags;
  }

  const sharable = ["LinkedIn", "Twitter"].includes(platform);

  return (
    <Card className="bg-gray-800 border-gray-700 text-white motion-preset-fade-md">
      <CardHeader>
        <CardTitle className="text-lg gap-2 font-medium inline-flex items-center">
          <Icon className="" />
          {platform} Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          contentEditable
          ref={contentRef}
          className="text-sm text-gray-300 leading-relaxed border focus:mb-4 border-transparent transition-all focus:p-2 rounded-md focus:border-purple-500"
        >
          {cleanPostContent(content)}
        </p>
        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Button
            onClick={copyContent}
            variant={"outline"}
            className={cn(
              "mt-4 text-black/80 flex-1 inline-flex gap-3",
              copied && "motion-preset-confetti"
            )}
          >
            <CopyIcon />
            {copied && "Copied"}
            {!copied && "Copy Post"}
          </Button>
          {sharable && (
            <Button
              onClick={postContent}
              className={cn("mt-4 flex-1 inline-flex gap-3")}
            >
              <Icon />
              Share on {platform}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
