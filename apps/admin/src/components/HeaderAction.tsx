"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface HeaderActionProps {
  icon: ReactNode;
  label: string;
  href: string;
  danger?: boolean;
}

export default function HeaderAction({ icon, label, href, danger }: HeaderActionProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
        danger
          ? "text-surface-500 hover:text-danger-600 hover:bg-danger-50"
          : "text-surface-600 hover:text-brand-600 hover:bg-brand-50"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
