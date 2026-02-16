
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { ArrowUp, ArrowDown, ExternalLink, ArrowLeft } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function CoinDetail() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const [coin, setCoin] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [days, setDays] = useState('7'); // Changed to string to match new button values
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchCoinData();
            fetchChartData();
        }
    }, [id, days]);

    const fetchCoinData = async () => {
        try {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`);
            const data = await res.json();
            setCoin(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChartData = async () => {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
            );
            const data = await response.json();

            setChartData({
                labels: data.prices.map(price => {
                    const date = new Date(price[0]);
                    return days === '1' ? date.toLocaleTimeString() : date.toLocaleDateString();
                }),
                datasets: [{
                    fill: true,
                    label: 'Price (USD)',
                    data: data.prices.map(price => price[1]),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    pointRadius: 0,
                }]
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading || !coin) return (
        <div className="min-h-screen flex items-center justify-center text-blue-600">Loading...</div>
    );

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </button>

                <div className="flex items-center space-x-4 mb-6">
                    {coin.image?.large && (
                        <img src={coin.image.large} alt={coin.name} className="w-16 h-16 rounded-full shadow-md" />
                    )}
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">{coin.name}</h1>
                        <span className="text-gray-500 uppercase font-mono">{coin.symbol}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">Current Price</p>
                        <p className="text-2xl font-bold text-gray-900">
                            ${coin.market_data?.current_price?.usd?.toLocaleString() || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">Market Cap</p>
                        <p className="text-2xl font-bold text-gray-900">
                            ${coin.market_data?.market_cap?.usd?.toLocaleString() || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">24h Low / High</p>
                        <p className="text-lg font-bold text-gray-900">
                            ${coin.market_data?.low_24h?.usd?.toLocaleString() || 'N/A'} / ${coin.market_data?.high_24h?.usd?.toLocaleString() || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <p className="text-gray-500 text-sm mb-1">24h Change</p>
                        <div className={`text-2xl font-bold flex items-center ${coin.market_data?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coin.market_data?.price_change_percentage_24h?.toFixed(2) || '0.00'}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Price Chart</h2>
                            <div className="flex space-x-2">
                                {['1', '7', '30', '90', '365'].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDays(d)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${days === d ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {d === '365' ? '1Y' : `${d}D`}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {chartData && (
                            <div className="h-[400px] w-full">
                                <Line
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: {
                                                mode: 'index',
                                                intersect: false,
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                                titleColor: '#111827',
                                                bodyColor: '#4b5563',
                                                borderColor: 'rgba(0,0,0,0.1)',
                                                borderWidth: 1,
                                            },
                                        },
                                        scales: {
                                            x: {
                                                grid: { display: false, drawBorder: false },
                                                ticks: { color: '#9ca3af', maxTicksLimit: 8 },
                                            },
                                            y: {
                                                grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
                                                ticks: { color: '#9ca3af' },
                                            },
                                        },
                                        interaction: {
                                            mode: 'nearest',
                                            axis: 'x',
                                            intersect: false
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">About {coin.name}</h3>
                        <div
                            className="text-gray-600 text-sm leading-relaxed line-clamp-10"
                            dangerouslySetInnerHTML={{ __html: coin.description?.en || 'No description available.' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
