import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sample Blog",
  description: "Description of sample blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href={`/`} className="title-link"><h1 className="title">Sample Blog</h1></Link>
          <hr />
        </nav>
        {children}
      </body>
    </html>
  );
}
