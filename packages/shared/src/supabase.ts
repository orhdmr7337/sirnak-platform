import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type SiteSlug = "tesisat" | "masaj";

export interface Site {
  id: string;
  slug: SiteSlug;
  name: string;
  domain: string | null;
  tagline: string | null;
  slogan: string | null;
  primary_color: string;
  secondary_color: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  working_hours: string;
  instagram_username: string | null;
  tiktok_username: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  site_id: string;
  platform: string;
  url: string;
  username: string | null;
  sort_order: number;
}

export interface Service {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string | null;
  svg_path: string | null;
  image_url: string | null;
  price_info: string | null;
  sort_order: number;
  published: boolean;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  region: string;
  description: string | null;
}

export interface Testimonial {
  id: string;
  site_id: string;
  customer_name: string;
  district: string | null;
  rating: number;
  content: string;
  service_slug: string | null;
  approved: boolean;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  site_id: string;
  name: string;
  phone: string;
  email: string | null;
  district: string | null;
  service_slug: string | null;
  message: string | null;
  status: "new" | "contacted" | "completed";
  created_at: string;
}

export interface BlogPost {
  id: string;
  site_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  district: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  site_id: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
}

export interface ProcessStep {
  id: string;
  site_id: string;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
  published: boolean;
}

export interface TrustItem {
  id: string;
  site_id: string;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  site_id: string;
  title: string;
  label: string | null;
  category: "gallery" | "certificate" | "document";
  image_url: string | null;
  sort_order: number;
  published: boolean;
}

export interface ServiceFinderOption {
  id: string;
  site_id: string;
  need_label: string;
  recommended_service_slug: string;
  sort_order: number;
  published: boolean;
}

export interface SiteContent {
  id: string;
  site_id: string;
  section: string;
  key: string;
  value: string | null;
  value_type: "text" | "html" | "markdown" | "json";
  sort_order: number;
}

export interface MediaFile {
  id: string;
  site_id: string;
  name: string;
  file_type: "video" | "image" | "logo" | "favicon" | "poster";
  storage_path: string;
  public_url: string;
  mime_type: string | null;
  size_bytes: number | null;
  sort_order: number;
}

export interface NavLink {
  id: string;
  site_id: string;
  label: string;
  href: string;
  sort_order: number;
  published: boolean;
}

export interface InstagramPost {
  id: string;
  site_id: string;
  caption: string | null;
  image_url: string | null;
  media_type: "IMAGE" | "CAROUSEL_ALBUM" | "VIDEO";
  status: "draft" | "scheduled" | "published" | "failed";
  scheduled_at: string | null;
  published_at: string | null;
  instagram_post_id: string | null;
}

export interface AdminUser {
  id: string;
  user_id: string;
  role: "admin" | "editor";
}

export interface SiteData {
  site: Site | null;
  socialLinks: SocialLink[];
  services: Service[];
  districts: District[];
  testimonials: Testimonial[];
  faqs: Faq[];
  processSteps: ProcessStep[];
  trustItems: TrustItem[];
  galleryItems: GalleryItem[];
  serviceFinderOptions: ServiceFinderOption[];
  siteContent: SiteContent[];
  mediaFiles: MediaFile[];
  navLinks: NavLink[];
}

// Helper to convert site_content array to keyed record
export function contentBySection(content: SiteContent[]): Record<string, Record<string, string>> {
  return content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = {};
    acc[item.section][item.key] = item.value ?? "";
    return acc;
  }, {} as Record<string, Record<string, string>>);
}

// O(1) lookup map for site_content
export function createContentMap(content: SiteContent[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const item of content) {
    map.set(`${item.section}:${item.key}`, item.value ?? "");
  }
  return map;
}

export function contentValue(content: SiteContent[], section: string, key: string, fallback = ""): string {
  return content.find((c) => c.section === section && c.key === key)?.value ?? fallback;
}

// Optimized contentValue using pre-built map (O(1) lookup)
export function contentValueFromMap(map: Map<string, string>, section: string, key: string, fallback = ""): string {
  return map.get(`${section}:${key}`) ?? fallback;
}
