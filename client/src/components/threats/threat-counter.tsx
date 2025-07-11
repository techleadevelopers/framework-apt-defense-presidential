import { useState, useEffect } from "react";

export default function ThreatCounter() {
  const [threatCount, setThreatCount] = useState(247);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.2) {
        setThreatCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Live Threat Feed</h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-[var(--cyber-red)] mb-2">{threatCount}</div>
        <div className="text-sm text-gray-400">Threats Detected Today</div>
        <div className="mt-4 w-full h-2 bg-[var(--cyber-steel)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--cyber-red)] to-yellow-400 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
