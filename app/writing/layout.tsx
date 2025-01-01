import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./../globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Writing | Chris Marvel",
  description: "My thoughts and experiences",
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
