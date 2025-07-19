import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward,
  Eye,
  Target,
  Zap,
  Brain,
  Shield,
  Cpu,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Rocket,
  Navigation,
  MousePointer,
  Keyboard,
  Monitor,
  Headphones,
  Search,
  Settings,
  GraduationCap,
  Award,
  Crown,
  Building
} from "lucide-react";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  target?: string; // CSS selector for element to highlight
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: string;
  tip?: string;
  icon: any;
  duration?: number; // Auto-advance time in seconds
  interactive?: boolean;
  animation?: 'pulse' | 'glow' | 'scan' | 'typing';
}

interface GuideConfig {
  id: string;
  title: string;
  description: string;
  category: 'onboarding' | 'feature' | 'advanced' | 'expert';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: GuideStep[];
  prerequisites?: string[];
  rewards?: string[];
}

interface IntelligentHudGuideProps {
  guideId: string;
  onComplete?: () => void;
  onSkip?: () => void;
  autoStart?: boolean;
  showOnlyOnce?: boolean;
}

const guideConfigs: Record<string, GuideConfig> = {
  'soc-dashboard': {
    id: 'soc-dashboard',
    title: 'SOC Command Center Mastery',
    description: 'Learn to navigate and operate the advanced Security Operations Center like a cyber warfare specialist.',
    category: 'onboarding',
    difficulty: 'beginner',
    estimatedTime: '5-7 minutes',
    prerequisites: [],
    rewards: ['SOC Navigator Badge', '100 XP', 'Dashboard Expert Achievement'],
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to SOC Command',
        description: 'You\'re now entering the nerve center of cybersecurity operations. This HUD will guide you through advanced threat monitoring capabilities.',
        position: 'center',
        icon: Shield,
        duration: 4,
        animation: 'glow'
      },
      {
        id: 'ai-status',
        title: 'TactiCore AI Systems',
        description: 'Monitor the status of our advanced AI kernels. TactiCore and Mission Ops provide real-time threat analysis and autonomous response capabilities.',
        target: '.ai-status-panel',
        position: 'bottom',
        action: 'Observe the AI performance metrics',
        tip: 'Green indicators mean optimal AI performance',
        icon: Brain,
        interactive: true,
        animation: 'pulse'
      },
      {
        id: 'threat-metrics',
        title: 'Global Threat Intelligence',
        description: 'Live threat counters showing real-time security events across monitored networks. Each metric represents active defensive operations.',
        target: '.metrics-panel',
        position: 'left',
        action: 'Review current threat levels',
        tip: 'Critical threats require immediate attention',
        icon: AlertTriangle,
        animation: 'scan'
      },
      {
        id: 'threat-map',
        title: 'Tactical Threat Visualization',
        description: 'Interactive global map displaying live cyber attacks. Each pulse represents an active threat vector being neutralized.',
        target: '.threat-map',
        position: 'top',
        action: 'Click on threat indicators for details',
        tip: 'Hover over map markers to see attack details',
        icon: Globe,
        interactive: true
      },
      {
        id: 'activity-feed',
        title: 'Live Operations Feed',
        description: 'Real-time stream of security events and AI-generated responses. This is your situational awareness center.',
        target: '.activity-feed',
        position: 'right',
        action: 'Monitor incoming security alerts',
        tip: 'Red alerts require immediate investigation',
        icon: Zap,
        animation: 'typing'
      },
      {
        id: 'mitre-framework',
        title: 'MITRE ATT&CK Integration',
        description: 'Advanced attack technique mapping based on the MITRE framework. Track adversary tactics in real-time.',
        target: '.mitre-framework',
        position: 'top',
        action: 'Explore attack technique coverage',
        tip: 'Click techniques to see detection rules',
        icon: Target,
        interactive: true
      }
    ]
  },
  'threat-detection': {
    id: 'threat-detection',
    title: 'Advanced Threat Hunting Protocol',
    description: 'Master the art of cyber threat detection using AI-powered analysis and behavioral monitoring.',
    category: 'feature',
    difficulty: 'intermediate',
    estimatedTime: '8-10 minutes',
    prerequisites: ['SOC Dashboard basics'],
    rewards: ['Threat Hunter Badge', '250 XP', 'Detection Expert Achievement'],
    steps: [
      {
        id: 'threat-overview',
        title: 'Threat Detection Matrix',
        description: 'Advanced threat classification system with AI-powered risk assessment and automated containment protocols.',
        position: 'center',
        icon: Eye,
        duration: 3,
        animation: 'scan'
      },
      {
        id: 'severity-analysis',
        title: 'Threat Severity Engine',
        description: 'AI-driven severity classification using machine learning models trained on global threat intelligence.',
        target: '.threat-severity',
        position: 'bottom',
        action: 'Review threat classification algorithms',
        tip: 'Critical threats trigger automated responses',
        icon: AlertTriangle,
        interactive: true
      },
      {
        id: 'investigation-tools',
        title: 'Digital Forensics Toolkit',
        description: 'Access advanced investigation tools including packet analysis, memory dumps, and behavioral analytics.',
        target: '.investigation-panel',
        position: 'left',
        action: 'Open investigation interface',
        tip: 'Use timeline analysis for complex incidents',
        icon: Search,
        interactive: true
      }
    ]
  },
  'network-scanner': {
    id: 'network-scanner',
    title: 'Enterprise Network Reconnaissance',
    description: 'Deploy advanced network scanning capabilities for comprehensive infrastructure assessment.',
    category: 'feature',
    difficulty: 'advanced',
    estimatedTime: '12-15 minutes',
    prerequisites: ['Threat Detection basics'],
    rewards: ['Network Architect Badge', '400 XP', 'Scanner Master Achievement'],
    steps: [
      {
        id: 'scanner-init',
        title: 'Network Scanner Initialization',
        description: 'Activating enterprise-grade network reconnaissance systems with stealth capabilities and advanced evasion techniques.',
        position: 'center',
        icon: Cpu,
        duration: 3,
        animation: 'pulse'
      },
      {
        id: 'scan-configuration',
        title: 'Scan Configuration Matrix',
        description: 'Configure advanced scanning parameters including port ranges, detection methods, and stealth modes.',
        target: '.scanner-config',
        position: 'top',
        action: 'Set scanning parameters',
        tip: 'Stealth mode avoids detection systems',
        icon: Settings,
        interactive: true
      }
    ]
  },
  'learning-center': {
    id: 'learning-center',
    title: 'Cybersecurity Academy Navigation',
    description: 'Master the enterprise learning platform with advanced certification paths and professional development.',
    category: 'onboarding',
    difficulty: 'beginner',
    estimatedTime: '6-8 minutes',
    prerequisites: [],
    rewards: ['Academy Navigator Badge', '150 XP', 'Learning Expert Achievement'],
    steps: [
      {
        id: 'academy-welcome',
        title: 'Welcome to Cyber Academy',
        description: 'Access enterprise-level cybersecurity education with industry-recognized certifications and professional mentorship.',
        position: 'center',
        icon: GraduationCap,
        duration: 4,
        animation: 'glow'
      },
      {
        id: 'certification-paths',
        title: 'Professional Certification Tracks',
        description: 'Explore advanced certification paths designed by industry experts. Each track leads to recognized professional credentials.',
        target: '.certification-grid',
        position: 'bottom',
        action: 'Browse available certifications',
        tip: 'Start with Foundation level for solid fundamentals',
        icon: Award,
        interactive: true
      },
      {
        id: 'enterprise-features',
        title: 'Enterprise Learning Features',
        description: 'Access premium content including virtual labs, mentorship programs, and industry partnerships.',
        target: '.enterprise-tab',
        position: 'right',
        action: 'Explore Enterprise tab',
        tip: 'Premium features require Professional subscription',
        icon: Crown,
        interactive: true
      }
    ]
  }
};

export default function IntelligentHudGuide({ 
  guideId, 
  onComplete, 
  onSkip, 
  autoStart = true,
  showOnlyOnce = true 
}: IntelligentHudGuideProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasShown, setHasShown] = useState(false);

  const guide = guideConfigs[guideId];

  useEffect(() => {
    if (!guide) return;
    
    // Check if guide has been shown before
    const shownGuides = localStorage.getItem('shownGuides');
    const shownList = shownGuides ? JSON.parse(shownGuides) : [];
    
    if (showOnlyOnce && shownList.includes(guideId)) {
      setHasShown(true);
      return;
    }

    if (autoStart) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [guide, guideId, autoStart, showOnlyOnce]);

  useEffect(() => {
    if (!isActive || !isPlaying) return;

    const step = guide.steps[currentStep];
    if (step?.duration && !step.interactive) {
      const timer = setTimeout(() => {
        nextStep();
      }, step.duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isActive, isPlaying]);

  useEffect(() => {
    if (isActive) {
      setProgress((currentStep / guide.steps.length) * 100);
    }
  }, [currentStep, isActive]);

  const nextStep = () => {
    if (currentStep < guide.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeGuide();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeGuide = () => {
    // Mark guide as completed
    const shownGuides = localStorage.getItem('shownGuides');
    const shownList = shownGuides ? JSON.parse(shownGuides) : [];
    if (!shownList.includes(guideId)) {
      shownList.push(guideId);
      localStorage.setItem('shownGuides', JSON.stringify(shownList));
    }

    setIsActive(false);
    setCurrentStep(0);
    onComplete?.();
  };

  const skipGuide = () => {
    setIsActive(false);
    setCurrentStep(0);
    onSkip?.();
  };

  const restartGuide = () => {
    setCurrentStep(0);
    setIsActive(true);
    setIsPlaying(true);
  };

  if (!guide || hasShown) return null;

  const currentStepData = guide.steps[currentStep];
  const IconComponent = currentStepData?.icon || Info;

  return (
    <>
      {/* Backdrop */}
      {isActive && (
        <div className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm">
          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Scanning lines effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyber-cyan)]/5 to-transparent animate-pulse"></div>
            
            {/* Corner UI elements */}
            <div className="absolute top-4 left-4 text-[var(--cyber-cyan)] font-mono text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full animate-pulse"></div>
                <span>HUD GUIDE ACTIVE</span>
              </div>
            </div>
            
            <div className="absolute top-4 right-4 text-[var(--cyber-cyan)] font-mono text-sm">
              <div className="flex items-center space-x-2">
                <span>STEP {currentStep + 1}/{guide.steps.length}</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-80">
              <div className="bg-[var(--cyber-dark)]/80 border border-[var(--cyber-cyan)]/30 rounded-lg p-2">
                <div className="flex items-center justify-between mb-2 text-xs text-[var(--cyber-cyan)]">
                  <span>{guide.title}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-[var(--cyber-dark)] rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-400 h-1 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Guide Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <Card className="glass-panel border-[var(--cyber-cyan)]/50 w-96 max-w-sm backdrop-blur-md shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 flex items-center justify-center ${
                      currentStepData?.animation === 'pulse' ? 'animate-pulse' : 
                      currentStepData?.animation === 'glow' ? 'animate-bounce' : ''
                    }`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-[var(--cyber-cyan)] text-lg font-bold">
                        {currentStepData?.title}
                      </h3>
                      <Badge variant="outline" className="text-xs text-gray-400 border-gray-500">
                        {guide.difficulty} • {guide.estimatedTime}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={skipGuide}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {currentStepData?.description}
                </p>

                {currentStepData?.action && (
                  <div className="bg-[var(--cyber-cyan)]/10 border border-[var(--cyber-cyan)]/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <MousePointer className="w-4 h-4 text-[var(--cyber-cyan)]" />
                      <span className="text-[var(--cyber-cyan)] text-sm font-semibold">Action Required</span>
                    </div>
                    <p className="text-gray-300 text-sm">{currentStepData.action}</p>
                  </div>
                )}

                {currentStepData?.tip && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">Pro Tip</span>
                    </div>
                    <p className="text-gray-300 text-sm">{currentStepData.tip}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={skipGuide}
                      className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10"
                    >
                      Skip
                    </Button>
                    <Button
                      size="sm"
                      onClick={nextStep}
                      className="bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400"
                    >
                      {currentStep === guide.steps.length - 1 ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Rewards preview */}
                {guide.rewards && currentStep === guide.steps.length - 1 && (
                  <div className="mt-4 pt-4 border-t border-[var(--cyber-cyan)]/20">
                    <h4 className="text-[var(--cyber-cyan)] text-sm font-semibold mb-2">Completion Rewards</h4>
                    <div className="flex flex-wrap gap-1">
                      {guide.rewards.map((reward, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {reward}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Target highlighting */}
          {currentStepData?.target && (
            <style>{`
              ${currentStepData.target} {
                position: relative;
                z-index: 60;
                box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2);
                border-radius: 8px;
                animation: highlight-pulse 2s infinite;
              }
              
              @keyframes highlight-pulse {
                0% { box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2); }
                50% { box-shadow: 0 0 0 8px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.4); }
                100% { box-shadow: 0 0 0 4px rgba(0, 255, 255, 0.3), 0 0 20px rgba(0, 255, 255, 0.2); }
              }
            `}</style>
          )}
        </div>
      )}

      {/* Manual trigger button when guide is not active */}
      {!isActive && !hasShown && (
        <Button
          onClick={() => setIsActive(true)}
          className="fixed bottom-6 right-6 z-40 bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400 shadow-lg"
          size="sm"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Guide
        </Button>
      )}
    </>
  );
}