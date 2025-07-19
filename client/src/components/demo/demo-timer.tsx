import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Clock, 
  Shield, 
  Zap, 
  Star, 
  Trophy, 
  Rocket,
  CheckCircle,
  Lock,
  Crown
} from "lucide-react";

interface DemoTimerProps {
  onTimeExpired: () => void;
}

export default function DemoTimer({ onTimeExpired }: DemoTimerProps) {
  const [timeLeft, setTimeLeft] = useState(60); // 1 minuto em segundos
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        setProgress((newTime / 60) * 100);
        
        if (newTime <= 0) {
          clearInterval(timer);
          setShowModal(true);
          onTimeExpired();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 30) return "text-green-400";
    if (timeLeft > 10) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <>
      {/* Timer Display */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-cyan-400" />
            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
              MODO DEMO
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">Tempo restante:</span>
            <span className={`font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-1 mt-2" 
          />
        </div>
      </div>

      {/* Upgrade Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl bg-slate-900 border-cyan-500/30 text-white">
          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-cyan-300">
              🚀 Tempo de Demo Expirado!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-lg text-slate-300 mb-4">
                Você experimentou apenas uma pequena parte do <span className="text-cyan-400 font-semibold">SOC Defense Universe</span>!
              </p>
              <p className="text-slate-400">
                Crie sua conta gratuita e tenha acesso completo a todas as funcionalidades avançadas.
              </p>
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Recursos Premium
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Progresso salvo automaticamente
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    6+ cursos completos de cybersegurança
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Sistema de conquistas e certificações
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Análise de ameaças em tempo real
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Ferramentas SOC
                </h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Network Scanner Enterprise
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    SENTINEL Surveillance System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Threat Intelligence feeds
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    ML/AI Analysis Tools
                  </li>
                </ul>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-cyan-400">15+</div>
                  <div className="text-xs text-slate-400">Cursos Avançados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">50+</div>
                  <div className="text-xs text-slate-400">Módulos Práticos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-slate-400">Gratuito</div>
                </div>
              </div>
            </div>

            {/* Urgency Message */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg p-4 border border-cyan-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold text-cyan-300">Oferta Especial</span>
              </div>
              <p className="text-sm text-slate-300">
                Junte-se a mais de <span className="text-cyan-400 font-semibold">10.000+ profissionais</span> que já 
                estão desenvolvendo suas habilidades em cybersegurança com nossa plataforma!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/register" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25">
                  <Trophy className="h-5 w-5 mr-2" />
                  Criar Conta Gratuita
                </Button>
              </Link>
              
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 font-medium py-3 rounded-lg">
                  <Lock className="h-5 w-5 mr-2" />
                  Já tenho conta
                </Button>
              </Link>
            </div>

            {/* Footer Message */}
            <div className="text-center text-xs text-slate-400">
              <p>
                💡 <span className="text-cyan-400">Dica:</span> Usuários cadastrados começam com progresso zerado 
                e podem acompanhar seu desenvolvimento completo!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}