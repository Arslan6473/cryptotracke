import { Suspense } from "react";
import CoinsContent from "./Coincontent";
import { SITE_NAME, SITE_URL, OG_IMAGE } from '@/lib/constants';

export const metadata = {
    title: 'All Cryptocurrencies',
    description: `Browse and track 10,000+ cryptocurrencies with real-time prices, market cap, volume, and 24h changes. ${SITE_NAME} provides comprehensive crypto market data.`,
    openGraph: {
        title: `All Cryptocurrencies | ${SITE_NAME}`,
        description: 'Browse 10,000+ cryptocurrencies with real-time prices, market cap, and trading volume data.',
        url: `${SITE_URL}/coins`,
        type: 'website',
        images: [OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: `All Cryptocurrencies | ${SITE_NAME}`,
        description: 'Browse 10,000+ cryptocurrencies with real-time market data.',
        images: [OG_IMAGE],
    },
};


export const dynamic = "force-dynamic";

export default function CoinsPage() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <CoinsContent />
        </Suspense>
    );
}
