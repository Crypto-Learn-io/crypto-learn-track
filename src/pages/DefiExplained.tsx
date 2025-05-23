
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Book, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VideoPlaceholder from "@/components/VideoPlaceholder";
import { useAuth } from "@/hooks/useAuth";

const DefiExplained = () => {
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState(1);
  const { user, updateCourseProgress, markCourseComplete } = useAuth();
  
  const totalModules = 4;
  const courseId = "defi-explained";

  // Load saved progress when component mounts
  useEffect(() => {
    if (user && user.courseProgress && user.courseProgress[courseId]) {
      const savedProgress = user.courseProgress[courseId];
      setProgress(savedProgress);
      
      // Calculate which module the user was on based on progress
      const calculatedModule = Math.ceil((savedProgress / 100) * totalModules);
      if (calculatedModule > 0 && calculatedModule <= totalModules) {
        setCurrentModule(calculatedModule);
      }
    }
  }, [user, courseId]);

  const handleModuleComplete = (moduleNum: number) => {
    const newProgress = Math.min((moduleNum / totalModules) * 100, 100);
    setProgress(newProgress);
    
    // Update progress in auth context
    updateCourseProgress && updateCourseProgress(courseId, newProgress);
    
    if (moduleNum < totalModules) {
      setCurrentModule(moduleNum + 1);
    } else if (moduleNum === totalModules) {
      // Mark course as complete when final module is completed
      markCourseComplete && markCourseComplete(courseId);
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
                { num: 1, title: "Introduction to DeFi" },
                { num: 2, title: "DeFi Components" },
                { num: 3, title: "Popular DeFi Platforms" },
                { num: 4, title: "DeFi Risks & Challenges" }
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
                <h1 className="text-3xl font-bold text-slate-900">Introduction to DeFi</h1>
                <p className="text-muted-foreground">Understanding decentralized finance and its impact on traditional financial systems</p>
              </div>
              
              <VideoPlaceholder videoId="SZXwDhcx9uY" title="Introduction to Decentralized Finance (DeFi)" />
              
              <div className="prose max-w-none text-slate-800">
                <h2>What is DeFi?</h2>
                <p>
                  Decentralized Finance (DeFi) refers to a new financial system built on public blockchains that aims to recreate and 
                  improve upon traditional financial services in a more open, permissionless, and transparent way.
                </p>
                
                <h3>Traditional Finance vs. DeFi</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Traditional Finance</th>
                      <th>DeFi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Centralized control by institutions</td>
                      <td>Decentralized governance and operations</td>
                    </tr>
                    <tr>
                      <td>Limited operating hours</td>
                      <td>24/7 availability</td>
                    </tr>
                    <tr>
                      <td>Requires identification and approval</td>
                      <td>Permissionless access</td>
                    </tr>
                    <tr>
                      <td>Less transparent operations</td>
                      <td>Transparent and auditable operations</td>
                    </tr>
                    <tr>
                      <td>Geographic restrictions</td>
                      <td>Global accessibility</td>
                    </tr>
                  </tbody>
                </table>
                
                <h3>Key Features of DeFi</h3>
                <ul>
                  <li><strong>Non-custodial:</strong> Users maintain control of their assets at all times</li>
                  <li><strong>Open:</strong> Anyone can access DeFi services without permission</li>
                  <li><strong>Transparent:</strong> All transactions and code are visible on the blockchain</li>
                  <li><strong>Programmable:</strong> Smart contracts automate financial operations</li>
                  <li><strong>Composable:</strong> DeFi applications can be combined like "money legos"</li>
                </ul>
                
                <h3>Brief History of DeFi</h3>
                <ol>
                  <li><strong>2009:</strong> Bitcoin launches as the first cryptocurrency, introducing the concept of peer-to-peer electronic cash</li>
                  <li><strong>2015:</strong> Ethereum launches, bringing programmable smart contracts to blockchain</li>
                  <li><strong>2017:</strong> Early DeFi projects like MakerDAO begin to emerge</li>
                  <li><strong>2020:</strong> "DeFi Summer" sees explosive growth in the sector</li>
                  <li><strong>2021-Present:</strong> Continued innovation and expansion of DeFi use cases</li>
                </ol>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger className="text-slate-900">Is DeFi safe to use?</AccordionTrigger>
                    <AccordionContent>
                      DeFi comes with risks that users should understand. Smart contract vulnerabilities, protocol exploits, and market volatility are all real concerns. However, established projects with audited code and time-tested protocols tend to be safer. Always do your own research and only invest what you can afford to lose.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger className="text-slate-900">Do I need technical knowledge to use DeFi?</AccordionTrigger>
                    <AccordionContent>
                      While understanding blockchain technology and how DeFi works can be helpful, many DeFi platforms now offer user-friendly interfaces that make it accessible to beginners. However, you should still take time to learn the basics to make informed decisions and avoid costly mistakes.
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
                <h1 className="text-3xl font-bold text-slate-900">DeFi Components</h1>
                <p className="text-muted-foreground">Exploring the building blocks of decentralized finance</p>
              </div>
              
              <div className="prose max-w-none text-slate-800">
                <h2>Core Components of the DeFi Ecosystem</h2>
                
                <h3>1. Stablecoins</h3>
                <p>
                  Cryptocurrencies designed to maintain a stable value, usually pegged to traditional assets like the US dollar.
                </p>
                <ul>
                  <li><strong>Fiat-backed:</strong> Tether (USDT), USD Coin (USDC)</li>
                  <li><strong>Crypto-backed:</strong> DAI, Liquity (LUSD)</li>
                  <li><strong>Algorithmic:</strong> Frax, TerraUSD (now collapsed)</li>
                </ul>
                
                <h3>2. Decentralized Exchanges (DEXes)</h3>
                <p>
                  Platforms that enable trading of cryptocurrencies without intermediaries.
                </p>
                <ul>
                  <li><strong>Automated Market Makers (AMMs):</strong> Uniswap, SushiSwap, PancakeSwap</li>
                  <li><strong>Order Book DEXes:</strong> dYdX, Serum</li>
                  <li><strong>Aggregators:</strong> 1inch, Matcha</li>
                </ul>
                
                <h3>3. Lending and Borrowing Protocols</h3>
                <p>
                  Platforms that allow users to lend their assets to earn interest or borrow assets by providing collateral.
                </p>
                <ul>
                  <li><strong>Lending Markets:</strong> Aave, Compound, Maker</li>
                  <li><strong>Flash Loans:</strong> Uncollateralized loans that must be repaid within a single transaction</li>
                </ul>
                
                <h3>4. Yield Farming and Liquidity Mining</h3>
                <p>
                  Strategies to maximize returns by providing liquidity to various protocols, often incentivized with token rewards.
                </p>
                
                <h3>5. Derivatives and Synthetic Assets</h3>
                <p>
                  Financial instruments that derive their value from underlying assets.
                </p>
                <ul>
                  <li><strong>Options and Futures:</strong> Opyn, dYdX</li>
                  <li><strong>Synthetics:</strong> Synthetix, Mirror Protocol</li>
                </ul>
                
                <h3>6. Insurance</h3>
                <p>
                  Protection against smart contract failures, hacks, and other risks in DeFi.
                </p>
                <ul>
                  <li>Nexus Mutual, Unslashed Finance, InsurAce</li>
                </ul>
                
                <h3>7. Asset Management</h3>
                <p>
                  Tools and protocols for managing crypto portfolios and investments.
                </p>
                <ul>
                  <li><strong>Index Products:</strong> Index Coop, Set Protocol</li>
                  <li><strong>Yield Aggregators:</strong> Yearn Finance, Beefy Finance</li>
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
                <h1 className="text-3xl font-bold text-slate-900">
                  {currentModule === 3 ? "Popular DeFi Platforms" : "DeFi Risks & Challenges"}
                </h1>
                <p className="text-muted-foreground">
                  {currentModule === 3 ? "Exploring leading DeFi protocols and their use cases" : 
                   "Understanding the potential risks and challenges in decentralized finance"}
                </p>
              </div>
              
              <div className="flex justify-center items-center py-20">
                <div className="text-center space-y-4">
                  <div className="text-primary mx-auto">
                    {currentModule === 3 ? 
                      <VideoPlaceholder videoId="SZXwDhcx9uY" title="DeFi Platforms Overview" /> : 
                      <VideoPlaceholder videoId="SZXwDhcx9uY" title="Understanding DeFi Risks" />
                    }
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">Module Content Coming Soon</h2>
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

export default DefiExplained;
