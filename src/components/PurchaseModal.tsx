import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixelSize: number;
}

const WALLET_ADDRESS = "FGvFgGeudc8phyAbzxeixifeHKPonUczM2gSzHR7Hnqy";

const PurchaseModal = ({ isOpen, onClose, pixelSize }: PurchaseModalProps) => {
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
        title: "Wallet address copied!",
        description: "The SOL wallet address has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the address manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pixel text-center text-solana-purple">Buy Pixels</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image" className="text-white">Upload Your Meme</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-[#2A2F3C] border-solana-purple text-white"
            />
            <p className="text-xs text-gray-400">
              Recommended size: {pixelSize}x{pixelSize} pixels
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="solscan" className="text-white">Solscan Link</Label>
            <Input
              id="solscan"
              type="url"
              placeholder="https://solscan.io/token/..."
              value={solscanLink}
              onChange={(e) => setSolscanLink(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-white"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hash" className="text-white">Transaction Hash</Label>
            <Input
              id="hash"
              placeholder="Enter transaction hash..."
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              className="bg-[#2A2F3C] border-solana-purple text-white"
            />
          </div>

          <Button
            onClick={copyWalletAddress}
            className="bg-solana-purple hover:bg-opacity-80 text-white font-pixel mt-4 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-solana-purple to-solana-blue opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
            <Copy className="w-4 h-4 mr-2" />
            Send SOL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;