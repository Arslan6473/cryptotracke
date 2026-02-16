import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    const blogEntries = blogs.map((blog) => `
    <url>
      <loc>https://yourdomain.com/blog/${blog.slug}</loc>
      <lastmod>${new Date(blog.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `);

    const staticPages = [
        {
            url: 'https://yourdomain.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://yourdomain.com/coins',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://yourdomain.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: 'https://yourdomain.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://yourdomain.com/contact',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    const staticXml = staticPages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastModified.toISOString()}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${[...staticXml, ...blogEntries].join('')}
</urlset>`;

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
