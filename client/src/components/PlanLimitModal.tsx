import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Star, Zap, Lock } from "lucide-react";
import { Link } from "wouter";

interface PlanLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: "free" | "pro" | "plus" | "enterprise";
  limitType: "assets" | "feature";
  featureName?: string;
}

const planDetails = {
  free: {
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para estudantes e primeiros passos",
    icon: Lock,
    color: "text-gray-400",
    features: [
      "Acesso ao SOC Dashboard",
      "3 ativos monitorados",
      "IA simulada (TactiCore)",
      "Gamificação limitada",
      "Cursos introdutórios",
      "Comunidade Discord"
    ],
    limitations: [
      "Sem retreinamento de IA",
      "Sem simulações de ataques",
      "Sem certificações",
      "Sem integração APIs reais"
    ]
  },
  pro: {
    name: "Pro",
    price: "R$ 79,90",
    period: "/mês",
    description: "Ideal para pequenas equipes e freelancers",
    icon: Zap,
    color: "text-blue-400",
    features: [
      "Todos os recursos do Free",
      "10 ativos monitorados",
      "IA real (TactiCore)",
      "Gamificação com XP e níveis",
      "2 simulações de ataques",
      "Cursos intermediários"
    ]
  },
  plus: {
    name: "Plus",
    price: "R$ 229,90",
    period: "/mês",
    description: "Para startups com time de SOC",
    icon: Star,
    color: "text-purple-400",
    features: [
      "Todos os recursos do Pro",
      "50 ativos monitorados",
      "IA avançada completa",
      "Simulações completas de APT",
      "Certificações profissionais"
    ]
  },
  enterprise: {
    name: "Enterprise",
    price: "R$ 2.499+",
    period: "/mês",
    description: "Para governo, bancos e infraestrutura crítica",
    icon: Crown,
    color: "text-yellow-400",
    features: [
      "Todos os recursos do Plus",
      "Ativos ilimitados",
      "IA com retreinamento automático",
      "Suporte 24/7",
      "Customização completa"
    ]
  }
};

export default function PlanLimitModal({ isOpen, onClose, currentPlan, limitType, featureName }: PlanLimitModalProps) {
  const currentPlanDetails = planDetails[currentPlan];
  const CurrentIcon = currentPlanDetails.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {limitType === "assets" ? "Limite de Ativos Atingido" : "Recurso Indisponível"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            {limitType === "assets" 
              ? `Seu plano ${currentPlan.toUpperCase()} permite até ${currentPlan === 'free' ? '3' : currentPlan === 'pro' ? '10' : '50'} ativos monitorados`
              : `O recurso "${featureName}" não está disponível no seu plano atual`
            }
          </DialogDescription>
        </DialogHeader>

        {/* Current Plan Card */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Seu Plano Atual:</h3>
          <Card className="bg-gray-800 border-gray-600">
            <CardHeader className="text-center">
              <CurrentIcon className={`w-8 h-8 mx-auto mb-2 ${currentPlanDetails.color}`} />
              <CardTitle className="text-xl">{currentPlanDetails.name}</CardTitle>
              <CardDescription>{currentPlanDetails.description}</CardDescription>
              <div className="mt-2">
                <span className="text-2xl font-bold">{currentPlanDetails.price}</span>
                <span className="text-gray-400">{currentPlanDetails.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2 text-green-400">✓ Incluído:</h4>
                  <ul className="space-y-1 text-sm">
                    {currentPlanDetails.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {currentPlanDetails.limitations && (
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-400">Limitações:</h4>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {currentPlanDetails.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-400">×</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Continuar com Plano Atual
          </Button>
          <Link href="/plans">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Ver Planos de Upgrade
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}