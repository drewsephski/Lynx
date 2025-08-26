import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { MODELS } from "@/lib/constants";

export function ModelSelector({
  model,
  setModel,
}: {
  model: string;
  setModel: (model: string) => void;
}) {
  const selectedModel = MODELS.find((m) => m.value === model);

  return (
    <Select.Root
      name="model"
      value={model}
      onValueChange={setModel}
    >
      <Select.Trigger className="inline-flex items-center gap-1 rounded-md p-1 text-sm text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300">
        <Select.Value aria-label={model}>
          <span>{selectedModel?.label}</span>
        </Select.Value>
        <Select.Icon>
          <ChevronDownIcon className="size-3" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content 
          className="overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50 relative"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="space-y-1 p-2">
            {MODELS.map((m) => (
              <Select.Item
                key={m.value}
                value={m.value}
                className="flex cursor-pointer items-center gap-1 rounded-md p-1 text-sm data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-700 data-[highlighted]:outline-none"
              >
                <Select.ItemText className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  {m.label}
                </Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon className="size-3 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}