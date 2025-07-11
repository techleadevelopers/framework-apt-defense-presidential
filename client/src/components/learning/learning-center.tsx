import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Zap
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
  }
];

export default function LearningCenter() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<DetailedCourse | null>(null);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [userPoints, setUserPoints] = useState(2750);
  const [userLevel, setUserLevel] = useState(12);
  const [streak, setStreak] = useState(7);

  const categories = ["all", "Fundamentals", "Threat Hunting", "Frameworks", "Incident Response", "Penetration Testing", "Cloud Security"];
  const levels = ["all", "beginner", "intermediate", "advanced"];

  const filteredCourses = detailedCourses.filter(course => {
    const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;
    const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

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
            <div className="text-3xl font-bold text-white mb-1">{userLevel}</div>
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
            <div className="text-3xl font-bold text-white mb-1">{userPoints.toLocaleString()}</div>
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
            <div className="text-3xl font-bold text-white mb-1">{streak}</div>
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
        <TabsList className="grid w-full grid-cols-4 bg-[var(--cyber-navy)]">
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
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Certification Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockCertifications.map((cert) => (
                  <div key={cert.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">{cert.name}</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-400">Issued by:</span>
                          <span className="text-[var(--cyber-cyan)]">{cert.issuer}</span>
                          <Badge variant="outline">{cert.level}</Badge>
                        </div>
                      </div>
                      {cert.earned && <Award className="w-8 h-8 text-yellow-400" />}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-[var(--cyber-cyan)]">{cert.progress}%</span>
                        </div>
                        <Progress value={cert.progress} className="w-full" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-white mb-2">Requirements:</h4>
                          <ul className="space-y-1">
                            {cert.requirements.map((req, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span className="text-gray-300">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 text-sm mb-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-400">Duration: {cert.duration}</span>
                          </div>
                          <Button 
                            className="w-full bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
                            disabled={cert.progress === 0}
                          >
                            {cert.progress === 0 ? 'Prerequisites Required' : 'Continue Path'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Global Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Alex Chen', points: 8750, level: 24, badge: 'Expert Analyst' },
                  { rank: 2, name: 'Sarah Wilson', points: 7420, level: 21, badge: 'Threat Hunter' },
                  { rank: 3, name: 'Mike Johnson', points: 6890, level: 19, badge: 'SOC Specialist' },
                  { rank: 4, name: 'Emma Davis', points: 6234, level: 18, badge: 'Incident Responder' },
                  { rank: 5, name: 'You', points: userPoints, level: userLevel, badge: 'SOC Analyst', highlight: true },
                  { rank: 6, name: 'David Brown', points: 2456, level: 11, badge: 'Security Analyst' },
                  { rank: 7, name: 'Lisa Garcia', points: 2103, level: 10, badge: 'Junior Analyst' }
                ].map((user) => (
                  <div 
                    key={user.rank} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.highlight 
                        ? 'bg-[var(--cyber-cyan)]/20 border border-[var(--cyber-cyan)]/30' 
                        : 'bg-[var(--cyber-dark)]/30'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank <= 3 ? 'bg-yellow-400 text-[var(--cyber-dark)]' : 'bg-[var(--cyber-steel)] text-white'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <div className={`font-medium ${user.highlight ? 'text-[var(--cyber-cyan)]' : 'text-white'}`}>
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-400">{user.badge}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-white">{user.points.toLocaleString()} pts</div>
                      <div className="text-sm text-gray-400">Level {user.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
