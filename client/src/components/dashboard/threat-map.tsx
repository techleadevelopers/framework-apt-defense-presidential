import React, { useEffect, useState, useRef } from "react";
import { Globe, Plus, Minus, Filter, Layers, RotateCcw, MapPin, Zap, Shield, Activity, AlertTriangle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThreatData, ThreatData } from "@/hooks/use-threat-data";

const ThreatMap: React.FC = () => {
  const { activeThreats, threatStats, selectedThreat, setSelectedThreat } = useThreatData();
  const [mapLayer, setMapLayer] = useState<'attacks' | 'traffic' | 'heatmap'>('attacks');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState<'global' | 'regional'>('global');
  const [showDetails, setShowDetails] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Convert lat/lng to map coordinates
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getThreatColor = (severity: ThreatData['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 shadow-red-500/50 border-red-400';
      case 'high': return 'bg-yellow-500 shadow-yellow-500/50 border-yellow-400';
      case 'medium': return 'bg-blue-500 shadow-blue-500/50 border-blue-400';
      case 'low': return 'bg-green-500 shadow-green-500/50 border-green-400';
      default: return 'bg-gray-500 shadow-gray-500/50 border-gray-400';
    }
  };

  const getThreatSize = (severity: ThreatData['severity']) => {
    switch (severity) {
      case 'critical': return 'w-5 h-5';
      case 'high': return 'w-4 h-4';
      case 'medium': return 'w-3 h-3';
      case 'low': return 'w-2 h-2';
      default: return 'w-2 h-2';
    }
  };

  const getThreatIcon = (threatType: string) => {
    if (threatType.includes('DDoS')) return <Zap className="w-3 h-3" />;
    if (threatType.includes('Malware')) return <Shield className="w-3 h-3" />;
    if (threatType.includes('APT')) return <Target className="w-3 h-3" />;
    return <AlertTriangle className="w-3 h-3" />;
  };

  const getCountryFlag = (countryName: string) => {
    const flagMap: Record<string, string> = {
      'Russia': 'RU',
      'South Korea': 'KR',
      'France': 'FR',
      'Iran': 'IR',
      'Netherlands': 'NL',
      'China': 'CN',
      'United States': 'US',
      'Germany': 'DE',
      'Brazil': 'BR',
      'India': 'IN',
      'Japan': 'JP',
      'United Kingdom': 'GB',
      'Canada': 'CA',
      'Australia': 'AU',
      'Italy': 'IT',
      'Spain': 'ES',
      'Sweden': 'SE',
      'Poland': 'PL',
      'Turkey': 'TR',
      'Ukraine': 'UA',
      'Romania': 'RO',
      'Czech Republic': 'CZ',
      'Mexico': 'MX',
      'Norway': 'NO',
      'Finland': 'FI'
    };
    return flagMap[countryName] || 'UN';
  };

  const renderCountryFlag = (countryCode: string) => {
    // Use CSS-styled flag icons if emoji flags don't render properly
    return (
      <span 
        className="inline-flex items-center justify-center w-5 h-4 text-xs font-bold text-white rounded"
        style={{
          background: `linear-gradient(45deg, 
            ${getCountryColors(countryCode).primary}, 
            ${getCountryColors(countryCode).secondary})`,
          border: '1px solid rgba(255,255,255,0.2)',
          fontSize: '9px'
        }}
      >
        {countryCode}
      </span>
    );
  };

  const getCountryColors = (countryCode: string) => {
    const colorMap: Record<string, { primary: string; secondary: string }> = {
      'RU': { primary: '#0052CC', secondary: '#FF4757' }, // Russia
      'KR': { primary: '#FF6B6B', secondary: '#4ECDC4' }, // South Korea
      'FR': { primary: '#0984E3', secondary: '#E17055' }, // France
      'IR': { primary: '#00B894', secondary: '#E17055' }, // Iran
      'NL': { primary: '#E17055', secondary: '#0984E3' }, // Netherlands
      'CN': { primary: '#E84393', secondary: '#FDCB6E' }, // China
      'US': { primary: '#0984E3', secondary: '#E17055' }, // United States
      'DE': { primary: '#2D3436', secondary: '#FDCB6E' }, // Germany
      'BR': { primary: '#00B894', secondary: '#FDCB6E' }, // Brazil
      'IN': { primary: '#E17055', secondary: '#00B894' }, // India
      'JP': { primary: '#E84393', secondary: '#FFFFFF' }, // Japan
      'GB': { primary: '#0984E3', secondary: '#E17055' }, // United Kingdom
      'CA': { primary: '#E17055', secondary: '#FFFFFF' }, // Canada
      'AU': { primary: '#0984E3', secondary: '#E17055' }, // Australia
      'IT': { primary: '#00B894', secondary: '#E17055' }, // Italy
      'ES': { primary: '#E17055', secondary: '#FDCB6E' }, // Spain
      'SE': { primary: '#0984E3', secondary: '#FDCB6E' }, // Sweden
      'PL': { primary: '#FFFFFF', secondary: '#E17055' }, // Poland
      'TR': { primary: '#E17055', secondary: '#FFFFFF' }, // Turkey
      'UA': { primary: '#0984E3', secondary: '#FDCB6E' }, // Ukraine
      'RO': { primary: '#0984E3', secondary: '#E17055' }, // Romania
      'CZ': { primary: '#0984E3', secondary: '#E17055' }, // Czech Republic
      'MX': { primary: '#00B894', secondary: '#E17055' }, // Mexico
      'NO': { primary: '#E17055', secondary: '#0984E3' }, // Norway
      'FI': { primary: '#0984E3', secondary: '#FFFFFF' }  // Finland
    };
    
    return colorMap[countryCode] || { primary: '#636E72', secondary: '#DDD' };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Threat Map */}
      <div className="lg:col-span-2 glass-panel rounded-xl p-6 relative">
        <style>{`
          .country-flag {
            font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', 'EmojiSymbols', sans-serif;
            font-size: 16px;
            line-height: 1;
            display: inline-block;
            text-rendering: auto;
            -webkit-font-feature-settings: "liga";
            font-feature-settings: "liga";
          }
          
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
          
          .attack-line {
            animation: attack-flow 3s linear infinite;
          }
          
          @keyframes attack-flow {
            0% { 
              stroke-dashoffset: 0;
            }
            100% { 
              stroke-dashoffset: -20;
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
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)]">Global Threat Map</h3>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant={mapLayer === 'attacks' ? 'default' : 'outline'}
              onClick={() => setMapLayer('attacks')}
              className="text-xs"
            >
              <Activity className="w-3 h-3 mr-1" />
              Attacks
            </Button>
            <Button 
              size="sm" 
              variant={mapLayer === 'heatmap' ? 'default' : 'outline'}
              onClick={() => setMapLayer('heatmap')}
              className="text-xs"
            >
              <Layers className="w-3 h-3 mr-1" />
              Heatmap
            </Button>
          </div>
        </div>
        
        <div 
          ref={mapRef}
          className="relative w-full h-96 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] rounded-lg overflow-hidden border border-[var(--cyber-cyan)]/30"
        >
          {/* Map controls */}
          <div className="absolute left-4 top-4 map-control--container z-20">
            <button className="map-control" title="Reset zoom" onClick={() => setZoomLevel(1)}>
              <Globe className="w-4 h-4" />
            </button>
            <button className="map-control" title="Zoom in" onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}>
              <Plus className="w-4 h-4" />
            </button>
            <button className="map-control" title="Zoom out" onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}>
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* World outline pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 30%, rgba(0,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 75% 25%, rgba(0,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 45% 60%, rgba(0,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 15% 50%, rgba(0,255,255,0.1) 1px, transparent 1px),
                radial-gradient(circle at 85% 40%, rgba(0,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />

          {/* SVG for attack lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {mapLayer === 'attacks' && activeThreats.slice(-10).map((threat, index) => {
              const sourcePos = projectCoordinates(threat.latitude, threat.longitude);
              const targetPos = projectCoordinates(
                threat.latitude + (Math.random() - 0.5) * 40,
                threat.longitude + (Math.random() - 0.5) * 40
              );
              return (
                <line
                  key={threat.id}
                  x1={`${sourcePos.x}%`}
                  y1={`${sourcePos.y}%`}
                  x2={`${targetPos.x}%`}
                  y2={`${targetPos.y}%`}
                  stroke={threat.severity === 'critical' ? '#ef4444' : '#3b82f6'}
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  className="attack-line"
                  opacity="0.6"
                />
              );
            })}
          </svg>

          {/* Threat points */}
          {activeThreats.map((threat) => {
            const pos = projectCoordinates(threat.latitude, threat.longitude);
            return (
              <div
                key={threat.id}
                className={`absolute ${getThreatSize(threat.severity)} ${getThreatColor(threat.severity)} rounded-full pulse-threat cursor-pointer shadow-lg z-10 flex items-center justify-center`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={`${threat.description}\nConfidence: ${threat.confidence}%\nTime: ${threat.timestamp.toLocaleTimeString()}`}
                onClick={() => {
                  setSelectedThreat(threat);
                  setShowDetails(true);
                }}
              >
                <div className="text-white text-xs">
                  {getThreatIcon(threat.threatType)}
                </div>
              </div>
            );
          })}

          {/* Status overlay */}
          <div className="absolute top-4 right-4 bg-black/60 rounded px-3 py-2 border border-[var(--cyber-cyan)]/30">
            <div className="text-xs text-[var(--cyber-cyan)]">
              LIVE THREATS: <span className="font-bold text-red-400">{threatStats.totalThreats}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Last Update: {new Date().toLocaleTimeString()}
            </div>
            <div className="text-xs text-red-400 mt-1">
              Critical: {threatStats.criticalThreats} | High: {threatStats.highThreats}
            </div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-black/60 rounded px-3 py-2 border border-[var(--cyber-cyan)]/30">
            <div className="text-xs text-[var(--cyber-cyan)] mb-2 font-bold">THREAT LEVELS</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Critical ({threatStats.criticalThreats})</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">High ({threatStats.highThreats})</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Medium ({threatStats.mediumThreats})</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">Low ({threatStats.lowThreats})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Threat Details Panel */}
      <div className="space-y-4">
        {/* Top Source Countries */}
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-orbitron text-sm text-[var(--cyber-cyan)]">Top Source Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {threatStats.topSourceCountries.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300">{country.country}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{country.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Threat Types */}
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="font-orbitron text-sm text-[var(--cyber-cyan)]">Top Threat Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {threatStats.topThreatTypes.map((type, index) => (
                <div key={type.type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="text-yellow-400">{getThreatIcon(type.type)}</div>
                    <span className="text-gray-300 truncate">{type.type}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{type.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Threat Details */}
        {selectedThreat && (
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader className="pb-3">
              <CardTitle className="font-orbitron text-sm text-[var(--cyber-cyan)]">Threat Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-gray-400">Type:</span>
                  <span className="ml-2 text-white">{selectedThreat.threatType}</span>
                </div>
                <div>
                  <span className="text-gray-400">Severity:</span>
                  <Badge 
                    className={`ml-2 text-xs ${
                      selectedThreat.severity === 'critical' ? 'bg-red-500' : 
                      selectedThreat.severity === 'high' ? 'bg-yellow-500' : 
                      selectedThreat.severity === 'medium' ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                  >
                    {selectedThreat.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-400">Source:</span>
                  <span className="ml-2 text-white">{selectedThreat.sourceIp}</span>
                </div>
                <div>
                  <span className="text-gray-400">Target:</span>
                  <span className="ml-2 text-white">{selectedThreat.targetIp}</span>
                </div>
                <div>
                  <span className="text-gray-400">Country:</span>
                  <span className="ml-2 text-white">{selectedThreat.sourceCountry}</span>
                </div>
                <div>
                  <span className="text-gray-400">Vector:</span>
                  <span className="ml-2 text-white">{selectedThreat.attackVector}</span>
                </div>
                <div>
                  <span className="text-gray-400">Confidence:</span>
                  <span className="ml-2 text-white">{selectedThreat.confidence}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Port:</span>
                  <span className="ml-2 text-white">{selectedThreat.port}</span>
                </div>
                <div>
                  <span className="text-gray-400">Time:</span>
                  <span className="ml-2 text-white">{selectedThreat.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThreatMap;
