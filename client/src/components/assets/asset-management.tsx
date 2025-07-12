import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Monitor, 
  Smartphone, 
  Router, 
  Database, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  MapPin,
  User,
  Calendar,
  Activity
} from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: "server" | "workstation" | "mobile" | "network" | "database" | "application";
  category: string;
  ipAddress?: string;
  macAddress?: string;
  operatingSystem: string;
  version: string;
  owner: string;
  location: string;
  department: string;
  criticality: "critical" | "high" | "medium" | "low";
  status: "online" | "offline" | "maintenance" | "decommissioned";
  lastSeen: Date;
  discoveredDate: Date;
  vulnerabilities: number;
  patchLevel: string;
  antivirusStatus: "protected" | "outdated" | "disabled" | "not-installed";
  tags: string[];
  compliance: {
    pci: boolean;
    sox: boolean;
    hipaa: boolean;
    lgpd: boolean;
  };
}

export default function AssetManagement() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCriticality, setFilterCriticality] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Mock assets data
  useEffect(() => {
    const mockAssets: Asset[] = [
      {
        id: "AST-001",
        name: "SRV-DC01",
        type: "server",
        category: "Domain Controller",
        ipAddress: "10.0.1.10",
        macAddress: "00:1B:63:84:45:E6",
        operatingSystem: "Windows Server 2022",
        version: "21H2",
        owner: "IT Department",
        location: "Data Center A - Rack 15",
        department: "Infrastructure",
        criticality: "critical",
        status: "online",
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
        discoveredDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        vulnerabilities: 3,
        patchLevel: "Current",
        antivirusStatus: "protected",
        tags: ["domain-controller", "active-directory", "authentication"],
        compliance: {
          pci: true,
          sox: true,
          hipaa: false,
          lgpd: true
        }
      },
      {
        id: "AST-002",
        name: "SRV-WEB01",
        type: "server",
        category: "Web Server",
        ipAddress: "10.0.2.50",
        macAddress: "00:1B:63:84:45:E7",
        operatingSystem: "Ubuntu Server 22.04",
        version: "22.04.3",
        owner: "Development Team",
        location: "Data Center A - Rack 12",
        department: "Development",
        criticality: "high",
        status: "online",
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        discoveredDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        vulnerabilities: 1,
        patchLevel: "Current",
        antivirusStatus: "not-installed",
        tags: ["web-server", "nginx", "production"],
        compliance: {
          pci: true,
          sox: false,
          hipaa: false,
          lgpd: true
        }
      },
      {
        id: "AST-003",
        name: "WKSTN-1247",
        type: "workstation",
        category: "Employee Workstation",
        ipAddress: "10.0.3.147",
        macAddress: "00:1B:63:84:45:E8",
        operatingSystem: "Windows 11 Pro",
        version: "23H2",
        owner: "Ana Silva",
        location: "Building B - Floor 3 - Desk 47",
        department: "Security Operations",
        criticality: "medium",
        status: "online",
        lastSeen: new Date(Date.now() - 15 * 60 * 1000),
        discoveredDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        vulnerabilities: 0,
        patchLevel: "Current",
        antivirusStatus: "protected",
        tags: ["analyst-workstation", "soc-team"],
        compliance: {
          pci: false,
          sox: false,
          hipaa: false,
          lgpd: true
        }
      },
      {
        id: "AST-004",
        name: "SW-CORE01",
        type: "network",
        category: "Core Switch",
        ipAddress: "10.0.0.1",
        macAddress: "00:1B:63:84:45:E9",
        operatingSystem: "Cisco IOS",
        version: "15.2(7)E3",
        owner: "Network Team",
        location: "Data Center A - Network Rack",
        department: "Infrastructure",
        criticality: "critical",
        status: "online",
        lastSeen: new Date(Date.now() - 1 * 60 * 1000),
        discoveredDate: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000),
        vulnerabilities: 2,
        patchLevel: "Outdated",
        antivirusStatus: "not-installed",
        tags: ["core-network", "switch", "infrastructure"],
        compliance: {
          pci: true,
          sox: true,
          hipaa: false,
          lgpd: false
        }
      },
      {
        id: "AST-005",
        name: "DB-PROD01",
        type: "database",
        category: "Production Database",
        ipAddress: "10.0.1.100",
        macAddress: "00:1B:63:84:45:EA",
        operatingSystem: "Red Hat Enterprise Linux 9",
        version: "9.3",
        owner: "Database Team",
        location: "Data Center B - Rack 5",
        department: "Data Management",
        criticality: "critical",
        status: "online",
        lastSeen: new Date(Date.now() - 3 * 60 * 1000),
        discoveredDate: new Date(Date.now() - 500 * 24 * 60 * 60 * 1000),
        vulnerabilities: 1,
        patchLevel: "Current",
        antivirusStatus: "protected",
        tags: ["database", "production", "mysql"],
        compliance: {
          pci: true,
          sox: true,
          hipaa: true,
          lgpd: true
        }
      },
      {
        id: "AST-006",
        name: "FW-PERIMETER",
        type: "network",
        category: "Firewall",
        ipAddress: "192.168.1.1",
        operatingSystem: "FortiOS",
        version: "7.4.2",
        owner: "Security Team",
        location: "Data Center A - Security Rack",
        department: "Cybersecurity",
        criticality: "critical",
        status: "online",
        lastSeen: new Date(Date.now() - 30 * 1000),
        discoveredDate: new Date(Date.now() - 400 * 24 * 60 * 60 * 1000),
        vulnerabilities: 0,
        patchLevel: "Current",
        antivirusStatus: "not-installed",
        tags: ["firewall", "perimeter", "security"],
        compliance: {
          pci: true,
          sox: true,
          hipaa: true,
          lgpd: true
        }
      }
    ];
    setAssets(mockAssets);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "server": return <Server className="w-5 h-5" />;
      case "workstation": return <Monitor className="w-5 h-5" />;
      case "mobile": return <Smartphone className="w-5 h-5" />;
      case "network": return <Router className="w-5 h-5" />;
      case "database": return <Database className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-100 text-green-800 border-green-200";
      case "offline": return "bg-red-100 text-red-800 border-red-200";
      case "maintenance": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "decommissioned": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAntivirusColor = (status: string) => {
    switch (status) {
      case "protected": return "text-green-400";
      case "outdated": return "text-yellow-400";
      case "disabled": return "text-red-400";
      case "not-installed": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  const filteredAssets = assets.filter(asset => {
    const typeMatch = filterType === "all" || asset.type === filterType;
    const statusMatch = filterStatus === "all" || asset.status === filterStatus;
    const criticalityMatch = filterCriticality === "all" || asset.criticality === filterCriticality;
    const searchMatch = searchTerm === "" || 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.operatingSystem.toLowerCase().includes(searchTerm.toLowerCase());
    
    return typeMatch && statusMatch && criticalityMatch && searchMatch;
  });

  const assetStats = {
    total: assets.length,
    online: assets.filter(a => a.status === "online").length,
    critical: assets.filter(a => a.criticality === "critical").length,
    vulnerable: assets.filter(a => a.vulnerabilities > 0).length,
    outdatedPatches: assets.filter(a => a.patchLevel === "Outdated").length,
    unprotected: assets.filter(a => a.antivirusStatus !== "protected").length
  };

  const typeDistribution = {
    server: assets.filter(a => a.type === "server").length,
    workstation: assets.filter(a => a.type === "workstation").length,
    network: assets.filter(a => a.type === "network").length,
    database: assets.filter(a => a.type === "database").length,
    mobile: assets.filter(a => a.type === "mobile").length,
    application: assets.filter(a => a.type === "application").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">Asset Management & Inventory</h1>
          <p className="text-gray-400">Inventário detalhado de todos os ativos de TI da organização</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Discovery Scan
          </Button>
          <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
            <Plus className="w-4 h-4 mr-2" />
            Add Asset
          </Button>
          <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
            <Download className="w-4 h-4 mr-2" />
            Export Inventory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{assetStats.total}</div>
            <div className="text-xs text-gray-400">Total Assets</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{assetStats.online}</div>
            <div className="text-xs text-gray-400">Online</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{assetStats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{assetStats.vulnerable}</div>
            <div className="text-xs text-gray-400">Vulnerable</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{assetStats.outdatedPatches}</div>
            <div className="text-xs text-gray-400">Outdated Patches</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{assetStats.unprotected}</div>
            <div className="text-xs text-gray-400">Unprotected</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
          <TabsTrigger value="topology">Network Topology</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assets by name, IP, owner, OS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white placeholder-gray-400"
              />
            </div>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Types</option>
              <option value="server">Server</option>
              <option value="workstation">Workstation</option>
              <option value="network">Network</option>
              <option value="database">Database</option>
              <option value="mobile">Mobile</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select 
              value={filterCriticality} 
              onChange={(e) => setFilterCriticality(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Criticality</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Asset List */}
          <div className="space-y-3">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 cursor-pointer"
                    onClick={() => setSelectedAsset(asset)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(asset.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                        <p className="text-sm text-gray-400">{asset.category}</p>
                      </div>
                      <Badge className={getCriticalityColor(asset.criticality)}>
                        {asset.criticality.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(asset.status)}>
                        {asset.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>{asset.id}</div>
                      <div>Last seen: {getTimeAgo(asset.lastSeen)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">IP Address:</span>
                      <span className="text-[var(--cyber-cyan)] ml-2">{asset.ipAddress || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">OS:</span>
                      <span className="text-white ml-2">{asset.operatingSystem}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Owner:</span>
                      <span className="text-white ml-2">{asset.owner}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white ml-2">{asset.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {asset.vulnerabilities > 0 && (
                        <div className="flex items-center space-x-1 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm">{asset.vulnerabilities} vulnerabilities</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Shield className={`w-4 h-4 ${getAntivirusColor(asset.antivirusStatus)}`} />
                        <span className="text-sm text-gray-300">{asset.antivirusStatus}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{asset.patchLevel}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {asset.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="topology" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(typeDistribution).map(([type, count]) => (
              <Card key={type} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                    {getTypeIcon(type)}
                    <span>{type.charAt(0).toUpperCase() + type.slice(1)}s</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-white mb-2">{count}</div>
                  <div className="text-sm text-gray-400">
                    {assets.filter(a => a.type === type && a.status === "online").length} online
                  </div>
                  <Progress 
                    value={(assets.filter(a => a.type === type && a.status === "online").length / count) * 100} 
                    className="h-2 mt-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)]">Network Topology Map</CardTitle>
              <CardDescription>Visualização da topologia de rede e conexões entre ativos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center text-gray-400 border border-[var(--cyber-cyan)]/20 rounded">
                <div className="text-center">
                  <Router className="w-16 h-16 mx-auto mb-4 text-[var(--cyber-cyan)]" />
                  <p>Interactive Network Topology Visualization</p>
                  <p className="text-sm mt-2">Mostra conexões entre {assetStats.total} ativos descobertos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["PCI-DSS", "SOX", "HIPAA", "LGPD"].map((compliance) => {
              const compliantAssets = assets.filter(asset => {
                switch (compliance) {
                  case "PCI-DSS": return asset.compliance.pci;
                  case "SOX": return asset.compliance.sox;
                  case "HIPAA": return asset.compliance.hipaa;
                  case "LGPD": return asset.compliance.lgpd;
                  default: return false;
                }
              }).length;
              
              const compliancePercentage = (compliantAssets / assets.length) * 100;
              
              return (
                <Card key={compliance} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <CardHeader>
                    <CardTitle className="text-[var(--cyber-cyan)] flex items-center justify-between">
                      <span>{compliance} Compliance</span>
                      <span className="text-2xl">{compliancePercentage.toFixed(0)}%</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={compliancePercentage} className="h-3 mb-3" />
                    <div className="text-sm text-gray-300">
                      {compliantAssets} of {assets.length} assets compliant
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Asset Age Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { range: "0-1 years", count: 2, color: "green" },
                  { range: "1-3 years", count: 3, color: "blue" },
                  { range: "3-5 years", count: 1, color: "yellow" },
                  { range: "5+ years", count: 0, color: "red" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{item.range}</span>
                    <span className="text-[var(--cyber-cyan)]">{item.count} assets</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Patch Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Current</span>
                  <span className="text-green-400">{assets.filter(a => a.patchLevel === "Current").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Outdated</span>
                  <span className="text-red-400">{assets.filter(a => a.patchLevel === "Outdated").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Unknown</span>
                  <span className="text-gray-400">{assets.filter(a => a.patchLevel === "Unknown").length}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">End of Life Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Supported</span>
                  <span className="text-green-400">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Extended Support</span>
                  <span className="text-yellow-400">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">End of Life</span>
                  <span className="text-red-400">0</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(selectedAsset.type)}
                  <div>
                    <CardTitle className="text-[var(--cyber-cyan)]">{selectedAsset.name}</CardTitle>
                    <CardDescription>{selectedAsset.category}</CardDescription>
                  </div>
                  <Badge className={getCriticalityColor(selectedAsset.criticality)}>
                    {selectedAsset.criticality.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(selectedAsset.status)}>
                    {selectedAsset.status.toUpperCase()}
                  </Badge>
                </div>
                <Button 
                  onClick={() => setSelectedAsset(null)}
                  variant="outline"
                  size="sm"
                  className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Asset Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Asset ID:</span>
                        <span className="text-white">{selectedAsset.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">IP Address:</span>
                        <span className="text-[var(--cyber-cyan)]">{selectedAsset.ipAddress || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">MAC Address:</span>
                        <span className="text-white">{selectedAsset.macAddress || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Operating System:</span>
                        <span className="text-white">{selectedAsset.operatingSystem}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Version:</span>
                        <span className="text-white">{selectedAsset.version}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Ownership & Location</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Owner:</span>
                        <span className="text-white">{selectedAsset.owner}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Department:</span>
                        <span className="text-white">{selectedAsset.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{selectedAsset.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Security Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Vulnerabilities:</span>
                        <span className={selectedAsset.vulnerabilities > 0 ? "text-red-400" : "text-green-400"}>
                          {selectedAsset.vulnerabilities}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Patch Level:</span>
                        <span className={selectedAsset.patchLevel === "Current" ? "text-green-400" : "text-red-400"}>
                          {selectedAsset.patchLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Antivirus:</span>
                        <span className={getAntivirusColor(selectedAsset.antivirusStatus)}>
                          {selectedAsset.antivirusStatus}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Seen:</span>
                        <span className="text-white">{getTimeAgo(selectedAsset.lastSeen)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Compliance</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedAsset.compliance).map(([key, value]) => (
                        <Badge 
                          key={key} 
                          variant="outline" 
                          className={value ? "border-green-400 text-green-400" : "border-gray-400 text-gray-400"}
                        >
                          {key.toUpperCase()}: {value ? "✓" : "✗"}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAsset.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Asset
                </Button>
                <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                  <Activity className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
                <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}