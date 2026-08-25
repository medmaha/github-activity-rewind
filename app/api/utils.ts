import arcjet, { detectBot, shield, fixedWindow } from "@arcjet/next";

export const arcjetMiddleware = arcjet({
    key: process.env.ARCJET_KEY!,
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
        fixedWindow({
            mode: "LIVE",
            window: "60s", // 60 second fixed window
            max: 2, // allow a maximum of 2 requests
        }),
    ],
});
