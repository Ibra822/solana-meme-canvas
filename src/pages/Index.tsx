import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter } from 'lucide-react';
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
  const [showBuyModal, setShowBuyModal] = useState(false);

  const handleBuyPixelsClick = () => {
    setShowBuyModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] overflow-auto">
      <div className="container mx-auto px-2 min-h-screen flex flex-col">
        <header className="py-1">
          <div className="flex items-center justify-between bg-[#1A1F2C] rounded-lg p-2 border border-solana-purple/20">
            {/* Left side */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="sm"
                className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-2 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)] text-white hover:bg-[#1EAEDB]/30 transition-all h-8 font-pixel text-[10px] flex items-center gap-2"
                onClick={handleBuyPixelsClick}
              >
                Buy Pixels
                <span className="text-[8px] opacity-75">(0.1 SOL/px)</span>
              </Button>
            </div>

            {/* Center - Site Name */}
            <h1 className="text-[16px] md:text-[20px] font-pixel bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent leading-relaxed text-center">
              The Million Solana Memepage
            </h1>

            {/* Right - Navigation */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[10px] bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] hover:bg-[#1EAEDB]/30 transition-all h-8"
                onClick={() => setAboutOpen(true)}
              >
                About
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[10px] bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] hover:bg-[#1EAEDB]/30 transition-all h-8 flex items-center gap-1"
                onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
              >
                <Twitter className="w-3 h-3" />
                Follow
              </Button>
            </div>
          </div>
        </header>

        <div className="py-1">
          <Stats totalSold={totalSold} totalPixels={totalPixels} />
        </div>
        
        <div id="grid" className="flex-1">
          <PixelGrid 
            onPixelSold={() => setTotalSold(prev => prev + 1)}
            onBuyPixelsClick={handleBuyPixelsClick}
          />
        </div>

        <footer className="text-center text-[#9b87f5] py-0.5">
          <p className="font-pixel text-[8px]">
            The Million Solana Memepage - A collaborative pixel art canvas for the Solana community. © 2024
          </p>
        </footer>

        <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
          <DialogContent className="bg-[#1A1F2C] border border-solana-purple/20 text-white font-pixel">
            <DialogHeader>
              <DialogTitle className="text-center text-[14px] bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent pb-4">
                About Solana Pixel Wall
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 text-[10px] leading-relaxed">
              <div>
                <h3 className="text-solana-blue mb-2">What is Solana Pixel Wall?</h3>
                <p>
                  A unique digital canvas of <span className="text-solana-purple">1,000,000 pixels</span> on the Solana blockchain. Reserve your spot, upload your image, and share your link with the world!
                </p>
              </div>

              <div>
                <h3 className="text-solana-blue mb-2">How to Buy Pixels:</h3>
                <ol className="space-y-4">
                  <li>
                    <strong className="text-solana-purple">1. Choose Your Block:</strong>
                    <ul className="mt-1 ml-4">
                      <li>- Pixels are sold in <span className="text-solana-purple">10x10 blocks</span> (100 pixels).</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-solana-purple">2. Prepare Your Image:</strong>
                    <ul className="mt-1 ml-4">
                      <li>- Upload a custom image sized exactly <span className="text-solana-purple">10x10 blocks</span> (100x100 pixels).</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-solana-purple">3. Add Your Link:</strong>
                    <ul className="mt-1 ml-4">
                      <li>- Insert a clickable link to your project, idea, or content.</li>
                    </ul>
                  </li>
                  <li>
                    <strong className="text-solana-purple">4. Complete the Purchase:</strong>
                    <ul className="mt-1 ml-4">
                      <li>- Pay in SOL and provide the <span className="text-solana-purple">transaction hash</span> to finalize your block reservation.</li>
                    </ul>
                  </li>
                </ol>
              </div>

              <p className="text-center text-solana-blue pt-4">
                Leave your mark on the Solana blockchain today!
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
