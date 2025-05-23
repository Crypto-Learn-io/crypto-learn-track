
import { useState } from "react";
import { User, BookOpen, CheckCircle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

// Course data mapping
const courses = [
  { id: "blockchain-fundamentals", name: "Blockchain Fundamentals", path: "/learn/blockchain-fundamentals" },
  { id: "trading-basics", name: "Trading Basics", path: "/learn/trading-basics" },
  { id: "crypto-wallets", name: "Crypto Wallets", path: "/learn/crypto-wallets" },
  { id: "defi-explained", name: "DeFi Explained", path: "/learn/defi-explained" },
  { id: "nft-basics", name: "NFT Basics", path: "/learn/nft-basics" },
  { id: "technical-analysis", name: "Technical Analysis", path: "/learn/technical-analysis" },
];

const UserMenu = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, isAuthenticated, logout } = useAuth();

  const handleLoginClick = () => {
    setActiveTab("login");
    setShowAuthDialog(true);
  };

  const handleRegisterClick = () => {
    setActiveTab("register");
    setShowAuthDialog(true);
  };

  const handleLogout = () => {
    logout();
  };

  // Calculate total progress across all courses
  const calculateOverallProgress = () => {
    if (!user || !user.courseProgress) return 0;
    
    const totalCourses = courses.length;
    let totalProgress = 0;
    
    // Count completed courses
    user.completedCourses?.forEach(courseId => {
      if (!user.courseProgress[courseId]) {
        totalProgress += 100;
      }
    });
    
    // Add progress from in-progress courses
    Object.entries(user.courseProgress).forEach(([courseId, progress]) => {
      if (!user.completedCourses?.includes(courseId)) {
        totalProgress += progress;
      }
    });
    
    return Math.round((totalProgress / (totalCourses * 100)) * 100) || 0;
  };

  const overallProgress = calculateOverallProgress();

  if (!isAuthenticated) {
    return (
      <>
        <Button variant="outline" size="sm" onClick={handleLoginClick}>
          <User className="h-4 w-4 mr-2" />
          <span>Login</span>
        </Button>

        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Account</DialogTitle>
              <DialogDescription>
                Login or create a new account to track your progress and save your preferences.
              </DialogDescription>
            </DialogHeader>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AuthForm mode="login" onSuccess={() => setShowAuthDialog(false)} />
              </TabsContent>
              <TabsContent value="register">
                <AuthForm mode="register" onSuccess={() => setShowAuthDialog(false)} />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center pr-3">
          <User className="h-4 w-4 mr-2" />
          <span className="mr-2">{user?.username}</span>
          <div className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-full text-xs">
            <BarChart className="h-3 w-3" />
            <span>{overallProgress}%</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Learning Progress</DropdownMenuLabel>
        <div className="p-2">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span>Overall progress</span>
            <span className="font-medium">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2 mb-3" />
        </div>
        
        <DropdownMenuLabel>Course Status</DropdownMenuLabel>
        <div className="max-h-60 overflow-y-auto py-1">
          {courses.map(course => {
            const progress = user?.courseProgress?.[course.id] || 0;
            const isCompleted = user?.completedCourses?.includes(course.id) || progress === 100;
            
            return (
              <DropdownMenuItem key={course.id} asChild className="py-2">
                <Link to={course.path} className="flex items-center justify-between w-full cursor-pointer">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span className="text-sm">{course.name}</span>
                  </div>
                  {isCompleted ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">Complete</span>
                    </div>
                  ) : (
                    <span className="text-xs">{progress}%</span>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
