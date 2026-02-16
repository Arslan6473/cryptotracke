import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export default async function sitemap() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    const blogEntries = blogs.map((blog) => ({
        url: `https://yourdomain.com/blog/${blog.slug}`,
        lastModified: new Date(blog.createdAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

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

    return [...staticPages, ...blogEntries];
}
