import { SITE_URL } from '@/lib/constants';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function sitemap() {
    const baseUrl = SITE_URL;


    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/coins`,
            lastModified: new Date(),
            changeFrequency: 'hourly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];


    let blogPages = [];
    try {
        await dbConnect();
        const blogs = await Blog.find({}).select('slug updatedAt').lean();
        blogPages = blogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt || new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error fetching blogs for sitemap:', error);
    }

    let coinPages = [];
    try {
        const res = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
            { next: { revalidate: 3600 } }
        );

        if (res.ok) {
            const coins = await res.json();
            coinPages = coins.map((coin) => ({
                url: `${baseUrl}/coin/${coin.id}`,
                lastModified: new Date(),
                changeFrequency: 'hourly',
                priority: 0.6,
            }));
        }
    } catch (error) {
        console.error('Error fetching coins for sitemap:', error);
    }

    return [...staticPages, ...blogPages, ...coinPages];
}
