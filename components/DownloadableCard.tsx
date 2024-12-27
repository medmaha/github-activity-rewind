"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnalyzedData } from "@/lib/types";

interface DownloadableCardProps {
  userData: AnalyzedData;
  username: string;
}

export default function DownloadableCard({
  userData,
  username,
}: DownloadableCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (2x for retina displays)
    canvas.width = 1200;
    canvas.height = 730;

    // Create gradient background
    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height
    );
    gradient.addColorStop(0, "#4c1d95"); // deep purple
    gradient.addColorStop(1, "#000000"); // deep blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add rounded corners
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
    ctx.clip();

    // Set text styles
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "top";

    // Draw the github image
    const image = document.createElement("img");
    const imageSize = 50;
    image.width = imageSize;
    image.height = imageSize;
    image.onload = () => {
      // Calculate the scale factor to fit the image within the canvas
      const scale = Math.min(
        canvas.width / imageSize / 2,
        canvas.height / imageSize / 2
      );

      // Calculate the centered position for the image
      const x = (canvas.width - imageSize * scale) / 2;
      const y = (canvas.height - imageSize * scale) / 2;

      // Draw the image centered on the canvas
      image.style.opacity = "0.1";

      ctx.drawImage(image, x, y, imageSize * scale, imageSize * scale);
      drawContent(userData, canvas, ctx);
    };
    image.src = "/github.png";
  }, [userData.user.username]);

  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `${username}-github-rewind-2024.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <Card className="p-4 bg-gray-800 border-gray-700">
      {/* <pre className="text-white text-wrap">
        <code>{JSON.stringify(aiResponse.data?.userStyle)}</code>
      </pre> */}
      <div className="space-y-4">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
          }}
        />
        <Button
          onClick={handleDownload}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Card
        </Button>
      </div>
    </Card>
  );
}

function drawContent(
  userData: AnalyzedData,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // Draw header
  ctx.font = "bold 72px Inter";
  ctx.fillText(`${userData.user.name}`, 60, 60);

  // =========================== Style Section ===================
  ctx.font = "bold 40px Inter";
  ctx.fillStyle = "#888888";
  ctx.fillText(new Date().getFullYear().toString() + " Mood", 60, 180);

  ctx.font = "bold 60px Inter";
  ctx.fillStyle = "#ffffff";
  const vibes = getVibe();
  vibes.forEach((role, index) => {
    ctx.fillText(role.trim(), 60, 240 + index * 70);
  });

  // ========================== Draw stats ===========================
  const stats = [
    `${userData.totalContributions} contributions`,
    `${userData.followers} followers`,
    `${userData.publicRepos} repositories`,
    `${userData.pullRequests} pull requests`,
  ];

  ctx.font = "32px Inter";
  stats.forEach((stat, index) => {
    ctx.fillText(stat, 60, 480 + index * 40);
  });

  // =============================  Draw Superpower section ===================
  ctx.font = "bold 48px Inter";
  ctx.fillText("Superpower", canvas.width / 2 + 20, 180);

  ctx.font = "36px Inter";
  const superPowers = getSuperPower();
  let lineHeight = 0;
  for (const superpower of superPowers) {
    // ctx.clearRect(
    //   canvas.width / 2 + 20,
    //   250 + lineHeight,
    //   canvas.width - (canvas.width / 2 + 20),
    //   40
    // );
    ctx.fillText(superpower.trim(), canvas.width / 2 + 20, 250 + lineHeight);
    lineHeight += 40;
  }

  // ============================= Draw Top Quote section =====================
  ctx.font = "bold 48px Inter";
  ctx.fillText("Top Quote", canvas.width / 2 + 20, 390);

  ctx.font = "36px Inter";
  const quotes = getTopQuote();
  lineHeight = 0;
  for (const quote of quotes) {
    ctx.fillText(quote.trim(), canvas.width / 2 + 20, 450 + lineHeight);
    lineHeight += 40;
  }

  // ============================= Draw footer ==============================
  ctx.font = "32px Inter";
  ctx.fillStyle = "#60a5fa"; // light blue
  ctx.fillText(
    `${new Date().getFullYear()} GitHub Rewind`,
    60,
    canvas.height - 60
  );
  ctx.fillText(
    "Get yours at https://github-r.vercel.app",
    canvas.width / 2 + 20,
    canvas.height - 60
  );
}

const vibes = [
  ["Developer, builder, and creator."],
  ["Innovator, problem solver, and learner."],
  ["Collaborator, communicator and, team player."],
  ["Enthusiast, passionate, and driven."],
  ["Curious, inquisitive and, eager to learn."],
  ["Resilient, adaptable and, always improving."],
  ["A lifelong, learner constantly, growing."],
  ["A creative, problem-solver, finding solutions."],
  ["Technologist, coding enthusiast, and innovator."],
  ["A dedicated, and passionate, learner."],
  ["Open-minded, curious and, always exploring."],
  ["Driven by, challenges eager, to contribute."],
];

const getVibe = () => {
  return vibes[Math.floor(Math.random() * vibes.length)][0].split(",");
};

const superPowers = [
  ["Building bridges, between learning and, innovation."],
  ["Turning ideas into, reality with code."],
  ["Solving complex, problems with elegant, and efficient solutions."],
  ["Inspiring others to, learn and grow."],
  ["Mastering new, technologies and adapting, to change."],
  ["Communicating technical, concepts clearly and, concisely."],
  ["Working effectively, in a team and contributing, to shared goals."],
  ["Breaking down, complex challenges into, manageable steps."],
];

const getSuperPower = () => {
  return superPowers[Math.floor(Math.random() * superPowers.length)][0].split(
    ","
  );
};

const topQuotes = [
  ["Believe that every expert, you admire started as, a beginner."],
  ["Know that the only way to learn, is to do and to experiment."],
  ["Understand that the future belongs,  to those who learn and adapt."],
  ["Embrace challenges as, opportunities for growth, and learning."],
  ["Never stop learning and, exploring the vast world, of technology."],
  ["The most effective learning, happens through hands-on, experience."],
  ["Find joy in the learning process, and celebrate your progress."],
  ["Mistakes are valuable lessons, that lead to greater understanding."],
  ["Curiosity is the key to, unlocking new knowledge, and skills."],
  ["Collaboration and knowledge, sharing are essential for, growth."],
  [
    "The future of technology is, shaped by those who are passionate, and driven to learn.",
  ],
  [
    "Continuous learning is an, investment in your personal and, professional growth.",
  ],
];

const getTopQuote = () => {
  return topQuotes[Math.floor(Math.random() * topQuotes.length)][0].split(",");
};
