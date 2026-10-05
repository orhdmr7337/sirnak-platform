// Yalnızca sunucu bileşenlerinde (layout, page, sitemap...) kullanılan veri ve SEO yardımcıları.
// Client bileşenleriyle aynı barrel'dan içe aktarılmaz; bu, RSC paketleme hatalarını önler.
export { getSiteBySlug, getSiteData, getAllServiceSlugs, getDistricts } from "./data";
export { buildJsonLd, buildSiteMetadata, buildBreadcrumbJsonLd, buildFaqJsonLd, joinTr } from "./seo";
