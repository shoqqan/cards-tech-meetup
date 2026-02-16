import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { Header } from "@/app/_ui/header";
import Providers from "./_lib/providers";

const _inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});
const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "CARDS TECH MEETUP — Video Archive",
  description:
    "Записи докладов команды CARDS TECH MEETUP. Смотрите доклады по архитектуре, фронтенду, DevOps и базам данных.",
};

export const viewport: Viewport = {
  themeColor: "#0a100a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${_inter.variable} ${_jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
