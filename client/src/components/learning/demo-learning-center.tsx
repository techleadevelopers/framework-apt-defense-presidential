import { useState, useEffect } from "react";
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
  Zap,
  Crown,
  Building,
  Rocket,
  Diamond,
  Brain,
  Globe,
  Shield,
  AlertTriangle,
  Code,
  Server,
  Database
} from "lucide-react";

interface DemoCourse {
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
  instructor: string;
  learningObjectives: string[];
  prerequisites: string[];
}

interface DemoModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed?: boolean;
  content: {
    topics: string[];
    videos?: string[];
    documents?: string[];
  };
  exercises: string[];
}

interface DemoAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: Date;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface DemoCertification {
  id: string;
  name: string;
  issuer: string;
  level: string;
  requirements: string[];
  duration: string;
  earned: boolean;
  progress: number;
}

const demoCourses: DemoCourse[] = [
  {
    id: '1',
    title: 'Fundamentos de Segurança Cibernética',
    description: 'Curso abrangente cobrindo os fundamentos essenciais da cybersegurança, incluindo conceitos básicos, ameaças, defesas e melhores práticas.',
    level: 'beginner',
    duration: '8 semanas',
    modules: 12,
    enrolled: 1247,
    rating: 4.8,
    progress: 75,
    category: 'Fundamentals',
    instructor: 'Dr. Ana Silva, CISSP, CISM',
    prerequisites: ['Conhecimento básico em informática', 'Conceitos de rede'],
    learningObjectives: [
      'Compreender o panorama de ameaças cibernéticas',
      'Aplicar princípios fundamentais de segurança',
      'Implementar controles básicos de segurança',
      'Reconhecer vetores de ataque comuns',
      'Desenvolver mentalidade de segurança'
    ]
  },
  {
    id: '2',
    title: 'Análise de Malware Avançada',
    description: 'Técnicas profissionais para identificação, análise estática e dinâmica de malware, incluindo engenharia reversa e sandbox analysis.',
    level: 'intermediate',
    duration: '10 semanas',
    modules: 15,
    enrolled: 892,
    rating: 4.9,
    progress: 25,
    category: 'Malware Analysis',
    instructor: 'Prof. Carlos Lima, GREM',
    prerequisites: ['Conhecimento de sistemas operacionais', 'Programação básica', 'Redes de computadores'],
    learningObjectives: [
      'Realizar análise estática de malware',
      'Executar análise dinâmica em sandbox',
      'Utilizar ferramentas de engenharia reversa',
      'Identificar familias de malware',
      'Desenvolver assinaturas de detecção'
    ]
  },
  {
    id: '3',
    title: 'Red Team Operations',
    description: 'Operações ofensivas avançadas, teste de penetração, social engineering e simulação de APTs para fortalecimento da segurança organizacional.',
    level: 'advanced',
    duration: '12 semanas',
    modules: 18,
    enrolled: 654,
    rating: 5.0,
    locked: true,
    category: 'Offensive Security',
    instructor: 'Specialist Marcus Torres, OSCP, CRTO',
    prerequisites: ['Conhecimento avançado em redes', 'Experiência em pentesting', 'Programação intermediária'],
    learningObjectives: [
      'Planejar operações red team complexas',
      'Executar ataques multi-vetoriais',
      'Simular APTs realísticas',
      'Aplicar técnicas de social engineering',
      'Desenvolver payloads customizados'
    ]
  },
  {
    id: '4',
    title: 'SOC Operations & Incident Response',
    description: 'Operações de Centro de Segurança, detecção de ameaças, resposta a incidentes e análise forense digital para analistas SOC.',
    level: 'intermediate',
    duration: '9 semanas',
    modules: 14,
    enrolled: 1103,
    rating: 4.7,
    category: 'SOC Operations',
    instructor: 'Dir. Patricia Santos, GCIH, GCFA',
    prerequisites: ['Fundamentos de segurança', 'Conhecimento de SIEM', 'Análise de logs'],
    learningObjectives: [
      'Operar ferramentas SIEM efetivamente',
      'Detectar ameaças avançadas',
      'Responder a incidentes de segurança',
      'Realizar análise forense básica',
      'Coordenar resposta a incidentes'
    ]
  },
  {
    id: '5',
    title: 'Cloud Security & DevSecOps',
    description: 'Segurança em ambientes cloud (AWS, Azure, GCP), containerização, Kubernetes security e integração de segurança em DevOps.',
    level: 'intermediate',
    duration: '11 semanas',
    modules: 16,
    enrolled: 789,
    rating: 4.85,
    category: 'Cloud Security',
    instructor: 'Eng. Rafael Costa, CCSP, CKS',
    prerequisites: ['Conhecimento de cloud', 'DevOps básico', 'Containerização'],
    learningObjectives: [
      'Implementar segurança em multi-cloud',
      'Configurar Kubernetes security',
      'Integrar security em CI/CD',
      'Monitorar ambientes cloud',
      'Aplicar compliance em cloud'
    ]
  },
  {
    id: '6',
    title: 'Forense Digital & Threat Hunting',
    description: 'Investigação forense digital, coleta e análise de evidências, threat hunting ativo e técnicas de investigação cibernética.',
    level: 'advanced',
    duration: '10 semanas',
    modules: 13,
    enrolled: 567,
    rating: 4.95,
    category: 'Digital Forensics',
    instructor: 'Perita Dra. Lucia Martins, EnCE, GCFA',
    prerequisites: ['Sistemas operacionais avançado', 'Redes', 'Conceitos jurídicos básicos'],
    learningObjectives: [
      'Conduzir investigações forenses',
      'Coletar evidências digitais',
      'Realizar threat hunting proativo',
      'Analisar artefatos forenses',
      'Documentar investigações legalmente'
    ]
  }
];

const demoModules: Record<string, DemoModule[]> = {
  '1': [
    {
      id: '1-1',
      title: 'Introdução à Segurança Cibernética',
      duration: '2 horas',
      description: 'Fundamentos e conceitos essenciais da cybersegurança',
      completed: true,
      content: {
        topics: [
          'O que é Cybersegurança?',
          'Tríade CIA: Confidencialidade, Integridade, Disponibilidade',
          'Princípios de Gestão de Risco',
          'Tipos de Atores de Ameaça',
          'Estatísticas e Tendências Atuais'
        ],
        videos: ['intro-cybersecurity.mp4', 'cia-triad-explained.mp4'],
        documents: ['cybersecurity-fundamentals.pdf', 'risk-management-guide.pdf']
      },
      exercises: [
        'Identificar violações da tríade CIA em cenários reais',
        'Calcular risco usando matrizes de probabilidade e impacto',
        'Classificar atores de ameaça por motivação e capacidade'
      ]
    },
    {
      id: '1-2',
      title: 'Panorama de Ameaças Cibernéticas',
      duration: '2.5 horas',
      description: 'Tipos de ameaças e vetores de ataque modernos',
      completed: true,
      content: {
        topics: [
          'Malware e suas categorias',
          'Ataques de Phishing e Social Engineering',
          'Ameaças Persistentes Avançadas (APT)',
          'Ransomware e Criptografia Maliciosa',
          'Ataques a IoT e Sistemas Industriais'
        ]
      },
      exercises: [
        'Analisar samples de phishing reais',
        'Identificar características de APTs',
        'Classificar tipos de malware'
      ]
    },
    {
      id: '1-3',
      title: 'Controles de Segurança',
      duration: '3 horas',
      description: 'Implementação de controles preventivos, detectivos e corretivos',
      content: {
        topics: [
          'Tipos de controles de segurança',
          'Firewalls e sistemas de detecção',
          'Criptografia e PKI',
          'Controle de acesso e identidade',
          'Monitoramento e logging'
        ]
      },
      exercises: [
        'Configurar regras de firewall básicas',
        'Implementar controles de acesso',
        'Analisar logs de segurança'
      ]
    }
  ],
  '2': [
    {
      id: '2-1',
      title: 'Introdução à Análise de Malware',
      duration: '3 horas',
      description: 'Fundamentos da análise de software malicioso',
      completed: true,
      content: {
        topics: [
          'Tipos de malware e classificação',
          'Ambientes seguros para análise',
          'Ferramentas essenciais',
          'Metodologia de análise',
          'Precauções de segurança'
        ]
      },
      exercises: [
        'Configurar lab de análise isolado',
        'Identificar malware por comportamento',
        'Usar ferramentas básicas de análise'
      ]
    }
  ]
};

const demoAchievements: DemoAchievement[] = [
  {
    id: '1',
    title: 'Explorador Cyber',
    description: 'Bem-vindo ao SOC Defense Universe!',
    icon: 'trophy',
    earned: true,
    earnedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    points: 50,
    rarity: 'common'
  },
  {
    id: '2',
    title: 'Primeiro Passo',
    description: 'Iniciou seu primeiro curso',
    icon: 'book-open',
    earned: true,
    earnedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    points: 100,
    rarity: 'common'
  },
  {
    id: '3',
    title: 'Estudante Dedicado',
    description: 'Completou 3 módulos',
    icon: 'check-circle',
    earned: true,
    earnedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    points: 150,
    rarity: 'common'
  },
  {
    id: '4',
    title: 'Analista em Formação',
    description: 'Progresso de 50% no curso SOC Operations',
    icon: 'shield',
    earned: false,
    points: 300,
    rarity: 'rare'
  },
  {
    id: '5',
    title: 'Caçador de Ameaças',
    description: 'Completou curso de Análise de Malware',
    icon: 'target',
    earned: false,
    points: 500,
    rarity: 'epic'
  },
  {
    id: '6',
    title: 'Master Cyber',
    description: 'Completou todos os cursos disponíveis',
    icon: 'crown',
    earned: false,
    points: 1000,
    rarity: 'legendary'
  }
];

const demoCertifications: DemoCertification[] = [
  {
    id: '1',
    name: 'Cybersecurity Foundation Certificate',
    issuer: 'SOC Defense Universe',
    level: 'Fundamental',
    requirements: ['Completar curso de Fundamentos', 'Aprovação em quiz final'],
    duration: 'Permanente',
    earned: false,
    progress: 75
  },
  {
    id: '2',
    name: 'SOC Analyst Professional',
    issuer: 'SOC Defense Universe',
    level: 'Professional',
    requirements: ['2 cursos completos', 'Projeto prático', 'Exame de certificação'],
    duration: '2 anos',
    earned: false,
    progress: 25
  },
  {
    id: '3',
    name: 'Advanced Threat Hunter',
    issuer: 'SOC Defense Universe',
    level: 'Expert',
    requirements: ['4 cursos completos', 'Análise de caso real', 'Apresentação técnica'],
    duration: '3 anos',
    earned: false,
    progress: 0
  }
];

export default function DemoLearningCenter() {
  const [selectedCourse, setSelectedCourse] = useState<DemoCourse | null>(null);
  const [showModules, setShowModules] = useState(false);
  const [userStats, setUserStats] = useState({
    totalPoints: 300,
    coursesCompleted: 0,
    coursesInProgress: 2,
    achievementsEarned: 3,
    studyStreak: 7,
    totalStudyTime: 45
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'epic': return 'text-purple-400';
      case 'legendary': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const CourseCard = ({ course }: { course: DemoCourse }) => (
    <Card className="bg-slate-900/50 border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge className={`${getLevelColor(course.level)} text-white text-xs`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </Badge>
          {course.locked && <Lock className="h-4 w-4 text-yellow-500" />}
        </div>
        <CardTitle className="text-cyan-300 text-lg leading-tight">{course.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {course.modules} módulos
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 text-sm mb-4 line-clamp-3">{course.description}</p>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-400">Progresso</span>
            <span className="text-cyan-400">{course.progress || 0}%</span>
          </div>
          <Progress value={course.progress || 0} className="h-2" />
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedCourse(course);
              setShowModules(true);
            }}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white"
            disabled={course.locked}
          >
            {course.progress ? 'Continuar' : 'Iniciar'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedCourse(course)}
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950"
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (showModules && selectedCourse) {
    const modules = demoModules[selectedCourse.id] || [];
    
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button 
              onClick={() => setShowModules(false)}
              variant="outline"
              className="mb-4 border-cyan-500/50 text-cyan-400 hover:bg-cyan-950"
            >
              ← Voltar aos Cursos
            </Button>
            <h1 className="text-3xl font-bold text-cyan-300 mb-2">{selectedCourse.title}</h1>
            <p className="text-slate-400 mb-4">{selectedCourse.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Instrutor</p>
                      <p className="text-cyan-300 font-medium">{selectedCourse.instructor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Duração</p>
                      <p className="text-cyan-300 font-medium">{selectedCourse.duration}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-slate-400">Matriculados</p>
                      <p className="text-cyan-300 font-medium">{selectedCourse.enrolled}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-cyan-300 mb-4">Módulos do Curso</h2>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id} className="bg-slate-900/50 border-cyan-500/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                            {index + 1}. {module.title}
                          </h3>
                          <p className="text-slate-400 text-sm mb-3">{module.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {module.duration}
                            </div>
                            {module.completed && (
                              <div className="flex items-center gap-1 text-green-400">
                                <CheckCircle className="h-4 w-4" />
                                Concluído
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-cyan-400 mb-2">Tópicos Abordados:</h4>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                          {module.content.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-cyan-400 mb-2">Exercícios Práticos:</h4>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                          {module.exercises.map((exercise, i) => (
                            <li key={i}>{exercise}</li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className={`w-full ${
                          module.completed 
                            ? 'bg-green-600 hover:bg-green-500' 
                            : 'bg-cyan-600 hover:bg-cyan-500'
                        } text-white`}
                      >
                        {module.completed ? 'Revisar Módulo' : 'Iniciar Módulo'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="bg-slate-900/50 border-cyan-500/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Objetivos de Aprendizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedCourse.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Target className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Pré-requisitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedCourse.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">Centro de Aprendizado Cyber</h1>
              <p className="text-slate-400">Desenvolva suas habilidades em cybersegurança com cursos práticos e certificações reconhecidas</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-300">{userStats.totalPoints} pts</div>
              <div className="text-sm text-slate-400">Pontuação Total</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-300">{userStats.coursesCompleted}</div>
                <div className="text-sm text-slate-400">Cursos Completos</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{userStats.coursesInProgress}</div>
                <div className="text-sm text-slate-400">Em Progresso</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.achievementsEarned}</div>
                <div className="text-sm text-slate-400">Conquistas</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-cyan-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.studyStreak}</div>
                <div className="text-sm text-slate-400">Dias Seguidos</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-cyan-500/20">
            <TabsTrigger value="courses" className="data-[state=active]:bg-cyan-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Cursos
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-cyan-600">
              <Trophy className="h-4 w-4 mr-2" />
              Conquistas
            </TabsTrigger>
            <TabsTrigger value="certifications" className="data-[state=active]:bg-cyan-600">
              <Award className="h-4 w-4 mr-2" />
              Certificações
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-cyan-600">
              <Target className="h-4 w-4 mr-2" />
              Progresso
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Catálogo de Cursos</h2>
              <div className="flex gap-2 mb-4">
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">Todos</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">Fundamentals</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">SOC Operations</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">Offensive Security</Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-400">Cloud Security</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Conquistas</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoAchievements.map((achievement) => (
                <Card key={achievement.id} className={`bg-slate-900/50 border-cyan-500/20 ${achievement.earned ? 'opacity-100' : 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? 'bg-cyan-600' : 'bg-slate-700'}`}>
                        {achievement.icon === 'trophy' && <Trophy className="h-6 w-6" />}
                        {achievement.icon === 'book-open' && <BookOpen className="h-6 w-6" />}
                        {achievement.icon === 'check-circle' && <CheckCircle className="h-6 w-6" />}
                        {achievement.icon === 'shield' && <Shield className="h-6 w-6" />}
                        {achievement.icon === 'target' && <Target className="h-6 w-6" />}
                        {achievement.icon === 'crown' && <Crown className="h-6 w-6" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-cyan-300">{achievement.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getRarityColor(achievement.rarity)} bg-transparent border`}>
                            {achievement.rarity}
                          </Badge>
                          <span className="text-yellow-400 text-sm font-medium">{achievement.points} pts</span>
                        </div>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-green-400 mt-1">
                            Conquistado em {achievement.earnedDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-cyan-300 mb-4">Certificações</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoCertifications.map((cert) => (
                <Card key={cert.id} className="bg-slate-900/50 border-cyan-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={`${cert.earned ? 'bg-green-600' : 'bg-slate-600'} text-white`}>
                        {cert.level}
                      </Badge>
                      {cert.earned && <Award className="h-5 w-5 text-yellow-400" />}
                    </div>
                    <CardTitle className="text-cyan-300">{cert.name}</CardTitle>
                    <p className="text-slate-400 text-sm">Emissor: {cert.issuer}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Progresso</span>
                        <span className="text-cyan-400">{cert.progress}%</span>
                      </div>
                      <Progress value={cert.progress} className="h-2" />
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-cyan-400 mb-2">Requisitos:</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-sm text-slate-400">
                      Validade: {cert.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Progresso Geral</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Fundamentos de Segurança</span>
                        <span className="text-cyan-400">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Análise de Malware</span>
                        <span className="text-cyan-400">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">SOC Operations</span>
                        <span className="text-cyan-400">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-300">Estatísticas de Estudo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-300">{userStats.totalStudyTime}h</div>
                      <div className="text-sm text-slate-400">Tempo Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{userStats.studyStreak}</div>
                      <div className="text-sm text-slate-400">Dias Consecutivos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">15</div>
                      <div className="text-sm text-slate-400">Módulos Completos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">92%</div>
                      <div className="text-sm text-slate-400">Taxa de Sucesso</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}