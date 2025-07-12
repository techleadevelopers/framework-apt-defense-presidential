import React, { useState, useEffect } from "react";
import { Clock, Shield, AlertTriangle, CheckCircle, XCircle, MapPin, Activity, Target, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useThreatData } from '@/hooks/use-threat-data';

interface SecurityEvent {
  id: number;
  eventType: string;
  source: string;
  message: string;
  severity: string;
  timestamp: Date;
}

const ActivityFeed: React.FC = () => {
  const { activeThreats, threatStats } = useThreatData();
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  // Convert threat data to security events
  useEffect(() => {
    const latestThreats = activeThreats.slice(-20).reverse(); // Get latest 20 threats
    const securityEvents = latestThreats.map((threat, index) => ({
      id: `${threat.id}_${index}_${Date.now()}`, // Ensure unique IDs with timestamp
      eventType: threat.threatType.toLowerCase().replace(/\s+/g, '_'),
      source: threat.sourceIp,
      message: threat.description,
      severity: threat.severity,
      timestamp: threat.timestamp
    }));
    
    setEvents(securityEvents);
  }, [activeThreats]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[var(--cyber-red)]';
      case 'high': return 'bg-yellow-400';
      case 'medium': return 'bg-[var(--cyber-cyan)]';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getTimeAgo = (timestamp: Date | string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('apt') || eventType.includes('attack')) {
      return <Target className="h-4 w-4 text-red-500" />;
    } else if (eventType.includes('malware') || eventType.includes('ransomware')) {
      return <Shield className="h-4 w-4 text-yellow-500" />;
    } else if (eventType.includes('ddos')) {
      return <Zap className="h-4 w-4 text-orange-500" />;
    } else if (eventType.includes('phishing')) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    } else {
      return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const displayEvents = events.slice(0, 10);

  return (
    <Card className="glass-panel border-[var(--cyber-cyan)]/30">
      <CardHeader>
        <CardTitle className="font-orbitron mt-3 text-[var(--cyber-cyan)] flex items-center">
          <Activity className="w-5 h-5 mr-2 " />
          Live Activity Feed
          <Badge variant="outline" className="ml-2 bg-red-500/20 text-red-400">
            {threatStats.totalThreats} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[800px] overflow-y-auto futuristic-scrollbar">
          {displayEvents.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Loading real-time threat data...</p>
            </div>
          ) : (
            displayEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-3 p-3 rounded-lg bg-[var(--cyber-navy)]/30 hover:bg-[var(--cyber-navy)]/50 transition-colors cursor-pointer"
                onClick={() => {
                  console.log('Event clicked:', event);
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(event.eventType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-white truncate">
                      {event.source}
                    </span>
                    <span className={`inline-block w-2 h-2 rounded-full ${getSeverityColor(event.severity)}`}></span>
                    <span className="text-xs text-gray-400">
                      {getTimeAgo(event.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-2">
                    {event.message}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${
                      event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {event.severity.toUpperCase()}
                    </Badge>
                    
                    <span className="text-xs text-gray-500">
                      {event.eventType.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Real-time stats */}
        <div className="mt-4 pt-3 border-t border-[var(--cyber-cyan)]/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="text-center">
              <div className="text-red-400 font-bold">{threatStats.criticalThreats}</div>
              <div className="text-gray-400">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-orange-400 font-bold">{threatStats.highThreats}</div>
              <div className="text-gray-400">High</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold">{threatStats.mediumThreats}</div>
              <div className="text-gray-400">Medium</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 font-bold">{threatStats.lowThreats}</div>
              <div className="text-gray-400">Low</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;