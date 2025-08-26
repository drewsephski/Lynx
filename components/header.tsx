import LynxLogo from "@/components/icons/lynx-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative mx-auto flex w-full shrink-0 items-center justify-between py-6 px-4">
      <Link href="/">
        <LynxLogo className="h-9" />
      </Link>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="ml-auto hidden items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 hover:shadow-md sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-100 dark:text-blue-200"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">Lightning Fast</span>
            <span className="font-medium">AI Generation</span>
          </div>
        </div>
      </div>
    </header>
  );
}