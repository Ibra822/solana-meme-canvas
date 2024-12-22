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
}

const WALLET_ADDRESS = "FGvFgGeudc8phyAbzxeixifeHKPonUczM2gSzHR7Hnqy";

const PurchaseModal = ({ isOpen, onClose, pixelSize, price }: PurchaseModalProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [solscanLink, setSolscanLink] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] text-white border border-solana-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent pb-4">
            Buy Pixel Block for {price} SOL
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="image" className="text-white font-pixel flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Your Meme
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-[#2A2F3C] border-solana-purple text-white font-pixel cursor-pointer file:cursor-pointer file:border-0 file:bg-solana-purple/20 file:text-white file:font-pixel hover:file:bg-solana-purple/30 transition-colors"
            />
            <p className="text-xs text-gray-400 font-pixel">
              Recommended size: {pixelSize}x{pixelSize} pixels
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="solscan" className="text-white font-pixel flex items-center gap-2">
              <Link className="w-4 h-4" />
              Solscan Link
            </Label>
            <Input
              id="solscan"
              type="url"
              placeholder="https://solscan.io/token/..."
              value={solscanLink}
              onChange={(e) => setSolscanLink(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-white font-pixel placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hash" className="text-white font-pixel flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Transaction Hash
            </Label>
            <Input
              id="hash"
              placeholder="Enter transaction hash..."
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-white font-pixel placeholder:text-gray-500"
            />
          </div>

          <Button
            onClick={copyWalletAddress}
            className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel mt-4 group relative overflow-hidden transition-all duration-300 animate-pulse hover:animate-none"
          >
            <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Copy className="w-4 h-4 mr-2" />
            Send {price} SOL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;