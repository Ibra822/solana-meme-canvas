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
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] text-white border border-solana-purple/20 p-8">
          <DialogHeader className="mb-6 relative">
            <DialogTitle className="text-lg font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent pb-4 after:content-[''] after:block after:w-full after:h-[1px] after:bg-solana-purple/20 after:mt-4">
              Buy Pixel Block
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="space-y-3">
              <Label htmlFor="image" className="text-white font-pixel text-[14px] flex items-center gap-2 font-bold">
                <Upload className="w-4 h-4" />
                Upload Your Meme
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files && setImage(e.target.files[0])}
                className="bg-[#2A2F3C] border-solana-purple text-[14px] font-pixel cursor-pointer file:cursor-pointer file:border-0 file:bg-solana-purple/20 file:text-white file:font-pixel hover:file:bg-solana-purple/30 transition-colors h-12 min-h-12 placeholder:text-gray-400"
                placeholder="Upload your 10x10 image file"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="solscan" className="text-white font-pixel text-[14px] flex items-center gap-2 font-bold">
                <Link className="w-4 h-4" />
                Solscan Link
              </Label>
              <Input
                id="solscan"
                type="url"
                placeholder="Enter your Solscan transaction link"
                value={solscanLink}
                onChange={(e) => setSolscanLink(e.target.value)}
                className="bg-[#2A2F3C] border-solana-purple text-[14px] font-pixel placeholder:text-gray-400 h-12 min-h-12"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="hash" className="text-white font-pixel text-[14px] flex items-center gap-2 font-bold">
                <Hash className="w-4 h-4" />
                Transaction Hash
              </Label>
              <Input
                id="hash"
                placeholder="Enter your transaction hash"
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                className="bg-[#2A2F3C] border-solana-purple text-[14px] font-pixel placeholder:text-gray-400 h-12 min-h-12"
              />
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleChoosePixels}
                  className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[14px] h-12 transition-all duration-300 hover:brightness-110"
                >
                  Choose Pixels
                </Button>

                <Button
                  onClick={copyWalletAddress}
                  className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[14px] h-12 transition-all duration-300 hover:brightness-110"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Send SOL
                </Button>
              </div>
              
              <p className="text-center text-[12px] font-pixel text-gray-400 mt-4">
                Need help? Contact us via{" "}
                <a href="#" className="text-solana-purple hover:text-solana-blue transition-colors">
                  Discord
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPixelSelector} onOpenChange={setShowPixelSelector}>
        <DialogContent className="sm:max-w-[800px] bg-gradient-to-b from-[#1A1F2C] to-[#2D243F] text-white border border-solana-purple/20 p-8">
          <DialogHeader>
            <DialogTitle className="text-lg font-pixel text-center bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent pb-4 after:content-[''] after:block after:w-full after:h-[1px] after:bg-solana-purple/20 after:mt-4">
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