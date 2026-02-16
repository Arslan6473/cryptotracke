
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const CoinCard = ({ coin, index }) => {
    const isPositive = coin.price_change_percentage_24h > 0;

    return (
        <Link href={`/coin/${coin.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="relative w-12 h-12">
                        <Image
                            src={coin.image}
                            alt={coin.name}
                            fill
                            className="object-contain" // Use unoptimized if strictly needed for external URLs without config
                            unoptimized // For CoinGecko images
                        />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{coin.price_change_percentage_24h?.toFixed(2)}%</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {coin.name}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">
                        {coin.symbol}
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="text-lg font-mono text-gray-900 font-bold">
                            ${coin.current_price?.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Mkt Cap</p>
                        <p className="text-sm font-mono text-gray-600">
                            ${(coin.market_cap / 1e9).toFixed(2)}B
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default CoinCard;
