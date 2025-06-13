
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronLeft, BookOpen, CheckCircle, Clock, GraduationCap, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlockchainFundamentals = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [progress, setProgress] = useState(0);

  // Course content structure
  const sections = [
    {
      id: "introduction",
      title: "Introduction to Blockchain",
      complete: false,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">What is Blockchain Technology?</h2>
            <p>
              Blockchain is a decentralized, distributed ledger technology that records transactions across many computers. 
              The technology ensures that records cannot be altered retroactively without the alteration of all subsequent blocks.
            </p>
            
            <div className="my-8 p-6 border rounded-lg bg-muted/50">
              <h3 className="text-xl font-semibold mb-4">Key Features of Blockchain</h3>
              <ul className="space-y-3 list-disc pl-6">
                <li><strong>Decentralization:</strong> No single entity has control over the entire network</li>
                <li><strong>Transparency:</strong> All transactions are visible to anyone within the network</li>
                <li><strong>Immutability:</strong> Once data is recorded, it cannot be altered or deleted</li>
                <li><strong>Security:</strong> Uses cryptography to secure transactions and control the creation of new units</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">The First Blockchain</h3>
            <p>
              The first blockchain was conceptualized by Satoshi Nakamoto in 2008 and implemented as the core technology behind Bitcoin 
              in 2009. It serves as a public transaction ledger for the cryptocurrency.
            </p>

            <div className="my-6">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&w=800" 
                alt="Blockchain Concept" 
                className="rounded-lg w-full object-cover h-64"
              />
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Visualization of a blockchain network with connected blocks
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border rounded-lg p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Blockchain is a distributed database that maintains a continuously growing list of records</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>It uses cryptography to secure and verify transactions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>The technology enables peer-to-peer transactions without intermediaries</span>
              </li>
            </ul>
          </div>

          <div className="pt-4">
            <Button onClick={() => {
              setActiveSection("how-it-works");
              setProgress(25);
            }} className="w-full md:w-auto">Continue to Next Section</Button>
          </div>
        </div>
      )
    },
    {
      id: "how-it-works",
      title: "How Blockchain Works",
      complete: false,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">The Mechanics of Blockchain</h2>
            
            <p>
              At its core, blockchain works through a series of connected blocks. Each block contains data, a timestamp, 
              and a cryptographic hash of the previous block, creating a secure chain of information.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">The Block Structure</h3>
            <p>
              Every block in a blockchain contains three main elements:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Data</h4>
                <p className="text-sm">
                  The information stored in the block, such as transaction details, account addresses, or smart contract code.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Hash</h4>
                <p className="text-sm">
                  A unique identifier acting as a digital fingerprint for the block and its contents.
                </p>
              </div>
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Previous Hash</h4>
                <p className="text-sm">
                  The hash of the previous block, creating the chain linkage and ensuring integrity.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">Consensus Mechanisms</h3>
            <p>
              Blockchain networks use various consensus mechanisms to validate transactions and add new blocks:
            </p>

            <Accordion type="single" collapsible className="w-full my-4">
              <AccordionItem value="pow">
                <AccordionTrigger>Proof of Work (PoW)</AccordionTrigger>
                <AccordionContent>
                  Used by Bitcoin, PoW requires miners to solve complex mathematical puzzles to validate transactions and create new blocks. 
                  This process is energy-intensive but highly secure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pos">
                <AccordionTrigger>Proof of Stake (PoS)</AccordionTrigger>
                <AccordionContent>
                  A more energy-efficient alternative where validators are selected based on the number of coins they hold and "stake" as collateral.
                  Ethereum transitioned from PoW to PoS in its Ethereum 2.0 upgrade.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delegated">
                <AccordionTrigger>Delegated Proof of Stake (DPoS)</AccordionTrigger>
                <AccordionContent>
                  Token holders vote for "delegates" who are responsible for validating transactions and maintaining the blockchain. 
                  This creates a more democratic system while maintaining efficiency.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>

          <div className="bg-primary/5 border rounded-lg p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Blocks are cryptographically linked together to form a secure chain</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Consensus mechanisms allow the network to agree on the valid state of the blockchain</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Different consensus mechanisms offer various tradeoffs between security, decentralization, and efficiency</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {
              setActiveSection("introduction");
              setProgress(0);
            }}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Section
            </Button>
            <Button onClick={() => {
              setActiveSection("applications");
              setProgress(50);
            }}>Continue to Next Section</Button>
          </div>
        </div>
      )
    },
    {
      id: "applications",
      title: "Blockchain Applications",
      complete: false,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Real-World Applications of Blockchain</h2>
            
            <p>
              While blockchain technology gained fame through cryptocurrencies, its potential applications extend far beyond digital currencies.
              Here are some of the most promising use cases:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                <h3 className="text-xl font-semibold mb-2">Financial Services</h3>
                <p className="text-sm">
                  Beyond cryptocurrencies, blockchain enables faster cross-border payments, streamlined clearing and settlement,
                  and new financial instruments like decentralized finance (DeFi) applications.
                </p>
              </div>
              
              <div className="border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                <h3 className="text-xl font-semibold mb-2">Supply Chain Management</h3>
                <p className="text-sm">
                  Blockchain provides immutable records of products throughout their journey,
                  enhancing traceability, reducing fraud, and improving transparency.
                </p>
              </div>

              <div className="border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
                <p className="text-sm">
                  Secure sharing of medical records between patients and providers, tracking pharmaceutical supply chains,
                  and managing clinical trials data with enhanced privacy.
                </p>
              </div>

              <div className="border rounded-lg p-5 hover:bg-muted/30 transition-colors">
                <h3 className="text-xl font-semibold mb-2">Digital Identity</h3>
                <p className="text-sm">
                  Self-sovereign identity solutions that give individuals control over their personal data
                  while enabling secure verification without revealing unnecessary information.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4">Smart Contracts</h3>
            <p>
              Smart contracts are self-executing contracts with the terms directly written into code.
              These programs automatically execute when predetermined conditions are met,
              enabling trustless transactions without intermediaries.
            </p>

            <div className="my-6 bg-muted/30 p-5 rounded-lg border">
              <h4 className="font-semibold mb-2">Smart Contract Example</h4>
              <p className="text-sm mb-2">A simple escrow agreement in pseudo-code:</p>
              <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// Escrow Smart Contract
contract Escrow {
  address public buyer;
  address public seller;
  address public arbiter;
  uint public amount;
  bool public fundsDisbursed = false;
  
  // Initialize the contract
  constructor(address _seller, address _arbiter) payable {
    buyer = msg.sender;
    seller = _seller;
    arbiter = _arbiter;
    amount = msg.value;
  }
  
  // Release funds to the seller
  function releaseFunds() public {
    require(msg.sender == buyer || msg.sender == arbiter);
    require(!fundsDisbursed);
    
    fundsDisbursed = true;
    seller.transfer(amount);
  }
  
  // Refund to the buyer
  function refundBuyer() public {
    require(msg.sender == seller || msg.sender == arbiter);
    require(!fundsDisbursed);
    
    fundsDisbursed = true;
    buyer.transfer(amount);
  }
}`}
              </pre>
            </div>
          </div>

          <div className="bg-primary/5 border rounded-lg p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Blockchain has applications far beyond cryptocurrencies</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Smart contracts enable automating agreements without intermediaries</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Industries from finance to healthcare are being disrupted by blockchain technology</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {
              setActiveSection("how-it-works");
              setProgress(25);
            }}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Section
            </Button>
            <Button onClick={() => {
              setActiveSection("future-trends");
              setProgress(75);
            }}>Continue to Next Section</Button>
          </div>
        </div>
      )
    },
    {
      id: "future-trends",
      title: "Future Trends",
      complete: false,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">The Future of Blockchain Technology</h2>
            
            <p>
              Blockchain technology continues to evolve rapidly. Here are some of the most significant trends 
              shaping its future development:
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Scalability Solutions</h3>
            <p>
              As blockchain adoption grows, networks face challenges in transaction throughput. 
              Several approaches are being developed to address these limitations:
            </p>
            
            <div className="my-6">
              <Tabs defaultValue="layer2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="layer2">Layer 2 Solutions</TabsTrigger>
                  <TabsTrigger value="sharding">Sharding</TabsTrigger>
                  <TabsTrigger value="sidechains">Sidechains</TabsTrigger>
                </TabsList>
                <TabsContent value="layer2" className="p-4 bg-muted/30 rounded-lg mt-2">
                  <h4 className="font-semibold mb-2">Layer 2 Scaling</h4>
                  <p>
                    Layer 2 solutions build additional frameworks on top of the base blockchain layer. 
                    Examples include Lightning Network for Bitcoin and Optimistic Rollups for Ethereum, 
                    which process transactions off the main chain while inheriting its security.
                  </p>
                </TabsContent>
                <TabsContent value="sharding" className="p-4 bg-muted/30 rounded-lg mt-2">
                  <h4 className="font-semibold mb-2">Sharding</h4>
                  <p>
                    Sharding splits a blockchain network into separate partitions called "shards," 
                    each capable of processing transactions independently. This allows for parallel 
                    processing and increases the total network throughput.
                  </p>
                </TabsContent>
                <TabsContent value="sidechains" className="p-4 bg-muted/30 rounded-lg mt-2">
                  <h4 className="font-semibold mb-2">Sidechains</h4>
                  <p>
                    Sidechains are separate blockchains that run in parallel to the main blockchain 
                    and are connected through a two-way peg. They can have different consensus rules 
                    while maintaining interoperability with the main chain.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Interoperability</h3>
            <p>
              As different blockchain platforms evolve, the ability for them to communicate and share 
              information becomes increasingly important. Cross-chain protocols and bridges are being 
              developed to enable seamless interaction between different blockchain networks.
            </p>

            <div className="my-6 p-5 border rounded-lg bg-muted/30">
              <h4 className="font-semibold mb-3">Key Interoperability Projects</h4>
              <ul className="space-y-3">
                <li><strong>Polkadot:</strong> Creates a network of blockchains that can interoperate through its relay chain</li>
                <li><strong>Cosmos:</strong> Uses the Inter-Blockchain Communication protocol to connect separate blockchains</li>
                <li><strong>Chainlink:</strong> Provides decentralized oracle networks to connect blockchains with external systems</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Regulatory Developments</h3>
            <p>
              As blockchain technology matures, governments and regulatory bodies are developing frameworks 
              to address its use. These regulations aim to prevent illegal activities while fostering innovation.
            </p>
            
            <p>
              Key regulatory considerations include:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Anti-money laundering (AML) and know-your-customer (KYC) requirements</li>
              <li>Securities laws applying to token offerings and crypto assets</li>
              <li>Data privacy regulations and their intersection with blockchain's transparency</li>
              <li>Central bank digital currencies (CBDCs) and their implementation</li>
            </ul>
          </div>

          <div className="bg-primary/5 border rounded-lg p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Scalability remains a key challenge that various technical solutions aim to address</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Interoperability between blockchains will be crucial for wider adoption</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>Regulatory frameworks are evolving to provide clarity while encouraging innovation</span>
              </li>
            </ul>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {
              setActiveSection("applications");
              setProgress(50);
            }}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Section
            </Button>
            <Button onClick={() => {
              setActiveSection("conclusion");
              setProgress(95);
            }}>Continue to Final Section</Button>
          </div>
        </div>
      )
    },
    {
      id: "conclusion",
      title: "Conclusion",
      complete: false,
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">Wrapping Up: Blockchain Fundamentals</h2>
            
            <p>
              Throughout this course, we've explored the core concepts of blockchain technology:
            </p>
            
            <div className="my-8">
              <div className="flex items-start mb-6">
                <div className="bg-primary/20 rounded-full p-3 mr-4 shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">The Basics of Blockchain</h3>
                  <p className="text-muted-foreground">
                    We defined blockchain as a decentralized, distributed ledger technology that 
                    enables secure, transparent, and immutable record-keeping.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/20 rounded-full p-3 mr-4 shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Technical Mechanisms</h3>
                  <p className="text-muted-foreground">
                    We explored how blockchain works through linked blocks, cryptographic hashing, 
                    and different consensus mechanisms like Proof of Work and Proof of Stake.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-primary/20 rounded-full p-3 mr-4 shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-World Applications</h3>
                  <p className="text-muted-foreground">
                    We discovered how blockchain extends beyond cryptocurrencies to revolutionize 
                    industries through smart contracts, supply chain solutions, and more.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/20 rounded-full p-3 mr-4 shrink-0">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Future Trends</h3>
                  <p className="text-muted-foreground">
                    We examined the challenges and opportunities ahead, including scalability solutions, 
                    interoperability between blockchains, and evolving regulatory landscapes.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-3">Next Steps in Your Blockchain Journey</h3>
            <p>
              This course has provided a foundation in blockchain fundamentals. To continue your learning journey:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <h4 className="font-semibold mb-2 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" /> 
                  Explore Specific Blockchains
                </h4>
                <p className="text-sm">
                  Dive deeper into specific blockchain platforms like Ethereum, Solana, or Polkadot to understand their unique features.
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <h4 className="font-semibold mb-2 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" /> 
                  Learn Smart Contract Development
                </h4>
                <p className="text-sm">
                  Start learning programming languages like Solidity to create your own smart contracts and decentralized applications.
                </p>
              </div>
            </div>

            <div className="bg-muted/30 border rounded-lg p-6 my-8">
              <h3 className="font-semibold mb-3 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                Additional Resources
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <a href="https://ethereum.org/learn/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Ethereum.org Learning Resources
                  </a>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <a href="https://www.coursera.org/courses?query=blockchain" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Advanced Blockchain Courses on Coursera
                  </a>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <a href="https://github.com/yjjnls/awesome-blockchain" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Awesome Blockchain: A Curated List of Resources
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-primary/5 border rounded-lg p-6">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <GraduationCap className="mr-2 h-5 w-5" />
              Congratulations!
            </h3>
            <p className="mb-4">
              You've completed the Blockchain Fundamentals course! You now have a solid understanding of the 
              technology that's revolutionizing industries across the globe.
            </p>
            <div className="flex justify-center">
              <Badge variant="default" className="text-lg py-2 px-4">Course Completed</Badge>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => {
              setActiveSection("future-trends");
              setProgress(75);
            }}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous Section
            </Button>
            <Button asChild>
              <Link to="/learn">Return to Learning Hub</Link>
            </Button>
          </div>
        </div>
      )
    }
  ];

  // Find the current section content
  const currentSection = sections.find(section => section.id === activeSection) || sections[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container px-4 py-8 flex-grow">
        {/* Course Header */}
        <div className="mb-8">
          <Link to="/learn" className="flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Learning Hub
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Blockchain Fundamentals</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  Beginner
                </Badge>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>15 min</span>
                </div>
                <div>Blockchain</div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <Link to="/learn">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View All Courses
                </Link>
              </Button>
            </div>
          </div>

          <Progress value={progress} className="h-2 mt-4" />
        </div>

        {/* Course Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-4 sticky top-24">
              <h2 className="font-semibold mb-3">Course Content</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Button
                      variant={section.id === activeSection ? "default" : "ghost"}
                      className={`w-full justify-start text-left ${section.id === activeSection ? "" : "text-muted-foreground"}`}
                      onClick={() => {
                        setActiveSection(section.id);
                        const sectionIndex = sections.findIndex(s => s.id === section.id);
                        setProgress(sectionIndex * 25);
                      }}
                    >
                      {section.title}
                    </Button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">Course Progress</div>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-right text-sm text-muted-foreground">{progress}% Complete</p>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border p-6">
              {currentSection.content}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-6 mt-auto">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CryptoLearn. All rights reserved.</p>
          <p className="mt-1">Educational content provided for informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlockchainFundamentals;
