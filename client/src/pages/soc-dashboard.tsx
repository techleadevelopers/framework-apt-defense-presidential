import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import TopBar from "@/components/layout/top-bar";
import MetricsPanel from "@/components/dashboard/metrics-panel";
import AiStatusPanel from "@/components/dashboard/ai-status-panel";
import ThreatMap from "@/components/dashboard/threat-map";
import ActivityFeed from "@/components/dashboard/activity-feed";
import MitreFramework from "@/components/dashboard/mitre-framework";
import ThreatList from "@/components/threats/threat-list";
import NetworkScanner from "@/components/scanner/network-scanner";
import AttackSimulation from "@/components/simulation/attack-simulation";
import ThreatIntelligence from "@/components/intelligence/threat-intelligence";
import MLAnalysis from "@/components/ai/ml-analysis";
import SurveillanceSystem from "@/components/sentinel/surveillance-system";
import LearningCenter from "@/components/learning/learning-center";

export type TabType = 
  | "dashboard" 
  | "threats" 
  | "scanner" 
  | "simulation" 
  | "intelligence" 
  | "ai-analysis" 
  | "sentinel" 
  | "learning";

export default function SOCDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const tabTitles: Record<TabType, string> = {
    dashboard: "Security Operations Center",
    threats: "Threat Detection Center",
    scanner: "Network Scanner",
    simulation: "Attack Simulation",
    intelligence: "Threat Intelligence",
    "ai-analysis": "ML/AI Analysis",
    sentinel: "SENTINEL System",
    learning: "Learning Center"
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <AiStatusPanel />
            <MetricsPanel />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ThreatMap />
              <ActivityFeed />
            </div>
            <MitreFramework />
          </div>
        );
      case "threats":
        return <ThreatList />;
      case "scanner":
        return <NetworkScanner />;
      case "simulation":
        return <AttackSimulation />;
      case "intelligence":
        return <ThreatIntelligence />;
      case "ai-analysis":
        return <MLAnalysis />;
      case "sentinel":
        return <SurveillanceSystem />;
      case "learning":
        return <LearningCenter />;
      default:
        return <div>Tab not implemented</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--cyber-dark)] text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={tabTitles[activeTab]} />
        <div className="flex-1 overflow-auto p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
