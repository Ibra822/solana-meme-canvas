import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectionGrid from './grid/SelectionGrid';
import ImageUploadStep from './purchase/ImageUploadStep';
import LinkInputStep from './purchase/LinkInputStep';
import PaymentStep from './purchase/PaymentStep';
import { PixelData } from './grid/types';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixelSize: number;
  price: number;
  selectedPixelIndex: number | null;
  onSelectPixels: () => void;
  takenPixels: Map<number, PixelData>;
}

const WALLET_ADDRESS = "FGvFgGeudc8phyAbzxeixifeHKPonUczM2gSzHR7Hnqy";
const BLOCK_PRICE = 0.1;

const PurchaseModal = ({ 
  isOpen, 
  onClose, 
  takenPixels 
}: PurchaseModalProps) => {
  const [currentStep, setCurrentStep] = useState<'initial' | 'select' | 'upload' | 'link' | 'payment'>("initial");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [link, setLink] = useState("");
  const [memecoinName, setMemecoinName] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);

  const totalCost = selectedBlocks.length * BLOCK_PRICE;

  const handleSelectionConfirm = (blocks: number[]) => {
    setSelectedBlocks(blocks);
    setCurrentStep('upload');
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
    setMemecoinName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-[#1A1F2C] text-white border border-solana-purple/20 p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-[14px] font-pixel text-center bg-gradient-to-r from-solana-purple to-solana-blue bg-clip-text text-transparent">
            {currentStep === 'initial' ? 'Buy Pixel Block' : 
             currentStep === 'select' ? 'Select Blocks' :
             currentStep === 'upload' ? 'Upload Image' :
             currentStep === 'link' ? 'Add Details' : 'Complete Payment'}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'initial' && (
          <div className="grid gap-6">
            <div className="flex flex-col gap-3 pt-2">
              <Button
                onClick={() => setCurrentStep('select')}
                className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8"
              >
                Choose Blocks
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

        {currentStep === 'select' && (
          <SelectionGrid
            takenPixels={takenPixels}
            onSelectionConfirm={handleSelectionConfirm}
            onClose={() => setCurrentStep('initial')}
          />
        )}

        {currentStep === 'upload' && (
          <ImageUploadStep
            onImageSelect={handleImageUpload}
            onNext={() => setCurrentStep('link')}
            selectedBlocksCount={selectedBlocks.length}
          />
        )}

        {currentStep === 'link' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/90 font-pixel text-[10px]">Memecoin Name</Label>
              <Input
                value={memecoinName}
                onChange={(e) => setMemecoinName(e.target.value)}
                placeholder="Enter your memecoin name"
                className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/90 font-pixel text-[10px]">Website Link</Label>
              <Input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://"
                className="bg-[#2D243F]/50 border-solana-purple/20 text-[8px] font-pixel h-10"
              />
            </div>
            <Button
              onClick={() => {
                if (!memecoinName.trim()) {
                  toast({
                    title: "Missing Information",
                    description: "Please enter your memecoin name",
                    variant: "destructive",
                  });
                  return;
                }
                handleLinkSubmit(link);
              }}
              className="w-full bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-10"
            >
              Next
            </Button>
          </div>
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
  );
};

export default PurchaseModal;