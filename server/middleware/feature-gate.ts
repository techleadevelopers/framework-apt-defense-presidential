import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    plan: 'free' | 'pro' | 'plus' | 'enterprise';
    maxAssets: number;
  };
}

const FEATURE_REQUIREMENTS = {
  // Dashboard features - all plans
  'soc-dashboard': ['free', 'pro', 'plus', 'enterprise'],
  'threat-analysis': ['free', 'pro', 'plus', 'enterprise'],
  'basic-gamification': ['free', 'pro', 'plus', 'enterprise'],
  
  // Pro features
  'real-ai-inference': ['pro', 'plus', 'enterprise'],
  'attack-simulations': ['pro', 'plus', 'enterprise'],
  'intermediate-courses': ['pro', 'plus', 'enterprise'],
  'achievements': ['pro', 'plus', 'enterprise'],
  
  // Plus features
  'ai-manual-retrain': ['plus', 'enterprise'],
  'advanced-courses': ['plus', 'enterprise'],
  'certifications': ['plus', 'enterprise'],
  'soar-playbooks': ['plus', 'enterprise'],
  'real-api-integrations': ['plus', 'enterprise'],
  'interactive-dashboard': ['plus', 'enterprise'],
  'compliance-reports': ['plus', 'enterprise'],
  
  // Enterprise features
  'ai-auto-retrain': ['enterprise'],
  'custom-kernels': ['enterprise'],
  'white-label': ['enterprise'],
  'multi-tenant': ['enterprise'],
  'priority-support': ['enterprise'],
  'unlimited-assets': ['enterprise'],
  'custom-missions': ['enterprise'],
  'corporate-lms': ['enterprise']
};

const PLAN_ASSET_LIMITS = {
  free: 3,
  pro: 10,
  plus: 50,
  enterprise: -1 // unlimited
};

export function requireFeature(feature: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    const allowedPlans = FEATURE_REQUIREMENTS[feature] || [];
    const hasAccess = allowedPlans.includes(user.plan);
    
    if (!hasAccess) {
      const requiredPlan = allowedPlans.find(plan => 
        ['pro', 'plus', 'enterprise'].includes(plan)
      ) || 'pro';
      
      return res.status(403).json({
        error: `This feature requires ${requiredPlan} plan or higher`,
        code: 'FEATURE_RESTRICTED',
        feature,
        userPlan: user.plan,
        requiredPlan,
        upgradeUrl: '/plans'
      });
    }

    next();
  };
}

export function checkAssetLimit() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }

    const limit = PLAN_ASSET_LIMITS[user.plan];
    
    if (limit !== -1 && req.body?.assetsCount >= limit) {
      return res.status(403).json({
        error: `Asset limit exceeded. Your ${user.plan} plan allows up to ${limit} assets`,
        code: 'ASSET_LIMIT_EXCEEDED',
        currentLimit: limit,
        userPlan: user.plan,
        upgradeUrl: '/plans'
      });
    }

    next();
  };
}

export function getUserPlanLimits(plan: string) {
  return {
    maxAssets: PLAN_ASSET_LIMITS[plan] || 3,
    features: Object.keys(FEATURE_REQUIREMENTS).filter(feature => 
      FEATURE_REQUIREMENTS[feature].includes(plan)
    )
  };
}