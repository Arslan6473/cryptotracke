
'use client';
import { motion } from 'framer-motion';
import { Search, TrendingUp, BarChart3, Globe, Zap, Shield, Clock, DollarSign, Activity, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const Hero = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [stats, setStats] = useState({ users: 0, coins: 0, volume: 0 });
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    // Animated counter effect
    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        const targets = { users: 50000, coins: 15000, volume: 2.5 };
        let current = { users: 0, coins: 0, volume: 0 };

        const timer = setInterval(() => {
            current.users = Math.min(current.users + targets.users / steps, targets.users);
            current.coins = Math.min(current.coins + targets.coins / steps, targets.coins);
            current.volume = Math.min(current.volume + targets.volume / steps, targets.volume);

            setStats({
                users: Math.floor(current.users),
                coins: Math.floor(current.coins),
                volume: parseFloat(current.volume.toFixed(1)),
            });

            if (current.users >= targets.users) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        // This code only runs on the client
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/coins?search=${search}`);
        }
    };

    const floatingIcons = [
        { icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50', delay: 0, position: 'top-12 left-5 md:left-10' },
        { icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-50', delay: 0.5, position: 'top-32 right-5 md:-right-10' },
        { icon: Globe, color: 'text-purple-500', bg: 'bg-purple-50', delay: 1, position: 'bottom-40 left-5 md:left-8' },
        { icon: DollarSign, color: 'text-yellow-500', bg: 'bg-yellow-50', delay: 1.5, position: 'bottom-10 right-5 md:right-16' },
        { icon: Activity, color: 'text-pink-500', bg: 'bg-pink-50', delay: 2, position: 'bottom-52 right-0 md:right-5' },
    ];

    const features = [
        { icon: Zap, title: 'Real-time Data', desc: 'Live price updates' },
        { icon: Shield, title: 'Secure', desc: 'Bank-level security' },
        { icon: Clock, title: '24/7 Tracking', desc: 'Never miss a beat' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-linear-to-b from-white via-blue-50/30 to-white">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                    initial={{ x: Math.random() * windowSize.width, y: Math.random() * windowSize.height }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                {/* Floating Icon Cards */}
                {floatingIcons.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={index}
                            animate={{ y: [0, -20, 0] }}
                            transition={{
                                duration: 4 + index,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: item.delay,
                            }}
                            className={`absolute ${item.position} hidden lg:block p-4 ${item.bg} rounded-2xl backdrop-blur-sm border border-gray-100 shadow-lg`}
                        >
                            <Icon className={`w-8 h-8 ${item.color}`} />
                        </motion.div>
                    );
                })}

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6">
                        <Sparkles className="w-4 h-4" />
                        #1 Crypto Tracking Platform
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 tracking-tight leading-tight"
                >
                    Track Crypto
                    <br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-blue-600">Like a Pro</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    CryptoTracke is a free crypto coin tracker online that lets you track portfolios, wallets, and exchanges easily. View live charts, monitor multiple cryptocurrencies, and manage all your coins in one simple crypto chart tracker.

                    <br className="hidden md:block" />
                    Perfect for beginners and small investors seeking real time market insights
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-md mx-auto relative mb-12"
                >
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <input
                            type="text"
                            placeholder="Search coins (e.g. Bitcoin)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="relative w-full px-6 py-4 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 hover:shadow-lg transition-all pl-12 shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </form>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                >
                    <button
                        onClick={() => router.push('/coins')}
                        className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Explore Coins
                    </button>
                    <button
                        onClick={() => router.push('/blog')}
                        className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                        Read Insights
                    </button>
                </motion.div>



            </div>
        </section>
    );
};

export default Hero;
