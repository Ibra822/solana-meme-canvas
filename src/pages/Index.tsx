import { useState } from 'react';
import Stats from '../components/Stats';
import PixelGrid from '../components/PixelGrid';

const Index = () => {
  const [totalSold, setTotalSold] = useState(0);
  const totalPixels = 1024; // 32x32 grid

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent mb-4">
            The Million Solana Memepage
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Own a piece of crypto history! Buy pixels, add your meme, and become part of the first Solana pixel art collective.
          </p>
        </header>

        <Stats totalSold={totalSold} totalPixels={totalPixels} />
        
        <div className="mt-8 mb-12">
          <PixelGrid onPixelSold={() => setTotalSold(prev => prev + 1)} />
        </div>

        <footer className="text-center text-gray-600 mt-12">
          <p>© 2024 Million Solana Memepage. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;