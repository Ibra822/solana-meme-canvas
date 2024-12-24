import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Copy, Link, Hash } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import BlockSelector from './purchase/BlockSelector';
import ImageUploadStep from './purchase/ImageUploadStep';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixelSize: number;
  price: number;
  selectedPixelIndex: number | null;
  onSelectPixels: () => void;
}

const WALLET_ADDRESS = "FGvFgGeudc8phyAbzxeixifeHKPonUczM2gSzHR7Hnqy";
const BLOCK_PRICE = 0.1;

const PurchaseModal = ({ isOpen, onClose, onSelectPixels }: PurchaseModalProps) => {
  const [currentStep, setCurrentStep] = useState<'initial' | 'select' | 'upload' | 'link'>("initial");
  const [image, setImage] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [showPixelSelector, setShowPixelSelector] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const { connected } = useWallet();

  const totalCost = selectedBlocks.length * BLOCK_PRICE * 100;

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

  const clearSelection = () => {
    setSelectedBlocks([]);
    toast({
      title: "Selection Cleared",
      description: "All blocks have been deselected",
      className: "bg-gradient-to-r from-solana-purple to-solana-blue text-white font-pixel",
    });
  };

  const handleBlockSelect = (blockIndex: number) => {
    if (selectedBlocks.includes(blockIndex)) {
      setSelectedBlocks(blocks => blocks.filter(b => b !== blockIndex));
    } else {
      setSelectedBlocks(blocks => [...blocks, blockIndex]);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] bg-[#1A1F2C] text-white border border-solana-purple/20 p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[14px] font-pixel text-center bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
              Buy Pixel Block
            </DialogTitle>
          </DialogHeader>

          {currentStep === 'initial' && (
            <div className="grid gap-6">
              <div className="flex flex-col gap-3 pt-2">
                <div className="grid grid-cols-1 gap-3">
                  {!connected ? (
                    <WalletMultiButton className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8 w-full" />
                  ) : (
                    <>
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
                    </>
                  )}
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
          )}

          {currentStep === 'upload' && (
            <ImageUploadStep
              onImageSelect={setImage}
              onNext={() => setCurrentStep('link')}
              selectedBlocksCount={selectedBlocks.length}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPixelSelector} onOpenChange={setShowPixelSelector}>
        <DialogContent className="sm:max-w-[800px] bg-[#1A1F2C] text-white border border-solana-purple/20 p-6">
          <DialogHeader>
            <DialogTitle className="text-[12px] font-pixel text-center bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
              Select Pixel Blocks
            </DialogTitle>
          </DialogHeader>
          
          <BlockSelector
            selectedBlocks={selectedBlocks}
            onBlockSelect={handleBlockSelect}
            onClearSelection={clearSelection}
            totalCost={totalCost}
            onNext={() => {
              if (selectedBlocks.length === 0) {
                toast({
                  title: "No blocks selected",
                  description: "Please select at least one block to continue",
                  variant: "destructive",
                });
                return;
              }
              setShowPixelSelector(false);
              setCurrentStep('upload');
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PurchaseModal;