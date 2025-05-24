
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
          
          {currentModule === 3 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">Trading Strategies</h1>
                <p className="course-description">Learn effective cryptocurrency trading strategies</p>
              </div>
              
              <div className="course-content">
                <h2>Popular Trading Strategies</h2>
                <p>
                  Understanding different trading strategies can help you find an approach that matches your risk tolerance and time commitment.
                </p>
                
                <h3>Day Trading</h3>
                <p>
                  Day trading involves buying and selling cryptocurrencies within the same day to profit from short-term price movements.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Quick profits, no overnight risk</li>
                  <li><strong>Cons:</strong> Requires constant monitoring, high stress, significant time commitment</li>
                  <li><strong>Best for:</strong> Experienced traders with time to dedicate</li>
                </ul>
                
                <h3>Swing Trading</h3>
                <p>
                  Swing trading captures price swings over several days to weeks, taking advantage of medium-term trends.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Less time-intensive than day trading, good profit potential</li>
                  <li><strong>Cons:</strong> Overnight risk, requires patience</li>
                  <li><strong>Best for:</strong> Traders who can't monitor markets all day</li>
                </ul>
                
                <h3>Dollar-Cost Averaging (DCA)</h3>
                <p>
                  DCA involves investing a fixed amount regularly regardless of price, reducing the impact of volatility.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Reduces risk, simple to implement, good for beginners</li>
                  <li><strong>Cons:</strong> May miss optimal buying opportunities</li>
                  <li><strong>Best for:</strong> Long-term investors, beginners</li>
                </ul>
                
                <h3>HODLing</h3>
                <p>
                  A long-term strategy where you buy and hold cryptocurrencies for extended periods.
                </p>
                <ul>
                  <li><strong>Pros:</strong> Minimal time required, potential for significant long-term gains</li>
                  <li><strong>Cons:</strong> Requires strong conviction, high volatility tolerance</li>
                  <li><strong>Best for:</strong> Long-term believers in cryptocurrency</li>
                </ul>
                
                <h2>Entry and Exit Strategies</h2>
                <p>
                  Successful trading requires clear plans for when to enter and exit positions:
                </p>
                <ul>
                  <li><strong>Set clear profit targets:</strong> Know when to take profits</li>
                  <li><strong>Use stop-losses:</strong> Limit potential losses with predetermined exit points</li>
                  <li><strong>Follow the plan:</strong> Stick to your strategy despite emotions</li>
                  <li><strong>Review and adjust:</strong> Regularly evaluate your strategy's performance</li>
                </ul>
              </div>
              
              <div className="course-navigation">
                <Button variant="outline" onClick={() => setCurrentModule(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(3)}>
                  Next Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {currentModule === 4 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">Risk Management</h1>
                <p className="course-description">Protect your investments with proper risk management</p>
              </div>
              
              <div className="course-content">
                <h2>Why Risk Management Matters</h2>
                <p>
                  Risk management is arguably the most important aspect of trading. It's not about avoiding all risks, but about managing them intelligently to preserve capital and maximize long-term returns.
                </p>
                
                <h3>Position Sizing</h3>
                <p>
                  Never risk more than you can afford to lose. Common position sizing rules include:
                </p>
                <ul>
                  <li><strong>1-2% Rule:</strong> Never risk more than 1-2% of your total portfolio on a single trade</li>
                  <li><strong>Portfolio Allocation:</strong> Limit crypto to 5-10% of your total investment portfolio</li>
                  <li><strong>Emergency Fund:</strong> Keep 3-6 months of expenses in traditional savings before trading</li>
                </ul>
                
                <h3>Stop-Loss Orders</h3>
                <p>
                  Stop-loss orders automatically sell your position when the price reaches a predetermined level:
                </p>
                <ul>
                  <li><strong>Fixed Percentage:</strong> Set stop-loss at 5-10% below your entry price</li>
                  <li><strong>Technical Levels:</strong> Place stop-loss below key support levels</li>
                  <li><strong>Trailing Stops:</strong> Automatically adjust stop-loss as price moves in your favor</li>
                </ul>
                
                <h3>Diversification</h3>
                <p>
                  Don't put all your eggs in one basket:
                </p>
                <ul>
                  <li><strong>Multiple Cryptocurrencies:</strong> Spread risk across different coins</li>
                  <li><strong>Different Sectors:</strong> Include DeFi, NFTs, layer-1s, etc.</li>
                  <li><strong>Time Diversification:</strong> Enter positions at different times</li>
                </ul>
                
                <h2>Common Risk Management Mistakes</h2>
                <ul>
                  <li><strong>FOMO Trading:</strong> Making impulsive decisions based on fear of missing out</li>
                  <li><strong>Revenge Trading:</strong> Trying to quickly recover losses with bigger bets</li>
                  <li><strong>Ignoring Stop-Losses:</strong> Hoping losing positions will recover</li>
                  <li><strong>Over-leveraging:</strong> Using too much borrowed money</li>
                  <li><strong>Emotional Trading:</strong> Letting emotions override your trading plan</li>
                </ul>
                
                <h2>Creating Your Risk Management Plan</h2>
                <p>
                  Develop a written plan that includes:
                </p>
                <ul>
                  <li>Maximum risk per trade</li>
                  <li>Total portfolio allocation to crypto</li>
                  <li>Stop-loss criteria</li>
                  <li>Profit-taking rules</li>
                  <li>Position sizing formula</li>
                </ul>
              </div>
              
              <div className="course-navigation">
                <Button variant="outline" onClick={() => setCurrentModule(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(4)}>
                  Next Module
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {currentModule === 5 && (
            <div className="course-module">
              <div className="course-module-header">
                <h1 className="course-title">Trading Psychology</h1>
                <p className="course-description">Master the mental aspects of successful trading</p>
              </div>
              
              <div className="course-content">
                <h2>The Psychology of Trading</h2>
                <p>
                  Trading is as much a mental game as it is technical. Understanding and controlling your emotions is crucial for long-term success in cryptocurrency markets.
                </p>
                
                <h3>Common Emotional Traps</h3>
                <ul>
                  <li><strong>Fear:</strong> Causes you to sell too early or avoid good opportunities</li>
                  <li><strong>Greed:</strong> Leads to holding too long or taking excessive risks</li>
                  <li><strong>Hope:</strong> Keeps you in losing positions longer than you should</li>
                  <li><strong>Regret:</strong> Makes you second-guess good decisions</li>
                  <li><strong>Overconfidence:</strong> Leads to taking unnecessary risks after wins</li>
                </ul>
                
                <h3>Developing Mental Discipline</h3>
                <p>
                  Building the right mindset takes practice and deliberate effort:
                </p>
                <ul>
                  <li><strong>Accept Losses:</strong> Losses are part of trading; focus on overall profitability</li>
                  <li><strong>Stick to Your Plan:</strong> Follow your strategy regardless of emotions</li>
                  <li><strong>Keep a Trading Journal:</strong> Record your thoughts and emotions with each trade</li>
                  <li><strong>Practice Patience:</strong> Wait for high-probability setups</li>
                  <li><strong>Stay Humble:</strong> The market can humble anyone at any time</li>
                </ul>
                
                <h2>Cognitive Biases in Trading</h2>
                <p>
                  Our brains are wired with biases that can hurt trading performance:
                </p>
                <ul>
                  <li><strong>Confirmation Bias:</strong> Seeking information that confirms your existing beliefs</li>
                  <li><strong>Anchoring:</strong> Over-relying on the first piece of information encountered</li>
                  <li><strong>Recency Bias:</strong> Giving more weight to recent events</li>
                  <li><strong>Loss Aversion:</strong> Feeling losses more strongly than equivalent gains</li>
                  <li><strong>Herd Mentality:</strong> Following the crowd instead of independent analysis</li>
                </ul>
                
                <h2>Building a Winning Mindset</h2>
                <ul>
                  <li><strong>Focus on Process:</strong> Good process leads to good results over time</li>
                  <li><strong>Think in Probabilities:</strong> No single trade determines success</li>
                  <li><strong>Continuous Learning:</strong> Markets evolve; so should your knowledge</li>
                  <li><strong>Manage Stress:</strong> Use techniques like meditation or exercise</li>
                  <li><strong>Set Realistic Expectations:</strong> Consistent profits beat home runs</li>
                </ul>
                
                <h2>Practical Tips for Emotional Control</h2>
                <ul>
                  <li><strong>Take Breaks:</strong> Step away from charts when stressed</li>
                  <li><strong>Use Automation:</strong> Set stop-losses and take-profits in advance</li>
                  <li><strong>Start Small:</strong> Trade with amounts that don't cause stress</li>
                  <li><strong>Review Regularly:</strong> Analyze both wins and losses objectively</li>
                  <li><strong>Have Outside Interests:</strong> Don't let trading consume your life</li>
                </ul>
                
                <Accordion type="single" collapsible className="course-faq">
                  <AccordionItem value="psychology-faq-1">
                    <AccordionTrigger>How do I deal with a big loss?</AccordionTrigger>
                    <AccordionContent>
                      Take a break to process the loss emotionally. Review what went wrong objectively, but don't make revenge trades. Stick to your risk management rules and remember that losses are part of trading. Consider reducing position sizes until confidence returns.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="psychology-faq-2">
                    <AccordionTrigger>How can I avoid emotional trading?</AccordionTrigger>
                    <AccordionContent>
                      Create a detailed trading plan and stick to it. Use stop-losses and take-profits to automate decisions. Keep a trading journal to identify emotional patterns. Trade with money you can afford to lose, and take regular breaks from the markets.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="course-navigation">
                <Button variant="outline" onClick={() => setCurrentModule(4)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(5)}>
                  Complete Course
                  <CheckCircle className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingBasics;
