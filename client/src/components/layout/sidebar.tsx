import { Shield, Gauge, AlertTriangle, Network, Play, Brain, Bot, Eye, GraduationCap } from "lucide-react";
import { TabType } from "@/pages/soc-dashboard";

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const navigationItems = [
  { id: "dashboard" as TabType, label: "Dashboard", icon: Gauge },
  { id: "threats" as TabType, label: "Threat Detection", icon: AlertTriangle },
  { id: "scanner" as TabType, label: "Network Scanner", icon: Network },
  { id: "simulation" as TabType, label: "Attack Simulation", icon: Play },
  { id: "intelligence" as TabType, label: "Threat Intelligence", icon: Brain },
  { id: "ai-analysis" as TabType, label: "ML/AI Analysis", icon: Bot },
  { id: "sentinel" as TabType, label: "SENTINEL System", icon: Eye },
  { id: "learning" as TabType, label: "Learning Center", icon: GraduationCap },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="w-64 bg-[var(--cyber-navy)] border-r border-[var(--cyber-cyan)]/30 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-[var(--cyber-cyan)]/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[var(--cyber-cyan)] rounded-lg flex items-center justify-center">
            <Shield className="text-[var(--cyber-dark)] text-xl" />
          </div>
          <div>
            <h1 className="font-orbitron font-bold text-lg text-[var(--cyber-cyan)]">APT Defense</h1>
            <p className="text-xs text-gray-400">Universe SOC</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)] border border-[var(--cyber-cyan)]/30"
                  : "hover:bg-[var(--cyber-steel)]/50 text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-[var(--cyber-cyan)]/30">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">System Status</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">AI Kernel</span>
            <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Threats</span>
            <span className="text-xs text-[var(--cyber-red)]">3 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
