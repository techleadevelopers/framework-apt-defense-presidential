import { useEffect } from "react";

export function useWebSocket(eventType: string, callback: (data: any) => void) {
  useEffect(() => {
    // Simulate WebSocket events for demo purposes
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to trigger event
        callback({
          type: eventType,
          data: {
            timestamp: new Date(),
            message: `Simulated ${eventType} event`
          }
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [eventType, callback]);
}