
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';

// Middleware helper to check auth
async function checkAuth() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return session && session.value === 'authenticated';
}

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching blog' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        if (!await checkAuth()) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const body = await req.json();

        const blog = await Blog.findByIdAndUpdate(id, body, {
            returnDocument: 'after',
            runValidators: true,
        });

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, blog });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating blog' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        if (!await checkAuth()) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const { id } = await params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error deleting blog' }, { status: 500 });
    }
}
