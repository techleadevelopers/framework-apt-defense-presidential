import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, Shield, AlertTriangle, Target, Brain, 
  Network, Database, Lock, Eye, Zap, Clock,
  Code, Terminal, FileText, Bell, Filter,
  Activity, Radar, Search, Play, Save
} from "lucide-react";

interface DetectionRule {
  id: string;
  name: string;
  description: string;
  mitreId: string;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  conditions: string[];
  actions: string[];
}

interface AlertThreshold {
  category: string;
  threshold: number;
  timeWindow: number;
  enabled: boolean;
}

export default function ThreatDetectionConfig() {
  const [detectionRules, setDetectionRules] = useState<DetectionRule[]>([
    {
      id: 'powershell-execution',
      name: 'Suspicious PowerShell Execution',
      description: 'Detects obfuscated PowerShell commands and suspicious parameters',
      mitreId: 'T1059.001',
      enabled: true,
      severity: 'high',
      confidence: 85,
      conditions: [
        'Process name contains "powershell.exe"',
        'Command line contains "-EncodedCommand" OR "-WindowStyle Hidden"',
        'Parent process is not legitimate system process'
      ],
      actions: ['Generate Alert', 'Block Process', 'Collect Artifacts']
    },
    {
      id: 'lateral-movement',
      name: 'Lateral Movement Detection',
      description: 'Identifies potential lateral movement via SMB and RDP',
      mitreId: 'T1021',
      enabled: true,
      severity: 'critical',
      confidence: 92,
      conditions: [
        'Multiple failed authentication attempts',
        'New network connections to internal hosts',
        'Administrative tools executed remotely'
      ],
      actions: ['Immediate Alert', 'Isolate Host', 'Log Network Traffic']
    },
    {
      id: 'persistence-registry',
      name: 'Registry Persistence Mechanism',
      description: 'Monitors registry modifications for persistence techniques',
      mitreId: 'T1547.001',
      enabled: true,
      severity: 'medium',
      confidence: 78,
      conditions: [
        'Registry key modified in Run/RunOnce locations',
        'New service created with suspicious properties',
        'Scheduled task created by non-admin user'
      ],
      actions: ['Generate Alert', 'Monitor Process', 'Backup Registry']
    },
    {
      id: 'data-exfiltration',
      name: 'Data Exfiltration Patterns',
      description: 'Detects unusual data transfer patterns and file access',
      mitreId: 'T1041',
      enabled: false,
      severity: 'critical',
      confidence: 88,
      conditions: [
        'Large volume of data transferred externally',
        'Access to sensitive file directories',
        'Compression tools executed with large files'
      ],
      actions: ['Immediate Alert', 'Block Network Traffic', 'Preserve Evidence']
    }
  ]);

  const [alertThresholds, setAlertThresholds] = useState<AlertThreshold[]>([
    { category: 'Network Anomalies', threshold: 75, timeWindow: 5, enabled: true },
    { category: 'Process Execution', threshold: 60, timeWindow: 1, enabled: true },
    { category: 'File System Changes', threshold: 80, timeWindow: 10, enabled: true },
    { category: 'Registry Modifications', threshold: 70, timeWindow: 3, enabled: true }
  ]);

  const [customRule, setCustomRule] = useState({
    name: '',
    description: '',
    mitreId: '',
    conditions: '',
    actions: '',
    severity: 'medium' as const,
    confidence: 75
  });

  const [detectionSettings, setDetectionSettings] = useState({
    aiEnhanced: true,
    behavioralAnalysis: true,
    realTimeScanning: true,
    automaticResponse: false,
    alertAggregation: true,
    falsePositiveReduction: true,
    customSignatures: false,
    networkMonitoring: true
  });

  const [simulationMode, setSimulationMode] = useState(false);
  const [learningMode, setLearningMode] = useState(false);

  const toggleRule = (ruleId: string) => {
    setDetectionRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const updateRuleConfidence = (ruleId: string, confidence: number) => {
    setDetectionRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, confidence } : rule
    ));
  };

  const updateThreshold = (category: string, threshold: number) => {
    setAlertThresholds(prev => prev.map(thresh => 
      thresh.category === category ? { ...thresh, threshold } : thresh
    ));
  };

  const addCustomRule = () => {
    if (customRule.name && customRule.description) {
      const newRule: DetectionRule = {
        id: `custom-${Date.now()}`,
        name: customRule.name,
        description: customRule.description,
        mitreId: customRule.mitreId || 'Custom',
        enabled: true,
        severity: customRule.severity,
        confidence: customRule.confidence,
        conditions: customRule.conditions.split('\n').filter(c => c.trim()),
        actions: customRule.actions.split('\n').filter(a => a.trim())
      };
      
      setDetectionRules(prev => [...prev, newRule]);
      setCustomRule({
        name: '',
        description: '',
        mitreId: '',
        conditions: '',
        actions: '',
        severity: 'medium',
        confidence: 75
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500/30';
      case 'high': return 'border-orange-500/30';
      case 'medium': return 'border-yellow-500/30';
      case 'low': return 'border-green-500/30';
      default: return 'border-gray-500/30';
    }
  };

  const testRule = (rule: DetectionRule) => {
    // Simulate rule testing
    console.log(`Testing rule: ${rule.name}`);
    // In a real implementation, this would trigger the rule engine
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[var(--cyber-dark)]/50">
          <TabsTrigger value="rules" className="text-white">Detection Rules</TabsTrigger>
          <TabsTrigger value="thresholds" className="text-white">Alert Thresholds</TabsTrigger>
          <TabsTrigger value="custom" className="text-white">Custom Rules</TabsTrigger>
          <TabsTrigger value="settings" className="text-white">Engine Settings</TabsTrigger>
          <TabsTrigger value="testing" className="text-white">Rule Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Detection Rules Management</CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="learning-mode" className="text-sm text-gray-400">Learning Mode</Label>
                  <Switch 
                    id="learning-mode"
                    checked={learningMode}
                    onCheckedChange={setLearningMode}
                  />
                  <Label htmlFor="simulation-mode" className="text-sm text-gray-400">Simulation</Label>
                  <Switch 
                    id="simulation-mode"
                    checked={simulationMode}
                    onCheckedChange={setSimulationMode}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {detectionRules.map((rule) => (
                <div key={rule.id} className={`bg-[var(--cyber-dark)]/50 border ${getSeverityBorder(rule.severity)} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Switch 
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <div>
                        <h4 className="font-semibold text-white">{rule.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`${getSeverityColor(rule.severity)} text-white text-xs`}>
                            {rule.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                            {rule.mitreId}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[var(--cyber-cyan)] font-semibold">{rule.confidence}%</div>
                      <div className="text-xs text-gray-400">Confidence</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{rule.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-xs text-[var(--cyber-cyan)] mb-2 block">Detection Conditions:</Label>
                      <div className="space-y-1">
                        {rule.conditions.map((condition, index) => (
                          <div key={index} className="text-xs text-gray-400 flex items-center space-x-2">
                            <Eye className="w-3 h-3 text-blue-400" />
                            <span>{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-[var(--cyber-cyan)] mb-2 block">Response Actions:</Label>
                      <div className="space-y-1">
                        {rule.actions.map((action, index) => (
                          <div key={index} className="text-xs text-gray-400 flex items-center space-x-2">
                            <Zap className="w-3 h-3 text-yellow-400" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-400 mb-1 block">Confidence Threshold: {rule.confidence}%</Label>
                      <Slider
                        value={[rule.confidence]}
                        onValueChange={([value]) => updateRuleConfidence(rule.id, value)}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => testRule(rule)}
                        className="bg-[var(--cyber-cyan)]/20 border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)]"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Test Rule
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-purple-500/20 border-purple-500/30 text-purple-400"
                      >
                        <Code className="w-3 h-3 mr-1" />
                        Edit Logic
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-green-500/20 border-green-500/30 text-green-400"
                      >
                        <Activity className="w-3 h-3 mr-1" />
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Alert Threshold Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {alertThresholds.map((threshold, index) => (
                <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Switch 
                        checked={threshold.enabled}
                        onCheckedChange={(enabled) => {
                          setAlertThresholds(prev => prev.map((t, i) => 
                            i === index ? { ...t, enabled } : t
                          ));
                        }}
                      />
                      <h4 className="font-semibold text-white">{threshold.category}</h4>
                    </div>
                    <Badge className="bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]">
                      {threshold.threshold}% Threshold
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-400 mb-2 block">
                        Alert Threshold: {threshold.threshold}%
                      </Label>
                      <Slider
                        value={[threshold.threshold]}
                        onValueChange={([value]) => updateThreshold(threshold.category, value)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-400 mb-2 block">
                        Time Window: {threshold.timeWindow} minutes
                      </Label>
                      <Slider
                        value={[threshold.timeWindow]}
                        onValueChange={([value]) => {
                          setAlertThresholds(prev => prev.map((t, i) => 
                            i === index ? { ...t, timeWindow: value } : t
                          ));
                        }}
                        max={60}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Create Custom Detection Rule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rule-name" className="text-sm text-gray-400 mb-1 block">Rule Name</Label>
                  <Input
                    id="rule-name"
                    value={customRule.name}
                    onChange={(e) => setCustomRule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Custom PowerShell Detection"
                    className="bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/30 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mitre-id" className="text-sm text-gray-400 mb-1 block">MITRE ATT&CK ID</Label>
                  <Input
                    id="mitre-id"
                    value={customRule.mitreId}
                    onChange={(e) => setCustomRule(prev => ({ ...prev, mitreId: e.target.value }))}
                    placeholder="e.g., T1059.001"
                    className="bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/30 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="rule-description" className="text-sm text-gray-400 mb-1 block">Description</Label>
                <Textarea
                  id="rule-description"
                  value={customRule.description}
                  onChange={(e) => setCustomRule(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this rule detects and why it's important..."
                  className="bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/30 text-white min-h-20"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="conditions" className="text-sm text-gray-400 mb-1 block">Detection Conditions (one per line)</Label>
                  <Textarea
                    id="conditions"
                    value={customRule.conditions}
                    onChange={(e) => setCustomRule(prev => ({ ...prev, conditions: e.target.value }))}
                    placeholder="Process name contains 'suspicious.exe'&#10;Command line contains malicious pattern&#10;Network connection to known bad IP"
                    className="bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/30 text-white min-h-24"
                  />
                </div>
                
                <div>
                  <Label htmlFor="actions" className="text-sm text-gray-400 mb-1 block">Response Actions (one per line)</Label>
                  <Textarea
                    id="actions"
                    value={customRule.actions}
                    onChange={(e) => setCustomRule(prev => ({ ...prev, actions: e.target.value }))}
                    placeholder="Generate Alert&#10;Block Process&#10;Collect Forensic Evidence"
                    className="bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/30 text-white min-h-24"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-400 mb-2 block">Severity Level</Label>
                  <div className="flex space-x-2">
                    {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
                      <Button
                        key={level}
                        size="sm"
                        variant={customRule.severity === level ? "default" : "outline"}
                        onClick={() => setCustomRule(prev => ({ ...prev, severity: level }))}
                        className={`${
                          customRule.severity === level 
                            ? `${getSeverityColor(level)} text-white` 
                            : `border-${level === 'critical' ? 'red' : level === 'high' ? 'orange' : level === 'medium' ? 'yellow' : 'green'}-500/30`
                        }`}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-400 mb-2 block">Confidence Level: {customRule.confidence}%</Label>
                  <Slider
                    value={[customRule.confidence]}
                    onValueChange={([value]) => setCustomRule(prev => ({ ...prev, confidence: value }))}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
              
              <Button 
                onClick={addCustomRule}
                disabled={!customRule.name || !customRule.description}
                className="w-full bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
              >
                <Save className="w-4 h-4 mr-2" />
                Create Detection Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Detection Engine Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(detectionSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-[var(--cyber-dark)]/50 rounded-lg p-4">
                    <div>
                      <Label className="text-white font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <div className="text-xs text-gray-400 mt-1">
                        {key === 'aiEnhanced' && 'Use AI for advanced threat detection'}
                        {key === 'behavioralAnalysis' && 'Monitor user and system behavior patterns'}
                        {key === 'realTimeScanning' && 'Continuous real-time threat monitoring'}
                        {key === 'automaticResponse' && 'Auto-execute response actions'}
                        {key === 'alertAggregation' && 'Group similar alerts to reduce noise'}
                        {key === 'falsePositiveReduction' && 'ML-based false positive filtering'}
                        {key === 'customSignatures' && 'Enable custom YARA/Snort rules'}
                        {key === 'networkMonitoring' && 'Deep packet inspection and analysis'}
                      </div>
                    </div>
                    <Switch 
                      checked={value}
                      onCheckedChange={(checked) => {
                        setDetectionSettings(prev => ({ ...prev, [key]: checked }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Rule Testing & Validation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <Terminal className="w-16 h-16 text-[var(--cyber-cyan)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Interactive Rule Testing Environment</h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Test your detection rules against simulated attack scenarios and validate their effectiveness.
                </p>
                <div className="flex space-x-4 justify-center">
                  <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                    <Play className="w-4 h-4 mr-2" />
                    Start Rule Testing
                  </Button>
                  <Button variant="outline" className="border-purple-500/30 text-purple-400">
                    <FileText className="w-4 h-4 mr-2" />
                    Test Reports
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