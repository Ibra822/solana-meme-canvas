import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Copy, Upload, Link, Hash } from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixelSize: number;
  price: number;
  selectedPixelIndex: number | null;
  onSelectPixels: () => void;
}

const WALLET_ADDRESS = "FGvFgGeudc8phyAbzxeixifeHKPonUczM2gSzHR7Hnqy";

const PurchaseModal = ({ isOpen, onClose, onSelectPixels }: PurchaseModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [solscanLink, setSolscanLink] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const copyWalletAddress = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      toast({
        title: "Success!",
        description: "Wallet address copied to clipboard",
        className: "bg-gradient-to-r from-solana-purple to-solana-blue text-white font-pixel",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy address. Please try manually.",
        variant: "destructive",
      });
    }
  };

  const handleChoosePixels = () => {
    if (!image || !solscanLink || !transactionHash) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields before selecting pixels",
        variant: "destructive",
      });
      return;
    }
    onSelectPixels();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] text-white border border-solana-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xs font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent pb-4">
            Buy Pixel Block
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-3 py-3">
          <div className="space-y-1.5">
            <Label htmlFor="image" className="text-white font-pixel text-[8px] flex items-center gap-2">
              <Upload className="w-3 h-3" />
              Upload Your Meme (10x10 pixels)
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage(e.target.files[0])}
              className="bg-[#2A2F3C] border-solana-purple text-[8px] font-pixel cursor-pointer file:cursor-pointer file:border-0 file:bg-solana-purple/20 file:text-white file:font-pixel hover:file:bg-solana-purple/30 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="solscan" className="text-white font-pixel text-[8px] flex items-center gap-2">
              <Link className="w-3 h-3" />
              Solscan Link
            </Label>
            <Input
              id="solscan"
              type="url"
              placeholder="https://solscan.io/token/..."
              value={solscanLink}
              onChange={(e) => setSolscanLink(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-[8px] font-pixel placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hash" className="text-white font-pixel text-[8px] flex items-center gap-2">
              <Hash className="w-3 h-3" />
              Transaction Hash
            </Label>
            <Input
              id="hash"
              placeholder="Enter transaction hash..."
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-[8px] font-pixel placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={copyWalletAddress}
              className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] group relative overflow-hidden transition-all duration-300"
            >
              <Copy className="w-3 h-3 mr-2" />
              Send SOL
            </Button>

            <Button
              onClick={handleChoosePixels}
              className="bg-[#2A2F3C] hover:bg-[#363d4f] text-white font-pixel text-[8px] transition-colors"
            >
              Choose Pixels
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;