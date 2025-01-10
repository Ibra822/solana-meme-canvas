export interface PixelData {
  imageUrl?: string;
  link?: string;
  owner?: string;
  x?: number;
  y?: number;
  memecoinName?: string;
}

export interface PixelGridProps {
  onPixelSold: () => void;
  onBuyPixelsClick: () => void;
}