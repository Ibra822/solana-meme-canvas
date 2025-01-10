export interface WebSocketMessage {
  type: string;
  data: any;
}

class WebSocketService {
  private static instance: WebSocketService;
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: WebSocketMessage) => void)[] = [];
  private mockMode: boolean = true; // Development mode flag
  private mockData: Map<number, any> = new Map(); // Store mock data

  private constructor() {
    // Initialize mock data if needed
    if (this.mockMode) {
      console.log('WebSocket Service running in mock mode');
    }
  }

  static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  connect(): WebSocket {
    if (this.mockMode) {
      // Create a mock WebSocket for development
      const mockWs = {
        send: (data: string) => {
          console.log('Mock WebSocket send:', data);
        },
        close: () => {
          console.log('Mock WebSocket closed');
        },
        onmessage: null,
        onclose: null,
        onerror: null,
        onopen: null,
        readyState: 1,
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
        url: 'mock://websocket',
        protocol: '',
        extensions: '',
        bufferedAmount: 0,
        binaryType: 'blob' as BinaryType,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      } as WebSocket;

      // Simulate successful connection
      setTimeout(() => {
        if (mockWs.onopen) {
          mockWs.onopen(new Event('open'));
        }
      }, 100);

      this.ws = mockWs;
      return mockWs;
    }

    // Real WebSocket connection (for production)
    try {
      const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'wss://your-production-websocket-server.com';
      this.ws = new WebSocket(wsUrl);

      this.ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.messageHandlers.forEach((handler) => handler(message));
      };

      this.ws.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...');
        setTimeout(() => this.connect(), 5000);
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return this.ws;
    } catch (error) {
      console.error('Failed to establish WebSocket connection:', error);
      throw error;
    }
  }

  subscribe(handler: (message: WebSocketMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  // Mock methods for development
  updateMockData(index: number, data: any) {
    if (this.mockMode) {
      this.mockData.set(index, data);
      this.messageHandlers.forEach((handler) => 
        handler({
          type: 'pixelUpdate',
          data: { index, pixelData: data }
        })
      );
    }
  }

  getMockData(index: number) {
    return this.mockMode ? this.mockData.get(index) : null;
  }
}

export const websocketService = WebSocketService.getInstance();