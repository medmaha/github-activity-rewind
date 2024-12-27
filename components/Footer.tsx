import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 bg-gradient-to-br to-gray-900 from-gray-800">
      <div className="flex space-x-4 items-center justify-center">
        <Link
          href="https://linkedin.com/in/mtouray101"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Linkedin className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
      <div className="container mx-auto px-4">
        <div className="mt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} GitHub Rewind. All rights
            reserved. offered by <strong>Touray Mahammed</strong>
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
