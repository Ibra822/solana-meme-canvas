import { useState } from 'react';
import { toast } from '../../components/ui/use-toast';
import PurchaseModal from '../PurchaseModal';
import { calculatePixelPrice } from '../../utils/pixelPricing';
import { PixelData } from './types';

interface GridControlsProps {
  onPixelSold: () => void;
  takenPixels: Map<number, PixelData>;
  GRID_SIZE: number;
  BLOCK_SIZE: number;
}

const GridControls = ({ onPixelSold, takenPixels, GRID_SIZE, BLOCK_SIZE }: GridControlsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isSelecting, setIsSelecting] = useState(false);

  const handlePixelSelect = (index: number) => {
    const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;

    const pixelData = takenPixels.get(blockStartIndex);
    if (pixelData?.link) {
      window.open(pixelData.link, '_blank');
      return;
    }

    const price = calculatePixelPrice(blockStartIndex, { width: GRID_SIZE, height: GRID_SIZE });
    setCurrentPrice(price);
    setSelectedPixelIndex(blockStartIndex);
    setIsModalOpen(true);
    setIsSelecting(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    selectedPixelIndex,
    currentPrice,
    isSelecting,
    setIsSelecting,
    handlePixelSelect,
  };
};

export default GridControls;