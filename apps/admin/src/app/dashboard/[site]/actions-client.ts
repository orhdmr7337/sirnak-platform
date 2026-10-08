import * as server from "./actions";
import type { ActionResult } from "./actions";

// Sunucu eylemlerini çağırır; { ok: false } dönerse gerçek (Türkçe) mesajla hata fırlatır.
async function unwrap<T>(p: Promise<ActionResult<T>>): Promise<T> {
  const r = await p;
  if (!r.ok) throw new Error(r.error);
  return r.data;
}

export const updateRecord = (...args: Parameters<typeof server.updateRecord>) => unwrap(server.updateRecord(...args));

export const createRecord = (...args: Parameters<typeof server.createRecord>) => unwrap(server.createRecord(...args));

export const deleteRecord = (...args: Parameters<typeof server.deleteRecord>) => unwrap(server.deleteRecord(...args));

export const updateSiteSettings = (...args: Parameters<typeof server.updateSiteSettings>) => unwrap(server.updateSiteSettings(...args));

export const upsertSiteContent = (...args: Parameters<typeof server.upsertSiteContent>) => unwrap(server.upsertSiteContent(...args));

export const uploadMedia = (...args: Parameters<typeof server.uploadMedia>) => unwrap(server.uploadMedia(...args));

export const uploadMediaFormData = (...args: Parameters<typeof server.uploadMediaFormData>) => unwrap(server.uploadMediaFormData(...args));

export const deleteMedia = (...args: Parameters<typeof server.deleteMedia>) => unwrap(server.deleteMedia(...args));

export const approveTestimonial = (...args: Parameters<typeof server.approveTestimonial>) => unwrap(server.approveTestimonial(...args));

export const updateContactStatus = (...args: Parameters<typeof server.updateContactStatus>) => unwrap(server.updateContactStatus(...args));
