import { DotScreenShader } from "@/components/ui/dot-shader-background";

export default function DemoOne() {
  return (
    <div className="h-svh w-screen flex flex-col gap-8 items-center justify-center relative">
      <div className="absolute inset-0">
        <DotScreenShader />
      </div>
      <h1 className="text-6xl md:text-7xl font-light tracking-tight mix-blend-exclusion text-white whitespace-nowrap pointer-events-none">
        DIGITAL INNOVATION
      </h1>
      <p className="text-lg md:text-xl font-light text-center text-white mix-blend-exclusion max-w-2xl leading-relaxed pointer-events-none">
        Where thoughts take shape and consciousness flows like liquid mercury through infinite dimensions.
      </p>
    </div>
  );
}