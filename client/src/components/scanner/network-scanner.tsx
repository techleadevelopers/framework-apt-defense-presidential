import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Wifi, WifiOff, Monitor, Smartphone, Router, Server, Shield, AlertTriangle, 
  Network, Globe, Eye, Clock, Target, Activity, Zap, Settings, Database,
  Lock, CheckCircle, XCircle, FileText, Download, Upload, Search, MapPin,
  TrendingUp, BarChart3, Users, Building, Cloud, HardDrive, Cpu, 
  Gauge, RefreshCw, Terminal, Bug, Filter, Calendar, Bell
} from "lucide-react";

interface NetworkDevice {
  id: number;
  ipAddress: string;
  hostname: string;
  deviceType: string;
  operatingSystem: string;
  status: string;
  services: string[];
  // Enterprise additions
  riskScore: number;
  compliance: string[];
  lastScan: Date;
  vulnerabilities: number;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  department: string;
  owner: string;
  location: string;
  networkSegment: string;
  encryptionStatus: 'encrypted' | 'partial' | 'none';
  patchLevel: string;
  uptime: string;
  businessImpact: number;
}

interface NetworkSegment {
  id: string;
  name: string;
  subnet: string;
  deviceCount: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  compliance: string[];
  isolationStatus: 'isolated' | 'partial' | 'connected';
}

interface ScanTemplate {
  id: string;
  name: string;
  description: string;
  scope: string[];
  scanType: 'comprehensive' | 'security' | 'compliance' | 'vulnerability' | 'discovery';
  estimatedTime: string;
  frequency: 'manual' | 'daily' | 'weekly' | 'monthly';
}

export default function NetworkScanner() {
  const [scanTarget, setScanTarget] = useState("192.168.1.0/24");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedScanType, setSelectedScanType] = useState("comprehensive");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [filterCriteria, setFilterCriteria] = useState("all");
  
  const [networkSegments] = useState<NetworkSegment[]>([
    {
      id: "dmz",
      name: "DMZ Zone",
      subnet: "192.168.10.0/24",
      deviceCount: 12,
      riskLevel: "high",
      compliance: ["PCI-DSS", "SOX"],
      isolationStatus: "partial"
    },
    {
      id: "internal",
      name: "Internal Network",
      subnet: "10.0.0.0/16",
      deviceCount: 245,
      riskLevel: "medium",
      compliance: ["ISO 27001", "LGPD"],
      isolationStatus: "connected"
    },
    {
      id: "critical",
      name: "Critical Infrastructure",
      subnet: "172.16.0.0/24",
      deviceCount: 18,
      riskLevel: "critical",
      compliance: ["NIST CSF", "IEC 61850"],
      isolationStatus: "isolated"
    },
    {
      id: "guest",
      name: "Guest Network",
      subnet: "192.168.100.0/24",
      deviceCount: 35,
      riskLevel: "low",
      compliance: [],
      isolationStatus: "isolated"
    }
  ]);

  const [scanTemplates] = useState<ScanTemplate[]>([
    {
      id: "comprehensive",
      name: "Comprehensive Enterprise Scan",
      description: "Full network discovery with security and compliance assessment",
      scope: ["all-segments"],
      scanType: "comprehensive",
      estimatedTime: "2-4 hours",
      frequency: "weekly"
    },
    {
      id: "security",
      name: "Security Assessment",
      description: "Focus on vulnerability detection and security posture",
      scope: ["critical", "dmz"],
      scanType: "security",
      estimatedTime: "1-2 hours",
      frequency: "daily"
    },
    {
      id: "compliance",
      name: "Compliance Audit",
      description: "Verify compliance with regulatory frameworks",
      scope: ["all-segments"],
      scanType: "compliance",
      estimatedTime: "3-6 hours",
      frequency: "monthly"
    },
    {
      id: "vulnerability",
      name: "Vulnerability Assessment",
      description: "Deep dive vulnerability scanning with CVE mapping",
      scope: ["critical", "internal"],
      scanType: "vulnerability",
      estimatedTime: "4-8 hours",
      frequency: "weekly"
    }
  ]);

  const [devices] = useState<NetworkDevice[]>([
    {
      id: 1,
      ipAddress: "172.16.0.10",
      hostname: "scada-hmi-01",
      deviceType: "industrial",
      operatingSystem: "Windows Server 2019",
      status: "online",
      services: ["502", "102", "80", "443"],
      riskScore: 95,
      compliance: ["NIST CSF", "IEC 61850"],
      lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000),
      vulnerabilities: 3,
      criticality: "critical",
      department: "Operations",
      owner: "SCADA Team",
      location: "Control Room A",
      networkSegment: "critical",
      encryptionStatus: "partial",
      patchLevel: "Outdated",
      uptime: "847 days",
      businessImpact: 100
    },
    {
      id: 2,
      ipAddress: "192.168.10.5",
      hostname: "web-proxy-01",
      deviceType: "security",
      operatingSystem: "pfSense 2.7",
      status: "online",
      services: ["80", "443", "8080", "3128"],
      riskScore: 45,
      compliance: ["PCI-DSS", "SOX"],
      lastScan: new Date(Date.now() - 1 * 60 * 60 * 1000),
      vulnerabilities: 1,
      criticality: "high",
      department: "IT Security",
      owner: "Security Team",
      location: "DMZ Rack 1",
      networkSegment: "dmz",
      encryptionStatus: "encrypted",
      patchLevel: "Current",
      uptime: "125 days",
      businessImpact: 85
    },
    {
      id: 3,
      ipAddress: "10.0.1.250",
      hostname: "db-cluster-master",
      deviceType: "database",
      operatingSystem: "Red Hat Enterprise Linux 9",
      status: "online",
      services: ["3306", "33060", "22"],
      riskScore: 75,
      compliance: ["ISO 27001", "LGPD", "PCI-DSS"],
      lastScan: new Date(Date.now() - 30 * 60 * 1000),
      vulnerabilities: 2,
      criticality: "critical",
      department: "Database Administration",
      owner: "DBA Team",
      location: "Data Center B - Rack 12",
      networkSegment: "internal",
      encryptionStatus: "encrypted",
      patchLevel: "Current",
      uptime: "456 days",
      businessImpact: 95
    },
    {
      id: 4,
      ipAddress: "10.0.2.15",
      hostname: "dc-01.corporate.local",
      deviceType: "server",
      operatingSystem: "Windows Server 2022",
      status: "online",
      services: ["53", "88", "135", "389", "636", "3268", "3269"],
      riskScore: 60,
      compliance: ["ISO 27001", "SOX"],
      lastScan: new Date(Date.now() - 45 * 60 * 1000),
      vulnerabilities: 1,
      criticality: "critical",
      department: "IT Infrastructure",
      owner: "Active Directory Team",
      location: "Data Center A - Rack 5",
      networkSegment: "internal",
      encryptionStatus: "encrypted",
      patchLevel: "Current",
      uptime: "234 days",
      businessImpact: 90
    },
    {
      id: 5,
      ipAddress: "192.168.100.42",
      hostname: "guest-wifi-ap-12",
      deviceType: "wireless",
      operatingSystem: "UniFi OS",
      status: "online",
      services: ["22", "80", "443", "8080"],
      riskScore: 25,
      compliance: [],
      lastScan: new Date(Date.now() - 3 * 60 * 60 * 1000),
      vulnerabilities: 0,
      criticality: "low",
      department: "Facilities",
      owner: "Network Team",
      location: "Building C - Floor 2",
      networkSegment: "guest",
      encryptionStatus: "encrypted",
      patchLevel: "Current",
      uptime: "89 days",
      businessImpact: 10
    },
    {
      id: 6,
      ipAddress: "172.16.0.25",
      hostname: "plc-manufacturing-line-3",
      deviceType: "iot",
      operatingSystem: "Embedded Linux",
      status: "online",
      services: ["502", "44818"],
      riskScore: 85,
      compliance: ["IEC 61850"],
      lastScan: new Date(Date.now() - 4 * 60 * 60 * 1000),
      vulnerabilities: 4,
      criticality: "critical",
      department: "Manufacturing",
      owner: "Operations Team",
      location: "Factory Floor - Line 3",
      networkSegment: "critical",
      encryptionStatus: "none",
      patchLevel: "Outdated",
      uptime: "1,234 days",
      businessImpact: 100
    }
  ]);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 8000); // Longer scan time for enterprise features
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'computer':
      case 'workstation':
        return Monitor;
      case 'mobile':
      case 'phone':
        return Smartphone;
      case 'router':
      case 'gateway':
        return Router;
      case 'server':
        return Server;
      case 'database':
        return Database;
      case 'security':
        return Shield;
      case 'industrial':
      case 'iot':
        return Cpu;
      case 'wireless':
        return Wifi;
      case 'cloud':
        return Cloud;
      default:
        return Monitor;
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore >= 80) return 'text-red-400';
    if (riskScore >= 60) return 'text-orange-400';
    if (riskScore >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEncryptionIcon = (status: string) => {
    switch (status) {
      case 'encrypted': return <Lock className="w-4 h-4 text-green-400" />;
      case 'partial': return <Lock className="w-4 h-4 text-yellow-400" />;
      case 'none': return <Lock className="w-4 h-4 text-red-400" />;
      default: return <Lock className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredDevices = devices.filter(device => {
    if (selectedSegment !== "all" && device.networkSegment !== selectedSegment) return false;
    if (filterCriteria === "critical" && device.criticality !== "critical") return false;
    if (filterCriteria === "vulnerable" && device.vulnerabilities === 0) return false;
    if (filterCriteria === "unencrypted" && device.encryptionStatus === "encrypted") return false;
    return true;
  });

  const getSegmentIcon = (isolationStatus: string) => {
    switch (isolationStatus) {
      case 'isolated': return <Shield className="w-4 h-4 text-green-400" />;
      case 'partial': return <Shield className="w-4 h-4 text-yellow-400" />;
      case 'connected': return <Globe className="w-4 h-4 text-blue-400" />;
      default: return <Network className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? CheckCircle : XCircle;
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Network Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Target (e.g., 192.168.1.0/24)"
              value={scanTarget}
              onChange={(e) => setScanTarget(e.target.value)}
              className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30"
            />
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
            >
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
          </div>
          
          {isScanning && (
            <div className="w-full bg-[var(--cyber-steel)] rounded-full h-2">
              <div className="bg-[var(--cyber-cyan)] h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scanner Results */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Discovered Devices</CardTitle>
        </CardHeader>
        <CardContent>
          {devices && devices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.deviceType || 'unknown');
                const StatusIcon = getStatusIcon(device.status);
                
                return (
                  <div key={device.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="w-5 h-5 text-[var(--cyber-cyan)]" />
                        <span className="font-medium">{device.hostname || 'Unknown Device'}</span>
                      </div>
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(device.status)}`} />
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-gray-400">IP:</span>
                        <span className="text-white ml-1">{device.ipAddress}</span>
                      </div>
                      
                      {device.operatingSystem && (
                        <div>
                          <span className="text-gray-400">OS:</span>
                          <span className="text-white ml-1">{device.operatingSystem}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-gray-400">Status:</span>
                        <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                          {device.status}
                        </Badge>
                      </div>
                      
                      {device.services && Array.isArray(device.services) && device.services.length > 0 && (
                        <div className="mt-2">
                          <span className="text-gray-400 text-xs">Services:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {device.services.slice(0, 3).map((service: any, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service.port || service}
                              </Badge>
                            ))}
                            {device.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{device.services.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Monitor className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No devices discovered yet. Start a network scan to discover devices.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Network Topology (Placeholder) */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Network Topology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-[var(--cyber-dark)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Router className="w-12 h-12 text-[var(--cyber-cyan)] mx-auto mb-2" />
              <p className="text-gray-400">Network topology visualization would be rendered here</p>
              <p className="text-xs text-gray-500 mt-1">Using D3.js or similar visualization library</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
