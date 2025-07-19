import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  plan: 'free' | 'pro' | 'plus' | 'enterprise';
  maxAssets: number;
  planStartDate: string;
  planEndDate?: string;
  trialUsed: boolean;
}

export function useUserPlan() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Try to get user from localStorage first
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Verify with server
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // Clear invalid user data
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUserPlan = (newPlan: User['plan']) => {
    if (user) {
      const updatedUser = { ...user, plan: newPlan };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/plans';
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    updateUserPlan,
    logout
  };
}

export function getAssetLimit(plan: string): number {
  const limits = {
    free: 3,
    pro: 10,
    plus: 50,
    enterprise: -1 // unlimited
  };
  return limits[plan] || 3;
}

export function getPlanFeatures(plan: string): string[] {
  const features = {
    free: [
      'soc-dashboard',
      'threat-analysis', 
      'basic-gamification'
    ],
    pro: [
      'soc-dashboard',
      'threat-analysis',
      'basic-gamification',
      'real-ai-inference',
      'attack-simulations',
      'intermediate-courses',
      'achievements'
    ],
    plus: [
      'soc-dashboard',
      'threat-analysis',
      'basic-gamification',
      'real-ai-inference',
      'attack-simulations',
      'intermediate-courses',
      'achievements',
      'ai-manual-retrain',
      'advanced-courses',
      'certifications',
      'soar-playbooks',
      'real-api-integrations',
      'interactive-dashboard',
      'compliance-reports'
    ],
    enterprise: [
      'soc-dashboard',
      'threat-analysis',
      'basic-gamification',
      'real-ai-inference',
      'attack-simulations',
      'intermediate-courses',
      'achievements',
      'ai-manual-retrain',
      'advanced-courses',
      'certifications',
      'soar-playbooks',
      'real-api-integrations',
      'interactive-dashboard',
      'compliance-reports',
      'ai-auto-retrain',
      'custom-kernels',
      'white-label',
      'multi-tenant',
      'priority-support',
      'unlimited-assets',
      'custom-missions',
      'corporate-lms'
    ]
  };
  
  return features[plan] || features.free;
}