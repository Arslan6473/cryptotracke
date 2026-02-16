
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        // Check auth
        const cookieStore = await cookies();
        const session = cookieStore.get('admin_session');

        if (!session || session.value !== 'authenticated') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        const blog = await Blog.create(body);


        return NextResponse.json({ success: true, blog }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error creating blog' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
    }
}
