import { SITE_NAME, SITE_URL, OG_IMAGE } from '@/lib/constants';

export const metadata = {
    title: 'Contact Us',
    description: `Get in touch with ${SITE_NAME}. Have questions about our platform or want to verify listing details? We're here to help.`,
    openGraph: {
        title: `Contact Us | ${SITE_NAME}`,
        description: 'Get in touch with our team. We\'re here to help with any questions.',
        url: `${SITE_URL}/contact`,
        type: 'website',
        images: [OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Contact Us | ${SITE_NAME}`,
        description: 'Get in touch with our team. We\'re here to help.',
        images: [OG_IMAGE],
    },
};

export default function ContactLayout({ children }) {
    return children;
}
