import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Shield, Zap, Crown } from "lucide-react";
import { Link } from "wouter";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para estudantes e primeiros passos",
    icon: Shield,
    popular: false,
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
  {
    id: "pro", 
    name: "Pro",
    price: "R$ 79,90",
    period: "/mês",
    description: "Ideal para pequenas equipes e freelancers",
    icon: Zap,
    popular: false,
    features: [
      "Todos os recursos do Free",
      "10 ativos monitorados", 
      "IA real (TactiCore)",
      "Gamificação com XP e níveis",
      "2 simulações de ataques",
      "Cursos intermediários",
      "Conquistas desbloqueáveis",
      "Suporte por email"
    ],
    limitations: [
      "Sem retreinamento automático",
      "APIs limitadas",
      "Relatórios básicos"
    ]
  },
  {
    id: "plus",
    name: "Plus", 
    price: "R$ 229,90",
    period: "/mês",
    description: "Para startups com time de SOC",
    icon: Star,
    popular: true,
    features: [
      "Todos os recursos do Pro",
      "50 ativos monitorados",
      "IA avançada (TactiCore + Mission Ops)",
      "Retreinamento manual de IA",
      "Simulações completas de APT",
      "Cursos avançados + certificações",
      "SOAR com playbooks básicos",
      "Integração com APIs reais",
      "Dashboard interativo",
      "Suporte prioritário"
    ],
    limitations: [
      "Sem retreinamento automático",
      "Sem customização white-label"
    ]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 2.499+",
    period: "/mês", 
    description: "Para governo, bancos e infraestrutura crítica",
    icon: Crown,
    popular: false,
    features: [
      "Todos os recursos do Plus",
      "Ativos ilimitados",
      "IA com retreinamento automático + SLA",
      "Kernel dinâmico personalizado",
      "Simulações cloud + CTF customizados",
      "LMS corporativo completo",
      "SOAR com orquestração total",
      "Integração prioritária",
      "Relatórios exportáveis",
      "White-label / multi-tenant",
      "Suporte 24/7 + gerente dedicado",
      "Implementação on-premise"
    ],
    limitations: []
  }
];

export default function PlansPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transforme sua equipe em especialistas de SOC Defense com IA real
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={!annual ? "text-white" : "text-gray-400"}>Mensal</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={annual ? "text-white" : "text-gray-400"}>
              Anual <Badge variant="secondary">-20%</Badge>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = annual && plan.id !== "free" 
              ? `R$ ${Math.round(parseFloat(plan.price.replace("R$ ", "").replace("+", "")) * 0.8)}${plan.id === "enterprise" ? "+" : ""}`
              : plan.price;

            return (
              <Card 
                key={plan.id}
                className={`relative bg-gray-800 border-gray-700 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500">
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-green-400">✓ Incluído:</h4>
                    <ul className="space-y-1 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-400">Limitações:</h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-400">×</span>
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>

                <CardFooter>
                  <Link href="/auth/register" className="w-full">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {plan.id === "free" ? "Começar Grátis" : "Escolher Plano"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-gray-300 mb-8">
            Comece gratuitamente e evolua conforme sua necessidade de SOC Defense cresce.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}