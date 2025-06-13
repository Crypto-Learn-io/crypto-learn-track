
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, BookOpen } from "lucide-react";
import { learningContent } from "@/data/learningContent";

interface SearchResultsProps {
  query: string;
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Filter learning content based on search query
  const filteredLearningContent = learningContent.filter((content) => 
    content.title.toLowerCase().includes(query.toLowerCase()) ||
    content.description.toLowerCase().includes(query.toLowerCase()) ||
    content.category.toLowerCase().includes(query.toLowerCase())
  );
  
  // Mock cryptocurrency search results based on query
  const mockCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: "$45,236.78", change: "+2.4%" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", price: "$2,456.91", change: "+1.8%" },
    { id: "cardano", name: "Cardano", symbol: "ADA", price: "$1.23", change: "-0.5%" },
    { id: "solana", name: "Solana", symbol: "SOL", price: "$98.45", change: "+3.7%" },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", price: "$19.76", change: "-1.2%" },
  ];
  
  const filteredCoins = mockCoins.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  if (!query.trim()) {
    return (
      <div className="py-6 text-center text-muted-foreground">
        Start typing to search
      </div>
    );
  }

  const hasResults = filteredLearningContent.length > 0 || filteredCoins.length > 0;

  if (!hasResults) {
    return (
      <div className="py-6 text-center">
        <p className="text-lg font-medium">No results found for "{query}"</p>
        <p className="text-muted-foreground mt-1">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="coins">Coins</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredCoins.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Cryptocurrencies</h3>
              <div className="space-y-2">
                {filteredCoins.slice(0, 3).map((coin) => (
                  <Link 
                    key={coin.id}
                    to={`/coin/${coin.id}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <Coins className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{coin.name} ({coin.symbol})</div>
                        <div className="text-sm text-muted-foreground">{coin.price}</div>
                      </div>
                    </div>
                    <Badge variant={coin.change.startsWith('+') ? "default" : "destructive"}>
                      {coin.change}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {filteredLearningContent.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Learning Resources</h3>
              <div className="space-y-2">
                {filteredLearningContent.slice(0, 3).map((content) => (
                  <Link 
                    key={content.id}
                    to={content.link}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{content.title}</div>
                        <div className="text-sm text-muted-foreground">{content.category} · {content.timeToRead}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{content.difficulty}</Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="coins">
          {filteredCoins.length > 0 ? (
            <div className="space-y-2">
              {filteredCoins.map((coin) => (
                <Link 
                  key={coin.id}
                  to={`/coin/${coin.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{coin.name} ({coin.symbol})</div>
                      <div className="text-sm text-muted-foreground">{coin.price}</div>
                    </div>
                  </div>
                  <Badge variant={coin.change.startsWith('+') ? "default" : "destructive"}>
                    {coin.change}
                  </Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">No coins found matching "{query}"</p>
          )}
        </TabsContent>
        
        <TabsContent value="learning">
          {filteredLearningContent.length > 0 ? (
            <div className="space-y-2">
              {filteredLearningContent.map((content) => (
                <Link 
                  key={content.id}
                  to={content.link}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-muted-foreground">{content.category} · {content.timeToRead}</div>
                    </div>
                  </div>
                  <Badge variant="outline">{content.difficulty}</Badge>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">No learning resources found matching "{query}"</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
