
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Book, CheckCircle, ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VideoPlaceholder from "@/components/VideoPlaceholder";

const TradingBasics = () => {
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState(1);
  
  const totalModules = 5;

  const handleModuleComplete = (moduleNum: number) => {
    const newProgress = Math.min((moduleNum / totalModules) * 100, 100);
    setProgress(newProgress);
    
    if (moduleNum < totalModules) {
      setCurrentModule(moduleNum + 1);
    }
  };

  const handleModuleSelect = (moduleNum: number) => {
    setCurrentModule(moduleNum);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Course Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container px-4 py-3 flex justify-between items-center">
          <Link to="/learn" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to All Courses
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-sm text-muted-foreground">
              <span>Your progress:</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Course Progress */}
      <div className="bg-card border-b">
        <div className="container px-4 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Course Content */}
      <div className="container px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Course Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-[85px] bg-card rounded-lg border p-4">
            <h2 className="font-semibold flex items-center mb-4 text-primary">
              <Book className="h-4 w-4 mr-2" />
              Course Contents
            </h2>
            
            <div className="space-y-1">
              {[
                { num: 1, title: "Introduction to Trading" },
                { num: 2, title: "Market Analysis Basics" },
                { num: 3, title: "Trading Strategies" },
                { num: 4, title: "Risk Management" },
                { num: 5, title: "Trading Psychology" }
              ].map((module) => (
                <Button
                  key={module.num}
                  variant={currentModule === module.num ? "default" : "ghost"}
                  className={`w-full justify-start ${progress >= ((module.num-1) / totalModules) * 100 ? "" : "text-muted-foreground"}`}
                  onClick={() => handleModuleSelect(module.num)}
                >
                  {progress >= (module.num / totalModules) * 100 && <CheckCircle className="h-4 w-4 mr-2 text-green-500" />}
                  {progress < (module.num / totalModules) * 100 && <span className="w-4 h-4 mr-2 rounded-full border inline-flex items-center justify-center text-xs">{module.num}</span>}
                  <span className="truncate">{module.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Module Content */}
        <div className="md:col-span-3 bg-card rounded-lg border p-6">
          {currentModule === 1 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">Introduction to Trading</h1>
                <p className="course-description">Learn the fundamentals of cryptocurrency trading</p>
              </div>
              
              <div className="video-placeholder mb-6">
                <VideoPlaceholder 
                  title="Introduction to Cryptocurrency Trading" 
                  videoId="Zoz9gvhLgpM"
                />
              </div>
              
              <div className="course-content">
                <h2>What is Crypto Trading?</h2>
                <p>
                  Cryptocurrency trading is the act of buying and selling digital currencies to potentially make a profit. 
                  Unlike traditional markets, the crypto market operates 24/7, offering unique opportunities and challenges for traders.
                </p>
                
                <h3>Key Terms to Understand</h3>
                <ul>
                  <li><strong>Market Order:</strong> An order to buy or sell immediately at the current market price.</li>
                  <li><strong>Limit Order:</strong> An order to buy or sell at a specific price or better.</li>
                  <li><strong>Spot Trading:</strong> Buying and selling actual cryptocurrency assets.</li>
                  <li><strong>Margin Trading:</strong> Trading with borrowed funds to amplify potential returns.</li>
                  <li><strong>Exchange:</strong> Platforms where cryptocurrencies are bought and sold.</li>
                </ul>
                
                <h3>Types of Exchanges</h3>
                <p>
                  Cryptocurrency exchanges come in several forms, each with their own advantages and considerations:
                </p>
                <ul>
                  <li><strong>Centralized Exchanges (CEX):</strong> Operated by companies that facilitate trading (e.g., Coinbase, Binance).</li>
                  <li><strong>Decentralized Exchanges (DEX):</strong> Peer-to-peer platforms with no central authority (e.g., Uniswap, SushiSwap).</li>
                  <li><strong>Hybrid Exchanges:</strong> Combine features of both centralized and decentralized exchanges.</li>
                </ul>
                
                <Accordion type="single" collapsible className="course-faq">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Is cryptocurrency trading risky?</AccordionTrigger>
                    <AccordionContent>
                      Yes, cryptocurrency trading carries significant risk. The market is highly volatile, meaning prices can change dramatically in short periods. It's important to start with a solid understanding of trading basics and only invest what you can afford to lose.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>How much money do I need to start trading?</AccordionTrigger>
                    <AccordionContent>
                      You can start with any amount you're comfortable with. Many exchanges allow you to purchase fractions of cryptocurrencies, so you don't need to buy a whole Bitcoin or Ethereum. It's recommended to start small while you're learning.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="course-navigation">
                <div></div>
                <Button onClick={() => handleModuleComplete(1)}>
                  Next Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {currentModule === 2 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">Market Analysis Basics</h1>
                <p className="course-description">Understanding key analysis methods for cryptocurrency markets</p>
              </div>
              
              <div className="video-placeholder mb-6">
                <VideoPlaceholder 
                  title="Market Analysis for Cryptocurrency" 
                  videoId="Xin9dMvA8Qw"
                />
              </div>
              
              <div className="course-content">
                <h2>Fundamental vs Technical Analysis</h2>
                <p>
                  In cryptocurrency trading, there are two primary approaches to analyzing markets:
                </p>
                
                <h3>Fundamental Analysis</h3>
                <p>
                  This approach evaluates a cryptocurrency's intrinsic value based on:
                </p>
                <ul>
                  <li>Project development and roadmap</li>
                  <li>Team qualifications and experience</li>
                  <li>Technology and innovation</li>
                  <li>Adoption metrics and partnerships</li>
                  <li>Community strength and engagement</li>
                </ul>
                
                <h3>Technical Analysis</h3>
                <p>
                  This method focuses on price movements and patterns using:
                </p>
                <ul>
                  <li>Price charts and candlestick patterns</li>
                  <li>Support and resistance levels</li>
                  <li>Trend lines and channels</li>
                  <li>Technical indicators (Moving averages, RSI, MACD, etc.)</li>
                  <li>Volume analysis</li>
                </ul>

                <h2>Key Market Indicators</h2>
                <p>
                  Several indicators can help you make more informed trading decisions:
                </p>
                <ul>
                  <li><strong>Moving Averages:</strong> Help identify trends by smoothing price data</li>
                  <li><strong>Relative Strength Index (RSI):</strong> Measures the speed and change of price movements</li>
                  <li><strong>Moving Average Convergence Divergence (MACD):</strong> Shows the relationship between two moving averages</li>
                  <li><strong>Bollinger Bands:</strong> Indicate volatility and potential price levels</li>
                </ul>
              </div>
              
              <div className="course-navigation">
                <Button variant="outline" onClick={() => setCurrentModule(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(2)}>
                  Next Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {currentModule > 2 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">
                  {currentModule === 3 ? "Trading Strategies" : 
                   currentModule === 4 ? "Risk Management" : "Trading Psychology"}
                </h1>
                <p className="course-description">
                  {currentModule === 3 ? "Learn effective cryptocurrency trading strategies" : 
                   currentModule === 4 ? "Protect your investments with proper risk management" : 
                   "Master the mental aspects of successful trading"}
                </p>
              </div>
              
              <div className="video-placeholder mb-6">
                <VideoPlaceholder 
                  title={
                    currentModule === 3 ? "Trading Strategies for Cryptocurrency" : 
                    currentModule === 4 ? "Risk Management in Crypto Trading" : 
                    "Trading Psychology and Mindset"
                  }
                  videoId={
                    currentModule === 3 ? "tYULFJr0Bh0" : 
                    currentModule === 4 ? "rMpzi8Ek7Hc" : 
                    "N8-q1KxPnIM"
                  }
                />
              </div>
              
              <div className="flex justify-center items-center">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-semibold">Module Content Coming Soon</h2>
                  <p className="text-muted-foreground">This module is currently under development.</p>
                </div>
              </div>
              
              <div className="course-navigation mt-12">
                <Button variant="outline" onClick={() => setCurrentModule(currentModule - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                {currentModule < totalModules && (
                  <Button onClick={() => handleModuleComplete(currentModule)}>
                    Next Module
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {currentModule === totalModules && (
                  <Button onClick={() => handleModuleComplete(currentModule)}>
                    Complete Course
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingBasics;
