import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import SelectionGrid from "@/components/grid/SelectionGrid";
import { PixelData } from "@/components/grid/types";

const Purchase = () => {
  const navigate = useNavigate();
  const [selectedPixels, setSelectedPixels] = useState<number[]>([]);
  const [takenPixels] = useState<Map<number, PixelData>>(new Map());

  const handleSelectionConfirm = (pixels: number[]) => {
    setSelectedPixels(pixels);
    toast({
      title: "Pixels Selected",
      description: `You've selected ${pixels.length} pixels`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:text-solana-purple"
          >
            ← Back to Grid
          </Button>
          <h1 className="text-2xl font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            Select Your Pixels
          </h1>
          <div className="w-[100px]"></div>
        </div>

        <div className="bg-[#1A1F2C] rounded-lg border border-solana-purple/20 p-6">
          <SelectionGrid
            takenPixels={takenPixels}
            onSelectionConfirm={handleSelectionConfirm}
            onClose={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default Purchase;