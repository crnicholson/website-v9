import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";

const newEdge = localFont({
  src: '../public/fonts/New-Edge-Light-Rounded.woff',
  variable: '--font-new-edge',
  display: 'swap',
});

const walter = localFont({
  src: '../public/fonts/Walter-Neue-Medium.woff2',
  variable: '--font-walter',
  display: 'swap',
});

const ibm = localFont({
  src: '../public/fonts/IBMPlexMono-Regular.ttf',
  variable: '--font-ibm',
  display: 'swap',
});

const marola = localFont({
  src: '../public/fonts/marola.ttf',
  variable: '--font-marola',
  display: 'swap',
});

const resolution = localFont({
  src: '../public/fonts/LowerResolution.ttf',
  variable: '--font-resolution',
  display: 'swap',
});

const geist = localFont({
  src: '../public/fonts/Gesit.ttf',
  variable: '--font-geist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "charlie nicholson",
  description: "i don't even know man",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newEdge.variable} ${walter.variable} ${ibm.variable} ${geist.variable} ${marola.variable} ${resolution.variable} antialiased font-geist cursor-none`}
        // style={{ textShadow: "1px 0 #f3ff00, 0px -1px #f3ff00, -1px 0 #f3ff00, 0 1px #f3ff00" }}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
