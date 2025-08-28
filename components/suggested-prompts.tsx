import { SUGGESTED_PROMPTS } from "@/lib/constants";

export function SuggestedPrompts({
  onPromptSelect,
}: {
  onPromptSelect: (prompt: string) => void;
}) {
  return (
    <div className="w-full mt-4 px-2">
      <h3 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Try these prompts:
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
        {SUGGESTED_PROMPTS.map((v) => (
          <button
            key={v.title}
            type="button"
            onClick={() => onPromptSelect(v.description)}
            className="w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-normal break-words"
          >
            {v.title}
          </button>
        ))}
      </div>
    </div>
  );
}