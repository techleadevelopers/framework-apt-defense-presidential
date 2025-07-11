import React, { useEffect, useState } from "react";
import { Globe, Plus, Minus, Filter, Layers, RotateCcw, MapPin, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ThreatMap: React.FC = () => {
  const [threatCount, setThreatCount] = useState(247);
  const [mapLayer, setMapLayer] = useState<'attacks' | 'traffic' | 'heatmap'>('attacks');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [threats] = useState([
    { x: 15, y: 25, level: 'critical', name: 'North America', attacks: 45, ip: '192.168.1.0/24' },
    { x: 45, y: 20, level: 'high', name: 'Europe', attacks: 32, ip: '10.0.0.0/16' },
    { x: 75, y: 35, level: 'critical', name: 'Asia Pacific', attacks: 67, ip: '172.16.0.0/12' },
    { x: 25, y: 60, level: 'medium', name: 'South America', attacks: 18, ip: '203.0.113.0/24' },
    { x: 50, y: 55, level: 'low', name: 'Africa', attacks: 12, ip: '198.51.100.0/24' },
    { x: 80, y: 20, level: 'high', name: 'Russia', attacks: 28, ip: '198.18.0.0/15' },
    { x: 70, y: 60, level: 'medium', name: 'Australia', attacks: 15, ip: '203.0.113.64/26' }
  ]);

  const [selectedThreat, setSelectedThreat] = useState<typeof threats[0] | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500 shadow-red-500/50 border-red-400';
      case 'high': return 'bg-yellow-500 shadow-yellow-500/50 border-yellow-400';
      case 'medium': return 'bg-blue-500 shadow-blue-500/50 border-blue-400';
      case 'low': return 'bg-green-500 shadow-green-500/50 border-green-400';
      default: return 'bg-gray-500 shadow-gray-500/50 border-gray-400';
    }
  };

  const getThreatSize = (level: string) => {
    switch (level) {
      case 'critical': return 'w-4 h-4';
      case 'high': return 'w-3 h-3';
      case 'medium': return 'w-2 h-2';
      case 'low': return 'w-2 h-2';
      default: return 'w-2 h-2';
    }
  };

  return (
    <div className="glass-panel rounded-xl p-6 relative">
      <style>{`
        .pulse-threat {
          animation: pulse-threat 2s infinite;
        }
        
        @keyframes pulse-threat {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
        
        .map-control {
          font-size: 0.875rem;
          padding: 0.5rem 0.75rem;
          background: rgba(77, 89, 107, 0.5);
          color: #00ffff;
          display: block;
          border-bottom: 1px solid rgba(0,0,0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.35s ease;
          text-decoration: none;
        }
        
        .map-control:first-child {
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
          border-top-width: 0;
        }
        
        .map-control:last-child {
          border-bottom-right-radius: 3px;
          border-bottom-left-radius: 3px;
          border-bottom-width: 0;
        }
        
        .map-control--container {
          border: 1px solid rgba(0,0,0, 0.15);
          border-radius: 3px;
          transition: border 0.35s ease;
        }
        
        .map-control--container:hover {
          border: 1px solid rgba(0,255,255, 0.5);
        }
        
        .map-control--container:hover .map-control {
          background: rgba(0, 255, 255, 0.2);
        }
      `}</style>
      
      <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Global Threat Map</h3>
      
      <div className="relative w-full h-96 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-lg overflow-hidden border border-[var(--cyber-cyan)]/30">
        
        {/* Map controls */}
        <div className="absolute left-4 top-4 map-control--container z-20">
          <a href="#" className="map-control" title="Reset zoom">
            <Globe className="w-4 h-4" />
          </a>
          <a href="#" className="map-control" title="Zoom in">
            <Plus className="w-4 h-4" />
          </a>
          <a href="#" className="map-control" title="Zoom out">
            <Minus className="w-4 h-4" />
          </a>
        </div>

        {/* World outline pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 30%, rgba(0,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 75% 25%, rgba(0,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 45% 60%, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Threat points */}
        {threats.map((threat, index) => (
          <div
            key={index}
            className={`absolute ${getThreatSize(threat.level)} ${getThreatColor(threat.level)} rounded-full pulse-threat cursor-pointer shadow-lg z-10`}
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            title={`${threat.name}: ${threat.attacks} attacks detected`}
            onClick={() => console.log(`Threat details: ${threat.name}`)}
          />
        ))}

        {/* Status overlay */}
        <div className="absolute top-4 right-4 bg-black/60 rounded px-3 py-2 border border-[var(--cyber-cyan)]/30">
          <div className="text-xs text-[var(--cyber-cyan)]">
            LIVE THREATS: <span className="font-bold text-red-400">{threatCount}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Last Update: {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/60 rounded px-3 py-2 border border-[var(--cyber-cyan)]/30">
          <div className="text-xs text-[var(--cyber-cyan)] mb-2 font-bold">THREAT LEVELS</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Critical</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">High</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Medium</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
