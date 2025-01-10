import { memo } from 'react';
import { PixelData } from './types';
import GridChunk from './GridChunk';

interface GridRendererProps {
  visibleChunks: number[];
  GRID_SIZE: number;
  CHUNK_SIZE: number;
  BLOCK_SIZE: number;
  scale: number;
  takenPixels: Map<number, PixelData>;
  isSelecting: boolean;
  handlePixelClick: (index: number) => void;
}

const GridRenderer = memo(({
  visibleChunks,
  GRID_SIZE,
  CHUNK_SIZE,
  BLOCK_SIZE,
  scale,
  takenPixels,
  isSelecting,
  handlePixelClick
}: GridRendererProps) => {
  return (
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
        />
      ))}
    </div>
  );
});

GridRenderer.displayName = 'GridRenderer';

export default GridRenderer;