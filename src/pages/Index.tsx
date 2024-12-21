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
      <div className="container mx-auto px-4 h-screen flex flex-col">
        <header className="py-1">
          <div className="flex items-center justify-between">
            {/* Left - Site Name */}
            <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent font-['Press_Start_2P'] leading-relaxed text-left">
              The Million<br />Solana<br />Memepage
            </h1>

            {/* Center - Navigation */}
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#9b87f5] max-w-md mx-auto font-space mb-2">
                Own a piece of Solana history! Buy pixels to promote your memecoins, NFTs, or become a featured Solana influencer.
              </p>
              
              <div className="flex flex-wrap justify-center gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-6 px-2"
                  onClick={() => window.location.href = '#grid'}
                >
                  Buy Pixels
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-6 px-2"
                  onClick={() => window.location.href = '#about'}
                >
                  About
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-6 px-2 flex items-center gap-1"
                  onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
                >
                  <Twitter className="w-3 h-3" />
                  Follow
                </Button>
              </div>
            </div>

            {/* Right - Live Counter */}
            <div className="relative min-w-[180px]">
              <div className="bg-[#1EAEDB] bg-opacity-20 border border-[#1EAEDB] rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-space text-xs">PIXELS SOLD</span>
                  <span className="bg-red-500 text-white text-[10px] px-1 rounded animate-pulse">
                    LIVE
                  </span>
                </div>
                <div className="text-[#1EAEDB] font-bold font-space">
                  {totalSold.toLocaleString()} / {totalPixels.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="py-1">
          <Stats totalSold={totalSold} totalPixels={totalPixels} />
        </div>
        
        <div id="grid" className="flex-1 overflow-auto">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <footer className="text-center text-[#9b87f5] py-1">
          <p className="font-space text-xs">
            The Million Solana Memepage - A collaborative pixel art canvas for the Solana community. © 2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;