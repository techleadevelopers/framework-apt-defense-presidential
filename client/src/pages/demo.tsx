import { useState } from "react";
import SOCDashboard from "@/pages/soc-dashboard";
import DemoTimer from "@/components/demo/demo-timer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  Lock,
  CheckCircle,
  Star
} from "lucide-react";

export default function DemoPage() {
  const [demoExpired, setDemoExpired] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleTimeExpired = () => {
    setDemoExpired(true);
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-cyan-300 mb-2">
                Bem-vindo ao Blue Team Ops
              </h1>
              <p className="text-slate-400">
                Experiência Demo - Explore nossa plataforma de cybersegurança
              </p>
            </div>

            <div className="space-y-6">
              {/* Demo Features */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-300 mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  O que você pode explorar no Demo:
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Dashboard SOC com métricas em tempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Centro de Aprendizado com cursos de cybersegurança
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Detecção de ameaças e análise de malware
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Network Scanner e Surveillance System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Simulação de ataques e threat intelligence
                  </li>
                </ul>
              </div>

              {/* Time Limitation */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-300">Limitação de Tempo</span>
                </div>
                <p className="text-sm text-slate-300">
                  O modo demo tem duração de <span className="text-yellow-400 font-semibold">1 minuto</span> para 
                  você experimentar nossas funcionalidades. Para acesso ilimitado e progresso salvo, 
                  <span className="text-cyan-400 font-semibold"> crie sua conta gratuita</span>!
                </p>
              </div>

              {/* Warning */}
              <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <span className="font-semibold text-red-300">Importante</span>
                </div>
                <p className="text-sm text-slate-300">
                  No modo demo, seu progresso <span className="text-red-400 font-semibold">não será salvo</span>. 
                  Para manter seu desenvolvimento e conquistas, você precisa de uma conta registrada.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setShowWelcome(false)}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Iniciar Demo (1 min)
                </Button>
                
                <Link href="/auth/register" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 font-medium py-3 rounded-lg"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    Criar Conta Completa
                  </Button>
                </Link>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <Link href="/auth/login">
                  <Button variant="link" className="text-slate-400 hover:text-cyan-300 text-sm">
                    ← Voltar para o Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (demoExpired) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-6">
            <Lock className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-300 mb-2">Demo Expirado</h1>
            <p className="text-slate-400">
              Para continuar explorando, crie sua conta gratuita.
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/auth/register">
              <Button className="bg-cyan-600 hover:bg-cyan-500">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <DemoTimer onTimeExpired={handleTimeExpired} />
      
      {/* Demo Badge */}
      <div className="fixed top-4 left-4 z-50">
        <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-1">
          🎯 MODO DEMO ATIVO
        </Badge>
      </div>
      
      <SOCDashboard />
    </div>
  );
}