export default function PrivacyPolicyPage() {
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
          <h1 className="text-2xl font-bold text-surface-900 mb-2">Gizlilik Politikası</h1>
          <p className="text-sm text-surface-400 mb-8">Son güncelleme: 13 Eylül 2026</p>

          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">1. Toplanan Veriler</h2>
              <p className="text-sm text-surface-600 leading-relaxed mb-3">
                Platformumuzu kullandığınızda aşağıdaki verileri toplayabiliriz:
              </p>
              <ul className="space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Kişisel Veriler:</strong> Ad, e-posta adresi, telefon numarası (iletişim formları aracılığıyla)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Oturum Verileri:</strong> Giriş bilgileri, IP adresi, tarayıcı türü, ziyaret süreleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Kullanım Verileri:</strong> Ziyaret edilen sayfalar, tıklama verileri, arama geçmişi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>İçerik Verileri:</strong> Yorumlar, değerlendirmeler, yüklenen medya dosyaları</span>
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">2. Verilerin Kullanım Amacı</h2>
              <ul className="space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Hizmetlerimizi sunmak ve sürdürmek</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Müşteri hizmetleri sağlamak</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Güvenliği sağlamak ve dolandırıcılığı önlemek</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Platform deneyimini iyileştirmek</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Yasal yükümlülükleri yerine getirmek</span>
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">3. Veri Paylaşımı</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Kişisel verileriniz yalnızca aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama hizmetleri için</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Hosting Sağlayıcısı:</strong> Platform barındırma hizmetleri için</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span><strong>Yasal Zorunluluk:</strong> Yasal bir yükümlülük veya mahkeme kararı doğrultusunda</span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">4. Veri Güvenliği</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Verilerinizin güvenliği bizim için önemlidir. Aşağıdaki önlemleri alıyoruz:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>SSL/TLS şifreleme (HTTPS)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Supabase RLS (Row Level Security) politikaları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Şifrelenmiş parola depolama (bcrypt)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-surface-400">•</span>
                  <span>Düzenli güvenlik denetimleri</span>
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">5. Haklarınız (KVKK)</h2>
              <p className="text-sm text-surface-600 leading-relaxed mb-3">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="space-y-2 text-sm text-surface-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span>Kişisel verileriniz hakkında bilgi talep etme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span>Bilgilerinizin yanlış veya eksik olması durumunda düzeltilmesini isteme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-1">•</span>
                  <span>Veri taşınabilirliği talep etme</span>
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">6. Veri Saklama</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Kişisel verileriniz, hizmetlerin sunulması için gerekli olduğu sürece veya yasal yükümlülüklerin
                gerektirdiği süre boyunca saklanır. Hesabınızı sildiğinizde, verileriniz yasal saklama
                yükümlülükleri dışında 30 gün içinde silinir.
              </p>
            </div>

            {/* Section 7 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">7. Çocukların Gizliliği</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Platformumuz 13 yaşın altındaki çocuklar için tasarlanmamıştır. 13 yaşın altındaki çocuklardan
                bilerek kişisel veri toplamıyoruz.
              </p>
            </div>

            {/* Section 8 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">8. Politika Değişiklikleri</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Bu gizlilik politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayınlandığında
                yürürlüğe girer. Önemli değişiklikler hakkında e-posta veya platform içi bildirim ile
                bilgilendirilirsiniz.
              </p>
            </div>

            {/* Section 9 */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h2 className="text-base font-semibold text-surface-900 mb-3">9. İletişim</h2>
              <p className="text-sm text-surface-600 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız için{' '}
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
