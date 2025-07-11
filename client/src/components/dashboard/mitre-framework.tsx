import { DoorOpen, Cog, Shield, UserX, EyeOff, Fingerprint, Search } from "lucide-react";

const mitreCategories = [
  { name: "Initial Access", icon: DoorOpen, percentage: 78, color: "var(--cyber-red)" },
  { name: "Execution", icon: Cog, percentage: 65, color: "rgb(251, 191, 36)" },
  { name: "Persistence", icon: Shield, percentage: 92, color: "rgb(34, 197, 94)" },
  { name: "Privilege Esc", icon: UserX, percentage: 88, color: "var(--cyber-cyan)" },
  { name: "Defense Evasion", icon: EyeOff, percentage: 73, color: "rgb(168, 85, 247)" },
  { name: "Credential Access", icon: Fingerprint, percentage: 95, color: "rgb(249, 115, 22)" },
  { name: "Discovery", icon: Search, percentage: 82, color: "rgb(236, 72, 153)" },
];

export default function MitreFramework() {
  return (
    <div className="glass-panel rounded-xl p-6">
      <h3 className="font-orbitron text-lg text-[var(--cyber-cyan)] mb-4">MITRE ATT&CK Framework Coverage</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {mitreCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.name} className="text-center">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-2 border"
                style={{ 
                  backgroundColor: `${category.color}20`, 
                  borderColor: `${category.color}30` 
                }}
              >
                <Icon style={{ color: category.color }} className="w-6 h-6" />
              </div>
              <div className="text-xs text-gray-400">{category.name}</div>
              <div className="text-sm font-bold" style={{ color: category.color }}>
                {category.percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
