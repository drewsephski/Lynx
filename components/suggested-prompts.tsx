import { SUGGESTED_PROMPTS } from "@/lib/constants";

export function SuggestedPrompts({
  onPromptSelect,
}: {
  onPromptSelect: (prompt: string) => void;
}) {
  return (
    <div className="mt-4 flex w-full flex-wrap justify-center gap-3">
      {SUGGESTED_PROMPTS.map((v) => (
        <button
          key={v.title}
          type="button"
          onClick={() => onPromptSelect(v.description)}
          className="rounded bg-gray-200 dark:bg-gray-700 px-2.5 py-1.5 text-xs text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          {v.title}
        </button>
      ))}
    </div>
  );
}