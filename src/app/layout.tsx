import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Theme from "@/providers/Theme";

export const metadata: Metadata = {
  title: "Converto",
  description: "Conversions for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Theme>{children}</Theme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
