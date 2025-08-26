import LoadingButton from "@/components/loading-button";
import ArrowRightIcon from "@/components/icons/arrow-right";

export function SubmitButton() {
  return (
    <div className="relative flex shrink-0 has-[:disabled]:opacity-50">
      <div className="pointer-events-none absolute inset-0 -bottom-[1px] rounded bg-blue-500" />

      <LoadingButton
        className="relative inline-flex size-6 items-center justify-center rounded bg-blue-500 font-medium text-white shadow-lg outline-blue-300 hover:bg-blue-500/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        type="submit"
      >
        <ArrowRightIcon />
      </LoadingButton>
    </div>
  );
}