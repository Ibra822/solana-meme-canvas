import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, Coins } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface LinkInputStepProps {
  onLinkSubmit: (link: string, memecoinName: string) => void;
  onNext: () => void;
  imagePreviewUrl: string | null;
}

const LinkInputStep = ({ onLinkSubmit, onNext, imagePreviewUrl }: LinkInputStepProps) => {
  const [link, setLink] = useState('');
  const [memecoinName, setMemecoinName] = useState('');

  const validateAndSubmit = () => {
    if (!memecoinName.trim()) {
      toast({
        title: "Missing Memecoin Name",
        description: "Please enter your memecoin name",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = new URL(link);
      if (!url.protocol.startsWith('http')) {
        throw new Error('URL must start with http:// or https://');
      }
      onLinkSubmit(link, memecoinName);
      onNext();
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL starting with http:// or https://",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="memecoin" className="text-white/90 font-pixel text-[10px] flex items-center gap-2">
            <Coins className="w-4 h-4" />
            Memecoin Name
          </Label>
          <Input
            id="memecoin"
            type="text"
            value={memecoinName}
            onChange={(e) => setMemecoinName(e.target.value)}
            placeholder="Enter your memecoin name"
            className="bg-[#2D243F]/50 border-solana-purple/20 text-[10px] font-pixel h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="link" className="text-white/90 font-pixel text-[10px] flex items-center gap-2">
            <Link className="w-4 h-4" />
            Website Link
          </Label>
          <Input
            id="link"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://your-website.com"
            className="bg-[#2D243F]/50 border-solana-purple/20 text-[10px] font-pixel h-12"
          />
        </div>
      </div>

      {imagePreviewUrl && (
        <div className="mt-6">
          <Label className="text-white/90 font-pixel text-[10px] mb-4">Preview:</Label>
          <div className="border border-solana-purple/20 rounded-lg p-4">
            <img 
              src={imagePreviewUrl} 
              alt="Preview" 
              className="max-w-full h-auto mb-4"
            />
            {memecoinName && (
              <p className="text-[10px] font-pixel text-white/70 mb-2">
                Memecoin: {memecoinName}
              </p>
            )}
            {link && (
              <p className="text-[10px] font-pixel text-white/70 break-all">
                Link: {link}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <Button
          onClick={validateAndSubmit}
          disabled={!link || !memecoinName}
          className="bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[10px] h-12 px-8"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LinkInputStep;