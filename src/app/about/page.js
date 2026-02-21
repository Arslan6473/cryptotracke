
import { Users, Target, Shield } from 'lucide-react';
import { SITE_NAME, SITE_URL, OG_IMAGE } from '@/lib/constants';

export const metadata = {
    title: 'About Us',
    description: `Learn about ${SITE_NAME} - your trusted source for real-time cryptocurrency data and insights. We democratize access to professional-grade crypto market data.`,
    openGraph: {
        title: `About Us | ${SITE_NAME}`,
        description: `Learn about ${SITE_NAME} and our mission to provide accurate, real-time cryptocurrency data to empower your investment decisions.`,
        url: `${SITE_URL}/about`,
        type: 'website',
        images: [OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: `About Us | ${SITE_NAME}`,
        description: `Learn about ${SITE_NAME} and our mission to provide accurate, real-time cryptocurrency data.`,
        images: [OG_IMAGE],
    },
};


export default function AboutPage() {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 mb-6">
                    About CryptoTracke
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    CryptoTracke is a simple and easy-to-use platform to track all your cryptocurrencies in one place. With our free crypto coin tracker, live charts, and wallet management tools, you can monitor your portfolios and stay updated with real-time market prices. We help beginners and small investors manage multiple coins easily and make smarter decisions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                        <Target className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                    <p className="text-gray-600">
                        At CryptoTracke, our mission is to make cryptocurrency tracking simple and accessible for everyone. We aim to help users monitor their portfolios, wallets, and live crypto prices easily
                    </p>
                </div>

                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto text-purple-600">
                        <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Our Community</h3>
                    <p className="text-gray-600">
                        Join the CryptoTracke community to connect with crypto enthusiasts, share insights, track portfolios, and stay updated on live market trends.
                    </p>
                </div>

                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Security First</h3>
                    <p className="text-gray-600">
                        We prioritize data accuracy and platform security, ensuring you always have reliable information at your fingertips.
                    </p>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 text-center shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to start tracking?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Join thousands of users who rely on CryptoTracke for their daily market analysis.
                </p>
                <a
                    href="/coins"
                    className="inline-block px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-full text-white font-bold hover:opacity-90 transition-opacity"
                >
                    Explore Market
                </a>
            </div>
        </div>
    );
}
