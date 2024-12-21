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
      <div className="container mx-auto px-4 md:px-8 py-2">
        <div className="max-w-[1200px] mx-auto">
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
          
          <div className="bg-white/5 p-4 rounded-lg mb-4">
            <div id="grid" className="mb-4">
              <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
            </div>
          </div>

          <div id="about" className="text-center text-[#9b87f5] mt-4 mb-2">
            <h2 className="text-sm font-bold mb-1 font-pixel">About</h2>
            <p className="max-w-2xl mx-auto font-space text-xs">
              Inspired by the Million Dollar Homepage, this project brings the concept to the Solana blockchain.
              Each pixel is unique and can be owned by you. Buy pixels, add your meme, and become part of history!
            </p>
          </div>

          <footer className="border-t border-solana-purple/20 mt-8 pt-4 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#9b87f5] text-xs font-space">
              <div>
                <h3 className="font-bold mb-2">Contact</h3>
                <p>For inquiries: contact@solanamemepage.com</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Legal</h3>
                <p>© 2024 Million Solana Memepage</p>
                <p>All rights reserved</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Terms</h3>
                <p>By purchasing pixels, you agree to our terms of service.</p>
                <p>Content must comply with community guidelines.</p>
              </div>
            </div>
            <div className="text-center mt-4 text-[#9b87f5] text-xs font-space">
              <p>Powered by Solana Blockchain</p>
              <p className="mt-1">The Million Solana Memepage is not affiliated with the original Million Dollar Homepage</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;