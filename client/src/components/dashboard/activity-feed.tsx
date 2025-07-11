import React, { useState, useEffect } from "react";

interface SecurityEvent {
  id: number;
  eventType: string;
  source: string;
  message: string;
  severity: string;
  timestamp: Date;
}

const ActivityFeed: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: 1,
      eventType: "threat_detection",
      source: "192.168.1.45",
      message: "Critical APT29 activity detected",
      severity: "critical",
      timestamp: new Date(Date.now() - 2 * 60000)
    },
    {
      id: 2,
      eventType: "security_alert",
      source: "DESKTOP-ABC123",
      message: "Suspicious PowerShell execution",
      severity: "high",
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 3,
      eventType: "system_update",
      source: "TactiCore Kernel",
      message: "ML model updated successfully",
      severity: "medium",
      timestamp: new Date(Date.now() - 8 * 60000)
    }
  ]);

  // Simulate new events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newEvent: SecurityEvent = {
          id: Date.now(),
          eventType: "threat_detection",
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          message: "Suspicious network activity detected",
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          timestamp: new Date()
        };
        setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const realtimeEvents = events;

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

  const displayEvents = Array.isArray(realtimeEvents) ? realtimeEvents.slice(0, 5) : [];

  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">Activity Feed</h3>
      <div className="space-y-3 h-64 overflow-y-auto">
        {displayEvents.map((event) => (
          <div key={event.id} className="flex items-start space-x-3 p-3 bg-[var(--cyber-dark)]/50 rounded-lg">
            <div className={`w-2 h-2 ${getSeverityColor(event.severity)} rounded-full mt-2 animate-pulse`}></div>
            <div className="flex-1">
              <div className="text-sm text-white">{event.message}</div>
              <div className="text-xs text-gray-400">{event.source} - {getTimeAgo(event.timestamp!)}</div>
            </div>
          </div>
        ))}
        
        {/* Fallback static events if no data */}
        {displayEvents.length === 0 && (
          <>
            <div className="flex items-start space-x-3 p-3 bg-[var(--cyber-dark)]/50 rounded-lg">
              <div className="w-2 h-2 bg-[var(--cyber-red)] rounded-full mt-2 animate-pulse"></div>
              <div className="flex-1">
                <div className="text-sm text-white">Critical APT29 activity detected</div>
                <div className="text-xs text-gray-400">192.168.1.45 - 2 minutes ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-[var(--cyber-dark)]/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-white">Suspicious PowerShell execution</div>
                <div className="text-xs text-gray-400">DESKTOP-ABC123 - 5 minutes ago</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-[var(--cyber-dark)]/50 rounded-lg">
              <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-sm text-white">ML model updated successfully</div>
                <div className="text-xs text-gray-400">TactiCore Kernel - 8 minutes ago</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
