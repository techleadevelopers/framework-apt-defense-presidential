import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Cpu, 
  UserPlus,
  AlertTriangle,
  CheckCircle,
  GraduationCap,
  Building,
  Users
} from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    institution: "",
    role: "student" as 'student' | 'analyst'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro de Validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Termos de Uso",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Make API call to register user
      const response = await fetch('/api/auth/register', {
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
          title: "Registro Concluído",
          description: `Conta criada com sucesso! Bem-vindo ao Blue Team Ops.`,
        });

        // Redirect to login
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);
      } else {
        toast({
          title: "Erro no Registro",
          description: data.error || "Falha ao criar conta. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no Registro",
        description: "Falha ao criar conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (formData.role) {
      case 'student': return GraduationCap;
      case 'analyst': return Shield;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cyber-dark)] via-black to-[var(--cyber-dark)] flex items-center justify-center p-4">
      {/* Cyber Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--cyber-cyan)]/5 to-transparent animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent animate-pulse"></div>
      </div>

      {/* Main Registration Container */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-orbitron font-bold text-[var(--cyber-cyan)] mb-2">
            REGISTRO NO SOC
          </h1>
          <p className="text-gray-400 text-sm">
            Cadastro de Novo Operador - Sistema de Segurança Cibernética
          </p>
        </div>

        {/* Registration Form */}
        <Card className="glass-panel border-[var(--cyber-cyan)]/30 backdrop-blur-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <RoleIcon className="w-5 h-5 text-[var(--cyber-cyan)]" />
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron">
                NOVO CADASTRO - {formData.role.toUpperCase()}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Users className="w-3 h-3" />
              <span>Criação de Conta Segura</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label className="text-[var(--cyber-cyan)] text-sm font-semibold">
                  TIPO DE CONTA
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'student' as const, label: 'Estudante', icon: GraduationCap, desc: 'Aprendizado' },
                    { type: 'analyst' as const, label: 'Analista', icon: Shield, desc: 'Operacional' }
                  ].map(({ type, label, icon: Icon, desc }) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: type }))}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.role === type
                          ? 'border-[var(--cyber-cyan)] bg-[var(--cyber-cyan)]/10 text-[var(--cyber-cyan)]'
                          : 'border-gray-600 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs opacity-70">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[var(--cyber-cyan)] text-sm">
                    NOME
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500"
                    placeholder="Primeiro nome"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[var(--cyber-cyan)] text-sm">
                    SOBRENOME
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500"
                    placeholder="Último nome"
                    required
                  />
                </div>
              </div>

              {/* Account Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Nome de usuário único"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[var(--cyber-cyan)] text-sm">
                    EMAIL
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
              </div>

              {/* Institution */}
              <div className="space-y-2">
                <Label htmlFor="institution" className="text-[var(--cyber-cyan)] text-sm">
                  INSTITUIÇÃO / ORGANIZAÇÃO
                </Label>
                <Input
                  id="institution"
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                  className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500"
                  placeholder="Universidade, empresa ou organização"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[var(--cyber-cyan)] text-sm">
                    SENHA
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500 pr-10"
                      placeholder="Senha segura"
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-[var(--cyber-cyan)] text-sm">
                    CONFIRMAR SENHA
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="cyber-input bg-[var(--cyber-dark)]/50 border-gray-600 text-white placeholder-gray-500 pr-10"
                      placeholder="Confirme a senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[var(--cyber-cyan)]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="border-[var(--cyber-cyan)] data-[state=checked]:bg-[var(--cyber-cyan)]"
                />
                <div className="text-sm text-gray-300">
                  <label htmlFor="terms" className="cursor-pointer">
                    Eu aceito os{" "}
                    <Link href="/terms">
                      <a className="text-[var(--cyber-cyan)] hover:underline">termos de uso</a>
                    </Link>
                    {" "}e{" "}
                    <Link href="/privacy">
                      <a className="text-[var(--cyber-cyan)] hover:underline">política de privacidade</a>
                    </Link>
                    {" "}do Sistema SOC Defense Universe.
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !acceptTerms}
                className="w-full bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black font-semibold py-3 transition-all"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>CRIANDO CONTA...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>REGISTRAR NO SISTEMA</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-2">
                Já possui uma conta no SOC?
              </p>
              <Link href="/auth/login">
                <a className="text-[var(--cyber-cyan)] hover:text-cyan-400 font-semibold transition-colors">
                  FAZER LOGIN
                </a>
              </Link>
            </div>

            {/* Security Notice */}
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5" />
                <div className="text-xs text-blue-200">
                  <strong>SEGURANÇA:</strong> Todos os dados são criptografados e protegidos por 
                  protocolos de segurança avançados. Sua privacidade é nossa prioridade.
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