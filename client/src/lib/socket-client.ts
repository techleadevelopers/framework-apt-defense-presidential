// Frontend-only socket simulation - no actual WebSocket connection
const listeners = new Map<string, Set<(data: any) => void>>();

export function initializeWebSocket() {
  // Simulate connection success
  console.log("Connected to SOC WebSocket");
  
  // Simulate periodic data updates for demo purposes
  setInterval(() => {
    const eventTypes = ['security_event', 'new_threat', 'ai_update'];
    const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    const mockData = {
      type: randomType,
      data: {
        timestamp: new Date(),
        message: `Simulated ${randomType} event`
      }
    };
    
    const eventListeners = listeners.get(randomType) || new Set();
    const allListeners = listeners.get('*') || new Set();
    
    [...eventListeners, ...allListeners].forEach(callback => {
      callback(mockData);
    });
  }, 30000); // Every 30 seconds
}

export function addWebSocketListener(eventType: string, callback: (data: any) => void) {
  if (!listeners.has(eventType)) {
    listeners.set(eventType, new Set());
  }
  listeners.get(eventType)!.add(callback);

  // Return cleanup function
  return () => {
    const eventListeners = listeners.get(eventType);
    if (eventListeners) {
      eventListeners.delete(callback);
      if (eventListeners.size === 0) {
        listeners.delete(eventType);
      }
    }
  };
}

export function removeWebSocketListener(eventType: string, callback: (data: any) => void) {
  const eventListeners = listeners.get(eventType);
  if (eventListeners) {
    eventListeners.delete(callback);
    if (eventListeners.size === 0) {
      listeners.delete(eventType);
    }
  }
}

export function sendWebSocketMessage(data: any) {
  // Simulate message sending
  console.log("Sending WebSocket message:", data);
}