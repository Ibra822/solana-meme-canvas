import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter } from 'lucide-react';

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1000000; // 1000x1000 grid

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] flex flex-col">
      <div className="container mx-auto px-4 flex-1 flex flex-col max-h-screen overflow-hidden">
        <header className="text-center py-2">
          <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent mb-1 font-['Press_Start_2P'] leading-relaxed">
            The Million Solana Memepage
          </h1>
          <p className="text-xs md:text-sm text-[#9b87f5] max-w-2xl mx-auto font-space mb-2">
            Own a piece of Solana history! Buy pixels to promote your memecoins, NFTs, or become a featured Solana influencer.
          </p>
          
          <div className="flex flex-wrap justify-center gap-1">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-7 px-2"
              onClick={() => window.location.href = '#grid'}
            >
              Buy Pixels
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-7 px-2"
              onClick={() => window.location.href = '#about'}
            >
              About
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space text-xs h-7 px-2 flex items-center gap-1"
              onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
            >
              <Twitter className="w-3 h-3" />
              Follow
            </Button>
          </div>
        </header>

        <Stats totalSold={totalSold} totalPixels={totalPixels} />
        
        <div id="grid" className="flex-1 overflow-auto my-2">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <footer className="text-center text-[#9b87f5] py-2">
          <p className="font-space text-xs">
            The Million Solana Memepage - A collaborative pixel art canvas for the Solana community. © 2024
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;