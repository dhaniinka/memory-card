import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "./musicprovider";
import ClientWrapper from "./client-wrapper"; // ✅ logic audio & routing

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Game Tebak Pasangan Kartu",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Provider untuk kontrol musik global */}
        <MusicProvider>
          {/* ✅ ClientWrapper ngatur kapan backsound global aktif / mati */}
          <ClientWrapper>{children}</ClientWrapper>
        </MusicProvider>
      </body>
    </html>
  );
}
