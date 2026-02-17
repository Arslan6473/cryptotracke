import { SITE_NAME, SITE_URL, OG_IMAGE } from '@/lib/constants';

export const metadata = {
    title: 'Terms of Service',
    description: `Terms of Service for ${SITE_NAME} - Read our terms and conditions. Understand your rights and responsibilities when using our platform.`,
    openGraph: {
        title: `Terms of Service | ${SITE_NAME}`,
        description: 'Read our terms and conditions for using the platform.',
        url: `${SITE_URL}/terms`,
        type: 'website',
        images: [OG_IMAGE],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Terms of Service | ${SITE_NAME}`,
        description: 'Read our terms and conditions for using the platform.',
        images: [OG_IMAGE],
    },
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using CryptoTracke, you accept and agree to be bound by the terms and provision
                    of this agreement.
                </p>

                <h2>2. Use License</h2>
                <p>
                    Permission is granted to temporarily access the materials on CryptoTracke for personal,
                    non-commercial transitory viewing only.
                </p>

                <h2>3. Disclaimer</h2>
                <p>
                    The materials on CryptoTracke are provided on an 'as is' basis. CryptoTracke makes no warranties,
                    expressed or implied, and hereby disclaims and negates all other warranties including, without
                    limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
                    or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2>4. Limitations</h2>
                <p>
                    In no event shall CryptoTracke or its suppliers be liable for any damages (including, without
                    limitation, damages for loss of data or profit, or due to business interruption) arising out of
                    the use or inability to use the materials on CryptoTracke.
                </p>

                <h2>5. Accuracy of Materials</h2>
                <p>
                    The materials appearing on CryptoTracke could include technical, typographical, or photographic
                    errors. CryptoTracke does not warrant that any of the materials on its website are accurate,
                    complete, or current.
                </p>

                <h2>6. Links</h2>
                <p>
                    CryptoTracke has not reviewed all of the sites linked to its website and is not responsible for
                    the contents of any such linked site.
                </p>

                <h2>7. Modifications</h2>
                <p>
                    CryptoTracke may revise these terms of service at any time without notice. By using this website,
                    you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <h2>8. Governing Law</h2>
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws and you
                    irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>

                <h2>9. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at legal@CryptoTracke.com
                </p>
            </div>
        </div>
    );
}
