
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LearnCard from "@/components/LearnCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock learning content data
const learningContent = [
  {
    id: "blockchain-fundamentals",
    title: "Blockchain Fundamentals",
    description: "Learn the core concepts behind blockchain technology and how it powers cryptocurrencies.",
    category: "Blockchain",
    timeToRead: "15 min",
    difficulty: "beginner" as const,
    link: "/learn/blockchain-fundamentals",
    image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&w=800"
  },
  {
    id: "trading-basics",
    title: "Crypto Trading Basics",
    description: "Understand the essentials of cryptocurrency trading and different market strategies.",
    category: "Trading",
    timeToRead: "20 min",
    difficulty: "intermediate" as const,
    link: "/learn/trading-basics",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&w=800"
  },
  {
    id: "crypto-wallets",
    title: "Understanding Crypto Wallets",
    description: "Learn about different types of cryptocurrency wallets and how to keep your assets secure.",
    category: "Security",
    timeToRead: "10 min",
    difficulty: "beginner" as const,
    link: "/learn/crypto-wallets",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=800"
  },
  {
    id: "defi-explained",
    title: "DeFi Explained",
    description: "Dive into decentralized finance and learn how it's revolutionizing traditional financial systems.",
    category: "DeFi",
    timeToRead: "25 min",
    difficulty: "advanced" as const,
    link: "/learn/defi-explained",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&w=800"
  },
  {
    id: "nft-basics",
    title: "NFT Basics",
    description: "Discover what NFTs are and how they're changing digital ownership and art markets.",
    category: "NFTs",
    timeToRead: "12 min",
    difficulty: "beginner" as const,
    link: "/learn/nft-basics",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&w=800"
  },
  {
    id: "technical-analysis",
    title: "Technical Analysis for Crypto",
    description: "Learn how to read charts and use technical indicators for better trading decisions.",
    category: "Trading",
    timeToRead: "30 min",
    difficulty: "intermediate" as const,
    link: "/learn/technical-analysis",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&w=800"
  },
];

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Extract unique categories
  const categories = ["all", ...Array.from(new Set(learningContent.map(item => item.category)))];
  
  // Filter content based on search term, difficulty, and category
  const filteredContent = learningContent.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-6 md:py-8">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="crypto-gradient rounded-lg p-6 md:p-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn Crypto & Fintech</h1>
              <p className="text-lg opacity-90 mb-6">
                Expand your knowledge with our curated educational resources designed for all skill levels.
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 bg-white/10 text-white border-white/20 placeholder:text-white/70 h-12 text-lg focus-visible:ring-white/30"
                  placeholder="Search tutorials, guides, and more..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Tabs defaultValue="all" value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <TabsList>
                <TabsTrigger value="all">All Levels</TabsTrigger>
                <TabsTrigger value="beginner">Beginner</TabsTrigger>
                <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2 flex-wrap justify-end">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category}
                </Badge>
              ))}
            </div>
          </div>
        </section>
        
        {/* Learning Content Grid */}
        <section>
          {filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <LearnCard key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <footer className="border-t border-border py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CryptoLearn. All rights reserved.</p>
          <p className="mt-1">Educational content provided for informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
