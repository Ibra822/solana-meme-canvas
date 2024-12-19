import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import PurchaseModal from './PurchaseModal';

interface PixelGridProps {
  onPixelSold: () => void;
}

const GRID_SIZE = 1000;
const CENTER_START = Math.floor(GRID_SIZE * 0.3);
const CENTER_END = Math.floor(GRID_SIZE * 0.7);

const getPixelPrice = (index: number): number => {
  const row = Math.floor(index / GRID_SIZE);
  const col = index % GRID_SIZE;

  // Central area (1 SOL)
  if (row >= CENTER_START && row <= CENTER_END && 
      col >= CENTER_START && col <= CENTER_END) {
    return 1;
  }
  // Top area (0.7 SOL)
  if (row < CENTER_START) {
    return 0.7;
  }
  // Bottom area (0.1 SOL)
  if (row > CENTER_END) {
    return 0.1;
  }
  // Right side (0.5 SOL)
  if (col > CENTER_END) {
    return 0.5;
  }
  // Left side (0.3 SOL)
  if (col < CENTER_START) {
    return 0.3;
  }
  return 1; // Default to central price
};

const PixelGrid = ({ onPixelSold }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(1);

  const handlePixelClick = (index: number) => {
    if (takenPixels.has(index)) {
      toast({
        title: "Pixel already taken",
        description: "This pixel has already been purchased.",
        variant: "destructive",
      });
      return;
    }

    const price = getPixelPrice(index);
    setCurrentPrice(price);
    setSelectedPixelIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPixelIndex(null);
  };

  return (
    <>
      <div className="pixel-grid">
        {Array.from({ length: 1000000 }, (_, i) => (
          <div
            key={i}
            className={`pixel cursor-pointer ${takenPixels.has(i) ? 'taken' : ''}`}
            onClick={() => handlePixelClick(i)}
            style={{ 
              backgroundColor: takenPixels.has(i) ? '#14F195' : 
                getPixelPrice(i) === 1 ? '#9945FF80' :
                getPixelPrice(i) === 0.7 ? '#7B3CD680' :
                getPixelPrice(i) === 0.5 ? '#5D33AD80' :
                getPixelPrice(i) === 0.3 ? '#3F2A8480' : '#211B5B80'
            }}
          />
        ))}
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        pixelSize={32}
        price={currentPrice}
      />
    </>
  );
};

export default PixelGrid;