"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Tab {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  siteName: string;
}

export default function Sidebar({ tabs, activeTab, onTabChange, siteName }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const sectionHeaders = [
    { id: "header-1", label: "Yönetim" },
    { id: "header-2", label: "İçerik" },
    { id: "header-3", label: "Etkileşim" },
  ];

  const tabSections: Record<string, string[]> = {
    "header-1": ["general"],
    "header-2": ["services", "gallery", "faqs", "process", "trust", "testimonials", "blog"],
    "header-3": ["messages", "instagram"],
  };

  const platformLinks = [
    {
      label: "Tüm Siteler",
      href: "/dashboard",
      icon: "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008zm0 3.75h.008v.008h-.008v-.008z",
    },
    {
      label: "Belgeler",
      href: "/dashboard/certificates",
      icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
    },
    {
      label: "Ayarlar",
      href: "/dashboard/settings",
      icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.298-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z",
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className={`px-4 pt-5 pb-4 border-b border-surface-100 ${collapsed ? "flex justify-center" : ""}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349" />
            </svg>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">{siteName}</p>
              <p className="text-[10px] text-surface-400 font-medium">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        {sectionHeaders.map((section) => {
          const sectionTabs = tabSections[section.id] || [];
          return (
            <div key={section.id} className="mb-3">
              {!collapsed && (
                <p className="px-3 py-1.5 text-[10px] font-semibold text-surface-400 uppercase tracking-wider">
                  {section.label}
                </p>
              )}
              {sectionTabs.map((tabId) => {
                const tab = tabs.find((t) => t.id === tabId);
                if (!tab) return null;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { onTabChange(tab.id); setOpen(false); }}
                    title={collapsed ? tab.label : undefined}
                    className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 mb-0.5 ${
                      collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"
                    } ${
                      isActive
                        ? "bg-brand-50 text-brand-700 border-l-[3px] border-brand-600 ml-0"
                        : "text-surface-500 hover:bg-surface-50 hover:text-surface-700 border-l-[3px] border-transparent"
                    }`}
                  >
                    <svg className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-brand-600" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                    </svg>
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.badge !== undefined && tab.badge > 0 && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            isActive ? "bg-brand-100 text-brand-700" : "bg-surface-100 text-surface-500"
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Platform Linkleri */}
      <div className={`border-t border-surface-100 ${collapsed ? "py-2" : "py-3"}`}>
        {!collapsed && (
          <p className="px-5 pb-1.5 text-[10px] font-semibold text-surface-400 uppercase tracking-wider">Platform</p>
        )}
        <div className="px-2.5 space-y-0.5">
          {platformLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => { router.push(link.href); setOpen(false); }}
              title={collapsed ? link.label : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg text-[13px] font-medium text-surface-500 hover:bg-surface-50 hover:text-surface-700 transition-all duration-150 ${
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"
              }`}
            >
              <svg className="w-[18px] h-[18px] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              {!collapsed && <span>{link.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden lg:block p-3 border-t border-surface-100">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-colors text-xs"
        >
          <svg className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5l-7.5 7.5-7.5-7.5" />
          </svg>
          {!collapsed && <span>Daralt</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:block h-screen border-r border-surface-200 bg-white transition-all duration-200 ${collapsed ? "w-[68px]" : "w-[220px]"}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed bottom-5 right-5 z-40 w-12 h-12 bg-brand-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-brand-700 transition-all active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-surface-950/30 backdrop-blur-sm animate-fadeIn" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-[260px] bg-white shadow-xl animate-slideInLeft">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
