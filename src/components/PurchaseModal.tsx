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
  const [showPixelSelector, setShowPixelSelector] = useState(false);

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
    setShowPixelSelector(true);
    onSelectPixels();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] bg-[#1A1F2C] text-white border border-solana-purple/20 p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[12px] font-pixel text-center bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
              Buy Pixel Block
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="image" className="text-white/90 font-pixel text-[8px] flex items-center gap-2">
                <Upload className="w-3 h-3" />
                Upload Your Meme
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel cursor-pointer file:cursor-pointer file:border-0 file:bg-solana-purple/20 file:text-white/90 file:font-pixel hover:file:bg-solana-purple/30 transition-colors h-8 placeholder:text-[8px] placeholder:font-pixel"
                placeholder="Select file..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solscan" className="text-white/90 font-pixel text-[8px] flex items-center gap-2">
                <Link className="w-3 h-3" />
                Your Link
              </Label>
              <Input
                id="solscan"
                type="url"
                placeholder="Enter your link"
                value={solscanLink}
                onChange={(e) => setSolscanLink(e.target.value)}
                className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel h-8 placeholder:text-[8px] placeholder:font-pixel"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hash" className="text-white/90 font-pixel text-[8px] flex items-center gap-2">
                <Hash className="w-3 h-3" />
                Transaction Hash
              </Label>
              <Input
                id="hash"
                placeholder="Enter transaction hash"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel h-8 placeholder:text-[8px] placeholder:font-pixel"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleChoosePixels}
                  className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8"
                >
                  Choose Pixels
                </Button>

                <Button
                  onClick={copyWalletAddress}
                  className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Send SOL
                </Button>
              </div>
              
              <p className="text-center text-[8px] font-pixel text-white/70 mt-2">
                Need help? Contact us via{" "}
                <a 
                  href="https://t.me/secelev" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-solana-purple hover:text-solana-blue transition-colors"
                >
                  Telegram
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPixelSelector} onOpenChange={setShowPixelSelector}>
        <DialogContent className="sm:max-w-[800px] bg-[#1A1F2C] text-white border border-solana-purple/20 p-6">
          <DialogHeader>
            <DialogTitle className="text-[12px] font-pixel text-center bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
              Select Pixel Blocks
            </DialogTitle>
          </DialogHeader>
          <div className="h-[500px] overflow-auto">
            {/* The pixel grid will be rendered here by the parent component */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchaseModal;