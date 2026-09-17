export default function CookiePolicyPage() {
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Çerez Politikası</h1>
          <p className="text-sm text-surface-400 mb-8">Son güncelleme: 13 Eylül 2026</p>

          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">1. Çerez Nedir?</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza yerleştirilen küçük metin dosyalarıdır.
                Bu dosyalar, sitenin düzgün çalışmasını, kullanıcı deneyiminin iyileştirilmesini ve istatistiksel analizlerin
                yapılmasını sağlar.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">2. Hangi Çerezleri Kullanıyoruz?</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-600 rounded text-xs font-medium">Zorunlu</span>
                    <h3 className="text-sm font-medium text-surface-900">Oturum Çerezleri</h3>
                  </div>
                  <p className="text-sm text-surface-600">
                    Giriş yapmanızı ve oturumunuzu sürdürmenizi sağlar. Supabase Auth tarafından yönetilir.
                    Devre dışı bırakılamazlar.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-surface-100 text-surface-600 rounded text-xs font-medium">İşlevsel</span>
                    <h3 className="text-sm font-medium text-surface-900">Tercih Çerezleri</h3>
                  </div>
                  <p className="text-sm text-surface-600">
                    Dil tercihi, tema seçimi gibi ayarlarınızı hatırlar. Tarayıcınızdan silinebilirler.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-warning-50 text-warning-600 rounded text-xs font-medium">Analitik</span>
                    <h3 className="text-sm font-medium text-surface-900">Performans Çerezleri</h3>
                  </div>
                  <p className="text-sm text-surface-600">
                    Ziyaretçi sayısını, popüler sayfaları ve site performansını ölçmek için kullanılır.
                    Tüm veriler anonim olarak toplanır.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">3. Üçüncü Taraf Çerezleri</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Platformumuz aşağıdaki üçüncü taraf hizmetlerini kullanabilir:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Google Analytics:</strong> Ziyaretçi davranışlarını analiz etmek için.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Instagram Embed:</strong> Gömülü Instagram gönderilerini görüntülemek için.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Supabase:</strong> Kimlik doğrulama ve oturum yönetimi için.</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">4. Çerezleri Nasıl Yönetebilirsiniz?</h2>
              <p className="text-sm text-surface-600 leading-relaxed mb-3">
                Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz:
              </p>
              <ul className="space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span><strong>Chrome:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span><strong>Safari:</strong> Tercihler → Gizlilik → Çerezleri Yönet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-warning-50 rounded-lg border border-warning-100">
                <p className="text-xs text-warning-700">
                  <strong>Not:</strong> Zorunlu çerezleri devre dışı bırakmanız durumunda platform düzgün çalışmayabilir.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">5. İletişim</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Çerez politikamız hakkında sorularınız için{' '}
                <a href="mailto:info@sirnakplatform.com" className="text-brand-600 hover:text-brand-700 font-medium">
                  info@sirnakplatform.com
                </a>{' '}
                adresinden bize ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-100 py-4 mt-8">
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
