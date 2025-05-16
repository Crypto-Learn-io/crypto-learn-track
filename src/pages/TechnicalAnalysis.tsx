
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Book, CheckCircle, ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TechnicalAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState(1);
  
  const totalModules = 4;

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
    <div className="min-h-screen bg-slate-50">
      {/* Course Header */}
      <header className="bg-white border-b sticky top-0 z-10">
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
      <div className="bg-white border-b">
        <div className="container px-4 py-2">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Course Content */}
      <div className="container px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Course Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-[85px] bg-white rounded-lg border p-4">
            <h2 className="font-semibold flex items-center mb-4 text-primary">
              <Book className="h-4 w-4 mr-2" />
              Course Contents
            </h2>
            
            <div className="space-y-1">
              {[
                { num: 1, title: "Understanding Charts" },
                { num: 2, title: "Key Chart Patterns" },
                { num: 3, title: "Technical Indicators" },
                { num: 4, title: "Building a Trading Strategy" }
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
        <div className="md:col-span-3 bg-white rounded-lg border p-6">
          {currentModule === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Understanding Charts</h1>
                <p className="text-muted-foreground">Learn to read and interpret different types of price charts</p>
              </div>
              
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Video Lecture Placeholder</span>
              </div>
              
              <div className="prose max-w-none">
                <h2>Introduction to Technical Analysis</h2>
                <p>
                  Technical analysis is a trading discipline that evaluates investments and identifies trading opportunities by analyzing 
                  statistical trends gathered from trading activity, such as price movement and volume.
                </p>
                <p>
                  While fundamental analysis examines the intrinsic value of an investment, technical analysis focuses on patterns of price 
                  movements, trading signals, and various other analytical tools.
                </p>
                
                <h3>The Core Principles of Technical Analysis</h3>
                <ol>
                  <li>
                    <strong>Price Discounts Everything</strong>
                    <p>Technical analysts believe that all known information about a given asset is already reflected in its price.</p>
                  </li>
                  
                  <li>
                    <strong>Prices Move in Trends</strong>
                    <p>Markets tend to move in clear directions (up, down, or sideways) rather than randomly.</p>
                  </li>
                  
                  <li>
                    <strong>History Tends to Repeat Itself</strong>
                    <p>Market patterns tend to recur over time, as market participants often exhibit similar psychological reactions to similar market conditions.</p>
                  </li>
                </ol>
                
                <h3>Types of Charts</h3>
                
                <h4>1. Line Charts</h4>
                <p>
                  The simplest form of price chart that connects closing prices over a set time period. 
                  Line charts provide a clean view of price movements but offer limited information.
                </p>
                
                <h4>2. Bar Charts</h4>
                <p>
                  Bar charts display the open, high, low, and closing prices (OHLC) for each time period. 
                  Each vertical bar represents the price range for that period, with horizontal lines marking the open and close prices.
                </p>
                
                <h4>3. Candlestick Charts</h4>
                <p>
                  The most popular chart type in cryptocurrency trading. Similar to bar charts but with more visual information:
                </p>
                <ul>
                  <li>The "body" shows the opening and closing prices</li>
                  <li>The "wicks" or "shadows" show the high and low prices</li>
                  <li>Green/white candles indicate price increased during that period (close &gt; open)</li>
                  <li>Red/black candles indicate price decreased during that period (close &lt; open)</li>
                </ul>
                
                <h3>Timeframes</h3>
                <p>
                  Charts can be viewed across different timeframes, from minutes to months:
                </p>
                <ul>
                  <li><strong>Short timeframes</strong> (1m, 5m, 15m, 1h): Used by day traders and scalpers</li>
                  <li><strong>Medium timeframes</strong> (4h, 1D): Used by swing traders</li>
                  <li><strong>Long timeframes</strong> (1W, 1M): Used by position traders and investors</li>
                </ul>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Why do different timeframes sometimes show conflicting signals?</AccordionTrigger>
                    <AccordionContent>
                      Different timeframes can show different trends happening simultaneously. For example, a cryptocurrency might be in a downtrend on the daily chart but experiencing a temporary uptrend on the hourly chart. This is why many traders use multiple timeframe analysis to get a more complete picture of market conditions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Which chart type is best for cryptocurrency trading?</AccordionTrigger>
                    <AccordionContent>
                      Candlestick charts are generally preferred for cryptocurrency trading as they provide the most visual information at a glance, including open, high, low, and close prices, as well as whether the price went up or down during each period. Candlesticks also form patterns that can help predict future price movements.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <div></div>
                <Button onClick={() => handleModuleComplete(1)}>
                  Next Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {currentModule === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Key Chart Patterns</h1>
                <p className="text-muted-foreground">Recognizing important patterns for trading decisions</p>
              </div>
              
              <div className="prose max-w-none">
                <h2>Chart Patterns in Technical Analysis</h2>
                <p>
                  Chart patterns are specific formations created by price movements that can help traders predict future price direction. 
                  They are categorized as either reversal patterns (signaling a change in trend) or continuation patterns 
                  (signaling a pause in the trend before continuing in the same direction).
                </p>
                
                <h3>Reversal Patterns</h3>
                
                <h4>1. Head and Shoulders</h4>
                <p>
                  A formation consisting of three peaks, where the middle peak (head) is higher than the two surrounding peaks (shoulders).
                  This pattern often signals a bearish reversal from an uptrend.
                </p>
                <ul>
                  <li><strong>Confirmation:</strong> Break below the "neckline" support level</li>
                  <li><strong>Inverse Head and Shoulders:</strong> A bullish reversal pattern seen at the end of downtrends</li>
                </ul>
                
                <h4>2. Double Tops and Bottoms</h4>
                <ul>
                  <li><strong>Double Top:</strong> Two peaks at approximately the same price level, signaling a potential bearish reversal</li>
                  <li><strong>Double Bottom:</strong> Two valleys at approximately the same price level, signaling a potential bullish reversal</li>
                </ul>
                
                <h4>3. Triple Tops and Bottoms</h4>
                <p>
                  Similar to double tops and bottoms, but with three peaks or valleys, providing stronger reversal signals.
                </p>
                
                <h3>Continuation Patterns</h3>
                
                <h4>1. Flags and Pennants</h4>
                <p>
                  Short-term consolidation patterns that usually form after a strong price movement (the "flagpole").
                </p>
                <ul>
                  <li><strong>Flags:</strong> Rectangular patterns that slope against the prevailing trend</li>
                  <li><strong>Pennants:</strong> Similar to flags but triangular in shape</li>
                </ul>
                
                <h4>2. Triangles</h4>
                <ul>
                  <li><strong>Ascending Triangle:</strong> Characterized by a flat upper resistance line and rising lower support line</li>
                  <li><strong>Descending Triangle:</strong> Characterized by a flat lower support line and falling upper resistance line</li>
                  <li><strong>Symmetrical Triangle:</strong> Characterized by converging trend lines with similar slopes</li>
                </ul>
                
                <h4>3. Rectangles</h4>
                <p>
                  Trading ranges bounded by parallel support and resistance lines, indicating price consolidation before continuing the trend.
                </p>
                
                <h3>Candlestick Patterns</h3>
                <p>
                  Specific formations of individual or small groups of candlesticks that can indicate reversals or continuations:
                </p>
                <ul>
                  <li><strong>Doji:</strong> Indicates indecision when open and close prices are very close</li>
                  <li><strong>Hammer/Hanging Man:</strong> Potential reversal signals with small bodies and long lower shadows</li>
                  <li><strong>Engulfing Patterns:</strong> When a candle's body completely engulfs the previous candle</li>
                  <li><strong>Morning Star/Evening Star:</strong> Three-candle reversal patterns</li>
                </ul>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
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
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">
                  {currentModule === 3 ? "Technical Indicators" : "Building a Trading Strategy"}
                </h1>
                <p className="text-muted-foreground">
                  {currentModule === 3 ? "Using mathematical calculations to analyze market conditions" : 
                   "Combining chart patterns and indicators into an effective trading plan"}
                </p>
              </div>
              
              <div className="flex justify-center items-center py-20">
                <div className="text-center space-y-4">
                  <GraduationCap className="h-16 w-16 text-primary mx-auto" />
                  <h2 className="text-xl font-semibold">Module Content Coming Soon</h2>
                  <p className="text-muted-foreground">This module is currently under development.</p>
                </div>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
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

export default TechnicalAnalysis;
