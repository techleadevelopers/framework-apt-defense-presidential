import React, { useState, useEffect } from "react";
import { AlertTriangle, Network, Shield, Brain } from "lucide-react";
import { useThreatData } from '@/hooks/use-threat-data';

interface DashboardMetrics {
  activeThreats: number;
  criticalThreats: number;
  blockedAttacks: number;
  networkHealth: number;
  aiConfidence: number;
  totalThreatsToday: number;
}

const MetricsPanel: React.FC = () => {
  const { threatStats } = useThreatData();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeThreats: 0,
    criticalThreats: 0,
    blockedAttacks: 0,
    networkHealth: 98.7,
    aiConfidence: 96.4,
    totalThreatsToday: 0
  });

  // Update metrics based on real threat data
  useEffect(() => {
    setMetrics(prev => ({
      ...prev,
      activeThreats: threatStats.totalThreats,
      criticalThreats: threatStats.criticalThreats,
      totalThreatsToday: threatStats.totalThreats,
      blockedAttacks: Math.floor(threatStats.totalThreats * 2.5), // Simulate blocked attacks
      networkHealth: Math.max(50, 100 - (threatStats.criticalThreats * 10 + threatStats.highThreats * 5)),
      aiConfidence: Math.max(80, 100 - (threatStats.criticalThreats * 3))
    }));
  }, [threatStats]);

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
