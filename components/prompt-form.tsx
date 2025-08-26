"use client";

import { useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useS3Upload } from "next-s3-upload";
import Fieldset from "@/components/fieldset";
import { ScreenshotPreview } from "@/components/screenshot-preview";
import { ModelSelector } from "@/components/model-selector";
import { QualitySelector } from "@/components/quality-selector";
import { ScreenshotUploader } from "@/components/screenshot-uploader";
import { SubmitButton } from "@/components/submit-button";
import { SuggestedPrompts } from "@/components/suggested-prompts";
import { LoadingMessage } from "@/components/loading-message";
import { MODELS } from "@/lib/constants";
import { createChat } from "@/app/(main)/actions";
import { use } from "react";
import { Context } from "@/app/(main)/providers";
import assert from "assert";

export function PromptForm() {
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

  return (
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
        <SuggestedPrompts onPromptSelect={setPrompt} />
      </Fieldset>
    </form>
  );
}