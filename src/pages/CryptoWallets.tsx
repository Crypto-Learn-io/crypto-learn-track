
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Book, CheckCircle, ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CryptoWallets = () => {
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
                { num: 1, title: "Wallet Types" },
                { num: 2, title: "Security Best Practices" },
                { num: 3, title: "Managing Your Keys" }
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
                <h1 className="text-3xl font-bold">Understanding Crypto Wallets</h1>
                <p className="text-muted-foreground">Learn the different types of cryptocurrency wallets and their features</p>
              </div>
              
              <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Video Lecture Placeholder</span>
              </div>
              
              <div className="prose max-w-none">
                <h2>What is a Cryptocurrency Wallet?</h2>
                <p>
                  A cryptocurrency wallet is a tool that allows you to store and access your cryptocurrency. Unlike traditional wallets, 
                  crypto wallets don't actually store your coins. Instead, they store the private keys needed to access your cryptocurrency 
                  address and sign transactions on the blockchain.
                </p>
                
                <h3>Types of Cryptocurrency Wallets</h3>
                <p>
                  Cryptocurrency wallets come in several forms, each with varying levels of security, convenience, and features:
                </p>
                
                <h4>1. Hot Wallets (Connected to the internet)</h4>
                <ul>
                  <li><strong>Web Wallets:</strong> Browser-based wallets accessible from any device with internet connection (e.g., MetaMask, Trust Wallet)</li>
                  <li><strong>Mobile Wallets:</strong> Smartphone applications that provide convenient access to your funds (e.g., Exodus, Coinbase Wallet)</li>
                  <li><strong>Desktop Wallets:</strong> Applications installed on a computer (e.g., Atomic Wallet, Electrum)</li>
                </ul>
                
                <h4>2. Cold Wallets (Offline storage)</h4>
                <ul>
                  <li><strong>Hardware Wallets:</strong> Physical devices specifically designed to store cryptocurrency keys securely (e.g., Ledger, Trezor)</li>
                  <li><strong>Paper Wallets:</strong> Physical documents containing printed versions of your public and private keys</li>
                  <li><strong>Steel Wallets:</strong> Metal plates that preserve your seed phrase, resistant to fire, water, and other physical damage</li>
                </ul>
                
                <h3>Custodial vs. Non-Custodial Wallets</h3>
                <ul>
                  <li><strong>Custodial Wallets:</strong> A third party (usually an exchange) holds and manages your private keys</li>
                  <li><strong>Non-Custodial Wallets:</strong> You have sole control over your private keys and full responsibility for your funds</li>
                </ul>
                
                <Accordion type="single" collapsible className="mt-6">
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>What's the difference between private and public keys?</AccordionTrigger>
                    <AccordionContent>
                      <p><strong>Public Key:</strong> This is your wallet address, which you can share with others to receive funds. It's like your email address.</p>
                      <p><strong>Private Key:</strong> This is the secret code that gives you access to your cryptocurrency. Never share it with anyone - it's like the password to your email.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>Which wallet is best for beginners?</AccordionTrigger>
                    <AccordionContent>
                      For beginners, a reputable mobile wallet like Trust Wallet or Coinbase Wallet offers a good balance of security and usability. As you gain experience and accumulate more crypto assets, consider investing in a hardware wallet like Ledger or Trezor for enhanced security.
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
                <h1 className="text-3xl font-bold">Security Best Practices</h1>
                <p className="text-muted-foreground">Essential security measures to keep your cryptocurrency safe</p>
              </div>
              
              <div className="prose max-w-none">
                <h2>Securing Your Crypto Assets</h2>
                <p>
                  Security is paramount in the cryptocurrency world. Without proper security practices, you risk losing your assets permanently.
                </p>
                
                <h3>Essential Security Practices</h3>
                <ol>
                  <li>
                    <strong>Back up your wallet</strong>
                    <p>Always create backups of your wallet's seed phrase or private keys. Store these backups in secure, offline locations.</p>
                  </li>
                  
                  <li>
                    <strong>Use strong passwords</strong>
                    <p>Create unique, complex passwords for each cryptocurrency platform you use. Consider using a password manager.</p>
                  </li>
                  
                  <li>
                    <strong>Enable two-factor authentication (2FA)</strong>
                    <p>Use an authenticator app rather than SMS for 2FA whenever possible.</p>
                  </li>
                  
                  <li>
                    <strong>Be wary of phishing attempts</strong>
                    <p>Always double-check URLs before entering your credentials. Bookmark official websites.</p>
                  </li>
                  
                  <li>
                    <strong>Keep software updated</strong>
                    <p>Regularly update your wallet software, operating systems, and applications to protect against security vulnerabilities.</p>
                  </li>
                </ol>
                
                <h3>Common Security Threats</h3>
                <ul>
                  <li><strong>Phishing:</strong> Fraudulent attempts to obtain sensitive information by disguising as a trustworthy entity</li>
                  <li><strong>Malware:</strong> Software designed to disrupt, damage, or gain unauthorized access to computer systems</li>
                  <li><strong>SIM swapping:</strong> Attackers take control of your phone number to bypass SMS-based 2FA</li>
                  <li><strong>Man-in-the-middle attacks:</strong> Attackers intercept communications between two parties</li>
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
                <h1 className="text-3xl font-bold">Managing Your Keys</h1>
                <p className="text-muted-foreground">Best practices for private key and seed phrase management</p>
              </div>
              
              <div className="prose max-w-none">
                <h2>Understanding Seed Phrases</h2>
                <p>
                  A seed phrase (also called a recovery phrase or mnemonic phrase) is a series of words that store all the information needed to recover a cryptocurrency wallet.
                </p>
                
                <h3>Key Management Best Practices</h3>
                <ol>
                  <li>
                    <strong>Write down your seed phrase</strong>
                    <p>Record your seed phrase on durable physical media like paper or metal. Never store it digitally.</p>
                  </li>
                  
                  <li>
                    <strong>Store backups in multiple locations</strong>
                    <p>Keep copies of your seed phrase in multiple secure locations to protect against physical damage or loss.</p>
                  </li>
                  
                  <li>
                    <strong>Consider using a passphrase</strong>
                    <p>Many wallets support an additional passphrase that can add an extra layer of security to your seed phrase.</p>
                  </li>
                  
                  <li>
                    <strong>Test your recovery process</strong>
                    <p>Periodically ensure you can successfully restore your wallet using your backup methods.</p>
                  </li>
                </ol>
                
                <h3>What to Avoid</h3>
                <ul>
                  <li>Never share your seed phrase or private keys with anyone</li>
                  <li>Avoid storing seed phrases in digital formats (photos, documents, cloud storage, password managers)</li>
                  <li>Don't use wallets that don't provide you with a seed phrase</li>
                  <li>Beware of hardware wallets with pre-configured seed phrases or those purchased from unofficial resellers</li>
                </ul>
                
                <h3>Emergency Plans</h3>
                <p>
                  Consider creating a plan for your crypto assets in case something happens to you:
                </p>
                <ul>
                  <li>Create clear instructions for trusted family members</li>
                  <li>Consider multi-signature wallets for shared control</li>
                  <li>Research inheritance solutions designed for cryptocurrency</li>
                </ul>
              </div>
              
              <div className="flex justify-between pt-6 border-t">
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

export default CryptoWallets;
