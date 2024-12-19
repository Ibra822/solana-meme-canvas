import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import PurchaseModal from './PurchaseModal';
import { calculatePixelPrice } from '../utils/pixelPricing';

interface PixelGridProps {
  onPixelSold: () => void;
}

const PixelGrid = ({ onPixelSold }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const gridDimensions = {
    width: 1000,
    height: 1000
  };

  const handlePixelClick = (index: number) => {
    if (takenPixels.has(index)) {
      toast({
        title: "Pixel already taken",
        description: "This pixel has already been purchased.",
        variant: "destructive",
      });
      return;
    }

    const price = calculatePixelPrice(index, gridDimensions);
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
        {Array.from({ length: gridDimensions.width * gridDimensions.height }, (_, i) => (
          <div
            key={i}
            className={`pixel cursor-pointer ${takenPixels.has(i) ? 'taken' : ''}`}
            onClick={() => handlePixelClick(i)}
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