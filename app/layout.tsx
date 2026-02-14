import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const newEdge = localFont({
  src: '../public/fonts/New-Edge-Light-Rounded.woff',
  variable: '--font-new-edge',
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
        className={`${newEdge.variable} antialiased font-new-edge`}
        style={{ textShadow: "1px 0 #f3ff00, 0px -1px #f3ff00, -1px 0 #f3ff00, 0 1px #f3ff00" }}
      >
        {children}
      </body>
    </html>
  );
}
