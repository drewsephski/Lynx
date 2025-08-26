import Header from "@/components/header";
import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import Fieldset from "@/components/fieldset";
import { ScreenshotPreview } from "@/components/screenshot-preview";
import { ModelSelector } from "@/components/model-selector";
import { QualitySelector } from "@/components/quality-selector";
import { ScreenshotUploader } from "@/components/screenshot-uploader";
import { SubmitButton } from "@/components/submit-button";
import { LoadingMessage } from "@/components/loading-message";
import { MODELS, SUGGESTED_PROMPTS } from "@/lib/constants";
import { createChat } from "@/app/(main)/actions";
import { use } from "react";
import { Context } from "@/app/(main)/providers";
import assert from "assert";

export function HeroSection() {
  const { setStreamPromise } = use(Context);
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS[0].value);
  const [quality, setQuality] = useState("high");
  const [screenshotUrl, setScreenshotUrl] = useState<string | undefined>(
    undefined,
  );
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const { uploadToS3 } = useS3Upload();
  const handleScreenshotUpload = async (event: any) => {
    if (prompt.length === 0) setPrompt("Build this");
    setQuality("low");
    setScreenshotLoading(true);
    let file = event.target.files[0];
    const { url } = await uploadToS3(file);
    setScreenshotUrl(url);
    setScreenshotLoading(false);
  };

  const textareaResizePrompt = prompt
    .split("\n")
    .map((text) => (text === "" ? "a" : text))
    .join("\n");

  const handleSuggestedPromptSelect = (description: string) => {
    setPrompt(description);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="isolate relative z-10 h-full flex flex-col overflow-hidden">
        <Header />
        
        <div className="mt-10 flex grow flex-col items-center px-4 lg:mt-16 overflow-hidden">
          <div className="mb-4 inline-flex shrink-0 items-center rounded-full border-[0.5px] bg-gradient-to-r from-blue-50 to-blue-100 px-7 py-2 text-xs text-blue-800 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] md:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2 text-blue-600"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-center">
              <span className="font-bold text-blue-700">LYNX</span> - Next generation AI app builder
            </span>
          </div>

          <h1 className="mt-4 text-balance text-center text-4xl leading-none text-gray-800 dark:text-gray-200 md:text-[64px] lg:mt-8">
            Turn your <span className="text-blue-600 dark:text-blue-400">idea</span>
            <br className="hidden md:block" /> into an{" "}
            <span className="text-blue-600 dark:text-blue-400">app</span>
          </h1>

          {/* Features List */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-700 dark:text-gray-300 lg:mt-8">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-blue-600 dark:text-blue-400"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium">Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-blue-600 dark:text-blue-400"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="font-medium">Precision AI</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-blue-600 dark:text-blue-400"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Production Ready</span>
            </div>
          </div>

          {/* Prompt Form */}
          <form
            className="relative w-full max-w-2xl pt-6 lg:pt-12"
            action={async (formData) => {
              startTransition(async () => {
                const { prompt, model, quality } = Object.fromEntries(formData);

                assert.ok(typeof prompt === "string");
                assert.ok(typeof model === "string");
                assert.ok(quality === "high" || quality === "low");

                const { chatId, lastMessageId } = await createChat(
                  prompt,
                  model,
                  quality,
                  screenshotUrl,
                );

                const streamPromise = fetch(
                  "/api/get-next-completion-stream-promise",
                  {
                    method: "POST",
                    body: JSON.stringify({ messageId: lastMessageId, model }),
                  },
                ).then((res) => {
                  if (!res.body) {
                    throw new Error("No body on response");
                  }
                  return res.body;
                });

                startTransition(() => {
                  setStreamPromise(streamPromise);
                  router.push(`/chats/${chatId}`);
                });
              });
            }}
          >
            <Fieldset>
              <div className="relative flex w-full max-w-2xl rounded-xl border-4 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 pb-10">
                <div className="w-full">
                  <ScreenshotPreview
                    screenshotUrl={screenshotUrl}
                    screenshotLoading={screenshotLoading}
                    isPending={isPending}
                    onRemove={() => setScreenshotUrl(undefined)}
                    fileInputRef={fileInputRef}
                  />
                  <div className="relative">
                    <div className="p-3">
                      <p className="invisible w-full whitespace-pre-wrap">
                        {textareaResizePrompt}
                      </p>
                    </div>
                    <textarea
                      placeholder="Build me a budgeting app..."
                      required
                      name="prompt"
                      rows={1}
                      className="peer absolute inset-0 w-full resize-none bg-transparent p-3 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus-visible:outline-none disabled:opacity-50 transition-colors duration-200"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          const target = event.target;
                          if (!(target instanceof HTMLTextAreaElement)) return;
                          target.closest("form")?.requestSubmit();
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ModelSelector model={model} setModel={setModel} />

                    <div className="h-4 w-px bg-gray-200 max-sm:hidden" />

                    <QualitySelector quality={quality} setQuality={setQuality} />
                    <div className="h-4 w-px bg-gray-200 max-sm:hidden" />
                    
                    <ScreenshotUploader 
                      onUpload={handleScreenshotUpload} 
                      fileInputRef={fileInputRef} 
                    />
                  </div>

                  <SubmitButton />
                </div>

                {isPending && (
                  <LoadingMessage
                    isHighQuality={quality === "high"}
                    screenshotUrl={screenshotUrl}
                  />
                )}
              </div>
              
              {/* Suggested Prompts */}
              <div className="mt-4 flex w-full flex-wrap justify-center gap-3">
                {SUGGESTED_PROMPTS.map((v) => (
                  <button
                    key={v.title}
                    type="button"
                    onClick={() => handleSuggestedPromptSelect(v.description)}
                    className="rounded bg-gray-200 dark:bg-gray-700 px-2.5 py-1.5 text-xs text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </Fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}