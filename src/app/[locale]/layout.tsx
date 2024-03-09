import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../ui/globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopping Things",
  description: "The best eccommerce of things",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  console.log(locale);
  return (
    <html lang={locale}>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}
