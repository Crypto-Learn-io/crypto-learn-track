
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, BookOpen, TrendingUp, User } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full crypto-gradient flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl hidden md:block">CryptoLearn</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Markets
          </Link>
          <Link 
            to="/learn" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/learn') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Learn
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {searchVisible ? (
            <div className="relative animate-fade-in">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                placeholder="Search coins..." 
                className="h-10 w-full md:w-[200px] lg:w-[300px] rounded-md border bg-background px-8 text-sm" 
                autoFocus
                onBlur={() => setSearchVisible(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchVisible(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/learn">
              <BookOpen className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" className="ml-2">
            <User className="h-4 w-4 mr-2" />
            <span>Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
