import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnterpriseLearningPlatform from "./enterprise-learning-platform";
import EnterpriseCertificationSystem from "./enterprise-certification-system";
import { CertificationManager } from "./digital-certificate";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Target, 
  Trophy, 
  Star,
  Clock,
  Users,
  CheckCircle,
  Lock,
  Play,
  FileText,
  Zap,
  Crown,
  Building,
  Rocket,
  Diamond,
  Brain,
  Globe
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  enrolled: number;
  rating: number;
  progress?: number;
  locked?: boolean;
  category: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  level: string;
  requirements: string[];
  duration: string;
  earned: boolean;
  progress: number;
}

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  content: string[];
  exercises: string[];
  completed?: boolean;
}

interface DetailedCourse extends Course {
  modules: CourseModule[];
  learningObjectives: string[];
  prerequisites: string[];
  certification: string;
  instructor: string;
  totalModules: number;
}

const detailedCourses: DetailedCourse[] = [
  {
    id: '1',
    title: 'Introduction to Cybersecurity',
    description: 'Fundamentals of cybersecurity including threat landscape, basic defense mechanisms, and security best practices.',
    level: 'beginner',
    duration: '6 hours',
    totalModules: 8,
    enrolled: 1247,
    rating: 4.8,
    progress: 75,
    category: 'Fundamentals',
    instructor: 'Dr. Sarah Chen, CISSP',
    certification: 'Cybersecurity Foundation Certificate',
    prerequisites: ['Basic computer literacy', 'Understanding of network basics'],
    learningObjectives: [
      'Understand the cybersecurity threat landscape',
      'Learn fundamental security principles',
      'Implement basic security controls',
      'Recognize common attack vectors'
    ],
    modules: [
      {
        id: '1-1',
        title: 'Introduction to Cybersecurity',
        duration: '45 min',
        description: 'Overview of cybersecurity fundamentals and importance',
        content: [
          'What is Cybersecurity?',
          'The CIA Triad: Confidentiality, Integrity, Availability',
          'Risk Management Principles',
          'Threat Actors and Motivations',
          'Current Cybersecurity Statistics and Trends'
        ],
        exercises: [
          'Identify CIA triad violations in real-world scenarios',
          'Calculate risk using probability and impact matrices',
          'Classify threat actors by motivation and capability'
        ]
      },
      {
        id: '1-2',
        title: 'Common Attack Vectors',
        duration: '50 min',
        description: 'Understanding how attackers gain access to systems',
        content: [
          'Social Engineering Attacks',
          'Phishing and Spear Phishing',
          'Malware Types: Viruses, Worms, Trojans, Ransomware',
          'Network-based Attacks',
          'Physical Security Breaches',
          'Insider Threats'
        ],
        exercises: [
          'Identify phishing emails from legitimate communications',
          'Analyze malware samples (in sandboxed environment)',
          'Create social engineering awareness scenarios'
        ]
      },
      {
        id: '1-3',
        title: 'Authentication and Access Control',
        duration: '40 min',
        description: 'Securing access to systems and data',
        content: [
          'Authentication Factors: Something you know/have/are',
          'Multi-Factor Authentication (MFA)',
          'Role-Based Access Control (RBAC)',
          'Principle of Least Privilege',
          'Identity and Access Management (IAM)',
          'Single Sign-On (SSO) Solutions'
        ],
        exercises: [
          'Configure MFA for various applications',
          'Design RBAC matrix for organizational roles',
          'Implement least privilege access policies'
        ]
      },
      {
        id: '1-4',
        title: 'Network Security Fundamentals',
        duration: '55 min',
        description: 'Protecting network infrastructure and communications',
        content: [
          'Network Segmentation and VLANs',
          'Firewalls: Types and Configuration',
          'Intrusion Detection/Prevention Systems (IDS/IPS)',
          'VPN Technologies and Implementation',
          'Network Monitoring and Traffic Analysis',
          'Wireless Security: WPA3, Enterprise Security'
        ],
        exercises: [
          'Configure firewall rules for different scenarios',
          'Set up network monitoring with packet analysis',
          'Implement secure wireless network configuration'
        ]
      },
      {
        id: '1-5',
        title: 'Endpoint Security',
        duration: '45 min',
        description: 'Securing individual devices and workstations',
        content: [
          'Antivirus and Anti-malware Solutions',
          'Endpoint Detection and Response (EDR)',
          'Device Management and Mobile Device Management (MDM)',
          'Patch Management Strategies',
          'Application Whitelisting',
          'Host-based Firewalls'
        ],
        exercises: [
          'Configure EDR solution for threat detection',
          'Create patch management policy',
          'Implement application control policies'
        ]
      },
      {
        id: '1-6',
        title: 'Data Protection and Privacy',
        duration: '50 min',
        description: 'Safeguarding sensitive information and ensuring compliance',
        content: [
          'Data Classification and Labeling',
          'Encryption: At Rest and In Transit',
          'Data Loss Prevention (DLP)',
          'Privacy Regulations: GDPR, CCPA, HIPAA',
          'Backup and Recovery Strategies',
          'Secure Data Disposal'
        ],
        exercises: [
          'Implement data classification scheme',
          'Configure encryption for databases and files',
          'Design DLP policies for sensitive data'
        ]
      },
      {
        id: '1-7',
        title: 'Security Awareness and Training',
        duration: '35 min',
        description: 'Building human firewall through education',
        content: [
          'Security Awareness Program Development',
          'Phishing Simulation and Training',
          'Incident Reporting Procedures',
          'Social Engineering Defense',
          'Password Security and Management',
          'Remote Work Security Practices'
        ],
        exercises: [
          'Create security awareness training materials',
          'Conduct phishing simulation campaign',
          'Develop incident reporting workflow'
        ]
      },
      {
        id: '1-8',
        title: 'Security Policies and Compliance',
        duration: '40 min',
        description: 'Establishing governance and regulatory compliance',
        content: [
          'Security Policy Development',
          'Compliance Frameworks: ISO 27001, NIST, SOC 2',
          'Risk Assessment and Management',
          'Audit and Assessment Procedures',
          'Business Continuity Planning',
          'Vendor Risk Management'
        ],
        exercises: [
          'Draft security policy document',
          'Conduct risk assessment using NIST framework',
          'Create business continuity plan'
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Advanced Threat Hunting',
    description: 'Advanced techniques for proactive threat hunting using SIEM, behavioral analysis, and threat intelligence.',
    level: 'advanced',
    duration: '16 hours',
    totalModules: 12,
    enrolled: 347,
    rating: 4.9,
    progress: 30,
    category: 'Threat Hunting',
    instructor: 'Marcus Rodriguez, GCTI, GCIH',
    certification: 'Advanced Threat Hunter Certification',
    prerequisites: ['Network security fundamentals', 'SIEM experience', 'Basic scripting knowledge'],
    learningObjectives: [
      'Develop proactive threat hunting methodologies',
      'Master SIEM and log analysis techniques',
      'Implement behavioral analysis for anomaly detection',
      'Create threat intelligence workflows'
    ],
    modules: [
      {
        id: '2-1',
        title: 'Threat Hunting Fundamentals',
        duration: '90 min',
        description: 'Introduction to proactive threat hunting concepts',
        content: [
          'Threat Hunting vs. Traditional Security Monitoring',
          'The Threat Hunting Process and Methodology',
          'Hypothesis-driven Hunting',
          'Threat Intelligence Integration',
          'Hunting Maturity Models',
          'Building a Threat Hunting Team'
        ],
        exercises: [
          'Develop threat hunting hypotheses',
          'Create hunting process workflow',
          'Assess organizational hunting maturity'
        ]
      },
      {
        id: '2-2',
        title: 'SIEM and Log Analysis',
        duration: '120 min',
        description: 'Advanced SIEM usage for threat detection',
        content: [
          'SIEM Architecture and Data Sources',
          'Log Parsing and Normalization',
          'Correlation Rules and Alert Tuning',
          'Statistical Analysis and Baseline Creation',
          'Custom Dashboards and Visualizations',
          'SIEM Query Languages (SPL, KQL, etc.)'
        ],
        exercises: [
          'Write complex SIEM queries for threat detection',
          'Create statistical baselines for normal behavior',
          'Build custom hunting dashboards'
        ]
      },
      {
        id: '2-3',
        title: 'Network Traffic Analysis',
        duration: '100 min',
        description: 'Deep packet inspection and network behavior analysis',
        content: [
          'Network Protocol Analysis',
          'Packet Capture and Analysis Tools',
          'Network Baseline Development',
          'Detecting Command and Control Traffic',
          'DNS Analysis and Tunneling Detection',
          'Encrypted Traffic Analysis'
        ],
        exercises: [
          'Analyze suspicious network traffic with Wireshark',
          'Identify C2 communication patterns',
          'Detect DNS tunneling attempts'
        ]
      },
      {
        id: '2-4',
        title: 'Endpoint Behavioral Analysis',
        duration: '85 min',
        description: 'Analyzing endpoint behavior for threat indicators',
        content: [
          'Process Behavior Analysis',
          'File System and Registry Monitoring',
          'PowerShell and Command Line Analysis',
          'Memory Analysis Techniques',
          'Persistence Mechanism Detection',
          'Lateral Movement Indicators'
        ],
        exercises: [
          'Analyze malicious PowerShell scripts',
          'Identify persistence mechanisms',
          'Detect lateral movement patterns'
        ]
      },
      {
        id: '2-5',
        title: 'Threat Intelligence Integration',
        duration: '95 min',
        description: 'Leveraging threat intelligence for hunting',
        content: [
          'Threat Intelligence Sources and Feeds',
          'Indicators of Compromise (IOCs)',
          'Threat Actor Profiling',
          'Intelligence-driven Hunting',
          'STIX/TAXII Implementation',
          'Threat Intelligence Platforms'
        ],
        exercises: [
          'Create threat intelligence feed integration',
          'Develop IOC hunting queries',
          'Profile threat actor TTPs'
        ]
      },
      {
        id: '2-6',
        title: 'MITRE ATT&CK for Hunters',
        duration: '80 min',
        description: 'Using MITRE ATT&CK framework for hunting',
        content: [
          'ATT&CK Framework Deep Dive',
          'Mapping TTPs to Detection Methods',
          'Technique-based Hunting',
          'ATT&CK Navigator Usage',
          'Building Detection Coverage',
          'Adversary Simulation'
        ],
        exercises: [
          'Map organizational detection to ATT&CK',
          'Create technique-based hunting queries',
          'Assess detection coverage gaps'
        ]
      },
      {
        id: '2-7',
        title: 'Automation and Orchestration',
        duration: '110 min',
        description: 'Automating threat hunting processes',
        content: [
          'SOAR Platform Integration',
          'Automated Hunting Workflows',
          'API Integration for Data Sources',
          'Machine Learning for Anomaly Detection',
          'Threat Hunting Automation Scripts',
          'Continuous Monitoring Implementation'
        ],
        exercises: [
          'Build automated hunting playbook',
          'Create ML-based anomaly detection',
          'Develop hunting automation scripts'
        ]
      },
      {
        id: '2-8',
        title: 'Advanced Persistence Detection',
        duration: '75 min',
        description: 'Identifying advanced persistence mechanisms',
        content: [
          'Registry-based Persistence',
          'Scheduled Tasks and Services',
          'WMI Event Subscriptions',
          'DLL Hijacking Detection',
          'Rootkit and Bootkit Analysis',
          'Fileless Malware Detection'
        ],
        exercises: [
          'Hunt for WMI persistence mechanisms',
          'Detect DLL hijacking attempts',
          'Analyze fileless malware techniques'
        ]
      },
      {
        id: '2-9',
        title: 'Cloud Security Hunting',
        duration: '90 min',
        description: 'Threat hunting in cloud environments',
        content: [
          'Cloud Security Monitoring',
          'Container and Kubernetes Security',
          'Cloud Service Logs Analysis',
          'Identity and Access Hunting',
          'Cloud-native Threat Detection',
          'Multi-cloud Hunting Strategies'
        ],
        exercises: [
          'Hunt for cloud privilege escalation',
          'Analyze container security events',
          'Detect cloud service abuse'
        ]
      },
      {
        id: '2-10',
        title: 'Threat Hunting Metrics',
        duration: '65 min',
        description: 'Measuring threat hunting effectiveness',
        content: [
          'Hunting Metrics and KPIs',
          'False Positive Rate Management',
          'Time to Detection Improvement',
          'Threat Hunting ROI Calculation',
          'Continuous Improvement Processes',
          'Reporting and Communication'
        ],
        exercises: [
          'Define hunting success metrics',
          'Create hunting effectiveness dashboard',
          'Develop hunting program assessment'
        ]
      },
      {
        id: '2-11',
        title: 'Advanced Malware Analysis',
        duration: '105 min',
        description: 'Deep analysis of malware for hunting insights',
        content: [
          'Static and Dynamic Analysis',
          'Reverse Engineering Techniques',
          'Behavioral Analysis Automation',
          'Malware Family Classification',
          'Threat Attribution Methods',
          'Signature Development'
        ],
        exercises: [
          'Perform static malware analysis',
          'Create behavioral hunting signatures',
          'Classify malware families'
        ]
      },
      {
        id: '2-12',
        title: 'Threat Hunting Capstone',
        duration: '120 min',
        description: 'Real-world hunting simulation and case studies',
        content: [
          'Complex Threat Scenario Analysis',
          'End-to-end Hunting Investigation',
          'Threat Actor Campaign Analysis',
          'Hunting Report Development',
          'Lessons Learned Integration',
          'Future Hunting Strategy Planning'
        ],
        exercises: [
          'Conduct full threat hunting investigation',
          'Create comprehensive hunting report',
          'Present findings to stakeholders'
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'MITRE ATT&CK Framework Mastery',
    description: 'Comprehensive guide to understanding and implementing the MITRE ATT&CK framework for threat modeling.',
    level: 'intermediate',
    duration: '12 hours',
    totalModules: 10,
    enrolled: 892,
    rating: 4.7,
    category: 'Frameworks',
    instructor: 'Jennifer Liu, SANS Instructor',
    certification: 'MITRE ATT&CK Specialist',
    prerequisites: ['Basic cybersecurity knowledge', 'Incident response experience'],
    learningObjectives: [
      'Master MITRE ATT&CK framework structure',
      'Implement ATT&CK for threat modeling',
      'Develop detection and response strategies',
      'Create ATT&CK-based security programs'
    ],
    modules: [
      {
        id: '3-1',
        title: 'ATT&CK Framework Overview',
        duration: '70 min',
        description: 'Understanding the structure and purpose of MITRE ATT&CK',
        content: [
          'History and Evolution of ATT&CK',
          'Framework Structure: Tactics, Techniques, Procedures',
          'ATT&CK Matrices: Enterprise, Mobile, ICS',
          'Data Sources and Detection Methods',
          'Adversary Groups and Software',
          'Mitigations and Defenses'
        ],
        exercises: [
          'Navigate ATT&CK framework effectively',
          'Map real-world attack to ATT&CK techniques',
          'Identify detection data sources'
        ]
      },
      {
        id: '3-2',
        title: 'Threat Modeling with ATT&CK',
        duration: '80 min',
        description: 'Using ATT&CK for comprehensive threat modeling',
        content: [
          'Threat Modeling Methodologies',
          'Adversary Emulation Planning',
          'Technique Selection and Prioritization',
          'Attack Path Analysis',
          'Threat Landscape Mapping',
          'Scenario Development'
        ],
        exercises: [
          'Create threat model for organization',
          'Develop adversary emulation plan',
          'Map attack paths using ATT&CK'
        ]
      },
      {
        id: '3-3',
        title: 'Detection Strategy Development',
        duration: '85 min',
        description: 'Building detection capabilities using ATT&CK',
        content: [
          'Detection Coverage Assessment',
          'Data Source Mapping',
          'Detection Rule Development',
          'Behavioral Analytics Implementation',
          'False Positive Management',
          'Detection Maturity Models'
        ],
        exercises: [
          'Assess organizational detection coverage',
          'Create ATT&CK-based detection rules',
          'Develop detection improvement roadmap'
        ]
      },
      {
        id: '3-4',
        title: 'ATT&CK Navigator Deep Dive',
        duration: '60 min',
        description: 'Mastering the ATT&CK Navigator tool',
        content: [
          'Navigator Interface and Features',
          'Layer Creation and Management',
          'Visualization Techniques',
          'Data Integration Methods',
          'Collaboration and Sharing',
          'Custom Layer Development'
        ],
        exercises: [
          'Create custom ATT&CK layers',
          'Visualize threat actor campaigns',
          'Build detection coverage heatmaps'
        ]
      },
      {
        id: '3-5',
        title: 'Adversary Emulation',
        duration: '95 min',
        description: 'Simulating adversary behavior using ATT&CK',
        content: [
          'Red Team Planning with ATT&CK',
          'Technique Implementation',
          'Tool Selection and Usage',
          'Scenario Execution',
          'Blue Team Integration',
          'Emulation Assessment'
        ],
        exercises: [
          'Plan red team engagement using ATT&CK',
          'Execute specific ATT&CK techniques',
          'Assess blue team detection capabilities'
        ]
      },
      {
        id: '3-6',
        title: 'ATT&CK for Incident Response',
        duration: '75 min',
        description: 'Leveraging ATT&CK during incident response',
        content: [
          'Incident Classification with ATT&CK',
          'Timeline Analysis and Mapping',
          'Attribution and Actor Identification',
          'Response Strategy Development',
          'Lessons Learned Integration',
          'Threat Intelligence Enrichment'
        ],
        exercises: [
          'Map incident to ATT&CK framework',
          'Identify threat actor TTPs',
          'Develop targeted response strategies'
        ]
      },
      {
        id: '3-7',
        title: 'Defensive Countermeasures',
        duration: '70 min',
        description: 'Implementing defenses against ATT&CK techniques',
        content: [
          'Mitigation Strategy Development',
          'Technical Controls Implementation',
          'Policy and Procedure Updates',
          'Security Architecture Enhancement',
          'Defense in Depth Strategies',
          'Continuous Improvement'
        ],
        exercises: [
          'Map mitigations to ATT&CK techniques',
          'Develop defense implementation plan',
          'Assess mitigation effectiveness'
        ]
      },
      {
        id: '3-8',
        title: 'ATT&CK for Threat Intelligence',
        duration: '80 min',
        description: 'Enhancing threat intelligence with ATT&CK',
        content: [
          'Intelligence Collection and Analysis',
          'Threat Actor Profiling',
          'Campaign Attribution',
          'Intelligence Sharing Standards',
          'Predictive Analysis',
          'Strategic Intelligence Development'
        ],
        exercises: [
          'Profile threat actors using ATT&CK',
          'Create intelligence requirements',
          'Develop predictive threat models'
        ]
      },
      {
        id: '3-9',
        title: 'Organizational ATT&CK Implementation',
        duration: '90 min',
        description: 'Implementing ATT&CK across the organization',
        content: [
          'Implementation Planning',
          'Stakeholder Engagement',
          'Training and Awareness',
          'Process Integration',
          'Success Metrics Definition',
          'Change Management'
        ],
        exercises: [
          'Create ATT&CK implementation plan',
          'Develop training curriculum',
          'Define success metrics'
        ]
      },
      {
        id: '3-10',
        title: 'Advanced ATT&CK Applications',
        duration: '85 min',
        description: 'Advanced use cases and future developments',
        content: [
          'Custom Technique Development',
          'ATT&CK API Integration',
          'Automation and Orchestration',
          'Machine Learning Applications',
          'Future Framework Evolution',
          'Community Contributions'
        ],
        exercises: [
          'Develop custom ATT&CK techniques',
          'Create API-based integrations',
          'Build automated ATT&CK workflows'
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Incident Response Mastery',
    description: 'Complete incident response lifecycle from detection to recovery and lessons learned.',
    level: 'advanced',
    duration: '20 hours',
    totalModules: 15,
    enrolled: 456,
    rating: 4.9,
    category: 'Incident Response',
    instructor: 'David Park, GCIH, GCFA',
    certification: 'Incident Response Expert',
    prerequisites: ['Network security fundamentals', 'Digital forensics basics', 'SIEM experience'],
    learningObjectives: [
      'Master incident response lifecycle',
      'Develop forensic investigation skills',
      'Implement recovery and containment strategies',
      'Create comprehensive IR programs'
    ],
    modules: [
      {
        id: '4-1',
        title: 'Incident Response Framework',
        duration: '90 min',
        description: 'Foundation of incident response methodology',
        content: [
          'IR Lifecycle: Preparation, Detection, Analysis, Containment, Recovery',
          'NIST 800-61 Guidelines',
          'IR Team Structure and Roles',
          'Communication and Escalation Procedures',
          'Legal and Regulatory Considerations',
          'IR Tools and Technologies'
        ],
        exercises: [
          'Design IR team structure',
          'Create IR communication plan',
          'Develop escalation procedures'
        ]
      },
      {
        id: '4-2',
        title: 'Incident Detection and Analysis',
        duration: '100 min',
        description: 'Identifying and analyzing security incidents',
        content: [
          'Detection Methods and Sources',
          'Alert Triage and Prioritization',
          'Initial Analysis Techniques',
          'Indicator of Compromise (IOC) Analysis',
          'Timeline Development',
          'Evidence Collection and Preservation'
        ],
        exercises: [
          'Perform initial incident analysis',
          'Develop incident timeline',
          'Collect and preserve digital evidence'
        ]
      },
      {
        id: '4-3',
        title: 'Digital Forensics Fundamentals',
        duration: '110 min',
        description: 'Essential forensic skills for incident response',
        content: [
          'Forensic Methodology and Best Practices',
          'Evidence Acquisition and Chain of Custody',
          'File System Analysis',
          'Memory Forensics',
          'Network Forensics',
          'Forensic Tool Usage'
        ],
        exercises: [
          'Acquire forensic images',
          'Analyze file system artifacts',
          'Perform memory analysis'
        ]
      },
      {
        id: '4-4',
        title: 'Malware Analysis for IR',
        duration: '95 min',
        description: 'Analyzing malware during incident response',
        content: [
          'Malware Identification and Classification',
          'Static Analysis Techniques',
          'Dynamic Analysis in Sandbox',
          'Behavioral Analysis',
          'Reverse Engineering Basics',
          'Malware Attribution'
        ],
        exercises: [
          'Perform static malware analysis',
          'Analyze malware behavior',
          'Create malware signatures'
        ]
      },
      {
        id: '4-5',
        title: 'Containment Strategies',
        duration: '80 min',
        description: 'Effective incident containment techniques',
        content: [
          'Containment Strategy Selection',
          'Network Isolation Techniques',
          'Endpoint Containment',
          'Account and Access Control',
          'Damage Assessment',
          'Business Impact Consideration'
        ],
        exercises: [
          'Implement network segmentation',
          'Perform endpoint isolation',
          'Assess incident impact'
        ]
      },
      {
        id: '4-6',
        title: 'Eradication and Recovery',
        duration: '85 min',
        description: 'Removing threats and restoring operations',
        content: [
          'Threat Removal Techniques',
          'System Hardening',
          'Patch Management',
          'Backup and Recovery Procedures',
          'System Restoration',
          'Validation and Testing'
        ],
        exercises: [
          'Remove malware from systems',
          'Implement security hardening',
          'Validate system recovery'
        ]
      },
      {
        id: '4-7',
        title: 'Communication and Reporting',
        duration: '70 min',
        description: 'Effective incident communication strategies',
        content: [
          'Stakeholder Communication',
          'Executive Briefings',
          'Technical Reporting',
          'Legal and Regulatory Reporting',
          'Media Relations',
          'Customer Communication'
        ],
        exercises: [
          'Create incident status reports',
          'Develop executive briefing',
          'Write technical incident report'
        ]
      },
      {
        id: '4-8',
        title: 'Legal and Regulatory Aspects',
        duration: '75 min',
        description: 'Understanding legal requirements in IR',
        content: [
          'Legal Framework and Compliance',
          'Evidence Handling and Chain of Custody',
          'Law Enforcement Coordination',
          'Breach Notification Requirements',
          'Litigation Support',
          'Privacy Considerations'
        ],
        exercises: [
          'Develop breach notification plan',
          'Create evidence handling procedures',
          'Practice law enforcement coordination'
        ]
      },
      {
        id: '4-9',
        title: 'Advanced Forensic Techniques',
        duration: '105 min',
        description: 'Advanced forensic analysis methods',
        content: [
          'Advanced File System Analysis',
          'Registry Forensics',
          'Browser Forensics',
          'Mobile Device Forensics',
          'Cloud Forensics',
          'Anti-forensics Detection'
        ],
        exercises: [
          'Perform advanced registry analysis',
          'Analyze browser artifacts',
          'Examine cloud service logs'
        ]
      },
      {
        id: '4-10',
        title: 'Threat Intelligence Integration',
        duration: '80 min',
        description: 'Leveraging threat intelligence in IR',
        content: [
          'Intelligence-driven IR',
          'IOC Integration and Analysis',
          'Threat Actor Attribution',
          'Campaign Analysis',
          'Intelligence Sharing',
          'Predictive Analysis'
        ],
        exercises: [
          'Integrate threat intelligence feeds',
          'Perform threat actor attribution',
          'Create intelligence-driven playbooks'
        ]
      },
      {
        id: '4-11',
        title: 'Automation and Orchestration',
        duration: '90 min',
        description: 'Automating incident response processes',
        content: [
          'SOAR Platform Implementation',
          'Automated Response Playbooks',
          'API Integration',
          'Workflow Automation',
          'Decision Trees and Logic',
          'Human-in-the-loop Processes'
        ],
        exercises: [
          'Create automated IR playbooks',
          'Implement SOAR workflows',
          'Develop API integrations'
        ]
      },
      {
        id: '4-12',
        title: 'Crisis Management',
        duration: '85 min',
        description: 'Managing major security incidents',
        content: [
          'Crisis Management Framework',
          'Emergency Response Procedures',
          'Business Continuity Planning',
          'Disaster Recovery Integration',
          'Stakeholder Management',
          'Public Relations'
        ],
        exercises: [
          'Develop crisis management plan',
          'Practice emergency response',
          'Create business continuity procedures'
        ]
      },
      {
        id: '4-13',
        title: 'Lessons Learned and Improvement',
        duration: '70 min',
        description: 'Continuous improvement of IR capabilities',
        content: [
          'Post-incident Analysis',
          'Lessons Learned Documentation',
          'Process Improvement',
          'Training and Awareness Updates',
          'Metrics and KPIs',
          'Capability Assessment'
        ],
        exercises: [
          'Conduct post-incident review',
          'Document lessons learned',
          'Create improvement action plan'
        ]
      },
      {
        id: '4-14',
        title: 'Tabletop Exercises',
        duration: '100 min',
        description: 'Practical incident response simulation',
        content: [
          'Exercise Planning and Design',
          'Scenario Development',
          'Facilitation Techniques',
          'Participant Roles and Responsibilities',
          'Evaluation and Assessment',
          'Follow-up Actions'
        ],
        exercises: [
          'Design tabletop exercise',
          'Facilitate IR simulation',
          'Evaluate team performance'
        ]
      },
      {
        id: '4-15',
        title: 'IR Program Management',
        duration: '95 min',
        description: 'Building and managing IR programs',
        content: [
          'Program Strategy and Planning',
          'Resource Allocation',
          'Team Development',
          'Technology Selection',
          'Vendor Management',
          'Program Metrics and ROI'
        ],
        exercises: [
          'Create IR program strategy',
          'Develop resource requirements',
          'Define program success metrics'
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Penetration Testing Fundamentals',
    description: 'Comprehensive introduction to ethical hacking and penetration testing methodologies.',
    level: 'intermediate',
    duration: '14 hours',
    totalModules: 12,
    enrolled: 678,
    rating: 4.8,
    category: 'Penetration Testing',
    instructor: 'Alex Thompson, OSCP, CEH',
    certification: 'Penetration Tester Associate',
    prerequisites: ['Network fundamentals', 'Linux/Windows administration', 'Basic scripting'],
    learningObjectives: [
      'Master penetration testing methodology',
      'Learn vulnerability assessment techniques',
      'Understand exploit development basics',
      'Develop ethical hacking skills'
    ],
    modules: [
      {
        id: '5-1',
        title: 'Penetration Testing Methodology',
        duration: '80 min',
        description: 'Systematic approach to penetration testing',
        content: [
          'Penetration Testing Phases',
          'Reconnaissance and Information Gathering',
          'Vulnerability Assessment',
          'Exploitation Techniques',
          'Post-exploitation Activities',
          'Reporting and Remediation'
        ],
        exercises: [
          'Plan penetration testing engagement',
          'Perform reconnaissance on target',
          'Document testing methodology'
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Cloud Security Architecture',
    description: 'Designing and implementing security in cloud environments across AWS, Azure, and GCP.',
    level: 'advanced',
    duration: '18 hours',
    totalModules: 14,
    enrolled: 523,
    rating: 4.7,
    category: 'Cloud Security',
    instructor: 'Maria Santos, CCSP, AWS Security',
    certification: 'Cloud Security Architect',
    prerequisites: ['Cloud computing basics', 'Network security', 'Identity management'],
    learningObjectives: [
      'Design secure cloud architectures',
      'Implement cloud security controls',
      'Manage cloud compliance requirements',
      'Secure multi-cloud environments'
    ],
    modules: [
      {
        id: '6-1',
        title: 'Cloud Security Fundamentals',
        duration: '90 min',
        description: 'Core principles of cloud security',
        content: [
          'Cloud Service Models (IaaS, PaaS, SaaS)',
          'Shared Responsibility Model',
          'Cloud Security Frameworks',
          'Risk Assessment in Cloud',
          'Compliance and Governance',
          'Cloud Security Tools'
        ],
        exercises: [
          'Analyze shared responsibility models',
          'Assess cloud security risks',
          'Create cloud governance framework'
        ]
      }
    ]
  },
  {
    id: '7',
    title: 'DeFi Security & Reentrancy Attacks',
    description: 'Comprehensive course on DeFi security vulnerabilities, reentrancy attacks, and blockchain smart contract exploitation.',
    level: 'advanced',
    duration: '22 hours',
    totalModules: 16,
    enrolled: 892,
    rating: 4.9,
    category: 'Blockchain Security',
    instructor: 'Dr. Elena Vasquez, DeFi Security Expert',
    certification: 'DeFi Security Specialist',
    prerequisites: ['Blockchain fundamentals', 'Smart contract basics', 'Solidity programming', 'Financial systems knowledge'],
    learningObjectives: [
      'Master reentrancy attack vectors and prevention',
      'Understand DeFi protocol vulnerabilities',
      'Learn flash loan attack techniques',
      'Develop secure smart contract practices'
    ],
    modules: [
      {
        id: '7-1',
        title: 'DeFi Ecosystem & Attack Landscape',
        duration: '95 min',
        description: 'Overview of DeFi protocols and common attack vectors',
        content: [
          'DeFi Protocol Architecture',
          'Automated Market Makers (AMMs)',
          'Lending & Borrowing Protocols',
          'Yield Farming & Liquidity Mining',
          'Cross-Chain Bridges & Risks',
          'Historical DeFi Attacks Analysis'
        ],
        exercises: [
          'Analyze major DeFi hacks (2020-2024)',
          'Map attack vectors to protocol types',
          'Identify vulnerable DeFi components'
        ]
      },
      {
        id: '7-2',
        title: 'Reentrancy Attacks Deep Dive',
        duration: '110 min',
        description: 'Complete understanding of reentrancy vulnerabilities',
        content: [
          'What is Reentrancy?',
          'Single-Function Reentrancy',
          'Cross-Function Reentrancy',
          'Cross-Contract Reentrancy',
          'The DAO Attack Case Study',
          'Read-Only Reentrancy Attacks'
        ],
        exercises: [
          'Exploit vulnerable smart contract',
          'Create reentrancy attack simulation',
          'Analyze real reentrancy exploits'
        ]
      },
      {
        id: '7-3',
        title: 'Flash Loan Attack Mechanics',
        duration: '125 min',
        description: 'Advanced flash loan exploitation techniques',
        content: [
          'Flash Loan Fundamentals',
          'Arbitrage vs Exploitation',
          'Price Oracle Manipulation',
          'Liquidity Pool Attacks',
          'Compound Finance Exploit',
          'Harvest Finance Attack Analysis'
        ],
        exercises: [
          'Execute flash loan arbitrage',
          'Simulate oracle manipulation',
          'Recreate historical flash loan attacks'
        ]
      },
      {
        id: '7-4',
        title: 'Smart Contract Security Patterns',
        duration: '100 min',
        description: 'Defensive programming for DeFi protocols',
        content: [
          'Checks-Effects-Interactions Pattern',
          'Reentrancy Guards Implementation',
          'Pull vs Push Payment Patterns',
          'Time-Lock Mechanisms',
          'Multi-Signature Wallets',
          'Proxy Contract Security'
        ],
        exercises: [
          'Implement reentrancy guard',
          'Create secure withdrawal function',
          'Design time-locked operations'
        ]
      },
      {
        id: '7-5',
        title: 'Advanced DeFi Exploits',
        duration: '130 min',
        description: 'Complex multi-vector DeFi attacks',
        content: [
          'Sandwich Attacks & MEV',
          'Governance Token Manipulation',
          'Cross-Chain Bridge Exploits',
          'Yield Farming Rug Pulls',
          'Front-Running Attacks',
          'Slippage Manipulation'
        ],
        exercises: [
          'Execute sandwich attack simulation',
          'Analyze governance attacks',
          'Identify bridge vulnerabilities'
        ]
      },
      {
        id: '7-6',
        title: 'DeFi Protocol Auditing',
        duration: '115 min',
        description: 'Professional smart contract security assessment',
        content: [
          'Automated Security Tools',
          'Manual Code Review Process',
          'Economic Security Analysis',
          'Formal Verification Methods',
          'Bug Bounty Programs',
          'Post-Deployment Monitoring'
        ],
        exercises: [
          'Conduct full protocol audit',
          'Use automated analysis tools',
          'Create security report'
        ]
      }
    ]
  },
  {
    id: '8',
    title: 'Emerging Blockchain Threats 2025',
    description: 'Cutting-edge course on future blockchain attack vectors, quantum threats, and next-generation DeFi exploits.',
    level: 'advanced',
    duration: '18 hours',
    totalModules: 12,
    enrolled: 234,
    rating: 4.8,
    category: 'Future Threats',
    instructor: 'Marcus Chen, Blockchain Security Researcher',
    certification: 'Emerging Threat Analyst',
    prerequisites: ['DeFi Security course', 'Advanced cryptography', 'Quantum computing basics'],
    learningObjectives: [
      'Understand quantum threats to blockchain',
      'Master Layer 2 security vulnerabilities',
      'Predict future attack vectors',
      'Develop quantum-resistant defenses'
    ],
    modules: [
      {
        id: '8-1',
        title: 'Quantum Threats to Blockchain',
        duration: '90 min',
        description: 'Post-quantum cryptography and blockchain security',
        content: [
          'Quantum Computing Fundamentals',
          'Shor\'s Algorithm Impact on RSA/ECC',
          'Quantum-Resistant Cryptography',
          'Timeline of Quantum Threats',
          'Blockchain Migration Strategies',
          'Post-Quantum Signature Schemes'
        ],
        exercises: [
          'Analyze quantum vulnerability timeline',
          'Implement post-quantum signatures',
          'Design quantum-resistant protocols'
        ]
      },
      {
        id: '8-2',
        title: 'Layer 2 & Rollup Security',
        duration: '105 min',
        description: 'Security challenges in scaling solutions',
        content: [
          'Optimistic Rollup Vulnerabilities',
          'ZK-Rollup Attack Vectors',
          'State Channel Exploits',
          'Plasma Security Issues',
          'Cross-Rollup Bridge Attacks',
          'Sequencer Centralization Risks'
        ],
        exercises: [
          'Exploit rollup exit mechanisms',
          'Analyze ZK-proof vulnerabilities',
          'Simulate state channel attacks'
        ]
      },
      {
        id: '8-3',
        title: 'AI-Powered Blockchain Attacks',
        duration: '95 min',
        description: 'Machine learning enhanced exploit techniques',
        content: [
          'AI-Driven Smart Contract Analysis',
          'Automated Vulnerability Discovery',
          'ML-Based Front-Running Bots',
          'Adversarial AI in DeFi',
          'Pattern Recognition Attacks',
          'Deepfake Attacks on Governance'
        ],
        exercises: [
          'Train ML model for vuln detection',
          'Create AI-powered MEV bot',
          'Implement adversarial attacks'
        ]
      },
      {
        id: '8-4',
        title: 'Next-Gen DeFi Attack Vectors',
        duration: '120 min',
        description: 'Future DeFi protocol vulnerabilities',
        content: [
          'Liquid Staking Derivatives Risks',
          'Real World Asset (RWA) Attacks',
          'Decentralized Identity Exploits',
          'Cross-Chain Interoperability Risks',
          'NFT Financialization Attacks',
          'Prediction Market Manipulation'
        ],
        exercises: [
          'Exploit liquid staking protocols',
          'Analyze RWA tokenization risks',
          'Simulate cross-chain attacks'
        ]
      },
      {
        id: '8-5',
        title: 'Blockchain Compliance & Regulation',
        duration: '85 min',
        description: 'Future regulatory landscape and compliance attacks',
        content: [
          'Regulatory Sandboxes & Exploits',
          'KYC/AML Bypass Techniques',
          'Privacy Coin Mixing Attacks',
          'Regulatory Arbitrage Risks',
          'Cross-Border Compliance Issues',
          'Decentralized Compliance Tools'
        ],
        exercises: [
          'Analyze regulatory gaps',
          'Simulate compliance bypass',
          'Design privacy-preserving solutions'
        ]
      }
    ]
  },
  {
    id: '9',
    title: 'Enterprise SOC Operations & Management',
    description: 'Complete enterprise-level SOC management, team leadership, strategic planning, and global operations coordination.',
    level: 'advanced',
    duration: '28 hours',
    totalModules: 20,
    enrolled: 156,
    rating: 4.9,
    category: 'SOC Management',
    instructor: 'Dr. Robert Kim, CISSP, CISO',
    certification: 'Enterprise SOC Manager',
    prerequisites: ['SOC analyst experience 3+ years', 'Team leadership experience', 'Business management basics'],
    learningObjectives: [
      'Design enterprise SOC architecture',
      'Manage global SOC operations',
      'Develop SOC maturity programs',
      'Lead cross-functional security teams'
    ],
    modules: [
      {
        id: '9-1',
        title: 'SOC Strategic Planning & Architecture',
        duration: '120 min',
        description: 'Enterprise SOC design and strategic alignment',
        content: [
          'SOC Business Case Development',
          'Enterprise SOC Architecture Design',
          'Multi-Tiered SOC Models (L1/L2/L3)',
          'Global SOC Network Strategy',
          'Technology Stack Selection',
          'ROI and Metrics Framework'
        ],
        exercises: [
          'Design enterprise SOC architecture',
          'Create SOC business case presentation',
          'Develop 3-year SOC roadmap'
        ]
      },
      {
        id: '9-2',
        title: 'SOC Team Management & Leadership',
        duration: '110 min',
        description: 'Leading and developing high-performance SOC teams',
        content: [
          'SOC Organizational Structure',
          'Hiring and Talent Acquisition',
          'Skills Development Programs',
          'Performance Management',
          'Career Progression Paths',
          'Team Culture and Morale'
        ],
        exercises: [
          'Create SOC org chart and job descriptions',
          'Design analyst development program',
          'Implement performance metrics'
        ]
      },
      {
        id: '9-3',
        title: 'SOC Maturity Assessment & Improvement',
        duration: '100 min',
        description: 'Evaluating and advancing SOC capabilities',
        content: [
          'SOC Maturity Models (CMMI, NIST)',
          'Capability Assessment Methods',
          'Gap Analysis and Prioritization',
          'Improvement Planning',
          'Change Management',
          'Continuous Improvement Process'
        ],
        exercises: [
          'Conduct SOC maturity assessment',
          'Create capability improvement plan',
          'Design change management strategy'
        ]
      }
    ]
  },
  {
    id: '10',
    title: 'Global Compliance & Risk Management',
    description: 'Master international cybersecurity regulations, compliance frameworks, and enterprise risk management across jurisdictions.',
    level: 'advanced',
    duration: '24 hours',
    totalModules: 16,
    enrolled: 289,
    rating: 4.8,
    category: 'Compliance & Risk',
    instructor: 'Elena Martinez, JD, CRISC, CISA',
    certification: 'Global Compliance Specialist',
    prerequisites: ['Risk management basics', 'Legal fundamentals', 'Audit experience'],
    learningObjectives: [
      'Navigate global compliance landscape',
      'Implement multi-framework compliance',
      'Manage enterprise-wide risk programs',
      'Lead regulatory audit processes'
    ],
    modules: [
      {
        id: '10-1',
        title: 'Global Regulatory Landscape',
        duration: '90 min',
        description: 'Understanding international cybersecurity regulations',
        content: [
          'GDPR (European Union)',
          'CCPA/CPRA (California)',
          'LGPD (Brazil)',
          'PIPEDA (Canada)',
          'Cybersecurity Law (China)',
          'Cross-Border Data Transfer Rules'
        ],
        exercises: [
          'Create global compliance matrix',
          'Analyze cross-border data flows',
          'Design privacy impact assessment'
        ]
      },
      {
        id: '10-2',
        title: 'Enterprise Framework Integration',
        duration: '105 min',
        description: 'Implementing multiple compliance frameworks',
        content: [
          'ISO 27001/27002 Implementation',
          'NIST Cybersecurity Framework',
          'SOC 2 Type II Controls',
          'PCI DSS Requirements',
          'COBIT Governance',
          'Framework Mapping and Integration'
        ],
        exercises: [
          'Map controls across frameworks',
          'Create integrated control matrix',
          'Design audit coordination plan'
        ]
      }
    ]
  },
  {
    id: '11',
    title: 'AI/ML Security & Adversarial Attacks',
    description: 'Cutting-edge course on AI/ML security vulnerabilities, adversarial attacks, model poisoning, and AI-powered defense systems.',
    level: 'advanced',
    duration: '26 hours',
    totalModules: 18,
    enrolled: 412,
    rating: 4.9,
    category: 'AI Security',
    instructor: 'Dr. Aisha Patel, AI Security Researcher',
    certification: 'AI Security Specialist',
    prerequisites: ['Machine learning basics', 'Python programming', 'Statistics fundamentals'],
    learningObjectives: [
      'Understand AI/ML attack vectors',
      'Implement adversarial defenses',
      'Secure AI/ML pipelines',
      'Develop AI-powered security tools'
    ],
    modules: [
      {
        id: '11-1',
        title: 'AI/ML Security Fundamentals',
        duration: '95 min',
        description: 'Core concepts in AI/ML security',
        content: [
          'AI/ML Threat Landscape',
          'Model Vulnerabilities',
          'Training Data Security',
          'Inference Attack Types',
          'Privacy-Preserving ML',
          'Regulatory Considerations'
        ],
        exercises: [
          'Assess AI system vulnerabilities',
          'Design secure ML pipeline',
          'Implement privacy controls'
        ]
      },
      {
        id: '11-2',
        title: 'Adversarial Attacks & Defenses',
        duration: '120 min',
        description: 'Advanced adversarial machine learning techniques',
        content: [
          'FGSM and PGD Attacks',
          'C&W and Carlini Attacks',
          'Adversarial Training',
          'Defensive Distillation',
          'Detection Mechanisms',
          'Robustness Evaluation'
        ],
        exercises: [
          'Implement adversarial attacks',
          'Build robust defense mechanisms',
          'Evaluate model robustness'
        ]
      }
    ]
  },
  {
    id: '12',
    title: 'Zero Trust Architecture Implementation',
    description: 'Comprehensive zero trust architecture design, implementation, and management for enterprise environments.',
    level: 'advanced',
    duration: '22 hours',
    totalModules: 15,
    enrolled: 378,
    rating: 4.8,
    category: 'Zero Trust',
    instructor: 'James Wilson, Zero Trust Architect',
    certification: 'Zero Trust Implementation Expert',
    prerequisites: ['Network security fundamentals', 'Identity management', 'Cloud architecture'],
    learningObjectives: [
      'Design zero trust architecture',
      'Implement identity-centric security',
      'Manage micro-segmentation',
      'Deploy continuous verification'
    ],
    modules: [
      {
        id: '12-1',
        title: 'Zero Trust Principles & Strategy',
        duration: '100 min',
        description: 'Foundation of zero trust security model',
        content: [
          'Zero Trust Core Principles',
          'Traditional vs Zero Trust Models',
          'Architecture Components',
          'Implementation Strategy',
          'Business Case Development',
          'Maturity Assessment'
        ],
        exercises: [
          'Assess current security posture',
          'Design zero trust strategy',
          'Create implementation roadmap'
        ]
      },
      {
        id: '12-2',
        title: 'Identity-Centric Security',
        duration: '95 min',
        description: 'Advanced identity and access management',
        content: [
          'Identity Verification Systems',
          'Multi-Factor Authentication',
          'Privileged Access Management',
          'Identity Governance',
          'Behavioral Analytics',
          'Risk-Based Authentication'
        ],
        exercises: [
          'Implement MFA strategies',
          'Design PAM architecture',
          'Configure risk-based access'
        ]
      }
    ]
  },
  {
    id: '13',
    title: 'Cyber Threat Intelligence Operations',
    description: 'Advanced threat intelligence collection, analysis, production, and dissemination for enterprise security operations.',
    level: 'advanced',
    duration: '25 hours',
    totalModules: 17,
    enrolled: 267,
    rating: 4.9,
    category: 'Threat Intelligence',
    instructor: 'Marcus Chen, CTI Lead Analyst',
    certification: 'Threat Intelligence Professional',
    prerequisites: ['Intelligence analysis basics', 'OSINT techniques', 'Data analysis skills'],
    learningObjectives: [
      'Develop strategic threat intelligence',
      'Manage intelligence operations',
      'Create actionable intelligence products',
      'Lead threat hunting initiatives'
    ],
    modules: [
      {
        id: '13-1',
        title: 'Intelligence Requirements & Planning',
        duration: '85 min',
        description: 'Strategic intelligence planning and requirements',
        content: [
          'Intelligence Requirements Development',
          'Collection Planning Process',
          'Stakeholder Management',
          'Priority Intelligence Requirements',
          'Collection Management Framework',
          'Resource Allocation'
        ],
        exercises: [
          'Develop PIRs for organization',
          'Create collection plan',
          'Design stakeholder engagement'
        ]
      },
      {
        id: '13-2',
        title: 'Advanced OSINT Operations',
        duration: '110 min',
        description: 'Professional open source intelligence techniques',
        content: [
          'Advanced Search Techniques',
          'Social Media Intelligence',
          'Dark Web Monitoring',
          'Technical Infrastructure Analysis',
          'Attribution Methodologies',
          'OSINT Tool Development'
        ],
        exercises: [
          'Conduct advanced OSINT investigation',
          'Build custom collection tools',
          'Perform attribution analysis'
        ]
      }
    ]
  }
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first cybersecurity course',
    icon: 'graduation-cap',
    earned: true,
    earnedDate: new Date('2024-01-15'),
    points: 100,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Threat Hunter',
    description: 'Successfully identify 50 threats using hunting techniques',
    icon: 'target',
    earned: true,
    earnedDate: new Date('2024-01-20'),
    points: 500,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Speed Learner',
    description: 'Complete 3 courses in a single week',
    icon: 'zap',
    earned: false,
    points: 300,
    rarity: 'epic'
  },
  {
    id: '4',
    title: 'Master Analyst',
    description: 'Achieve 95%+ accuracy in threat detection simulations',
    icon: 'trophy',
    earned: false,
    points: 1000,
    rarity: 'legendary'
  },
  {
    id: '5',
    title: 'DeFi Security Expert',
    description: 'Complete DeFi Security & Reentrancy Attacks course with 90%+ score',
    icon: 'target',
    earned: false,
    points: 750,
    rarity: 'epic'
  },
  {
    id: '6',
    title: 'Blockchain Defender',
    description: 'Successfully prevent 25 blockchain-based attacks in simulations',
    icon: 'shield',
    earned: false,
    points: 500,
    rarity: 'rare'
  },
  {
    id: '7',
    title: 'Flash Loan Hunter',
    description: 'Identify and exploit 10 flash loan vulnerabilities',
    icon: 'zap',
    earned: false,
    points: 600,
    rarity: 'epic'
  },
  {
    id: '8',
    title: 'Future Threat Analyst',
    description: 'Master emerging blockchain threats and quantum cryptography',
    icon: 'star',
    earned: false,
    points: 1500,
    rarity: 'legendary'
  },
  {
    id: '9',
    title: 'Enterprise SOC Leader',
    description: 'Successfully design and implement enterprise SOC architecture',
    icon: 'users',
    earned: false,
    points: 2000,
    rarity: 'legendary'
  },
  {
    id: '10',
    title: 'Global Compliance Master',
    description: 'Achieve compliance across 5+ international frameworks',
    icon: 'shield',
    earned: false,
    points: 1800,
    rarity: 'legendary'
  },
  {
    id: '11',
    title: 'AI Security Pioneer',
    description: 'Discover and mitigate 3 novel AI/ML vulnerabilities',
    icon: 'zap',
    earned: false,
    points: 2500,
    rarity: 'legendary'
  },
  {
    id: '12',
    title: 'Zero Trust Architect',
    description: 'Design and deploy enterprise zero trust architecture',
    icon: 'lock',
    earned: false,
    points: 2200,
    rarity: 'legendary'
  },
  {
    id: '13',
    title: 'Threat Intelligence Guru',
    description: 'Lead 10+ strategic intelligence operations',
    icon: 'target',
    earned: false,
    points: 1900,
    rarity: 'legendary'
  },
  {
    id: '14',
    title: 'Executive Briefing Expert',
    description: 'Successfully brief C-level executives on cyber risks',
    icon: 'presentation',
    earned: false,
    points: 1600,
    rarity: 'epic'
  },
  {
    id: '15',
    title: 'Global SOC Orchestrator',
    description: 'Coordinate security operations across 3+ time zones',
    icon: 'globe',
    earned: false,
    points: 2800,
    rarity: 'legendary'
  }
];

const mockCertifications: Certification[] = [
  {
    id: '1',
    name: 'Certified SOC Analyst',
    issuer: 'APT Defense Universe',
    level: 'Associate',
    requirements: ['Complete 5 core courses', 'Pass practical assessment', 'Complete capstone project'],
    duration: '6 months',
    earned: false,
    progress: 60
  },
  {
    id: '2',
    name: 'Advanced Threat Hunter',
    issuer: 'APT Defense Universe',
    level: 'Professional',
    requirements: ['SOC Analyst certification', 'Complete advanced hunting track', 'Lead hunting exercise'],
    duration: '12 months',
    earned: false,
    progress: 25
  },
  {
    id: '3',
    name: 'Incident Response Specialist',
    issuer: 'APT Defense Universe',
    level: 'Expert',
    requirements: ['Professional level cert', 'Handle 10 live incidents', 'Mentor junior analysts'],
    duration: '18 months',
    earned: false,
    progress: 0
  },
  {
    id: '4',
    name: 'Enterprise SOC Manager',
    issuer: 'Global SOC Consortium',
    level: 'Executive',
    requirements: ['5+ years SOC experience', 'Complete SOC management track', 'Lead enterprise SOC design'],
    duration: '24 months',
    earned: false,
    progress: 0
  },
  {
    id: '5',
    name: 'Global Compliance Specialist',
    issuer: 'International Compliance Institute',
    level: 'Expert',
    requirements: ['Multi-framework experience', 'Complete compliance track', 'Lead 3 audit processes'],
    duration: '18 months',
    earned: false,
    progress: 0
  },
  {
    id: '6',
    name: 'AI Security Professional',
    issuer: 'AI Security Research Consortium',
    level: 'Specialist',
    requirements: ['ML fundamentals', 'Complete AI security track', 'Publish research paper'],
    duration: '15 months',
    earned: false,
    progress: 0
  },
  {
    id: '7',
    name: 'Zero Trust Architect',
    issuer: 'Zero Trust Alliance',
    level: 'Architect',
    requirements: ['Enterprise architecture experience', 'Complete ZT track', 'Design enterprise implementation'],
    duration: '20 months',
    earned: false,
    progress: 0
  },
  {
    id: '8',
    name: 'Threat Intelligence Professional',
    issuer: 'Global CTI Certification Board',
    level: 'Professional',
    requirements: ['Intelligence analysis background', 'Complete CTI track', 'Lead intelligence operation'],
    duration: '16 months',
    earned: false,
    progress: 0
  }
];

export default function LearningCenter() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  
  // Advanced user progress tracking
  const [userProgress, setUserProgress] = useState({
    totalPoints: 2847,
    level: 12,
    completedCourses: 3,
    certificates: 2,
    streak: 7,
    rank: "Advanced Analyst",
    nextLevelPoints: 3200,
    globalRank: 1247,
    weeklyPoints: 420,
    monthlyGoal: 1500,
    achievements: 15,
    studyTime: 127, // hours
    practicalExercises: 34,
    simulationsCompleted: 12,
    mentorshipHours: 8
  });

  const categories = ["all", "Fundamentals", "Threat Hunting", "Frameworks", "Incident Response", "Penetration Testing", "Cloud Security", "Blockchain Security", "Future Threats", "SOC Management", "Compliance & Risk", "AI Security", "Zero Trust", "Threat Intelligence"];
  const levels = ["all", "beginner", "intermediate", "advanced"];

  const filteredCourses = detailedCourses.filter(course => {
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  // Global leaderboard data
  const globalLeaderboard = [
    { rank: 1, name: "Sarah Chen", country: "Singapore", points: 8942, level: 28, specialty: "Threat Hunting" },
    { rank: 2, name: "Miguel Rodriguez", country: "Spain", points: 8734, level: 27, specialty: "Incident Response" },
    { rank: 3, name: "Priya Patel", country: "India", points: 8521, level: 26, specialty: "MITRE ATT&CK" },
    { rank: 4, name: "Alex Johnson", country: "USA", points: 8347, level: 25, specialty: "Penetration Testing" },
    { rank: 5, name: "Li Wei", country: "China", points: 8129, level: 24, specialty: "Cloud Security" },
    { rank: 1247, name: "You", country: "Global", points: 2847, level: 12, specialty: "SOC Analysis" }
  ];

  // Weekly challenges
  const weeklyChallenge = {
    title: "Enterprise Zero Trust Architecture Challenge",
    description: "Design a comprehensive zero trust implementation for a multinational corporation with 50,000+ employees across 25 countries",
    difficulty: "Enterprise",
    points: 1500,
    timeRemaining: "6 days",
    participants: 1847,
    completed: 23
  };

  // Monthly enterprise challenge
  const monthlyChallenge = {
    title: "Global SOC Integration Simulation",
    description: "Lead a complex simulation coordinating 5 regional SOCs responding to a coordinated APT campaign across multiple time zones",
    difficulty: "Executive",
    points: 3000,
    timeRemaining: "18 days",
    participants: 892,
    completed: 7
  };

  const blockchainChallenges = [
    {
      title: "Reentrancy Vulnerability Hunt",
      description: "Find and exploit reentrancy vulnerabilities in 5 different smart contracts",
      difficulty: "Expert",
      points: 1000,
      timeRemaining: "2 days",
      participants: 1834,
      completed: 23
    },
    {
      title: "Cross-Chain Bridge Security Analysis",
      description: "Analyze security vulnerabilities in cross-chain bridge protocols",
      difficulty: "Advanced",
      points: 600,
      timeRemaining: "5 days",
      participants: 2156,
      completed: 145
    },
    {
      title: "Quantum Cryptography Future Threats",
      description: "Assess quantum computing threats to current blockchain implementations",
      difficulty: "Expert",
      points: 1200,
      timeRemaining: "1 week",
      participants: 892,
      completed: 12
    }
  ];

  // Study groups and communities
  const studyGroups = [
    { name: "SOC Analysts United", members: 12847, language: "English", focus: "Daily threat briefings" },
    { name: "Analistas de Seguridad", members: 3421, language: "Spanish", focus: "LATAM threat landscape" },
    { name: "サイバーセキュリティ", members: 2156, language: "Japanese", focus: "APT research" },
    { name: "Cyber Defense Europe", members: 8934, language: "Multi", focus: "European regulations" }
  ];

  // Live mentorship sessions
  const mentorshipSessions = [
    { 
      title: "Advanced Threat Hunting Workshop",
      mentor: "Dr. Marcus Rodriguez, GCTI",
      time: "Today 2:00 PM UTC",
      duration: "90 min",
      participants: "15/20",
      language: "English"
    },
    { 
      title: "MITRE ATT&CK Framework Deep Dive",
      mentor: "Sarah Chen, CISSP",
      time: "Tomorrow 10:00 AM UTC",
      duration: "2 hours",
      participants: "8/15",
      language: "English"
    },
    { 
      title: "Incident Response Best Practices",
      mentor: "Alex Thompson, GCIH",
      time: "Wednesday 6:00 PM UTC",
      duration: "75 min",
      participants: "12/25",
      language: "English"
    }
  ];

  // Career progression paths
  const careerPaths = [
    {
      title: "SOC Analyst Career Track",
      currentLevel: "Junior Analyst",
      nextLevel: "Senior Analyst",
      progress: 75,
      requirements: [
        "Complete 5 core courses (4/5 done)",
        "Pass practical assessment",
        "Complete 3 simulations (2/3 done)",
        "Mentor 2 junior students"
      ],
      estimatedTime: "2-3 months"
    },
    {
      title: "Threat Hunter Specialist",
      currentLevel: "Foundation",
      nextLevel: "Practitioner",
      progress: 30,
      requirements: [
        "Advanced threat hunting course",
        "Complete 10 hunting exercises",
        "Identify 50 real threats",
        "Publish threat research"
      ],
      estimatedTime: "6-8 months"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-400';
      case 'intermediate': return 'bg-yellow-400';
      case 'advanced': return 'bg-[var(--cyber-red)]';
      default: return 'bg-gray-400';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-400/20';
      case 'rare': return 'bg-blue-400/20';
      case 'epic': return 'bg-purple-400/20';
      case 'legendary': return 'bg-yellow-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'graduation-cap': return GraduationCap;
      case 'target': return Target;
      case 'zap': return Zap;
      case 'trophy': return Trophy;
      default: return Star;
    }
  };

  return (
    <div className="space-y-6">
      {/* User Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Trophy className="w-5 h-5" />
              <span>Level</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{userProgress.level}</div>
            <div className="text-sm text-gray-400">SOC Analyst</div>
            <Progress value={75} className="w-full mt-2" />
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Star className="w-5 h-5" />
              <span>Points</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{userProgress.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Total earned</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Zap className="w-5 h-5" />
              <span>Streak</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">{userProgress.streak}</div>
            <div className="text-sm text-gray-400">Days active</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Award className="w-5 h-5" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">
              {mockAchievements.filter(a => a.earned).length}
            </div>
            <div className="text-sm text-gray-400">of {mockAchievements.length} earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Learning Interface */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-8 bg-[var(--cyber-navy)]">
          <TabsTrigger value="courses" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <BookOpen className="w-4 h-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Trophy className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="certifications" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Award className="w-4 h-4 mr-2" />
            Certifications
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Users className="w-4 h-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="mentorship" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <GraduationCap className="w-4 h-4 mr-2" />
            Mentorship
          </TabsTrigger>
          <TabsTrigger value="career" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Target className="w-4 h-4 mr-2" />
            Career
          </TabsTrigger>
          <TabsTrigger value="enterprise-platform" className="enterprise-tab data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Building className="w-4 h-4 mr-2" />
            Enterprise
          </TabsTrigger>
          <TabsTrigger value="premium-certs" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Crown className="w-4 h-4 mr-2" />
            Premium
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Training Courses</CardTitle>
                <div className="flex space-x-2">
                  <Button
                    variant={selectedLevel === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("all")}
                    className="bg-[var(--cyber-cyan)]/20 border-[var(--cyber-cyan)]/30"
                  >
                    All Levels
                  </Button>
                  <Button
                    variant={selectedLevel === "beginner" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("beginner")}
                  >
                    Beginner
                  </Button>
                  <Button
                    variant={selectedLevel === "intermediate" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("intermediate")}
                  >
                    Intermediate
                  </Button>
                  <Button
                    variant={selectedLevel === "advanced" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel("advanced")}
                  >
                    Advanced
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Course Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="bg-[var(--cyber-cyan)]/20 border-[var(--cyber-cyan)]/30"
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>

              {/* Course Selection View */}
              {!selectedCourse && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-white">{course.title}</h3>
                            {course.locked && <Lock className="w-4 h-4 text-gray-400" />}
                          </div>
                          <Badge className={`${getLevelColor(course.level)} text-white text-xs`}>
                            {course.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-yellow-400">{course.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-300 mb-4">{course.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">{course.totalModules} modules</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">{course.enrolled} enrolled</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400">{course.category}</span>
                        </div>
                      </div>
                      
                      {course.progress && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-[var(--cyber-cyan)]">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="w-full" />
                        </div>
                      )}
                      
                      <Button 
                        className={`w-full ${course.locked ? 'opacity-50 cursor-not-allowed' : 'bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400'}`}
                        disabled={course.locked}
                        onClick={() => !course.locked && setSelectedCourse(course)}
                      >
                        {course.locked ? (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Locked
                          </>
                        ) : course.progress ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4 mr-2" />
                            Start Course
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Course Detail View */}
              {selectedCourse && !selectedModule && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedCourse(null)}
                      className="border-[var(--cyber-cyan)]/30"
                    >
                      ← Back to Courses
                    </Button>
                    <Badge className={`${getLevelColor(selectedCourse.level)} text-white`}>
                      {selectedCourse.level}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h2 className="text-2xl font-bold text-white mb-4">{selectedCourse.title}</h2>
                      <p className="text-gray-300 mb-6">{selectedCourse.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-sm text-gray-400">Duration</span>
                          </div>
                          <div className="text-white font-semibold">{selectedCourse.duration}</div>
                        </div>
                        <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-sm text-gray-400">Modules</span>
                          </div>
                          <div className="text-white font-semibold">{selectedCourse.totalModules}</div>
                        </div>
                        <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-sm text-gray-400">Enrolled</span>
                          </div>
                          <div className="text-white font-semibold">{selectedCourse.enrolled}</div>
                        </div>
                        <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Award className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-sm text-gray-400">Certificate</span>
                          </div>
                          <div className="text-white font-semibold">Yes</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Learning Objectives</h3>
                        <ul className="space-y-2">
                          {selectedCourse.learningObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-[var(--cyber-cyan)] mt-0.5" />
                              <span className="text-gray-300">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Course Details</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-gray-400">Instructor</span>
                            <div className="text-white">{selectedCourse.instructor}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Category</span>
                            <div className="text-white">{selectedCourse.category}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-400">Certification</span>
                            <div className="text-white">{selectedCourse.certification}</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Prerequisites</h3>
                        <ul className="space-y-2">
                          {selectedCourse.prerequisites.map((prerequisite, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full mt-2"></div>
                              <span className="text-gray-300">{prerequisite}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Course Modules</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedCourse.modules.map((module, index) => (
                        <div key={module.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">
                              Module {index + 1}: {module.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-400">{module.duration}</span>
                              <Button
                                size="sm"
                                onClick={() => setSelectedModule(module)}
                                className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{module.description}</p>
                          <div className="text-xs text-gray-400">
                            {module.content.length} topics • {module.exercises.length} exercises
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Module Detail View */}
              {selectedModule && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedModule(null)}
                      className="border-[var(--cyber-cyan)]/30"
                    >
                      ← Back to Course
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[var(--cyber-cyan)]" />
                      <span className="text-sm text-gray-400">{selectedModule.duration}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                      <h2 className="text-2xl font-bold text-white mb-4">{selectedModule.title}</h2>
                      <p className="text-gray-300 mb-6">{selectedModule.description}</p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Learning Content</h3>
                          <div className="space-y-3">
                            {selectedModule.content.map((content, index) => (
                              <div key={index} className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                                <div className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-[var(--cyber-cyan)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--cyber-dark)]">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white mb-2">{content}</h4>
                                    <p className="text-sm text-gray-300">
                                      Detailed explanation and examples will be provided for this topic.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4">Practical Exercises</h3>
                          <div className="space-y-3">
                            {selectedModule.exercises.map((exercise, index) => (
                              <div key={index} className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg border-l-4 border-[var(--cyber-cyan)]">
                                <div className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-[var(--cyber-cyan)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--cyber-dark)]">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-white mb-2">Exercise {index + 1}</h4>
                                    <p className="text-sm text-gray-300">{exercise}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Progress</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Completion</span>
                            <span className="text-[var(--cyber-cyan)]">0%</span>
                          </div>
                          <Progress value={0} className="w-full" />
                          <Button className="w-full bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400">
                            Mark Complete
                          </Button>
                        </div>
                      </div>

                      <div className="bg-[var(--cyber-dark)]/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start">
                            <FileText className="w-4 h-4 mr-2" />
                            Module Notes
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Reference Materials
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <Target className="w-4 h-4 mr-2" />
                            Practice Lab
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map((achievement) => {
                  const IconComponent = getIcon(achievement.icon);
                  return (
                    <div 
                      key={achievement.id} 
                      className={`border rounded-lg p-4 transition-all duration-200 ${
                        achievement.earned 
                          ? `${getRarityBg(achievement.rarity)} border-[var(--cyber-cyan)]/30` 
                          : 'bg-[var(--cyber-dark)]/30 border-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          achievement.earned ? getRarityBg(achievement.rarity) : 'bg-gray-600/20'
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            achievement.earned ? getRarityColor(achievement.rarity) : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-white' : 'text-gray-400'
                          }`}>
                            {achievement.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                              {achievement.rarity}
                            </Badge>
                            <span className="text-xs text-[var(--cyber-cyan)]">
                              {achievement.points} pts
                            </span>
                          </div>
                        </div>
                        {achievement.earned && <CheckCircle className="w-5 h-5 text-green-400" />}
                      </div>
                      
                      <p className={`text-sm ${
                        achievement.earned ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      {achievement.earned && achievement.earnedDate && (
                        <div className="text-xs text-gray-400 mt-2">
                          Earned: {achievement.earnedDate.toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certifications" className="space-y-6">
          <CertificationManager />
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Global Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalLeaderboard.map((player, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    player.name === "You" 
                      ? "bg-[var(--cyber-cyan)]/10 border-[var(--cyber-cyan)]/50" 
                      : "bg-[var(--cyber-dark)]/50 border-[var(--cyber-cyan)]/20"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          player.rank <= 3 ? "bg-yellow-400 text-black" : "bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]"
                        }`}>
                          {player.rank <= 3 ? "🏆" : player.rank}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{player.name}</h3>
                          <p className="text-sm text-gray-400">{player.country} • {player.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[var(--cyber-cyan)]">{player.points.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">Level {player.level}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">This Week's Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Elena Rodriguez", points: 1247, specialty: "Malware Analysis", country: "Mexico" },
                    { name: "Hiroshi Tanaka", points: 1134, specialty: "Network Security", country: "Japan" },
                    { name: "Sarah Mitchell", points: 1089, specialty: "Incident Response", country: "Canada" },
                    { name: "Ahmed Hassan", points: 1045, specialty: "Threat Hunting", country: "Egypt" },
                    { name: "You", points: 420, specialty: "SOC Analysis", country: "Global" }
                  ].map((player, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === "You" 
                        ? "bg-[var(--cyber-cyan)]/10 border border-[var(--cyber-cyan)]/30" 
                        : "bg-[var(--cyber-dark)]/30"
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-[var(--cyber-cyan)]">#{index + 1}</span>
                        <div>
                          <p className="font-medium text-white">{player.name}</p>
                          <p className="text-xs text-gray-400">{player.specialty}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[var(--cyber-cyan)]">{player.points}</p>
                        <p className="text-xs text-gray-400">{player.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Monthly Challenge Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Marcus Chen", challenges: 12, points: 3400, badge: "🥇" },
                    { name: "Lisa Johnson", challenges: 10, points: 2900, badge: "🥈" },
                    { name: "Pavel Novak", challenges: 9, points: 2750, badge: "🥉" },
                    { name: "Ana Silva", challenges: 8, points: 2200, badge: "🏅" },
                    { name: "You", challenges: 3, points: 420, badge: "🎯" }
                  ].map((player, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === "You" 
                        ? "bg-[var(--cyber-cyan)]/10 border border-[var(--cyber-cyan)]/30" 
                        : "bg-[var(--cyber-dark)]/30"
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{player.badge}</span>
                        <div>
                          <p className="font-medium text-white">{player.name}</p>
                          <p className="text-xs text-gray-400">{player.challenges} challenges</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[var(--cyber-cyan)]">{player.points}</p>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enterprise Challenges Section */}
          <div className="space-y-6">
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Active Enterprise Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Weekly Challenge */}
                  <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-6 bg-gradient-to-r from-[var(--cyber-dark)]/50 to-[var(--cyber-navy)]/30">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            Weekly Challenge
                          </Badge>
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                            {weeklyChallenge.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{weeklyChallenge.title}</h3>
                        <p className="text-gray-300 mb-4">{weeklyChallenge.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-gray-300">{weeklyChallenge.points} points</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-gray-300">{weeklyChallenge.timeRemaining}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-[var(--cyber-cyan)]" />
                            <span className="text-gray-300">{weeklyChallenge.participants} participants</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{weeklyChallenge.completed} completed</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/80 text-[var(--cyber-dark)] ml-4">
                        Join Challenge
                      </Button>
                    </div>
                  </div>

                  {/* Monthly Challenge */}
                  <div className="border border-purple-500/30 rounded-lg p-6 bg-gradient-to-r from-purple-900/20 to-[var(--cyber-dark)]/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            Monthly Challenge
                          </Badge>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            {monthlyChallenge.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{monthlyChallenge.title}</h3>
                        <p className="text-gray-300 mb-4">{monthlyChallenge.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Trophy className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{monthlyChallenge.points} points</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{monthlyChallenge.timeRemaining}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-300">{monthlyChallenge.participants} participants</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-gray-300">{monthlyChallenge.completed} completed</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-purple-500 hover:bg-purple-500/80 text-white ml-4">
                        Join Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Training Simulations */}
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Enterprise Training Simulations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <h3 className="font-semibold text-white mb-2">Fortune 500 SOC Simulation</h3>
                    <p className="text-sm text-gray-400 mb-3">Lead a 24/7 global SOC operation for a multinational corporation</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-300">
                        <span>⏱️ 8 hours</span>
                        <span>🏢 Enterprise</span>
                        <span>🌐 Global</span>
                      </div>
                      <Button size="sm" className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                        Start Simulation
                      </Button>
                    </div>
                  </div>
                  <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <h3 className="font-semibold text-white mb-2">Critical Infrastructure Defense</h3>
                    <p className="text-sm text-gray-400 mb-3">Protect power grid and transportation systems from nation-state attacks</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-300">
                        <span>⏱️ 12 hours</span>
                        <span>🔒 Top Secret</span>
                        <span>🛡️ Critical</span>
                      </div>
                      <Button size="sm" className="bg-red-500 text-white">
                        Access Required
                      </Button>
                    </div>
                  </div>
                  <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <h3 className="font-semibold text-white mb-2">Global Compliance Audit</h3>
                    <p className="text-sm text-gray-400 mb-3">Navigate complex international regulations across 15 jurisdictions</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-300">
                        <span>⏱️ 6 hours</span>
                        <span>📋 Compliance</span>
                        <span>🌍 Multi-Region</span>
                      </div>
                      <Button size="sm" className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                        Begin Audit
                      </Button>
                    </div>
                  </div>
                  <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <h3 className="font-semibold text-white mb-2">AI Security Lab</h3>
                    <p className="text-sm text-gray-400 mb-3">Secure ML models and defend against adversarial attacks</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-300">
                        <span>⏱️ 4 hours</span>
                        <span>🤖 AI/ML</span>
                        <span>🔬 Research</span>
                      </div>
                      <Button size="sm" className="bg-purple-500 text-white">
                        Enter Lab
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Mentorship Tab */}
        <TabsContent value="mentorship" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Live Mentorship Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentorshipSessions.map((session, index) => (
                  <div key={index} className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{session.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">by {session.mentor}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <span>📅 {session.time}</span>
                          <span>⏱️ {session.duration}</span>
                          <span>👥 {session.participants}</span>
                          <span>🌐 {session.language}</span>
                        </div>
                      </div>
                      <Button className="bg-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/80 text-[var(--cyber-dark)]">
                        Join Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Global Study Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyGroups.map((group, index) => (
                  <div key={index} className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                    <h3 className="font-semibold text-white mb-2">{group.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{group.focus}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-300">
                        <span>👥 {group.members.toLocaleString()}</span>
                        <span>🌐 {group.language}</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-[var(--cyber-cyan)]/30">
                        Join Group
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Career Path Tab */}
        <TabsContent value="career" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Career Progression Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {careerPaths.map((path, index) => (
                  <div key={index} className="border border-[var(--cyber-cyan)]/20 rounded-lg p-6 bg-[var(--cyber-dark)]/50">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{path.title}</h3>
                        <p className="text-sm text-gray-400">{path.currentLevel} → {path.nextLevel}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{path.progress}%</div>
                        <div className="text-sm text-gray-400">{path.estimatedTime}</div>
                      </div>
                    </div>
                    <Progress value={path.progress} className="w-full mb-4" />
                    <div className="space-y-2">
                      <h4 className="font-medium text-white">Requirements:</h4>
                      <ul className="space-y-1">
                        {path.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-300 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Industry Skills Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                  <h3 className="font-semibold text-white mb-3">Technical Skills</h3>
                  <div className="space-y-2">
                    {['SIEM Management', 'Threat Hunting', 'Incident Response', 'Malware Analysis', 'Network Security'].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{skill}</span>
                        <Badge className="bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]">
                          {Math.floor(Math.random() * 40) + 60}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                  <h3 className="font-semibold text-white mb-3">Soft Skills</h3>
                  <div className="space-y-2">
                    {['Communication', 'Problem Solving', 'Leadership', 'Time Management', 'Teamwork'].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{skill}</span>
                        <Badge className="bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]">
                          {Math.floor(Math.random() * 30) + 70}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-[var(--cyber-cyan)]/20 rounded-lg p-4 bg-[var(--cyber-dark)]/50">
                  <h3 className="font-semibold text-white mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {['Security+', 'CISSP', 'GCIH', 'GSEC', 'CEH'].map((cert, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{cert}</span>
                        <Badge className={index < 2 ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                          {index < 2 ? "Earned" : "Planned"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enterprise Platform Tab */}
        <TabsContent value="enterprise-platform" className="space-y-6">
          <EnterpriseLearningPlatform />
        </TabsContent>

        {/* Premium Certifications Tab */}
        <TabsContent value="premium-certs" className="space-y-6">
          <EnterpriseCertificationSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}
