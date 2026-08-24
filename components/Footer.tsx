import { LinkIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="text-card-foreground py-6 bg-linear-to-br to-background from-card-800">
      <div className="flex space-x-4 items-center justify-center">
        <Link
          href="https://linkedin.com/in/medmaha"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground text-foreground/90 transition-colors"
        >
          <LinkIcon className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
      <div className="container mx-auto px-4">
        <div className="mt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} GitHub Rewind. All rights
            reserved. offered by{" "}
            <a
              href="https://linkedin.com/in/mtouray101"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <strong>Touray Mahammed</strong>
            </a>
          </p>
          <div className="mt-2">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
