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
  private mockMode: boolean = true; // Enable mock mode for development
  private mockData: Map<number, PixelData> = new Map();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectTimeout: number = 5000;

  connect() {
    if (this.mockMode) {
      console.log('WebSocket running in mock mode');
      return;
    }

    try {
      this.ws = new WebSocket('wss://your-websocket-server.com');

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          if (message.type === 'pixelUpdate') {
            this.messageHandlers.forEach(handler => handler(message));
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.mockMode) return;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(), this.reconnectTimeout);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  subscribe(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  updatePixel(index: number, pixelData: PixelData) {
    if (this.mockMode) {
      // In mock mode, update local data and trigger handlers
      this.mockData.set(index, pixelData);
      this.messageHandlers.forEach(handler => 
        handler({
          type: 'pixelUpdate',
          data: { index, pixelData }
        })
      );
      return;
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'pixelUpdate',
        data: { index, pixelData }
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  getMockData() {
    return this.mockData;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.messageHandlers = [];
  }
}

export const websocketService = new WebSocketService();