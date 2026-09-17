export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-surface-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-surface-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">Ş</span>
          </div>
          <span className="text-sm font-semibold text-surface-900">Şırnak Platform</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-warning-50 rounded-full flex items-center justify-center animate-pulse-soft">
              <svg className="w-10 h-10 text-warning-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 3v18" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-warning-50 text-warning-600 rounded-full text-xs font-medium mb-4">
            <div className="w-1.5 h-1.5 bg-warning-500 rounded-full animate-pulse" />
            Planlı Bakım
          </div>

          <h1 className="text-2xl font-bold text-surface-900 mb-3">Sistem Bakımda</h1>
          <p className="text-sm text-surface-500 mb-6 leading-relaxed">
            Sistemimiz şu anda bakım çalışması kapsamındadır. En kısa sürede hizmetinize geri döneceğiz.
          </p>

          <div className="bg-white rounded-xl border border-surface-200 p-5 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-brand-600">~2</p>
                <p className="text-xs text-surface-400 mt-1">Saat Süre</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-surface-900">99.9%</p>
                <p className="text-xs text-surface-400 mt-1">Uptime Hedefi</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-surface-400">
            Bakım bitişi hakkında bilgi almak için{' '}
            <a href="mailto:info@sirnakplatform.com" className="text-brand-600 hover:text-brand-700 font-medium">
              info@sirnakplatform.com
            </a>{' '}
            adresinden bize ulaşabilirsiniz.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-100 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs text-surface-400">
          <span>© 2024 Şırnak Platform</span>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-surface-600 transition-colors">Gizlilik</a>
            <a href="/cookies" className="hover:text-surface-600 transition-colors">Çerezler</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
