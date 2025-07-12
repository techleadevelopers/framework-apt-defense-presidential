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
  Gauge, RefreshCw, Terminal, Bug, Filter, Calendar, Bell, Factory,
  Fingerprint, Key, Layers
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

export default function EnterpriseNetworkScanner() {
  const [scanTarget, setScanTarget] = useState("192.168.1.0/24");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedScanType, setSelectedScanType] = useState("comprehensive");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [isVulnScanning, setIsVulnScanning] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false);
  const [vulnerabilityResults, setVulnerabilityResults] = useState<any[]>([]);
  const [complianceReport, setComplianceReport] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  
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
    },
    {
      id: "iot",
      name: "IoT & Smart Devices",
      subnet: "172.20.0.0/24",
      deviceCount: 89,
      riskLevel: "high",
      compliance: ["NIST IoT"],
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
    },
    {
      id: "discovery",
      name: "Asset Discovery",
      description: "Rapid network discovery and asset inventory",
      scope: ["all-segments"],
      scanType: "discovery",
      estimatedTime: "30-60 minutes",
      frequency: "daily"
    }
  ]);

  const [devices] = useState<NetworkDevice[]>([
    {
      id: 1,
      ipAddress: "172.16.0.10",
      hostname: "scada-hmi-01.critical.local",
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
      hostname: "web-proxy-01.dmz.local",
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
      hostname: "db-cluster-master.internal.local",
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
    },
    {
      id: 7,
      ipAddress: "172.20.0.45",
      hostname: "smart-camera-entrance-01",
      deviceType: "iot",
      operatingSystem: "IoT Linux",
      status: "online",
      services: ["80", "554", "8000"],
      riskScore: 70,
      compliance: ["NIST IoT"],
      lastScan: new Date(Date.now() - 6 * 60 * 60 * 1000),
      vulnerabilities: 2,
      criticality: "medium",
      department: "Security",
      owner: "Physical Security",
      location: "Main Entrance",
      networkSegment: "iot",
      encryptionStatus: "partial",
      patchLevel: "Outdated",
      uptime: "156 days",
      businessImpact: 40
    },
    {
      id: 8,
      ipAddress: "10.0.5.100",
      hostname: "file-server-finance",
      deviceType: "server",
      operatingSystem: "Windows Server 2019",
      status: "online",
      services: ["445", "135", "139"],
      riskScore: 55,
      compliance: ["SOX", "LGPD"],
      lastScan: new Date(Date.now() - 1 * 60 * 60 * 1000),
      vulnerabilities: 1,
      criticality: "high",
      department: "Finance",
      owner: "Finance IT",
      location: "Finance Wing - Server Room",
      networkSegment: "internal",
      encryptionStatus: "encrypted",
      patchLevel: "Current",
      uptime: "312 days",
      businessImpact: 80
    }
  ]);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 8000); // Longer scan time for enterprise features
  };

  const handleVulnerabilitySccan = async () => {
    setIsVulnScanning(true);
    
    // Simulate vulnerability scanning with realistic results
    setTimeout(() => {
      const mockVulnerabilities = [
        {
          id: "CVE-2024-0001",
          title: "Critical Buffer Overflow in SCADA HMI",
          severity: "Critical",
          cvssScore: 9.8,
          affectedDevice: "scada-hmi-01.critical.local",
          description: "Remote code execution vulnerability in HMI interface allowing unauthorized access to industrial controls",
          solution: "Upgrade to latest firmware version 3.2.1 and implement network segmentation",
          cveLink: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-0001",
          exploitAvailable: true,
          patchAvailable: true,
          discoveryDate: new Date(),
          riskLevel: "Immediate Action Required"
        },
        {
          id: "CVE-2023-4567",
          title: "SQL Injection in Database Cluster",
          severity: "High",
          cvssScore: 8.1,
          affectedDevice: "db-cluster-master.internal.local",
          description: "SQL injection vulnerability allows unauthorized data access and potential database compromise",
          solution: "Apply security patch DB-2024.01 and implement input validation",
          cveLink: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-4567",
          exploitAvailable: false,
          patchAvailable: true,
          discoveryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          riskLevel: "High Priority"
        },
        {
          id: "CVE-2023-8901",
          title: "Default Credentials in IoT Devices",
          severity: "Medium",
          cvssScore: 6.5,
          affectedDevice: "smart-camera-entrance-01",
          description: "Default administrative credentials discovered on IoT camera system",
          solution: "Change default passwords and implement strong authentication policies",
          cveLink: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-8901",
          exploitAvailable: true,
          patchAvailable: false,
          discoveryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          riskLevel: "Medium Priority"
        },
        {
          id: "CVE-2023-1234",
          title: "Privilege Escalation in Manufacturing PLC",
          severity: "Critical",
          cvssScore: 9.1,
          affectedDevice: "plc-manufacturing-line-3",
          description: "Local privilege escalation vulnerability in industrial PLC allowing full system compromise",
          solution: "Update PLC firmware to version 4.1.2 and review access controls",
          cveLink: "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-1234",
          exploitAvailable: true,
          patchAvailable: true,
          discoveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          riskLevel: "Immediate Action Required"
        }
      ];
      
      setVulnerabilityResults(mockVulnerabilities);
      setIsVulnScanning(false);
    }, 6000);
  };

  const generateComplianceReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate compliance report generation
    setTimeout(() => {
      const mockReport = {
        generatedDate: new Date(),
        reportId: "COMP-RPT-" + Date.now(),
        executiveSummary: {
          overallScore: 78,
          totalDevices: devices.length,
          compliantDevices: devices.filter(d => d.compliance.length > 0).length,
          criticalFindings: 3,
          recommendations: 8
        },
        frameworks: {
          "PCI-DSS": {
            score: 85,
            compliantDevices: devices.filter(d => d.compliance.includes("PCI-DSS")).length,
            findings: ["Payment processing systems properly segmented", "Encryption standards met"],
            issues: ["Some legacy systems require security updates"]
          },
          "ISO 27001": {
            score: 82,
            compliantDevices: devices.filter(d => d.compliance.includes("ISO 27001")).length,
            findings: ["Information security controls implemented", "Asset management documented"],
            issues: ["Risk assessment needs quarterly updates"]
          },
          "NIST CSF": {
            score: 75,
            compliantDevices: devices.filter(d => d.compliance.includes("NIST CSF")).length,
            findings: ["Incident response plan active", "Continuous monitoring enabled"],
            issues: ["Supply chain security requires enhancement"]
          },
          "SOX": {
            score: 90,
            compliantDevices: devices.filter(d => d.compliance.includes("SOX")).length,
            findings: ["Financial data properly protected", "Audit trails maintained"],
            issues: ["Minor documentation gaps identified"]
          }
        },
        criticalRecommendations: [
          "Immediate patching required for SCADA systems (CVE-2024-0001)",
          "Implement network micro-segmentation for critical infrastructure",
          "Update IoT device default credentials across all smart devices",
          "Enhance monitoring for industrial control systems"
        ],
        nextAuditDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      };
      
      setComplianceReport(mockReport);
      setIsGeneratingReport(false);
    }, 4000);
  };

  const generateAdvancedAnalytics = async () => {
    setShowAdvancedAnalytics(true);
    
    // Simulate advanced analytics data generation
    setTimeout(() => {
      const mockAnalytics = {
        networkHealth: {
          score: 78,
          trend: "improving",
          metrics: {
            uptime: 99.7,
            performance: 85,
            security: 72,
            compliance: 78
          }
        },
        riskTrends: [
          { date: "2024-01-01", risk: 85 },
          { date: "2024-01-08", risk: 82 },
          { date: "2024-01-15", risk: 78 },
          { date: "2024-01-22", risk: 75 },
          { date: "2024-01-29", risk: 72 }
        ],
        topRisks: [
          { category: "Unpatched Systems", count: 4, severity: "Critical" },
          { category: "Default Credentials", count: 7, severity: "High" },
          { category: "Unencrypted Traffic", count: 3, severity: "Medium" },
          { category: "Legacy Protocols", count: 12, severity: "Low" }
        ],
        departmentAnalysis: {
          "Operations": { devices: 3, avgRisk: 90, compliance: 67 },
          "IT Security": { devices: 1, avgRisk: 45, compliance: 100 },
          "Database Administration": { devices: 1, avgRisk: 75, compliance: 100 },
          "IT Infrastructure": { devices: 1, avgRisk: 60, compliance: 100 },
          "Manufacturing": { devices: 1, avgRisk: 85, compliance: 50 },
          "Security": { devices: 1, avgRisk: 70, compliance: 50 }
        },
        predictiveInsights: [
          "Manufacturing systems show 85% probability of security incident within 30 days",
          "IoT device vulnerabilities expected to increase by 23% next quarter",
          "Network segmentation improvements could reduce risk by 40%",
          "Automated patch management could improve compliance score by 15 points"
        ]
      };
      
      setAnalyticsData(mockAnalytics);
    }, 2000);
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
        return Factory;
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
      {/* Enterprise Scanner Header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--cyber-cyan)]/20 rounded-lg">
                <Network className="w-6 h-6 text-[var(--cyber-cyan)]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Devices</p>
                <p className="text-2xl font-bold text-white">{devices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Critical Assets</p>
                <p className="text-2xl font-bold text-red-400">
                  {devices.filter(d => d.criticality === 'critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Bug className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Vulnerabilities</p>
                <p className="text-2xl font-bold text-orange-400">
                  {devices.reduce((sum, d) => sum + d.vulnerabilities, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Compliance</p>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round((devices.filter(d => d.compliance.length > 0).length / devices.length) * 100)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Layers className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Network Segments</p>
                <p className="text-2xl font-bold text-purple-400">{networkSegments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Scanner Controls */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)] flex items-center justify-between">
            <span className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Enterprise Network Scanner
            </span>
            <div className="flex space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Advanced Enterprise
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                AI-Powered
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scan Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Scan Template</label>
              <Select value={selectedScanType} onValueChange={setSelectedScanType}>
                <SelectTrigger className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <SelectValue placeholder="Select scan type" />
                </SelectTrigger>
                <SelectContent>
                  {scanTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Network Segment</label>
              <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                <SelectTrigger className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Segments</SelectItem>
                  {networkSegments.map(segment => (
                    <SelectItem key={segment.id} value={segment.id}>
                      {segment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Custom Target</label>
              <Input
                placeholder="192.168.1.0/24 or specific IP"
                value={scanTarget}
                onChange={(e) => setScanTarget(e.target.value)}
                className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30"
              />
            </div>
          </div>

          {/* Selected Template Info */}
          {selectedScanType && (
            <div className="bg-[var(--cyber-navy)]/30 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
              {(() => {
                const template = scanTemplates.find(t => t.id === selectedScanType);
                return template ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-300">{template.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-[var(--cyber-cyan)]" />
                        <span className="text-gray-300">{template.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-[var(--cyber-cyan)]" />
                        <span className="text-gray-300">{template.frequency}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={handleScan}
                        disabled={isScanning}
                        className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
                      >
                        {isScanning ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Target className="w-4 h-4 mr-2" />
                        )}
                        {isScanning ? "Scanning..." : "Execute Scan"}
                      </Button>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Scanning Progress */}
          {isScanning && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Enterprise Scan Progress</span>
                <span className="text-sm text-[var(--cyber-cyan)]">Analyzing network topology...</span>
              </div>
              <Progress value={75} className="w-full" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Discovery: Complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-gray-300">Port Scan: In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <span className="text-gray-300">Vuln Assessment: Starting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">Compliance: Pending</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[var(--cyber-navy)]">
          <TabsTrigger value="devices" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Monitor className="w-4 h-4 mr-2" />
            Devices
          </TabsTrigger>
          <TabsTrigger value="segments" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Network className="w-4 h-4 mr-2" />
            Segments
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Bug className="w-4 h-4 mr-2" />
            Vulnerabilities
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Shield className="w-4 h-4 mr-2" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Devices Tab */}
        <TabsContent value="devices" className="space-y-6">
          {/* Device Filters */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-[var(--cyber-cyan)]" />
                  <span className="text-sm font-medium text-gray-300">Filters:</span>
                </div>
                
                <Select value={filterCriteria} onValueChange={setFilterCriteria}>
                  <SelectTrigger className="w-48 bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                    <SelectValue placeholder="Filter devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="critical">Critical Only</SelectItem>
                    <SelectItem value="vulnerable">With Vulnerabilities</SelectItem>
                    <SelectItem value="unencrypted">Unencrypted</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>Showing {filteredDevices.length} of {devices.length} devices</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Online: {devices.filter(d => d.status === 'online').length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Device Grid */}
          {filteredDevices.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDevices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.deviceType);
                const StatusIcon = getStatusIcon(device.status);
                
                return (
                  <Card key={device.id} className="glass-panel border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[var(--cyber-cyan)]/20 rounded-lg">
                            <DeviceIcon className="w-6 h-6 text-[var(--cyber-cyan)]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm">{device.hostname}</h3>
                            <p className="text-xs text-gray-400">{device.ipAddress}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(device.status)}`} />
                          <Badge className={getCriticalityColor(device.criticality)} size="sm">
                            {device.criticality}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      {/* Risk Score */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Risk Score</span>
                        <div className="flex items-center space-x-2">
                          <div className={`text-sm font-bold ${getRiskColor(device.riskScore)}`}>
                            {device.riskScore}/100
                          </div>
                          <Gauge className={`w-3 h-3 ${getRiskColor(device.riskScore)}`} />
                        </div>
                      </div>

                      {/* Business Impact */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Business Impact</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={device.businessImpact} className="w-12 h-1" />
                          <span className="text-xs text-white">{device.businessImpact}%</span>
                        </div>
                      </div>

                      {/* Key Information Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-400 block">Department</span>
                          <span className="text-white">{device.department}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Owner</span>
                          <span className="text-white">{device.owner}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Location</span>
                          <span className="text-white">{device.location}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Segment</span>
                          <span className="text-white capitalize">{device.networkSegment}</span>
                        </div>
                      </div>

                      {/* Security Status */}
                      <div className="flex items-center justify-between p-2 bg-[var(--cyber-navy)]/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getEncryptionIcon(device.encryptionStatus)}
                          <span className="text-xs text-gray-300">Encryption</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {device.vulnerabilities > 0 ? (
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                          ) : (
                            <CheckCircle className="w-3 h-3 text-green-400" />
                          )}
                          <span className="text-xs text-gray-300">
                            {device.vulnerabilities} vulns
                          </span>
                        </div>
                      </div>

                      {/* Compliance Badges */}
                      {device.compliance.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {device.compliance.slice(0, 2).map(standard => (
                            <Badge key={standard} variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                              {standard}
                            </Badge>
                          ))}
                          {device.compliance.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-gray-500/20 text-gray-400 border-gray-500/30">
                              +{device.compliance.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1 border-[var(--cyber-cyan)]/30 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-[var(--cyber-cyan)]/30 text-xs">
                          <Target className="w-3 h-3 mr-1" />
                          Scan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardContent className="text-center py-12">
                <Network className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                <h3 className="text-lg font-semibold text-white mb-2">No Devices Found</h3>
                <p className="text-gray-400 mb-4">
                  No devices match the current filter criteria. Try adjusting your filters or running a new scan.
                </p>
                <Button 
                  onClick={handleScan}
                  className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Network Discovery
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Network Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {networkSegments.map(segment => (
              <Card key={segment.id} className="glass-panel border-[var(--cyber-cyan)]/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getSegmentIcon(segment.isolationStatus)}
                      <div>
                        <CardTitle className="text-white">{segment.name}</CardTitle>
                        <p className="text-sm text-gray-400">{segment.subnet}</p>
                      </div>
                    </div>
                    <Badge className={getCriticalityColor(segment.riskLevel)}>
                      {segment.riskLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-400 block">Devices</span>
                      <span className="text-lg font-bold text-white">{segment.deviceCount}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 block">Isolation</span>
                      <span className="text-sm text-white capitalize">{segment.isolationStatus}</span>
                    </div>
                  </div>
                  
                  {segment.compliance.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-400 block mb-2">Compliance</span>
                      <div className="flex flex-wrap gap-1">
                        {segment.compliance.map(standard => (
                          <Badge key={standard} variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                            {standard}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-[var(--cyber-cyan)]/30"
                    onClick={() => setSelectedSegment(segment.id)}
                  >
                    <Target className="w-3 h-3 mr-2" />
                    Scan Segment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="space-y-4 sm:space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="flex items-center text-sm sm:text-base">
                  <Bug className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Enterprise Vulnerability Assessment
                </span>
                {vulnerabilityResults.length > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 w-fit">
                    {vulnerabilityResults.length} CVEs Found
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                <Card className="bg-[var(--cyber-navy)]/30 border-red-500/30">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-400" />
                    <p className="text-base sm:text-lg font-bold text-red-400">
                      {devices.filter(d => d.vulnerabilities > 0).length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">Vulnerable Devices</p>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--cyber-navy)]/30 border-orange-500/30">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Bug className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-orange-400" />
                    <p className="text-base sm:text-lg font-bold text-orange-400">
                      {devices.reduce((sum, d) => sum + d.vulnerabilities, 0)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">Total Vulnerabilities</p>
                  </CardContent>
                </Card>
                <Card className="bg-[var(--cyber-navy)]/30 border-yellow-500/30 sm:col-span-2 lg:col-span-1">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-yellow-400" />
                    <p className="text-base sm:text-lg font-bold text-yellow-400">
                      {devices.filter(d => d.patchLevel === 'Outdated').length}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">Outdated Systems</p>
                  </CardContent>
                </Card>
              </div>

              {/* Scan Controls */}
              <div className="text-center space-y-3">
                <p className="text-gray-400 text-sm sm:text-base">Comprehensive vulnerability scanning and CVE mapping capabilities.</p>
                <Button 
                  onClick={handleVulnerabilitySccan}
                  disabled={isVulnScanning}
                  className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] w-full sm:w-auto"
                >
                  {isVulnScanning ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Bug className="w-4 h-4 mr-2" />
                  )}
                  {isVulnScanning ? "Scanning..." : "Start Vulnerability Scan"}
                </Button>
              </div>

              {/* Vulnerability Results */}
              {vulnerabilityResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Vulnerability Findings</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {vulnerabilityResults.map((vuln, index) => (
                      <Card key={index} className="bg-[var(--cyber-navy)]/30 border-red-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div className="flex-1">
                              <CardTitle className="text-sm sm:text-base text-white">{vuln.title}</CardTitle>
                              <p className="text-xs sm:text-sm text-gray-400">{vuln.id}</p>
                            </div>
                            <div className="flex flex-row sm:flex-col gap-2">
                              <Badge className={
                                vuln.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                              }>
                                {vuln.severity}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                CVSS: {vuln.cvssScore}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-xs sm:text-sm text-gray-300">{vuln.description}</p>
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="text-xs text-gray-400">Affected Device:</span>
                              <span className="text-xs text-white break-all">{vuln.affectedDevice}</span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                              <span className="text-xs text-gray-400">Risk Level:</span>
                              <span className="text-xs text-red-400">{vuln.riskLevel}</span>
                            </div>
                          </div>
                          <div className="bg-[var(--cyber-dark)]/50 p-3 rounded-lg">
                            <h4 className="text-xs font-semibold text-[var(--cyber-cyan)] mb-1">Solution:</h4>
                            <p className="text-xs text-gray-300">{vuln.solution}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button size="sm" variant="outline" className="flex-1 border-[var(--cyber-cyan)]/30 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              View CVE
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 border-[var(--cyber-cyan)]/30 text-xs">
                              <Target className="w-3 h-3 mr-1" />
                              Apply Fix
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Scanning Progress */}
              {isVulnScanning && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm text-gray-300">Vulnerability Scan Progress</span>
                    <span className="text-sm text-[var(--cyber-cyan)]">Analyzing CVE database...</span>
                  </div>
                  <Progress value={65} className="w-full" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                      <span className="text-gray-300">Port Analysis: Complete</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 animate-pulse" />
                      <span className="text-gray-300">CVE Matching: Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 animate-pulse" />
                      <span className="text-gray-300">Exploit Check: Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                      <span className="text-gray-300">Report: Pending</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Enterprise Compliance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['PCI-DSS', 'SOX', 'ISO 27001', 'LGPD', 'NIST CSF', 'IEC 61850'].map(framework => {
                  const compliantDevices = devices.filter(d => d.compliance.includes(framework)).length;
                  const percentage = Math.round((compliantDevices / devices.length) * 100);
                  
                  return (
                    <Card key={framework} className="bg-[var(--cyber-navy)]/30 border-[var(--cyber-cyan)]/20">
                      <CardContent className="p-4">
                        <div className="text-center">
                          <h3 className="font-semibold text-white mb-2">{framework}</h3>
                          <div className="text-2xl font-bold text-[var(--cyber-cyan)] mb-2">{percentage}%</div>
                          <Progress value={percentage} className="w-full" />
                          <p className="text-xs text-gray-400 mt-1">
                            {compliantDevices}/{devices.length} devices
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-4">Multi-framework compliance monitoring across all network segments.</p>
                <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Compliance Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Enterprise Network Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[var(--cyber-navy)]/30 border-[var(--cyber-cyan)]/20">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Device Types Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(
                        devices.reduce((acc, device) => {
                          acc[device.deviceType] = (acc[device.deviceType] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>)
                      ).map(([type, count]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="text-sm text-gray-300 capitalize">{type}</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={(count / devices.length) * 100} className="w-20" />
                            <span className="text-sm text-white">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-[var(--cyber-navy)]/30 border-[var(--cyber-cyan)]/20">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Risk Score Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-400">High Risk (80-100)</span>
                        <span className="text-sm text-white">
                          {devices.filter(d => d.riskScore >= 80).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-400">Medium Risk (60-79)</span>
                        <span className="text-sm text-white">
                          {devices.filter(d => d.riskScore >= 60 && d.riskScore < 80).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-yellow-400">Low Risk (40-59)</span>
                        <span className="text-sm text-white">
                          {devices.filter(d => d.riskScore >= 40 && d.riskScore < 60).length}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-400">Minimal Risk (0-39)</span>
                        <span className="text-sm text-white">
                          {devices.filter(d => d.riskScore < 40).length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <p className="text-gray-400 mb-4">Advanced analytics with ML-powered insights and predictive modeling.</p>
                <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Advanced Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}