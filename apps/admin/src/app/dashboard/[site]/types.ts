import type { PublicSiteData, ContactSubmission, BlogPost } from "@sirnak/shared";

export type AdminSiteData = PublicSiteData & { contactSubmissions: ContactSubmission[]; blogPosts: BlogPost[] };
