import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter, Grid, Image, Link as LinkIcon, CreditCard } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1000000;
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] overflow-auto">
      <div className="container mx-auto px-2 min-h-screen flex flex-col">
        <header className="py-1">
          <div className="flex items-center justify-between bg-[#1A1F2C] rounded-lg p-2 border border-solana-purple/20">
            {/* Left - Stats */}
            <div className="flex items-center gap-2 px-2 py-1 bg-[#2D243F]/50 rounded-lg border border-solana-purple/20">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-solana-blue"></span>
                <span className="text-white font-pixel text-[8px]">1M pixels</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-solana-purple"></span>
                <span className="text-white font-pixel text-[8px]">0.1 SOL/px</span>
              </div>
            </div>

            {/* Center - Site Name */}
            <h1 className="text-[12px] md:text-[14px] font-pixel bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent leading-relaxed text-center">
              The Million Solana Memepage
            </h1>

            {/* Right - Live Counter */}
            <div className="relative min-w-[140px]">
              <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-pixel text-[8px] uppercase tracking-wider">Available</span>
                  <span className="bg-red-500 text-white text-[6px] px-1 rounded-full animate-pulse font-pixel">
                    LIVE
                  </span>
                </div>
                <div className="text-[#1EAEDB] font-bold font-pixel text-[10px]">
                  {(totalPixels - totalSold).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="mt-1 bg-gradient-to-r from-solana-purple to-solana-blue p-[1px] rounded-lg">
            <div className="bg-[#1A1F2C] rounded-lg px-3 py-1 flex items-center justify-center gap-3">
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[8px] bg-solana-purple/20 hover:bg-solana-purple/30 transition-all h-6"
                onClick={() => window.location.href = '#grid'}
              >
                Buy Pixels
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[8px] bg-solana-purple/20 hover:bg-solana-purple/30 transition-all h-6"
                onClick={() => setAboutOpen(true)}
              >
                About
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[8px] bg-solana-purple/20 hover:bg-solana-purple/30 transition-all h-6 flex items-center gap-1"
                onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
              >
                <Twitter className="w-3 h-3" />
                Follow
              </Button>
            </div>
          </nav>
        </header>

        <div className="py-1">
          <Stats totalSold={totalSold} totalPixels={totalPixels} />
        </div>
        
        <div id="grid" className="flex-1">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <footer className="text-center text-[#9b87f5] py-0.5">
          <p className="font-pixel text-[8px]">
            The Million Solana Memepage - A collaborative pixel art canvas for the Solana community. © 2024
          </p>
        </footer>

        <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
          <DialogContent className="bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] border-2 border-solana-purple/20 text-white font-pixel max-w-lg mx-auto p-8 rounded-lg shadow-2xl">
            <DialogHeader className="mb-8">
              <DialogTitle className="text-center text-xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent font-pixel tracking-wider">
                About Solana Pixel Wall
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-8 text-sm leading-relaxed px-2">
              {/* What is Section */}
              <div className="bg-[#2A2F3C]/50 p-6 rounded-lg border border-solana-purple/20">
                <h3 className="text-solana-blue font-bold mb-4 tracking-wide">
                  What is Solana Pixel Wall?
                </h3>
                <p className="text-gray-200">
                  A unique digital canvas of{" "}
                  <span className="text-solana-purple font-bold">1,000,000 pixels</span>{" "}
                  on the Solana blockchain. Reserve your spot, upload your image, and share your link with the world!
                </p>
              </div>

              {/* How to Buy Section */}
              <div className="bg-[#2A2F3C]/50 p-6 rounded-lg border border-solana-purple/20">
                <h3 className="text-solana-blue font-bold mb-6 tracking-wide">
                  How to Buy Pixels:
                </h3>
                <ol className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Grid className="w-6 h-6 text-solana-purple flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-solana-purple block mb-2">1. Choose Your Block</strong>
                      <p className="text-gray-200 ml-2">
                        Pixels are sold in <span className="text-solana-purple">10x10 blocks</span> (100 pixels).
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <Image className="w-6 h-6 text-solana-purple flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-solana-purple block mb-2">2. Prepare Your Image</strong>
                      <p className="text-gray-200 ml-2">
                        Upload a custom image sized exactly <span className="text-solana-purple">10x10 blocks</span> (100x100 pixels).
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <LinkIcon className="w-6 h-6 text-solana-purple flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-solana-purple block mb-2">3. Add Your Link</strong>
                      <p className="text-gray-200 ml-2">
                        Insert a clickable link to your project, idea, or content.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <CreditCard className="w-6 h-6 text-solana-purple flex-shrink-0 mt-1" />
                    <div>
                      <strong className="text-solana-purple block mb-2">4. Complete the Purchase</strong>
                      <p className="text-gray-200 ml-2">
                        Pay in SOL and provide the <span className="text-solana-purple">transaction hash</span> to finalize your block reservation.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6">
                <p className="text-lg font-bold bg-gradient-to-r from-solana-blue to-solana-purple bg-clip-text text-transparent animate-pulse">
                  Leave your mark on the Solana blockchain today!
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;