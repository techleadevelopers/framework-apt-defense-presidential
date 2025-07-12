import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  FileText, 
  Clock, 
  User, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Play, 
  Pause, 
  Flag,
  MessageSquare,
  History,
  Share2,
  Target,
  Eye,
  Edit,
  Save,
  Filter
} from "lucide-react";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "urgent" | "high" | "medium" | "low";
  assignee: string;
  reporter: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
  affectedAssets: string[];
  timeline: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: "created" | "assigned" | "status_change" | "comment" | "action";
  user: string;
  description: string;
  details?: string;
}

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [isCreatingIncident, setIsCreatingIncident] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "medium" as const,
    priority: "medium" as const,
    category: "security_incident",
    assignee: "unassigned"
  });

  // Mock data - simulando incidentes do SOC
  useEffect(() => {
    const mockIncidents: Incident[] = [
      {
        id: "INC-2025-001",
        title: "APT29 - Suspected Advanced Persistent Threat Activity",
        description: "Multiple indicators suggest APT29 activity including lateral movement, credential dumping, and C2 communication. Immediate containment required.",
        severity: "critical",
        status: "in-progress",
        priority: "urgent",
        assignee: "Ana Silva (L3 Analyst)",
        reporter: "TactiCore AI System",
        category: "Advanced Persistent Threat",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
        tags: ["APT29", "lateral-movement", "credential-dumping", "C2"],
        affectedAssets: ["SRV-DC01", "WKSTN-1247", "SRV-FILE01"],
        timeline: [
          {
            id: "t1",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: "created",
            user: "TactiCore AI",
            description: "Incident created automatically by AI detection engine",
            details: "Multiple behavioral anomalies detected matching APT29 TTPs"
          },
          {
            id: "t2",
            timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
            type: "assigned",
            user: "SOC Manager",
            description: "Assigned to Ana Silva (L3 Analyst)",
            details: "Escalated due to critical severity and APT indicators"
          },
          {
            id: "t3",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
            type: "action",
            user: "Ana Silva",
            description: "Initiated network isolation for affected systems",
            details: "Systems SRV-DC01, WKSTN-1247 isolated from network"
          },
          {
            id: "t4",
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            type: "comment",
            user: "Ana Silva",
            description: "Forensic analysis in progress. Found Mimikatz artifacts.",
            details: "Memory dump analysis confirms credential theft attempt"
          }
        ]
      },
      {
        id: "INC-2025-002",
        title: "Phishing Campaign - Employee Credential Compromise",
        description: "Targeted phishing emails leading to credential compromise. 15 employees affected.",
        severity: "high",
        status: "open",
        priority: "high",
        assignee: "Carlos Santos (L2 Analyst)",
        reporter: "Email Security Gateway",
        category: "Phishing",
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
        tags: ["phishing", "credential-compromise", "email-security"],
        affectedAssets: ["Exchange Server", "15 user accounts"],
        timeline: [
          {
            id: "t5",
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            type: "created",
            user: "Email Security",
            description: "Phishing campaign detected",
            details: "15 malicious emails blocked, 3 users clicked links"
          },
          {
            id: "t6",
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
            type: "assigned",
            user: "SOC Manager",
            description: "Assigned to Carlos Santos",
            details: "L2 analyst assigned for investigation"
          }
        ]
      },
      {
        id: "INC-2025-003",
        title: "DDoS Attack - Web Services Unavailable",
        description: "Volumetric DDoS attack affecting public web services. Traffic volumes 20x normal.",
        severity: "medium",
        status: "resolved",
        priority: "medium",
        assignee: "Maria Oliveira (L1 Analyst)",
        reporter: "Network Monitoring",
        category: "Denial of Service",
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        tags: ["ddos", "network", "availability"],
        affectedAssets: ["Web Server Farm", "Load Balancers"],
        timeline: [
          {
            id: "t7",
            timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
            type: "created",
            user: "Network Monitor",
            description: "DDoS attack detected",
            details: "Traffic spike to 2.3 Gbps, normal baseline 115 Mbps"
          },
          {
            id: "t8",
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            type: "action",
            user: "Maria Oliveira",
            description: "Activated DDoS mitigation",
            details: "CloudFlare protection enabled, traffic filtered"
          },
          {
            id: "t9",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            type: "status_change",
            user: "Maria Oliveira",
            description: "Incident resolved",
            details: "Services restored, monitoring for 24h"
          }
        ]
      }
    ];
    setIncidents(mockIncidents);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-100 text-red-800 border-red-200";
      case "in-progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertTriangle className="w-4 h-4" />;
      case "in-progress": return <Play className="w-4 h-4" />;
      case "resolved": return <CheckCircle className="w-4 h-4" />;
      case "closed": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-red-500";
      case "high": return "text-orange-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-blue-500";
      default: return "text-gray-500";
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) return `${diffHours}h ago`;
    return `${diffMins}m ago`;
  };

  const filteredIncidents = incidents.filter(incident => {
    const statusMatch = filterStatus === "all" || incident.status === filterStatus;
    const severityMatch = filterSeverity === "all" || incident.severity === filterSeverity;
    return statusMatch && severityMatch;
  });

  const incidentStats = {
    total: incidents.length,
    open: incidents.filter(i => i.status === "open").length,
    inProgress: incidents.filter(i => i.status === "in-progress").length,
    critical: incidents.filter(i => i.severity === "critical").length,
    overdue: incidents.filter(i => i.dueDate && new Date() > i.dueDate && i.status !== "resolved" && i.status !== "closed").length
  };

  const createNewIncident = () => {
    if (!newIncident.title || !newIncident.description) return;

    const incident: Incident = {
      id: `INC-2025-${String(incidents.length + 1).padStart(3, "0")}`,
      title: newIncident.title,
      description: newIncident.description,
      severity: newIncident.severity,
      status: "open",
      priority: newIncident.priority,
      assignee: newIncident.assignee,
      reporter: "Manual Creation",
      category: newIncident.category,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
      affectedAssets: [],
      timeline: [{
        id: "t0",
        timestamp: new Date(),
        type: "created",
        user: "SOC Analyst",
        description: "Incident created manually",
        details: "Created through SOC dashboard"
      }]
    };

    setIncidents([incident, ...incidents]);
    setNewIncident({
      title: "",
      description: "",
      severity: "medium",
      priority: "medium",
      category: "security_incident",
      assignee: "unassigned"
    });
    setIsCreatingIncident(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">Incident Response & Case Management</h1>
          <p className="text-gray-400">Gerencie o ciclo de vida completo de incidentes de segurança</p>
        </div>
        <Button 
          onClick={() => setIsCreatingIncident(true)}
          className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Incident
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{incidentStats.total}</div>
            <div className="text-xs text-gray-400">Total Incidents</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{incidentStats.open}</div>
            <div className="text-xs text-gray-400">Open</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{incidentStats.inProgress}</div>
            <div className="text-xs text-gray-400">In Progress</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-red-600/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{incidentStats.critical}</div>
            <div className="text-xs text-gray-400">Critical</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{incidentStats.overdue}</div>
            <div className="text-xs text-gray-400">Overdue</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Incident List</TabsTrigger>
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {/* Filters */}
          <div className="flex space-x-4">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            <select 
              value={filterSeverity} 
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Incident List */}
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 cursor-pointer"
                    onClick={() => setSelectedIncident(incident)}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(incident.status)}>
                        {getStatusIcon(incident.status)}
                        <span className="ml-1">{incident.status.replace("-", " ").toUpperCase()}</span>
                      </Badge>
                      <Flag className={`w-4 h-4 ${getPriorityColor(incident.priority)}`} />
                    </div>
                    <div className="text-sm text-gray-400">
                      {incident.id} • {getTimeAgo(incident.updatedAt)}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{incident.description}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{incident.assignee}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{incident.affectedAssets.length} assets</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {incident.tags.slice(0, 3).map((tag, index) => (
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

        <TabsContent value="board" className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {["open", "in-progress", "resolved", "closed"].map((status) => (
              <Card key={status} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-[var(--cyber-cyan)] flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <span>{status.replace("-", " ").toUpperCase()}</span>
                    <Badge variant="outline" className="ml-auto">
                      {incidents.filter(i => i.status === status).length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {incidents
                    .filter(incident => incident.status === status)
                    .map((incident) => (
                      <div key={incident.id} 
                           className="p-3 bg-[var(--cyber-steel)]/20 rounded border border-[var(--cyber-cyan)]/10 cursor-pointer hover:border-[var(--cyber-cyan)]/30"
                           onClick={() => setSelectedIncident(incident)}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getSeverityColor(incident.severity)} size="sm">
                            {incident.severity[0].toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-400">{incident.id}</span>
                        </div>
                        <h4 className="text-sm font-medium text-white mb-2 line-clamp-2">
                          {incident.title}
                        </h4>
                        <div className="text-xs text-gray-400">
                          {incident.assignee.split(" ")[0]}
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Incident Trends (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Gráfico de tendências de incidentes por dia
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Resolution Time by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Critical</span>
                    <span className="text-[var(--cyber-cyan)]">2.3h avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">High</span>
                    <span className="text-[var(--cyber-cyan)]">8.7h avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Medium</span>
                    <span className="text-[var(--cyber-cyan)]">24.1h avg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Low</span>
                    <span className="text-[var(--cyber-cyan)]">72.5h avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Incident Modal */}
      {isCreatingIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)]">Create New Incident</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Incident Title"
                value={newIncident.title}
                onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                className="bg-[var(--cyber-steel)] border-[var(--cyber-cyan)]/30 text-white"
              />
              <Textarea
                placeholder="Description"
                value={newIncident.description}
                onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                className="bg-[var(--cyber-steel)] border-[var(--cyber-cyan)]/30 text-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <select 
                  value={newIncident.severity} 
                  onChange={(e) => setNewIncident({...newIncident, severity: e.target.value as any})}
                  className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
                <select 
                  value={newIncident.priority} 
                  onChange={(e) => setNewIncident({...newIncident, priority: e.target.value as any})}
                  className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <Button 
                  onClick={createNewIncident}
                  className="flex-1 bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]"
                >
                  Create Incident
                </Button>
                <Button 
                  onClick={() => setIsCreatingIncident(false)}
                  variant="outline"
                  className="flex-1 border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-3">
                    <span>{selectedIncident.id}</span>
                    <Badge className={getSeverityColor(selectedIncident.severity)}>
                      {selectedIncident.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(selectedIncident.status)}>
                      {selectedIncident.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <h2 className="text-xl text-white mt-2">{selectedIncident.title}</h2>
                </div>
                <Button 
                  onClick={() => setSelectedIncident(null)}
                  variant="outline"
                  size="sm"
                  className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Description</h3>
                    <p className="text-gray-300">{selectedIncident.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Affected Assets</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedIncident.affectedAssets.map((asset, index) => (
                        <Badge key={index} variant="outline" className="bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {asset}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Timeline</h3>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {selectedIncident.timeline.map((event) => (
                          <div key={event.id} className="flex space-x-3 p-3 bg-[var(--cyber-steel)]/20 rounded">
                            <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full mt-2"></div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-white">{event.user}</span>
                                <span className="text-xs text-gray-400">{getTimeAgo(event.timestamp)}</span>
                              </div>
                              <p className="text-sm text-gray-300">{event.description}</p>
                              {event.details && (
                                <p className="text-xs text-gray-400 mt-1">{event.details}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                
                {/* Sidebar */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assignee:</span>
                        <span className="text-white">{selectedIncident.assignee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reporter:</span>
                        <span className="text-white">{selectedIncident.reporter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white">{selectedIncident.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span className="text-white">{selectedIncident.createdAt.toLocaleDateString()}</span>
                      </div>
                      {selectedIncident.dueDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Due Date:</span>
                          <span className={`${new Date() > selectedIncident.dueDate ? 'text-red-400' : 'text-white'}`}>
                            {selectedIncident.dueDate.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedIncident.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Incident
                    </Button>
                    <Button variant="outline" className="w-full border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="w-full border-green-500/30 text-green-400">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}