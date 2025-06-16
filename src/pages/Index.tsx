
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import TrendingCoins from "@/components/TrendingCoins";
import MarketOverview from "@/components/MarketOverview";
import LearnCard from "@/components/LearnCard";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  // Featured learning content
  const featuredLearning = [
    {
      title: "Blockchain Fundamentals",
      description: "Learn the core concepts behind blockchain technology and how it powers cryptocurrencies.",
      category: "Blockchain",
      timeToRead: "15 min",
      difficulty: "beginner" as const,
      link: "/learn/blockchain-fundamentals"
    },
    {
      title: "Crypto Trading Basics",
      description: "Understand the essentials of cryptocurrency trading and different market strategies.",
      category: "Trading",
      timeToRead: "20 min",
      difficulty: "intermediate" as const,
      link: "/learn/trading-basics"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow container px-4 py-6 md:py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="crypto-gradient rounded-lg p-6 md:p-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Track, Learn, and Master Crypto</h1>
              <p className="text-lg opacity-90 mb-6">
                Real-time market data and educational resources to help you navigate the world of cryptocurrency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-crypto-primary hover:bg-white/90">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link to="/learn">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Tutorials
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MarketOverview />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Market Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Market Cap</p>
                  <p className="text-2xl font-semibold">$2.56T</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">24h Volume</p>
                  <p className="text-2xl font-semibold">$128.3B</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">BTC Dominance</p>
                  <p className="text-2xl font-semibold">52.4%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Cryptocurrencies</p>
                  <p className="text-2xl font-semibold">10,482</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trending Coins Section */}
        <section className="mb-8">
          <TrendingCoins />
        </section>

        {/* Learning Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Start Learning</h2>
            <Button variant="ghost" asChild>
              <Link to="/learn" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {featuredLearning.map((item, index) => (
              <LearnCard key={index} {...item} />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border py-6 bg-background">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CryptoLearn. All rights reserved.</p>
          <p className="mt-1">Market data provided for educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
