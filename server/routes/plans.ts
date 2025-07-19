import { Router } from "express";
import { requireFeature, getUserPlanLimits } from "../middleware/feature-gate";

const router = Router();

// Get available plans
router.get("/", async (req, res) => {
  const plans = {
    free: {
      id: "free",
      name: "Free",
      price: 0,
      currency: "BRL",
      period: "mensal",
      description: "Perfeito para estudantes e primeiros passos",
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
      ],
      maxAssets: 3,
      trial: false
    },
    pro: {
      id: "pro",
      name: "Pro",
      price: 79.90,
      currency: "BRL",
      period: "mensal",
      description: "Ideal para pequenas equipes e freelancers",
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
      ],
      maxAssets: 10,
      trial: false
    },
    plus: {
      id: "plus",
      name: "Plus",
      price: 229.90,
      currency: "BRL",
      period: "mensal",
      description: "Para startups com time de SOC",
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
      ],
      maxAssets: 50,
      trial: true,
      trialDays: 14
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      price: 2499,
      currency: "BRL",
      period: "mensal",
      description: "Para governo, bancos e infraestrutura crítica",
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
      limitations: [],
      maxAssets: -1, // unlimited
      trial: false,
      customPricing: true
    }
  };

  res.json(plans);
});

// Get user's current plan details
router.get("/current", requireFeature("soc-dashboard"), async (req, res) => {
  const user = req.user;
  
  if (!user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const planLimits = getUserPlanLimits(user.plan);
  
  res.json({
    currentPlan: user.plan,
    limits: planLimits,
    usage: {
      assetsMonitored: user.assetsCount || 0,
      // Add more usage metrics here
    },
    upgradeAvailable: user.plan !== "enterprise"
  });
});

// Upgrade plan (simulate - would integrate with Stripe)
router.post("/upgrade", requireFeature("soc-dashboard"), async (req, res) => {
  const { targetPlan } = req.body;
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const validPlans = ["free", "pro", "plus", "enterprise"];
  if (!validPlans.includes(targetPlan)) {
    return res.status(400).json({ error: "Invalid plan" });
  }

  // In real implementation, this would:
  // 1. Create Stripe checkout session
  // 2. Handle payment processing
  // 3. Update user plan in database
  // 4. Send confirmation email

  res.json({
    success: true,
    message: `Plan upgrade to ${targetPlan} initiated`,
    checkoutUrl: `/checkout/${targetPlan}`,
    currentPlan: user.plan,
    targetPlan
  });
});

export default router;