import Providers from "@/app/(main)/providers";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <body className="flex min-h-full flex-col bg-gray-100 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
        {children}

        <Toaster />
      </body>
    </Providers>
  );
}
