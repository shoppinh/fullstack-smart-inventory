import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cases Management",
  description: "Manage and track all cases",
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {children}
    </div>
  );
} 