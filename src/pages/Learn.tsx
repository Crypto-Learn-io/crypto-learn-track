
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LearnCard from "@/components/LearnCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { learningContent } from "@/data/learningContent";
import { useAuth } from "@/hooks/useAuth";

const Learn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { isAuthenticated } = useAuth();
  
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
              <p className="text-lg opacity-90 mb-4">
                Expand your knowledge with our curated educational resources designed for all skill levels.
              </p>
              {!isAuthenticated && (
                <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/20">
                  <div className="flex items-center gap-3">
                    <UserPlus className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      Create your account to track your progress and save your learning achievements!
                    </span>
                  </div>
                </div>
              )}
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
