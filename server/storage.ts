import { 
  users, threats, networkDevices, securityEvents, aiModels,
  courses, courseModules, studentProgress, certifications, 
  studentCertifications, achievements, studentAchievements,
  type User, type InsertUser, 
  type Threat, type InsertThreat,
  type NetworkDevice, type InsertNetworkDevice,
  type SecurityEvent, type InsertSecurityEvent,
  type AiModel, type InsertAiModel,
  type Course, type InsertCourse,
  type CourseModule, type InsertCourseModule,
  type StudentProgress, type InsertStudentProgress,
  type Certification, type InsertCertification,
  type StudentCertification, type InsertStudentCertification,
  type Achievement, type InsertAchievement,
  type StudentAchievement, type InsertStudentAchievement
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Threats
  getThreats(): Promise<Threat[]>;
  getThreat(id: number): Promise<Threat | undefined>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  updateThreatStatus(id: number, status: string): Promise<Threat | undefined>;
  getActiveThreatsByeverity(severity?: string): Promise<Threat[]>;

  // Network Devices
  getNetworkDevices(): Promise<NetworkDevice[]>;
  getNetworkDevice(id: number): Promise<NetworkDevice | undefined>;
  createNetworkDevice(device: InsertNetworkDevice): Promise<NetworkDevice>;
  updateDeviceStatus(id: number, status: string): Promise<NetworkDevice | undefined>;

  // Security Events
  getSecurityEvents(limit?: number): Promise<SecurityEvent[]>;
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;

  // AI Models
  getAiModels(): Promise<AiModel[]>;
  getAiModel(id: number): Promise<AiModel | undefined>;
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  updateAiModelStats(id: number, stats: Partial<AiModel>): Promise<AiModel | undefined>;

  // Learning Management System
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<Course>): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  getPopularCourses(limit?: number): Promise<Course[]>;

  // Course Modules
  getCourseModules(courseId: number): Promise<CourseModule[]>;
  getCourseModule(id: number): Promise<CourseModule | undefined>;
  createCourseModule(module: InsertCourseModule): Promise<CourseModule>;
  updateCourseModule(id: number, module: Partial<CourseModule>): Promise<CourseModule | undefined>;

  // Student Progress
  getStudentProgress(userId: number, courseId?: number): Promise<StudentProgress[]>;
  getStudentCourseProgress(userId: number, courseId: number): Promise<StudentProgress | undefined>;
  updateStudentProgress(progress: InsertStudentProgress): Promise<StudentProgress>;
  completeModule(userId: number, moduleId: number): Promise<StudentProgress>;

  // Certifications
  getCertifications(): Promise<Certification[]>;
  getCertification(id: number): Promise<Certification | undefined>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  getStudentCertifications(userId: number): Promise<StudentCertification[]>;
  awardCertification(userId: number, certificationId: number): Promise<StudentCertification>;

  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getStudentAchievements(userId: number): Promise<StudentAchievement[]>;
  awardAchievement(userId: number, achievementId: number): Promise<StudentAchievement>;
  checkAchievements(userId: number): Promise<StudentAchievement[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private threats: Map<number, Threat>;
  private networkDevices: Map<number, NetworkDevice>;
  private securityEvents: Map<number, SecurityEvent>;
  private aiModels: Map<number, AiModel>;
  private courses: Map<number, Course>;
  private courseModules: Map<number, CourseModule>;
  private studentProgress: Map<string, StudentProgress>; // key: userId-courseId or userId-moduleId
  private certifications: Map<number, Certification>;
  private studentCertifications: Map<string, StudentCertification>; // key: userId-certificationId
  private achievements: Map<number, Achievement>;
  private studentAchievements: Map<string, StudentAchievement>; // key: userId-achievementId
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.threats = new Map();
    this.networkDevices = new Map();
    this.securityEvents = new Map();
    this.aiModels = new Map();
    this.courses = new Map();
    this.courseModules = new Map();
    this.studentProgress = new Map();
    this.certifications = new Map();
    this.studentCertifications = new Map();
    this.achievements = new Map();
    this.studentAchievements = new Map();
    this.currentId = 1;
    
    this.initializeData();
    this.initializeUsers();
  }

  private initializeUsers() {
    // Create admin user
    const adminUser: User = {
      id: this.currentId++,
      username: 'admin',
      password: 'admin'
    };
    this.users.set(adminUser.id, adminUser);
  }

  private initializeData() {
    // Initialize AI Models
    const tactiCoreModel: AiModel = {
      id: this.currentId++,
      name: "TactiCore Kernel",
      type: "tacticore",
      status: "active",
      accuracy: 98,
      lastUpdated: new Date(),
      predictions: 1247,
      responseTime: 0.3
    };
    this.aiModels.set(tactiCoreModel.id, tactiCoreModel);

    const missionOpsModel: AiModel = {
      id: this.currentId++,
      name: "Mission Ops Kernel",
      type: "mission_ops",
      status: "active",
      accuracy: 95,
      lastUpdated: new Date(),
      predictions: 847,
      responseTime: 0.5
    };
    this.aiModels.set(missionOpsModel.id, missionOpsModel);

    // Initialize Critical Threats
    const threat1: Threat = {
      id: this.currentId++,
      title: "APT29 - MITRE T1055.002",
      description: "Process injection detected in explorer.exe - Possible privilege escalation attempt",
      severity: "critical",
      mitreId: "T1055.002",
      sourceIp: "192.168.1.45",
      targetHost: "DESKTOP-ABC123",
      confidence: 97,
      status: "active",
      detectedAt: new Date(Date.now() - 2 * 60 * 1000),
      metadata: { processName: "explorer.exe", technique: "Process Injection" }
    };
    this.threats.set(threat1.id, threat1);

    const threat2: Threat = {
      id: this.currentId++,
      title: "Cobalt Strike - MITRE T1071.001",
      description: "Suspicious HTTP beacon detected - Possible C2 communication",
      severity: "critical",
      mitreId: "T1071.001",
      sourceIp: "10.0.0.23",
      targetHost: "malicious-domain.com",
      confidence: 94,
      status: "active",
      detectedAt: new Date(Date.now() - 5 * 60 * 1000),
      metadata: { protocol: "HTTP", beaconInterval: 30000 }
    };
    this.threats.set(threat2.id, threat2);

    const threat3: Threat = {
      id: this.currentId++,
      title: "Suspicious PowerShell - MITRE T1059.001",
      description: "Obfuscated PowerShell script execution detected",
      severity: "high",
      mitreId: "T1059.001",
      sourceIp: "192.168.1.78",
      targetHost: "WORKSTATION-456",
      confidence: 89,
      status: "monitoring",
      detectedAt: new Date(Date.now() - 8 * 60 * 1000),
      metadata: { processName: "powershell.exe", scriptObfuscated: true }
    };
    this.threats.set(threat3.id, threat3);

    // Initialize Learning Content
    this.initializeLearningContent();
  }

  private initializeLearningContent() {
    // Initialize Comprehensive Cybersecurity Courses
    const fundamentalsCourse: Course = {
      id: this.currentId++,
      title: "Fundamentos de Segurança Cibernética",
      description: "Curso abrangente cobrindo os fundamentos essenciais da cybersegurança, incluindo conceitos básicos, ameaças, defesas e melhores práticas.",
      level: "beginner",
      category: "Fundamentals",
      duration: "8 semanas",
      instructor: "Dr. Ana Silva, CISSP, CISM",
      price: 0,
      rating: 480, // 4.8 stars
      totalModules: 12,
      prerequisites: ["Conhecimento básico em informática", "Conceitos de rede"],
      learningObjectives: [
        "Compreender o panorama de ameaças cibernéticas",
        "Aplicar princípios fundamentais de segurança",
        "Implementar controles básicos de segurança",
        "Reconhecer vetores de ataque comuns",
        "Desenvolver mentalidade de segurança"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(fundamentalsCourse.id, fundamentalsCourse);

    const malwareAnalysisCourse: Course = {
      id: this.currentId++,
      title: "Análise de Malware Avançada",
      description: "Técnicas profissionais para identificação, análise estática e dinâmica de malware, incluindo engenharia reversa e sandbox analysis.",
      level: "intermediate",
      category: "Malware Analysis",
      duration: "10 semanas",
      instructor: "Prof. Carlos Lima, GREM",
      price: 0,
      rating: 490, // 4.9 stars
      totalModules: 15,
      prerequisites: ["Conhecimento de sistemas operacionais", "Programação básica", "Redes de computadores"],
      learningObjectives: [
        "Realizar análise estática de malware",
        "Executar análise dinâmica em sandbox",
        "Utilizar ferramentas de engenharia reversa",
        "Identificar familias de malware",
        "Desenvolver assinaturas de detecção"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(malwareAnalysisCourse.id, malwareAnalysisCourse);

    const redTeamCourse: Course = {
      id: this.currentId++,
      title: "Red Team Operations",
      description: "Operações ofensivas avançadas, teste de penetração, social engineering e simulação de APTs para fortalecimento da segurança organizacional.",
      level: "advanced",
      category: "Offensive Security",
      duration: "12 semanas",
      instructor: "Specialist Marcus Torres, OSCP, CRTO",
      price: 0,
      rating: 500, // 5.0 stars
      totalModules: 18,
      prerequisites: ["Conhecimento avançado em redes", "Experiência em pentesting", "Programação intermediária"],
      learningObjectives: [
        "Planejar operações red team complexas",
        "Executar ataques multi-vetoriais",
        "Simular APTs realísticas",
        "Aplicar técnicas de social engineering",
        "Desenvolver payloads customizados"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(redTeamCourse.id, redTeamCourse);

    const socOperationsCourse: Course = {
      id: this.currentId++,
      title: "SOC Operations & Incident Response",
      description: "Operações de Centro de Segurança, detecção de ameaças, resposta a incidentes e análise forense digital para analistas SOC.",
      level: "intermediate",
      category: "SOC Operations",
      duration: "9 semanas",
      instructor: "Dir. Patricia Santos, GCIH, GCFA",
      price: 0,
      rating: 470, // 4.7 stars
      totalModules: 14,
      prerequisites: ["Fundamentos de segurança", "Conhecimento de SIEM", "Análise de logs"],
      learningObjectives: [
        "Operar ferramentas SIEM efetivamente",
        "Detectar ameaças avançadas",
        "Responder a incidentes de segurança",
        "Realizar análise forense básica",
        "Coordenar resposta a incidentes"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(socOperationsCourse.id, socOperationsCourse);

    const cloudSecurityCourse: Course = {
      id: this.currentId++,
      title: "Cloud Security & DevSecOps",
      description: "Segurança em ambientes cloud (AWS, Azure, GCP), containerização, Kubernetes security e integração de segurança em DevOps.",
      level: "intermediate",
      category: "Cloud Security",
      duration: "11 semanas",
      instructor: "Eng. Rafael Costa, CCSP, CKS",
      price: 0,
      rating: 485, // 4.85 stars
      totalModules: 16,
      prerequisites: ["Conhecimento de cloud", "DevOps básico", "Containerização"],
      learningObjectives: [
        "Implementar segurança em multi-cloud",
        "Configurar Kubernetes security",
        "Integrar security em CI/CD",
        "Monitorar ambientes cloud",
        "Aplicar compliance em cloud"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(cloudSecurityCourse.id, cloudSecurityCourse);

    const forenseDigitalCourse: Course = {
      id: this.currentId++,
      title: "Forense Digital & Threat Hunting",
      description: "Investigação forense digital, coleta e análise de evidências, threat hunting ativo e técnicas de investigação cibernética.",
      level: "advanced",
      category: "Digital Forensics",
      duration: "10 semanas",
      instructor: "Perita Dra. Lucia Martins, EnCE, GCFA",
      price: 0,
      rating: 495, // 4.95 stars
      totalModules: 13,
      prerequisites: ["Sistemas operacionais avançado", "Redes", "Conceitos jurídicos básicos"],
      learningObjectives: [
        "Conduzir investigações forenses",
        "Coletar evidências digitais",
        "Realizar threat hunting proativo",
        "Analisar artefatos forenses",
        "Documentar investigações legalmente"
      ],
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(forenseDigitalCourse.id, forenseDigitalCourse);

    // Initialize Course Modules for Fundamentals Course
    this.initializeFundamentalsModules(fundamentalsCourse.id);
    this.initializeMalwareAnalysisModules(malwareAnalysisCourse.id);
    this.initializeRedTeamModules(redTeamCourse.id);
    
    // Initialize Certifications
    this.initializeCertifications();
    
    // Initialize Achievements
    this.initializeAchievements();
  }

  private initializeFundamentalsModules(courseId: number) {
    const modules = [
      {
        title: "Introdução à Segurança Cibernética",
        description: "Fundamentos e conceitos essenciais da cybersegurança",
        duration: "2 horas",
        orderIndex: 1,
        content: {
          topics: [
            "O que é Cybersegurança?",
            "Tríade CIA: Confidencialidade, Integridade, Disponibilidade",
            "Princípios de Gestão de Risco",
            "Tipos de Atores de Ameaça",
            "Estatísticas e Tendências Atuais"
          ],
          videos: ["intro-cybersecurity.mp4", "cia-triad-explained.mp4"],
          documents: ["cybersecurity-fundamentals.pdf", "risk-management-guide.pdf"]
        },
        exercises: [
          "Identificar violações da tríade CIA em cenários reais",
          "Calcular risco usando matrizes de probabilidade e impacto",
          "Classificar atores de ameaça por motivação e capacidade"
        ],
        resources: ["NIST Cybersecurity Framework", "ISO 27001 Overview"]
      },
      {
        title: "Panorama de Ameaças Cibernéticas",
        description: "Tipos de ameaças e vetores de ataque modernos",
        duration: "2.5 horas",
        orderIndex: 2,
        content: {
          topics: [
            "Malware e suas categorias",
            "Ataques de Phishing e Social Engineering",
            "Ameaças Persistentes Avançadas (APT)",
            "Ransomware e Criptografia Maliciosa",
            "Ataques a IoT e Sistemas Industriais"
          ],
          videos: ["threat-landscape.mp4", "apt-analysis.mp4"],
          documents: ["malware-taxonomy.pdf", "phishing-examples.pdf"]
        },
        exercises: [
          "Analisar samples de phishing reais",
          "Identificar características de APTs",
          "Classificar tipos de malware"
        ],
        resources: ["MITRE ATT&CK Framework", "Threat Intelligence Reports"]
      }
    ];

    modules.forEach((moduleData, index) => {
      const module: CourseModule = {
        id: this.currentId++,
        courseId,
        title: moduleData.title,
        description: moduleData.description,
        content: moduleData.content,
        duration: moduleData.duration,
        orderIndex: moduleData.orderIndex,
        exercises: moduleData.exercises,
        resources: moduleData.resources,
        createdAt: new Date()
      };
      this.courseModules.set(module.id, module);
    });
  }

  private initializeMalwareAnalysisModules(courseId: number) {
    const modules = [
      {
        title: "Introdução à Análise de Malware",
        description: "Fundamentos da análise de software malicioso",
        duration: "3 horas",
        orderIndex: 1,
        content: {
          topics: [
            "Tipos de malware e classificação",
            "Ambientes seguros para análise",
            "Ferramentas essenciais",
            "Metodologia de análise",
            "Precauções de segurança"
          ]
        },
        exercises: [
          "Configurar lab de análise isolado",
          "Identificar malware por comportamento",
          "Usar ferramentas básicas de análise"
        ]
      },
      {
        title: "Análise Estática Avançada",
        description: "Técnicas de análise sem execução do malware",
        duration: "4 horas",
        orderIndex: 2,
        content: {
          topics: [
            "Análise de headers PE",
            "Strings e indicadores",
            "Hashing e assinaturas",
            "Imports e exports",
            "Packed executables"
          ]
        },
        exercises: [
          "Analisar headers de executáveis",
          "Extrair strings significativas",
          "Identificar packers comuns"
        ]
      }
    ];

    modules.forEach((moduleData) => {
      const module: CourseModule = {
        id: this.currentId++,
        courseId,
        title: moduleData.title,
        description: moduleData.description,
        content: moduleData.content,
        duration: moduleData.duration,
        orderIndex: moduleData.orderIndex,
        exercises: moduleData.exercises,
        resources: [],
        createdAt: new Date()
      };
      this.courseModules.set(module.id, module);
    });
  }

  private initializeRedTeamModules(courseId: number) {
    const modules = [
      {
        title: "Planejamento de Operações Red Team",
        description: "Metodologia e planejamento de exercícios red team",
        duration: "3.5 horas",
        orderIndex: 1,
        content: {
          topics: [
            "Objetivos e escopo de operações",
            "Threat modeling e persona development",
            "Rules of engagement",
            "Timeline e faseamento",
            "Coordenação com blue team"
          ]
        },
        exercises: [
          "Desenvolver cenário de APT",
          "Criar rules of engagement",
          "Planejar timeline de ataque"
        ]
      }
    ];

    modules.forEach((moduleData) => {
      const module: CourseModule = {
        id: this.currentId++,
        courseId,
        title: moduleData.title,
        description: moduleData.description,
        content: moduleData.content,
        duration: moduleData.duration,
        orderIndex: moduleData.orderIndex,
        exercises: moduleData.exercises,
        resources: [],
        createdAt: new Date()
      };
      this.courseModules.set(module.id, module);
    });
  }

  private initializeCertifications() {
    const certifications = [
      {
        name: "Cybersecurity Foundation Certificate",
        issuer: "SOC Defense Universe",
        level: "Fundamental",
        requiredCourses: [1], // Fundamentals course
        duration: "Permanente",
        description: "Certificação fundamental em princípios de cybersegurança"
      },
      {
        name: "SOC Analyst Professional",
        issuer: "SOC Defense Universe",
        level: "Professional",
        requiredCourses: [1, 4], // Fundamentals + SOC Operations
        duration: "2 anos",
        description: "Certificação profissional para analistas SOC"
      },
      {
        name: "Advanced Threat Hunter",
        issuer: "SOC Defense Universe",
        level: "Expert",
        requiredCourses: [1, 2, 4, 6], // Multiple courses
        duration: "3 anos",
        description: "Certificação expert em threat hunting e análise avançada"
      }
    ];

    certifications.forEach((certData) => {
      const cert: Certification = {
        id: this.currentId++,
        name: certData.name,
        issuer: certData.issuer,
        level: certData.level,
        requiredCourses: certData.requiredCourses,
        duration: certData.duration,
        description: certData.description,
        badgeUrl: `/badges/${certData.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        isActive: true,
        createdAt: new Date()
      };
      this.certifications.set(cert.id, cert);
    });
  }

  private initializeAchievements() {
    const achievements = [
      {
        title: "Primeiro Login",
        description: "Bem-vindo ao SOC Defense Universe!",
        icon: "trophy",
        points: 50,
        rarity: "common",
        criteria: { type: "login", count: 1 }
      },
      {
        title: "Explorador de Conhecimento",
        description: "Iniciou seu primeiro curso",
        icon: "book-open",
        points: 100,
        rarity: "common",
        criteria: { type: "course_started", count: 1 }
      },
      {
        title: "Estudante Dedicado",
        description: "Completou primeiro módulo",
        icon: "check-circle",
        points: 150,
        rarity: "common",
        criteria: { type: "module_completed", count: 1 }
      },
      {
        title: "Especialista em Formação",
        description: "Completou primeiro curso inteiro",
        icon: "graduation-cap",
        points: 500,
        rarity: "rare",
        criteria: { type: "course_completed", count: 1 }
      },
      {
        title: "Caçador de Ameaças",
        description: "Completou curso de SOC Operations",
        icon: "shield",
        points: 750,
        rarity: "rare",
        criteria: { type: "specific_course", courseId: 4 }
      },
      {
        title: "Red Team Elite",
        description: "Completou curso Red Team Operations",
        icon: "target",
        points: 1000,
        rarity: "epic",
        criteria: { type: "specific_course", courseId: 3 }
      },
      {
        title: "Master da Cybersegurança",
        description: "Completou todos os cursos disponíveis",
        icon: "crown",
        points: 2500,
        rarity: "legendary",
        criteria: { type: "all_courses_completed" }
      }
    ];

    achievements.forEach((achievementData) => {
      const achievement: Achievement = {
        id: this.currentId++,
        title: achievementData.title,
        description: achievementData.description,
        icon: achievementData.icon,
        points: achievementData.points,
        rarity: achievementData.rarity as any,
        requirements: achievementData.criteria,
        category: "learning",
        isActive: true,
        createdAt: new Date()
      };
      this.achievements.set(achievement.id, achievement);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Initialize new user with zero progress in Learning Center
    // This ensures they have access to all SOC features but start fresh in courses
    await this.initializeNewUserLearningProgress(id);
    
    return user;
  }

  private async initializeNewUserLearningProgress(userId: number): Promise<void> {
    // Initialize all courses with 0% progress for new users
    const courses = await this.getCourses();
    
    for (const course of courses) {
      const progressKey = `${userId}-${course.id}`;
      const initialProgress: StudentProgress = {
        id: this.currentId++,
        userId,
        courseId: course.id,
        moduleId: null,
        progress: 0,
        isCompleted: false,
        timeSpent: 0,
        lastAccessed: new Date(),
        completedAt: null
      };
      this.studentProgress.set(progressKey, initialProgress);
    }
  }

  // Threat methods
  async getThreats(): Promise<Threat[]> {
    return Array.from(this.threats.values()).sort((a, b) => 
      new Date(b.detectedAt || 0).getTime() - new Date(a.detectedAt || 0).getTime()
    );
  }

  async getThreat(id: number): Promise<Threat | undefined> {
    return this.threats.get(id);
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const id = this.currentId++;
    const threat: Threat = { 
      ...insertThreat, 
      id, 
      detectedAt: new Date(),
      metadata: insertThreat.metadata || {},
      mitreId: insertThreat.mitreId || null,
      sourceIp: insertThreat.sourceIp || null,
      targetHost: insertThreat.targetHost || null
    };
    this.threats.set(id, threat);
    return threat;
  }

  async updateThreatStatus(id: number, status: string): Promise<Threat | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      threat.status = status;
      this.threats.set(id, threat);
      return threat;
    }
    return undefined;
  }

  async getActiveThreatsByeverity(severity?: string): Promise<Threat[]> {
    const allThreats = Array.from(this.threats.values());
    let filtered = allThreats.filter(t => t.status === 'active' || t.status === 'monitoring');
    
    if (severity) {
      filtered = filtered.filter(t => t.severity === severity);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.detectedAt || 0).getTime() - new Date(a.detectedAt || 0).getTime()
    );
  }

  // Network Device methods
  async getNetworkDevices(): Promise<NetworkDevice[]> {
    return Array.from(this.networkDevices.values());
  }

  async getNetworkDevice(id: number): Promise<NetworkDevice | undefined> {
    return this.networkDevices.get(id);
  }

  async createNetworkDevice(insertDevice: InsertNetworkDevice): Promise<NetworkDevice> {
    const id = this.currentId++;
    const device: NetworkDevice = { 
      ...insertDevice, 
      id, 
      lastScanned: new Date(),
      hostname: insertDevice.hostname || null,
      deviceType: insertDevice.deviceType || null,
      operatingSystem: insertDevice.operatingSystem || null,
      services: insertDevice.services || {},
      vulnerabilities: insertDevice.vulnerabilities || {}
    };
    this.networkDevices.set(id, device);
    return device;
  }

  async updateDeviceStatus(id: number, status: string): Promise<NetworkDevice | undefined> {
    const device = this.networkDevices.get(id);
    if (device) {
      device.status = status;
      this.networkDevices.set(id, device);
      return device;
    }
    return undefined;
  }

  // Security Event methods
  async getSecurityEvents(limit = 50): Promise<SecurityEvent[]> {
    const events = Array.from(this.securityEvents.values())
      .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    
    return events.slice(0, limit);
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const id = this.currentId++;
    const event: SecurityEvent = { 
      ...insertEvent, 
      id, 
      timestamp: new Date(),
      metadata: insertEvent.metadata || {}
    };
    this.securityEvents.set(id, event);
    return event;
  }

  // AI Model methods
  async getAiModels(): Promise<AiModel[]> {
    return Array.from(this.aiModels.values());
  }

  async getAiModel(id: number): Promise<AiModel | undefined> {
    return this.aiModels.get(id);
  }

  async createAiModel(insertModel: InsertAiModel): Promise<AiModel> {
    const id = this.currentId++;
    const model: AiModel = { 
      ...insertModel, 
      id, 
      lastUpdated: new Date(),
      accuracy: insertModel.accuracy || null,
      predictions: insertModel.predictions || null,
      responseTime: insertModel.responseTime || null
    };
    this.aiModels.set(id, model);
    return model;
  }

  async updateAiModelStats(id: number, stats: Partial<AiModel>): Promise<AiModel | undefined> {
    const model = this.aiModels.get(id);
    if (model) {
      Object.assign(model, stats, { lastUpdated: new Date() });
      this.aiModels.set(id, model);
      return model;
    }
    return undefined;
  }

  // Learning Management System Methods

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isPublished);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentId++;
    const course: Course = {
      ...insertCourse,
      id,
      rating: insertCourse.rating || 0,
      price: insertCourse.price || 0,
      prerequisites: insertCourse.prerequisites || [],
      learningObjectives: insertCourse.learningObjectives || [],
      isPublished: insertCourse.isPublished || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.courses.set(id, course);
    return course;
  }

  async updateCourse(id: number, courseUpdate: Partial<Course>): Promise<Course | undefined> {
    const course = this.courses.get(id);
    if (course) {
      Object.assign(course, courseUpdate, { updatedAt: new Date() });
      this.courses.set(id, course);
      return course;
    }
    return undefined;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.category === category && course.isPublished);
  }

  async getPopularCourses(limit = 6): Promise<Course[]> {
    return Array.from(this.courses.values())
      .filter(course => course.isPublished)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  // Course Module methods
  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    return Array.from(this.courseModules.values())
      .filter(module => module.courseId === courseId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  async getCourseModule(id: number): Promise<CourseModule | undefined> {
    return this.courseModules.get(id);
  }

  async createCourseModule(insertModule: InsertCourseModule): Promise<CourseModule> {
    const id = this.currentId++;
    const module: CourseModule = {
      ...insertModule,
      id,
      exercises: insertModule.exercises || [],
      resources: insertModule.resources || [],
      createdAt: new Date()
    };
    this.courseModules.set(id, module);
    return module;
  }

  async updateCourseModule(id: number, moduleUpdate: Partial<CourseModule>): Promise<CourseModule | undefined> {
    const module = this.courseModules.get(id);
    if (module) {
      Object.assign(module, moduleUpdate);
      this.courseModules.set(id, module);
      return module;
    }
    return undefined;
  }

  // Student Progress methods
  async getStudentProgress(userId: number, courseId?: number): Promise<StudentProgress[]> {
    const allProgress = Array.from(this.studentProgress.values());
    let filtered = allProgress.filter(progress => progress.userId === userId);
    
    if (courseId) {
      filtered = filtered.filter(progress => progress.courseId === courseId);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime()
    );
  }

  async getStudentCourseProgress(userId: number, courseId: number): Promise<StudentProgress | undefined> {
    const key = `${userId}-${courseId}`;
    return this.studentProgress.get(key);
  }

  async updateStudentProgress(insertProgress: InsertStudentProgress): Promise<StudentProgress> {
    const key = insertProgress.moduleId 
      ? `${insertProgress.userId}-${insertProgress.courseId}-${insertProgress.moduleId}`
      : `${insertProgress.userId}-${insertProgress.courseId}`;
    
    const existing = this.studentProgress.get(key);
    if (existing) {
      Object.assign(existing, insertProgress, { 
        lastAccessed: new Date(),
        completedAt: insertProgress.isCompleted ? new Date() : existing.completedAt
      });
      this.studentProgress.set(key, existing);
      return existing;
    } else {
      const id = this.currentId++;
      const progress: StudentProgress = {
        ...insertProgress,
        id,
        moduleId: insertProgress.moduleId || null,
        progress: insertProgress.progress || 0,
        isCompleted: insertProgress.isCompleted || false,
        timeSpent: insertProgress.timeSpent || 0,
        lastAccessed: new Date(),
        completedAt: insertProgress.isCompleted ? new Date() : null
      };
      this.studentProgress.set(key, progress);
      return progress;
    }
  }

  async completeModule(userId: number, moduleId: number): Promise<StudentProgress> {
    const module = this.courseModules.get(moduleId);
    if (!module) {
      throw new Error(`Module ${moduleId} not found`);
    }

    const progressUpdate: InsertStudentProgress = {
      userId,
      courseId: module.courseId,
      moduleId,
      progress: 100,
      isCompleted: true,
      timeSpent: 0 // This would be tracked in a real implementation
    };

    const updatedProgress = await this.updateStudentProgress(progressUpdate);
    
    // Check for achievements
    await this.checkAchievements(userId);
    
    return updatedProgress;
  }

  // Certification methods
  async getCertifications(): Promise<Certification[]> {
    return Array.from(this.certifications.values()).filter(cert => cert.isActive);
  }

  async getCertification(id: number): Promise<Certification | undefined> {
    return this.certifications.get(id);
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const id = this.currentId++;
    const certification: Certification = {
      ...insertCertification,
      id,
      requiredCourses: insertCertification.requiredCourses || [],
      badgeUrl: insertCertification.badgeUrl || null,
      description: insertCertification.description || null,
      isActive: insertCertification.isActive !== undefined ? insertCertification.isActive : true,
      createdAt: new Date()
    };
    this.certifications.set(id, certification);
    return certification;
  }

  async getStudentCertifications(userId: number): Promise<StudentCertification[]> {
    return Array.from(this.studentCertifications.values())
      .filter(cert => cert.userId === userId)
      .sort((a, b) => new Date(b.earnedAt || 0).getTime() - new Date(a.earnedAt || 0).getTime());
  }

  async awardCertification(userId: number, certificationId: number): Promise<StudentCertification> {
    const key = `${userId}-${certificationId}`;
    const existing = this.studentCertifications.get(key);
    
    if (existing && existing.isEarned) {
      return existing;
    }

    const certification = this.certifications.get(certificationId);
    if (!certification) {
      throw new Error(`Certification ${certificationId} not found`);
    }

    const id = this.currentId++;
    const studentCert: StudentCertification = {
      id,
      userId,
      certificationId,
      progress: 100,
      isEarned: true,
      earnedAt: new Date(),
      expiresAt: this.calculateExpirationDate(certification.duration),
      certificateUrl: `/certificates/${userId}-${certificationId}.pdf`
    };
    
    this.studentCertifications.set(key, studentCert);
    return studentCert;
  }

  private calculateExpirationDate(duration: string): Date | null {
    if (duration.toLowerCase() === 'permanente') {
      return null;
    }
    
    const years = parseInt(duration);
    if (!isNaN(years)) {
      const expiration = new Date();
      expiration.setFullYear(expiration.getFullYear() + years);
      return expiration;
    }
    
    return null;
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.isActive);
  }

  async getStudentAchievements(userId: number): Promise<StudentAchievement[]> {
    return Array.from(this.studentAchievements.values())
      .filter(achievement => achievement.userId === userId)
      .sort((a, b) => new Date(b.earnedAt || 0).getTime() - new Date(a.earnedAt || 0).getTime());
  }

  async awardAchievement(userId: number, achievementId: number): Promise<StudentAchievement> {
    const key = `${userId}-${achievementId}`;
    const existing = this.studentAchievements.get(key);
    
    if (existing) {
      return existing;
    }

    const achievement = this.achievements.get(achievementId);
    if (!achievement) {
      throw new Error(`Achievement ${achievementId} not found`);
    }

    const id = this.currentId++;
    const studentAchievement: StudentAchievement = {
      id,
      userId,
      achievementId,
      progress: 100,
      isEarned: true,
      earnedAt: new Date()
    };
    
    this.studentAchievements.set(key, studentAchievement);
    return studentAchievement;
  }

  async checkAchievements(userId: number): Promise<StudentAchievement[]> {
    const newAchievements: StudentAchievement[] = [];
    const achievements = await this.getAchievements();
    const studentAchievements = await this.getStudentAchievements(userId);
    const earnedAchievementIds = new Set(studentAchievements.map(sa => sa.achievementId));

    for (const achievement of achievements) {
      if (earnedAchievementIds.has(achievement.id)) {
        continue; // Already earned
      }

      let shouldAward = false;
      const criteria = achievement.requirements as any;

      switch (criteria.type) {
        case 'login':
          shouldAward = true; // First login achievement
          break;
          
        case 'course_started':
          const startedCourses = await this.getStudentProgress(userId);
          shouldAward = startedCourses.length >= criteria.count;
          break;
          
        case 'module_completed':
          const completedModules = await this.getStudentProgress(userId);
          const moduleCount = completedModules.filter(p => p.isCompleted && p.moduleId).length;
          shouldAward = moduleCount >= criteria.count;
          break;
          
        case 'course_completed':
          const completedCourses = await this.getStudentProgress(userId);
          const courseCount = completedCourses.filter(p => p.isCompleted && !p.moduleId).length;
          shouldAward = courseCount >= criteria.count;
          break;
          
        case 'specific_course':
          const specificProgress = await this.getStudentCourseProgress(userId, criteria.courseId);
          shouldAward = specificProgress?.isCompleted || false;
          break;
          
        case 'all_courses_completed':
          const allCourses = await this.getCourses();
          const userProgress = await this.getStudentProgress(userId);
          const completedCourseIds = userProgress
            .filter(p => p.isCompleted && !p.moduleId)
            .map(p => p.courseId);
          shouldAward = allCourses.every(course => completedCourseIds.includes(course.id));
          break;
      }

      if (shouldAward) {
        const newAchievement = await this.awardAchievement(userId, achievement.id);
        newAchievements.push(newAchievement);
      }
    }

    return newAchievements;
  }
}

import { db } from "./db";
import { eq, and } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getThreats(): Promise<Threat[]> {
    return await db.select().from(threats);
  }

  async getThreat(id: number): Promise<Threat | undefined> {
    const [threat] = await db.select().from(threats).where(eq(threats.id, id));
    return threat || undefined;
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const [threat] = await db
      .insert(threats)
      .values(insertThreat)
      .returning();
    return threat;
  }

  async updateThreatStatus(id: number, status: string): Promise<Threat | undefined> {
    const [threat] = await db
      .update(threats)
      .set({ status })
      .where(eq(threats.id, id))
      .returning();
    return threat || undefined;
  }

  async getActiveThreatsByeverity(severity?: string): Promise<Threat[]> {
    if (severity) {
      return await db.select().from(threats).where(eq(threats.severity, severity));
    }
    return await db.select().from(threats);
  }

  async getNetworkDevices(): Promise<NetworkDevice[]> {
    return await db.select().from(networkDevices);
  }

  async getNetworkDevice(id: number): Promise<NetworkDevice | undefined> {
    const [device] = await db.select().from(networkDevices).where(eq(networkDevices.id, id));
    return device || undefined;
  }

  async createNetworkDevice(insertDevice: InsertNetworkDevice): Promise<NetworkDevice> {
    const [device] = await db
      .insert(networkDevices)
      .values(insertDevice)
      .returning();
    return device;
  }

  async updateDeviceStatus(id: number, status: string): Promise<NetworkDevice | undefined> {
    const [device] = await db
      .update(networkDevices)
      .set({ status })
      .where(eq(networkDevices.id, id))
      .returning();
    return device || undefined;
  }

  async getSecurityEvents(limit = 50): Promise<SecurityEvent[]> {
    return await db.select().from(securityEvents).limit(limit);
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const [event] = await db
      .insert(securityEvents)
      .values(insertEvent)
      .returning();
    return event;
  }

  async getAiModels(): Promise<AiModel[]> {
    return await db.select().from(aiModels);
  }

  async getAiModel(id: number): Promise<AiModel | undefined> {
    const [model] = await db.select().from(aiModels).where(eq(aiModels.id, id));
    return model || undefined;
  }

  async createAiModel(insertModel: InsertAiModel): Promise<AiModel> {
    const [model] = await db
      .insert(aiModels)
      .values(insertModel)
      .returning();
    return model;
  }

  async updateAiModelStats(id: number, stats: Partial<AiModel>): Promise<AiModel | undefined> {
    const [model] = await db
      .update(aiModels)
      .set(stats)
      .where(eq(aiModels.id, id))
      .returning();
    return model || undefined;
  }

  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async updateCourse(id: number, courseUpdate: Partial<Course>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set(courseUpdate)
      .where(eq(courses.id, id))
      .returning();
    return course || undefined;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.category, category));
  }

  async getPopularCourses(limit = 6): Promise<Course[]> {
    return await db.select().from(courses).limit(limit);
  }

  async getCourseModules(courseId: number): Promise<CourseModule[]> {
    return await db.select().from(courseModules).where(eq(courseModules.courseId, courseId));
  }

  async getCourseModule(id: number): Promise<CourseModule | undefined> {
    const [module] = await db.select().from(courseModules).where(eq(courseModules.id, id));
    return module || undefined;
  }

  async createCourseModule(insertModule: InsertCourseModule): Promise<CourseModule> {
    const [module] = await db
      .insert(courseModules)
      .values(insertModule)
      .returning();
    return module;
  }

  async updateCourseModule(id: number, moduleUpdate: Partial<CourseModule>): Promise<CourseModule | undefined> {
    const [module] = await db
      .update(courseModules)
      .set(moduleUpdate)
      .where(eq(courseModules.id, id))
      .returning();
    return module || undefined;
  }

  async getStudentProgress(userId: number, courseId?: number): Promise<StudentProgress[]> {
    if (courseId) {
      return await db.select().from(studentProgress)
        .where(and(eq(studentProgress.userId, userId), eq(studentProgress.courseId, courseId)));
    }
    return await db.select().from(studentProgress).where(eq(studentProgress.userId, userId));
  }

  async getStudentCourseProgress(userId: number, courseId: number): Promise<StudentProgress | undefined> {
    const [progress] = await db.select().from(studentProgress)
      .where(and(eq(studentProgress.userId, userId), eq(studentProgress.courseId, courseId)));
    return progress || undefined;
  }

  async updateStudentProgress(insertProgress: InsertStudentProgress): Promise<StudentProgress> {
    const [progress] = await db
      .insert(studentProgress)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async completeModule(userId: number, moduleId: number): Promise<StudentProgress> {
    const progressUpdate: InsertStudentProgress = {
      userId,
      moduleId,
      courseId: 0, // Will be updated with proper courseId
      progress: 100,
      isCompleted: true
    };
    return await this.updateStudentProgress(progressUpdate);
  }

  async getCertifications(): Promise<Certification[]> {
    return await db.select().from(certifications);
  }

  async getCertification(id: number): Promise<Certification | undefined> {
    const [cert] = await db.select().from(certifications).where(eq(certifications.id, id));
    return cert || undefined;
  }

  async createCertification(insertCertification: InsertCertification): Promise<Certification> {
    const [cert] = await db
      .insert(certifications)
      .values(insertCertification)
      .returning();
    return cert;
  }

  async getStudentCertifications(userId: number): Promise<StudentCertification[]> {
    return await db.select().from(studentCertifications).where(eq(studentCertifications.userId, userId));
  }

  async awardCertification(userId: number, certificationId: number): Promise<StudentCertification> {
    const [studentCert] = await db
      .insert(studentCertifications)
      .values({
        userId,
        certificationId,
        progress: 100,
        isEarned: true
      })
      .returning();
    return studentCert;
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements);
  }

  async getStudentAchievements(userId: number): Promise<StudentAchievement[]> {
    return await db.select().from(studentAchievements).where(eq(studentAchievements.userId, userId));
  }

  async awardAchievement(userId: number, achievementId: number): Promise<StudentAchievement> {
    const [studentAchievement] = await db
      .insert(studentAchievements)
      .values({
        userId,
        achievementId,
        isEarned: true,
        progress: 100
      })
      .returning();
    return studentAchievement;
  }

  async checkAchievements(userId: number): Promise<StudentAchievement[]> {
    // Implementation for checking and awarding achievements
    return [];
  }
}

export const storage = new DatabaseStorage();
