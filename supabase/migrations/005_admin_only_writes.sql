-- Yazma izinleri yalnızca admin_users listesindeki admin/editor kullanıcılara.
-- Önceden giriş yapmış herhangi bir kullanıcı her tabloyu (admin_users dahil) değiştirebiliyor,
-- media deposuna ise giriş yapmamış biri bile dosya yükleyip silebiliyordu.
-- Mevcut politikalar ALTER POLICY ile daraltılır (adları korunur).

create or replace function public.is_site_editor() returns boolean language sql stable security definer set search_path = public as 'select exists (select 1 from public.admin_users where user_id = auth.uid() and role in (''admin'', ''editor''))';
create or replace function public.is_site_admin() returns boolean language sql stable security definer set search_path = public as 'select exists (select 1 from public.admin_users where user_id = auth.uid() and role = ''admin'')';
grant execute on function public.is_site_editor() to authenticated, anon;
grant execute on function public.is_site_admin() to authenticated, anon;

alter policy "Authenticated full access blog_posts" on public.blog_posts using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access contact_submissions" on public.contact_submissions using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access districts" on public.districts using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access faqs" on public.faqs using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access gallery_items" on public.gallery_items using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access instagram_posts" on public.instagram_posts using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access media_files" on public.media_files using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access nav_links" on public.nav_links using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access process_steps" on public.process_steps using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access service_finder_options" on public.service_finder_options using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access services" on public.services using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access site_content" on public.site_content using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access site_social_links" on public.site_social_links using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access sites" on public.sites using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access testimonials" on public.testimonials using (public.is_site_editor()) with check (public.is_site_editor());
alter policy "Authenticated full access trust_items" on public.trust_items using (public.is_site_editor()) with check (public.is_site_editor());

alter policy "Authenticated full access admin_users" on public.admin_users using (user_id = auth.uid() or public.is_site_admin()) with check (public.is_site_admin());

alter policy "Authenticated upload media" on storage.objects to authenticated with check (bucket_id = 'media' and public.is_site_editor());
alter policy "Authenticated update media" on storage.objects to authenticated using (bucket_id = 'media' and public.is_site_editor());
alter policy "Authenticated delete media" on storage.objects to authenticated using (bucket_id = 'media' and public.is_site_editor());

-- faqs için ayrıca oluşturulmuş aynı kurallı politika (zararsız):
-- "Editors full access faqs" using/with check public.is_site_editor()
