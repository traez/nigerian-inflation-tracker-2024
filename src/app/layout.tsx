import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/dbconnect";

export const metadata: Metadata = {
  title: "Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-trebuchetMs min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
