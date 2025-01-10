import { useState, useRef, useEffect, useMemo } from 'react';
import { toast } from '../components/ui/use-toast';
import PurchaseModal from './PurchaseModal';
import { calculatePixelPrice } from '../utils/pixelPricing';
import GridChunk from './grid/GridChunk';
import { PixelData, PixelGridProps } from './grid/types';
import { websocketService } from '../services/websocketService';

const GRID_SIZE = 1000;
const BLOCK_SIZE = 10;
const CHUNK_SIZE = 100;
const VIEWPORT_PADDING = 1; // Number of chunks to render outside viewport

const PixelGrid = ({ onPixelSold, onBuyPixelsClick }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Map<number, PixelData>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [visibleChunks, setVisibleChunks] = useState<number[]>([]);
  const [hoveredPixel, setHoveredPixel] = useState<PixelData | null>(null);

  // Memoize websocket connection and subscription
  useEffect(() => {
    const ws = websocketService.connect();
    const unsubscribe = websocketService.subscribe(message => {
      if (message.type === 'pixelUpdate') {
        setTakenPixels(prev => {
          const newMap = new Map(prev);
          newMap.set(message.data.index, message.data.pixelData);
          return newMap;
        });
      }
    });

    return () => {
      unsubscribe();
      ws.close();
    };
  }, []);

  // Optimize visible chunks calculation with debounce
  useEffect(() => {
    let timeoutId: number;
    
    const calculateVisibleChunks = () => {
      if (!gridRef.current) return;
      
      const grid = gridRef.current;
      const rect = grid.getBoundingClientRect();
      const chunks = new Set<number>();
      
      const startChunkX = Math.max(0, Math.floor(grid.scrollLeft / (CHUNK_SIZE * scale)) - VIEWPORT_PADDING);
      const startChunkY = Math.max(0, Math.floor(grid.scrollTop / (CHUNK_SIZE * scale)) - VIEWPORT_PADDING);
      const endChunkX = Math.min(
        GRID_SIZE / CHUNK_SIZE,
        Math.ceil((grid.scrollLeft + rect.width) / (CHUNK_SIZE * scale)) + VIEWPORT_PADDING
      );
      const endChunkY = Math.min(
        GRID_SIZE / CHUNK_SIZE,
        Math.ceil((grid.scrollTop + rect.height) / (CHUNK_SIZE * scale)) + VIEWPORT_PADDING
      );

      for (let y = startChunkY; y < endChunkY; y++) {
        for (let x = startChunkX; x < endChunkX; x++) {
          chunks.add(y * (GRID_SIZE / CHUNK_SIZE) + x);
        }
      }
      
      setVisibleChunks(Array.from(chunks));
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(timeoutId);
      timeoutId = window.requestAnimationFrame(calculateVisibleChunks);
    };

    const gridElement = gridRef.current;
    if (gridElement) {
      gridElement.addEventListener('scroll', handleScroll, { passive: true });
      calculateVisibleChunks();
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener('scroll', handleScroll);
      }
      window.cancelAnimationFrame(timeoutId);
    };
  }, [scale]);

  const handlePixelClick = (index: number) => {
    if (!isSelecting) {
      const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
      const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
      const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;
      
      const pixelData = takenPixels.get(blockStartIndex);
      if (pixelData?.link) {
        window.open(pixelData.link, '_blank');
      }
    }
  };

  const handlePixelHover = (index: number) => {
    const blockStartX = Math.floor((index % GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartY = Math.floor(Math.floor(index / GRID_SIZE) / BLOCK_SIZE) * BLOCK_SIZE;
    const blockStartIndex = blockStartY * GRID_SIZE + blockStartX;
    
    const pixelData = takenPixels.get(blockStartIndex);
    setHoveredPixel(pixelData || null);
  };

  // Memoize grid chunks to prevent unnecessary rerenders
  const gridChunks = useMemo(() => {
    return visibleChunks.map(chunkIndex => {
      const chunkStartX = (chunkIndex % (GRID_SIZE / CHUNK_SIZE)) * CHUNK_SIZE;
      const chunkStartY = Math.floor(chunkIndex / (GRID_SIZE / CHUNK_SIZE)) * CHUNK_SIZE;
      
      return (
        <GridChunk
          key={chunkIndex}
          chunkIndex={chunkIndex}
          chunkStartX={chunkStartX}
          chunkStartY={chunkStartY}
          GRID_SIZE={GRID_SIZE}
          CHUNK_SIZE={CHUNK_SIZE}
          BLOCK_SIZE={BLOCK_SIZE}
          takenPixels={takenPixels}
          isSelecting={isSelecting}
          handlePixelClick={handlePixelClick}
          handlePixelHover={handlePixelHover}
        />
      );
    });
  }, [visibleChunks, takenPixels, isSelecting]);

  return (
    <div className="w-full h-full flex flex-col relative">
      <div 
        ref={gridRef}
        className="pixel-grid relative w-full aspect-square overflow-auto"
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#fff',
          border: '1px solid rgba(153, 69, 255, 0.3)',
          boxShadow: '0 0 20px rgba(153, 69, 255, 0.1)'
        }}
      >
        <div 
          className="absolute"
          style={{
            width: `${GRID_SIZE}px`,
            height: `${GRID_SIZE}px`,
            transform: `scale(${scale})`,
            transformOrigin: '0 0'
          }}
        >
          {gridChunks}
        </div>
      </div>

      {hoveredPixel && (
        <div 
          className="absolute bg-black/80 text-white p-2 rounded text-sm pointer-events-none"
          style={{
            left: `${hoveredPixel.x}px`,
            top: `${hoveredPixel.y - 30}px`
          }}
        >
          {hoveredPixel.memecoinName}
        </div>
      )}

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