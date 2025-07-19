import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Clock, 
  Star, 
  Play,
  Lock,
  CheckCircle,
  Award,
  GraduationCap,
  Shield,
  Cpu,
  Terminal,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Video,
  Download,
  Settings,
  LogOut,
  Bell,
  Search
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  modules: number;
  completedModules: number;
  progress: number;
  locked: boolean;
  category: string;
  instructor: string;
  rating: number;
  students: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  date?: string;
  points: number;
}

export default function StudentDashboard() {
  const [student] = useState({
    name: "João Silva",
    email: "joao.silva@estudante.com",
    institution: "Universidade Federal do Cyber",
    level: "Iniciante",
    totalPoints: 1250,
    coursesCompleted: 3,
    coursesInProgress: 2,
    streak: 7,
    rank: "Bronze",
    nextRank: "Silver"
  });

  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "Fundamentos de Segurança Cibernética",
      description: "Introdução aos conceitos básicos de cybersecurity e proteção de dados.",
      difficulty: "beginner",
      duration: "4 semanas",
      modules: 12,
      completedModules: 8,
      progress: 67,
      locked: false,
      category: "Fundamentos",
      instructor: "Dr. Ana Costa",
      rating: 4.8,
      students: 1250
    },
    {
      id: "2", 
      title: "Análise de Malware",
      description: "Técnicas avançadas para identificação e análise de software malicioso.",
      difficulty: "intermediate",
      duration: "6 semanas",
      modules: 18,
      completedModules: 3,
      progress: 17,
      locked: false,
      category: "Análise",
      instructor: "Prof. Carlos Lima",
      rating: 4.9,
      students: 890
    },
    {
      id: "3",
      title: "Red Team Operations",
      description: "Operações ofensivas de segurança e testes de penetração avançados.",
      difficulty: "advanced",
      duration: "8 semanas",
      modules: 24,
      completedModules: 0,
      progress: 0,
      locked: true,
      category: "Avançado",
      instructor: "Specialist Marcus",
      rating: 5.0,
      students: 450
    },
    {
      id: "4",
      title: "SOC Operations",
      description: "Operações de Centro de Segurança e monitoramento de ameaças.",
      difficulty: "intermediate",
      duration: "5 semanas",
      modules: 15,
      completedModules: 0,
      progress: 0,
      locked: false,
      category: "Operações",
      instructor: "Dir. Patricia Santos",
      rating: 4.7,
      students: 720
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Primeiro Login",
      description: "Bem-vindo ao SOC Defense Universe!",
      icon: Trophy,
      earned: true,
      date: "2025-01-10",
      points: 50
    },
    {
      id: "2",
      title: "Curso Iniciado",
      description: "Iniciou seu primeiro curso de cybersecurity",
      icon: BookOpen,
      earned: true,
      date: "2025-01-11",
      points: 100
    },
    {
      id: "3",
      title: "Semana Completa",
      description: "Manteve uma sequência de 7 dias estudando",
      icon: Calendar,
      earned: true,
      date: "2025-01-13",
      points: 200
    },
    {
      id: "4",
      title: "Expert Certificado",
      description: "Complete 5 cursos com nota superior a 90%",
      icon: Award,
      earned: false,
      points: 500
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 border-green-400';
      case 'intermediate': return 'text-yellow-400 border-yellow-400';
      case 'advanced': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cyber-dark)] via-black to-[var(--cyber-dark)] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-2 border-[var(--cyber-cyan)]">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-[var(--cyber-cyan)] text-black text-xl font-bold">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-orbitron font-bold text-[var(--cyber-cyan)]">
                {student.name}
              </h1>
              <p className="text-gray-400">{student.institution}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {student.level}
                </Badge>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  <Trophy className="w-3 h-3 mr-1" />
                  {student.rank}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pontos Totais</p>
                <p className="text-2xl font-bold text-[var(--cyber-cyan)]">{student.totalPoints.toLocaleString()}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cursos Concluídos</p>
                <p className="text-2xl font-bold text-green-400">{student.coursesCompleted}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Em Progresso</p>
                <p className="text-2xl font-bold text-yellow-400">{student.coursesInProgress}</p>
              </div>
              <BookOpen className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Sequência</p>
                <p className="text-2xl font-bold text-orange-400">{student.streak} dias</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Meus Cursos</span>
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Cursos
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="p-4 bg-[var(--cyber-dark)]/30 rounded-lg border border-gray-700 hover:border-[var(--cyber-cyan)]/50 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-white font-semibold">{course.title}</h3>
                        {course.locked && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{course.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{course.students} estudantes</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{course.rating}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-gray-400 border-gray-400">
                        {course.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {course.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-400">
                          Progresso: {course.completedModules}/{course.modules} módulos
                        </span>
                        <span className="text-xs text-[var(--cyber-cyan)]">{course.progress}%</span>
                      </div>
                      <Progress 
                        value={course.progress} 
                        className="h-2"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      Instrutor: {course.instructor}
                    </div>
                    <div className="flex space-x-2">
                      {course.locked ? (
                        <Button size="sm" disabled className="bg-gray-600">
                          <Lock className="w-4 h-4 mr-2" />
                          Bloqueado
                        </Button>
                      ) : course.progress > 0 ? (
                        <Button size="sm" className="bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400">
                          <Play className="w-4 h-4 mr-2" />
                          Continuar
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4 mr-2" />
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                <Trophy className="w-5 h-5" />
                <span>Conquistas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.slice(0, 4).map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div key={achievement.id} className={`p-3 rounded-lg border transition-all ${
                    achievement.earned 
                      ? 'bg-[var(--cyber-cyan)]/10 border-[var(--cyber-cyan)]/30' 
                      : 'bg-gray-800/30 border-gray-700'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        achievement.earned ? 'bg-[var(--cyber-cyan)]' : 'bg-gray-600'
                      }`}>
                        <IconComponent className={`w-4 h-4 ${
                          achievement.earned ? 'text-black' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-sm font-semibold ${
                          achievement.earned ? 'text-[var(--cyber-cyan)]' : 'text-gray-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{achievement.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-yellow-400">+{achievement.points} pts</span>
                          {achievement.earned && achievement.date && (
                            <span className="text-xs text-gray-500">{achievement.date}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Next Rank Progress */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Próximo Nível</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-gray-400 text-sm">Progresso para {student.nextRank}</p>
                <div className="mt-2">
                  <Progress value={62} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1250 pts</span>
                    <span>2000 pts</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-300">Faltam <span className="text-[var(--cyber-cyan)] font-semibold">750 pontos</span></p>
                <p className="text-xs text-gray-500 mt-1">Complete mais cursos para avançar!</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                <Terminal className="w-5 h-5" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Baixar Certificados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="w-4 h-4 mr-2" />
                Webinars Gravados
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Material de Apoio
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Fórum de Estudantes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}