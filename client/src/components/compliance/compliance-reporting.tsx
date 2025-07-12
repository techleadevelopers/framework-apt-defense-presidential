import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardCheck, 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3,
  PieChart,
  Settings,
  Eye,
  Send,
  Filter,
  Search,
  RefreshCw
} from "lucide-react";

interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: "security" | "privacy" | "financial" | "industry";
  status: "compliant" | "non-compliant" | "partial" | "in-progress";
  overallScore: number;
  lastAssessment: Date;
  nextAssessment: Date;
  controls: ComplianceControl[];
  requirements: number;
  implemented: number;
}

interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "implemented" | "partial" | "not-implemented" | "not-applicable";
  evidence: string[];
  lastReview: Date;
  nextReview: Date;
  owner: string;
  priority: "critical" | "high" | "medium" | "low";
}

interface ComplianceReport {
  id: string;
  name: string;
  framework: string;
  type: "assessment" | "audit" | "certification" | "gap-analysis";
  status: "draft" | "in-review" | "approved" | "published";
  generatedDate: Date;
  period: { start: Date; end: Date };
  author: string;
  findings: number;
  recommendations: number;
  riskLevel: "low" | "medium" | "high" | "critical";
}

export default function ComplianceReporting() {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>([]);
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<ComplianceFramework | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  useEffect(() => {
    const mockFrameworks: ComplianceFramework[] = [
      {
        id: "NIST-CSF",
        name: "NIST CSF",
        fullName: "NIST Cybersecurity Framework",
        description: "Framework para melhorar a infraestrutura crítica de cibersegurança",
        category: "security",
        status: "compliant",
        overallScore: 87,
        lastAssessment: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        requirements: 108,
        implemented: 94,
        controls: [
          {
            id: "ID.AM-1",
            name: "Physical devices and systems inventory",
            description: "Inventário de dispositivos físicos e sistemas dentro da organização",
            category: "Identify",
            status: "implemented",
            evidence: ["Asset Management System", "Network Discovery Scans"],
            lastReview: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            nextReview: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            owner: "IT Operations",
            priority: "high"
          },
          {
            id: "PR.AC-1",
            name: "Access Control Policy",
            description: "Política de controle de acesso estabelecida e gerenciada",
            category: "Protect",
            status: "implemented",
            evidence: ["Access Control Policy v2.1", "Annual Review Records"],
            lastReview: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
            nextReview: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
            owner: "Security Team",
            priority: "critical"
          },
          {
            id: "DE.CM-1",
            name: "Network Monitoring",
            description: "A rede é monitorada para detectar eventos de cibersegurança",
            category: "Detect",
            status: "partial",
            evidence: ["SIEM Logs", "Network Monitoring Tools"],
            lastReview: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            nextReview: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            owner: "SOC Team",
            priority: "high"
          }
        ]
      },
      {
        id: "ISO-27001",
        name: "ISO 27001",
        fullName: "ISO/IEC 27001:2022",
        description: "Padrão internacional para sistemas de gestão de segurança da informação",
        category: "security",
        status: "partial",
        overallScore: 73,
        lastAssessment: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        requirements: 114,
        implemented: 83,
        controls: []
      },
      {
        id: "LGPD",
        name: "LGPD",
        fullName: "Lei Geral de Proteção de Dados",
        description: "Lei brasileira de proteção de dados pessoais",
        category: "privacy",
        status: "compliant",
        overallScore: 92,
        lastAssessment: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        requirements: 67,
        implemented: 62,
        controls: []
      },
      {
        id: "SOX",
        name: "SOX",
        fullName: "Sarbanes-Oxley Act",
        description: "Lei americana para transparência corporativa e responsabilidade financeira",
        category: "financial",
        status: "compliant",
        overallScore: 89,
        lastAssessment: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        requirements: 45,
        implemented: 40,
        controls: []
      },
      {
        id: "PCI-DSS",
        name: "PCI DSS",
        fullName: "Payment Card Industry Data Security Standard",
        description: "Padrão de segurança para empresas que processam cartões de pagamento",
        category: "industry",
        status: "in-progress",
        overallScore: 68,
        lastAssessment: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        nextAssessment: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
        requirements: 78,
        implemented: 53,
        controls: []
      }
    ];

    const mockReports: ComplianceReport[] = [
      {
        id: "RPT-001",
        name: "LGPD Quarterly Assessment Q4 2024",
        framework: "LGPD",
        type: "assessment",
        status: "published",
        generatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        period: { 
          start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), 
          end: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) 
        },
        author: "Compliance Officer",
        findings: 3,
        recommendations: 5,
        riskLevel: "low"
      },
      {
        id: "RPT-002",
        name: "NIST CSF Annual Review 2024",
        framework: "NIST-CSF",
        type: "audit",
        status: "in-review",
        generatedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        period: { 
          start: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), 
          end: new Date() 
        },
        author: "External Auditor",
        findings: 12,
        recommendations: 18,
        riskLevel: "medium"
      },
      {
        id: "RPT-003",
        name: "PCI DSS Gap Analysis",
        framework: "PCI-DSS",
        type: "gap-analysis",
        status: "approved",
        generatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        period: { 
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
          end: new Date() 
        },
        author: "Security Consultant",
        findings: 25,
        recommendations: 31,
        riskLevel: "high"
      }
    ];

    setFrameworks(mockFrameworks);
    setReports(mockReports);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-100 text-green-800 border-green-200";
      case "partial": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "non-compliant": return "bg-red-100 text-red-800 border-red-200";
      case "in-progress": return "bg-blue-100 text-blue-800 border-blue-200";
      case "implemented": return "bg-green-100 text-green-800 border-green-200";
      case "not-implemented": return "bg-red-100 text-red-800 border-red-200";
      case "not-applicable": return "bg-gray-100 text-gray-800 border-gray-200";
      case "draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "published": return "bg-green-100 text-green-800 border-green-200";
      case "approved": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "security": return "bg-red-500 text-white";
      case "privacy": return "bg-blue-500 text-white";
      case "financial": return "bg-green-500 text-white";
      case "industry": return "bg-purple-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "text-red-600";
      case "high": return "text-red-400";
      case "medium": return "text-yellow-400";
      case "low": return "text-green-400";
      default: return "text-gray-400";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-yellow-400";
    if (score >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const filteredFrameworks = frameworks.filter(framework => {
    const statusMatch = filterStatus === "all" || framework.status === filterStatus;
    const searchMatch = searchTerm === "" || 
      framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  const complianceStats = {
    totalFrameworks: frameworks.length,
    compliant: frameworks.filter(f => f.status === "compliant").length,
    avgScore: frameworks.reduce((sum, f) => sum + f.overallScore, 0) / frameworks.length,
    overdueAssessments: frameworks.filter(f => new Date() > f.nextAssessment).length,
    totalReports: reports.length,
    pendingReviews: reports.filter(r => r.status === "in-review").length
  };

  const generateReport = (framework: ComplianceFramework) => {
    const newReport: ComplianceReport = {
      id: `RPT-${Date.now()}`,
      name: `${framework.name} Assessment ${new Date().toLocaleDateString()}`,
      framework: framework.id,
      type: "assessment",
      status: "draft",
      generatedDate: new Date(),
      period: { 
        start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), 
        end: new Date() 
      },
      author: "SOC Analyst",
      findings: Math.floor(Math.random() * 20) + 1,
      recommendations: Math.floor(Math.random() * 30) + 5,
      riskLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any
    };

    setReports([newReport, ...reports]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">Reporting & Compliance</h1>
          <p className="text-gray-400">Relatórios sobre status de segurança e aderência a requisitos regulatórios</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
          <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{complianceStats.totalFrameworks}</div>
            <div className="text-xs text-gray-400">Frameworks</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{complianceStats.compliant}</div>
            <div className="text-xs text-gray-400">Compliant</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{complianceStats.avgScore.toFixed(0)}%</div>
            <div className="text-xs text-gray-400">Avg Score</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{complianceStats.overdueAssessments}</div>
            <div className="text-xs text-gray-400">Overdue</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{complianceStats.totalReports}</div>
            <div className="text-xs text-gray-400">Reports</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{complianceStats.pendingReviews}</div>
            <div className="text-xs text-gray-400">Pending Review</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="frameworks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="frameworks">Compliance Frameworks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="dashboard">Executive Dashboard</TabsTrigger>
          <TabsTrigger value="schedule">Assessment Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="frameworks" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search frameworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white placeholder-gray-400"
              />
            </div>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white"
            >
              <option value="all">All Status</option>
              <option value="compliant">Compliant</option>
              <option value="partial">Partial</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>

          {/* Framework List */}
          <div className="space-y-3">
            {filteredFrameworks.map((framework) => {
              const isOverdue = new Date() > framework.nextAssessment;
              
              return (
                <Card key={framework.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 cursor-pointer"
                      onClick={() => setSelectedFramework(framework)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <ClipboardCheck className="w-6 h-6 text-[var(--cyber-cyan)]" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{framework.name}</h3>
                          <p className="text-sm text-gray-400">{framework.fullName}</p>
                        </div>
                        <Badge className={getCategoryColor(framework.category)}>
                          {framework.category.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(framework.status)}>
                          {framework.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(framework.overallScore)}`}>
                          {framework.overallScore}%
                        </div>
                        {isOverdue && (
                          <Badge className="bg-red-600 text-white mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            OVERDUE
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{framework.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Requirements:</span>
                        <span className="text-white ml-2">{framework.requirements}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Implemented:</span>
                        <span className="text-[var(--cyber-cyan)] ml-2">{framework.implemented}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Assessment:</span>
                        <span className="text-white ml-2">{framework.lastAssessment.toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Next Assessment:</span>
                        <span className={`ml-2 ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                          {framework.nextAssessment.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <Progress 
                          value={(framework.implemented / framework.requirements) * 100} 
                          className="h-2"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateReport(framework);
                          }}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Report
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFramework(framework);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="space-y-3">
            {reports.map((report) => (
              <Card key={report.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-6 h-6 text-[var(--cyber-cyan)]" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{report.name}</h3>
                        <p className="text-sm text-gray-400">{report.framework} • {report.type.replace("-", " ")}</p>
                      </div>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>Generated: {report.generatedDate.toLocaleDateString()}</div>
                      <div>Period: {report.period.start.toLocaleDateString()} - {report.period.end.toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Author:</span>
                      <span className="text-white ml-2">{report.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Findings:</span>
                      <span className="text-yellow-400 ml-2">{report.findings}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Recommendations:</span>
                      <span className="text-[var(--cyber-cyan)] ml-2">{report.recommendations}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Risk Level:</span>
                      <span className={`ml-2 ${getRiskColor(report.riskLevel)}`}>
                        {report.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                      <Send className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Compliance Overview */}
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Compliance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {frameworks.map((framework) => (
                    <div key={framework.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300">{framework.name}</span>
                        <span className={getScoreColor(framework.overallScore)}>
                          {framework.overallScore}%
                        </span>
                      </div>
                      <Progress value={framework.overallScore} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Risk Assessment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Critical Risk</span>
                    <span className="text-red-400">2 items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">High Risk</span>
                    <span className="text-orange-400">7 items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Medium Risk</span>
                    <span className="text-yellow-400">15 items</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Low Risk</span>
                    <span className="text-green-400">31 items</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">MEDIUM</div>
                      <div className="text-sm text-gray-400">Overall Risk Level</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Compliance Trends (Last 12 Months)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Gráfico de tendências de compliance ao longo do tempo
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Assessments */}
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Upcoming Assessments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {frameworks
                    .sort((a, b) => a.nextAssessment.getTime() - b.nextAssessment.getTime())
                    .slice(0, 5)
                    .map((framework) => {
                      const isOverdue = new Date() > framework.nextAssessment;
                      const daysUntil = Math.ceil((framework.nextAssessment.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <div key={framework.id} className="flex justify-between items-center">
                          <span className="text-gray-300">{framework.name}</span>
                          <span className={isOverdue ? "text-red-400" : "text-[var(--cyber-cyan)]"}>
                            {isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)]">Assessment Calendar</CardTitle>
              <CardDescription>Cronograma de avaliações de compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frameworks.map((framework) => {
                  const isOverdue = new Date() > framework.nextAssessment;
                  const daysUntil = Math.ceil((framework.nextAssessment.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={framework.id} className="flex items-center justify-between p-3 bg-[var(--cyber-steel)]/20 rounded border border-[var(--cyber-cyan)]/10">
                      <div className="flex items-center space-x-3">
                        <ClipboardCheck className="w-5 h-5 text-[var(--cyber-cyan)]" />
                        <div>
                          <h4 className="font-medium text-white">{framework.name}</h4>
                          <p className="text-sm text-gray-400">{framework.fullName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                          {framework.nextAssessment.toLocaleDateString()}
                        </div>
                        <div className={`text-sm ${isOverdue ? 'text-red-400' : 'text-gray-400'}`}>
                          {isOverdue ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days remaining`}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                      >
                        Schedule
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Framework Detail Modal */}
      {selectedFramework && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[var(--cyber-cyan)]">{selectedFramework.name}</CardTitle>
                  <CardDescription>{selectedFramework.fullName}</CardDescription>
                </div>
                <Button 
                  onClick={() => setSelectedFramework(null)}
                  variant="outline"
                  size="sm"
                  className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Framework Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white">{selectedFramework.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Overall Score:</span>
                        <span className={getScoreColor(selectedFramework.overallScore)}>
                          {selectedFramework.overallScore}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Requirements:</span>
                        <span className="text-white">{selectedFramework.requirements}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Implemented:</span>
                        <span className="text-[var(--cyber-cyan)]">{selectedFramework.implemented}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Assessment:</span>
                        <span className="text-white">{selectedFramework.lastAssessment.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next Assessment:</span>
                        <span className="text-white">{selectedFramework.nextAssessment.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Implementation Progress</h3>
                    <div className="space-y-3">
                      <Progress 
                        value={(selectedFramework.implemented / selectedFramework.requirements) * 100} 
                        className="h-4"
                      />
                      <div className="text-center text-sm text-gray-400">
                        {selectedFramework.implemented} of {selectedFramework.requirements} requirements implemented
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFramework.controls.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Sample Controls</h3>
                    <div className="space-y-3">
                      {selectedFramework.controls.map((control) => (
                        <div key={control.id} className="p-3 bg-[var(--cyber-steel)]/20 rounded border border-[var(--cyber-cyan)]/10">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{control.id} - {control.name}</h4>
                            <Badge variant="outline" className={getStatusColor(control.status)}>
                              {control.status.replace("-", " ").toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{control.description}</p>
                          <div className="text-xs text-gray-400">
                            Owner: {control.owner} • Next Review: {control.nextReview.toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button 
                    className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]"
                    onClick={() => generateReport(selectedFramework)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Assessment
                  </Button>
                  <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}