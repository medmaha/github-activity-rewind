"use client"

import { FeedbackButton } from "@/components/FeedbackButton";
import { Footer } from "@/components/Footer";
import GitHubForm from "@/components/rewind/GitHubForm";

import { GitBranch, RotateCcw, Sparkles } from "lucide-react";

import { InsightsPanel } from "@/components/rewind/InsightsWidgets";
import { HighlightCard } from "@/components/rewind/HighlightCard";
import { SharePanel } from "@/components/rewind/SharePanel";
import {
  StatsGrid,
  ProfileWidget,
  LanguagesWidget,
  ActivityWidget,
  ReposWidget,
  AchievementsWidget,
} from "@/components/rewind/StatsWidgets";
import { GhButton, Chip, Panel } from "@/components/rewind/primitives";
import { useRewindStore } from "@/store/rewind-store";

export default function Home() {
  const { data, status, error, insights, reset } = useRewindStore();

  return (
    <main className="min-h-screen bg-background pb-20 text-foreground">
      <header className="border-b border-border bg-(--elevated)/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-elevated text-foreground">
              <GitBranch className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">GitHub Rewind</p>
              <p className="text-[11px] text-muted-foreground">Year in code, analyzed</p>
            </div>
          </div>
          {data ? (
            <GhButton variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" />
              New rewind
            </GhButton>
          ) : (
            <Chip tone="primary">
              <Sparkles className="size-3" /> AI powered
            </Chip>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-4 px-4 py-6 sm:px-6 sm:py-8">
        {!data ? (
          <section className="pb-2 text-center sm:pb-4">
            <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
              Your <span className="text-gradient">GitHub year</span>, rewound
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              Pull a full breakdown of commits, pull requests, issues, languages and achievements,
              then get an AI year-in-review and a highlight card built for LinkedIn.
            </p>
          </section>
        ) : null}

        <GitHubForm />

        {status === "error" && error ? (
          <Panel className="border-destructive/40">
            <p className="text-sm text-destructive">{error}</p>
          </Panel>
        ) : null}

        {data ? (
          <div className="space-y-4">
            <ProfileWidget data={data} />
            <StatsGrid data={data} />
            <InsightsPanel data={data} />
            <div className="grid gap-4 lg:grid-cols-2">
              <LanguagesWidget data={data} />
              <ActivityWidget data={data} />
              <ReposWidget data={data} />
              <AchievementsWidget data={data} />
            </div>
            <HighlightCard data={data} insights={insights} />
            <SharePanel data={data} insights={insights} />
            {data.notes.length ? (
              <Panel>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Data notes
                </p>
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {data.notes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </Panel>
            ) : null}
          </div>
        ) : null}
      </div>

      <FeedbackButton />
      <Footer />
    </main>
  );
}

