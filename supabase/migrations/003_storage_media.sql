-- Create media storage bucket if not exists
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Policy: public can read media
create policy "Public read media"
on storage.objects for select
using (bucket_id = 'media');

-- Policy: authenticated users can upload media
create policy "Authenticated upload media"
on storage.objects for insert
with check (bucket_id = 'media');

-- Policy: authenticated users can update/delete their media
create policy "Authenticated update media"
on storage.objects for update
using (bucket_id = 'media');

create policy "Authenticated delete media"
on storage.objects for delete
using (bucket_id = 'media');
