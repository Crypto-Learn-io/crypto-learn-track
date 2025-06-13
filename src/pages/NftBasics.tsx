import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Book, CheckCircle, ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import VideoPlaceholder from "@/components/VideoPlaceholder";

const NftBasics = () => {
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState(1);
  
  const totalModules = 3;

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
                { num: 1, title: "What Are NFTs?" },
                { num: 2, title: "Creating and Collecting NFTs" },
                { num: 3, title: "NFT Use Cases" }
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
                <h1 className="course-title">What Are NFTs?</h1>
                <p className="course-description">Understanding non-fungible tokens and how they work</p>
              </div>
              
              <VideoPlaceholder videoId="bdYQxLxYV5U" title="Introduction to NFTs" />
              
              <div className="course-content">
                <h2>Understanding NFTs</h2>
                <p>
                  NFT stands for Non-Fungible Token. Unlike cryptocurrencies such as Bitcoin or Ethereum, which are fungible (one unit is identical to another), 
                  NFTs are unique digital assets that cannot be replaced with something else of equal value.
                </p>
                
                <h3>Fungible vs. Non-Fungible</h3>
                <ul>
                  <li><strong>Fungible assets:</strong> Interchangeable and identical in value and characteristics (e.g., dollars, Bitcoin)</li>
                  <li><strong>Non-fungible assets:</strong> Unique with distinct characteristics and values (e.g., artwork, collectibles, real estate)</li>
                </ul>
                
                <h3>How Do NFTs Work?</h3>
                <p>
                  NFTs use blockchain technology to establish proof of ownership and authenticity for digital items. Key aspects include:
                </p>
                <ul>
                  <li><strong>Blockchain storage:</strong> Most NFTs exist on the Ethereum blockchain, though other blockchains like Solana, Flow, and Tezos also support them</li>
                  <li><strong>Smart contracts:</strong> Self-executing programs that define the rules and functionality of NFTs</li>
                  <li><strong>Metadata:</strong> Information about the NFT, including details about what it represents</li>
                  <li><strong>Tokenization:</strong> The process of converting rights to an asset into a digital token on a blockchain</li>
                </ul>
                
                <h3>NFT Standards</h3>
                <p>
                  Different blockchains have different standards for NFTs:
                </p>
                <ul>
                  <li><strong>ERC-721:</strong> The original NFT standard on Ethereum for completely unique tokens</li>
                  <li><strong>ERC-1155:</strong> A more flexible standard that allows for semi-fungible tokens and batch transfers</li>
                  <li><strong>Others:</strong> SPL (Solana), Flow NFT (Flow blockchain), FA2 (Tezos)</li>
                </ul>
                
                <h3>NFT Marketplaces</h3>
                <p>
                  These platforms allow users to mint, buy, sell, and trade NFTs:
                </p>
                <ul>
                  <li>OpenSea</li>
                  <li>Rarible</li>
                  <li>Foundation</li>
                  <li>SuperRare</li>
                  <li>NBA Top Shot</li>
                  <li>Magic Eden</li>
                </ul>
                
                <Accordion type="single" collapsible className="course-faq">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>Can't I just screenshot an NFT instead of buying it?</AccordionTrigger>
                    <AccordionContent>
                      While you can save a copy of the digital asset that an NFT represents (like an image), you wouldn't own the original or its associated rights. Owning an NFT is about verifiable ownership and authenticity, similar to how anyone can take a photo of the Mona Lisa, but only the Louvre owns the original painting.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Are NFTs just digital art?</AccordionTrigger>
                    <AccordionContent>
                      No, while digital art has been a prominent use case for NFTs, they can represent ownership of virtually any unique asset, including music, videos, virtual real estate, game items, domain names, event tickets, identity verification, and much more.
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
                <h1 className="course-title">Creating and Collecting NFTs</h1>
                <p className="course-description">How to create, buy, sell, and collect NFTs</p>
              </div>
              
              <div className="course-content">
                <h2>Creating NFTs (Minting)</h2>
                <p>
                  "Minting" is the process of converting a digital file into a digital asset stored on the blockchain.
                </p>
                
                <h3>Steps to Create an NFT</h3>
                <ol>
                  <li>
                    <strong>Choose a blockchain</strong>
                    <p>Select a blockchain network (Ethereum, Solana, etc.) based on factors like fees, environmental impact, and marketplace compatibility.</p>
                  </li>
                  
                  <li>
                    <strong>Set up a wallet</strong>
                    <p>Create a cryptocurrency wallet compatible with your chosen blockchain and load it with the native cryptocurrency to pay for minting fees.</p>
                  </li>
                  
                  <li>
                    <strong>Select an NFT marketplace</strong>
                    <p>Choose a platform where you'll create and list your NFT (OpenSea, Rarible, Foundation, etc.).</p>
                  </li>
                  
                  <li>
                    <strong>Create and upload your file</strong>
                    <p>Prepare your digital file (image, video, audio, etc.) and upload it to the marketplace.</p>
                  </li>
                  
                  <li>
                    <strong>Set up your sale</strong>
                    <p>Decide whether to sell at a fixed price, auction, or keep private. Configure royalties to earn from future sales.</p>
                  </li>
                </ol>
                
                <h3>Collecting NFTs</h3>
                <p>
                  If you're interested in purchasing NFTs, here are some tips:
                </p>
                <ul>
                  <li><strong>Research:</strong> Understand the creator, project history, and community</li>
                  <li><strong>Verify authenticity:</strong> Check that you're buying from official sources to avoid scams</li>
                  <li><strong>Consider utility:</strong> Does the NFT offer any benefits beyond the digital asset itself?</li>
                  <li><strong>Set a budget:</strong> Only spend what you can afford to lose</li>
                  <li><strong>Understand gas fees:</strong> Be aware of transaction costs, which can sometimes exceed the NFT price</li>
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
                <h1 className="course-title">NFT Use Cases</h1>
                <p className="course-description">Exploring the practical applications of NFT technology</p>
              </div>
              
              <div className="course-content">
                <h2>Beyond Digital Art: The Many Applications of NFTs</h2>
                <p>
                  While digital art and collectibles have dominated NFT headlines, the technology's potential extends far beyond these use cases.
                </p>
                
                <h3>Current NFT Applications</h3>
                <ol>
                  <li>
                    <strong>Digital Art and Collectibles</strong>
                    <p>Artists can tokenize their work, enabling direct sales to collectors and ongoing royalties from secondary sales.</p>
                  </li>
                  
                  <li>
                    <strong>Gaming</strong>
                    <p>In-game items as NFTs allow players to truly own their digital assets, trade them outside the game, and potentially use them across different games.</p>
                  </li>
                  
                  <li>
                    <strong>Virtual Real Estate</strong>
                    <p>Ownership of digital land in virtual worlds like Decentraland and The Sandbox, where owners can build, monetize, and interact.</p>
                  </li>
                  
                  <li>
                    <strong>Music and Entertainment</strong>
                    <p>Musicians can release limited-edition songs, albums, or concert experiences as NFTs, creating new revenue streams and fan experiences.</p>
                  </li>
                  
                  <li>
                    <strong>Sports Moments and Memorabilia</strong>
                    <p>Platforms like NBA Top Shot offer officially licensed digital collectibles representing iconic sports moments.</p>
                  </li>
                </ol>
                
                <h3>Emerging NFT Use Cases</h3>
                <ul>
                  <li><strong>Identity and Certification:</strong> Academic credentials, professional certifications, and digital passports</li>
                  <li><strong>Real Estate:</strong> Tokenizing property ownership and streamlining transactions</li>
                  <li><strong>Event Tickets:</strong> Reducing fraud and enabling a transparent resale market</li>
                  <li><strong>Supply Chain Management:</strong> Verifying authenticity and tracking provenance of physical goods</li>
                  <li><strong>Intellectual Property:</strong> Protecting and monetizing patents, trademarks, and copyrights</li>
                  <li><strong>Access Tokens:</strong> Granting holders access to exclusive communities, content, or experiences</li>
                </ul>
                
                <h3>NFTs and DAOs</h3>
                <p>
                  NFTs often work with Decentralized Autonomous Organizations (DAOs) to:
                </p>
                <ul>
                  <li>Fund creative projects through collective ownership</li>
                  <li>Govern communities with token-based voting rights</li>
                  <li>Manage shared resources and treasury funds</li>
                </ul>
                
                <h3>Challenges and Future Developments</h3>
                <ul>
                  <li><strong>Environmental Concerns:</strong> Addressing the energy consumption of certain blockchain networks</li>
                  <li><strong>Scalability:</strong> Improving transaction speeds and reducing fees</li>
                  <li><strong>Interoperability:</strong> Enabling NFTs to work across different platforms and blockchains</li>
                  <li><strong>User Experience:</strong> Making NFT technology more accessible to mainstream users</li>
                  <li><strong>Regulatory Clarity:</strong> Establishing clear legal frameworks for NFT ownership and transfers</li>
                </ul>
              </div>
              
              <div className="course-navigation">
                <Button variant="outline" onClick={() => setCurrentModule(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Module
                </Button>
                <Button onClick={() => handleModuleComplete(3)}>
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

export default NftBasics;
