
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, BookOpen, TrendingUp, User, Mail, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import SearchResults from "@/components/SearchResults";
import UserMenu from "@/components/UserMenu";

const Header = () => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Close search dialog with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSearchDialog(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchClick = () => {
    setShowSearchDialog(true);
    setSearchVisible(false);
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
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Contact
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setSearchVisible(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearchClick();
                  }
                }}
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
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/contact">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
          
          <UserMenu />
        </div>
      </div>

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search for coins, tutorials, guides..." 
                  className="h-10 w-full rounded-md border bg-background px-8 text-sm" 
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          <SearchResults query={searchQuery} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
