/* eslint-disable @next/next/no-img-element */
import { getPrisma } from "@/lib/prisma";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { id: string };
}) {
  const prisma = getPrisma();
  const generatedApp = await prisma.generatedApp.findUnique({
    where: {
      id: params.id,
    },
  });

  const backgroundData = await readFile(
    join(process.cwd(), "./public/dynamic-og.png"),
  );
  const backgroundSrc = Uint8Array.from(backgroundData).buffer;

  let prompt = generatedApp?.prompt || "An app generated on LlamaCoder.io";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* @ts-expect-error */}
        <img src={backgroundSrc} height="100%" alt="" />
        <div
          style={{
            position: "absolute",
            fontSize: 50,
            color: "black",
            padding: "50px 200px",
            textAlign: "center",
          }}
        >
          {prompt && prompt.length > 100 ? prompt.slice(0, 97) + "..." : prompt}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}