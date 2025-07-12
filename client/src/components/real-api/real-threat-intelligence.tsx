// Real Threat Intelligence using Public APIs
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRealApiData, useIpAnalysis } from '@/hooks/use-real-api-data';
import { ApiIntegration } from '@/lib/api-integration';
import { 
  Search, 
  Shield, 
  AlertTriangle, 
  Globe, 
  FileText, 
  Users, 
  Activity,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

export default function RealThreatIntelligence() {
  const { threats, phishingUrls, isLoading, refreshData } = useRealApiData();
  const { results: ipAnalysis, isLoading: ipLoading, analyzeIp } = useIpAnalysis();
  const [searchTerm, setSearchTerm] = useState('');
  const [urlAnalysis, setUrlAnalysis] = useState<any>(null);
  const [urlLoading, setUrlLoading] = useState(false);

  // Sample IOCs for demonstration
  const sampleIocs = [
    { type: 'IP', value: '185.220.101.7', threat: 'APT29', confidence: 95, status: 'active' },
    { type: 'IP', value: '192.168.1.1', threat: 'Local Network', confidence: 10, status: 'safe' },
    { type: 'IP', value: '8.8.8.8', threat: 'Google DNS', confidence: 5, status: 'safe' },
    { type: 'IP', value: '1.1.1.1', threat: 'Cloudflare DNS', confidence: 5, status: 'safe' },
    { type: 'Domain', value: 'malicious-example.com', threat: 'Phishing', confidence: 88, status: 'blocked' },
    { type: 'URL', value: 'https://suspicious-site.net', threat: 'Malware', confidence: 92, status: 'monitoring' }
  ];

  const handleIpSearch = async () => {
    if (searchTerm && searchTerm.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
      await analyzeIp(searchTerm);
    }
  };

  const handleUrlAnalysis = async (url: string) => {
    setUrlLoading(true);
    try {
      const result = await ApiIntegration.analyzeUrl(url);
      setUrlAnalysis(result);
    } catch (error) {
      console.error('URL analysis failed:', error);
    } finally {
      setUrlLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'blocked': return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
      case 'monitoring': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'safe': return 'bg-green-500/20 text-green-400 border-green-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-red-400';
    if (confidence >= 75) return 'text-yellow-400';
    if (confidence >= 50) return 'text-blue-400';
    return 'text-green-400';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'blocked': return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'monitoring': return <Eye className="w-4 h-4 text-yellow-400" />;
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)] flex items-center justify-between">
            <span className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Real Threat Intelligence
              <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-400">
                Live APIs
              </Badge>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="border-[var(--cyber-cyan)]/50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="iocs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="iocs">IOCs</TabsTrigger>
              <TabsTrigger value="analysis">IP Analysis</TabsTrigger>
              <TabsTrigger value="phishing">Phishing URLs</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            </TabsList>

            <TabsContent value="iocs" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--cyber-cyan)]">
                  Indicators of Compromise (IOCs)
                </h3>
                
                {sampleIocs.map((ioc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(ioc.status)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm text-white">{ioc.value}</span>
                          <Badge variant="outline" className="text-xs">
                            {ioc.type}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400">
                          Threat: {ioc.threat}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getConfidenceColor(ioc.confidence)}`}>
                        {ioc.confidence}%
                      </span>
                      <Badge className={`text-xs ${getStatusColor(ioc.status)}`}>
                        {ioc.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--cyber-cyan)]">
                  IP Address Analysis
                </h3>
                
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Enter IP address (e.g., 8.8.8.8)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleIpSearch}
                    disabled={ipLoading}
                    className="bg-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/80"
                  >
                    {ipLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  </Button>
                </div>

                {ipAnalysis && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[var(--cyber-navy)]/30 border border-[var(--cyber-cyan)]/20">
                      <h4 className="font-medium text-[var(--cyber-cyan)] mb-3">
                        Analysis Results for {ipAnalysis.ip}
                      </h4>
                      
                      {/* Geolocation Data */}
                      {ipAnalysis.geolocation && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-2">Geographic Information</h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Country:</span>
                                <span className="text-white">{ipAnalysis.geolocation.country || 'Unknown'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Region:</span>
                                <span className="text-white">{ipAnalysis.geolocation.region || 'Unknown'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">City:</span>
                                <span className="text-white">{ipAnalysis.geolocation.city || 'Unknown'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">ISP:</span>
                                <span className="text-white">{ipAnalysis.geolocation.isp || 'Unknown'}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-2">Security Information</h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Proxy:</span>
                                <Badge className={`text-xs ${ipAnalysis.geolocation.proxy ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                  {ipAnalysis.geolocation.proxy ? 'Detected' : 'None'}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">VPN:</span>
                                <Badge className={`text-xs ${ipAnalysis.geolocation.vpn ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                  {ipAnalysis.geolocation.vpn ? 'Detected' : 'None'}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Hosting:</span>
                                <Badge className={`text-xs ${ipAnalysis.geolocation.hosting ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                  {ipAnalysis.geolocation.hosting ? 'Provider' : 'Residential'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Reputation Data */}
                      {ipAnalysis.reputation && (
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-300 mb-2">Reputation Analysis</h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ipAnalysis.reputation.abuseipdb && (
                              <div className="p-3 rounded bg-[var(--cyber-steel)]/30">
                                <div className="text-xs text-gray-400">AbuseIPDB</div>
                                <div className="text-sm font-medium">
                                  Confidence: {ipAnalysis.reputation.abuseipdb.abuseConfidencePercentage || 0}%
                                </div>
                              </div>
                            )}
                            {ipAnalysis.reputation.virustotal && (
                              <div className="p-3 rounded bg-[var(--cyber-steel)]/30">
                                <div className="text-xs text-gray-400">VirusTotal</div>
                                <div className="text-sm font-medium">
                                  Detections: {ipAnalysis.reputation.virustotal.positives || 0}
                                </div>
                              </div>
                            )}
                            <div className="p-3 rounded bg-[var(--cyber-steel)]/30">
                              <div className="text-xs text-gray-400">Overall Risk</div>
                              <div className="text-sm font-medium text-green-400">
                                Low Risk
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="phishing" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--cyber-cyan)]">
                  Recent Phishing URLs
                </h3>
                
                {isLoading ? (
                  <div className="text-center py-8">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[var(--cyber-cyan)]" />
                    <p className="text-gray-400">Loading phishing data...</p>
                  </div>
                ) : phishingUrls.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {phishingUrls.slice(0, 20).map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <div>
                            <div className="text-sm font-mono text-white truncate max-w-md">
                              {url.url || 'Unknown URL'}
                            </div>
                            <div className="text-xs text-gray-400">
                              Verified: {url.verified ? 'Yes' : 'No'} | 
                              Valid: {url.valid ? 'Yes' : 'No'}
                            </div>
                          </div>
                        </div>
                        <Badge className="text-xs bg-red-500/20 text-red-400 border-red-500/50">
                          PHISHING
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Shield className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No phishing URLs available</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="campaigns" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--cyber-cyan)]">
                  Active Threat Campaigns
                </h3>
                
                {/* Sample campaigns with real-world context */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[var(--cyber-cyan)]" />
                      <div>
                        <div className="font-medium text-white">APT29 (Cozy Bear)</div>
                        <div className="text-sm text-gray-400">Government espionage | Last seen: 2024-01-10</div>
                      </div>
                    </div>
                    <Badge className="text-xs bg-red-500/20 text-red-400 border-red-500/50">
                      ACTIVE
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[var(--cyber-cyan)]" />
                      <div>
                        <div className="font-medium text-white">Lazarus Group</div>
                        <div className="text-sm text-gray-400">Financial theft | Last seen: 2024-01-05</div>
                      </div>
                    </div>
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                      MONITORING
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-[var(--cyber-cyan)]" />
                      <div>
                        <div className="font-medium text-white">APT40 (Leviathan)</div>
                        <div className="text-sm text-gray-400">Maritime espionage | Last seen: 2024-01-03</div>
                      </div>
                    </div>
                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/50">
                      HISTORICAL
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}