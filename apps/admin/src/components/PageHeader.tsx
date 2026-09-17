"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/**
 * Tüm dashboard sayfalarında kullanılan ortak sayfa başlığı.
 * Başlık + açıklama + sağda isteğe bağlı aksiyon butonları.
 */
export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-surface-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-surface-400">{description}</p>}
        <div className="mt-3 h-px w-12 bg-brand-500/60" />
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
