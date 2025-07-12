import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Activity, AlertTriangle, Target, Terminal } from "lucide-react";
import ThreatSeverity from "./threat-severity";
import ThreatCounter from "./threat-counter";
import ThreatDetectionConfig from "./threat-detection-config";
import InteractiveRuleTesting from "../testing/interactive-rule-testing";
import AIThreatAnalysis from "./ai-threat-analysis";

interface Threat {
  id: number;
  title: string;
  description: string;
  severity: string;
  mitreId: string;
  sourceIp: string;
  targetHost: string;
  confidence: number;
  status: string;
  detectedAt: Date;
}

export default function ThreatList() {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [threats, setThreats] = useState<Threat[]>([
    {
      id: 1,
      title: "APT29 - MITRE T1055.002",
      description: "Process injection detected in explorer.exe - Possible privilege escalation attempt",
      severity: "critical",
      mitreId: "T1055.002",
      sourceIp: "192.168.1.45",
      targetHost: "DESKTOP-ABC123",
      confidence: 97,
      status: "active",
      detectedAt: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      id: 2,
      title: "Cobalt Strike - MITRE T1071.001",
      description: "Suspicious HTTP beacon detected - Possible C2 communication",
      severity: "critical",
      mitreId: "T1071.001",
      sourceIp: "10.0.0.23",
      targetHost: "malicious-domain.com",
      confidence: 94,
      status: "active",
      detectedAt: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 3,
      title: "Suspicious PowerShell - MITRE T1059.001",
      description: "Obfuscated PowerShell script execution detected",
      severity: "high",
      mitreId: "T1059.001",
      sourceIp: "192.168.1.78",
      targetHost: "WORKSTATION-456",
      confidence: 89,
      status: "monitoring",
      detectedAt: new Date(Date.now() - 8 * 60 * 1000)
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleThreatAction = (threatId: number, action: string) => {
    setThreats(prev => prev.map(threat => 
      threat.id === threatId ? { ...threat, status: action } : threat
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-[var(--cyber-red)]';
      case 'high': return 'border-yellow-400';
      case 'medium': return 'border-orange-400';
      case 'low': return 'border-green-400';
      default: return 'border-gray-600';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[var(--cyber-red)]/10';
      case 'high': return 'bg-yellow-400/10';
      case 'medium': return 'bg-orange-400/10';
      case 'low': return 'bg-green-400/10';
      default: return 'bg-gray-600/10';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[var(--cyber-red)] text-white';
      case 'high': return 'bg-yellow-400 text-[var(--cyber-dark)]';
      case 'medium': return 'bg-orange-400 text-white';
      case 'low': return 'bg-green-400 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTimeAgo = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-panel rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[var(--cyber-dark)]/50">
          <TabsTrigger value="overview" className="text-white flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="active" className="text-white flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Active Threats</span>
          </TabsTrigger>
          <TabsTrigger value="detection" className="text-white flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Detection Config</span>
          </TabsTrigger>
          <TabsTrigger value="rule-testing" className="text-white flex items-center space-x-2">
            <Terminal className="w-4 h-4" />
            <span>Rule Testing</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-white flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Threat Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ThreatSeverity />
            <ThreatCounter />
            
            {/* AI Confidence Score */}
            <div className="glass-panel rounded-xl p-6">
              <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Detection Confidence</h3>
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-[var(--cyber-steel)]"></div>
                  <div 
                    className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-[var(--cyber-cyan)] border-t-transparent animate-spin" 
                    style={{ animationDuration: '3s' }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-[var(--cyber-cyan)]">96.4%</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">Average Confidence</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Detection Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-[var(--cyber-red)]">23</div>
                <div className="text-sm text-gray-400">Critical Alerts</div>
              </div>
              <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">47</div>
                <div className="text-sm text-gray-400">High Priority</div>
              </div>
              <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">1,247</div>
                <div className="text-sm text-gray-400">Blocked Events</div>
              </div>
              <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-[var(--cyber-cyan)]">98.7%</div>
                <div className="text-sm text-gray-400">Detection Rate</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {/* Active Threats List */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)]">Active Threats</h3>
              <div className="flex space-x-2">
                <Button
                  variant={selectedSeverity === "critical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeverity(selectedSeverity === "critical" ? "" : "critical")}
                  className="bg-[var(--cyber-red)]/20 border-[var(--cyber-red)]/30 text-[var(--cyber-red)] hover:bg-[var(--cyber-red)]/30"
                >
                  Critical
                </Button>
                <Button
                  variant={selectedSeverity === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeverity(selectedSeverity === "high" ? "" : "high")}
                  className="bg-yellow-400/20 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/30"
                >
                  High
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSeverity("")}
                  className="bg-[var(--cyber-steel)]/50 border-gray-600 text-gray-400 hover:bg-gray-600"
                >
                  All
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {threats?.map((threat) => (
                <div key={threat.id} className={`${getSeverityBg(threat.severity)} border ${getSeverityColor(threat.severity)} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${threat.severity === 'critical' ? 'bg-[var(--cyber-red)]' : threat.severity === 'high' ? 'bg-yellow-400' : 'bg-orange-400'} rounded-full animate-pulse`}></div>
                      <h4 className="font-semibold text-white">{threat.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${getSeverityBadge(threat.severity)}`}>
                        {threat.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{getTimeAgo(threat.detectedAt!)}</div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{threat.description}</p>
                  
                  <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Source:</span>
                      <span className="text-white ml-1">{threat.sourceIp}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Target:</span>
                      <span className="text-white ml-1">{threat.targetHost}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Confidence:</span>
                      <span className="text-[var(--cyber-cyan)] ml-1">{threat.confidence}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span className={`ml-1 ${threat.status === 'active' ? 'text-[var(--cyber-red)]' : 'text-yellow-400'}`}>
                        {threat.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleThreatAction(threat.id, 'monitoring')}
                      className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
                      disabled={isLoading}
                    >
                      Investigate
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleThreatAction(threat.id, 'blocked')}
                      className="bg-[var(--cyber-red)] text-white hover:bg-red-600"
                      disabled={isLoading}
                    >
                      Block
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleThreatAction(threat.id, 'dismissed')}
                      className="bg-[var(--cyber-steel)] text-white hover:bg-gray-600"
                      disabled={isLoading}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="detection">
          <ThreatDetectionConfig />
        </TabsContent>

        <TabsContent value="rule-testing">
          <div className="space-y-4">
            <div className="bg-[var(--cyber-dark)] border border-[var(--cyber-cyan)]/30 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-[var(--cyber-cyan)] rounded-lg flex items-center justify-center">
                  <Terminal className="text-[var(--cyber-dark)] text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-orbitron font-bold text-[var(--cyber-cyan)]">Interactive Rule Testing Environment</h3>
                  <p className="text-gray-400">Test your detection rules against simulated attack scenarios and validate their effectiveness.</p>
                </div>
              </div>
            </div>
            <InteractiveRuleTesting />
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <AIThreatAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
}
