"use client";

import { useState } from "react";

interface BodyRegion {
  id: string;
  name: string;
  icon: string;
  svgPath: string;
  description: string;
  problems: string[];
  solutions: string[];
  score: number;
  status: "healthy" | "attention" | "warning";
  massageTypes: string[];
}

const BODY_REGIONS: BodyRegion[] = [
  {
    id: "head",
    name: "Baş & Boyun",
    icon: "🧠",
    svgPath: "M85 20 Q100 8 115 20 Q125 35 120 50 Q115 62 100 65 Q85 62 80 50 Q75 35 85 20Z",
    description: "Gerilim baş ağrıları, boyun tutulması, stres kaynaklı gerginlik",
    problems: ["Gerilim baş ağrıları", "Boyun tutulması", "Stres kaynaklı gerginlik", "Migren atakları"],
    solutions: ["Derin doku masajı", "Aromaterapi", "Refleksoloji", "Sıcak taş terapisi"],
    score: 72,
    status: "attention",
    massageTypes: ["Thai Masajı", "Aromaterapi", "Refleksoloji"],
  },
  {
    id: "shoulders",
    name: "Omuz & Sırt Üstü",
    icon: "💪",
    svgPath: "M65 68 Q55 80 48 110 Q45 130 50 150 L75 150 Q78 120 80 100 L120 100 Q122 120 125 150 L150 150 Q155 130 152 110 Q145 80 135 68",
    description: "Kas gerginliği, duruş bozukluğu, omuz tutulması, kas spazmı",
    problems: ["Kas gerginliği", "Duruş bozukluğu", "Omuz tutulması", "Kas spazmı", "Fibromiyalji"],
    solutions: ["Derin doku masajı", "Trigger noktası", "Sports masajı", "Kiropraktik"],
    score: 58,
    status: "warning",
    massageTypes: ["Derin Doku", "Sports Masajı", "Thai Masajı"],
  },
  {
    id: "back",
    name: "Bel & Sırt Altı",
    icon: "🦴",
    svgPath: "M75 155 Q70 180 68 210 Q67 240 72 260 L95 260 Q98 240 100 220 L100 220 Q102 240 105 260 L128 260 Q133 240 132 210 Q130 180 125 155",
    description: "Bel ağrısı, kas spazmı, fıtık riski, siyatik",
    problems: ["Bel ağrısı", "Kas spazmı", "Fıtık riski", "Siyatik", "Dizin aşırı yükü"],
    solutions: ["Sıcak taş masajı", "Derin doku", "Yoga terapisi", "Fizik tedavi"],
    score: 65,
    status: "attention",
    massageTypes: ["Sıcak Taş", "Derin Doku", "Yoga Terapisi"],
  },
  {
    id: "legs",
    name: "Bacak & Ayak",
    icon: "🦵",
    svgPath: "M78 265 Q75 290 73 320 Q72 350 75 370 L90 370 Q92 350 95 330 L95 370 L105 370 L105 330 Q108 350 110 370 L125 370 Q128 350 127 320 Q125 290 122 265",
    description: "Dolaşım bozukluğu, yorgunluk, bacak ağrısı, selülit",
    problems: ["Dolaşım bozukluğu", "Bacak yorgunluğu", "Bacak ağrısı", "Selülit", "Ödem"],
    solutions: ["Lenf drenaj", "Refleksoloji", "Spor masajı", "Lenf masajı"],
    score: 85,
    status: "healthy",
    massageTypes: ["Lenf Drenaj", "Refleksoloji", "Spor Masajı"],
  },
];

const statusConfig = {
  healthy: { label: "İyi Durumda", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", bar: "bg-emerald-500" },
  attention: { label: "Dikkat Gerekli", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", bar: "bg-amber-500" },
  warning: { label: "Acil Müdahale", color: "text-red-600", bg: "bg-red-50", border: "border-red-200", bar: "bg-red-500" },
};

export function BodyScanner() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [step, setStep] = useState<"select" | "scanning" | "results">("select");

  const region = BODY_REGIONS.find((r) => r.id === selectedRegion);

  const startScan = () => {
    if (!selectedRegion) return;
    setStep("scanning");
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setStep("results");
    }, 3000);
  };

  const reset = () => {
    setSelectedRegion(null);
    setScanComplete(false);
    setStep("select");
  };

  const avgScore = Math.round(BODY_REGIONS.reduce((acc, r) => acc + r.score, 0) / BODY_REGIONS.length);

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0f0a] to-[#0f1a0f] relative overflow-hidden" id="tarama">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-xs text-gray-400 mb-6">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Gelişmiş Teknoloji
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Vücut Tarama <span className="text-emerald-400">Test Cihazı</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Vücudunuzdaki sorunlu bölgeyi seçin, yapay zeka destekli tarama cihazımız
            size en uygun masaj programını önerisun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Body Visualization */}
          <div className="relative">
            <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
              {/* Human Silhouette SVG */}
              <svg viewBox="0 0 200 400" className="w-full h-full">
                {/* Background glow */}
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <ellipse cx="100" cy="200" rx="80" ry="180" fill="url(#glow)" />

                {/* Body outline */}
                <ellipse cx="100" cy="45" rx="28" ry="35" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <path d="M72 80 Q60 120 55 180 L65 280 Q70 320 75 360 L85 360 Q90 320 95 280 L100 200 L105 280 Q110 320 115 360 L125 360 Q130 320 135 280 L145 180 Q140 120 128 80 Z" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <path d="M72 80 L30 160 L25 200" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
                <path d="M128 80 L170 160 L175 200" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

                {/* Clickable body regions */}
                {BODY_REGIONS.map((r) => {
                  const isSelected = selectedRegion === r.id;
                  const config = statusConfig[r.status];
                  const isActive = step === "scanning" && isSelected;

                  const y = r.id === "head" ? 20 : r.id === "shoulders" ? 70 : r.id === "back" ? 155 : 265;
                  const h = r.id === "head" ? 50 : r.id === "shoulders" ? 85 : r.id === "back" ? 105 : 110;

                  return (
                    <g key={r.id} className="cursor-pointer" onClick={() => { setSelectedRegion(r.id); setStep("select"); setScanComplete(false); }}>
                      {/* Hover/Select zone */}
                      <rect
                        x="45"
                        y={y}
                        width="110"
                        height={h}
                        rx="10"
                        fill={isSelected ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.02)"}
                        stroke={isSelected ? "#10b981" : "rgba(255,255,255,0.06)"}
                        strokeWidth={isSelected ? "2" : "1"}
                        className="transition-all duration-300"
                      />

                      {/* Scanning line animation */}
                      {isActive && (
                        <rect x="45" y={y} width="110" height="3" rx="1.5" fill="#10b981" opacity="0.9">
                          <animate attributeName="y" from={y} to={y + h} dur="1s" repeatCount="indefinite" />
                        </rect>
                      )}

                      {/* Score badge */}
                      {scanComplete && isSelected && (
                        <g>
                          <circle cx="155" cy={y + 15} r="14" fill={r.status === "healthy" ? "#10b981" : r.status === "attention" ? "#f59e0b" : "#ef4444"} />
                          <text x="155" y={y + 19} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{r.score}</text>
                        </g>
                      )}

                      {/* Region label */}
                      <text
                        x="100"
                        y={y + h / 2 + 4}
                        textAnchor="middle"
                        fill={isSelected ? "white" : "rgba(255,255,255,0.4)"}
                        fontSize="10"
                        fontWeight={isSelected ? "600" : "400"}
                        className="pointer-events-none transition-all duration-300"
                      >
                        {r.name}
                      </text>
                    </g>
                  );
                })}

                {/* Center pulse when scanning */}
                {step === "scanning" && (
                  <circle cx="100" cy="200" r="60" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" from="40" to="100" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
              </svg>
            </div>

            {/* Instruction */}
            {step === "select" && !selectedRegion && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-sm text-gray-500 animate-pulse">↑ Vücudun bir bölgesine tıklayın ↑</p>
              </div>
            )}
          </div>

          {/* Right: Info Panel */}
          <div className="space-y-5">
            {/* Overall Score */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-400">Genel Vücut Skoru</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  avgScore >= 80 ? "bg-emerald-500/10 text-emerald-400" :
                  avgScore >= 60 ? "bg-amber-500/10 text-amber-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {avgScore >= 80 ? "İyi" : avgScore >= 60 ? "Dikkat" : "Uyarı"}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">{scanComplete ? avgScore : "—"}</span>
                <span className="text-sm text-gray-500 mb-1">/ 100</span>
              </div>
              <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${avgScore >= 80 ? "bg-emerald-500" : avgScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: scanComplete ? `${avgScore}%` : "0%" }}
                />
              </div>
            </div>

            {/* Region Selection Grid */}
            <div className="grid grid-cols-2 gap-2">
              {BODY_REGIONS.map((r) => {
                const config = statusConfig[r.status];
                const isSelected = selectedRegion === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => { setSelectedRegion(r.id); setStep("select"); setScanComplete(false); }}
                    className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20"
                        : "bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{r.icon}</span>
                      <span className="text-xs font-medium text-white truncate">{r.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${config.color}`}>{config.label}</span>
                      {scanComplete && isSelected && (
                        <span className="text-xs font-bold text-white">{r.score}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Region Detail */}
            {region && step === "select" && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 animate-fadeIn">
                <h4 className="text-sm font-semibold text-white mb-2">{region.icon} {region.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{region.description}</p>

                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Sorunlar</p>
                    <div className="flex flex-wrap gap-1">
                      {region.problems.map((p) => (
                        <span key={p} className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-[10px]">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Önerilen Masaj</p>
                    <div className="flex flex-wrap gap-1">
                      {region.massageTypes.map((m) => (
                        <span key={m} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px]">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results Panel */}
            {step === "results" && region && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 animate-fadeIn space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-white">Tarama Sonucu</h4>
                  <button onClick={reset} className="text-[10px] text-gray-500 hover:text-white transition-colors">Yeniden Tara</button>
                </div>

                {/* Score */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{region.score}</span>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${statusConfig[region.status].color}`}>
                      {statusConfig[region.status].label}
                    </p>
                    <p className="text-xs text-gray-500">{region.name} bölgesi</p>
                  </div>
                </div>

                {/* Problems */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Tespit Edilen Sorunlar</p>
                  <div className="space-y-1.5">
                    {region.problems.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs text-gray-300">
                        <div className="w-1 h-1 bg-red-400 rounded-full" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Önerilen Çözümler</p>
                  <div className="space-y-1.5">
                    {region.solutions.map((s) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-gray-300">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://wa.me/905551234567?text=Vücut%20tarama%20sonucuma%20göre%20randevu%20almak%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp ile Randevu Al
                </a>
              </div>
            )}

            {/* Scan Button */}
            {step === "select" && selectedRegion && (
              <button
                onClick={startScan}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
                Taramaya Başla
              </button>
            )}

            {step === "scanning" && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-sm">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Bölge analiz ediliyor...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
