import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Cpu, 
  Terminal, 
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Building
} from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'student' | 'analyst' | 'admin'>('student');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Make API call to authenticate user
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Login Autorizado",
          description: `Acesso concedido ao Blue Team Ops - Nível ${userType.toUpperCase()}`,
        });

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on user type - all users go to SOC dashboard
        window.location.href = '/soc-dashboard';
      } else {
        toast({
          title: "Acesso Negado",
          description: data.error || "Credenciais inválidas. Verifique seus dados.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Acesso Negado",
        description: "Erro de conexão. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserTypeIcon = () => {
    switch (userType) {
      case 'student': return UserCheck;
      case 'analyst': return Shield;
      case 'admin': return Building;
    }
  };

  const UserTypeIcon = getUserTypeIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cyber-dark)] via-black to-[var(--cyber-dark)] flex items-center justify-center p-4">
      {/* Cyber Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyber-cyan)]/5 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent animate-pulse"></div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-[var(--cyber-cyan)] mb-2">
            BLUE TEAM OPS
          </h1>
          <p className="text-gray-400 text-sm">
            Sistema de Segurança Cibernética - Autenticação Requerida
          </p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <Label className="text-[var(--cyber-cyan)] text-sm font-semibold mb-3 block">
            NÍVEL DE ACESSO
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 'student' as const, label: 'Estudante', icon: UserCheck },
              { type: 'analyst' as const, label: 'Analista', icon: Shield },
              { type: 'admin' as const, label: 'Admin', icon: Building }
            ].map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`p-3 rounded-lg border transition-all ${
                  userType === type
                    ? 'border-[var(--cyber-cyan)] bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)]'
                    : 'border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
              >
                <Icon className="w-4 h-4 mx-auto mb-1" />
                <div className="text-xs">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <Card className="glass-panel border-[var(--cyber-cyan)]/30 backdrop-blur-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <UserTypeIcon className="w-5 h-5 text-[var(--cyber-cyan)]" />
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron">
                LOGIN - {userType.toUpperCase()}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Terminal className="w-3 h-3" />
              <span>Terminal de Acesso Seguro</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[var(--cyber-cyan)] text-sm">
                  USUÁRIO / ID
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500"
                  style={{ color: 'white' }}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[var(--cyber-cyan)] text-sm">
                  SENHA / CÓDIGO
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500 pr-10"
                    style={{ color: 'white' }}
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--cyber-cyan)]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Access Level Badge */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[var(--cyber-cyan)] border-[var(--cyber-cyan)]">
                  <Lock className="w-3 h-3 mr-1" />
                  Nível {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </Badge>
                <Link href="/auth/forgot-password">
                  <a className="text-xs text-gray-400 hover:text-[var(--cyber-cyan)] transition-colors">
                    Esqueci a senha
                  </a>
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold py-3 transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>AUTENTICANDO...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>ACESSAR SISTEMA</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Access Button */}
            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--cyber-dark)] px-2 text-gray-400">ou</span>
              </div>
            </div>
            
            <Link href="/demo" className="block mt-4">
              <Button 
                type="button"
                variant="outline"
                className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:border-cyan-400 font-medium py-3 rounded-lg transition-all duration-300"
              >
                🎯 Entrar no Modo Demo (1 min)
              </Button>
            </Link>
            
            <div className="text-center text-xs text-gray-400 mt-3">
              <p>Modo Demo: Acesso completo ao frontend sem autenticação</p>
              <p>Modo Autenticado: Progresso salvo no banco de dados</p>
            </div>

            {/* Registration Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-2">
                Primeiro acesso ao Sistema SOC?
              </p>
              <Link href="/auth/register" className="text-[var(--cyber-cyan)] hover:text-cyan-400 font-semibold transition-colors">
                REGISTRAR-SE NO SISTEMA
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5" />
                <div className="text-xs text-orange-200">
                  <strong>AVISO DE SEGURANÇA:</strong> Este sistema monitora todas as atividades. 
                  Uso não autorizado é terminantemente proibido.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>SOC Defense Universe © 2025</p>
          <p>Sistema de Operações de Segurança Cibernética</p>
        </div>
      </div>
    </div>
  );
}