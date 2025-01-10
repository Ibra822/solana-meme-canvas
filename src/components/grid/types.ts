export interface PixelData {
  imageUrl?: string;
  link?: string;
  memecoinName?: string;
  owner?: string;
}

export interface PixelGridProps {
  onPixelSold: () => void;
  onBuyPixelsClick: () => void;
}

export interface GridChunkProps {
  chunkIndex: number;
  chunkStartX: number;
  chunkStartY: number;
  GRID_SIZE: number;
  CHUNK_SIZE: number;
  BLOCK_SIZE: number;
  takenPixels: Map<number, PixelData>;
  isSelecting: boolean;
  handlePixelClick: (index: number) => void;
  handlePixelHover: (index: number) => void;
}