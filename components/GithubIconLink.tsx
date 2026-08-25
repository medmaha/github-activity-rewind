import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    className?: string
    iconClassName?: string
    children?: ReactNode
}

export default function GithubIconLink({ className, iconClassName, children }: Props) {
    return (
        <Link
            href="https://github.com/medmaha/github-activity-rewind"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "hover:text-foreground text-foreground/90 transition-colors h-6 bg-white rounded-full inline-flex justify-center gap-2 items-center",
                className,
            )}
        >
            <Image
                src="/github.png"
                alt="github logo"
                width={20}
                height={20}
                className={cn("", iconClassName)}
            />
            {children}
            <span className="sr-only">Github</span>
        </Link>
    )
}