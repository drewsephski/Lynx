"use client";

import type { Chat, Message } from "./page";
import ArrowLeftIcon from "@/components/icons/arrow-left";
import { splitByFirstCodeFence } from "@/lib/utils";
import { Fragment } from "react";
import Markdown from "react-markdown";
import { StickToBottom } from "use-stick-to-bottom";

export default function ChatLog({
  chat,
  activeMessage,
  streamText,
  onMessageClick,
}: {
  chat: Chat;
  activeMessage?: Message;
  streamText: string;
  onMessageClick: (v: Message) => void;
}) {
  const assistantMessages = chat.messages.filter((m) => m.role === "assistant");

  return (
    <StickToBottom
      className="relative grow overflow-hidden"
      resize="smooth"
      initial="smooth"
    >
      <StickToBottom.Content className="mx-auto flex w-full max-w-prose flex-col gap-8 p-8">
        <UserMessage content={chat.prompt} />

        {chat.messages.slice(2).map((message) => (
          <Fragment key={message.id}>
            {message.role === "user" ? (
              <UserMessage content={message.content} />
            ) : (
              <AssistantMessage
                content={message.content}
                version={
                  assistantMessages.map((m) => m.id).indexOf(message.id) + 1
                }
                message={message}
                isActive={!streamText && activeMessage?.id === message.id}
                onMessageClick={onMessageClick}
              />
            )}
          </Fragment>
        ))}

        {streamText && (
          <AssistantMessage
            content={streamText}
            version={assistantMessages.length + 1}
            isActive={true}
          />
        )}
      </StickToBottom.Content>
    </StickToBottom>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="relative inline-flex max-w-[80%] items-end gap-3 self-end">
      <div className="chat-user-message whitespace-pre-wrap rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
        {content}
      </div>
    </div>
  );
}

function AssistantMessage({
  content,
  version,
  message,
  isActive,
  onMessageClick = () => {},
}: {
  content: string;
  version: number;
  message?: Message;
  isActive?: boolean;
  onMessageClick?: (v: Message) => void;
}) {
  const parts = splitByFirstCodeFence(content);

  return (
    <div>
      {parts.map((part, i) => (
        <div key={i}>
          {part.type === "text" ? (
            <div className="chat-assistant-bg rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
              <Markdown className="prose prose-gray dark:prose-invert chat-assistant-prose max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-200 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300">
                {part.content}
              </Markdown>
            </div>
          ) : part.type === "first-code-fence-generating" ? (
            <div className="my-4">
              <button
                disabled
                className="chat-button inline-flex w-full animate-pulse items-center gap-2 rounded-lg border-2 p-2 transition-colors"
              >
                <div className="flex size-8 items-center justify-center rounded bg-blue-500 text-white font-bold text-sm">
                  V{version}
                </div>
                <div className="flex flex-col gap-0.5 text-left leading-none">
                  <div className="text-sm font-medium leading-none chat-assistant-text">
                    Generating...
                  </div>
                </div>
              </button>
            </div>
          ) : part.type === "first-code-fence" && part.filename && message ? (
            <div className="my-4">
              <button
                className={`${isActive ? "chat-button-active border-blue-500 shadow-md" : "chat-button hover:shadow-sm"} inline-flex w-full items-center gap-2 rounded-lg border-2 p-2 transition-all duration-200`}
                onClick={() => onMessageClick(message)}
              >
                <div
                  className={`${isActive ? "bg-blue-500 text-white" : "bg-gray-500 dark:bg-gray-400 text-white"} flex size-8 items-center justify-center rounded font-bold text-sm`}
                >
                  V{version}
                </div>
                <div className="flex flex-col gap-0.5 text-left leading-none">
                  <div className="text-sm font-medium leading-none chat-assistant-text">
                    {toTitleCase(part.filename.name)}{" "}
                    {version !== 1 && `v${version}`}
                  </div>
                  <div className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    {part.filename.name}
                    {version !== 1 && `-v${version}`}
                    {"."}
                    {part.filename.extension}
                  </div>
                </div>
                <div className="ml-auto text-gray-400 dark:text-gray-500">
                  <ArrowLeftIcon />
                </div>
              </button>
            </div>
          ) : part.type === "first-code-fence" && part.filename ? (
            <div className="my-4">
              <button
                className="chat-button inline-flex w-full items-center gap-2 rounded-lg border-2 p-2 opacity-75"
                disabled
              >
                <div className="flex size-8 items-center justify-center rounded bg-gray-500 dark:bg-gray-400 text-white font-bold text-sm">
                  V{version}
                </div>
                <div className="flex flex-col gap-0.5 text-left leading-none">
                  <div className="text-sm font-medium leading-none chat-assistant-text">
                    {toTitleCase(part.filename.name)}{" "}
                    {version !== 1 && `v${version}`}
                  </div>
                  <div className="text-xs leading-none text-gray-500 dark:text-gray-400">
                    {part.filename.name}
                    {version !== 1 && `-v${version}`}
                    {"."}
                    {part.filename.extension}
                  </div>
                </div>
                <div className="ml-auto text-gray-400 dark:text-gray-500">
                  <ArrowLeftIcon />
                </div>
              </button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function toTitleCase(rawName: string): string {
  // Split on one or more hyphens or underscores
  const parts = rawName.split(/[-_]+/);

  // Capitalize each part and join them back with spaces
  return parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
