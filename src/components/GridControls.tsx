import React from 'react';

interface GridControlsProps {
  onStartSelection: () => void;
  isSelecting: boolean;
}

const GridControls = ({ onStartSelection, isSelecting }: GridControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        onClick={onStartSelection}
        className={`px-4 py-2 font-pixel text-sm rounded-lg transition-all ${
          isSelecting
            ? 'bg-solana-purple text-white animate-pulse'
            : 'bg-gradient-to-r from-solana-purple to-solana-blue text-white hover:opacity-90'
        }`}
      >
        {isSelecting ? 'Select a 10x10 Block' : 'Buy Pixels'}
      </button>
    </div>
  );
};

export default GridControls;