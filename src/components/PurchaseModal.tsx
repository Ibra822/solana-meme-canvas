import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import BlockSelector from './purchase/BlockSelector';
import ImageUploadStep from './purchase/ImageUploadStep';
import LinkInputStep from './purchase/LinkInputStep';
import PaymentStep from './purchase/PaymentStep';

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
  const [currentStep, setCurrentStep] = useState<'initial' | 'select' | 'upload' | 'link' | 'payment'>("initial");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [showPixelSelector, setShowPixelSelector] = useState(false);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);

  const totalCost = selectedBlocks.length * BLOCK_PRICE;

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

  const handleImageUpload = (file: File) => {
    setImage(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setCurrentStep('link');
  };

  const handleLinkSubmit = (submittedLink: string) => {
    setLink(submittedLink);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = (txHash: string) => {
    toast({
      title: "Purchase Complete!",
      description: "Your pixels have been successfully purchased",
      className: "bg-gradient-to-r from-solana-purple to-solana-blue text-white font-pixel",
    });
    onClose();
    setCurrentStep('initial');
    setSelectedBlocks([]);
    setImage(null);
    setImagePreviewUrl(null);
    setLink("");
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
                <Button
                  onClick={handleChoosePixels}
                  className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8"
                >
                  Choose Pixels
                </Button>
                
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
              onImageSelect={handleImageUpload}
              onNext={() => setCurrentStep('link')}
              selectedBlocksCount={selectedBlocks.length}
            />
          )}

          {currentStep === 'link' && (
            <LinkInputStep
              onLinkSubmit={handleLinkSubmit}
              onNext={() => setCurrentStep('payment')}
              imagePreviewUrl={imagePreviewUrl}
            />
          )}

          {currentStep === 'payment' && (
            <PaymentStep
              selectedBlocks={selectedBlocks}
              imagePreviewUrl={imagePreviewUrl}
              link={link}
              totalCost={totalCost}
              onSuccess={handlePaymentSuccess}
              recipientAddress={WALLET_ADDRESS}
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