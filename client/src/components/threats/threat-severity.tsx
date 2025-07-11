import { useState, useEffect } from "react";

export default function ThreatSeverity() {
  const [severityCounts, setSeverityCounts] = useState({
    critical: 2,
    high: 1,
    medium: 0,
    low: 0,
  });

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSeverityCounts(prev => ({
        ...prev,
        critical: Math.max(0, prev.critical + (Math.random() > 0.8 ? 1 : 0)),
        high: Math.max(0, prev.high + (Math.random() > 0.7 ? 1 : -1)),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Threat Severity</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[var(--cyber-red)] rounded-full"></div>
            <span className="text-sm">Critical</span>
          </div>
          <span className="text-sm font-bold text-[var(--cyber-red)]">{severityCounts.critical}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-sm">High</span>
          </div>
          <span className="text-sm font-bold text-yellow-400">{severityCounts.high}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span className="text-sm">Medium</span>
          </div>
          <span className="text-sm font-bold text-orange-400">{severityCounts.medium}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-sm">Low</span>
          </div>
          <span className="text-sm font-bold text-green-400">{severityCounts.low}</span>
        </div>
      </div>
    </div>
  );
}
