import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from '@/components/footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Chris Marvel",
  description: "Personal portfolio of Chris Marvel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} font-helvetica antialiased min-h-screen flex flex-col`}
      >
        <div className="w-[95%] md:w-full md:max-w-[800px] mx-auto px-4 md:px-0">
          <div className="w-full mx-auto">
            <Navbar />
            {children}
          </div>
          <div className="w-full mb-16 mx-auto">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
