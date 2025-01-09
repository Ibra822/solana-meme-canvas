import { PixelData } from '../components/grid/types';

type WebSocketMessage = {
  type: 'pixelUpdate';
  data: {
    index: number;
    pixelData: PixelData;
  };
};

class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: WebSocketMessage) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private mockData = new Map<number, PixelData>();

  constructor() {
    // Initialize some mock data for development
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add some sample pixel data
    this.mockData.set(0, {
      imageUrl: 'https://picsum.photos/10/10',
      link: 'https://solana.com',
      memecoinName: 'SolMeme'
    });
    
    this.mockData.set(1100, {
      imageUrl: 'https://picsum.photos/10/10',
      link: 'https://solana.com',
      memecoinName: 'MemeSOL'
    });
  }

  async connect(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate successful connection
      setTimeout(() => {
        console.log('Mock WebSocket connected successfully');
        this.mockData.forEach((pixelData, index) => {
          this.messageHandlers.forEach(handler => {
            handler({
              type: 'pixelUpdate',
              data: { index, pixelData }
            });
          });
        });
        resolve();
      }, 1000);
    });
  }

  subscribe(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  updatePixel(index: number, pixelData: PixelData) {
    this.mockData.set(index, pixelData);
    this.messageHandlers.forEach(handler => {
      handler({
        type: 'pixelUpdate',
        data: { index, pixelData }
      });
    });
  }
}

export const websocketService = new WebSocketService();