import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                            CryptoTracke
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Real-time cryptocurrency tracking, market insights, and expert analysis in one place.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link href="/coins" className="hover:text-blue-600 transition-colors">Market</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-blue-600 hover:scale-110 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} CryptoTracke. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
