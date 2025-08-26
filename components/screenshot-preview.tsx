import { XCircleIcon } from "@heroicons/react/20/solid";
import Spinner from "@/components/spinner";

export function ScreenshotPreview({
  screenshotUrl,
  screenshotLoading,
  isPending,
  onRemove,
  fileInputRef,
}: {
  screenshotUrl: string | undefined;
  screenshotLoading: boolean;
  isPending: boolean;
  onRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <>
      {screenshotLoading && (
        <div className="relative mx-3 mt-3">
          <div className="rounded-xl">
            <div className="group mb-2 flex h-16 w-[68px] animate-pulse items-center justify-center rounded bg-gray-200">
              <Spinner />
            </div>
          </div>
        </div>
      )}
      {screenshotUrl && (
        <div
          className={`${isPending ? "invisible" : ""} relative mx-3 mt-3`}
        >
          <div className="rounded-xl">
            <img
              alt="screenshot"
              src={screenshotUrl}
              className="group relative mb-2 h-16 w-[68px] rounded"
            />
          </div>
          <button
            type="button"
            id="x-circle-icon"
            className="absolute -right-3 -top-4 left-14 z-10 size-5 rounded-full bg-white text-gray-900 hover:text-gray-500"
            onClick={() => {
              onRemove();
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            <XCircleIcon />
          </button>
        </div>
      )}
    </>
  );
}