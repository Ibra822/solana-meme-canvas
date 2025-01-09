import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  CloverWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { toast } from "@/components/ui/use-toast";
import '@solana/wallet-adapter-react-ui/styles.css';

interface Props {
  children: ReactNode;
}

export const SolanaWalletProvider: FC<Props> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new CloverWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={false}
        onError={(error) => {
          console.error('Wallet error:', error);
          toast({
            title: "Wallet Error",
            description: "Failed to connect wallet. Please try again.",
            variant: "destructive",
          });
        }}
      >
        <WalletModalProvider>
          <style jsx global>{`
            .wallet-adapter-button {
              height: 48px !important;
              padding: 0 24px !important;
              font-family: 'Press Start 2P', cursive !important;
              font-size: 8px !important;
              background: linear-gradient(to right, #9945FF, #14F195) !important;
              color: white !important;
              border-radius: 6px !important;
              transition: opacity 0.2s !important;
            }
            .wallet-adapter-button:hover {
              opacity: 0.9 !important;
            }
            .wallet-adapter-modal-wrapper {
              background: #1A1F2C !important;
              border: 1px solid rgba(153, 69, 255, 0.2) !important;
            }
            .wallet-adapter-modal-button-close {
              background: #9945FF !important;
            }
            .wallet-adapter-modal-title {
              color: white !important;
              font-family: 'Press Start 2P', cursive !important;
              font-size: 12px !important;
            }
          `}</style>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};