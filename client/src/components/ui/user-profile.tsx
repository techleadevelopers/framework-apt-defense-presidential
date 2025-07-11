import React, { useState } from "react";
import { User, Settings, LogOut, Shield, Award, Clock, Activity, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [user] = useState({
    name: "Alex Martinez",
    role: "Senior SOC Analyst",
    level: 12,
    experience: 2750,
    avatar: "AM",
    status: "online",
    shift: "Night Shift (22:00 - 06:00)",
    lastLogin: "2 minutes ago",
    sessionsToday: 3,
    threatsDetected: 45,
    certificationsEarned: 8
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    soundAlerts: false,
    autoRefresh: true,
    advancedMode: true
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <Card className="w-full max-w-2xl bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
        <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[var(--cyber-cyan)] font-orbitron">User Profile</CardTitle>
            <Button variant="ghost" onClick={onClose}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[var(--cyber-cyan)] rounded-full flex items-center justify-center text-[var(--cyber-dark)] font-bold text-xl">
                  {user.avatar}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.role}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[var(--cyber-navy)]/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-[var(--cyber-cyan)]" />
                    <span className="text-sm text-gray-400">Level</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.level}</div>
                  <div className="text-xs text-gray-400">{user.experience} XP</div>
                </div>

                <div className="bg-[var(--cyber-navy)]/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-[var(--cyber-cyan)]" />
                    <span className="text-sm text-gray-400">Threats Today</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.threatsDetected}</div>
                  <div className="text-xs text-gray-400">+12 from yesterday</div>
                </div>

                <div className="bg-[var(--cyber-navy)]/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-[var(--cyber-cyan)]" />
                    <span className="text-sm text-gray-400">Sessions</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.sessionsToday}</div>
                  <div className="text-xs text-gray-400">Today</div>
                </div>

                <div className="bg-[var(--cyber-navy)]/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-4 h-4 text-[var(--cyber-cyan)]" />
                    <span className="text-sm text-gray-400">Certifications</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{user.certificationsEarned}</div>
                  <div className="text-xs text-gray-400">Earned</div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Recent Achievements</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-[var(--cyber-navy)]/30 rounded-lg">
                    <Badge className="bg-purple-500/20 text-purple-400">Epic</Badge>
                    <span className="text-white">Threat Hunter Expert</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-[var(--cyber-navy)]/30 rounded-lg">
                    <Badge className="bg-blue-500/20 text-blue-400">Rare</Badge>
                    <span className="text-white">MITRE Master</span>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Notifications</span>
                    </div>
                    <Switch
                      checked={preferences.notifications}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, notifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Sound Alerts</span>
                    </div>
                    <Switch
                      checked={preferences.soundAlerts}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, soundAlerts: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Auto Refresh</span>
                    </div>
                    <Switch
                      checked={preferences.autoRefresh}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, autoRefresh: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">Advanced Mode</span>
                    </div>
                    <Switch
                      checked={preferences.advancedMode}
                      onCheckedChange={(checked) => 
                        setPreferences(prev => ({ ...prev, advancedMode: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-400 border-red-400/30">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* Current Session */}
              <div className="bg-[var(--cyber-navy)]/30 p-4 rounded-lg">
                <h5 className="text-sm font-semibold text-white mb-2">Current Session</h5>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>Started: {user.lastLogin}</div>
                  <div>Shift: {user.shift}</div>
                  <div>IP: 192.168.1.100</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}