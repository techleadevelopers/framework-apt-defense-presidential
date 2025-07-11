import { useState, useEffect } from "react";
import { Bell, Settings, User, Search, Terminal, Shield, Activity, Zap, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdvancedTerminal } from "@/components/ui/advanced-terminal";
import { UserProfile } from "@/components/ui/user-profile";
import { NotificationCenter } from "@/components/ui/notification-center";

interface TopBarProps {
  title: string;
}

export default function TopBar({ title }: TopBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [systemStatus, setSystemStatus] = useState({
    threats: 3,
    networkHealth: 98.7,
    aiStatus: "active",
    uptime: "15d 7h 23m"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate real-time system updates
    const statusInterval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        threats: Math.max(0, prev.threats + (Math.random() > 0.8 ? 1 : 0)),
        networkHealth: Math.max(95, Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 0.5))
      }));
    }, 15000);

    return () => clearInterval(statusInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Simulate search functionality
    }
  };

  return (
    <>
      <div className="h-16 bg-[var(--cyber-dark)] border-b border-[var(--cyber-cyan)]/30 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-[var(--cyber-cyan)] font-orbitron">{title}</h1>
          
          {/* Live System Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400 font-mono">{systemStatus.threats}</span>
              <span className="text-xs text-gray-400">threats</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-mono">{systemStatus.networkHealth}%</span>
              <span className="text-xs text-gray-400">health</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-[var(--cyber-cyan)]" />
              <span className="text-xs text-[var(--cyber-cyan)] font-mono">{systemStatus.aiStatus}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Advanced Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search threats, IPs, IOCs, MITRE IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-96 bg-[var(--cyber-navy)]/50 border-[var(--cyber-cyan)]/30 text-white placeholder:text-gray-400 focus:border-[var(--cyber-cyan)]"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--cyber-dark)] border border-[var(--cyber-cyan)]/30 rounded-lg shadow-xl z-50">
                <div className="p-2 space-y-1">
                  <div className="px-3 py-2 hover:bg-[var(--cyber-navy)]/50 rounded cursor-pointer text-sm">
                    <div className="text-white">T1055.002 - Process Injection</div>
                    <div className="text-xs text-gray-400">MITRE ATT&CK Technique</div>
                  </div>
                  <div className="px-3 py-2 hover:bg-[var(--cyber-navy)]/50 rounded cursor-pointer text-sm">
                    <div className="text-white">192.168.1.45</div>
                    <div className="text-xs text-gray-400">Suspicious IP Address</div>
                  </div>
                  <div className="px-3 py-2 hover:bg-[var(--cyber-navy)]/50 rounded cursor-pointer text-sm">
                    <div className="text-white">APT29 Campaign</div>
                    <div className="text-xs text-gray-400">Threat Actor Activity</div>
                  </div>
                </div>
              </div>
            )}
          </form>
          
          {/* System Clock with Uptime */}
          <div className="text-right">
            <div className="text-[var(--cyber-cyan)] font-mono text-sm">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-gray-400">
              Uptime: {systemStatus.uptime}
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10 transition-all duration-200"
              onClick={() => setIsTerminalOpen(true)}
              title="Open Terminal"
            >
              <Terminal className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10 transition-all duration-200 relative"
              onClick={() => setIsNotificationOpen(true)}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {systemStatus.threats > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 border-0">
                  {systemStatus.threats}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10 transition-all duration-200"
              title="System Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)]/10 transition-all duration-200"
              onClick={() => setIsProfileOpen(true)}
              title="User Profile"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[var(--cyber-cyan)] rounded-full flex items-center justify-center text-[var(--cyber-dark)] text-xs font-bold">
                  AM
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </Button>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-mono">LIVE</span>
          </div>
        </div>
      </div>

      {/* Advanced Components */}
      <AdvancedTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        commands={['help', 'scan', 'threat-hunt', 'mitre']}
        outputs={['System ready', 'Connected to SOC database']}
      />
      
      <UserProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
