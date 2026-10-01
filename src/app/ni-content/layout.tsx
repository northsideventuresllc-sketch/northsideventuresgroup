import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NI Content Command Console — Northside Ventures Group",
  description: "Private interactive staging and review console for Northside Intelligence social content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NiContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
