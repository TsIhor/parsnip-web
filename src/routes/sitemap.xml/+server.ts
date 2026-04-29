import { supabase } from '$lib/supabase';
import { articles } from '$lib/articles';

const SITE_URL = 'https://parsnip-web-7n28.vercel.app';

export async function GET() {
	const [{ data: recipes }, { data: tags }] = await Promise.all([
		supabase.rpc('recipes', { _limit: 10000, _status_ids: [1] }),
		supabase.rpc('app_options').select('*'),
	]);

	const categoryTags: { name: string }[] =
		tags?.[0]?.recipe_tags?.filter((t: any) => t.type?.id === 3) ?? [];

	const urls: string[] = [];

	// Static pages
	const staticPages = [
		{ path: '/',           priority: '1.0', changefreq: 'daily'   },
		{ path: '/recipes',    priority: '0.9', changefreq: 'daily'   },
		{ path: '/categories', priority: '0.8', changefreq: 'weekly'  },
		{ path: '/articles',   priority: '0.7', changefreq: 'weekly'  },
		{ path: '/about',      priority: '0.5', changefreq: 'monthly' },
	];

	for (const p of staticPages) {
		urls.push(`
  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
	}

	// Recipe pages
	for (const r of recipes ?? []) {
		urls.push(`
  <url>
    <loc>${SITE_URL}/recipes/${r.id}</loc>
    ${r.published_at ? `<lastmod>${r.published_at.slice(0, 10)}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
	}

	// Category pages
	for (const tag of categoryTags) {
		urls.push(`
  <url>
    <loc>${SITE_URL}/categories/${encodeURIComponent(tag.name.toLowerCase())}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
	}

	// Article pages
	for (const a of articles) {
		urls.push(`
  <url>
    <loc>${SITE_URL}/articles/${a.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
}
