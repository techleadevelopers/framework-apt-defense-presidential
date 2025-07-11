import React, { useState, useEffect } from "react";
import { AlertTriangle, Network, Shield, Brain } from "lucide-react";

interface DashboardMetrics {
  activeThreats: number;
  criticalThreats: number;
  blockedAttacks: number;
  networkHealth: number;
  aiConfidence: number;
  totalThreatsToday: number;
}

const MetricsPanel: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeThreats: 3,
    criticalThreats: 2,
    blockedAttacks: 1247,
    networkHealth: 98.7,
    aiConfidence: 96.4,
    totalThreatsToday: 15
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : 0)),
        blockedAttacks: prev.blockedAttacks + Math.floor(Math.random() * 3),
        networkHealth: Math.max(90, Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 2)),
        aiConfidence: Math.max(90, Math.min(100, prev.aiConfidence + (Math.random() - 0.5))),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Active Threats */}
      <div className="cyber-border rounded-xl p-6 bg-[var(--cyber-navy)]/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400">Active Threats</h3>
          <AlertTriangle className="w-5 h-5 text-[var(--cyber-red)]" />
        </div>
        <div className="text-3xl font-bold text-[var(--cyber-red)] mb-1">{metrics.activeThreats}</div>
        <div className="text-xs text-gray-400">+{metrics.criticalThreats} critical</div>
        <div className="threat-indicator w-full h-1 bg-[var(--cyber-steel)] rounded-full mt-3"></div>
      </div>

      {/* Network Status */}
      <div className="cyber-border rounded-xl p-6 bg-[var(--cyber-navy)]/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400">Network Health</h3>
          <Network className="w-5 h-5 text-[var(--cyber-teal)]" />
        </div>
        <div className="text-3xl font-bold text-[var(--cyber-teal)] mb-1">{metrics.networkHealth}%</div>
        <div className="text-xs text-gray-400">All systems operational</div>
        <div className="w-full h-1 bg-[var(--cyber-steel)] rounded-full mt-3">
          <div className="data-stream h-1 rounded-full" style={{ width: `${metrics.networkHealth}%` }}></div>
        </div>
      </div>

      {/* Blocked Attacks */}
      <div className="cyber-border rounded-xl p-6 bg-[var(--cyber-navy)]/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400">Blocked Attacks</h3>
          <Shield className="w-5 h-5 text-green-400" />
        </div>
        <div className="text-3xl font-bold text-green-400 mb-1">{metrics.blockedAttacks.toLocaleString()}</div>
        <div className="text-xs text-gray-400">Last 24 hours</div>
        <div className="w-full h-1 bg-[var(--cyber-steel)] rounded-full mt-3">
          <div className="bg-green-400 h-1 rounded-full w-[85%] animate-pulse"></div>
        </div>
      </div>

      {/* AI Confidence */}
      <div className="cyber-border rounded-xl p-6 bg-[var(--cyber-navy)]/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-400">AI Confidence</h3>
          <Brain className="w-5 h-5 text-[var(--cyber-cyan)]" />
        </div>
        <div className="text-3xl font-bold text-[var(--cyber-cyan)] mb-1">{metrics.aiConfidence}%</div>
        <div className="text-xs text-gray-400">Detection accuracy</div>
        <div className="w-full h-1 bg-[var(--cyber-steel)] rounded-full mt-3">
          <div 
            className="bg-[var(--cyber-cyan)] h-1 rounded-full animate-glow" 
            style={{ width: `${metrics.aiConfidence}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
