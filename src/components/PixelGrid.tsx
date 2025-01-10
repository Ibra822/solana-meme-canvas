import { useRef, useEffect, useState } from 'react';
import PurchaseModal from './PurchaseModal';
import { PixelData, PixelGridProps } from './grid/types';
import { websocketService } from '../services/websocketService';
import GridRenderer from './grid/GridRenderer';
import GridControls from './grid/GridControls';
import { useGridVisibility } from './grid/useGridVisibility';

const GRID_SIZE = 1000;
const BLOCK_SIZE = 10;
const CHUNK_SIZE = 100;

const PixelGrid = ({ onPixelSold, onBuyPixelsClick }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Map<number, PixelData>>(new Map());
  const gridRef = useRef<HTMLDivElement>(null);
  const [scale] = useState(1);
  
  const { visibleChunks, calculateVisibleChunks } = useGridVisibility({
    gridRef,
    GRID_SIZE,
    CHUNK_SIZE,
  });

  const {
    isModalOpen,
    setIsModalOpen,
    selectedPixelIndex,
    currentPrice,
    isSelecting,
    setIsSelecting,
    handlePixelSelect,
  } = GridControls({
    onPixelSold,
    takenPixels,
    GRID_SIZE,
    BLOCK_SIZE,
  });

  useEffect(() => {
    let isSubscribed = true;
    websocketService.connect();

    const handlePixelUpdate = (message: any) => {
      if (!isSubscribed) return;
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
      isSubscribed = false;
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

  useEffect(() => {
    if (onBuyPixelsClick) {
      setIsSelecting(true);
    }
  }, [onBuyPixelsClick]);

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
          overflow: 'auto',
          willChange: 'transform'
        }}
      >
        <GridRenderer
          visibleChunks={visibleChunks}
          GRID_SIZE={GRID_SIZE}
          CHUNK_SIZE={CHUNK_SIZE}
          BLOCK_SIZE={BLOCK_SIZE}
          scale={scale}
          takenPixels={takenPixels}
          isSelecting={isSelecting}
          handlePixelClick={handlePixelSelect}
        />
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