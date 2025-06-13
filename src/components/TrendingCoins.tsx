
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CoinCard from "./CoinCard";

// Mock data for demonstration
const mockTrendingCoins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    price: 63452.12,
    change24h: 2.34,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    price: 3421.87,
    change24h: 1.67,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    price: 143.26,
    change24h: -3.21,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ada",
    price: 0.45,
    change24h: -0.82,
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
  }
];

const TrendingCoins = () => {
  const [trending, setTrending] = useState<typeof mockTrendingCoins | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch
    const fetchTrending = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setTrending(mockTrendingCoins);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Trending Coins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="crypto-card flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-12 mt-1" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="mt-auto">
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))
          ) : (
            trending?.map((coin) => (
              <CoinCard 
                key={coin.id}
                id={coin.id}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.price}
                change24h={coin.change24h}
                image={coin.image}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingCoins;
