export interface PixelData {
  imageUrl?: string;
  link?: string;
  owner?: string;
  memecoinName?: string;
}

export interface PixelGridProps {
  onPixelSold: () => void;
  onBuyPixelsClick: () => void;
}