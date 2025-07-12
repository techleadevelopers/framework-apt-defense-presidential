import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  Square, 
  Brain, 
  Target, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  Zap,
  Eye,
  Network,
  Search,
  Activity,
  TrendingUp,
  Shield,
  Clock,
  Database,
  Cpu,
  BarChart3
} from "lucide-react";

interface AnalysisLog {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success" | "analysis";
  message: string;
  details?: string;
  phase: string;
  explanation?: string;
  technicalNote?: string;
}

interface ThreatPattern {
  id: string;
  name: string;
  confidence: number;
  severity: "critical" | "high" | "medium" | "low";
  indicators: string[];
  mitreId: string;
  technique: string;
  description: string;
}

interface AnalysisResult {
  totalThreats: number;
  behavioralAnomalies: number;
  networkAnomalies: number;
  predictedThreats: number;
  riskScore: number;
  confidence: number;
  patterns: ThreatPattern[];
}

export default function AIThreatAnalysis() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<AnalysisLog[]>([]);
  const [currentPhase, setCurrentPhase] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const analysisPhases = [
    {
      name: "Data Collection",
      description: "Coletando dados de múltiplas fontes",
      duration: 2000,
      steps: [
        "Conectando aos sensores de rede",
        "Extraindo logs de segurança",
        "Coletando telemetria de endpoints",
        "Importando threat intelligence feeds"
      ]
    },
    {
      name: "Behavioral Analysis", 
      description: "Analisando padrões comportamentais",
      duration: 3000,
      steps: [
        "Estabelecendo baseline comportamental",
        "Detectando desvios estatísticos",
        "Correlacionando eventos temporais",
        "Identificando anomalias de usuário"
      ]
    },
    {
      name: "Pattern Recognition",
      description: "Reconhecimento de padrões de ataque",
      duration: 2500,
      steps: [
        "Aplicando algoritmos de ML",
        "Comparando com assinaturas conhecidas",
        "Analisando TTPs (Tactics, Techniques, Procedures)",
        "Correlacionando IOCs (Indicators of Compromise)"
      ]
    },
    {
      name: "Predictive Modeling",
      description: "Modelagem preditiva de ameaças",
      duration: 2000,
      steps: [
        "Executando modelos de predição",
        "Calculando probabilidades de ataque",
        "Identificando vetores de risco",
        "Projetando escalação de ameaças"
      ]
    },
    {
      name: "Risk Assessment",
      description: "Avaliação de riscos e priorização",
      duration: 1500,
      steps: [
        "Calculando scores de risco",
        "Priorizando ameaças críticas",
        "Avaliando impacto nos negócios",
        "Gerando recomendações"
      ]
    }
  ];

  const addLog = (level: AnalysisLog["level"], message: string, phase: string, details?: string, explanation?: string, technicalNote?: string) => {
    const newLog: AnalysisLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      details,
      phase,
      explanation,
      technicalNote
    };
    setLogs(prev => [...prev, newLog]);
  };

  const simulateDataCollection = async () => {
    setCurrentPhase("Data Collection");
    
    addLog("info", "=== INICIANDO ANÁLISE DE AMEAÇAS COM IA ===", "System Startup",
           "Sistema TactiCore IA iniciado\nModo: Análise Avançada\nVersão: 3.2.1",
           "O sistema TactiCore utiliza algoritmos de machine learning de última geração para análise comportamental e detecção de ameaças avançadas. Esta análise combina múltiplas técnicas de IA para identificar padrões ocultos.");

    addLog("info", "Conectando aos sensores de rede...", "Data Collection",
           "Sensores ativos: 247\nTráfego monitorado: 15.2 TB/dia\nLatência média: 12ms",
           "Os sensores de rede coletam metadados de tráfego em tempo real. Eles analisam headers de pacotes, fluxos de dados e padrões de comunicação sem interceptar conteúdo sensível.",
           "Técnica: Deep Packet Inspection (DPI) + Flow Analysis");

    await new Promise(resolve => setTimeout(resolve, 500));

    addLog("success", "Extraindo logs de segurança...", "Data Collection",
           "Fontes de log: SIEM, Firewalls, IDS/IPS, EDR\nVolume: 2.3M eventos/hora\nRetenção: 180 dias",
           "Os logs de segurança fornecem contexto histórico e permitem análise temporal. O sistema normaliza eventos de diferentes fontes em um formato padrão para correlação.",
           "Padrão: CEF (Common Event Format) + STIX/TAXII");

    await new Promise(resolve => setTimeout(resolve, 500));

    addLog("info", "Coletando telemetria de endpoints...", "Data Collection",
           "Endpoints ativos: 1,247\nAgentes ativos: 1,239 (99.4%)\nDados coletados: Process, Network, File, Registry",
           "A telemetria de endpoints oferece visibilidade profunda sobre atividades em estações de trabalho e servidores. Inclui execução de processos, conexões de rede e modificações de arquivos.",
           "EDR: Behavioral monitoring + Threat hunting capabilities");

    await new Promise(resolve => setTimeout(resolve, 500));

    addLog("success", "Importando threat intelligence feeds...", "Data Collection",
           "Feeds ativos: 23\nIOCs processados: 847,293\nAtualização: Tempo real\nFontes: Comerciais + Open Source",
           "Threat intelligence enriquece a análise com contexto global de ameaças. Inclui IOCs, TTPs de atores de ameaças e inteligência contextual sobre campanhas ativas.",
           "Formatos: STIX 2.1, OpenIOC, YARA rules");
  };

  const simulateBehavioralAnalysis = async () => {
    setCurrentPhase("Behavioral Analysis");

    addLog("analysis", "Estabelecendo baseline comportamental...", "Behavioral Analysis",
           "Período de baseline: 30 dias\nUsuários analisados: 1,247\nEventos processados: 15.7M\nModelos criados: 1,247",
           "O baseline comportamental é fundamental para detectar anomalias. O sistema aprende padrões normais de cada usuário: horários de login, aplicações utilizadas, recursos acessados.",
           "ML Algorithm: Isolation Forest + One-Class SVM");

    await new Promise(resolve => setTimeout(resolve, 700));

    addLog("warning", "ANOMALIA DETECTADA: Login fora do horário habitual", "Behavioral Analysis",
           "Usuário: john.doe@company.com\nHorário: 03:47 AM\nLocalização: IP externo (VPN)\nDesvio: 4.2 sigma",
           "Esta anomalia indica possível comprometimento de credenciais. O usuário normalmente acessa entre 8h-18h. Acesso noturno via VPN requer investigação.",
           "Behavioral Score: 87/100 (Alto risco)");

    await new Promise(resolve => setTimeout(resolve, 600));

    addLog("info", "Detectando desvios estatísticos...", "Behavioral Analysis",
           "Algoritmos: Z-score, IQR, DBSCAN\nDesvios identificados: 23\nSignificância: >3 sigma\nFalsos positivos: <2%",
           "A detecção estatística identifica comportamentos que se desviam significativamente da norma. Usa múltiplos algoritmos para reduzir falsos positivos.",
           "Técnicas: Multivariate analysis + Time series decomposition");

    await new Promise(resolve => setTimeout(resolve, 700));

    addLog("warning", "CORRELAÇÃO TEMPORAL: Múltiplos acessos suspeitos", "Behavioral Analysis",
           "Janela temporal: 03:00-05:00 AM\nUsuários envolvidos: 3\nSistemas acessados: 7\nPadrão: Coordenado",
           "Múltiplos usuários acessando sistemas críticos no mesmo período sugere atividade coordenada, possivelmente um ataque interno ou credenciais comprometidas.",
           "Correlation Algorithm: Temporal clustering + Graph analysis");
  };

  const simulatePatternRecognition = async () => {
    setCurrentPhase("Pattern Recognition");

    addLog("info", "Aplicando algoritmos de Machine Learning...", "Pattern Recognition",
           "Modelos ativos: Random Forest, Neural Networks, SVM\nFeatures: 247\nAccuracy: 96.4%\nF1-Score: 0.94",
           "Os algoritmos de ML analisam centenas de características para identificar padrões maliciosos. O ensemble de modelos garante alta precisão e baixa taxa de falsos positivos.",
           "Architecture: Ensemble learning + Feature engineering");

    await new Promise(resolve => setTimeout(resolve, 600));

    addLog("analysis", "PADRÃO IDENTIFICADO: Lateral Movement", "Pattern Recognition",
           "Técnica: SMB/Admin$ shares (T1021.002)\nConfiança: 94%\nHosts envolvidos: 5\nProgresso: Ativo",
           "Detectado movimento lateral usando compartilhamentos administrativos. Atacante está tentando espalhar pela rede usando credenciais comprometidas.",
           "MITRE ATT&CK: T1021.002 - Remote Services: SMB/Windows Admin Shares");

    await new Promise(resolve => setTimeout(resolve, 700));

    addLog("analysis", "PADRÃO IDENTIFICADO: Credential Dumping", "Pattern Recognition",
           "Técnica: LSASS Memory (T1003.001)\nTool detected: Mimikatz variants\nConfiança: 98%\nStatus: Bloqueado",
           "Tentativa de extração de credenciais da memória do processo LSASS. Comportamento típico de ferramentas como Mimikatz. Ação de contenção aplicada.",
           "MITRE ATT&CK: T1003.001 - OS Credential Dumping: LSASS Memory");

    await new Promise(resolve => setTimeout(resolve, 600));

    addLog("warning", "ASSINATURA CONHECIDA: Cobalt Strike Beacon", "Pattern Recognition",
           "IOC Match: HTTP Beaconing pattern\nC2 Server: 185.234.218.23\nPeriod: 60s intervals\nEncryption: AES-256",
           "Detectado padrão de comunicação típico do Cobalt Strike. Beacon está se comunicando com servidor C2 conhecido. Tráfego bloqueado automaticamente.",
           "IOC Type: Network communication pattern + JA3 fingerprint");
  };

  const simulatePredictiveModeling = async () => {
    setCurrentPhase("Predictive Modeling");

    addLog("info", "Executando modelos de predição...", "Predictive Modeling",
           "Modelos: LSTM, ARIMA, Prophet\nJanela de predição: 72 horas\nConfiança: 89%\nVariáveis: 156",
           "Os modelos preditivos analisam tendências históricas e padrões sazonais para prever futuras ameaças. Combinam análise temporal com contexto de threat intelligence.",
           "Técnica: Time series forecasting + Threat intelligence fusion");

    await new Promise(resolve => setTimeout(resolve, 800));

    addLog("warning", "PREDIÇÃO: Escalação de ataque prevista", "Predictive Modeling",
           "Probabilidade: 87%\nJanela temporal: Próximas 24h\nVetor provável: Ransomware deployment\nImpacto estimado: Alto",
           "Com base nos padrões observados, há alta probabilidade de deployment de ransomware. O atacante está na fase de reconhecimento e movimento lateral.",
           "Prediction Model: Ensemble forecasting + Attack graph analysis");

    await new Promise(resolve => setTimeout(resolve, 600));

    addLog("analysis", "VETOR DE RISCO: Sistemas críticos expostos", "Predictive Modeling",
           "Sistemas em risco: 12\nVulnerabilidades: CVE-2023-34362, CVE-2023-28252\nProbabilidade de exploração: 73%",
           "Sistemas críticos com vulnerabilidades conhecidas têm alta probabilidade de serem explorados. Patches de segurança devem ser aplicados imediatamente.",
           "Risk Calculation: CVSS score × Exposure × Threat actor capability");
  };

  const simulateRiskAssessment = async () => {
    setCurrentPhase("Risk Assessment");

    addLog("info", "Calculando scores de risco...", "Risk Assessment",
           "Metodologia: FAIR (Factor Analysis of Information Risk)\nFatores: 23\nEscala: 0-100\nPrecisão: ±5%",
           "O cálculo de risco considera múltiplos fatores: probabilidade de ataque, impacto nos negócios, capacidade de detecção e tempo de resposta.",
           "Framework: FAIR + NIST Risk Management Framework");

    await new Promise(resolve => setTimeout(resolve, 500));

    addLog("analysis", "RISCO CRÍTICO IDENTIFICADO", "Risk Assessment",
           "Score: 94/100\nCategoria: Exfiltração de dados\nSistemas afetados: 3\nDados em risco: 2.3M registros",
           "Risco crítico de exfiltração de dados confidenciais. Atacante tem acesso a sistemas com informações sensíveis. Resposta imediata necessária.",
           "Business Impact: Regulatory compliance + Reputation + Financial");

    await new Promise(resolve => setTimeout(resolve, 600));

    addLog("success", "Gerando recomendações de mitigação...", "Risk Assessment",
           "Recomendações: 7\nPrioridade alta: 3\nTempo estimado: 2-6 horas\nEfetividade: 95%",
           "Recomendações baseadas em melhores práticas de resposta a incidentes e específicas para os padrões de ataque identificados.",
           "Methodology: NIST Incident Response + MITRE D3FEND");

    // Simular resultados finais
    const mockResult: AnalysisResult = {
      totalThreats: 47,
      behavioralAnomalies: 23,
      networkAnomalies: 15,
      predictedThreats: 3,
      riskScore: 94,
      confidence: 96.4,
      patterns: [
        {
          id: "pattern-001",
          name: "APT29 - Lateral Movement Campaign",
          confidence: 94,
          severity: "critical",
          indicators: ["SMB Admin Shares", "Credential Dumping", "Living off the Land"],
          mitreId: "T1021.002",
          technique: "Remote Services: SMB/Windows Admin Shares",
          description: "Campanha ativa de movimento lateral usando técnicas típicas do APT29"
        },
        {
          id: "pattern-002", 
          name: "Cobalt Strike C2 Communication",
          confidence: 98,
          severity: "critical",
          indicators: ["HTTP Beaconing", "Encrypted C2", "JA3 Fingerprint"],
          mitreId: "T1071.001",
          technique: "Application Layer Protocol: Web Protocols",
          description: "Comunicação ativa com servidor C2 usando framework Cobalt Strike"
        },
        {
          id: "pattern-003",
          name: "Insider Threat - Credential Abuse", 
          confidence: 87,
          severity: "high",
          indicators: ["Off-hours Access", "Unusual Data Access", "Geographic Anomaly"],
          mitreId: "T1078.004",
          technique: "Valid Accounts: Cloud Accounts",
          description: "Possível uso malicioso de credenciais válidas por usuário interno"
        }
      ]
    };

    setAnalysisResult(mockResult);

    addLog("success", "=== ANÁLISE COMPLETA FINALIZADA ===", "System Summary",
           `Ameaças detectadas: ${mockResult.totalThreats}\nScore de risco: ${mockResult.riskScore}/100\nConfiança: ${mockResult.confidence}%\nTempo total: ${Math.floor(Date.now() / 1000) % 100}s`,
           "Análise completa com detecção de múltiplas ameaças ativas. Recomenda-se ação imediata para as ameaças críticas identificadas. Relatório detalhado disponível.");
  };

  const startAnalysis = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setProgress(0);
    setLogs([]);
    setAnalysisResult(null);

    try {
      let currentProgress = 0;
      const totalPhases = analysisPhases.length;

      for (let i = 0; i < totalPhases; i++) {
        if (!isRunning || isPaused) break;

        const phase = analysisPhases[i];
        
        switch (phase.name) {
          case "Data Collection":
            await simulateDataCollection();
            break;
          case "Behavioral Analysis":
            await simulateBehavioralAnalysis();
            break;
          case "Pattern Recognition":
            await simulatePatternRecognition();
            break;
          case "Predictive Modeling":
            await simulatePredictiveModeling();
            break;
          case "Risk Assessment":
            await simulateRiskAssessment();
            break;
        }

        currentProgress = ((i + 1) / totalPhases) * 100;
        setProgress(currentProgress);

        if (i < totalPhases - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }

      setCurrentPhase("Análise Concluída");
    } catch (error) {
      addLog("error", "Erro durante a análise", "Error", String(error));
    }

    setIsRunning(false);
    setProgress(100);
  };

  const pauseResumeAnalysis = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      addLog("info", "Análise RETOMADA pelo analista", "User Action", undefined,
             "O operador retomou a análise. Todos os modelos de IA continuam processando normalmente.");
    } else {
      addLog("warning", "Análise PAUSADA pelo analista", "User Action", undefined,
             "O operador pausou a análise. Os modelos de IA mantêm estado para retomada posterior.");
    }
  };

  const stopAnalysis = () => {
    setIsRunning(false);
    setIsPaused(false);
    addLog("error", "Análise INTERROMPIDA pelo analista", "User Action", undefined,
           "A análise foi interrompida. Resultados parciais estão disponíveis para revisão.");
  };

  const clearLogs = () => {
    setLogs([]);
    setAnalysisResult(null);
    setProgress(0);
    setCurrentPhase("");
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400 bg-red-400/10 border-red-400/30";
      case "high": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "low": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case "info": return <Info className="w-4 h-4 text-blue-400" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "error": return <XCircle className="w-4 h-4 text-red-400" />;
      case "success": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "analysis": return <Brain className="w-4 h-4 text-purple-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
            <Brain className="w-5 h-5" />
            <span>AI Threat Analysis Engine</span>
          </CardTitle>
          <CardDescription>
            Deep behavioral analysis, pattern recognition, and predictive threat modeling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-3">
            <Button 
              onClick={startAnalysis}
              disabled={isRunning}
              className="bg-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/80 text-[var(--cyber-dark)]"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Analysis
            </Button>

            {isRunning && (
              <>
                <Button 
                  onClick={pauseResumeAnalysis}
                  variant="outline"
                  className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                >
                  {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button 
                  onClick={stopAnalysis}
                  variant="outline"
                  className="border-red-400/30 text-red-400"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              </>
            )}

            <Button 
              onClick={clearLogs}
              variant="outline"
              className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
              disabled={isRunning}
            >
              Clear Logs
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Progresso da Análise</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {currentPhase && (
                <p className="text-xs text-[var(--cyber-cyan)]">{currentPhase}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Analysis Logs */}
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Activity className="w-5 h-5" />
              <span>Analysis Console</span>
              <Badge variant="outline" className="ml-auto text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                {logs.length} eventos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full">
              <div className="space-y-2 font-mono text-sm">
                {logs.map((log) => (
                  <div key={log.id} className="p-3 rounded bg-[var(--cyber-steel)]/20 border border-[var(--cyber-cyan)]/10">
                    <div className="flex items-start space-x-3">
                      {getLogIcon(log.level)}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                          <Badge variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                            {log.phase}
                          </Badge>
                        </div>
                        <p className="text-white">{log.message}</p>
                        {log.details && (
                          <div className="text-xs text-gray-400 bg-[var(--cyber-steel)]/30 p-2 rounded mt-2">
                            <pre className="whitespace-pre-wrap">{log.details}</pre>
                          </div>
                        )}
                        {log.explanation && (
                          <div className="text-xs text-[var(--cyber-cyan)] bg-[var(--cyber-cyan)]/5 p-2 rounded mt-2 border border-[var(--cyber-cyan)]/20">
                            <div className="flex items-start space-x-2">
                              <Brain className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <p>{log.explanation}</p>
                            </div>
                          </div>
                        )}
                        {log.technicalNote && (
                          <div className="text-xs text-orange-400 bg-orange-400/5 p-2 rounded mt-2 border border-orange-400/20">
                            <div className="flex items-start space-x-2">
                              <Cpu className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <p><strong>Técnica:</strong> {log.technicalNote}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <BarChart3 className="w-5 h-5" />
              <span>Analysis Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResult ? (
              <div className="space-y-4">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[var(--cyber-steel)]/20 rounded">
                    <div className="text-2xl font-bold text-[var(--cyber-red)]">{analysisResult.totalThreats}</div>
                    <div className="text-xs text-gray-400">Total Threats</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--cyber-steel)]/20 rounded">
                    <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{analysisResult.confidence}%</div>
                    <div className="text-xs text-gray-400">Confidence</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--cyber-steel)]/20 rounded">
                    <div className="text-2xl font-bold text-orange-400">{analysisResult.riskScore}</div>
                    <div className="text-xs text-gray-400">Risk Score</div>
                  </div>
                  <div className="text-center p-3 bg-[var(--cyber-steel)]/20 rounded">
                    <div className="text-2xl font-bold text-yellow-400">{analysisResult.predictedThreats}</div>
                    <div className="text-xs text-gray-400">Predicted</div>
                  </div>
                </div>

                <Separator className="bg-[var(--cyber-cyan)]/20" />

                {/* Threat Patterns */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--cyber-cyan)]">Detected Patterns</h4>
                  {analysisResult.patterns.map((pattern) => (
                    <div key={pattern.id} className="p-3 bg-[var(--cyber-steel)]/20 rounded border border-[var(--cyber-cyan)]/10">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-white">{pattern.name}</h5>
                        <Badge className={getSeverityColor(pattern.severity)}>
                          {pattern.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{pattern.description}</p>
                      <div className="text-xs text-gray-400">
                        <strong>MITRE:</strong> {pattern.mitreId} - {pattern.technique}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pattern.indicators.map((indicator, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                            {indicator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Execute uma análise para ver os resultados</p>
                <p className="text-sm text-gray-500 mt-2">
                  O sistema analisará comportamentos, padrões e fará predições de ameaças
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}