-- Hizmet sayfaları için uzun metin ve hizmete özel SSS.
alter table services add column if not exists content text;
alter table services add column if not exists faqs jsonb not null default '[]'::jsonb;
comment on column services.content is 'Hizmet sayfasının uzun metni. "## " ile başlayan satır ara başlık, "- " ile başlayan satır madde, boş satır paragraf ayırır.';
comment on column services.faqs is 'Hizmete özel sık sorulan sorular: [{"q": "...", "a": "..."}]';
