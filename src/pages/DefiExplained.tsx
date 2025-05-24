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
          
          {currentModule === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">Popular DeFi Platforms</h1>
                <p className="text-muted-foreground">Exploring leading DeFi protocols and their use cases</p>
              </div>
              
              <div className="prose max-w-none text-slate-800">
                <h2>Leading DeFi Platforms and Protocols</h2>
                <p>
                  The DeFi ecosystem has grown to include hundreds of protocols, each serving different purposes. 
                  Here are some of the most established and widely-used platforms:
                </p>
                
                <h3>1. Uniswap - Automated Market Maker</h3>
                <ul>
                  <li><strong>Purpose:</strong> Decentralized exchange for token swapping</li>
                  <li><strong>How it works:</strong> Uses liquidity pools instead of order books</li>
                  <li><strong>Key features:</strong> Permissionless token listing, LP rewards, governance token (UNI)</li>
                  <li><strong>Use case:</strong> Trading tokens without KYC requirements</li>
                </ul>
                
                <h3>2. Aave - Lending and Borrowing</h3>
                <ul>
                  <li><strong>Purpose:</strong> Decentralized lending protocol</li>
                  <li><strong>How it works:</strong> Deposit assets to earn interest or borrow against collateral</li>
                  <li><strong>Key features:</strong> Flash loans, variable/stable interest rates, governance</li>
                  <li><strong>Use case:</strong> Earning yield on idle assets or accessing liquidity</li>
                </ul>
                
                <h3>3. MakerDAO - Decentralized Stablecoin</h3>
                <ul>
                  <li><strong>Purpose:</strong> Creates DAI, a decentralized stablecoin</li>
                  <li><strong>How it works:</strong> Users deposit collateral to mint DAI tokens</li>
                  <li><strong>Key features:</strong> Over-collateralization, stability fee, liquidation mechanism</li>
                  <li><strong>Use case:</strong> Stable value storage without centralized control</li>
                </ul>
                
                <h3>4. Compound - Algorithmic Lending</h3>
                <ul>
                  <li><strong>Purpose:</strong> Algorithmic, autonomous interest rate protocol</li>
                  <li><strong>How it works:</strong> Interest rates determined by supply and demand</li>
                  <li><strong>Key features:</strong> cToken system, governance token (COMP)</li>
                  <li><strong>Use case:</strong> Predictable interest rates for lending/borrowing</li>
                </ul>
                
                <h3>5. Curve Finance - Stablecoin Exchange</h3>
                <ul>
                  <li><strong>Purpose:</strong> Specialized DEX for stablecoins and like assets</li>
                  <li><strong>How it works:</strong> Low slippage trades between similar assets</li>
                  <li><strong>Key features:</strong> Minimal impermanent loss, high capital efficiency</li>
                  <li><strong>Use case:</strong> Swapping between stablecoins with minimal price impact</li>
                </ul>
                
                <h3>6. Yearn Finance - Yield Optimization</h3>
                <ul>
                  <li><strong>Purpose:</strong> Automated yield farming strategies</li>
                  <li><strong>How it works:</strong> Vaults automatically deploy funds to highest-yield opportunities</li>
                  <li><strong>Key features:</strong> Strategy automation, risk management, YFI governance</li>
                  <li><strong>Use case:</strong> Maximizing returns without active management</li>
                </ul>
                
                <h2>How to Get Started with DeFi Platforms</h2>
                <ol>
                  <li><strong>Set up a wallet:</strong> Use MetaMask or similar Web3 wallet</li>
                  <li><strong>Get some ETH:</strong> You'll need ETH for transaction fees</li>
                  <li><strong>Start small:</strong> Begin with well-established protocols</li>
                  <li><strong>Understand the risks:</strong> Read documentation and audit reports</li>
                  <li><strong>Track your positions:</strong> Use tools like Zapper or DeBank</li>
                </ol>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
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
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">DeFi Risks & Challenges</h1>
                <p className="text-muted-foreground">Understanding the potential risks and challenges in decentralized finance</p>
              </div>
              
              <div className="prose max-w-none text-slate-800">
                <h2>Understanding DeFi Risks</h2>
                <p>
                  While DeFi offers exciting opportunities, it's crucial to understand the risks involved. 
                  Being aware of these risks helps you make informed decisions and protect your assets.
                </p>
                
                <h3>1. Smart Contract Risk</h3>
                <ul>
                  <li><strong>Bugs and vulnerabilities:</strong> Code errors can lead to loss of funds</li>
                  <li><strong>Unaudited contracts:</strong> New protocols may not have been thoroughly tested</li>
                  <li><strong>Upgrade risks:</strong> Protocol changes might introduce new vulnerabilities</li>
                  <li><strong>Mitigation:</strong> Use audited protocols, start with small amounts, diversify</li>
                </ul>
                
                <h3>2. Impermanent Loss</h3>
                <ul>
                  <li><strong>What it is:</strong> Loss experienced when providing liquidity to AMMs</li>
                  <li><strong>When it occurs:</strong> When token prices change relative to each other</li>
                  <li><strong>Impact:</strong> You might have been better off just holding the tokens</li>
                  <li><strong>Mitigation:</strong> Understand IL calculators, consider stablecoin pairs</li>
                </ul>
                
                <h3>3. Liquidation Risk</h3>
                <ul>
                  <li><strong>What it is:</strong> Forced sale of collateral when loans become under-collateralized</li>
                  <li><strong>Causes:</strong> Price drops, high leverage, network congestion</li>
                  <li><strong>Consequences:</strong> Loss of collateral and liquidation penalties</li>
                  <li><strong>Mitigation:</strong> Maintain healthy collateral ratios, monitor positions</li>
                </ul>
                
                <h3>4. Market Risks</h3>
                <ul>
                  <li><strong>Price volatility:</strong> Crypto markets are highly volatile</li>
                  <li><strong>Correlation risk:</strong> Many DeFi tokens are correlated with ETH</li>
                  <li><strong>Liquidity risk:</strong> Some tokens may become difficult to sell</li>
                  <li><strong>Mitigation:</strong> Diversify, understand market dynamics, set stop losses</li>
                </ul>
                
                <h3>5. Governance Risks</h3>
                <ul>
                  <li><strong>Centralized control:</strong> Some protocols have concentrated governance power</li>
                  <li><strong>Malicious proposals:</strong> Bad actors might propose harmful changes</li>
                  <li><strong>Apathy risk:</strong> Low participation in governance decisions</li>
                  <li><strong>Mitigation:</strong> Participate in governance, understand voting mechanisms</li>
                </ul>
                
                <h2>Best Practices for DeFi Safety</h2>
                <ol>
                  <li><strong>Do Your Own Research (DYOR):</strong> Understand protocols before using them</li>
                  <li><strong>Start Small:</strong> Test with small amounts before committing large sums</li>
                  <li><strong>Diversify:</strong> Don't put all funds in one protocol or strategy</li>
                  <li><strong>Use Reputable Protocols:</strong> Stick to well-audited, established projects</li>
                  <li><strong>Monitor Positions:</strong> Regularly check your investments and health ratios</li>
                  <li><strong>Keep Learning:</strong> Stay updated on protocol changes and new risks</li>
                  <li><strong>Use Multiple Wallets:</strong> Separate testing funds from main holdings</li>
                  <li><strong>Understand Gas Fees:</strong> High fees can eat into small position profits</li>
                </ol>
                
                <h2>Common DeFi Mistakes to Avoid</h2>
                <ul>
                  <li>Investing more than you can afford to lose</li>
                  <li>Chasing high APY without understanding the risks</li>
                  <li>Not reading protocol documentation</li>
                  <li>Ignoring tokenomics and emission schedules</li>
                  <li>Panic selling during market downturns</li>
                  <li>Not keeping track of tax implications</li>
                  <li>Using protocols on congested networks during high gas periods</li>
                </ul>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger className="text-slate-900">How much should I invest in DeFi as a beginner?</AccordionTrigger>
                    <AccordionContent>
                      Start with an amount you're comfortable losing completely - perhaps 1-5% of your total crypto portfolio. DeFi is experimental technology and carries significant risks. As you gain experience and understanding, you can gradually increase your allocation if desired.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger className="text-slate-900">Are DeFi protocols insured?</AccordionTrigger>
                    <AccordionContent>
                      Some DeFi protocols offer insurance coverage through platforms like Nexus Mutual or InsurAce, but coverage is limited and not automatic. Always check if insurance is available and understand what it covers. Most DeFi protocols operate without traditional insurance, making risk management crucial.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
                <Button variant="outline" onClick={() => setCurrentModule(3)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(4)}>
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

export default DefiExplained;
