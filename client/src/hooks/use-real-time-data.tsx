import { useState, useEffect, useCallback } from "react";

export function useRealTimeData<T>(initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Simulate real-time updates without WebSocket
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { data, setData, lastUpdate };
}

export function useThreatCounter() {
  const [threatCount, setThreatCount] = useState(247);

  // Simulate periodic increases
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) { // 20% chance every 5 seconds
        setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return threatCount;
}
