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
      <div className="container mx-auto px-1 py-2">
        <header className="text-center mb-2">
          <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent mb-1 font-pixel leading-relaxed">
            The Million Solana Memepage
          </h1>
          <p className="text-xs md:text-sm text-[#9b87f5] max-w-2xl mx-auto font-space mb-2">
            Own a piece of crypto history! Buy pixels, add your meme, and become part of the first Solana pixel art collective.
          </p>
          
          <div className="flex flex-wrap justify-center gap-1 mb-2">
            <Button 
              variant="outline" 
              size="sm"
              className="h-6 text-xs bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space px-2"
              onClick={() => window.location.href = '#grid'}
            >
              Buy Pixels
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="h-6 text-xs bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space px-2"
              onClick={() => window.location.href = '#about'}
            >
              About
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="h-6 text-xs bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space px-2 flex items-center gap-1"
              onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
            >
              <Twitter className="w-3 h-3" />
              Follow
            </Button>
          </div>
        </header>

        <div className="mb-2">
          <Stats totalSold={totalSold} totalPixels={totalPixels} />
        </div>
        
        <div id="grid" className="mb-4">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <div id="about" className="text-center text-[#9b87f5] mt-4 mb-2">
          <h2 className="text-sm font-bold mb-1 font-pixel">About</h2>
          <p className="max-w-2xl mx-auto font-space text-xs">
            Inspired by the Million Dollar Homepage, this project brings the concept to the Solana blockchain.
            Each pixel is unique and can be owned by you. Buy pixels, add your meme, and become part of history!
          </p>
        </div>

        <footer className="text-center text-[#9b87f5] mt-2">
          <p className="font-space text-xs">© 2024 Million Solana Memepage. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;