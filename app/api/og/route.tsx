import { ImageResponse } from "next/og";

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get("prompt");

    // Simple approach without external image loading
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            backgroundImage: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
          }}
        >
          <div
            style={{
              fontSize: 48,
              color: "white",
              padding: "50px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "80%",
            }}
          >
            {prompt && prompt.length > 100 ? prompt.slice(0, 97) + "..." : prompt || "Lynx"}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}