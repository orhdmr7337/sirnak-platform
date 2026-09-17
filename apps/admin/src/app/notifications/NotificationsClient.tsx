"use client";

import { useState } from "react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Video Yüklendi",
    message: "Hero arka plan videosu başarıyla yüklendi.",
    time: "5 dk önce",
    read: false,
  },
  {
    id: "2",
    type: "info",
    title: "Yeni Mesaj",
    message: "Ahmet Yılmaz size bir mesaj gönderdi.",
    time: "15 dk önce",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Depolama Uyarısı",
    message: "Depolama alanının %80'ini kullandınız.",
    time: "1 saat önce",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "Ayarlar Kaydedildi",
    message: "Tesisat site ayarları güncellendi.",
    time: "2 saat önce",
    read: true,
  },
  {
    id: "5",
    type: "error",
    title: "Yükleme Hatası",
    message: "Video yüklenirken bir hata oluştu. Lütfen tekrar deneyin.",
    time: "3 saat önce",
    read: true,
  },
];

const typeConfig = {
  info: { bg: "bg-brand-50", icon: "text-brand-600", dot: "bg-brand-500" },
  success: { bg: "bg-emerald-50", icon: "text-emerald-600", dot: "bg-emerald-500" },
  warning: { bg: "bg-warning-50", icon: "text-warning-600", dot: "bg-warning-500" },
  error: { bg: "bg-danger-50", icon: "text-danger-600", dot: "bg-danger-500" },
};

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">Ş</span>
            </div>
            <span className="text-sm font-semibold text-surface-900">Şırnak Platform</span>
          </div>
          <a href="/dashboard" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
            Dashboard&apos;a Dön
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-surface-900">Bildirimler</h1>
              <p className="text-sm text-surface-400 mt-1">
                {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : "Tüm bildirimler okundu"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  Tümünü Okundu İşaretle
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-surface-500 hover:text-danger-600 px-3 py-1.5 rounded-lg hover:bg-danger-50 transition-colors"
                >
                  Tümünü Temizle
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-1 mb-4 w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === "all" ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
              }`}
            >
              Tümü ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
                filter === "unread" ? "bg-white text-surface-900 shadow-sm" : "text-surface-500 hover:text-surface-700"
              }`}
            >
              Okunmamış ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((notif) => {
                const config = typeConfig[notif.type];
                return (
                  <div
                    key={notif.id}
                    className={`bg-white rounded-xl border border-surface-200 p-4 flex items-start gap-3 transition-all hover:shadow-sm ${
                      !notif.read ? "border-l-[3px] border-l-brand-500" : ""
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                      {notif.type === "info" && (
                        <svg className={`w-4 h-4 ${config.icon}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                      )}
                      {notif.type === "success" && (
                        <svg className={`w-4 h-4 ${config.icon}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {notif.type === "warning" && (
                        <svg className={`w-4 h-4 ${config.icon}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                      )}
                      {notif.type === "error" && (
                        <svg className={`w-4 h-4 ${config.icon}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-surface-900">{notif.title}</p>
                        {!notif.read && <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
                      </div>
                      <p className="text-xs text-surface-500 mt-0.5">{notif.message}</p>
                      <p className="text-[10px] text-surface-400 mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-[10px] font-medium text-brand-600 hover:text-brand-700 px-2 py-1 rounded hover:bg-brand-50 transition-colors shrink-0"
                      >
                        Okundu
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-surface-200">
              <svg className="w-12 h-12 text-surface-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <p className="text-sm font-medium text-surface-500">Bildirim bulunmuyor</p>
              <p className="text-xs text-surface-400 mt-1">Tüm bildirimleriniz temizlendi</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
