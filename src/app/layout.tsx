import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ソフトウェア開発クイズ',
  description: '開発プロセスに関する知識をテストするクイズアプリケーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
