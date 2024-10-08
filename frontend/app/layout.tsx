import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "../lib/apolloClient";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <main className="min-h-screen dark:bg-dark-elevation dark:text-dark-primary flex flex-col items-center pb-32 md:pb-16">
          <div className=" border-b-2 dark:border-b-dark-elevation-2 w-full flex justify-center">
            <NavBar />
          </div>
          <ApolloWrapper>{children}</ApolloWrapper>
          <Footer />
        </main>
      </body>
    </html>
  );
}
