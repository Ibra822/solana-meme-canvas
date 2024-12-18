import { useState } from 'react';
import { toast } from '../components/ui/use-toast';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface PixelGridProps {
  onPixelSold: () => void;
}

const PixelGrid = ({ onPixelSold }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Set<number>>(new Set());
  const GRID_SIZE = 1000; // 1000x1000 = 1 million pixels

  const handlePixelClick = (index: number) => {
    if (takenPixels.has(index)) {
      toast({
        title: "Pixel already taken",
        description: "This pixel has already been purchased.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Coming Soon!",
      description: "Pixel purchasing will be available soon!",
    });
    
    setTakenPixels(prev => new Set([...prev, index]));
    onPixelSold();
  };

  return (
    <TransformWrapper
      initialScale={1}
      minScale={0.1}
      maxScale={10}
      wheel={{ disabled: false }}
      pinch={{ disabled: false }}
    >
      <TransformComponent>
        <div 
          className="pixel-grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: '100vw',
            maxWidth: '90vw',
            height: '80vh',
            overflow: 'hidden'
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => (
            <div
              key={i}
              className={`pixel cursor-pointer ${takenPixels.has(i) ? 'taken' : ''}`}
              onClick={() => handlePixelClick(i)}
            />
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default PixelGrid;