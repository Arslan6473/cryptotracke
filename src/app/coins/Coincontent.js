'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import CoinCard from '@/components/CoinCard';

const CoinsContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialSearch = searchParams.get('search') || '';

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(initialSearch);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCoins();
    }, [page, search]);

    const fetchCoins = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=24h`
            );
            const data = await res.json();

            if (search) {
                const filtered = data.filter(c =>
                    c.name.toLowerCase().includes(search.toLowerCase()) ||
                    c.symbol.toLowerCase().includes(search.toLowerCase())
                );
                setCoins(filtered);
            } else {
                setCoins(data);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        router.push(`/coins?search=${search}`);
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 mb-6">
                    Market Overview
                </h1>
                <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative group">
                    <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search coins..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all pl-12"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </form>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {coins.map((coin, index) => (
                        <CoinCard key={coin.id} coin={coin} index={index} />
                    ))}
                </div>
            )}

            {!loading && (
                <div className="flex justify-center mt-12 space-x-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-6 py-2 bg-white border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(p => p + 1)}
                        className="px-6 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium shadow-sm"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default CoinsContent;
