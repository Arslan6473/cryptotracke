export const metadata = {
    title: 'Privacy Policy | CryptoTracke',
    description: 'Privacy Policy for CryptoTracke - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Information We Collect</h2>
                <p>
                    We collect information that you provide directly to us, including when you create an account,
                    subscribe to our newsletter, or contact us for support.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Monitor and analyze trends and usage</li>
                </ul>

                <h2>3. Information Sharing</h2>
                <p>
                    We do not share your personal information with third parties except as described in this policy.
                    We may share information with service providers who perform services on our behalf.
                </p>

                <h2>4. Cookies and Tracking</h2>
                <p>
                    We use cookies and similar tracking technologies to collect information about your browsing
                    activities. You can control cookies through your browser settings.
                </p>

                <h2>5. Third-Party Advertising</h2>
                <p>
                    We use Google AdSense to display advertisements. Google may use cookies to serve ads based on
                    your prior visits to our website. You can opt out of personalized advertising by visiting
                    Google's Ads Settings.
                </p>

                <h2>6. Data Security</h2>
                <p>
                    We take reasonable measures to protect your information from unauthorized access, use, or
                    disclosure. However, no internet transmission is completely secure.
                </p>

                <h2>7. Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your personal information. Contact us at
                    privacy@CryptoTracke.com for assistance.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by
                    posting the new policy on this page.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have questions about this Privacy Policy, please contact us at privacy@CryptoTracke.com
                </p>
            </div>
        </div>
    );
}
