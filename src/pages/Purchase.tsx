import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import SelectionGrid from '../components/grid/SelectionGrid';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Import and configure Buffer globally
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const Purchase = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState('');
  const [selectedPixels, setSelectedPixels] = useState<number[]>([]);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { connected } = useWallet();

  // Initialize an empty Map for takenPixels
  const takenPixels = new Map();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePixelSelection = (pixels: number[]) => {
    setSelectedPixels(pixels);
    setIsGridOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !link || selectedPixels.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields and select pixels",
        variant: "destructive",
      });
      return;
    }

    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to continue",
        variant: "destructive",
      });
      return;
    }

    // Payment logic would go here
    toast({
      title: "Success!",
      description: "Your pixels have been purchased successfully",
    });
    navigate('/');
  };

  const totalCost = selectedPixels.length * 0.1; // 0.1 SOL per pixel

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] p-4">
      <div className="max-w-md mx-auto bg-[#1A1F2C]/50 rounded-lg p-6 border border-solana-purple/20">
        <h1 className="text-2xl font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent mb-6">
          Purchase Pixels
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label className="text-white/90 font-pixel text-[10px]">Upload Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 max-w-full h-auto rounded" />
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-white/90 font-pixel text-[10px]">Website Link</Label>
            <Input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://"
              className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel"
            />
          </div>

          <Button
            type="button"
            onClick={() => setIsGridOpen(true)}
            className="w-full bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[10px]"
          >
            Select Pixels
          </Button>

          {selectedPixels.length > 0 && (
            <div className="text-white/90 font-pixel text-[10px] text-center">
              Selected Pixels: {selectedPixels.length}
              <br />
              Total: {totalCost} SOL
            </div>
          )}

          <div className="flex justify-center">
            <WalletMultiButton className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8" />
          </div>

          {connected && selectedPixels.length > 0 && (
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[10px]"
            >
              Complete Purchase
            </Button>
          )}
        </form>
      </div>

      <Dialog open={isGridOpen} onOpenChange={setIsGridOpen}>
        <DialogContent className="bg-[#1A1F2C] border border-solana-purple/20">
          <SelectionGrid
            takenPixels={takenPixels}
            onSelectionConfirm={handlePixelSelection}
            onClose={() => setIsGridOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Purchase;