import { useState } from 'react';
import { toast } from '../components/ui/use-toast';

interface PixelGridProps {
  onPixelSold: () => void;
}

const PixelGrid = ({ onPixelSold }: PixelGridProps) => {
  const [takenPixels, setTakenPixels] = useState<Set<number>>(new Set());

  const handlePixelClick = (index: number) => {
    if (takenPixels.has(index)) {
      toast({
        title: "Pixel already taken",
        description: "This pixel has already been purchased.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would open a purchase modal
    toast({
      title: "Coming Soon!",
      description: "Pixel purchasing will be available soon!",
    });
    
    // Simulate purchase for demo
    setTakenPixels(prev => new Set([...prev, index]));
    onPixelSold();
  };

  return (
    <div className="pixel-grid">
      {Array.from({ length: 1024 }, (_, i) => (
        <div
          key={i}
          className={`pixel cursor-pointer ${takenPixels.has(i) ? 'taken' : ''}`}
          onClick={() => handlePixelClick(i)}
        />
      ))}
    </div>
  );
};

export default PixelGrid;