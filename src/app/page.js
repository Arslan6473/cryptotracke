
import Hero from '@/components/Hero';
import CoinCard from '@/components/CoinCard';
import Link from 'next/link';

async function getTopCoins() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h',
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
}

export default async function Home() {
  const coins = await getTopCoins();

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Top Coins Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600">
            Top 10 Crypto Assets
          </h2>
          <Link
            href="/coins"
            className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center gap-2 group"
          >
            View All
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.length > 0 ? (
            coins.map((coin, index) => (
              <CoinCard key={coin.id} coin={coin} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-500">
              <p>Unable to load market data. Please try again later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Features / Stats Section */}
      <section className="py-20 relative overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Live Market Updates</div>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-gray-600">Coins Tracked</div>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl hover:-translate-y-1 transition-transform">
              <div className="text-4xl font-bold text-green-500 mb-2">Zero</div>
              <div className="text-gray-600">Trading Fees (Demo)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
