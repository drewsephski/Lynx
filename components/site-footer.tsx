export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center justify-between space-y-4 px-5 pb-6 pt-8 text-center sm:flex-row sm:pt-4">
      <div className="flex flex-col items-center space-y-2 sm:items-start">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-600 dark:text-blue-400"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">LYNX</span>
        </div>
        <div className="font-medium text-gray-600 dark:text-gray-400">
          Built by{" "}
          <a
            href="https://github.com/drewsephski"
            className="font-semibold text-blue-600 dark:text-blue-400 underline-offset-4 transition hover:text-gray-700 dark:hover:text-gray-300 hover:underline"
          >
            drew
          </a>
          .
        </div>
      </div>
      <div className="flex flex-col items-center space-y-2 sm:items-end">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span>Precision AI Code Generation</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Lightning Fast Results</span>
        </div>
      </div>
    </footer>
  );
}