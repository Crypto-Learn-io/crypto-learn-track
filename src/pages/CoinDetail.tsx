
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowUp, ArrowDown, Calendar, Info, BookOpen } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Mock data for demonstration
const coinData = {
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 63452.12,
    change24h: 2.34,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    marketCap: 1235000000000,
    volume24h: 28500000000,
    circulatingSupply: 19468000,
    allTimeHigh: 69000,
    description: "Bitcoin is the first decentralized cryptocurrency, released as open-source software in 2009. It operates on a peer-to-peer network without the need for intermediaries and without a central repository or single administrator. The blockchain technology behind Bitcoin enables transactions that are verified by network nodes through cryptography and recorded in a public distributed ledger.",
    chartData: [
      { date: "May 10", price: 59000 },
      { date: "May 11", price: 60500 },
      { date: "May 12", price: 61200 },
      { date: "May 13", price: 60800 },
      { date: "May 14", price: 61500 },
      { date: "May 15", price: 62700 },
      { date: "May 16", price: 63452 },
    ]
  },
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3421.87,
    change24h: 1.67,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    marketCap: 412000000000,
    volume24h: 12300000000,
    circulatingSupply: 120450000,
    allTimeHigh: 4878,
    description: "Ethereum is a decentralized, open-source blockchain featuring smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization, after Bitcoin. The Ethereum platform enables developers to build and deploy decentralized applications (dApps) and smart contracts without third-party interference.",
    chartData: [
      { date: "May 10", price: 3200 },
      { date: "May 11", price: 3250 },
      { date: "May 12", price: 3300 },
      { date: "May 13", price: 3280 },
      { date: "May 14", price: 3350 },
      { date: "May 15", price: 3400 },
      { date: "May 16", price: 3421 },
    ]
  },
  solana: {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 143.26,
    change24h: -3.21,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    marketCap: 62500000000,
    volume24h: 2450000000,
    circulatingSupply: 436500000,
    allTimeHigh: 260,
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's designed to handle thousands of transactions per second and charges extremely low transaction fees, making it ideal for various applications including DeFi, NFTs, and Web3 projects.",
    chartData: [
      { date: "May 10", price: 155 },
      { date: "May 11", price: 152 },
      { date: "May 12", price: 148 },
      { date: "May 13", price: 149 },
      { date: "May 14", price: 147 },
      { date: "May 15", price: 146 },
      { date: "May 16", price: 143 },
    ]
  },
  cardano: {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    change24h: -0.82,
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    marketCap: 15800000000,
    volume24h: 472000000,
    circulatingSupply: 35128000000,
    allTimeHigh: 3.10,
    description: "Cardano is a proof-of-stake blockchain platform that says its goal is to allow 'changemakers, innovators and visionaries' to bring about positive global change. Cardano was founded back in 2017 by Charles Hoskinson, and it aims to directly compete with Ethereum and other decentralized application platforms.",
    chartData: [
      { date: "May 10", price: 0.46 },
      { date: "May 11", price: 0.46 },
      { date: "May 12", price: 0.47 },
      { date: "May 13", price: 0.46 },
      { date: "May 14", price: 0.46 },
      { date: "May 15", price: 0.455 },
      { date: "May 16", price: 0.45 },
    ]
  }
};

const CoinDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [timeframe, setTimeframe] = useState("7d");
  const coin = id && coinData[id as keyof typeof coinData];
  
  if (!coin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Coin not found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Markets
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  const isPositive = coin.change24h >= 0;
  
  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${num.toLocaleString()}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-6 md:py-8">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4 -ml-2 p-2" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Markets
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{coin.name}</h1>
                  <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-md uppercase">{coin.symbol}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-semibold">${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className={`flex items-center ${isPositive ? 'text-crypto-green' : 'text-crypto-red'}`}>
                    {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {Math.abs(coin.change24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">Add to Watchlist</Button>
              <Button>Trade</Button>
            </div>
          </div>
        </div>
        
        {/* Price Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Price Chart</CardTitle>
              <div className="flex items-center gap-2">
                <Tabs defaultValue="7d" value={timeframe} onValueChange={setTimeframe} className="w-auto">
                  <TabsList className="grid grid-cols-4 h-8">
                    <TabsTrigger value="24h" className="text-xs">24H</TabsTrigger>
                    <TabsTrigger value="7d" className="text-xs">7D</TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs">30D</TabsTrigger>
                    <TabsTrigger value="1y" className="text-xs">1Y</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={coin.chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'var(--muted-foreground)' }} 
                  />
                  <YAxis 
                    domain={['dataMin - 1000', 'dataMax + 1000']} 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)', 
                      borderColor: 'var(--border)',
                      borderRadius: '0.5rem' 
                    }} 
                    itemStyle={{ color: 'var(--foreground)' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, coin.symbol]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={isPositive ? "#10B981" : "#EF4444"} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Market Stats and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl">About {coin.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{coin.description}</p>
              <div className="mt-6 flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link to="/learn/blockchain-fundamentals">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Learn about Blockchain
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link to="/learn/trading-basics">
                    <Calendar className="h-3 w-3 mr-1" />
                    Crypto Trading Basics
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link to="/learn">
                    <Info className="h-3 w-3 mr-1" />
                    More Tutorials
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Market Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-lg font-semibold">{formatNumber(coin.marketCap)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">24h Trading Volume</p>
                <p className="text-lg font-semibold">{formatNumber(coin.volume24h)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Circulating Supply</p>
                <p className="text-lg font-semibold">{coin.circulatingSupply.toLocaleString()} {coin.symbol}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">All-Time High</p>
                <p className="text-lg font-semibold">${coin.allTimeHigh.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CryptoLearn. All rights reserved.</p>
          <p className="mt-1">Market data provided for educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoinDetail;
