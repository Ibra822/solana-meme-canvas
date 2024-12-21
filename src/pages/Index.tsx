import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter } from 'lucide-react';

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1000000; // 1000x1000 grid

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F]">
      <div className="container mx-auto px-2 h-screen flex flex-col">
        <header className="py-1">
          <div className="flex items-center justify-between bg-[#1A1F2C] rounded-lg p-1.5 border border-solana-purple/20">
            {/* Left - Site Name */}
            <div className="flex items-center gap-2">
              <h1 className="text-xs md:text-sm font-pixel bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent leading-relaxed text-left whitespace-nowrap">
                The Million<br />Solana<br />Memepage
              </h1>
            </div>

            {/* Center - Stats */}
            <div className="flex items-center gap-2 px-2 py-0.5 bg-[#2D243F]/50 rounded-lg border border-solana-purple/20">
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-solana-blue"></span>
                <span className="text-white font-pixel text-[8px]">1M pixels</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-solana-purple"></span>
                <span className="text-white font-pixel text-[8px]">0.1 SOL/px</span>
              </div>
            </div>

            {/* Right - Live Counter */}
            <div className="relative min-w-[140px]">
              <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(30,174,219,0.3)]">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-pixel text-[8px] uppercase tracking-wider">Available</span>
                  <span className="bg-red-500 text-white text-[6px] px-1.5 rounded-full animate-pulse font-pixel">
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
                onClick={() => window.location.href = '#about'}
              >
                About
              </Button>
              <Button 
                variant="ghost"
                size="sm"
                className="text-white hover:text-solana-blue font-pixel text-[8px] bg-solana-purple/20 hover:bg-solana-purple/30 transition-all h-6 flex items-center gap-1"
                onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
              >
                <Twitter className="w-2 h-2" />
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
      </div>
    </div>
  );
};

export default Index;