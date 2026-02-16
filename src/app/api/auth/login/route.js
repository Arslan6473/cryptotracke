
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            (await cookies()).set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24,
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}
