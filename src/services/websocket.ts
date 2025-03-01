


import { create } from 'zustand';

interface WebSocketStore {
  socket: WebSocket | null;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: any) => void;
  isConnected: boolean;
}

export const useWebSocket = create<WebSocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: () => {
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? `wss://${window.location.host}` 
      : 'ws://localhost:5001';
    
    const socket = new WebSocket(wsUrl);
    
    socket.onopen = () => {
      console.log('WebSocket Connected');
      set({ isConnected: true });
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      
      if (event.data === 'ping') {
        socket.send('pong');
        return;
      }

      try {
        const data = JSON.parse(event.data);
        console.log('Parsed message:', data);
        
        if (data.action === 'imageDisplayed') {
          console.log('Dispatching imageDisplayed event for level:', data.level);
          window.dispatchEvent(new CustomEvent('imageDisplayed', { detail: data.level }));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      set({ isConnected: false });
      // Attempt to reconnect after 5 seconds
      setTimeout(() => get().connect(), 5000);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      set({ isConnected: false });
    };

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, isConnected: false });
    }
  },
  sendMessage: (message: any) => {
    const { socket } = get();
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageString = JSON.stringify(message);
      console.log('Sending message:', messageString);
      socket.send(messageString);
    } else {
      console.warn('Cannot send message: WebSocket is not connected');
    }
  }
}));


