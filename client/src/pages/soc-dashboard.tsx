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
import EnterpriseNetworkScanner from "@/components/scanner/enterprise-network-scanner";
import RealNetworkScanner from "@/components/real-api/real-network-scanner";
import AttackSimulation from "@/components/simulation/attack-simulation";
import ThreatIntelligence from "@/components/intelligence/threat-intelligence";
import RealThreatIntelligence from "@/components/real-api/real-threat-intelligence";
import MLAnalysis from "@/components/ai/ml-analysis";
import SurveillanceSystem from "@/components/sentinel/surveillance-system";
import LearningCenter from "@/components/learning/learning-center";
import ApiStatusPanel from "@/components/real-api/api-status-panel";
import VulnerabilityMonitor from "@/components/real-api/vulnerability-monitor";
import EnhancedThreatMap from "@/components/real-api/enhanced-threat-map";
import UserManual from "@/components/manual/user-manual";
import InteractiveRuleTesting from "@/components/testing/interactive-rule-testing";
import IncidentManagement from "@/components/incidents/incident-management";
import VulnerabilityManagement from "@/components/vulnerabilities/vulnerability-management";
import AssetManagement from "@/components/assets/asset-management";
import SOARAutomation from "@/components/automation/soar-automation";
import ComplianceReporting from "@/components/compliance/compliance-reporting";
import IntelligentHudGuide from "@/components/ui/intelligent-hud-guide";
import { useRealApiData } from "@/hooks/use-real-api-data";

export type TabType = 
  | "dashboard" 
  | "threats" 
  | "scanner" 
  | "simulation" 
  | "intelligence" 
  | "ai-analysis" 
  | "sentinel" 
  | "learning"
  | "real-api"
  | "manual"
  | "incidents"
  | "vulnerabilities"
  | "assets"
  | "automation"
  | "compliance";

export default function SOCDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const { refreshData, isLoading } = useRealApiData();

  const tabTitles: Record<TabType, string> = {
    dashboard: "Security Operations Center",
    threats: "Threat Detection Center",
    scanner: "Enterprise Network Scanner",
    simulation: "Attack Simulation",
    intelligence: "Threat Intelligence",
    "ai-analysis": "ML/AI Analysis",
    sentinel: "SENTINEL System",
    learning: "Learning Center",
    "real-api": "Real API Integration",
    manual: "Manual do Usuário",
    incidents: "Incident Response & Case Management",
    vulnerabilities: "Vulnerability Management",
    assets: "Asset Management & Inventory",
    automation: "SOAR - Security Automation",
    compliance: "Reporting & Compliance"
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="ai-status-panel">
              <AiStatusPanel />
            </div>
            <div className="metrics-panel">
              <MetricsPanel />
            </div>
            <div className="threat-map">
              <ThreatMap />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="activity-feed">
                <ActivityFeed />
              </div>
              <ApiStatusPanel onRefreshApis={refreshData} isRefreshing={isLoading} />
            </div>
            <div className="mitre-framework">
              <MitreFramework />
            </div>
            <IntelligentHudGuide 
              guideId="soc-dashboard" 
              autoStart={true}
              showOnlyOnce={true}
            />
          </div>
        );
      case "threats":
        return (
          <>
            <ThreatList />
            <IntelligentHudGuide 
              guideId="threat-detection" 
              autoStart={true}
              showOnlyOnce={true}
            />
          </>
        );
      case "scanner":
        return (
          <>
            <EnterpriseNetworkScanner />
            <IntelligentHudGuide 
              guideId="network-scanner" 
              autoStart={true}
              showOnlyOnce={true}
            />
          </>
        );
      case "simulation":
        return <AttackSimulation />;
      case "intelligence":
        return <ThreatIntelligence />;
      case "ai-analysis":
        return <MLAnalysis />;
      case "sentinel":
        return <SurveillanceSystem />;
      case "learning":
        return (
          <>
            <LearningCenter />
            <IntelligentHudGuide 
              guideId="learning-center" 
              autoStart={true}
              showOnlyOnce={true}
            />
          </>
        );
      case "real-api":
        return (
          <div className="space-y-6">
            <ApiStatusPanel onRefreshApis={refreshData} isRefreshing={isLoading} />
            <VulnerabilityMonitor />
            <RealThreatIntelligence />
            <RealNetworkScanner />
          </div>
        );
      case "manual":
        return <UserManual />;
      case "incidents":
        return <IncidentManagement />;
      case "vulnerabilities":
        return <VulnerabilityManagement />;
      case "assets":
        return <AssetManagement />;
      case "automation":
        return <SOARAutomation />;
      case "compliance":
        return <ComplianceReporting />;
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
