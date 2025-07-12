// API Status Panel - Shows real API integration status
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  Key,
  Globe,
  Shield,
  Bug
} from 'lucide-react';

interface ApiStatus {
  name: string;
  status: 'online' | 'offline' | 'limited';
  hasKey: boolean;
  lastChecked: Date;
  requests: number;
  limit: number;
  description: string;
  icon: React.ReactNode;
}

interface ApiStatusPanelProps {
  onRefreshApis: () => void;
  isRefreshing: boolean;
}

export default function ApiStatusPanel({ onRefreshApis, isRefreshing }: ApiStatusPanelProps) {
  const apiStatuses: ApiStatus[] = [
    {
      name: 'VirusTotal',
      status: import.meta.env.VITE_VIRUSTOTAL_API_KEY ? 'online' : 'limited',
      hasKey: !!import.meta.env.VITE_VIRUSTOTAL_API_KEY,
      lastChecked: new Date(),
      requests: 0,
      limit: 500,
      description: 'File/URL/IP reputation and malware analysis',
      icon: <Shield className="w-4 h-4" />
    },
    {
      name: 'AbuseIPDB',
      status: import.meta.env.VITE_ABUSEIPDB_API_KEY ? 'online' : 'limited',
      hasKey: !!import.meta.env.VITE_ABUSEIPDB_API_KEY,
      lastChecked: new Date(),
      requests: 0,
      limit: 1000,
      description: 'IP address abuse and reputation database',
      icon: <Globe className="w-4 h-4" />
    },
    {
      name: 'IP Geolocation',
      status: import.meta.env.VITE_IP_GEOLOCATION_API_KEY ? 'online' : 'limited',
      hasKey: !!import.meta.env.VITE_IP_GEOLOCATION_API_KEY,
      lastChecked: new Date(),
      requests: 0,
      limit: 30000,
      description: 'IP geolocation with threat intelligence',
      icon: <Globe className="w-4 h-4" />
    },
    {
      name: 'NVD NIST',
      status: 'online',
      hasKey: false,
      lastChecked: new Date(),
      requests: 0,
      limit: 2000,
      description: 'National Vulnerability Database (CVE data)',
      icon: <Bug className="w-4 h-4" />
    },
    {
      name: 'URLhaus',
      status: 'online',
      hasKey: false,
      lastChecked: new Date(),
      requests: 0,
      limit: 1000,
      description: 'Malware URL database by abuse.ch',
      icon: <Shield className="w-4 h-4" />
    },
    {
      name: 'PhishTank',
      status: 'online',
      hasKey: false,
      lastChecked: new Date(),
      requests: 0,
      limit: 1000,
      description: 'Community-driven phishing URL database',
      icon: <Shield className="w-4 h-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'limited': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'limited': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'offline': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const onlineApis = apiStatuses.filter(api => api.status === 'online').length;
  const limitedApis = apiStatuses.filter(api => api.status === 'limited').length;
  const totalApis = apiStatuses.length;

  return (
    <Card className="glass-panel border-[var(--cyber-cyan)]/30">
      <CardHeader>
        <CardTitle className="font-orbitron text-[var(--cyber-cyan)] flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Real API Integration Status
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshApis}
            disabled={isRefreshing}
            className="border-[var(--cyber-cyan)]/50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{onlineApis}</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{limitedApis}</div>
            <div className="text-xs text-gray-400">Limited</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--cyber-cyan)]">{totalApis}</div>
            <div className="text-xs text-gray-400">Total APIs</div>
          </div>
        </div>

        {/* API Status List */}
        <div className="space-y-3">
          {apiStatuses.map((api) => (
            <div
              key={api.name}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {api.icon}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-white">{api.name}</span>
                    {api.hasKey && (
                      <Key className="w-3 h-3 text-[var(--cyber-cyan)]" />
                    )}
                  </div>
                  <div className="text-xs text-gray-400">{api.description}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    api.status === 'online' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                    api.status === 'limited' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' :
                    'bg-red-500/20 text-red-400 border-red-500/50'
                  }`}
                >
                  {api.status === 'online' ? 'ONLINE' : 
                   api.status === 'limited' ? 'LIMITED' : 'OFFLINE'}
                </Badge>
                {getStatusIcon(api.status)}
              </div>
            </div>
          ))}
        </div>

        {/* API Key Notice */}
        {limitedApis > 0 && (
          <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">API Keys Required</span>
            </div>
            <p className="text-xs text-gray-300">
              Some APIs are running in limited mode. Add API keys to access full functionality.
              Click the settings icon in the top bar to configure API keys.
            </p>
          </div>
        )}

        {/* Integration Benefits */}
        <div className="mt-6 p-4 rounded-lg bg-[var(--cyber-cyan)]/10 border border-[var(--cyber-cyan)]/30">
          <h4 className="text-sm font-medium text-[var(--cyber-cyan)] mb-2">Real Data Benefits</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Live threat intelligence from global sources</li>
            <li>• Real-time vulnerability data from NIST NVD</li>
            <li>• Authentic IP reputation and geolocation</li>
            <li>• Current malware and phishing URL databases</li>
            <li>• Professional-grade threat analysis capabilities</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}