import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Shield, 
  Search, 
  AlertTriangle, 
  Network, 
  Play, 
  Brain, 
  Bot, 
  Eye, 
  GraduationCap,
  ChevronRight,
  Info,
  Target,
  Zap,
  Lock,
  Users,
  Settings
} from "lucide-react";

export default function UserManual() {
  const [activeSection, setActiveSection] = useState("overview");

  const manualSections = [
    {
      id: "overview",
      title: "Visão Geral e Metodologia de Ensino",
      icon: Shield,
      content: {
        description: "SOC Defense Universe - Plataforma Educacional Completa para Formação de Analistas de Segurança Cibernética",
        topics: [
          {
            title: "Metodologia de Ensino Integrada",
            content: "Nossa abordagem combina teoria, prática e simulação para formar analistas de elite. O aprendizado é estruturado em 4 fases progressivas com avaliação contínua.",
            keyPoints: [
              "Fase 1: Fundamentos Teóricos (Learning Center)",
              "Fase 2: Prática Guiada (Simulações e Labs)",
              "Fase 3: Testes Práticos (Rule Testing & Scenarios)",
              "Fase 4: Operação Real (SOC Live Operations)"
            ]
          },
          {
            title: "Fluxo de Aprendizado Progressivo",
            content: "Cada módulo segue uma sequência pedagógica otimizada para retenção e aplicação prática do conhecimento.",
            keyPoints: [
              "📚 Estudo → 🧪 Laboratório → 🎯 Teste → 🚀 Aplicação Real",
              "Feedback imediato e correções em tempo real",
              "Gamificação com pontos, níveis e certificações",
              "Mentoria integrada com especialistas virtuais"
            ]
          },
          {
            title: "Público-Alvo e Níveis de Competência",
            content: "Formação completa do analista iniciante ao especialista sênior em cibersegurança.",
            keyPoints: [
              "Iniciante: 0-6 meses (Fundamentos e SOC L1)",
              "Intermediário: 6-24 meses (SOC L2 e Especialização)",
              "Avançado: 2+ anos (SOC L3 e Arquitetura)",
              "Expert: 5+ anos (Research e Leadership)"
            ]
          }
        ]
      }
    },
    {
      id: "learning-path",
      title: "Trilha de Aprendizado Completa",
      icon: GraduationCap,
      content: {
        description: "Currículo estruturado com 6 cursos especializados, mais de 50 módulos e certificações profissionais",
        topics: [
          {
            title: "CURSO 1: Fundamentos de Cibersegurança (8h)",
            content: "Base sólida em conceitos essenciais de segurança da informação.",
            keyPoints: [
              "12 módulos fundamentais",
              "Classificação: Iniciante",
              "Certificação: Cyber Security Fundamentals",
              "Tópicos: CIA Triad, Risk Management, Compliance"
            ]
          },
          {
            title: "CURSO 2: Advanced Threat Hunting (18h)", 
            content: "Técnicas avançadas de caça a ameaças e análise comportamental.",
            keyPoints: [
              "12 módulos especializados",
              "Classificação: Avançado",
              "Certificação: Threat Hunter Expert",
              "Tópicos: MITRE ATT&CK, Behavioral Analysis, Threat Intelligence"
            ]
          },
          {
            title: "CURSO 3: MITRE ATT&CK Framework (12h)",
            content: "Domínio completo do framework de táticas e técnicas de atacantes.",
            keyPoints: [
              "10 módulos especializados",
              "Classificação: Intermediário",  
              "Certificação: ATT&CK Specialist",
              "Tópicos: Tactics, Techniques, Procedures, Detection Engineering"
            ]
          },
          {
            title: "CURSO 4: Incident Response Mastery (20h)",
            content: "Gestão completa do ciclo de vida de resposta a incidentes.",
            keyPoints: [
              "15 módulos avançados",
              "Classificação: Avançado",
              "Certificação: Incident Response Expert", 
              "Tópicos: NIST Framework, Digital Forensics, Crisis Management"
            ]
          },
          {
            title: "CURSO 5: Penetration Testing Advanced (16h)",
            content: "Técnicas ofensivas para teste de penetração e red teaming.",
            keyPoints: [
              "14 módulos especializados",
              "Classificação: Avançado",
              "Certificação: Ethical Hacker Expert",
              "Tópicos: OSINT, Social Engineering, Post-Exploitation"
            ]
          },
          {
            title: "CURSO 6: Cloud & DeFi Security (22h)",
            content: "Segurança em ambientes modernos: cloud computing e blockchain.",
            keyPoints: [
              "16 módulos cutting-edge",
              "Classificação: Expert",
              "Certificação: Cloud & DeFi Security Specialist",
              "Tópicos: AWS/Azure Security, Smart Contracts, Reentrancy Attacks"
            ]
          }
        ]
      }
    },
    {
      id: "practical-labs",
      title: "Laboratórios Práticos Integrados",
      icon: Target,
      content: {
        description: "Ambientes controlados para prática hands-on com cenários realistas e feedback educacional",
        topics: [
          {
            title: "Lab 1: SOC Dashboard Operations",
            content: "Prática com dashboard em tempo real, análise de métricas e tomada de decisões operacionais.",
            keyPoints: [
              "Simulação de 24h de operações SOC",
              "Métricas de performance e KPIs",
              "Escalação de incidentes críticos",
              "Relatórios executivos automatizados"
            ]
          },
          {
            title: "Lab 2: Threat Detection & Analysis",
            content: "Detecção e classificação de ameaças usando ferramentas reais de SIEM.",
            keyPoints: [
              "Análise de 500+ IOCs reais",
              "Correlação de eventos de segurança",
              "Scoring CVSS automatizado",
              "Timeline de ataque reconstruction"
            ]
          },
          {
            title: "Lab 3: Network Scanning & Discovery",
            content: "Varredura completa de rede, discovery de assets e análise de vulnerabilidades.",
            keyPoints: [
              "Scan de 10,000+ dispositivos simulados",
              "Identificação de serviços vulneráveis",
              "Network topology mapping",
              "Asset classification e inventory"
            ]
          },
          {
            title: "Lab 4: Attack Simulation (APT29)",
            content: "Simulação completa de campanha APT com 25+ técnicas MITRE ATT&CK.",
            keyPoints: [
              "142 técnicas disponíveis para teste",
              "Kill chain completa de atacantes",
              "TTPs de grupos APT reais",
              "Defense evasion e persistence"
            ]
          },
          {
            title: "Lab 5: Incident Response Drill",
            content: "Exercício completo de resposta a incidentes com timeline realista.",
            keyPoints: [
              "Cenário de ransomware enterprise",
              "Coordenação multi-equipes",
              "Evidence collection e forensics",
              "Business continuity planning"
            ]
          },
          {
            title: "Lab 6: Rule Testing & Tuning",
            content: "Desenvolvimento e teste de regras de detecção customizadas.",
            keyPoints: [
              "200+ regras SIEM pré-configuradas",
              "False positive reduction",
              "Custom detection engineering",
              "Performance optimization"
            ]
          }
        ]
      }
    },
    {
      id: "dashboard",
      title: "Dashboard e Operações SOC",
      icon: Shield,
      content: {
        description: "Central de comando integrada com todos os sistemas de monitoramento e resposta",
        topics: [
          {
            title: "Command Center Dashboard",
            content: "Interface unificada para monitoramento de todas as operações de segurança em tempo real.",
            keyPoints: [
              "15 módulos SOC integrados",
              "Real-time threat intelligence",
              "AI-powered anomaly detection",
              "Executive summary dashboard"
            ]
          },
          {
            title: "Threat Map Interativo",
            content: "Visualização global de ameaças com drill-down capabilities e análise geográfica.",
            keyPoints: [
              "Ameaças plotadas em tempo real",
              "Attack vector analysis",
              "Source country analytics",
              "Threat actor attribution"
            ]
          },
          {
            title: "Incident Management Center",
            content: "Gestão completa do ciclo de vida de incidentes com workflow colaborativo.",
            keyPoints: [
              "Case management integrado",
              "Timeline reconstruction",
              "Evidence chain of custody",
              "NIST IR framework compliance"
            ]
          }
        ]
      }
    },
    {
      id: "testing-evaluation",
      title: "Sistema de Testes e Avaliação",
      icon: Target,
      content: {
        description: "Framework completo de avaliação prática com simulações realistas e feedback educacional detalhado",
        topics: [
          {
            title: "Interactive Rule Testing Engine",
            content: "Sistema avançado para teste e validação de regras de detecção SIEM em tempo real.",
            keyPoints: [
              "200+ regras SIEM pré-configuradas",
              "Teste automatizado com datasets reais",
              "Análise de false positives/negatives",
              "Performance benchmarking e otimização"
            ]
          },
          {
            title: "APT Simulation Framework",
            content: "Simulação completa de campanhas APT baseadas no framework MITRE ATT&CK.",
            keyPoints: [
              "142 técnicas MITRE ATT&CK disponíveis",
              "25+ cenários APT reais (APT29, APT1, Lazarus)",
              "Kill chain completa end-to-end",
              "Stealth scoring e defense evasion"
            ]
          },
          {
            title: "Practical Assessment Labs",
            content: "Laboratórios práticos com cenários realistas para avaliação de competências.",
            keyPoints: [
              "Incident Response drills completos",
              "Network forensics challenges",
              "Malware analysis workshops",
              "Threat hunting expeditions"
            ]
          },
          {
            title: "Certification Testing",
            content: "Avaliações certificatórias baseadas em padrões da indústria.",
            keyPoints: [
              "Simulação de exames GCIH, GCFA, CISSP",
              "Practical skills assessment",
              "Portfolio development guidance",
              "Industry mentorship programs"
            ]
          }
        ]
      }
    },
    {
      id: "advanced-modules",
      title: "Módulos SOC Avançados",
      icon: Settings,
      content: {
        description: "Suite completa de 15 módulos SOC para operações profissionais em segurança cibernética",
        topics: [
          {
            title: "Core SOC Operations (5 módulos)",
            content: "Operações essenciais de um SOC moderno com workflows padronizados.",
            keyPoints: [
              "Security Operations Dashboard",
              "Threat Detection & Analysis Center", 
              "Network Scanner & Asset Discovery",
              "Attack Simulation Laboratory",
              "Threat Intelligence Platform"
            ]
          },
          {
            title: "Advanced Analytics (3 módulos)",
            content: "Análise avançada com IA e machine learning para detecção de anomalias.",
            keyPoints: [
              "ML/AI Analysis Engine",
              "SENTINEL Surveillance System",
              "Behavioral Analytics Platform"
            ]
          },
          {
            title: "SOC Management (5 módulos)",
            content: "Gestão completa das operações SOC com compliance e reporting.",
            keyPoints: [
              "Incident Response & Case Management",
              "Vulnerability Management",
              "Asset Management & Inventory",
              "SOAR Security Automation",
              "Compliance & Reporting Framework"
            ]
          },
          {
            title: "Training & Development (2 módulos)",
            content: "Desenvolvimento contínuo de competências e documentação.",
            keyPoints: [
              "Learning Center com 6 cursos completos",
              "User Manual & Documentation Center"
            ]
          }
        ]
      }
    },
    {
      id: "threats",
      title: "Detecção e Análise de Ameaças",
      icon: AlertTriangle,
      content: {
        description: "Sistema avançado de detecção e classificação de ameaças cibernéticas",
        topics: [
          {
            title: "Análise de IOCs",
            content: "Aprenda a identificar e analisar Indicators of Compromise (IOCs) em tempo real.",
            keyPoints: [
              "Hash de malware",
              "IPs maliciosos",
              "Domínios suspeitos",
              "Assinaturas de rede"
            ]
          },
          {
            title: "Classificação de Severidade",
            content: "Sistema de pontuação CVSS e classificação automática baseada em impacto.",
            keyPoints: [
              "Critical: Ação imediata",
              "High: Resposta em 1h",
              "Medium: Resposta em 4h",
              "Low: Monitoramento"
            ]
          }
        ]
      }
    },
    {
      id: "scanner",
      title: "Scanner de Rede",
      icon: Network,
      content: {
        description: "Ferramenta de descoberta e análise de vulnerabilidades na rede",
        topics: [
          {
            title: "Descoberta de Ativos",
            content: "Identifique todos os dispositivos conectados à rede e seus serviços.",
            keyPoints: [
              "Port scanning automático",
              "Detecção de serviços",
              "Fingerprinting de OS",
              "Mapeamento de topologia"
            ]
          },
          {
            title: "Análise de Vulnerabilidades",
            content: "Avaliação automática de CVEs e configurações inseguras.",
            keyPoints: [
              "Base CVE atualizada",
              "Scoring de risco",
              "Recomendações de patch",
              "Relatórios detalhados"
            ]
          }
        ]
      }
    },
    {
      id: "simulation",
      title: "Simulação de Ataques",
      icon: Play,
      content: {
        description: "Ambiente de red team para simulação de ataques baseados no framework MITRE ATT&CK",
        topics: [
          {
            title: "Cenários MITRE ATT&CK",
            content: "Pratique defesa contra técnicas reais usadas por atacantes.",
            keyPoints: [
              "142 técnicas disponíveis",
              "Táticas de kill chain",
              "Simulação de APTs",
              "Análise de TTPs"
            ]
          },
          {
            title: "Laboratórios Práticos",
            content: "Ambientes controlados para prática segura de resposta a incidentes.",
            keyPoints: [
              "Isolamento total",
              "Logs detalhados",
              "Métricas de performance",
              "Feedback imediato"
            ]
          }
        ]
      }
    },
    {
      id: "intelligence",
      title: "Threat Intelligence",
      icon: Brain,
      content: {
        description: "Centro de inteligência para análise de ameaças e threat hunting",
        topics: [
          {
            title: "Feeds de Inteligência",
            content: "Integração com múltiplas fontes de threat intelligence em tempo real.",
            keyPoints: [
              "MISP integration",
              "Commercial feeds",
              "Open source intel",
              "IOC enrichment"
            ]
          },
          {
            title: "Threat Hunting",
            content: "Técnicas proativas de caça a ameaças avançadas.",
            keyPoints: [
              "Hypothesis-driven hunting",
              "Behavioral analysis",
              "Timeline construction",
              "Attribution analysis"
            ]
          }
        ]
      }
    },
    {
      id: "ai-analysis",
      title: "Análise com IA",
      icon: Bot,
      content: {
        description: "Sistema de machine learning para detecção de anomalias e predição de ameaças",
        topics: [
          {
            title: "Detecção de Anomalias",
            content: "Algoritmos de ML para identificar comportamentos suspeitos automaticamente.",
            keyPoints: [
              "Unsupervised learning",
              "Baseline establishment",
              "Drift detection",
              "False positive reduction"
            ]
          },
          {
            title: "Análise Preditiva",
            content: "Predição de ataques futuros baseada em padrões históricos.",
            keyPoints: [
              "Time series analysis",
              "Risk scoring",
              "Trend identification",
              "Early warning system"
            ]
          }
        ]
      }
    },
    {
      id: "sentinel",
      title: "Sistema SENTINEL",
      icon: Eye,
      content: {
        description: "Sistema avançado de vigilância com IA para detecção de ameaças físicas",
        topics: [
          {
            title: "Monitoramento Multi-Camera",
            content: "Vigilância inteligente com análise de comportamento em tempo real.",
            keyPoints: [
              "6 câmeras simultâneas",
              "Detecção facial",
              "Análise comportamental",
              "Alertas automáticos"
            ]
          },
          {
            title: "Correlação de Eventos",
            content: "Integração entre segurança física e cibernética.",
            keyPoints: [
              "Timeline unificada",
              "Cross-correlation",
              "Incident response",
              "Forensic analysis"
            ]
          }
        ]
      }
    },
    {
      id: "career-roadmap",
      title: "Roadmap de Carreira em Cibersegurança",
      icon: Users,
      content: {
        description: "Guia completo para progressão de carreira do analista iniciante ao especialista sênior",
        topics: [
          {
            title: "SOC Analyst Level 1 (0-12 meses)",
            content: "Fundamentos operacionais e triagem inicial de alertas de segurança.",
            keyPoints: [
              "Cursos Requeridos: Fundamentos + MITRE ATT&CK",
              "Skills: Alert triage, basic incident response",
              "Certificações: Security+, CySA+",
              "Salário Médio: R$ 45.000 - R$ 65.000/ano"
            ]
          },
          {
            title: "SOC Analyst Level 2 (1-3 anos)",
            content: "Análise avançada de incidentes e threat hunting proativo.",
            keyPoints: [
              "Cursos Requeridos: Threat Hunting + Incident Response",
              "Skills: Threat hunting, malware analysis, forensics",
              "Certificações: GCIH, GCFA, CEH",
              "Salário Médio: R$ 65.000 - R$ 95.000/ano"
            ]
          },
          {
            title: "SOC Analyst Level 3 / Lead (3-5 anos)",
            content: "Liderança técnica e desenvolvimento de detecções customizadas.",
            keyPoints: [
              "Cursos Requeridos: Penetration Testing + Cloud Security",
              "Skills: Detection engineering, team leadership",
              "Certificações: CISSP, CISM, OSCP",
              "Salário Médio: R$ 95.000 - R$ 140.000/ano"
            ]
          },
          {
            title: "SOC Manager / Architect (5+ anos)",
            content: "Gestão estratégica e arquitetura de segurança empresarial.",
            keyPoints: [
              "Cursos Requeridos: Todos + DeFi Security",
              "Skills: Strategic planning, architecture design",
              "Certificações: CISSP, SABSA, TOGAF",
              "Salário Médio: R$ 140.000 - R$ 250.000/ano"
            ]
          }
        ]
      }
    },
    {
      id: "next-steps",
      title: "Próximos Passos e Recursos Avançados", 
      icon: Zap,
      content: {
        description: "Orientações para continuar o desenvolvimento profissional e aproveitar ao máximo a plataforma",
        topics: [
          {
            title: "Como Começar Sua Jornada",
            content: "Roteiro recomendado para novos usuários maximizarem seu aprendizado.",
            keyPoints: [
              "1. Complete o curso Fundamentos (obrigatório)",
              "2. Pratique no Dashboard SOC diariamente (30min)",
              "3. Execute labs práticos semanalmente",
              "4. Participe de simulações APT mensais"
            ]
          },
          {
            title: "Recursos Complementares",
            content: "Ferramentas e materiais adicionais para aprofundar conhecimentos.",
            keyPoints: [
              "MITRE ATT&CK Navigator integrado",
              "CVE database com 50,000+ vulnerabilidades",
              "Threat intelligence feeds em tempo real",
              "Comunidade de prática com mentores"
            ]
          },
          {
            title: "Certificações Profissionais Suportadas",
            content: "Preparação específica para as principais certificações da indústria.",
            keyPoints: [
              "CompTIA: Security+, CySA+, PenTest+",
              "SANS: GCIH, GCFA, GCIA, GNFA",
              "(ISC)²: CISSP, CCSP, CSSLP",
              "EC-Council: CEH, CHFI, ECSA"
            ]
          },
          {
            title: "Atualizações e Roadmap da Plataforma",
            content: "Desenvolvimento contínuo baseado em feedback da comunidade.",
            keyPoints: [
              "Novos cenários APT trimestralmente",
              "Integration com ferramentas enterprise",
              "Mobile app para learning on-the-go",
              "VR labs para treinamento imersivo"
            ]
          }
        ]
      }
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: "Explore o Dashboard",
      description: "Familiarize-se com as métricas principais e o status do sistema",
      icon: Shield
    },
    {
      step: 2,
      title: "Execute um Scan",
      description: "Inicie um scan de rede para descobrir dispositivos",
      icon: Network
    },
    {
      step: 3,
      title: "Analise Ameaças",
      description: "Revise os alertas de segurança e pratique a classificação",
      icon: AlertTriangle
    },
    {
      step: 4,
      title: "Simule um Ataque",
      description: "Execute uma simulação MITRE ATT&CK para praticar defesa",
      icon: Play
    },
    {
      step: 5,
      title: "Estude nos Cursos",
      description: "Acesse o Learning Center para aprofundar conhecimentos",
      icon: GraduationCap
    }
  ];

  const bestPractices = [
    {
      category: "Análise de Incidentes",
      practices: [
        "Sempre documente todas as ações tomadas",
        "Mantenha uma timeline detalhada dos eventos",
        "Preserve evidências antes de qualquer ação",
        "Siga o princípio do menor privilégio",
        "Comunique-se claramente com a equipe"
      ]
    },
    {
      category: "Threat Hunting",
      practices: [
        "Baseie hipóteses em intelligence atual",
        "Use múltiplas fontes de dados",
        "Documente metodologias e resultados",
        "Valide descobertas com contexto",
        "Compartilhe conhecimento com a equipe"
      ]
    },
    {
      category: "Uso da Plataforma",
      practices: [
        "Pratique regularmente em diferentes cenários",
        "Complete os cursos de forma sequencial",
        "Participe de simulações em equipe",
        "Revise logs detalhados após cada exercício",
        "Mantenha-se atualizado com novas ameaças"
      ]
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-[var(--cyber-cyan)] rounded-lg flex items-center justify-center">
          <BookOpen className="text-[var(--cyber-dark)] text-xl" />
        </div>
        <div>
          <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">Manual do Usuário</h1>
          <p className="text-gray-400">Guia completo para analistas SOC</p>
        </div>
      </div>

      <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="modules">Módulos</TabsTrigger>
          <TabsTrigger value="quickstart">Início Rápido</TabsTrigger>
          <TabsTrigger value="practices">Boas Práticas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
                <Info className="w-5 h-5" />
                <span>Sobre a Plataforma</span>
              </CardTitle>
              <CardDescription>
                O SOC Defense Universe é uma plataforma educacional de última geração
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--cyber-cyan)] flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>Objetivos de Aprendizado</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Dominar técnicas de detecção de ameaças</li>
                    <li>• Aprender resposta a incidentes</li>
                    <li>• Praticar threat hunting avançado</li>
                    <li>• Desenvolver análise forense</li>
                    <li>• Compreender o framework MITRE ATT&CK</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-[var(--cyber-cyan)] flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Recursos Principais</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Simulações realistas de ataques</li>
                    <li>• Logs detalhados com explicações</li>
                    <li>• Ambiente 100% seguro</li>
                    <li>• Feedback em tempo real</li>
                    <li>• Certificações reconhecidas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Para Iniciantes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">
                  Comece com conceitos básicos e evolua gradualmente
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Fundamentos de SOC</li>
                  <li>• Terminologia essencial</li>
                  <li>• Primeiros passos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Para Experientes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">
                  Desafios avançados e cenários complexos
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• APT simulation</li>
                  <li>• Advanced hunting</li>
                  <li>• Forensic analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-[var(--cyber-cyan)] flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Para Equipes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">
                  Treinamento colaborativo e exercícios em grupo
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>• Team exercises</li>
                  <li>• Red vs Blue</li>
                  <li>• Collaborative hunts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {manualSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.id} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
                      <Icon className="w-5 h-5" />
                      <span>{section.title}</span>
                    </CardTitle>
                    <CardDescription>{section.content.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-4">
                        {section.content.topics.map((topic, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-semibold text-sm text-[var(--cyber-cyan)]">
                              {topic.title}
                            </h4>
                            <p className="text-xs text-gray-300">{topic.content}</p>
                            <div className="flex flex-wrap gap-1">
                              {topic.keyPoints.map((point, pointIndex) => (
                                <Badge 
                                  key={pointIndex} 
                                  variant="outline" 
                                  className="text-xs bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]/30"
                                >
                                  {point}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="quickstart" className="space-y-6">
          <Card className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)]">Guia de Início Rápido</CardTitle>
              <CardDescription>
                Siga estes passos para começar sua jornada no SOC Defense Universe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickStart.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="flex items-center space-x-4 p-4 bg-[var(--cyber-steel)]/20 rounded-lg border border-[var(--cyber-cyan)]/20">
                      <div className="flex-shrink-0 w-10 h-10 bg-[var(--cyber-cyan)] rounded-full flex items-center justify-center text-[var(--cyber-dark)] font-bold">
                        {step.step}
                      </div>
                      <Icon className="w-6 h-6 text-[var(--cyber-cyan)]" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[var(--cyber-cyan)]">{step.title}</h4>
                        <p className="text-sm text-gray-300">{step.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {bestPractices.map((category, index) => (
              <Card key={index} className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                <CardHeader>
                  <CardTitle className="text-[var(--cyber-cyan)] flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.practices.map((practice, practiceIndex) => (
                      <li key={practiceIndex} className="text-sm text-gray-300 flex items-start space-x-2">
                        <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full mt-2 flex-shrink-0"></div>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}