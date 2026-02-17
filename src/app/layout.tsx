import type { Metadata } from "next";
import "./globals.css";
import { plusJakartaSans, fredoka, bevellier, nunito } from "@/assets";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@/components/providers/QueryClientProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "MyBibleIQ",
  description: "MyBibleIQ Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${plusJakartaSans.variable} ${fredoka.variable} ${bevellier.variable} ${nunito.variable} antialiased`}
      >
        <QueryClientProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
