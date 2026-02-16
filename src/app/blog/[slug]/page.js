import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { notFound } from 'next/navigation';
import BlogContent from '@/components/BlogContent';

async function getBlog(slug) {
    await dbConnect();
    const blog = await Blog.findOne({ slug });
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
}

export const revalidate = 60;

// Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    // Extract plain text from HTML content for description
    const plainText = blog.content.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
        title: `${blog.title} | CryptoTracke Blog`,
        description: plainText || 'Read our latest insights on cryptocurrency and blockchain.',
        openGraph: {
            title: blog.title,
            description: plainText,
            type: 'article',
            publishedTime: blog.createdAt,
            authors: ['CryptoTracke Team'],
            images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: plainText,
            images: blog.coverImage ? [blog.coverImage] : [],
        },
    };
}

export default async function BlogPost({ params }) {
    const { slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        notFound();
    }

    // JSON-LD Schema for Article
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        image: blog.coverImage || '',
        datePublished: blog.createdAt,
        dateModified: blog.createdAt,
        author: {
            '@type': 'Organization',
            name: 'CryptoTracke',
        },
        publisher: {
            '@type': 'Organization',
            name: 'CryptoTracke',
            logo: {
                '@type': 'ImageObject',
                url: 'https://yourdomain.com/logo.png', // Update with actual logo URL
            },
        },
        description: blog.content.replace(/<[^>]*>/g, '').substring(0, 160),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogContent blog={blog} />
        </>
    );
}
