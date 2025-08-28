import { SUGGESTED_PROMPTS } from "@/lib/constants";

export function SuggestedPrompts({
  onPromptSelect,
}: {
  onPromptSelect: (prompt: string) => void;
}) {
  return (
    <div className="w-full mt-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 px-2">
        Try these prompts:
      </h3>
      <div className="relative">
        <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-hide px-2">
          {SUGGESTED_PROMPTS.map((v) => (
            <button
              key={v.title}
              type="button"
              onClick={() => onPromptSelect(v.description)}
              className="flex-shrink-0 px-3 py-1.5 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
            >
              {v.title}
            </button>
          ))}
        </div>
        {/* Hide scrollbar on mobile but keep functionality */}
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}