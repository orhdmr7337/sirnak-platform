const { createClient } = require('@supabase/supabase-js');
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL and SUPABASE_ANON_KEY environment variables');
  process.exit(1);
}

const supabase = createClient(url, key);

async function test() {
  const { data: sites, error: sitesError } = await supabase.from('sites').select('*');
  console.log('Sites:', sites?.length, sitesError?.message);
  
  const { data: services, error: servicesError } = await supabase.from('services').select('*');
  console.log('Services:', services?.length, servicesError?.message);
  
  const { data: content, error: contentError } = await supabase.from('site_content').select('*').limit(5);
  console.log('Site content sample:', content?.map(c => c.section + '.' + c.key), contentError?.message);
  
  const { data: nav, error: navError } = await supabase.from('nav_links').select('*').limit(5);
  console.log('Nav links:', nav?.map(n => n.label), navError?.message);
}

test();
