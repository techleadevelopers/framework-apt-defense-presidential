import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  Crown, 
  Diamond, 
  Star, 
  Trophy, 
  Target,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Brain,
  Network,
  Globe,
  Building,
  Briefcase,
  Calendar,
  ExternalLink,
  Download,
  Share2,
  Eye,
  Lock,
  Key,
  Flame,
  Lightning,
  Rocket,
  Swords,
  Bot,
  Search,
  Layers,
  Code,
  Database,
  Cloud,
  Camera,
  Smartphone
} from "lucide-react";

interface EnterpriseCertification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  level: 'Foundation' | 'Associate' | 'Professional' | 'Expert' | 'Master' | 'Executive';
  category: 'SOC' | 'IR' | 'TH' | 'PE' | 'CF' | 'AI' | 'ZT' | 'BC' | 'CM' | 'EL';
  description: string;
  requirements: string[];
  duration: string;
  earned: boolean;
  progress: number;
  marketValue: string;
  globalRecognition: boolean;
  industryDemand: 'High' | 'Very High' | 'Critical';
  salaryImpact: string;
  prerequisites: string[];
  maintainRequirements: string[];
  validityPeriod: string;
  recertificationRequired: boolean;
  partnerRecognition: string[];
  jobRoles: string[];
  careerPath: string[];
  estimatedStudyHours: number;
  practicalRequirements: number;
  mentorshipIncluded: boolean;
  exclusiveBenefits: string[];
  icon: any;
  color: string;
  nextLevel?: string;
  prerequisites_completed: boolean;
  exam_fee: string;
  success_rate: string;
  average_prep_time: string;
}

export default function EnterpriseCertificationSystem() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<EnterpriseCertification | null>(null);

  const enterpriseCertifications: EnterpriseCertification[] = [
    {
      id: 'soc-foundation',
      name: 'Security Operations Center Foundation',
      shortName: 'SOC-F',
      issuer: 'APT Defense Universe',
      level: 'Foundation',
      category: 'SOC',
      description: 'Fundamental knowledge of SOC operations, SIEM basics, and incident triage.',
      requirements: ['Complete SOC Fundamentals course', 'Pass written exam (75%)', 'Complete 20 hands-on labs'],
      duration: '3-6 months',
      earned: true,
      progress: 100,
      marketValue: '$65,000 - $85,000',
      globalRecognition: true,
      industryDemand: 'Very High',
      salaryImpact: '+15-25%',
      prerequisites: ['Basic networking knowledge', 'Computer fundamentals'],
      maintainRequirements: ['20 CPE credits annually', 'Annual skills assessment'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['Splunk', 'IBM QRadar', 'Microsoft Sentinel'],
      jobRoles: ['SOC Analyst L1', 'Security Analyst', 'Incident Responder'],
      careerPath: ['SOC Associate', 'SOC Professional', 'SOC Expert'],
      estimatedStudyHours: 120,
      practicalRequirements: 40,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Industry job board access', 'Peer networking', 'Tool discounts'],
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      nextLevel: 'SOC Associate',
      prerequisites_completed: true,
      exam_fee: '$299',
      success_rate: '78%',
      average_prep_time: '4 months'
    },
    {
      id: 'soc-associate',
      name: 'Security Operations Center Associate',
      shortName: 'SOC-A',
      issuer: 'APT Defense Universe',
      level: 'Associate',
      category: 'SOC',
      description: 'Intermediate SOC operations including advanced SIEM, correlation rules, and incident analysis.',
      requirements: ['SOC Foundation cert', 'Advanced SOC Operations course', 'Pass practical exam', '6 months SOC experience'],
      duration: '6-9 months',
      earned: false,
      progress: 65,
      marketValue: '$75,000 - $110,000',
      globalRecognition: true,
      industryDemand: 'Very High',
      salaryImpact: '+25-35%',
      prerequisites: ['SOC Foundation certification'],
      maintainRequirements: ['30 CPE credits annually', 'Practical skills assessment'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['Splunk', 'Elastic', 'CrowdStrike', 'Palo Alto Networks'],
      jobRoles: ['SOC Analyst L2', 'Security Operations Specialist', 'Threat Analyst'],
      careerPath: ['SOC Professional', 'SOC Expert', 'SOC Manager'],
      estimatedStudyHours: 180,
      practicalRequirements: 80,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Priority job matching', 'Advanced training access', 'Industry mentorship'],
      icon: Target,
      color: 'from-cyan-500 to-blue-600',
      nextLevel: 'SOC Professional',
      prerequisites_completed: true,
      exam_fee: '$499',
      success_rate: '65%',
      average_prep_time: '6 months'
    },
    {
      id: 'threat-hunter-expert',
      name: 'Advanced Threat Hunter Expert',
      shortName: 'ATH-E',
      issuer: 'Global Threat Intelligence Consortium',
      level: 'Expert',
      category: 'TH',
      description: 'Elite threat hunting capabilities including custom detection development and threat intelligence.',
      requirements: ['SOC Professional cert', 'Advanced Threat Hunting course', 'Lead 5 real hunts', 'Develop custom detections'],
      duration: '12-18 months',
      earned: false,
      progress: 25,
      marketValue: '$120,000 - $180,000',
      globalRecognition: true,
      industryDemand: 'Critical',
      salaryImpact: '+40-60%',
      prerequisites: ['SOC Associate or equivalent', '2+ years hunting experience'],
      maintainRequirements: ['40 CPE credits annually', 'Annual threat hunt project'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['MITRE', 'CrowdStrike', 'Mandiant', 'Carbon Black'],
      jobRoles: ['Threat Hunter', 'Detection Engineer', 'Threat Intelligence Analyst'],
      careerPath: ['Principal Threat Hunter', 'Threat Research Lead', 'Security Architect'],
      estimatedStudyHours: 300,
      practicalRequirements: 150,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Exclusive threat intel feeds', 'Research collaboration', 'Conference speaking ops'],
      icon: Search,
      color: 'from-purple-500 to-pink-600',
      nextLevel: 'Master Threat Hunter',
      prerequisites_completed: false,
      exam_fee: '$899',
      success_rate: '45%',
      average_prep_time: '12 months'
    },
    {
      id: 'ai-security-master',
      name: 'AI Security Architecture Master',
      shortName: 'AISA-M',
      issuer: 'AI Security Institute',
      level: 'Master',
      category: 'AI',
      description: 'Master-level AI security including ML adversarial attacks, model security, and AI governance.',
      requirements: ['AI Security Professional', 'Publish research paper', 'Lead enterprise AI security project', 'Mentor 10 professionals'],
      duration: '18-24 months',
      earned: false,
      progress: 0,
      marketValue: '$180,000 - $280,000',
      globalRecognition: true,
      industryDemand: 'Critical',
      salaryImpact: '+60-90%',
      prerequisites: ['AI Security Professional cert', 'PhD or 5+ years AI security experience'],
      maintainRequirements: ['50 CPE credits annually', 'Research contribution', 'Industry mentorship'],
      validityPeriod: '5 years',
      recertificationRequired: true,
      partnerRecognition: ['OpenAI', 'Google AI', 'Microsoft AI', 'NVIDIA', 'Tesla'],
      jobRoles: ['AI Security Architect', 'Chief AI Officer', 'AI Research Director'],
      careerPath: ['Executive AI Security Leader', 'CTO', 'Chief Security Officer'],
      estimatedStudyHours: 500,
      practicalRequirements: 300,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Research lab access', 'Patent support', 'Executive network access'],
      icon: Brain,
      color: 'from-yellow-500 to-orange-600',
      nextLevel: 'Executive AI Leader',
      prerequisites_completed: false,
      exam_fee: '$1,999',
      success_rate: '25%',
      average_prep_time: '20 months'
    },
    {
      id: 'incident-response-professional',
      name: 'Enterprise Incident Response Professional',
      shortName: 'EIR-P',
      issuer: 'International Incident Response Alliance',
      level: 'Professional',
      category: 'IR',
      description: 'Professional-level incident response including forensics, malware analysis, and crisis management.',
      requirements: ['IR Associate cert', 'Handle 20 major incidents', 'Digital forensics training', 'Crisis communication course'],
      duration: '9-12 months',
      earned: false,
      progress: 45,
      marketValue: '$95,000 - $150,000',
      globalRecognition: true,
      industryDemand: 'Very High',
      salaryImpact: '+35-50%',
      prerequisites: ['Incident Response Associate', '1+ year IR experience'],
      maintainRequirements: ['35 CPE credits annually', 'Handle minimum 5 incidents yearly'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['SANS', 'EnCase', 'Volatility', 'YARA', 'Wireshark'],
      jobRoles: ['Incident Response Manager', 'Digital Forensics Analyst', 'Crisis Response Lead'],
      careerPath: ['IR Expert', 'Chief Incident Officer', 'Security Director'],
      estimatedStudyHours: 250,
      practicalRequirements: 120,
      mentorshipIncluded: true,
      exclusiveBenefits: ['24/7 IR hotline access', 'Emergency response team', 'Legal consultation'],
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      nextLevel: 'IR Expert',
      prerequisites_completed: true,
      exam_fee: '$699',
      success_rate: '58%',
      average_prep_time: '8 months'
    },
    {
      id: 'penetration-testing-expert',
      name: 'Elite Penetration Testing Expert',
      shortName: 'EPT-E',
      issuer: 'Global Penetration Testing Council',
      level: 'Expert',
      category: 'PE',
      description: 'Expert-level penetration testing including red team operations, custom exploit development.',
      requirements: ['Advanced PT course', 'Develop 5 custom exploits', 'Lead red team exercise', 'Mentor junior testers'],
      duration: '15-18 months',
      earned: false,
      progress: 15,
      marketValue: '$130,000 - $200,000',
      globalRecognition: true,
      industryDemand: 'Critical',
      salaryImpact: '+50-70%',
      prerequisites: ['Penetration Testing Professional', '3+ years PT experience'],
      maintainRequirements: ['45 CPE credits annually', 'Annual red team participation'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['Offensive Security', 'Immunity', 'Rapid7', 'Metasploit'],
      jobRoles: ['Red Team Lead', 'Principal Penetration Tester', 'Security Consultant'],
      careerPath: ['Red Team Director', 'Security Practice Lead', 'CISO'],
      estimatedStudyHours: 400,
      practicalRequirements: 200,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Exclusive exploit research', 'Zero-day collaboration', 'Bug bounty programs'],
      icon: Swords,
      color: 'from-red-600 to-pink-600',
      nextLevel: 'Master Red Team Operator',
      prerequisites_completed: false,
      exam_fee: '$1,299',
      success_rate: '35%',
      average_prep_time: '15 months'
    },
    {
      id: 'cloud-security-architect',
      name: 'Multi-Cloud Security Architect',
      shortName: 'MCSA',
      issuer: 'Cloud Security Alliance',
      level: 'Expert',
      category: 'CF',
      description: 'Expert cloud security across AWS, Azure, GCP including zero-trust implementation.',
      requirements: ['Cloud Security Professional', 'Design 3 enterprise cloud solutions', 'Zero-trust implementation'],
      duration: '12-15 months',
      earned: false,
      progress: 30,
      marketValue: '$140,000 - $220,000',
      globalRecognition: true,
      industryDemand: 'Critical',
      salaryImpact: '+45-65%',
      prerequisites: ['Cloud Security Associate', 'Cloud platform experience'],
      maintainRequirements: ['40 CPE credits annually', 'Cloud architecture project'],
      validityPeriod: '3 years',
      recertificationRequired: true,
      partnerRecognition: ['AWS', 'Microsoft Azure', 'Google Cloud', 'HashiCorp'],
      jobRoles: ['Cloud Security Architect', 'DevSecOps Lead', 'Cloud CISO'],
      careerPath: ['Principal Cloud Architect', 'CTO', 'VP of Engineering'],
      estimatedStudyHours: 350,
      practicalRequirements: 180,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Cloud credits', 'Partner beta access', 'Architecture reviews'],
      icon: Cloud,
      color: 'from-blue-400 to-sky-500',
      nextLevel: 'Master Cloud Architect',
      prerequisites_completed: false,
      exam_fee: '$999',
      success_rate: '42%',
      average_prep_time: '10 months'
    },
    {
      id: 'executive-ciso',
      name: 'Executive CISO Leadership',
      shortName: 'CISO-E',
      issuer: 'Executive Security Institute',
      level: 'Executive',
      category: 'EL',
      description: 'C-level security leadership including board relations, strategic planning, and enterprise governance.',
      requirements: ['Master-level cert', '5+ years leadership', 'Board presentation', 'Strategic security plan'],
      duration: '24+ months',
      earned: false,
      progress: 0,
      marketValue: '$250,000 - $500,000+',
      globalRecognition: true,
      industryDemand: 'Critical',
      salaryImpact: '+100-200%',
      prerequisites: ['Master certification', 'Executive MBA or equivalent'],
      maintainRequirements: ['60 CPE credits annually', 'Board-level presentation', 'Industry leadership'],
      validityPeriod: '5 years',
      recertificationRequired: true,
      partnerRecognition: ['Fortune 500 Board Network', 'Executive Search Firms'],
      jobRoles: ['CISO', 'Chief Security Officer', 'VP of Cybersecurity'],
      careerPath: ['CEO', 'Board Member', 'Security Advisor'],
      estimatedStudyHours: 800,
      practicalRequirements: 500,
      mentorshipIncluded: true,
      exclusiveBenefits: ['Executive coaching', 'Board introductions', 'Speaking engagements'],
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      nextLevel: 'Security Industry Leader',
      prerequisites_completed: false,
      exam_fee: '$4,999',
      success_rate: '15%',
      average_prep_time: '36 months'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: Globe },
    { id: 'SOC', name: 'SOC Operations', icon: Shield },
    { id: 'IR', name: 'Incident Response', icon: Flame },
    { id: 'TH', name: 'Threat Hunting', icon: Search },
    { id: 'PE', name: 'Penetration Testing', icon: Swords },
    { id: 'CF', name: 'Cloud & Infrastructure', icon: Cloud },
    { id: 'AI', name: 'AI Security', icon: Brain },
    { id: 'ZT', name: 'Zero Trust', icon: Key },
    { id: 'BC', name: 'Blockchain & Crypto', icon: Diamond },
    { id: 'CM', name: 'Compliance & Risk', icon: Building },
    { id: 'EL', name: 'Executive Leadership', icon: Crown }
  ];

  const levels = [
    { id: 'all', name: 'All Levels', color: 'text-gray-400' },
    { id: 'Foundation', name: 'Foundation', color: 'text-blue-400' },
    { id: 'Associate', name: 'Associate', color: 'text-cyan-400' },
    { id: 'Professional', name: 'Professional', color: 'text-green-400' },
    { id: 'Expert', name: 'Expert', color: 'text-purple-400' },
    { id: 'Master', name: 'Master', color: 'text-yellow-400' },
    { id: 'Executive', name: 'Executive', color: 'text-red-400' }
  ];

  const filteredCertifications = enterpriseCertifications.filter(cert => {
    const categoryMatch = selectedCategory === 'all' || cert.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || cert.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getLevelColor = (level: string) => {
    const levelData = levels.find(l => l.id === level);
    return levelData?.color || 'text-gray-400';
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Very High': return 'text-orange-400 bg-orange-500/10 border-orange-500/30';
      case 'High': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)] mb-2">
          Enterprise Certification System
        </h2>
        <p className="text-gray-400">
          Industry-recognized certifications designed for cybersecurity professionals
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id 
                      ? 'bg-[var(--cyber-cyan)] text-black' 
                      : 'border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Level</label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level.id}
                variant={selectedLevel === level.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level.id)}
                className={`${
                  selectedLevel === level.id 
                    ? 'bg-[var(--cyber-cyan)] text-black' 
                    : 'border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10'
                }`}
              >
                {level.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCertifications.map((cert) => {
          const IconComponent = cert.icon;
          return (
            <Card key={cert.id} className="glass-panel border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/60 transition-all group">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className={`${getLevelColor(cert.level)} border-current`} variant="outline">
                      {cert.level}
                    </Badge>
                    <Badge className={getDemandColor(cert.industryDemand)} variant="outline">
                      {cert.industryDemand}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="font-orbitron text-white text-lg mb-2">
                  {cert.name}
                </CardTitle>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{cert.progress}%</span>
                  </div>
                  <Progress value={cert.progress} className="w-full" />
                  
                  {cert.earned && (
                    <div className="flex items-center space-x-2 text-green-400 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Certification Earned</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Value:</span>
                    <span className="text-green-400 font-semibold">{cert.marketValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{cert.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exam Fee:</span>
                    <span className="text-[var(--cyber-cyan)]">{cert.exam_fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate:</span>
                    <span className="text-yellow-400">{cert.success_rate}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-white text-sm">Prerequisites:</h4>
                  <div className="flex items-center space-x-2">
                    {cert.prerequisites_completed ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Lock className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm ${cert.prerequisites_completed ? 'text-green-400' : 'text-red-400'}`}>
                      {cert.prerequisites_completed ? 'Requirements Met' : 'Requirements Pending'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400"
                    onClick={() => setSelectedCert(cert)}
                  >
                    View Details
                  </Button>
                  {cert.prerequisites_completed && !cert.earned && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10"
                    >
                      Enroll
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Certification Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedCert.color} flex items-center justify-center`}>
                    <selectedCert.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-orbitron text-[var(--cyber-cyan)] text-xl mb-2">
                      {selectedCert.name}
                    </CardTitle>
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getLevelColor(selectedCert.level)} border-current`} variant="outline">
                        {selectedCert.level}
                      </Badge>
                      <Badge className="text-gray-400 border-gray-500" variant="outline">
                        {selectedCert.shortName}
                      </Badge>
                      <Badge className={getDemandColor(selectedCert.industryDemand)} variant="outline">
                        {selectedCert.industryDemand} Demand
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300 text-lg">{selectedCert.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white text-lg">Certification Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Issuing Organization:</span>
                      <span className="text-white">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{selectedCert.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Study Hours:</span>
                      <span className="text-white">{selectedCert.estimatedStudyHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Practical Hours:</span>
                      <span className="text-white">{selectedCert.practicalRequirements}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Exam Fee:</span>
                      <span className="text-[var(--cyber-cyan)]">{selectedCert.exam_fee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Success Rate:</span>
                      <span className="text-yellow-400">{selectedCert.success_rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Validity Period:</span>
                      <span className="text-white">{selectedCert.validityPeriod}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-white text-lg">Market Impact</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Value:</span>
                      <span className="text-green-400 font-semibold">{selectedCert.marketValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Salary Impact:</span>
                      <span className="text-green-400">{selectedCert.salaryImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Industry Demand:</span>
                      <span className={selectedCert.industryDemand === 'Critical' ? 'text-red-400' : 'text-orange-400'}>
                        {selectedCert.industryDemand}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Global Recognition:</span>
                      <span className="text-green-400">
                        {selectedCert.globalRecognition ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Requirements</h3>
                <ul className="space-y-2">
                  {selectedCert.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-[var(--cyber-cyan)] mt-0.5" />
                      <span className="text-gray-300 text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Career Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Job Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.jobRoles.map((role) => (
                        <Badge key={role} variant="secondary" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">Career Path</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.careerPath.map((path) => (
                        <Badge key={path} variant="outline" className="text-xs text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30">
                          {path}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">Exclusive Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedCert.exclusiveBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button 
                  className="flex-1 bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400"
                  disabled={!selectedCert.prerequisites_completed || selectedCert.earned}
                >
                  {selectedCert.earned ? 'Certification Earned' : 
                   selectedCert.prerequisites_completed ? 'Start Certification Path' : 'Prerequisites Required'}
                </Button>
                <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download Syllabus
                </Button>
                <Button variant="outline" className="border-[var(--cyber-cyan)]/30 text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}