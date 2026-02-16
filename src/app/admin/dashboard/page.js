
'use client';
import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { Bold, Italic, List, Heading, Link as LinkIcon, Image as ImageIcon, Save, LogOut, Edit, Trash2, Plus, Undo, Redo, Strikethrough, Code, ListOrdered, Quote, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [uploading, setUploading] = useState(false);

    // New State for Management
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    const editor = useEditor({
        extensions: [
            StarterKit,
            ImageExtension,
            LinkExtension,
        ],
        content: '<p>Start writing your blog post...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px]',
            },
        },
        immediatelyRender: false,
    });

    // Fetch blogs on mount
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setCoverImage(data.url); // For cover image
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const addImageToContent = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Upload image then insert into editor
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
                editor.chain().focus().setImage({ src: data.url }).run();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        if (!title || !slug || !editor) return;

        try {
            const url = isEditing ? `/api/blogs/${editingId}` : '/api/blogs';
            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    slug,
                    content: editor.getHTML(),
                    coverImage,
                }),
            });

            if (res.ok) {
                alert(isEditing ? 'Blog post updated!' : 'Blog post created!');
                resetForm();
                fetchBlogs(); // Refresh list
            } else {
                alert('Failed to save blog');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving blog');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert('Blog post deleted');
                fetchBlogs();
                if (editingId === id) resetForm();
            } else {
                alert('Failed to delete blog');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting blog');
        }
    };

    const handleEdit = (blog) => {
        setIsEditing(true);
        setEditingId(blog._id);
        setTitle(blog.title);
        setSlug(blog.slug);
        setCoverImage(blog.coverImage || '');
        editor?.commands.setContent(blog.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setTitle('');
        setSlug('');
        setCoverImage('');
        editor?.commands.setContent('<p>Start writing your blog post...</p>');
    };

    const handleLogout = () => {

        router.push('/admin');
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        consturl = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-600 transition-colors">
                            <LogOut className="w-5 h-5 mr-2" /> Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Editor Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {isEditing ? 'Edit Post' : 'Create New Post'}
                                </h2>
                                {isEditing && (
                                    <button
                                        onClick={resetForm}
                                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Create New
                                    </button>
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Post Title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    if (!isEditing) {
                                        setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                                    }
                                }}
                                className="w-full bg-transparent text-3xl font-bold placeholder-gray-400 focus:outline-none mb-4 text-gray-900"
                            />
                            <div className="flex items-center text-sm text-gray-500 mb-6">
                                <span className="mr-2">Slug:</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none grow text-gray-700"
                                />
                            </div>

                            {/* Editor Toolbar */}
                            <div className="flex flex-wrap gap-2 mb-4 p-2 bg-gray-100 rounded-lg border border-gray-200 sticky top-4 z-10 items-center">
                                {/* History */}
                                <button
                                    onClick={() => editor?.chain().focus().undo().run()}
                                    disabled={!editor?.can().undo()}
                                    className="p-2 rounded hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                                    title="Undo"
                                >
                                    <Undo className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().redo().run()}
                                    disabled={!editor?.can().redo()}
                                    className="p-2 rounded hover:bg-white hover:shadow-sm transition-all disabled:opacity-50"
                                    title="Redo"
                                >
                                    <Redo className="w-4 h-4" />
                                </button>
                                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                                {/* Formatting */}
                                <button
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('bold') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Bold"
                                >
                                    <Bold className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('italic') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Italic"
                                >
                                    <Italic className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('strike') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Strike"
                                >
                                    <Strikethrough className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleCode().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('code') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Inline Code"
                                >
                                    <Code className="w-4 h-4" />
                                </button>

                                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                                {/* Headings */}
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5, 6].map(level => (
                                        <button
                                            key={level}
                                            onClick={() => editor?.chain().focus().toggleHeading({ level }).run()}
                                            className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all text-sm font-bold ${editor?.isActive('heading', { level }) ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                            title={`Heading ${level}`}
                                        >
                                            H{level}
                                        </button>
                                    ))}
                                </div>

                                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                                {/* Lists & Blocks */}
                                <button
                                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('bulletList') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Bullet List"
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('orderedList') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Ordered List"
                                >
                                    <ListOrdered className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('blockquote') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Blockquote"
                                >
                                    <Quote className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                                    className="p-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-600"
                                    title="Horizontal Rule"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>

                                <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

                                {/* Media */}
                                <button
                                    onClick={setLink}
                                    className={`p-2 rounded hover:bg-white hover:shadow-sm transition-all ${editor?.isActive('link') ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'}`}
                                    title="Link"
                                >
                                    <LinkIcon className="w-4 h-4" />
                                </button>
                                <label className="p-2 rounded hover:bg-white hover:shadow-sm transition-all cursor-pointer text-gray-600 hover:text-blue-600" title="Image">
                                    <ImageIcon className="w-4 h-4" />
                                    <input type="file" className="hidden" onChange={addImageToContent} accept="image/*" />
                                </label>
                            </div>

                            <div className="min-h-[500px] border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                                <EditorContent editor={editor} />
                            </div>
                        </div>

                        {/* Recent Blogs List */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-xl mb-6 text-gray-900">Manage Posts</h3>
                            <div className="space-y-4">
                                {isLoading ? (
                                    <p className="text-gray-500 text-center py-4">Loading posts...</p>
                                ) : blogs.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No posts yet.</p>
                                ) : (
                                    blogs.map(blog => (
                                        <div key={blog._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                                            <div className="truncate flex-1 pr-4">
                                                <h4 className="font-bold text-gray-900 truncate">{blog.title}</h4>
                                                <p className="text-xs text-gray-500">/{blog.slug}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(blog)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-6">
                            <h3 className="font-bold mb-4 text-gray-900">Publishing</h3>
                            <div className="space-y-4">
                                <button
                                    onClick={handleSave}
                                    className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg font-bold text-white hover:opacity-90 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center transform hover:-translate-y-0.5"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isEditing ? 'Update Post' : 'Publish Post'}
                                </button>
                                {isEditing && (
                                    <button
                                        onClick={resetForm}
                                        className="w-full py-2 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>

                            <div className="mt-8">
                                <h3 className="font-bold mb-4 text-gray-900">Cover Image</h3>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors cursor-pointer relative bg-gray-50 hover:bg-blue-50">
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    {coverImage ? (
                                        <div className="relative h-40 w-full rounded-lg overflow-hidden shadow-md">
                                            <img src={coverImage} alt="Cover" className="object-cover w-full h-full" />
                                        </div>
                                    ) : (
                                        <div className="py-8">
                                            {uploading ? (
                                                <span className="text-gray-500">Uploading...</span>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                    <span className="text-sm text-gray-500">Click to upload cover</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
