import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/main-layout";
import CustomCursor from "@/components/custom-cursor";
import AnimatedBackground from "@/components/animated-background";
import ScrollProgress from "@/components/scroll-progress";
import PageTransition from "@/components/page-transition";
import GrainOverlay from "@/components/grain-overlay";
import AnimatedCursor from "react-animated-cursor";

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
        <AnimatedBackground />
        {/* <CustomCursor />
         */}
<AnimatedCursor

clickables={[
  'a',
  'input[type="text"]',
  'input[type="email"]',
  'input[type="number"]',
  'input[type="submit"]',
  'input[type="image"]',
  'label[for]',
  'select',
  'textarea',
  'button',
  '.link',
]}
  innerSize={8}
  color='193, 11, 111'
  outerSize={35}
  innerScale={1}
  outerScale={2}
  outerAlpha={0}
  trailingSpeed={1}
  innerStyle={{
    backgroundColor: '#fff'
  }}
  outerStyle={{
    border: '3px solid #fff'
  }}
/>
        <ScrollProgress />
        <GrainOverlay />
        <PageTransition>
          <MainLayout>{children}</MainLayout>
        </PageTransition>
      </body>
    </html>
  );
}

import "./globals.css";
