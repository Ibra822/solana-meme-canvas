import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter } from 'lucide-react';

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1000000; // Updated to 1 million pixels

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F]">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent mb-4 font-['Press_Start_2P'] leading-relaxed">
            The Million Solana Memepage
          </h1>
          <p className="text-lg md:text-xl text-[#9b87f5] max-w-2xl mx-auto font-space">
            Own a piece of crypto history! Buy pixels, add your meme, and become part of the first Solana pixel art collective.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button 
              variant="outline" 
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space"
              onClick={() => window.location.href = '#grid'}
            >
              Buy Pixels
            </Button>
            <Button 
              variant="outline" 
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space"
              onClick={() => window.location.href = '#about'}
            >
              About
            </Button>
            <Button 
              variant="outline" 
              className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-space flex items-center gap-2"
              onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
            >
              <Twitter className="w-4 h-4" />
              Follow on Twitter
            </Button>
          </div>
        </header>

        <Stats totalSold={totalSold} totalPixels={totalPixels} />
        
        <div id="grid" className="mt-8 mb-12">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <div id="about" className="text-center text-[#9b87f5] mt-12 mb-8">
          <h2 className="text-2xl font-bold mb-4 font-['Press_Start_2P']">About The Project</h2>
          <p className="max-w-2xl mx-auto font-space">
            Inspired by the Million Dollar Homepage, this project brings the concept to the Solana blockchain.
            Each pixel is unique and can be owned by you. Buy pixels, add your meme, and become part of history!
          </p>
        </div>

        <footer className="text-center text-[#9b87f5] mt-12">
          <p className="font-space">© 2024 Million Solana Memepage. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;