import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HookahPlace Finch — Кальянная на юге Москвы",
  description: "Премиальная кальянная сети HookahPlace. Кустанайская 10А, м. Шипиловская",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
