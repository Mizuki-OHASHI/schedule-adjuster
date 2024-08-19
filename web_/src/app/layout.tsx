import cn from "classnames";
import { Inter } from "next/font/google";

import type { Metadata } from "next";

// eslint-disable-next-line no-restricted-imports
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schedule Adjuster",
  description: "Schedule Adjuster | スケジュール調整アプリ",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body
        className={cn(
          inter.className,
          "text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900"
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default Layout;
