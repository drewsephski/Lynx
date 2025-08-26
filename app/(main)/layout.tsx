import Providers from "@/app/(main)/providers";
import { Toaster } from "@/components/ui/toaster";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <body className="flex min-h-full flex-col bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
        {children}

        <Toaster />
      </body>
    </Providers>
  );
}
