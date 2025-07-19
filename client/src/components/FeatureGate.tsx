import { ReactNode, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Crown, Zap, Star } from "lucide-react";
import { Link } from "wouter";
import PlanLimitModal from "./PlanLimitModal";

interface FeatureGateProps {
  feature: string;
  userPlan: "free" | "pro" | "plus" | "enterprise";
  children: ReactNode;
  fallback?: ReactNode;
}

const FEATURE_REQUIREMENTS = {
  // Dashboard features
  "soc-dashboard": ["free", "pro", "plus", "enterprise"],
  "threat-analysis": ["free", "pro", "plus", "enterprise"],
  "basic-gamification": ["free", "pro", "plus", "enterprise"],
  
  // Pro features
  "real-ai-inference": ["pro", "plus", "enterprise"],
  "attack-simulations": ["pro", "plus", "enterprise"],
  "intermediate-courses": ["pro", "plus", "enterprise"],
  "achievements": ["pro", "plus", "enterprise"],
  
  // Plus features
  "ai-manual-retrain": ["plus", "enterprise"],
  "advanced-courses": ["plus", "enterprise"],
  "certifications": ["plus", "enterprise"],
  "soar-playbooks": ["plus", "enterprise"],
  "real-api-integrations": ["plus", "enterprise"],
  "interactive-dashboard": ["plus", "enterprise"],
  "compliance-reports": ["plus", "enterprise"],
  
  // Enterprise features
  "ai-auto-retrain": ["enterprise"],
  "custom-kernels": ["enterprise"],
  "white-label": ["enterprise"],
  "multi-tenant": ["enterprise"],
  "priority-support": ["enterprise"],
  "unlimited-assets": ["enterprise"],
  "custom-missions": ["enterprise"],
  "corporate-lms": ["enterprise"]
};

const PLAN_ICONS = {
  pro: Zap,
  plus: Star,
  enterprise: Crown
};

const PLAN_COLORS = {
  pro: "text-blue-500",
  plus: "text-purple-500", 
  enterprise: "text-yellow-500"
};

export default function FeatureGate({ feature, userPlan, children, fallback }: FeatureGateProps) {
  const [showModal, setShowModal] = useState(false);
  const allowedPlans = FEATURE_REQUIREMENTS[feature] || [];
  const hasAccess = allowedPlans.includes(userPlan);
  
  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Show modal instead of inline blocking
  const handleFeatureClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleFeatureClick}>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded">
          <Lock className="w-8 h-8 text-gray-300" />
        </div>
      </div>
      
      <PlanLimitModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        currentPlan={userPlan}
        limitType="feature"
        featureName={feature}
      />
    </>
  );
}

// Helper hook for checking feature access
export function useFeatureAccess(feature: string, userPlan: string) {
  const allowedPlans = FEATURE_REQUIREMENTS[feature] || [];
  return allowedPlans.includes(userPlan);
}

// Component for inline feature restrictions  
export function FeatureRestriction({ feature, userPlan, children }: Omit<FeatureGateProps, 'fallback'>) {
  const hasAccess = useFeatureAccess(feature, userPlan);
  
  if (!hasAccess) {
    return null;
  }
  
  return <>{children}</>;
}