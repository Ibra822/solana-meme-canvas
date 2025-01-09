import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from '../components/ui/use-toast';
import PurchaseModal from './PurchaseModal';
import { calculatePixelPrice } from '../utils/pixelPricing';
import GridChunk from './grid/GridChunk';
import { PixelData, PixelGridProps } from './grid/types';
import { websocketService } from '../services/websocketService';

const GRID_SIZE = 1000;
const BLOCK_SIZE = 10;
const CHUNK_SIZE = 100;

const PixelGrid = ({ onPixelSold, onBuyPixelsClick }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Map<number, PixelData>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale] = useState(1);
  const [visibleChunks, setVisibleChunks] = useState<number[]>([]);

  const calculateVisibleChunks = useCallback(() => {
    if (!gridRef.current) return;
    const grid = gridRef.current;
    const rect = grid.getBoundingClientRect();
    const chunks: number[] = [];
    
    const startChunkX = Math.floor(grid.scrollLeft / CHUNK_SIZE);
    const startChunkY = Math.floor(grid.scrollTop / CHUNK_SIZE);
    const endChunkX = Math.ceil((grid.scrollLeft + rect.width) / CHUNK_SIZE);
    const endChunkY = Math.ceil((grid.scrollTop + rect.height) / CHUNK_SIZE);

    for (let y = startChunkY; y < endChunkY; y++) {
      for (let x = startChunkX; x < endChunkX; x++) {
        if (x < GRID_SIZE / CHUNK_SIZE && y < GRID_SIZE / CHUNK_SIZE) {
          chunks.push(y * (GRID_SIZE / CHUNK_SIZE) + x);
        }
      }
    }
    setVisibleChunks(chunks);
  }, []);

  useEffect(() => {
    websocketService.connect();

    const handlePixelUpdate = (message: any) => {
      if (message.type === 'pixelUpdate') {
        setTakenPixels(prev => {
          const newMap = new Map(prev);
          newMap.set(message.data.index, message.data.pixelData);
          return newMap;
        });
      }
    };

    const unsubscribe = websocketService.subscribe(handlePixelUpdate);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
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
  }, [calculateVisibleChunks]);

  const handlePixelClick = useCallback((index: number) => {
    if (!isSelecting) {
      const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
      const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
      const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;
      
      const pixelData = takenPixels.get(blockStartIndex);
      if (pixelData?.link) {
        window.open(pixelData.link, '_blank');
        return;
      }
      return; // Do nothing if pixel is not purchased
    }

    const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;

    if (!isSelecting) return;

    const price = calculatePixelPrice(blockStartIndex, { width: GRID_SIZE, height: GRID_SIZE });
    setCurrentPrice(price);
    setSelectedPixelIndex(blockStartIndex);
    setIsModalOpen(true);
    setIsSelecting(false);
  }, [isSelecting, takenPixels]);

  const handlePixelHover = useCallback((index: number) => {
    const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;
    
    setHoveredPixel(blockStartIndex);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={gridRef}
        className="pixel-grid relative w-full aspect-square"
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#fff',
          border: '1px solid rgba(153, 69, 255, 0.3)',
          boxShadow: '0 0 20px rgba(153, 69, 255, 0.1)',
          overflow: 'auto'
        }}
      >
        <div 
          className="absolute"
          style={{
            width: `${GRID_SIZE}px`,
            height: `${GRID_SIZE}px`,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            willChange: 'transform'
          }}
        >
          {visibleChunks.map(chunkIndex => (
            <GridChunk
              key={chunkIndex}
              chunkIndex={chunkIndex}
              chunkStartX={(chunkIndex % (GRID_SIZE / CHUNK_SIZE)) * CHUNK_SIZE}
              chunkStartY={Math.floor(chunkIndex / (GRID_SIZE / CHUNK_SIZE)) * CHUNK_SIZE}
              GRID_SIZE={GRID_SIZE}
              CHUNK_SIZE={CHUNK_SIZE}
              BLOCK_SIZE={BLOCK_SIZE}
              takenPixels={takenPixels}
              isSelecting={isSelecting}
              handlePixelClick={handlePixelClick}
              handlePixelHover={handlePixelHover}
              hoveredPixel={hoveredPixel}
            />
          ))}
        </div>
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSelecting(false);
        }}
        pixelSize={BLOCK_SIZE}
        price={currentPrice}
        selectedPixelIndex={selectedPixelIndex}
        onSelectPixels={() => setIsSelecting(true)}
        takenPixels={takenPixels}
      />
    </div>
  );
};

export default PixelGrid;