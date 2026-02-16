
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Image from 'next/image';

async function getBlogs() {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(blogs));
}

export const revalidate = 60;

export default async function BlogPage() {
    const blogs = await getBlogs();

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 mb-4">
                    Latest Insights
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Stay updated with the latest trends, market analysis, and educational content from the crypto world.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link key={blog._id} href={`/blog/${blog.slug}`} className="group">
                            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col shadow-lg hover:shadow-xl">
                                <div className="relative h-48 w-full bg-gray-100">
                                    {blog.coverImage ? (
                                        <Image
                                            src={blog.coverImage}
                                            alt={blog.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center space-x-2 text-sm text-blue-600 mb-3">
                                            <span>Article</span>
                                            <span>•</span>
                                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {blog.title}
                                        </h2>
                                        <div
                                            className="text-gray-600 text-sm line-clamp-3 mb-4"
                                            dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 group-hover:translate-x-2 transition-transform inline-flex items-center">
                                        Read More →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
                        <p className="text-gray-500">Check back later for updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
