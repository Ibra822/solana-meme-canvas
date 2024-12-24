import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from "@/hooks/use-toast";
import { Wallet } from 'lucide-react';

const WalletButton: FC = () => {
  const { wallet, disconnect, connecting, connected } = useWallet();

  const handleError = () => {
    toast({
      title: "Connection Failed",
      description: "Failed to connect. Please try again.",
      variant: "destructive",
    });
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast({
        title: "Wallet Disconnected",
        description: "You've been disconnected from your wallet.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <WalletMultiButton
      startIcon={<Wallet className="mr-2 h-4 w-4" />}
      className="wallet-adapter-button bg-gradient-to-r from-solana-purple to-solana-blue hover:opacity-90 text-white font-pixel text-[8px] h-8"
      onClick={connected ? handleDisconnect : undefined}
      onError={handleError}
    >
      {connecting ? 'Connecting...' : connected ? 'Disconnect' : 'Connect Wallet'}
    </WalletMultiButton>
  );
};

export default WalletButton;