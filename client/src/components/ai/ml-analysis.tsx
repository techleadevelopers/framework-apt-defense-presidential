import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  TrendingUp, 
  Activity, 
  Target, 
  Settings, 
  Zap, 
  Eye, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Square,
  Trash2,
  Edit,
  Save,
  X,
  Search,
  FileText,
  Download,
  Upload
} from "lucide-react";

interface AiModel {
  id: number;
  name: string;
  type: string;
  status: string;
  accuracy: number;
  predictions: number;
  responseTime: number;
}

interface AnalysisResult {
  id: string;
  type: string;
  confidence: number;
  status: string;
  description: string;
  timestamp: Date;
}

const mockAnalysisResults: AnalysisResult[] = [
  {
    id: "1",
    type: "Behavioral Anomaly",
    confidence: 94,
    status: "critical",
    description: "Unusual login pattern detected from user john.doe",
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: "2", 
    type: "Network Anomaly",
    confidence: 87,
    status: "high",
    description: "Abnormal data transfer volume to external IP",
    timestamp: new Date(Date.now() - 12 * 60000)
  },
  {
    id: "3",
    type: "Process Anomaly", 
    confidence: 76,
    status: "medium",
    description: "Suspicious process execution pattern identified",
    timestamp: new Date(Date.now() - 18 * 60000)
  }
];

export default function MLAnalysis() {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<string>("tacticore");
  const [trainingProgress, setTrainingProgress] = useState(78);
  const [isTraining, setIsTraining] = useState(true);
  const [aiModels, setAiModels] = useState<AiModel[]>([
    {
      id: 1,
      name: "TactiCore Kernel",
      type: "tacticore",
      status: "active",
      accuracy: 98,
      predictions: 1247,
      responseTime: 0.3
    },
    {
      id: 2,
      name: "Mission Ops Kernel",
      type: "mission_ops", 
      status: "active",
      accuracy: 95,
      predictions: 847,
      responseTime: 0.5
    }
  ]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [configuringModel, setConfiguringModel] = useState<AiModel | null>(null);
  const [trainingJobs, setTrainingJobs] = useState([
    { id: 1, name: 'Behavioral Analysis Model v3.0', dataset: '500K samples', priority: 'high', status: 'queued' },
    { id: 2, name: 'Network Anomaly Detector v1.2', dataset: '1.2M samples', priority: 'medium', status: 'queued' },
    { id: 3, name: 'Malware Classification Model', dataset: '750K samples', priority: 'low', status: 'queued' }
  ]);

  // Simulate training progress
  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            setIsTraining(false);
            toast({
              title: "Training Complete",
              description: "Advanced Threat Detection Model v2.1 training completed successfully!",
            });
            return 100;
          }
          return prev + Math.random() * 2;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isTraining, toast]);

  // Model configuration handlers
  const handleConfigureModel = (model: AiModel) => {
    setConfiguringModel(model);
    setIsConfiguring(true);
  };

  const handleSaveModelConfig = () => {
    if (configuringModel) {
      setAiModels(prev => prev.map(m => 
        m.id === configuringModel.id ? configuringModel : m
      ));
      toast({
        title: "Configuration Saved",
        description: `${configuringModel.name} configuration has been updated.`,
      });
      setIsConfiguring(false);
      setConfiguringModel(null);
    }
  };

  const handleRetrainModel = (model: AiModel) => {
    setAiModels(prev => prev.map(m => 
      m.id === model.id ? { ...m, status: 'training' } : m
    ));
    toast({
      title: "Retraining Started",
      description: `${model.name} retraining has been initiated.`,
    });
    
    // Simulate retraining completion
    setTimeout(() => {
      setAiModels(prev => prev.map(m => 
        m.id === model.id ? { ...m, status: 'active', accuracy: Math.min(100, m.accuracy + Math.random() * 5) } : m
      ));
      toast({
        title: "Retraining Complete",
        description: `${model.name} retraining completed successfully!`,
      });
    }, 10000);
  };

  // Analysis handlers
  const handleInvestigateAnalysis = (analysis: AnalysisResult) => {
    setSelectedAnalysis(analysis);
    toast({
      title: "Investigation Started",
      description: `Investigating ${analysis.type} with ${analysis.confidence}% confidence.`,
    });
  };

  const handleDismissAnalysis = (analysisId: string) => {
    toast({
      title: "Analysis Dismissed",
      description: "The analysis result has been dismissed and archived.",
    });
  };

  // Prediction handlers
  const handlePrepareDefenses = (threat: string) => {
    toast({
      title: "Defenses Prepared",
      description: `Automated defenses have been configured for ${threat}.`,
    });
  };

  // Training handlers
  const handlePauseTraining = () => {
    setIsTraining(false);
    toast({
      title: "Training Paused",
      description: "Model training has been paused. You can resume it anytime.",
    });
  };

  const handleStopTraining = () => {
    setIsTraining(false);
    setTrainingProgress(0);
    toast({
      title: "Training Stopped",
      description: "Model training has been stopped and reset.",
    });
  };

  const handleStartTrainingJob = (jobId: number) => {
    setTrainingJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: 'training' } : job
    ));
    toast({
      title: "Training Job Started",
      description: "Training job has been added to the active queue.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-[var(--cyber-red)]';
      case 'high': return 'bg-yellow-400';
      case 'medium': return 'bg-orange-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-[var(--cyber-red)]';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTimeAgo = (timestamp: Date) => {
    const diffMs = Date.now() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-6">
      {/* AI Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Brain className="w-5 h-5" />
              <span>Active Models</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">
              {aiModels?.length || 8}
            </div>
            <div className="text-sm text-gray-400">Detection engines running</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <TrendingUp className="w-5 h-5" />
              <span>Predictions/Hour</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">2,847</div>
            <div className="text-sm text-gray-400">+12% from last hour</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Target className="w-5 h-5" />
              <span>Accuracy</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">96.4%</div>
            <div className="text-sm text-gray-400">Overall model accuracy</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Interface */}
      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--cyber-navy)]">
          <TabsTrigger value="models" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Brain className="w-4 h-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="behavioral" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Activity className="w-4 h-4 mr-2" />
            Behavioral Analysis
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Eye className="w-4 h-4 mr-2" />
            Predictions
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Settings className="w-4 h-4 mr-2" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">AI Detection Models</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiModels?.map((model) => (
                  <div key={model.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{model.name}</h3>
                      <Badge className={
                        model.status === 'active' ? 'bg-green-400' :
                        model.status === 'training' ? 'bg-yellow-400' : 'bg-gray-600'
                      }>
                        {model.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span className="text-white">{model.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-[var(--cyber-cyan)]">{model.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Predictions:</span>
                        <span className="text-white">{model.predictions?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Response Time:</span>
                        <span className="text-white">{model.responseTime}ms</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <Progress value={model.accuracy} className="w-full" />
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleConfigureModel(model)}
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleRetrainModel(model)}
                          disabled={model.status === 'training'}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {model.status === 'training' ? 'Training...' : 'Retrain'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )) || (
                  // Fallback data if no models loaded
                  <>
                    <div className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">TactiCore Kernel</h3>
                        <Badge className="bg-green-400">active</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white">tacticore</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-[var(--cyber-cyan)]">98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Predictions:</span>
                          <span className="text-white">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-white">0.3ms</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Progress value={98} className="w-full" />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">Configure</Button>
                          <Button size="sm" variant="outline" className="flex-1">Retrain</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-white">Mission Ops Kernel</h3>
                        <Badge className="bg-green-400">active</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white">mission_ops</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-[var(--cyber-cyan)]">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Predictions:</span>
                          <span className="text-white">847</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response Time:</span>
                          <span className="text-white">0.5ms</span>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <Progress value={95} className="w-full" />
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">Configure</Button>
                          <Button size="sm" variant="outline" className="flex-1">Retrain</Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavioral" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Behavioral Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalysisResults.map((result) => (
                  <div key={result.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          result.status === 'critical' ? 'bg-[var(--cyber-red)]' :
                          result.status === 'high' ? 'bg-yellow-400' : 'bg-orange-400'
                        } animate-pulse`}></div>
                        <span className="font-semibold text-white">{result.type}</span>
                        <Badge className={`${getStatusColor(result.status)} text-white`}>
                          {result.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-400">{getTimeAgo(result.timestamp)}</span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{result.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">Confidence:</span>
                        <span className={`text-sm font-bold ${getConfidenceColor(result.confidence)}`}>
                          {result.confidence}%
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleInvestigateAnalysis(result)}
                        >
                          <Search className="w-3 h-3 mr-1" />
                          Investigate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDismissAnalysis(result.id)}
                        >
                          <X className="w-3 h-3 mr-1" />
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Threat Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { threat: 'Credential Stuffing Attack', probability: 87, timeframe: '2-4 hours', severity: 'high' },
                  { threat: 'DDoS Campaign', probability: 94, timeframe: '6-12 hours', severity: 'critical' },
                  { threat: 'Phishing Wave', probability: 76, timeframe: '1-3 days', severity: 'medium' },
                  { threat: 'Lateral Movement', probability: 83, timeframe: '4-8 hours', severity: 'high' },
                  { threat: 'Data Exfiltration', probability: 91, timeframe: '12-24 hours', severity: 'critical' },
                  { threat: 'Ransomware Deployment', probability: 69, timeframe: '2-5 days', severity: 'critical' }
                ].map((prediction, index) => (
                  <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white text-sm">{prediction.threat}</h3>
                      <Badge className={`${getStatusColor(prediction.severity)} text-white text-xs`}>
                        {prediction.severity}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Probability:</span>
                        <span className={`font-bold ${getConfidenceColor(prediction.probability)}`}>
                          {prediction.probability}%
                        </span>
                      </div>
                      <Progress value={prediction.probability} className="w-full" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Timeframe:</span>
                        <span className="text-[var(--cyber-cyan)]">{prediction.timeframe}</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-3"
                      onClick={() => handlePrepareDefenses(prediction.threat)}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Prepare Defenses
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Model Training Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Active Training */}
              <div className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Advanced Threat Detection Model v2.1</h3>
                  <Badge className="bg-yellow-400 text-[var(--cyber-dark)]">Training</Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-[var(--cyber-cyan)]">{trainingProgress}%</span>
                  </div>
                  <Progress value={trainingProgress} className="w-full" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Epoch:</span>
                      <span className="text-white">47/60</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ETA:</span>
                      <span className="text-white">2h 15m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Loss:</span>
                      <span className="text-white">0.0234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-[var(--cyber-cyan)]">94.7%</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={handlePauseTraining}
                      disabled={!isTraining}
                    >
                      <Pause className="w-3 h-3 mr-1" />
                      {isTraining ? 'Pause Training' : 'Paused'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="flex-1"
                      onClick={handleStopTraining}
                    >
                      <Square className="w-3 h-3 mr-1" />
                      Stop Training
                    </Button>
                  </div>
                </div>
              </div>

              {/* Training Queue */}
              <div>
                <h3 className="font-semibold text-white mb-4">Training Queue</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Behavioral Analysis Model v3.0', dataset: '500K samples', priority: 'high' },
                    { name: 'Network Anomaly Detector v1.2', dataset: '1.2M samples', priority: 'medium' },
                    { name: 'Malware Classification Model', dataset: '750K samples', priority: 'low' }
                  ].map((job, index) => (
                    <div key={index} className="bg-[var(--cyber-dark)]/30 border border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white text-sm">{job.name}</h4>
                          <p className="text-xs text-gray-400">{job.dataset}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={
                            job.priority === 'high' ? 'text-[var(--cyber-red)]' :
                            job.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                          }>
                            {job.priority}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStartTrainingJob(job.id)}
                            disabled={job.status === 'training'}
                          >
                            <Play className="w-3 h-3 mr-1" />
                            {job.status === 'training' ? 'Running' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Model Configuration Dialog */}
      <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--cyber-cyan)]">
              Configure {configuringModel?.name}
            </DialogTitle>
          </DialogHeader>
          {configuringModel && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model-name">Model Name</Label>
                  <Input
                    id="model-name"
                    value={configuringModel.name}
                    onChange={(e) => setConfiguringModel({...configuringModel, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="model-type">Model Type</Label>
                  <Select
                    value={configuringModel.type}
                    onValueChange={(value) => setConfiguringModel({...configuringModel, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tacticore">TactiCore</SelectItem>
                      <SelectItem value="mission_ops">Mission Ops</SelectItem>
                      <SelectItem value="behavioral">Behavioral Analysis</SelectItem>
                      <SelectItem value="network">Network Analysis</SelectItem>
                      <SelectItem value="malware">Malware Detection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="response-time">Response Time (ms)</Label>
                  <Input
                    id="response-time"
                    type="number"
                    value={configuringModel.responseTime}
                    onChange={(e) => setConfiguringModel({...configuringModel, responseTime: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="model-status">Status</Label>
                  <Select
                    value={configuringModel.status}
                    onValueChange={(value) => setConfiguringModel({...configuringModel, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="model-description">Configuration Notes</Label>
                <Textarea
                  id="model-description"
                  placeholder="Add configuration notes, parameter adjustments, or training details..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveModelConfig}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Investigation Details Dialog */}
      <Dialog open={!!selectedAnalysis} onOpenChange={(open) => !open && setSelectedAnalysis(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--cyber-cyan)]">
              Analysis Investigation: {selectedAnalysis?.type}
            </DialogTitle>
          </DialogHeader>
          {selectedAnalysis && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Analysis Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{selectedAnalysis.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Confidence:</span>
                      <span className={`font-bold ${getConfidenceColor(selectedAnalysis.confidence)}`}>
                        {selectedAnalysis.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Severity:</span>
                      <Badge className={`${getStatusColor(selectedAnalysis.status)} text-white`}>
                        {selectedAnalysis.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Detected:</span>
                      <span className="text-white">{getTimeAgo(selectedAnalysis.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-3">Recommended Actions</h3>
                  <div className="space-y-2">
                    {selectedAnalysis.status === 'critical' && (
                      <>
                        <div className="flex items-center space-x-2 text-red-400">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Immediate isolation required</span>
                        </div>
                        <div className="flex items-center space-x-2 text-red-400">
                          <Shield className="w-4 h-4" />
                          <span>Activate emergency protocols</span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <Eye className="w-4 h-4" />
                      <span>Monitor affected systems</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <FileText className="w-4 h-4" />
                      <span>Document incident details</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Description</h3>
                <p className="text-gray-300 bg-[var(--cyber-dark)]/30 p-4 rounded-lg">
                  {selectedAnalysis.description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Investigation Report</h3>
                <div className="bg-[var(--cyber-dark)]/30 p-4 rounded-lg">
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Timestamp:</strong> {selectedAnalysis.timestamp.toLocaleString()}</p>
                    <p><strong>Analysis ID:</strong> {selectedAnalysis.id}</p>
                    <p><strong>AI Model:</strong> TactiCore Behavioral Analysis Engine</p>
                    <p><strong>Detection Method:</strong> Pattern recognition and statistical analysis</p>
                    <p><strong>False Positive Rate:</strong> {(100 - selectedAnalysis.confidence).toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedAnalysis(null)}>
                  Close
                </Button>
                <Button onClick={() => handleDismissAnalysis(selectedAnalysis.id)}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Resolved
                </Button>
                <Button variant="destructive">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
