import UploadIcon from "@/components/icons/upload-icon";

export function ScreenshotUploader({
  onUpload,
  fileInputRef,
}: {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <label
        htmlFor="screenshot"
        className="flex cursor-pointer gap-2 text-sm text-gray-400 dark:text-gray-500 hover:underline"
      >
        <div className="flex size-6 items-center justify-center rounded bg-black dark:bg-gray-600 hover:bg-gray-700 dark:hover:bg-gray-500">
          <UploadIcon className="size-4" />
        </div>
        <div className="flex items-center justify-center transition hover:text-gray-700 dark:hover:text-gray-300">
          Attach
        </div>
      </label>
      <input
        id="screenshot"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={onUpload}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}