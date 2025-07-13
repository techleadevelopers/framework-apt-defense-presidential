import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Award, 
  Download, 
  Share2, 
  Print, 
  QrCode, 
  Shield, 
  CheckCircle,
  Calendar,
  User,
  Building,
  Globe,
  Verified,
  Star,
  Trophy,
  Certificate,
  FileText,
  Link,
  Eye
} from "lucide-react";

interface CertificationData {
  id: string;
  title: string;
  subtitle: string;
  recipientName: string;
  issuerName: string;
  issuerTitle: string;
  organizationName: string;
  dateIssued: Date;
  expirationDate?: Date;
  certificateNumber: string;
  credentialId: string;
  level: 'Foundation' | 'Professional' | 'Expert' | 'Master' | 'Executive';
  skillsValidated: string[];
  hoursCompleted: number;
  grade: string;
  verificationUrl: string;
  qrCode: string;
  digitalSignature: string;
  blockchain: boolean;
  linkedinShareable: boolean;
}

interface DigitalCertificateProps {
  certification: CertificationData;
  onDownload?: () => void;
  onShare?: () => void;
  onVerify?: () => void;
}

const mockCertifications: CertificationData[] = [
  {
    id: "cert-001",
    title: "Advanced Cybersecurity Operations Specialist",
    subtitle: "Enterprise Security Operations Center (SOC) Management",
    recipientName: "Alex Johnson",
    issuerName: "Dr. Sarah Mitchell",
    issuerTitle: "Chief Security Officer & Director of Cybersecurity Education",
    organizationName: "APT Defense Universe Academy",
    dateIssued: new Date("2025-01-13"),
    expirationDate: new Date("2027-01-13"),
    certificateNumber: "ACSOS-2025-001337",
    credentialId: "ADF-SOC-ADV-2025-001337",
    level: "Professional",
    skillsValidated: [
      "SIEM Management & Configuration",
      "Threat Hunting & Analysis",
      "Incident Response & Forensics",
      "Security Automation (SOAR)",
      "Risk Assessment & Compliance",
      "Network Security Monitoring",
      "Malware Analysis & Reverse Engineering",
      "Crisis Management & Communication"
    ],
    hoursCompleted: 120,
    grade: "A+ (95.8%)",
    verificationUrl: "https://verify.aptdefense.edu/ACSOS-2025-001337",
    qrCode: "QR_CODE_DATA_HERE",
    digitalSignature: "SHA256:a1b2c3d4e5f6...",
    blockchain: true,
    linkedinShareable: true
  },
  {
    id: "cert-002",
    title: "AI-Powered Threat Intelligence Analyst",
    subtitle: "Machine Learning in Cybersecurity & Behavioral Analytics",
    recipientName: "Alex Johnson",
    issuerName: "Prof. Marcus Chen",
    issuerTitle: "Director of AI Security Research",
    organizationName: "APT Defense Universe Academy",
    dateIssued: new Date("2025-01-10"),
    expirationDate: new Date("2026-01-10"),
    certificateNumber: "AIPTIA-2025-002156",
    credentialId: "ADF-AI-PROF-2025-002156",
    level: "Expert",
    skillsValidated: [
      "Machine Learning for Security",
      "Behavioral Analysis & Anomaly Detection",
      "AI Model Development & Training",
      "Threat Intelligence Automation",
      "Deep Learning for Malware Detection",
      "Natural Language Processing for CTI",
      "Security Data Science",
      "Adversarial AI Defense"
    ],
    hoursCompleted: 160,
    grade: "A (92.4%)",
    verificationUrl: "https://verify.aptdefense.edu/AIPTIA-2025-002156",
    qrCode: "QR_CODE_DATA_HERE",
    digitalSignature: "SHA256:f7e8d9c0b1a2...",
    blockchain: true,
    linkedinShareable: true
  }
];

export default function DigitalCertificate({ certification, onDownload, onShare, onVerify }: DigitalCertificateProps) {
  const [showFullCertificate, setShowFullCertificate] = useState(false);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Foundation': return 'text-green-400 border-green-400';
      case 'Professional': return 'text-blue-400 border-blue-400';
      case 'Expert': return 'text-purple-400 border-purple-400';
      case 'Master': return 'text-orange-400 border-orange-400';
      case 'Executive': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getLevelBg = (level: string) => {
    switch (level) {
      case 'Foundation': return 'bg-green-400/10';
      case 'Professional': return 'bg-blue-400/10';
      case 'Expert': return 'bg-purple-400/10';
      case 'Master': return 'bg-orange-400/10';
      case 'Executive': return 'bg-red-400/10';
      default: return 'bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-4">
      {/* Certificate Preview Card */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30 hover:border-[var(--cyber-cyan)]/50 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 rounded-xl ${getLevelBg(certification.level)} border ${getLevelColor(certification.level)} flex items-center justify-center`}>
                <Award className={`w-8 h-8 ${getLevelColor(certification.level).replace('border-', 'text-')}`} />
              </div>
              <div>
                <h3 className="font-orbitron text-white text-lg font-bold mb-1">
                  {certification.title}
                </h3>
                <p className="text-gray-300 text-sm mb-2">{certification.subtitle}</p>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className={getLevelColor(certification.level)}>
                    {certification.level}
                  </Badge>
                  <span className="text-[var(--cyber-cyan)] text-sm">
                    {certification.hoursCompleted}h completed
                  </span>
                  <span className="text-green-400 text-sm font-semibold">
                    {certification.grade}
                  </span>
                </div>
              </div>
            </div>
            {certification.blockchain && (
              <div className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Blockchain Verified</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Issued:</span>
                <span className="text-white">{certification.dateIssued.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Building className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Issuer:</span>
                <span className="text-white">{certification.organizationName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Certificate ID:</span>
                <span className="text-[var(--cyber-cyan)] font-mono">{certification.certificateNumber}</span>
              </div>
            </div>
            <div className="space-y-2">
              {certification.expirationDate && (
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Expires:</span>
                  <span className="text-white">{certification.expirationDate.toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm">
                <Verified className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400">Valid & Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Recognition:</span>
                <span className="text-white">Industry Standard</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm text-gray-400">Skills Validated:</span>
            {certification.skillsValidated.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {certification.skillsValidated.length > 3 && (
              <Badge variant="outline" className="text-xs text-gray-400">
                +{certification.skillsValidated.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex space-x-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400">
                  <Eye className="w-4 h-4 mr-2" />
                  View Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <DialogHeader>
                  <DialogTitle className="text-[var(--cyber-cyan)]">Digital Certificate</DialogTitle>
                </DialogHeader>
                <FullCertificateView certification={certification} />
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" onClick={onDownload} className="border-[var(--cyber-cyan)]/30">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            
            {certification.linkedinShareable && (
              <Button variant="outline" onClick={onShare} className="border-blue-500/30 text-blue-400">
                <Share2 className="w-4 h-4 mr-2" />
                Share on LinkedIn
              </Button>
            )}
            
            <Button variant="outline" onClick={onVerify} className="border-green-500/30 text-green-400">
              <QrCode className="w-4 h-4 mr-2" />
              Verify
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FullCertificateView({ certification }: { certification: CertificationData }) {
  return (
    <div className="certificate-container bg-gradient-to-br from-[var(--cyber-dark)] via-gray-900 to-black text-white p-12 rounded-2xl shadow-2xl border border-[var(--cyber-cyan)]/30" style={{ minHeight: '900px', minWidth: '1200px' }}>
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="border border-[var(--cyber-cyan)]/20"></div>
          ))}
        </div>
      </div>
      
      {/* Glowing Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[var(--cyber-cyan)]/20 to-transparent rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[var(--cyber-cyan)]/20 to-transparent rounded-tl-full"></div>

      <div className="relative z-10">
        {/* Certificate Header */}
        <div className="text-center mb-12 border-b-2 border-[var(--cyber-cyan)]/50 pb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 rounded-lg flex items-center justify-center mr-6 shadow-lg shadow-[var(--cyber-cyan)]/30">
              <Shield className="w-12 h-12 text-black" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-400 bg-clip-text text-transparent mb-2">
                APT DEFENSE UNIVERSE
              </h1>
              <p className="text-xl text-gray-300 font-light">Enterprise Cybersecurity Academy</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400 font-mono">BLOCKCHAIN VERIFIED</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <h2 className="text-3xl font-orbitron font-bold text-white mb-2">DIGITAL CERTIFICATE</h2>
            <div className="text-lg text-[var(--cyber-cyan)] font-mono tracking-wider">PROFESSIONAL CREDENTIAL</div>
          </div>
        </div>

        {/* Main Certificate Content */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <p className="text-xl text-gray-300 mb-6 font-light">This digital credential certifies that</p>
            <div className="relative inline-block">
              <h3 className="text-5xl font-orbitron font-bold text-white mb-4 relative z-10">
                {certification.recipientName}
              </h3>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-cyan)]/20 to-blue-500/20 blur-lg -z-10"></div>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent mt-2"></div>
            </div>
            <p className="text-xl text-gray-300 mb-6 mt-8 font-light">has successfully mastered and demonstrated expertise in</p>
            <h4 className="text-3xl font-bold text-white mb-3">{certification.title}</h4>
            <p className="text-xl text-[var(--cyber-cyan)] mb-8 font-medium">{certification.subtitle}</p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-b from-[var(--cyber-cyan)]/20 to-[var(--cyber-cyan)]/5 border border-[var(--cyber-cyan)]/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1 font-mono">LEVEL</div>
              <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{certification.level}</div>
            </div>
            <div className="bg-gradient-to-b from-blue-500/20 to-blue-500/5 border border-blue-500/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1 font-mono">STUDY HOURS</div>
              <div className="text-2xl font-bold text-blue-400">{certification.hoursCompleted}h</div>
            </div>
            <div className="bg-gradient-to-b from-green-500/20 to-green-500/5 border border-green-500/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1 font-mono">FINAL GRADE</div>
              <div className="text-2xl font-bold text-green-400">{certification.grade}</div>
            </div>
            <div className="bg-gradient-to-b from-purple-500/20 to-purple-500/5 border border-purple-500/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1 font-mono">DATE ISSUED</div>
              <div className="text-lg font-bold text-purple-400">{certification.dateIssued.toLocaleDateString()}</div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12">
            <h5 className="text-2xl font-orbitron font-bold text-white mb-6">VALIDATED COMPETENCIES</h5>
            <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
              {certification.skillsValidated.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 text-left bg-black/30 border border-[var(--cyber-cyan)]/20 rounded-lg p-3">
                  <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full animate-pulse flex-shrink-0"></div>
                  <span className="text-gray-200 text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Digital Signatures & Verification */}
        <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-[var(--cyber-cyan)]/30">
          <div className="text-center">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-[var(--cyber-cyan)]/30 rounded-lg p-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div className="border-t border-[var(--cyber-cyan)]/50 pt-3">
                <p className="font-bold text-white text-lg">{certification.issuerName}</p>
                <p className="text-sm text-gray-300">{certification.issuerTitle}</p>
                <p className="text-xs text-[var(--cyber-cyan)] mt-1 font-mono">DIGITALLY SIGNED</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-[var(--cyber-cyan)]/30 rounded-lg p-4 mb-4">
              <div className="w-20 h-20 bg-black border-2 border-[var(--cyber-cyan)] mx-auto mb-3 flex items-center justify-center rounded-lg">
                <QrCode className="w-12 h-12 text-[var(--cyber-cyan)]" />
              </div>
              <p className="text-xs text-gray-300 font-mono">BLOCKCHAIN VERIFICATION</p>
              <p className="text-xs text-[var(--cyber-cyan)] mt-1">SCAN TO VERIFY</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-[var(--cyber-cyan)]/30 rounded-lg p-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <div className="border-t border-green-500/50 pt-3">
                <p className="font-bold text-white text-lg">Security Verified</p>
                <p className="text-sm text-gray-300">Immutable Record</p>
                <p className="text-xs text-green-400 mt-1 font-mono">CRYPTOGRAPHICALLY SECURED</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Metadata */}
        <div className="mt-8 pt-6 border-t border-[var(--cyber-cyan)]/30">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-400 font-mono">CERTIFICATE NUMBER</p>
              <p className="text-lg font-bold text-[var(--cyber-cyan)] tracking-wider">{certification.certificateNumber}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 font-mono">CREDENTIAL ID</p>
              <p className="text-lg font-bold text-blue-400 tracking-wider">{certification.credentialId}</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400 mb-2">VERIFICATION URL</p>
            <p className="text-[var(--cyber-cyan)] text-sm font-mono underline">{certification.verificationUrl}</p>
          </div>

          {certification.blockchain && (
            <div className="flex items-center justify-center space-x-3 mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-center">
                <p className="text-green-400 font-bold">BLOCKCHAIN VERIFIED & IMMUTABLE</p>
                <p className="text-xs text-gray-400 mt-1">This certificate is cryptographically secured and cannot be forged</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CertificationManager() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)] mb-2">
          Digital Certifications
        </h2>
        <p className="text-gray-300">
          Industry-recognized credentials with blockchain verification and global recognition
        </p>
      </div>

      {mockCertifications.map((cert) => (
        <DigitalCertificate
          key={cert.id}
          certification={cert}
          onDownload={() => console.log('Downloading certificate:', cert.id)}
          onShare={() => console.log('Sharing to LinkedIn:', cert.id)}
          onVerify={() => window.open(cert.verificationUrl, '_blank')}
        />
      ))}

      {/* Statistics Panel */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30 mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-orbitron font-bold text-[var(--cyber-cyan)] mb-4">
            Certification Portfolio
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">2</div>
              <div className="text-sm text-gray-400">Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--cyber-cyan)] mb-1">280h</div>
              <div className="text-sm text-gray-400">Study Hours</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">94.1%</div>
              <div className="text-sm text-gray-400">Avg Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-1">16</div>
              <div className="text-sm text-gray-400">Skills Validated</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}