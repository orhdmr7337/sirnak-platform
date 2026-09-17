import { supabase } from "./supabase";
import { checkRateLimit } from "./rate-limiter";
import { sanitizeInput } from "./sanitize";
import type {
  Site,
  SiteSlug,
  Service,
  District,
  Testimonial,
  Faq,
  ProcessStep,
  TrustItem,
  GalleryItem,
  ServiceFinderOption,
  SiteContent,
  MediaFile,
  NavLink,
  SocialLink,
  ContactSubmission,
  BlogPost,
} from "./supabase";

export async function getServiceBySlug(
  siteId: string,
  slug: string
): Promise<Service | null> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("site_id", siteId)
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error) {
    console.error("getServiceBySlug error:", error.message);
    return null;
  }
  return data as Service;
}

export async function getSiteBySlug(slug: SiteSlug): Promise<Site | null> {
  const { data, error } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("getSiteBySlug error:", error.message);
    return null;
  }
  return data as Site;
}

export async function getSiteData(slug: SiteSlug) {
  const site = await getSiteBySlug(slug);
  if (!site) return null;

  const siteId = site.id;

  const [
    services,
    districts,
    testimonials,
    faqs,
    processSteps,
    trustItems,
    galleryItems,
    serviceFinderOptions,
    siteContent,
    mediaFiles,
    navLinks,
    socialLinks,
  ] = await Promise.all([
    supabase.from("services").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("districts").select("*").order("name", { ascending: true }),
    supabase.from("testimonials").select("*").eq("site_id", siteId).eq("approved", true).order("created_at", { ascending: false }).limit(20),
    supabase.from("faqs").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("process_steps").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("trust_items").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("gallery_items").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("service_finder_options").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("site_content").select("*").eq("site_id", siteId).order("section").order("sort_order", { ascending: true }),
    supabase.from("media_files").select("*").eq("site_id", siteId).order("file_type").order("sort_order", { ascending: true }),
    supabase.from("nav_links").select("*").eq("site_id", siteId).eq("published", true).order("sort_order", { ascending: true }),
    supabase.from("site_social_links").select("*").eq("site_id", siteId).order("sort_order", { ascending: true }),
  ]);

  return {
    site,
    services: (services.data ?? []) as Service[],
    districts: (districts.data ?? []) as District[],
    testimonials: (testimonials.data ?? []) as Testimonial[],
    faqs: (faqs.data ?? []) as Faq[],
    processSteps: (processSteps.data ?? []) as ProcessStep[],
    trustItems: (trustItems.data ?? []) as TrustItem[],
    galleryItems: (galleryItems.data ?? []) as GalleryItem[],
    serviceFinderOptions: (serviceFinderOptions.data ?? []) as ServiceFinderOption[],
    siteContent: (siteContent.data ?? []) as SiteContent[],
    mediaFiles: (mediaFiles.data ?? []) as MediaFile[],
    navLinks: (navLinks.data ?? []) as NavLink[],
    socialLinks: (socialLinks.data ?? []) as SocialLink[],
  };
}

export async function getAllServiceSlugs(
  siteId: string
): Promise<{ slug: string }[]> {
  const { data, error } = await supabase
    .from("services")
    .select("slug")
    .eq("site_id", siteId)
    .eq("published", true);
  if (error) {
    console.error("getAllServiceSlugs error:", error.message);
    return [];
  }
  return (data ?? []).map((s: { slug: string }) => ({ slug: s.slug }));
}

export type PublicSiteData = NonNullable<Awaited<ReturnType<typeof getSiteData>>>;

export async function submitContact(formData: {
  site_id: string;
  name: string;
  phone: string;
  email?: string;
  district?: string;
  service_slug?: string;
  message?: string;
}) {
  const rateCheck = checkRateLimit(formData.phone);
  if (!rateCheck.allowed) {
    return {
      data: null,
      error: {
        message: "Çok fazla gönderim yaptınız. Lütfen daha sonra tekrar deneyin.",
        retryAfterMs: rateCheck.retryAfterMs,
      },
    };
  }

  const { data, error } = await supabase.from("contact_submissions").insert({
    site_id: formData.site_id,
    name: sanitizeInput(formData.name, 100),
    phone: sanitizeInput(formData.phone, 20),
    email: formData.email ? sanitizeInput(formData.email, 150) : null,
    district: formData.district ? sanitizeInput(formData.district, 100) : null,
    service_slug: formData.service_slug ? sanitizeInput(formData.service_slug, 100) : null,
    message: formData.message ? sanitizeInput(formData.message, 1000) : null,
    status: "new",
  });

  return { data, error };
}

export async function getContactSubmissions(siteId?: string) {
  let query = supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (siteId) query = query.eq("site_id", siteId);
  const { data, error } = await query;
  if (error) {
    console.error("getContactSubmissions error:", error.message);
    return [];
  }
  return (data ?? []) as ContactSubmission[];
}

export async function getDistrictBySlug(slug: string): Promise<District | null> {
  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("getDistrictBySlug error:", error.message);
    return null;
  }
  return data as District;
}

export async function getDistricts(): Promise<District[]> {
  const { data, error } = await supabase
    .from("districts")
    .select("*")
    .order("name", { ascending: true });
  if (error) {
    console.error("getDistricts error:", error.message);
    return [];
  }
  return (data ?? []) as District[];
}

export async function getDistrictsWithServices(siteId: string) {
  const { data: districts, error: districtsError } = await supabase
    .from("districts")
    .select("*")
    .order("name", { ascending: true });

  if (districtsError) {
    console.error("getDistrictsWithServices districts error:", districtsError.message);
    return [];
  }

  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("*")
    .eq("site_id", siteId)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (servicesError) {
    console.error("getDistrictsWithServices services error:", servicesError.message);
    return (districts ?? []).map((d) => ({ ...d, services: [] }));
  }

  return (districts ?? []).map((d) => ({
    ...d,
    services: services ?? [],
  }));
}

export async function getBlogPosts(siteId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("site_id", siteId)
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getBlogPosts error:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getBlogPostBySlug(siteId: string, slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("site_id", siteId)
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("getBlogPostBySlug error:", error.message);
    return null;
  }
  return data as BlogPost;
}

export async function getAllBlogPosts(siteId: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllBlogPosts error:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}
