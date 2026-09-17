"use client";

import { ReactNode } from "react";

/* ============================================================
   Site yönetim sekmeleri için ortak tasarım sistemi.
   Tüm tab dosyaları görsel sınıfları buradan alır; tek yerden
   tema değişikliği yapılabilir.
   ============================================================ */

export const inputClass =
  "h-10 w-full px-3 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-surface-300 transition-all duration-200";

export const textareaClass =
  "w-full px-3 py-2.5 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 hover:border-surface-300 transition-all duration-200 resize-y";

export const labelClass = "block text-xs font-medium text-surface-500 mb-1.5";

/* ---------- Kart / Bölüm ---------- */

interface SectionProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function Section({ icon, title, subtitle, actions, children }: SectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-surface-200/80 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {icon && (
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-surface-900 truncate">{title}</h2>
            {subtitle && <p className="text-xs text-surface-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      {children}
    </section>
  );
}

/* ---------- Butonlar ---------- */

interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  title?: string;
  className?: string;
}

export function BtnPrimary({ children, onClick, disabled, type = "button", className = "" }: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-brand-600 text-white rounded-lg text-xs font-semibold hover:bg-brand-700 disabled:opacity-60 transition-all active:scale-[0.98] shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnSecondary({ children, onClick, disabled, type = "button", className = "" }: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-white text-surface-700 border border-surface-200 rounded-lg text-xs font-medium hover:bg-surface-50 hover:border-surface-300 disabled:opacity-60 transition-all active:scale-[0.98] ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnDanger({ children, onClick, disabled, type = "button", className = "" }: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-1.5 h-9 px-4 bg-danger-500 text-white rounded-lg text-xs font-semibold hover:bg-danger-600 disabled:opacity-60 transition-all active:scale-[0.98] shadow-sm ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- İkon butonlar (satır aksiyonları) ---------- */

export function IconBtnEdit({ onClick, title = "Düzenle" }: { onClick: () => void; title?: string }) {
  return (
    <button onClick={onClick} title={title} className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
      </svg>
    </button>
  );
}

export function IconBtnDelete({ onClick, title = "Sil" }: { onClick: () => void; title?: string }) {
  return (
    <button onClick={onClick} title={title} className="p-2 text-surface-400 hover:text-danger-500 hover:bg-danger-50 rounded-lg transition-colors">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    </button>
  );
}

export function IconBtnUp({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} title="Yukarı taşı" className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}

export function IconBtnDown({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} title="Aşağı taşı" className="p-2 text-surface-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors disabled:opacity-30 disabled:pointer-events-none">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
}

/* ---------- Yayın durumu rozeti ---------- */

export function PublishBadge({ published }: { published: boolean }) {
  return published ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-700">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
      Yayında
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-100 text-surface-500">
      <span className="w-1.5 h-1.5 rounded-full bg-surface-400" />
      Taslak
    </span>
  );
}

/* ---------- Modal ---------- */

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export function Modal({ open, title, onClose, children, footer, maxWidth = "max-w-lg" }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-surface-950/40 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className={`bg-white rounded-2xl shadow-xl border border-surface-200 w-full ${maxWidth} animate-scaleIn`}>
          <div className="px-5 py-4 border-b border-surface-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-surface-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">{children}</div>
          {footer && (
            <div className="px-5 py-3.5 border-t border-surface-100 flex items-center justify-end gap-2 bg-surface-50/50 rounded-b-2xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Yayın toggle (checkbox yerine şık anahtar) ---------- */

export function PublishedToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 group"
    >
      <span
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
          checked ? "bg-brand-500" : "bg-surface-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
      <span className="text-sm text-surface-700 group-hover:text-surface-900 transition-colors">Yayında</span>
    </button>
  );
}

/* ---------- Boş durum ---------- */

interface EmptyProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function Empty({ icon, title, description, action }: EmptyProps) {
  return (
    <div className="py-14 text-center">
      {icon && (
        <div className="w-12 h-12 mx-auto rounded-2xl bg-surface-100 text-surface-400 flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <h3 className="text-sm font-semibold text-surface-900">{title}</h3>
      {description && <p className="mt-1 text-xs text-surface-500 max-w-xs mx-auto">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

/* ---------- Sekme değiştirici (filtre) ---------- */

interface FilterTabsProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: { id: T; label: string; count?: number }[];
}

export function FilterTabs<T extends string>({ value, onChange, options }: FilterTabsProps<T>) {
  return (
    <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 w-fit">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
            value === o.id ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
          }`}
        >
          {o.label}
          {o.count !== undefined && <span className="ml-1 opacity-60">({o.count})</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------- Kaydet butonu içinde kullanılan spinner ---------- */

export function Spinner({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span
      className={`${className} border-2 border-white/30 border-t-white rounded-full animate-spin inline-block`}
    />
  );
}
