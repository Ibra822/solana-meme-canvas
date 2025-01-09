export interface PixelData {
  imageUrl?: string;
  link?: string;
  memecoinName?: string;
}

export interface PixelGridProps {
  onPixelSold: () => void;
  onBuyPixelsClick: () => void;
}