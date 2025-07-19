import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  UserPlus,
  GraduationCap,
  Award,
  Activity,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Building,
  Globe
} from "lucide-react";

interface StudentStats {
  total: number;
  active: number;
  newThisMonth: number;
  completionRate: number;
}

interface CourseStats {
  total: number;
  published: number;
  draft: number;
  avgRating: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'analyst' | 'admin';
  institution: string;
  joinDate: string;
  lastActive: string;
  coursesCompleted: number;
  totalPoints: number;
  status: 'active' | 'inactive' | 'suspended';
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [studentStats] = useState<StudentStats>({
    total: 1247,
    active: 892,
    newThisMonth: 156,
    completionRate: 78.5
  });

  const [courseStats] = useState<CourseStats>({
    total: 24,
    published: 18,
    draft: 6,
    avgRating: 4.7
  });

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao.silva@estudante.com",
      role: "student",
      institution: "Universidade Federal do Cyber",
      joinDate: "2025-01-10",
      lastActive: "2025-01-13",
      coursesCompleted: 3,
      totalPoints: 1250,
      status: "active"
    },
    {
      id: "2", 
      name: "Maria Santos",
      email: "maria.santos@tech.com",
      role: "analyst",
      institution: "TechCorp Security",
      joinDate: "2024-12-15",
      lastActive: "2025-01-13",
      coursesCompleted: 8,
      totalPoints: 3400,
      status: "active"
    },
    {
      id: "3",
      name: "Dr. Ana Costa",
      email: "ana.costa@uni.edu",
      role: "admin",
      institution: "Cyber University",
      joinDate: "2024-11-01",
      lastActive: "2025-01-13",
      coursesCompleted: 15,
      totalPoints: 7800,
      status: "active"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'inactive': return 'text-yellow-400 border-yellow-400';
      case 'suspended': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return GraduationCap;
      case 'analyst': return Shield;
      case 'admin': return Building;
      default: return Users;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-400 border-blue-400';
      case 'analyst': return 'text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]';
      case 'admin': return 'text-purple-400 border-purple-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cyber-dark)] via-black to-[var(--cyber-dark)] p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-orbitron font-bold text-[var(--cyber-cyan)]">
              Painel Administrativo
            </h1>
            <p className="text-gray-400 mt-1">Sistema de Gestão SOC Defense Universe</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-[var(--cyber-dark)]/50 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'students', label: 'Estudantes', icon: Users },
            { id: 'courses', label: 'Cursos', icon: BookOpen },
            { id: 'analytics', label: 'Análises', icon: PieChart }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-[var(--cyber-cyan)] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total de Estudantes</p>
                    <p className="text-2xl font-bold text-[var(--cyber-cyan)]">{studentStats.total.toLocaleString()}</p>
                    <p className="text-xs text-green-400 mt-1">+{studentStats.newThisMonth} este mês</p>
                  </div>
                  <Users className="w-8 h-8 text-[var(--cyber-cyan)]" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Estudantes Ativos</p>
                    <p className="text-2xl font-bold text-green-400">{studentStats.active.toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">{((studentStats.active / studentStats.total) * 100).toFixed(1)}% do total</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Cursos Publicados</p>
                    <p className="text-2xl font-bold text-yellow-400">{courseStats.published}</p>
                    <p className="text-xs text-gray-400 mt-1">{courseStats.draft} em desenvolvimento</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Taxa de Conclusão</p>
                    <p className="text-2xl font-bold text-purple-400">{studentStats.completionRate}%</p>
                    <p className="text-xs text-gray-400 mt-1">Média geral</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Atividade Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { user: "João Silva", action: "completou", target: "Curso de Fundamentos", time: "2 min atrás" },
                  { user: "Maria Santos", action: "iniciou", target: "Análise de Malware", time: "15 min atrás" },
                  { user: "Carlos Lima", action: "obteve certificado", target: "SOC Operations", time: "1h atrás" },
                  { user: "Ana Costa", action: "publicou", target: "Novo módulo de Red Team", time: "2h atrás" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-[var(--cyber-dark)]/30 rounded-lg">
                    <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        <span className="font-semibold text-[var(--cyber-cyan)]">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="text-gray-300">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Alertas do Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "warning", message: "3 usuários inativos há mais de 30 dias", action: "Revisar" },
                  { type: "info", message: "Backup do banco de dados concluído", action: "Ver logs" },
                  { type: "success", message: "Novo curso aprovado para publicação", action: "Publicar" },
                  { type: "warning", message: "Certificados expiram em 7 dias", action: "Renovar" }
                ].map((alert, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                    alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                    alert.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                    'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <div className="flex items-center space-x-2">
                      {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                      {alert.type === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {alert.type === 'info' && <Activity className="w-4 h-4 text-blue-400" />}
                      <span className="text-sm text-gray-200">{alert.message}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      {alert.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'students' && (
        <>
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou instituição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-[var(--cyber-dark)]/50 border-gray-600"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Usuários ({filteredUsers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-[var(--cyber-dark)]/30 rounded-lg border border-gray-700 hover:border-[var(--cyber-cyan)]/50 transition-all">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-[var(--cyber-cyan)]">
                          <AvatarImage src={`/api/placeholder/48/48`} />
                          <AvatarFallback className="bg-[var(--cyber-cyan)] text-black">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                          <p className="text-gray-500 text-xs">{user.institution}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Papel</p>
                          <Badge variant="outline" className={getRoleColor(user.role)}>
                            <RoleIcon className="w-3 h-3 mr-1" />
                            {user.role}
                          </Badge>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Cursos</p>
                          <p className="text-sm text-[var(--cyber-cyan)] font-semibold">{user.coursesCompleted}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Pontos</p>
                          <p className="text-sm text-yellow-400 font-semibold">{user.totalPoints.toLocaleString()}</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-gray-400">Status</p>
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Other tabs content can be added here */}
      {activeTab === 'courses' && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl text-gray-300 mb-2">Gestão de Cursos</h3>
          <p className="text-gray-400">Em desenvolvimento...</p>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl text-gray-300 mb-2">Análises Avançadas</h3>
          <p className="text-gray-400">Em desenvolvimento...</p>
        </div>
      )}
    </div>
  );
}