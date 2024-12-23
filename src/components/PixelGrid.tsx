import { useEffect, useState, useRef, useCallback } from 'react';
import PurchaseModal from './PurchaseModal';
import { toast } from './ui/use-toast';

interface PixelGridProps {
  onPixelSold: () => void;
  onBuyPixelsClick: boolean;
}

interface PixelData {
  taken: boolean;
  color?: string;
  link?: string;
}

const GRID_SIZE = 1000;
const BLOCK_SIZE = 10;
const ZOOM_SPEED = 0.1;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 10;

const PixelGrid = ({ onPixelSold, onBuyPixelsClick }: PixelGridProps) => {
  const [pixels, setPixels] = useState<PixelData[]>(Array(GRID_SIZE * GRID_SIZE).fill({ taken: false }));
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedPixelIndex, setSelectedPixelIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const handlePixelClick = (index: number) => {
    if (isSelecting) {
      handlePixelSelection(index);
    }
  };

  const handlePixelSelection = (index: number) => {
    if (!pixels[index].taken) {
      setSelectedPixelIndex(index);
      setIsModalOpen(true);
    } else {
      toast({
        title: "Pixel already taken",
        description: "Please select an available pixel.",
        variant: "destructive",
      });
    }
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * ZOOM_SPEED;
    setZoom(prevZoom => {
      const newZoom = prevZoom + delta;
      return Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('wheel', handleWheel, { passive: false });
      return () => grid.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  useEffect(() => {
    setIsSelecting(onBuyPixelsClick);
  }, [onBuyPixelsClick]);

  const renderPixels = () => {
    const pixelElements = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const isBlockStart = i % BLOCK_SIZE === 0 && Math.floor(i / GRID_SIZE) % BLOCK_SIZE === 0;
      const pixelClasses = `pixel ${pixels[i].taken ? 'taken' : ''} ${isBlockStart ? 'block-start' : ''}`;
      
      pixelElements.push(
        <div
          key={i}
          className={pixelClasses}
          onClick={() => handlePixelClick(i)}
          style={{
            backgroundColor: pixels[i].color,
            cursor: isSelecting && !pixels[i].taken ? 'pointer' : 'default',
          }}
        />
      );
    }
    return pixelElements;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        ref={gridRef}
        className="pixel-grid absolute"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1px)`,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {renderPixels()}
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pixelSize={BLOCK_SIZE}
        price={0.1}
        selectedPixelIndex={selectedPixelIndex}
        onSelectPixels={() => setIsSelecting(true)}
      />
    </div>
  );
};

export default PixelGrid;