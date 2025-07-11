import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Users, Activity, Globe } from "lucide-react";

const iocs = [
  { type: 'IP', value: '185.220.101.7', threat: 'APT29', confidence: 95, status: 'active' },
  { type: 'Domain', value: 'malicious-domain.com', threat: 'Cobalt Strike', confidence: 88, status: 'active' },
  { type: 'Hash', value: 'a1b2c3d4e5f6...', threat: 'Ransomware', confidence: 92, status: 'blocked' },
  { type: 'Email', value: 'phishing@fake.com', threat: 'Phishing', confidence: 89, status: 'monitoring' }
];

const threatActors = [
  { name: 'APT29 (Cozy Bear)', country: 'Russia', activity: 'Government espionage', lastSeen: '2024-01-10' },
  { name: 'APT28 (Fancy Bear)', country: 'Russia', activity: 'Military intelligence', lastSeen: '2024-01-08' },
  { name: 'Lazarus Group', country: 'North Korea', activity: 'Financial theft', lastSeen: '2024-01-05' },
  { name: 'APT40 (Leviathan)', country: 'China', activity: 'Maritime espionage', lastSeen: '2024-01-03' }
];

const campaigns = [
  { name: 'SolarWinds Supply Chain', status: 'Historical', targets: 'Government, Tech', timeline: '2020-2021' },
  { name: 'Microsoft Exchange Zero-Days', status: 'Ongoing', targets: 'Enterprise', timeline: '2023-2024' },
  { name: 'MOVEit Transfer Attacks', status: 'Recent', targets: 'File Transfer Services', timeline: '2023' }
];

export default function ThreatIntelligence() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[var(--cyber-red)]';
      case 'blocked': return 'bg-gray-600';
      case 'monitoring': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-[var(--cyber-red)]';
    if (confidence >= 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardContent className="pt-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search IOCs, threat actors, or campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30"
              />
            </div>
            <Button className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Threat Intelligence Tabs */}
      <Tabs defaultValue="iocs" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--cyber-navy)]">
          <TabsTrigger value="iocs" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <FileText className="w-4 h-4 mr-2" />
            IOCs
          </TabsTrigger>
          <TabsTrigger value="actors" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Users className="w-4 h-4 mr-2" />
            Threat Actors
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Activity className="w-4 h-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="feeds" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Globe className="w-4 h-4 mr-2" />
            Intel Feeds
          </TabsTrigger>
        </TabsList>

        <TabsContent value="iocs" className="space-y-4">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Indicators of Compromise (IOCs)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {iocs.map((ioc, index) => (
                  <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="text-[var(--cyber-cyan)]">
                          {ioc.type}
                        </Badge>
                        <span className="font-mono text-white">{ioc.value}</span>
                      </div>
                      <Badge className={`${getStatusColor(ioc.status)} text-white`}>
                        {ioc.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Threat:</span>
                        <span className="text-white ml-1">{ioc.threat}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Confidence:</span>
                        <span className={`ml-1 font-bold ${getConfidenceColor(ioc.confidence)}`}>
                          {ioc.confidence}%
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Block
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Monitor
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actors" className="space-y-4">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Known Threat Actors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {threatActors.map((actor, index) => (
                  <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{actor.name}</h3>
                      <Badge variant="outline">{actor.country}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-400">Activity:</span>
                        <span className="text-white ml-1">{actor.activity}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Last Seen:</span>
                        <span className="text-[var(--cyber-cyan)] ml-1">{actor.lastSeen}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Attack Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white">{campaign.name}</h3>
                      <Badge className={
                        campaign.status === 'Ongoing' ? 'bg-[var(--cyber-red)]' :
                        campaign.status === 'Recent' ? 'bg-yellow-400' : 'bg-gray-600'
                      }>
                        {campaign.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Targets:</span>
                        <span className="text-white ml-1">{campaign.targets}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-[var(--cyber-cyan)] ml-1">{campaign.timeline}</span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feeds" className="space-y-4">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Intelligence Feeds</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'MISP Feed', status: 'active', lastUpdate: '2 min ago', events: 247 },
                  { name: 'AlienVault OTX', status: 'active', lastUpdate: '5 min ago', events: 156 },
                  { name: 'Threat Connect', status: 'syncing', lastUpdate: '10 min ago', events: 89 },
                  { name: 'VirusTotal', status: 'active', lastUpdate: '1 min ago', events: 334 },
                  { name: 'Shodan', status: 'active', lastUpdate: '3 min ago', events: 78 },
                  { name: 'Custom Feed', status: 'offline', lastUpdate: '2 hours ago', events: 12 }
                ].map((feed, index) => (
                  <div key={index} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{feed.name}</h3>
                      <div className={`w-2 h-2 rounded-full ${
                        feed.status === 'active' ? 'bg-green-400' :
                        feed.status === 'syncing' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={
                          feed.status === 'active' ? 'text-green-400' :
                          feed.status === 'syncing' ? 'text-yellow-400' : 'text-red-400'
                        }>
                          {feed.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Events:</span>
                        <span className="text-[var(--cyber-cyan)]">{feed.events}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Updated:</span>
                        <span className="text-white">{feed.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
