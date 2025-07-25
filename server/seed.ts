import { db } from "./db";
import { 
  users, courses, courseModules, certifications, achievements,
  threats, networkDevices, securityEvents, aiModels
} from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("🌱 Iniciando seed do banco de dados...");

    // Seed Cursos Brasileiros de Cybersegurança
    const courseData = [
      {
        title: "Fundamentos de Segurança Cibernética",
        description: "Introdução completa aos conceitos fundamentais de cybersegurança, incluindo princípios básicos de proteção digital, tipos de ameaças e medidas preventivas.",
        category: "fundamental",
        level: "iniciante",
        duration: "8 semanas",
        totalModules: 10,
        rating: 480,
        enrolledCount: 2450,
        price: 0,
        instructor: "Prof. Dr. Carlos Silva",
        language: "pt-BR",
        isActive: true,
        tags: ["cybersegurança", "fundamentos", "proteção", "ameaças"]
      },
      {
        title: "Análise de Malware Avançada",
        description: "Técnicas avançadas para análise e engenharia reversa de malware, incluindo ferramentas de análise estática e dinâmica, detecção de comportamentos maliciosos.",
        category: "advanced",
        level: "avançado",
        duration: "12 semanas",
        totalModules: 8,
        rating: 490,
        enrolledCount: 890,
        price: 0,
        instructor: "Dra. Ana Rodrigues",
        language: "pt-BR",
        isActive: true,
        tags: ["malware", "análise", "engenharia reversa", "detecção"]
      },
      {
        title: "Red Team Operations",
        description: "Metodologias avançadas de Red Team para teste de penetração e simulação de ataques reais contra infraestruturas empresariais.",
        category: "specialist",
        level: "expert",
        duration: "16 semanas",
        totalModules: 12,
        rating: 470,
        enrolledCount: 560,
        price: 0,
        instructor: "Especialista João Santos",
        language: "pt-BR",
        isActive: true,
        tags: ["red team", "pentesting", "simulação", "ataques"]
      },
      {
        title: "SOC Operations & Incident Response",
        description: "Operações de Centro de Operações de Segurança (SOC) e resposta a incidentes, incluindo detecção, análise e contenção de ameaças.",
        category: "operational",
        level: "intermediário",
        duration: "10 semanas",
        totalModules: 9,
        rating: 460,
        enrolledCount: 1240,
        price: 0,
        instructor: "Especialista Maria Oliveira",
        language: "pt-BR",
        isActive: true,
        tags: ["SOC", "resposta a incidentes", "detecção", "análise"]
      },
      {
        title: "Cloud Security Architecture",
        description: "Arquitetura de segurança em nuvem, incluindo AWS, Azure e GCP, com foco em configurações seguras e monitoramento contínuo.",
        category: "cloud",
        level: "intermediário",
        duration: "14 semanas",
        totalModules: 11,
        rating: 450,
        enrolledCount: 890,
        price: 0,
        instructor: "Arq. Pedro Costa",
        language: "pt-BR",
        isActive: true,
        tags: ["cloud", "AWS", "Azure", "arquitetura"]
      },
      {
        title: "Forense Digital e Investigação",
        description: "Técnicas de investigação forense digital, coleta de evidências, análise de dispositivos e reconstrução de eventos digitais.",
        category: "forensics",
        level: "avançado",
        duration: "18 semanas",
        totalModules: 14,
        rating: 480,
        enrolledCount: 445,
        price: 0,
        instructor: "Perito Lucas Ferreira",
        language: "pt-BR",
        isActive: true,
        tags: ["forense", "investigação", "evidências", "análise"]
      }
    ];

    // Insert courses
    const insertedCourses = await db.insert(courses).values(courseData).returning();
    console.log(`✓ ${insertedCourses.length} cursos inseridos`);

    // Seed Módulos dos Cursos
    const moduleData = [];
    
    // Módulos do curso Fundamentos de Segurança Cibernética
    const fundamentalsModules = [
      "Introdução à Cybersegurança",
      "Princípios de Segurança da Informação",
      "Tipos de Ameaças Digitais",
      "Criptografia Básica",
      "Redes e Protocolos de Segurança",
      "Políticas de Segurança",
      "Gestão de Riscos",
      "Conscientização em Segurança",
      "Ferramentas Básicas de Proteção",
      "Projeto Final - Plano de Segurança"
    ];

    // Módulos do curso Análise de Malware
    const malwareModules = [
      "Introdução ao Malware",
      "Ambiente de Análise Seguro",
      "Análise Estática Básica",
      "Análise Dinâmica",
      "Engenharia Reversa",
      "Detecção de Rootkits",
      "Análise de Rede",
      "Relatório de Análise"
    ];

    // Módulos do curso Red Team
    const redTeamModules = [
      "Metodologia Red Team",
      "Reconhecimento e OSINT",
      "Phishing e Engenharia Social",
      "Exploração de Vulnerabilidades",
      "Post-Exploitation",
      "Movimento Lateral",
      "Persistência",
      "Exfiltração de Dados",
      "Técnicas de Evasão",
      "Command & Control",
      "Relatório Executivo",
      "Projeto Final Red Team"
    ];

    // Add modules for all courses
    insertedCourses.forEach((course, courseIndex) => {
      let modules = [];
      switch (courseIndex) {
        case 0: modules = fundamentalsModules; break;
        case 1: modules = malwareModules; break;
        case 2: modules = redTeamModules; break;
        default: 
          // Generate generic modules for other courses
          modules = Array.from({length: course.modules}, (_, i) => `Módulo ${i + 1}`);
      }

      modules.forEach((title, index) => {
        moduleData.push({
          courseId: course.id,
          title,
          description: `Conteúdo detalhado do ${title}`,
          content: `Material completo sobre ${title} com exercícios práticos e exemplos reais.`,
          orderIndex: index + 1,
          duration: "2 horas",
          isRequired: true,
          isActive: true
        });
      });
    });

    await db.insert(courseModules).values(moduleData);
    console.log(`✓ ${moduleData.length} módulos inseridos`);

    // Seed Certificações
    const certificationData = [
      {
        name: "Certified Blue Team Analyst",
        description: "Certificação em análise de segurança defensiva",
        issuer: "Blue Team Ops Academy",
        level: "iniciante",
        duration: "2 anos",
        requiredCourses: [1, 4],
        isActive: true
      },
      {
        name: "Advanced Malware Analyst",
        description: "Especialista em análise de malware",
        issuer: "Blue Team Ops Academy", 
        level: "avançado",
        duration: "3 anos",
        requiredCourses: [2],
        isActive: true
      },
      {
        name: "SOC Operations Specialist",
        description: "Especialista em operações de SOC",
        issuer: "Blue Team Ops Academy",
        level: "intermediário",
        duration: "2 anos",
        requiredCourses: [4],
        isActive: true
      },
      {
        name: "Cloud Security Architect",
        description: "Arquiteto de segurança em nuvem",
        issuer: "Blue Team Ops Academy",
        level: "avançado",
        duration: "3 anos",
        requiredCourses: [5],
        isActive: true
      },
      {
        name: "Digital Forensics Expert",
        description: "Especialista em forense digital",
        issuer: "Blue Team Ops Academy",
        level: "expert",
        duration: "3 anos",
        requiredCourses: [6],
        isActive: true
      }
    ];

    await db.insert(certifications).values(certificationData);
    console.log(`✓ ${certificationData.length} certificações inseridas`);

    // Seed Achievements/Conquistas
    const achievementData = [
      {
        title: "Primeiro Login",
        description: "Bem-vindo ao Blue Team Ops!",
        icon: "user-check",
        points: 10,
        rarity: "common",
        category: "milestone",
        requirements: { type: "login" },
        isActive: true
      },
      {
        title: "Primeiro Curso Iniciado",
        description: "Deu o primeiro passo na jornada",
        icon: "play-circle",
        points: 25,
        rarity: "common",
        category: "learning",
        requirements: { type: "course_started", count: 1 },
        isActive: true
      },
      {
        title: "Estudante Dedicado",
        description: "Completou 5 módulos",
        icon: "book-open",
        points: 100,
        rarity: "uncommon",
        category: "learning",
        requirements: { type: "module_completed", count: 5 },
        isActive: true
      },
      {
        title: "Especialista em Fundamentos",
        description: "Completou curso de Fundamentos",
        icon: "shield",
        points: 500,
        rarity: "rare",
        category: "course",
        requirements: { type: "specific_course", courseId: 1 },
        isActive: true
      },
      {
        title: "Analista de Malware",
        description: "Completou curso de Análise de Malware",
        icon: "bug",
        points: 750,
        rarity: "rare",
        category: "course",
        requirements: { type: "specific_course", courseId: 2 },
        isActive: true
      },
      {
        title: "Red Team Elite",
        description: "Completou curso Red Team Operations",
        icon: "target",
        points: 1000,
        rarity: "epic",
        category: "course",
        requirements: { type: "specific_course", courseId: 3 },
        isActive: true
      },
      {
        title: "Master da Cybersegurança",
        description: "Completou todos os cursos disponíveis",
        icon: "crown",
        points: 2500,
        rarity: "legendary",
        category: "mastery",
        requirements: { type: "all_courses_completed" },
        isActive: true
      }
    ];

    await db.insert(achievements).values(achievementData);
    console.log(`✓ ${achievementData.length} conquistas inseridas`);

    // Seed Dados SOC (Threats, Devices, etc.)
    const threatData = [
      {
        title: "APT Grupo Lazarus",
        description: "Grupo APT norte-coreano focado em ataques financeiros",
        severity: "critical",
        mitreId: "G0032",
        sourceIp: "192.168.1.100",
        targetHost: "finance.company.com",
        confidence: 95,
        status: "active",
        metadata: { indicators: ["lazarus.apt.com", "192.168.1.100"] }
      },
      {
        title: "Ransomware WannaCry",
        description: "Ransomware que explora vulnerabilidade SMB",
        severity: "high",
        mitreId: "S0366",
        sourceIp: "135.124.45.6",
        targetHost: "workstation-001",
        confidence: 90,
        status: "blocked",
        metadata: { indicators: ["wannacry.exe", "135.124.45.6"] }
      },
      {
        title: "Phishing Campaign",
        description: "Campanha de phishing direcionada",
        severity: "medium",
        mitreId: "T1566",
        sourceIp: "203.124.56.89",
        targetHost: "mail.company.com",
        confidence: 75,
        status: "monitoring",
        metadata: { indicators: ["phish@evil.com", "malicious-link.com"] }
      }
    ];

    await db.insert(threats).values(threatData);
    console.log(`✓ ${threatData.length} ameaças inseridas`);

    // Seed AI Models
    const aiModelData = [
      {
        name: "TactiCore",
        type: "threat_detection",
        version: "v2.1.4",
        accuracy: 94,
        status: "active",
        description: "Motor de IA para detecção avançada de ameaças",
        lastTrained: new Date()
      },
      {
        name: "Mission Ops", 
        type: "behavioral_analysis",
        version: "v1.8.2",
        accuracy: 87,
        status: "active",
        description: "Sistema de análise comportamental para SOC",
        lastTrained: new Date()
      }
    ];

    await db.insert(aiModels).values(aiModelData);
    console.log(`✓ ${aiModelData.length} modelos IA inseridos`);

    console.log("🎉 Seed do banco de dados concluído com sucesso!");
    
  } catch (error) {
    console.error("❌ Erro durante seed:", error);
    throw error;
  }
}