import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/main-layout";
import AnimatedBackground from "@/components/animated-background";
import ScrollProgress from "@/components/scroll-progress";
import PageTransition from "@/components/page-transition";
import GrainOverlay from "@/components/grain-overlay";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});




export const metadata: Metadata = {
  title: "Portfolio | Basat Maqsood",
  description: "Frontend Developer Portfolio",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins bg-black text-white min-h-screen`}
      >
      {/* Grid Background */}

        <GrainOverlay />
        {/* <AnimatedBackground /> */}
        {/* <CustomCursor />
         */}

        <ScrollProgress />
        {/* <PageTransition> */}
          <MainLayout>{children}</MainLayout>
        {/* </PageTransition> */}
      </body>
    </html>
  );
}

import "./globals.css";
