import React, { useState, useEffect } from "react";

interface AiModel {
  id: number;
  name: string;
  type: string;
  status: string;
  accuracy: number;
  predictions: number;
  responseTime: number;
}

const AiStatusPanel: React.FC = () => {
  const [aiModels] = useState<AiModel[]>([
    {
      id: 1,
      name: "TactiCore Kernel",
      type: "tacticore",
      status: "active",
      accuracy: 98,
      predictions: 1247,
      responseTime: 0.3
    },
    {
      id: 2,
      name: "Mission Ops Kernel", 
      type: "mission_ops",
      status: "active",
      accuracy: 95,
      predictions: 847,
      responseTime: 0.5
    }
  ]);

  const tactiCore = aiModels.find(model => model.type === 'tacticore');
  const missionOps = aiModels.find(model => model.type === 'mission_ops');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* TactiCore Kernel */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)]">TactiCore Kernel</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">ACTIVE</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Tactical Awareness</span>
            <span className="text-sm text-[var(--cyber-cyan)]">{tactiCore?.accuracy || 98}%</span>
          </div>
          <div className="w-full bg-[var(--cyber-steel)] rounded-full h-2">
            <div 
              className="bg-[var(--cyber-cyan)] h-2 rounded-full animate-pulse" 
              style={{ width: `${tactiCore?.accuracy || 98}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--cyber-cyan)]">{tactiCore?.predictions?.toLocaleString() || '1,247'}</div>
              <div className="text-xs text-gray-400">Predictions/Hour</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--cyber-teal)]">{tactiCore?.responseTime || 0.3}ms</div>
              <div className="text-xs text-gray-400">Response Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Ops Kernel */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)]">Mission Ops Kernel</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">OPERATIONAL</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Mission Efficiency</span>
            <span className="text-sm text-[var(--cyber-cyan)]">{missionOps?.accuracy || 95}%</span>
          </div>
          <div className="w-full bg-[var(--cyber-steel)] rounded-full h-2">
            <div 
              className="bg-[var(--cyber-cyan)] h-2 rounded-full animate-pulse" 
              style={{ width: `${missionOps?.accuracy || 95}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--cyber-cyan)]">{missionOps?.predictions || 847}</div>
              <div className="text-xs text-gray-400">Ops Coordinated</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--cyber-teal)]">23</div>
              <div className="text-xs text-gray-400">Active Missions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Neural Network Visualization */}
      <div className="glass-panel rounded-xl p-6">
        <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Neural Activity</h3>
        <div className="relative h-32 bg-[var(--cyber-dark)] rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Neural Network Nodes */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="neural-node w-3 h-3 rounded-full" 
                  style={{ animationDelay: `${i * 0.25}s` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-xs text-gray-400">
            Processing: {tactiCore?.predictions || 847} patterns/sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiStatusPanel;
