import { useState, useCallback, RefObject } from 'react';

interface UseGridVisibilityProps {
  gridRef: RefObject<HTMLDivElement>;
  GRID_SIZE: number;
  CHUNK_SIZE: number;
}

export const useGridVisibility = ({ gridRef, GRID_SIZE, CHUNK_SIZE }: UseGridVisibilityProps) => {
  const [visibleChunks, setVisibleChunks] = useState<number[]>([]);

  const calculateVisibleChunks = useCallback(() => {
    if (!gridRef.current) return;
    const grid = gridRef.current;
    const rect = grid.getBoundingClientRect();
    const chunks: number[] = [];
    
    const startChunkX = Math.floor(grid.scrollLeft / CHUNK_SIZE);
    const startChunkY = Math.floor(grid.scrollTop / CHUNK_SIZE);
    const endChunkX = Math.ceil((grid.scrollLeft + rect.width) / CHUNK_SIZE);
    const endChunkY = Math.ceil((grid.scrollTop + rect.height) / CHUNK_SIZE);

    for (let y = startChunkY; y < endChunkY; y++) {
      for (let x = startChunkX; x < endChunkX; x++) {
        if (x < GRID_SIZE / CHUNK_SIZE && y < GRID_SIZE / CHUNK_SIZE) {
          chunks.push(y * (GRID_SIZE / CHUNK_SIZE) + x);
        }
      }
    }
    setVisibleChunks(chunks);
  }, [CHUNK_SIZE, GRID_SIZE]);

  return {
    visibleChunks,
    calculateVisibleChunks,
  };
};