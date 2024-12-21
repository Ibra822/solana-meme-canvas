import { useState, useRef, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';
import PurchaseModal from './PurchaseModal';
import { calculatePixelPrice } from '../utils/pixelPricing';

interface PixelGridProps {
  onPixelSold: () => void;
}

const CHUNK_SIZE = 100; // Render 100x100 pixels at a time
const TOTAL_SIZE = 1000;
const BLOCK_SIZE = 10; // Size of purchasable blocks

const PixelGrid = ({ onPixelSold }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [visibleChunks, setVisibleChunks] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  const gridDimensions = {
    width: TOTAL_SIZE,
    height: TOTAL_SIZE
  };

  useEffect(() => {
    const calculateVisibleChunks = () => {
      if (!gridRef.current) return;

      const grid = gridRef.current;
      const rect = grid.getBoundingClientRect();
      const scrollLeft = grid.scrollLeft;
      const scrollTop = grid.scrollTop;

      const startChunkX = Math.floor(scrollLeft / (CHUNK_SIZE * rect.width / TOTAL_SIZE));
      const startChunkY = Math.floor(scrollTop / (CHUNK_SIZE * rect.height / TOTAL_SIZE));
      const endChunkX = Math.min(Math.ceil((scrollLeft + rect.width) / (CHUNK_SIZE * rect.width / TOTAL_SIZE)), TOTAL_SIZE / CHUNK_SIZE);
      const endChunkY = Math.min(Math.ceil((scrollTop + rect.height) / (CHUNK_SIZE * rect.height / TOTAL_SIZE)), TOTAL_SIZE / CHUNK_SIZE);

      const chunks: number[] = [];
      for (let y = startChunkY; y < endChunkY; y++) {
        for (let x = startChunkX; x < endChunkX; x++) {
          chunks.push(y * (TOTAL_SIZE / CHUNK_SIZE) + x);
        }
      }
      setVisibleChunks(chunks);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateVisibleChunks);
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll);
      calculateVisibleChunks();
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const isBlockAvailable = (startIndex: number): boolean => {
    const startX = startIndex % TOTAL_SIZE;
    const startY = Math.floor(startIndex / TOTAL_SIZE);

    for (let y = 0; y < BLOCK_SIZE; y++) {
      for (let x = 0; x < BLOCK_SIZE; x++) {
        const pixelIndex = (startY + y) * TOTAL_SIZE + (startX + x);
        if (takenPixels.has(pixelIndex)) {
          return false;
        }
      }
    }
    return true;
  };

  const handlePixelClick = (index: number) => {
    // Align to 10x10 grid
    const blockStartX = Math.floor((index % TOTAL_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartY = Math.floor(Math.floor(index / TOTAL_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartIndex = blockStartY * TOTAL_SIZE + blockStartX;

    if (!isBlockAvailable(blockStartIndex)) {
      toast({
        title: "Block already taken",
        description: "This 10x10 pixel block has already been purchased.",
        variant: "destructive",
      });
      return;
    }

    const price = calculatePixelPrice(blockStartIndex, gridDimensions) * (BLOCK_SIZE * BLOCK_SIZE);
    setCurrentPrice(price);
    setSelectedPixelIndex(blockStartIndex);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPixelIndex(null);
  };

  const renderChunk = (chunkIndex: number) => {
    const chunkStartX = (chunkIndex % (TOTAL_SIZE / CHUNK_SIZE)) * CHUNK_SIZE;
    const chunkStartY = Math.floor(chunkIndex / (TOTAL_SIZE / CHUNK_SIZE)) * CHUNK_SIZE;
    const pixels = [];

    for (let y = 0; y < CHUNK_SIZE; y++) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        const pixelIndex = (chunkStartY + y) * TOTAL_SIZE + (chunkStartX + x);
        const blockStartX = Math.floor((pixelIndex % TOTAL_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
        const blockStartY = Math.floor(Math.floor(pixelIndex / TOTAL_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
        const blockStartIndex = blockStartY * TOTAL_SIZE + blockStartX;
        
        pixels.push(
          <div
            key={pixelIndex}
            className={`pixel cursor-pointer ${takenPixels.has(blockStartIndex) ? 'taken' : ''} ${
              (pixelIndex % TOTAL_SIZE) % BLOCK_SIZE === 0 || Math.floor(pixelIndex / TOTAL_SIZE) % BLOCK_SIZE === 0 
                ? 'block-border' 
                : ''
            }`}
            onClick={() => handlePixelClick(pixelIndex)}
          />
        );
      }
    }

    return (
      <div
        key={chunkIndex}
        className="chunk"
        style={{
          position: 'absolute',
          left: `${(chunkStartX / TOTAL_SIZE) * 100}%`,
          top: `${(chunkStartY / TOTAL_SIZE) * 100}%`,
          width: `${(CHUNK_SIZE / TOTAL_SIZE) * 100}%`,
          height: `${(CHUNK_SIZE / TOTAL_SIZE) * 100}%`,
          display: 'grid',
          gridTemplateColumns: `repeat(${CHUNK_SIZE}, 1fr)`,
          gap: '1px'
        }}
      >
        {pixels}
      </div>
    );
  };

  return (
    <>
      <div 
        ref={gridRef}
        className="pixel-grid"
        style={{ position: 'relative' }}
      >
        {visibleChunks.map(chunkIndex => renderChunk(chunkIndex))}
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        pixelSize={BLOCK_SIZE * 32} // 32px per block for preview
        price={currentPrice}
      />
    </>
  );
};

export default PixelGrid;