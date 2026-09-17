-- Add category column to gallery_items for certificates/documents/gallery
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'gallery';

-- Update existing items based on label if any were seeded
UPDATE gallery_items SET category = 'certificate' WHERE label ILIKE '%certificate%' OR label ILIKE '%sertifika%';
UPDATE gallery_items SET category = 'document' WHERE label ILIKE '%document%' OR label ILIKE '%dokuman%' OR label ILIKE '%doküman%' OR label ILIKE '%diploma%';
UPDATE gallery_items SET category = 'gallery' WHERE category IS NULL;

-- Add check constraint for valid categories
ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS gallery_items_category_check;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_items_category_check CHECK (category IN ('gallery', 'certificate', 'document'));
