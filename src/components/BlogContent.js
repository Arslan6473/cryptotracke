'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, User, List, } from 'lucide-react';


export default function BlogContent({ blog }) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        // Parse headings from the content
        const elements = Array.from(document.querySelectorAll('.blog-content h2, .blog-content h3'));
        const headingData = elements.map((elem, index) => {
            const id = elem.id || `heading-${index}`;
            elem.id = id; // Ensure element has ID
            return {
                id,
                text: elem.textContent,
                level: elem.tagName.toLowerCase(),
            };
        });
        setHeadings(headingData);

        // Scroll spy
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66%' }
        );

        elements.forEach((elem) => observer.observe(elem));

        return () => observer.disconnect();
    }, [blog.content]);

    const scrollToHeading = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth',
            });
            setActiveId(id);
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(blog.createdAt).toLocaleDateString()}</span>

                </div>
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 mb-8 leading-tight">
                    {blog.title}
                </h1>
                {blog.coverImage && (
                    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div
                        className="blog-content prose prose-lg max-w-none hover:prose-a:text-blue-600 text-gray-700 prose-headings:font-bold prose-headings:text-gray-900 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </div>

                {/* Sidebar TOC */}
                <div className="lg:col-span-1 hidden lg:block">
                    <div className="sticky top-24 space-y-4">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <List className="w-4 h-4 mr-2" /> Table of Contents
                            </h3>
                            <nav className="space-y-1">
                                {headings.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic">No headings found.</p>
                                ) : (
                                    headings.map((heading) => (
                                        <a
                                            key={heading.id}
                                            href={`#${heading.id}`}
                                            onClick={(e) => scrollToHeading(e, heading.id)}
                                            className={`block text-sm py-1.5 px-3 rounded-lg transition-colors border-l-2 ${activeId === heading.id
                                                ? 'bg-blue-50 text-blue-600 border-blue-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-100 border-transparent hover:text-gray-900'
                                                } ${heading.level === 'h3' ? 'ml-4' : ''}`}
                                        >
                                            {heading.text}
                                        </a>
                                    ))
                                )}
                            </nav>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
}
