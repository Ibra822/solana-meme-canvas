import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';
import { Button } from '../components/ui/button';
import { Twitter } from 'lucide-react';

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1000000; // 1 million pixels

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F]">
      <header className="fixed top-0 left-0 right-0 bg-[#1A1F2C]/90 backdrop-blur-sm z-50 border-b border-[#9b87f5]/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent font-['Press_Start_2P']">
              Million Solana Memepage
            </h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button 
                variant="outline" 
                className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-['Press_Start_2P'] text-xs"
                onClick={() => window.location.href = '#grid'}
              >
                Buy Pixels
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-['Press_Start_2P'] text-xs"
                onClick={() => window.location.href = '#about'}
              >
                About
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#6E59A5] hover:bg-[#7E69AB] text-white border-[#9b87f5] font-['Press_Start_2P'] text-xs flex items-center gap-2"
                onClick={() => window.open('https://x.com/Abe_Ehidna', '_blank')}
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="container mx-auto px-4">
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
        </div>
      </main>

      <footer className="text-center text-[#9b87f5] py-4">
        <p className="font-['Press_Start_2P'] text-xs">© 2024 Million Solana Memepage</p>
      </footer>
    </div>
  );
};

export default Index;