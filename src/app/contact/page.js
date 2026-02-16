
'use client';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('sent');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Have questions about our platform or want to verify listing details? We're here to help.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email Us</h3>
                                <p className="text-gray-600">support@CryptoTracke.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Office</h3>
                                <p className="text-gray-600">123 Crypto Valley, Blockchain City</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 transform rotate-3"></div>
                    <div className="relative bg-white/90 backdrop-blur-xl border border-gray-200 p-8 rounded-2xl shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-gray-900"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-gray-900"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none text-gray-900"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'sent'}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${status === 'sent'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-linear-to-r from-blue-600 to-purple-600 hover:opacity-90'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'sent' ? (
                                    'Message Sent!'
                                ) : (
                                    <>Send Message <Send className="w-4 h-4 ml-2" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
