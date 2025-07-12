import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Workflow, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Edit, 
  Copy, 
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Bot,
  Settings,
  Activity,
  Target,
  Shield,
  Network,
  Database,
  Mail,
  Smartphone,
  Eye,
  GitBranch
} from "lucide-react";

interface PlaybookStep {
  id: string;
  name: string;
  type: "condition" | "action" | "delay" | "notification";
  description: string;
  parameters: Record<string, any>;
  condition?: string;
  onSuccess?: string;
  onError?: string;
  timeout: number;
  status: "pending" | "running" | "success" | "error" | "skipped";
  duration?: number;
}

interface Playbook {
  id: string;
  name: string;
  description: string;
  category: "incident_response" | "threat_hunting" | "vulnerability" | "phishing" | "malware" | "compliance";
  trigger: "manual" | "automatic" | "scheduled";
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "inactive" | "draft";
  createdAt: Date;
  lastRun?: Date;
  totalRuns: number;
  successRate: number;
  avgDuration: number;
  steps: PlaybookStep[];
  tags: string[];
}

interface PlaybookExecution {
  id: string;
  playbookId: string;
  playbookName: string;
  status: "running" | "completed" | "failed" | "cancelled";
  startTime: Date;
  endTime?: Date;
  duration?: number;
  trigger: string;
  currentStep: number;
  totalSteps: number;
  user: string;
  logs: ExecutionLog[];
}

interface ExecutionLog {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  message: string;
  details?: string;
  stepId?: string;
}

export default function SOARAutomation() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [executions, setExecutions] = useState<PlaybookExecution[]>([]);
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<PlaybookExecution | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);

  // Mock data
  useEffect(() => {
    const mockPlaybooks: Playbook[] = [
      {
        id: "PB-001",
        name: "APT Response - Immediate Containment",
        description: "Resposta automática para atividade de APT incluindo isolamento de hosts, coleta de evidências e notificação de stakeholders.",
        category: "incident_response",
        trigger: "automatic",
        severity: "critical",
        status: "active",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
        totalRuns: 47,
        successRate: 94.2,
        avgDuration: 340,
        tags: ["apt", "containment", "forensics"],
        steps: [
          {
            id: "step-1",
            name: "Validate Alert",
            type: "condition",
            description: "Verificar se a atividade de APT é válida através de múltiplas fontes",
            parameters: { confidence_threshold: 85, sources: ["EDR", "SIEM", "TI_Feeds"] },
            onSuccess: "step-2",
            onError: "step-end",
            timeout: 30,
            status: "pending"
          },
          {
            id: "step-2",
            name: "Isolate Affected Hosts",
            type: "action",
            description: "Isolar automaticamente hosts comprometidos da rede",
            parameters: { isolation_type: "network", preserve_evidence: true },
            onSuccess: "step-3",
            onError: "step-manual",
            timeout: 120,
            status: "pending"
          },
          {
            id: "step-3",
            name: "Collect Memory Dump",
            type: "action",
            description: "Capturar dump de memória para análise forense",
            parameters: { compression: true, encryption: true, upload_location: "forensics_vault" },
            onSuccess: "step-4",
            onError: "step-3-retry",
            timeout: 300,
            status: "pending"
          },
          {
            id: "step-4",
            name: "Update IOCs",
            type: "action",
            description: "Atualizar indicadores de comprometimento em todas as ferramentas de segurança",
            parameters: { ioc_sources: ["investigation"], propagate_to: ["SIEM", "EDR", "FW", "IPS"] },
            onSuccess: "step-5",
            onError: "step-manual",
            timeout: 60,
            status: "pending"
          },
          {
            id: "step-5",
            name: "Notify Security Team",
            type: "notification",
            description: "Enviar notificação para equipe de segurança e stakeholders",
            parameters: { 
              channels: ["email", "slack", "teams"], 
              recipients: ["soc-team", "ciso", "incident-manager"],
              severity: "critical"
            },
            onSuccess: "step-6",
            onError: "step-manual",
            timeout: 30,
            status: "pending"
          },
          {
            id: "step-6",
            name: "Create Incident Ticket",
            type: "action",
            description: "Criar ticket de incidente no sistema de gerenciamento",
            parameters: { 
              priority: "critical", 
              assignee: "l3-analyst", 
              include_evidence: true,
              auto_populate: true
            },
            timeout: 60,
            status: "pending"
          }
        ]
      },
      {
        id: "PB-002",
        name: "Phishing Email Response",
        description: "Resposta automatizada para emails de phishing incluindo quarentena, análise e educação do usuário.",
        category: "phishing",
        trigger: "automatic",
        severity: "high",
        status: "active",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
        totalRuns: 156,
        successRate: 97.8,
        avgDuration: 180,
        tags: ["phishing", "email-security", "user-education"],
        steps: [
          {
            id: "step-1",
            name: "Quarantine Email",
            type: "action",
            description: "Colocar email suspeito em quarentena em todos os mailboxes",
            parameters: { scope: "organization", backup_copy: true },
            timeout: 60,
            status: "pending"
          },
          {
            id: "step-2",
            name: "Analyze URLs and Attachments",
            type: "action",
            description: "Submeter URLs e anexos para análise em sandbox",
            parameters: { services: ["virustotal", "hybrid_analysis"], deep_scan: true },
            timeout: 300,
            status: "pending"
          },
          {
            id: "step-3",
            name: "Update Email Security Rules",
            type: "action",
            description: "Atualizar regras do gateway de email para bloquear similares",
            parameters: { rule_type: "hash_based", auto_expire: "30_days" },
            timeout: 120,
            status: "pending"
          },
          {
            id: "step-4",
            name: "Send User Notification",
            type: "notification",
            description: "Notificar usuários afetados sobre tentativa de phishing",
            parameters: { include_training: true, track_completion: true },
            timeout: 30,
            status: "pending"
          }
        ]
      },
      {
        id: "PB-003",
        name: "Vulnerability Remediation",
        description: "Processo automatizado de remediação de vulnerabilidades críticas incluindo patch deployment e verificação.",
        category: "vulnerability",
        trigger: "scheduled",
        severity: "medium",
        status: "active",
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000),
        totalRuns: 28,
        successRate: 89.3,
        avgDuration: 1200,
        tags: ["vulnerability", "patching", "compliance"],
        steps: [
          {
            id: "step-1",
            name: "Identify Critical Vulnerabilities",
            type: "action",
            description: "Identificar vulnerabilidades críticas com exploits disponíveis",
            parameters: { cvss_threshold: 9.0, exploit_available: true },
            timeout: 180,
            status: "pending"
          },
          {
            id: "step-2",
            name: "Create Maintenance Window",
            type: "action",
            description: "Agendar janela de manutenção para aplicação de patches",
            parameters: { duration: "4h", approval_required: true },
            timeout: 60,
            status: "pending"
          },
          {
            id: "step-3",
            name: "Deploy Patches",
            type: "action",
            description: "Aplicar patches usando sistema de gerenciamento centralizado",
            parameters: { rollback_enabled: true, test_group_first: true },
            timeout: 3600,
            status: "pending"
          },
          {
            id: "step-4",
            name: "Verify Remediation",
            type: "action",
            description: "Verificar se vulnerabilidades foram corrigidas com scan",
            parameters: { scan_type: "authenticated", wait_time: "1h" },
            timeout: 1800,
            status: "pending"
          }
        ]
      }
    ];

    const mockExecutions: PlaybookExecution[] = [
      {
        id: "EXE-001",
        playbookId: "PB-001",
        playbookName: "APT Response - Immediate Containment",
        status: "completed",
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
        duration: 300,
        trigger: "TactiCore AI Alert: APT29 Activity",
        currentStep: 6,
        totalSteps: 6,
        user: "SYSTEM",
        logs: []
      },
      {
        id: "EXE-002",
        playbookId: "PB-002",
        playbookName: "Phishing Email Response",
        status: "running",
        startTime: new Date(Date.now() - 15 * 60 * 1000),
        currentStep: 2,
        totalSteps: 4,
        trigger: "Email Security Gateway",
        user: "auto-response",
        logs: []
      }
    ];

    setPlaybooks(mockPlaybooks);
    setExecutions(mockExecutions);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "incident_response": return <Shield className="w-5 h-5" />;
      case "threat_hunting": return <Target className="w-5 h-5" />;
      case "vulnerability": return <AlertTriangle className="w-5 h-5" />;
      case "phishing": return <Mail className="w-5 h-5" />;
      case "malware": return <Bot className="w-5 h-5" />;
      case "compliance": return <CheckCircle className="w-5 h-5" />;
      default: return <Workflow className="w-5 h-5" />;
    }
  };

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
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200";
      case "draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "running": return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed": return "bg-green-100 text-green-800 border-green-200";
      case "failed": return "bg-red-100 text-red-800 border-red-200";
      case "cancelled": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "condition": return <GitBranch className="w-4 h-4" />;
      case "action": return <Zap className="w-4 h-4" />;
      case "delay": return <Clock className="w-4 h-4" />;
      case "notification": return <Mail className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const executePlaybook = async (playbook: Playbook) => {
    setIsExecuting(true);
    setExecutionLogs([]);
    
    const execution: PlaybookExecution = {
      id: `EXE-${Date.now()}`,
      playbookId: playbook.id,
      playbookName: playbook.name,
      status: "running",
      startTime: new Date(),
      currentStep: 0,
      totalSteps: playbook.steps.length,
      trigger: "Manual Execution",
      user: "SOC Analyst",
      logs: []
    };

    setExecutions([execution, ...executions]);
    setSelectedExecution(execution);

    // Simulate execution
    for (let i = 0; i < playbook.steps.length; i++) {
      const step = playbook.steps[i];
      
      // Add start log
      const startLog: ExecutionLog = {
        id: `log-${Date.now()}-${i}`,
        timestamp: new Date(),
        level: "info",
        message: `Executando step: ${step.name}`,
        details: step.description,
        stepId: step.id
      };
      
      setExecutionLogs(prev => [...prev, startLog]);
      
      // Simulate step execution time
      await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));
      
      // Simulate success/failure (95% success rate)
      const success = Math.random() > 0.05;
      
      const resultLog: ExecutionLog = {
        id: `log-${Date.now()}-${i}-result`,
        timestamp: new Date(),
        level: success ? "success" : "error",
        message: success ? `${step.name} executado com sucesso` : `Falha na execução de ${step.name}`,
        details: success ? 
          `Parâmetros aplicados: ${JSON.stringify(step.parameters)}` : 
          `Erro: Timeout ou falha na conexão com sistema externo`,
        stepId: step.id
      };
      
      setExecutionLogs(prev => [...prev, resultLog]);
      
      if (!success && step.onError !== "step-manual") {
        // Stop execution on error
        execution.status = "failed";
        execution.endTime = new Date();
        execution.duration = Math.floor((execution.endTime.getTime() - execution.startTime.getTime()) / 1000);
        break;
      }
      
      execution.currentStep = i + 1;
    }
    
    if (execution.status === "running") {
      execution.status = "completed";
      execution.endTime = new Date();
      execution.duration = Math.floor((execution.endTime.getTime() - execution.startTime.getTime()) / 1000);
    }
    
    setIsExecuting(false);
  };

  const playbookStats = {
    total: playbooks.length,
    active: playbooks.filter(p => p.status === "active").length,
    totalRuns: playbooks.reduce((sum, p) => sum + p.totalRuns, 0),
    avgSuccessRate: playbooks.reduce((sum, p) => sum + p.successRate, 0) / playbooks.length,
    runningExecutions: executions.filter(e => e.status === "running").length
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">SOAR - Security Orchestration & Automation</h1>
          <p className="text-gray-400">Automatizar tarefas repetitivas e orquestrar fluxos de trabalho de segurança</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
            <Plus className="w-4 h-4 mr-2" />
            New Playbook
          </Button>
          <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
            <Settings className="w-4 h-4 mr-2" />
            Integration Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{playbookStats.total}</div>
            <div className="text-xs text-gray-400">Total Playbooks</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{playbookStats.active}</div>
            <div className="text-xs text-gray-400">Active</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{playbookStats.totalRuns}</div>
            <div className="text-xs text-gray-400">Total Executions</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{playbookStats.avgSuccessRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--cyber-dark)] border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{playbookStats.runningExecutions}</div>
            <div className="text-xs text-gray-400">Running Now</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="playbooks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="playbooks" className="space-y-4">
          {/* Playbook List */}
          <div className="space-y-3">
            {playbooks.map((playbook) => (
              <Card key={playbook.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 cursor-pointer"
                    onClick={() => setSelectedPlaybook(playbook)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(playbook.category)}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{playbook.name}</h3>
                        <p className="text-sm text-gray-400">{playbook.category.replace("_", " ").toUpperCase()}</p>
                      </div>
                      <Badge className={getSeverityColor(playbook.severity)}>
                        {playbook.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(playbook.status)}>
                        {playbook.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>{playbook.id}</div>
                      <div>{playbook.steps.length} steps</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{playbook.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Trigger:</span>
                      <span className="text-[var(--cyber-cyan)] ml-2">{playbook.trigger}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Total Runs:</span>
                      <span className="text-white ml-2">{playbook.totalRuns}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="text-green-400 ml-2">{playbook.successRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Duration:</span>
                      <span className="text-white ml-2">{formatDuration(playbook.avgDuration)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {playbook.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlaybook(playbook);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]"
                        onClick={(e) => {
                          e.stopPropagation();
                          executePlaybook(playbook);
                        }}
                        disabled={isExecuting}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Execute
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="executions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Execution List */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[var(--cyber-cyan)]">Recent Executions</h3>
              {executions.map((execution) => (
                <Card key={execution.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 cursor-pointer"
                      onClick={() => setSelectedExecution(execution)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{execution.playbookName}</h4>
                      <Badge variant="outline" className={getStatusColor(execution.status)}>
                        {execution.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400 mb-2">
                      Triggered by: {execution.trigger}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        Progress: {execution.currentStep}/{execution.totalSteps}
                      </span>
                      <span className="text-gray-300">
                        {execution.duration ? formatDuration(execution.duration) : "Running..."}
                      </span>
                    </div>
                    <Progress 
                      value={(execution.currentStep / execution.totalSteps) * 100} 
                      className="h-2 mt-2"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Execution Details */}
            {selectedExecution && (
              <div>
                <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Execution Details</h3>
                <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <CardHeader>
                    <CardTitle className="text-[var(--cyber-cyan)] flex items-center justify-between">
                      <span>{selectedExecution.playbookName}</span>
                      <Badge variant="outline" className={getStatusColor(selectedExecution.status)}>
                        {selectedExecution.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Execution ID: {selectedExecution.id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Started:</span>
                        <span className="text-white">{selectedExecution.startTime.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Triggered by:</span>
                        <span className="text-white">{selectedExecution.trigger}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">User:</span>
                        <span className="text-white">{selectedExecution.user}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Progress:</span>
                        <span className="text-[var(--cyber-cyan)]">
                          {selectedExecution.currentStep}/{selectedExecution.totalSteps}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Execution Logs */}
                {executionLogs.length > 0 && (
                  <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 mt-4">
                    <CardHeader>
                      <CardTitle className="text-[var(--cyber-cyan)]">Execution Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64">
                        <div className="space-y-2 font-mono text-sm">
                          {executionLogs.map((log) => (
                            <div key={log.id} className="p-2 rounded bg-[var(--cyber-steel)]/20">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-400">
                                  {log.timestamp.toLocaleTimeString()}
                                </span>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    log.level === "success" ? "text-green-400 border-green-400" :
                                    log.level === "error" ? "text-red-400 border-red-400" :
                                    log.level === "warning" ? "text-yellow-400 border-yellow-400" :
                                    "text-blue-400 border-blue-400"
                                  }`}
                                >
                                  {log.level.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-white mt-1">{log.message}</p>
                              {log.details && (
                                <p className="text-xs text-gray-400 mt-1">{log.details}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "SIEM Integration", type: "Splunk Enterprise", status: "connected", actions: 47 },
              { name: "EDR Platform", type: "CrowdStrike Falcon", status: "connected", actions: 23 },
              { name: "Email Security", type: "Microsoft 365", status: "connected", actions: 156 },
              { name: "Firewall", type: "Palo Alto Networks", status: "connected", actions: 34 },
              { name: "Vulnerability Scanner", type: "Tenable Nessus", status: "connected", actions: 12 },
              { name: "Threat Intelligence", type: "MISP Platform", status: "connected", actions: 89 },
              { name: "ITSM", type: "ServiceNow", status: "connected", actions: 67 },
              { name: "Communication", type: "Slack", status: "connected", actions: 234 },
              { name: "Cloud Security", type: "AWS Security Hub", status: "disconnected", actions: 0 }
            ].map((integration, index) => (
              <Card key={index} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-[var(--cyber-cyan)] flex items-center justify-between">
                    <span className="text-sm">{integration.name}</span>
                    <Badge 
                      variant="outline" 
                      className={integration.status === "connected" ? 
                        "text-green-400 border-green-400" : 
                        "text-red-400 border-red-400"
                      }
                    >
                      {integration.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{integration.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Actions Available:</span>
                    <span className="text-[var(--cyber-cyan)]">{integration.actions}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Execution Trends (Last 30 Days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Gráfico de execuções de playbooks por dia
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Most Used Playbooks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {playbooks
                  .sort((a, b) => b.totalRuns - a.totalRuns)
                  .slice(0, 5)
                  .map((playbook, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">{playbook.name}</span>
                      <span className="text-[var(--cyber-cyan)]">{playbook.totalRuns} runs</span>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Average Execution Time</span>
                  <span className="text-[var(--cyber-cyan)]">4m 32s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Success Rate</span>
                  <span className="text-green-400">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">MTTR Improvement</span>
                  <span className="text-[var(--cyber-cyan)]">73%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Manual Tasks Automated</span>
                  <span className="text-[var(--cyber-cyan)]">89%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)]">Integration Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Connected Systems</span>
                  <span className="text-green-400">8/9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">API Health Score</span>
                  <span className="text-[var(--cyber-cyan)]">98.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Failed Actions</span>
                  <span className="text-red-400">2.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Avg Response Time</span>
                  <span className="text-[var(--cyber-cyan)]">850ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Playbook Detail Modal */}
      {selectedPlaybook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(selectedPlaybook.category)}
                  <div>
                    <CardTitle className="text-[var(--cyber-cyan)]">{selectedPlaybook.name}</CardTitle>
                    <CardDescription>{selectedPlaybook.description}</CardDescription>
                  </div>
                  <Badge className={getSeverityColor(selectedPlaybook.severity)}>
                    {selectedPlaybook.severity.toUpperCase()}
                  </Badge>
                </div>
                <Button 
                  onClick={() => setSelectedPlaybook(null)}
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
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Playbook Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span className="text-white">{selectedPlaybook.category.replace("_", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Trigger:</span>
                        <span className="text-white">{selectedPlaybook.trigger}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Runs:</span>
                        <span className="text-white">{selectedPlaybook.totalRuns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Success Rate:</span>
                        <span className="text-green-400">{selectedPlaybook.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Avg Duration:</span>
                        <span className="text-white">{formatDuration(selectedPlaybook.avgDuration)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlaybook.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--cyber-cyan)] mb-3">Workflow Steps</h3>
                  <div className="space-y-3">
                    {selectedPlaybook.steps.map((step, index) => (
                      <div key={step.id} className="flex items-start space-x-3 p-3 bg-[var(--cyber-steel)]/20 rounded border border-[var(--cyber-cyan)]/10">
                        <div className="flex items-center justify-center w-8 h-8 bg-[var(--cyber-cyan)]/20 rounded-full text-[var(--cyber-cyan)] text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            {getStepIcon(step.type)}
                            <h4 className="font-medium text-white">{step.name}</h4>
                            <Badge variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                              {step.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                          <div className="text-xs text-gray-400">
                            Timeout: {step.timeout}s
                            {step.onSuccess && (
                              <span className="ml-4">On Success: {step.onSuccess}</span>
                            )}
                            {step.onError && (
                              <span className="ml-4">On Error: {step.onError}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]"
                    onClick={() => {
                      executePlaybook(selectedPlaybook);
                      setSelectedPlaybook(null);
                    }}
                    disabled={isExecuting}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Execute Playbook
                  </Button>
                  <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]">
                    <Copy className="w-4 h-4 mr-2" />
                    Clone
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