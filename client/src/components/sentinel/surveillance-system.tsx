import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Eye, 
  Camera, 
  Monitor, 
  Activity, 
  MapPin, 
  AlertTriangle, 
  Users, 
  Lock,
  Zap,
  Shield,
  Settings,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

interface SurveillanceCamera {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  feed: string;
  alerts: number;
  aiEnabled: boolean;
}

interface SecurityAlert {
  id: string;
  camera: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  description: string;
  confidence: number;
}

const videoSources = [
  "https://mattcannon.games/codepen/glitches/cam1.mp4",
  "https://mattcannon.games/codepen/glitches/cam2.mp4", 
  "https://mattcannon.games/codepen/glitches/cam3.mp4",
  "https://mattcannon.games/codepen/glitches/cam4.mp4",
  "https://mattcannon.games/codepen/glitches/cam5.mp4",
  "https://mattcannon.games/codepen/glitches/cam6.mp4"
];

const mockCameras: SurveillanceCamera[] = [
  { id: 'cam-001', name: 'Main Entrance', location: 'Building A - Lobby', status: 'online', feed: videoSources[0], alerts: 2, aiEnabled: true },
  { id: 'cam-002', name: 'Server Room', location: 'Building A - Floor 2', status: 'online', feed: videoSources[1], alerts: 0, aiEnabled: true },
  { id: 'cam-003', name: 'Parking Garage', location: 'Underground Level 1', status: 'offline', feed: videoSources[2], alerts: 1, aiEnabled: false },
  { id: 'cam-004', name: 'Emergency Exit', location: 'Building B - Floor 1', status: 'online', feed: videoSources[3], alerts: 0, aiEnabled: true },
  { id: 'cam-005', name: 'Loading Dock', location: 'Building C - Ground Floor', status: 'maintenance', feed: videoSources[4], alerts: 3, aiEnabled: true },
  { id: 'cam-006', name: 'Reception Area', location: 'Building A - Floor 1', status: 'online', feed: videoSources[5], alerts: 1, aiEnabled: true }
];

const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    camera: 'Main Entrance',
    type: 'Unauthorized Access',
    severity: 'critical',
    timestamp: new Date(Date.now() - 5 * 60000),
    description: 'Person attempting to access restricted area without credentials',
    confidence: 94
  },
  {
    id: '2',
    camera: 'Loading Dock',
    type: 'Suspicious Activity',
    severity: 'high',
    timestamp: new Date(Date.now() - 12 * 60000),
    description: 'Individual loitering in unauthorized area for extended period',
    confidence: 87
  },
  {
    id: '3',
    camera: 'Parking Garage',
    type: 'Motion Detection',
    severity: 'medium',
    timestamp: new Date(Date.now() - 18 * 60000),
    description: 'Unexpected movement detected in secured area',
    confidence: 76
  }
];

export default function SurveillanceSystem() {
  const [selectedCamera, setSelectedCamera] = useState<string>("cam-001");
  const [alertFilter, setAlertFilter] = useState<string>("all");
  const [isRecording, setIsRecording] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'sentinel'>('grid');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [uptime] = useState("23:14:58");
  const [systemLogs, setSystemLogs] = useState([
    "SECURITY SYSTEM INITIALIZED",
    "CONNECTED TO MAIN SERVER",
    "WARNING: UNAUTHORIZED ACCESS ATTEMPTS DETECTED", 
    "SYSTEM INTEGRITY: 68%",
    "APPLYING SECURITY PROTOCOLS..."
  ]);
  const [gridLayout, setGridLayout] = useState("three-per-row");
  const [isColorMode, setIsColorMode] = useState(false);

  const sentinelCameras = [
    { id: "camera1", name: "CAM_01", location: "MAIN ENTRANCE", status: "LIVE", isOffline: false },
    { id: "camera2", name: "CAM_02", location: "RECEPTION", status: "LIVE", isOffline: false },
    { id: "camera3", name: "CAM_03", location: "HALLWAY", status: "OFFLINE", isOffline: true },
    { id: "camera4", name: "CAM_04", location: "SERVER ROOM", status: "LIVE", isOffline: false },
    { id: "camera5", name: "CAM_05", location: "PARKING", status: "OFFLINE", isOffline: true },
    { id: "camera6", name: "CAM_06", location: "LOBBY", status: "LIVE", isOffline: false }
  ];

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const logInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newLog = generateRandomLog();
        setSystemLogs(prev => [newLog, ...prev.slice(0, 9)]);
      }
    }, 15000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(logInterval);
    };
  }, []);

  const generateRandomLog = () => {
    const logs = [
      "SCANNING PERIMETER...",
      "FACIAL RECOGNITION ACTIVE", 
      "MOTION DETECTED IN SECTOR 7",
      "BACKUP SYSTEMS ONLINE",
      "ENCRYPTION LAYER COMPROMISED",
      "REROUTING THROUGH BACKUP SERVERS",
      "ANOMALY DETECTED IN CAM_03",
      "SYSTEM HEALTH: DEGRADED"
    ];
    return `> [${currentTime.toLocaleTimeString()}] ${logs[Math.floor(Math.random() * logs.length)]}`;
  };

  const toggleGridLayout = () => {
    const layouts = ["three-per-row", "two-per-row", "single-column"];
    const currentIndex = layouts.indexOf(gridLayout);
    const nextIndex = (currentIndex + 1) % layouts.length;
    setGridLayout(layouts[nextIndex]);
  };

  const resetSystem = () => {
    setSystemLogs([
      "SYSTEM RESET INITIATED",
      "RELOADING CAMERA FEEDS...",
      "RECONNECTING TO SERVERS...",
      "SYSTEM ONLINE"
    ]);
  };

  const triggerGlitch = () => {
    const randomCamera = Math.floor(Math.random() * 6) + 1;
    const cameraElement = document.getElementById(`camera${randomCamera}`);
    if (cameraElement) {
      cameraElement.style.animation = "glitch-anim-1 0.5s ease-in-out";
      setTimeout(() => {
        cameraElement.style.animation = "";
      }, 500);
    }
  };

  const toggleFilter = () => {
    setIsColorMode(!isColorMode);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'maintenance': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'offline': return 'bg-red-400';
      case 'maintenance': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-[var(--cyber-red)]';
      case 'high': return 'bg-yellow-400';
      case 'medium': return 'bg-orange-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const diffMs = Date.now() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  };

  const selectedCameraData = mockCameras.find(cam => cam.id === selectedCamera);

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Camera className="w-5 h-5" />
              <span>Active Cameras</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">
              {mockCameras.filter(cam => cam.status === 'online').length}
            </div>
            <div className="text-sm text-gray-400">of {mockCameras.length} total</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <AlertTriangle className="w-5 h-5" />
              <span>Active Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[var(--cyber-red)] mb-1">
              {mockAlerts.length}
            </div>
            <div className="text-sm text-gray-400">Requires attention</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Eye className="w-5 h-5" />
              <span>AI Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">97.2%</div>
            <div className="text-sm text-gray-400">Detection accuracy</div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-[var(--cyber-cyan)]/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-[var(--cyber-cyan)]">
              <Users className="w-5 h-5" />
              <span>Personnel Tracked</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-1">247</div>
            <div className="text-sm text-gray-400">Currently on premises</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Surveillance Interface */}
      <Tabs defaultValue="live-feed" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[var(--cyber-navy)]">
          <TabsTrigger value="live-feed" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Monitor className="w-4 h-4 mr-2" />
            Live Feed
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Security Alerts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Activity className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="management" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Settings className="w-4 h-4 mr-2" />
            Management
          </TabsTrigger>
          <TabsTrigger value="sentinel" className="data-[state=active]:bg-[var(--cyber-cyan)] data-[state=active]:text-[var(--cyber-dark)]">
            <Shield className="w-4 h-4 mr-2" />
            SENTINEL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live-feed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Camera Selection */}
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Camera Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCameras.map((camera) => (
                    <div 
                      key={camera.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedCamera === camera.id 
                          ? 'bg-[var(--cyber-cyan)]/20 border border-[var(--cyber-cyan)]/30' 
                          : 'bg-[var(--cyber-dark)]/30 hover:bg-[var(--cyber-dark)]/50'
                      }`}
                      onClick={() => setSelectedCamera(camera.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white text-sm">{camera.name}</span>
                        <div className="flex items-center space-x-2">
                          {camera.aiEnabled && <Zap className="w-3 h-3 text-[var(--cyber-cyan)]" />}
                          <div className={`w-2 h-2 rounded-full ${getStatusBg(camera.status)}`}></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{camera.location}</div>
                      {camera.alerts > 0 && (
                        <Badge className="bg-[var(--cyber-red)] text-white text-xs mt-1">
                          {camera.alerts} alert{camera.alerts > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Video Feed */}
            <div className="lg:col-span-2">
              <Card className="glass-panel border-[var(--cyber-cyan)]/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">
                      {selectedCameraData?.name || 'Camera Feed'}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusBg(selectedCameraData?.status || 'offline')} text-white`}>
                        {selectedCameraData?.status || 'offline'}
                      </Badge>
                      {selectedCameraData?.aiEnabled && (
                        <Badge className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)]">
                          AI Enabled
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Video Feed Simulation */}
                  <div className="relative bg-[var(--cyber-dark)] rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyber-blue)]/20 to-[var(--cyber-dark)]"></div>
                    
                    {/* Simulated Video Feed */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-[var(--cyber-cyan)] mx-auto mb-4" />
                        <p className="text-[var(--cyber-cyan)] font-medium">Live Feed: {selectedCameraData?.name}</p>
                        <p className="text-gray-400 text-sm mt-1">{selectedCameraData?.location}</p>
                      </div>
                    </div>

                    {/* AI Analysis Overlay */}
                    {selectedCameraData?.aiEnabled && (
                      <>
                        <div className="absolute top-4 left-4 bg-[var(--cyber-cyan)]/20 backdrop-blur-sm rounded-lg p-2">
                          <div className="flex items-center space-x-2 text-xs">
                            <Eye className="w-3 h-3 text-[var(--cyber-cyan)]" />
                            <span className="text-[var(--cyber-cyan)]">AI Analysis Active</span>
                          </div>
                        </div>

                        {/* Simulated Detection Boxes */}
                        <div className="absolute top-1/3 left-1/4 w-16 h-20 border-2 border-[var(--cyber-cyan)] rounded">
                          <div className="absolute -top-6 left-0 bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] text-xs px-1 rounded">
                            Person (97%)
                          </div>
                        </div>
                        
                        <div className="absolute top-1/2 right-1/3 w-12 h-16 border-2 border-green-400 rounded">
                          <div className="absolute -top-6 left-0 bg-green-400 text-[var(--cyber-dark)] text-xs px-1 rounded">
                            Staff (89%)
                          </div>
                        </div>
                      </>
                    )}

                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-[var(--cyber-red)]/20 backdrop-blur-sm rounded-lg p-2">
                        <div className="w-2 h-2 bg-[var(--cyber-red)] rounded-full animate-pulse"></div>
                        <span className="text-[var(--cyber-red)] text-xs">REC</span>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded px-2 py-1">
                      <span className="text-white text-xs font-mono">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsRecording(!isRecording)}
                        className={isRecording ? "bg-[var(--cyber-red)] text-white" : ""}
                      >
                        {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isRecording ? 'Stop' : 'Record'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset View
                      </Button>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                      Resolution: 1920x1080 | FPS: 30 | Bitrate: 2.5 Mbps
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Security Alerts</CardTitle>
                <Select value={alertFilter} onValueChange={setAlertFilter}>
                  <SelectTrigger className="w-48 bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--cyber-navy)] border-[var(--cyber-cyan)]/30">
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="critical">Critical Only</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="unresolved">Unresolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.severity === 'critical' ? 'bg-[var(--cyber-red)]' :
                          alert.severity === 'high' ? 'bg-yellow-400' : 'bg-orange-400'
                        } animate-pulse`}></div>
                        <span className="font-semibold text-white">{alert.type}</span>
                        <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-400">{getTimeAgo(alert.timestamp)}</span>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-3">{alert.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-400">Camera:</span>
                        <span className="text-white ml-1">{alert.camera}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Confidence:</span>
                        <span className="text-[var(--cyber-cyan)] ml-1">{alert.confidence}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Status:</span>
                        <span className="text-[var(--cyber-red)] ml-1">ACTIVE</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400">
                        <Eye className="w-3 h-3 mr-1" />
                        View Feed
                      </Button>
                      <Button size="sm" variant="outline">
                        Acknowledge
                      </Button>
                      <Button size="sm" variant="outline">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Detection Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Person Detection', count: 1247, accuracy: 97.8 },
                    { label: 'Vehicle Detection', count: 89, accuracy: 94.2 },
                    { label: 'Unauthorized Access', count: 12, accuracy: 91.5 },
                    { label: 'Suspicious Activity', count: 34, accuracy: 89.7 },
                    { label: 'Weapon Detection', count: 0, accuracy: 99.1 }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{stat.label}</div>
                        <div className="text-sm text-gray-400">{stat.count} detections today</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[var(--cyber-cyan)] font-bold">{stat.accuracy}%</div>
                        <div className="text-xs text-gray-400">accuracy</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-[var(--cyber-cyan)]/30">
              <CardHeader>
                <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Zone Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { zone: 'Main Entrance', activity: 'High', personnel: 47 },
                    { zone: 'Server Room', activity: 'Low', personnel: 3 },
                    { zone: 'Parking Garage', activity: 'Medium', personnel: 12 },
                    { zone: 'Loading Dock', activity: 'Medium', personnel: 8 },
                    { zone: 'Emergency Exits', activity: 'Low', personnel: 1 }
                  ].map((zone, index) => (
                    <div key={index} className="bg-[var(--cyber-dark)]/30 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white text-sm">{zone.zone}</div>
                          <div className="text-xs text-gray-400">{zone.personnel} personnel</div>
                        </div>
                        <Badge variant="outline" className={
                          zone.activity === 'High' ? 'text-[var(--cyber-red)]' :
                          zone.activity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                        }>
                          {zone.activity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <Card className="glass-panel border-[var(--cyber-cyan)]/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Camera Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockCameras.map((camera) => (
                  <div key={camera.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white">{camera.name}</h3>
                      <div className={`w-2 h-2 rounded-full ${getStatusBg(camera.status)}`}></div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white text-xs">{camera.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={getStatusColor(camera.status)}>{camera.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">AI Analysis:</span>
                        <span className={camera.aiEnabled ? 'text-green-400' : 'text-gray-400'}>
                          {camera.aiEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-1 mt-3">
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Configure
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-xs">
                        Restart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentinel" className="space-y-6">
          <div className="sentinel-system bg-[#0e0e12] text-[#e0e0e0] p-6 rounded-lg">
            <style jsx>{`
              .glitch-text {
                position: relative;
                display: inline-block;
              }
              
              .glitch-text::before,
              .glitch-text::after {
                content: "SENTINEL";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.5;
              }
              
              .glitch-text::before {
                left: -1px;
                text-shadow: 1px 0 #f44336;
                animation: glitch-anim-1 2s infinite linear alternate-reverse;
              }
              
              .glitch-text::after {
                left: 1px;
                text-shadow: -1px 0 #2196f3;
                animation: glitch-anim-2 3s infinite linear alternate-reverse;
              }
              
              @keyframes glitch-anim-1 {
                0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
                20% { clip-path: inset(72% 0 28% 0); transform: translate(-1px, 1px); }
                40% { clip-path: inset(54% 0 46% 0); transform: translate(1px, 3px); }
                60% { clip-path: inset(20% 0 80% 0); transform: translate(3px, -1px); }
                80% { clip-path: inset(66% 0 34% 0); transform: translate(-3px, -2px); }
                100% { clip-path: inset(91% 0 9% 0); transform: translate(2px, 2px); }
              }
              
              @keyframes glitch-anim-2 {
                0% { clip-path: inset(13% 0 87% 0); transform: translate(3px, -1px); }
                20% { clip-path: inset(25% 0 75% 0); transform: translate(-3px, 1px); }
                40% { clip-path: inset(63% 0 37% 0); transform: translate(1px, 3px); }
                60% { clip-path: inset(42% 0 58% 0); transform: translate(3px, 2px); }
                80% { clip-path: inset(74% 0 26% 0); transform: translate(2px, -3px); }
                100% { clip-path: inset(50% 0 50% 0); transform: translate(-2px, 2px); }
              }
              
              .camera-feed {
                background-color: #121218;
                border-radius: 4px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                position: relative;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                height: 190px;
              }
              
              .camera-feed:hover {
                transform: scale(1.02);
                border-color: #2196f3;
                z-index: 10;
              }
              
              .camera-content {
                flex: 1;
                position: relative;
                overflow: hidden;
                background: linear-gradient(45deg, #000, #111);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .camera-video {
                width: 100%;
                height: 100%;
                object-fit: cover;
                filter: grayscale(1) contrast(1.2) brightness(0.9);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
              }
              
              .camera-video.color-mode {
                filter: contrast(1.2) brightness(0.9);
              }
              
              .glitch-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: transparent;
                z-index: 3;
                pointer-events: none;
              }
              
              .color-distortion {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                mix-blend-mode: hard-light;
                opacity: 0;
                z-index: 4;
                pointer-events: none;
              }
              
              .scan-line {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(
                  to bottom,
                  transparent 0%,
                  rgba(255, 255, 255, 0.04) 50%,
                  transparent 100%
                );
                background-size: 100% 4px;
                z-index: 1;
                pointer-events: none;
                animation: scan-line-move 8s linear infinite;
              }
              
              @keyframes scan-line-move {
                0% { background-position: 0 0; opacity: 0.1; }
                50% { opacity: 0.3; }
                100% { background-position: 0 100%; opacity: 0.1; }
              }
              
              .noise-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 1px,
                  rgba(255, 255, 255, 0.03) 1px,
                  rgba(255, 255, 255, 0.03) 2px
                );
                opacity: 0.5;
                z-index: 1;
                pointer-events: none;
              }
              
              .status-indicator {
                animation: blink 1s infinite;
              }
              
              @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
              }
              
              .three-per-row { grid-template-columns: repeat(3, 1fr); }
              .two-per-row { grid-template-columns: repeat(2, 1fr); }
              .single-column { grid-template-columns: 1fr; }
            `}</style>

            {/* Header */}
            <header className="flex justify-between items-start p-4 mb-6 bg-black/30 rounded border-b border-[#2196f3]">
              <div>
                <h1 className="text-2xl font-bold tracking-wider text-[#2196f3]">
                  <span className="glitch-text">SENTINEL</span>
                </h1>
                <div className="text-xs opacity-70 mt-1">
                  ADVANCED SURVEILLANCE SYSTEM / STATUS: <span className="text-[#f44336] font-bold">COMPROMISED</span>
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div className="text-xs bg-black/40 px-2 py-1 rounded">
                  <span className="opacity-80">UPTIME:</span>
                  <span className="text-[#f44336] font-bold ml-1">{uptime}</span>
                </div>
                <div className="text-xs bg-black/40 px-2 py-1 rounded">
                  <span className="opacity-80">TIME:</span>
                  <span className="text-[#2196f3] font-bold ml-1">{currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
            </header>

            {/* Camera Grid */}
            <div className={`grid gap-3 mb-6 ${gridLayout}`}>
              {sentinelCameras.map((camera) => (
                <div key={camera.id} id={camera.id} className="camera-feed">
                  <div className="flex justify-between items-center px-3 py-1 bg-black/60 text-xs">
                    <span className="font-bold">{camera.name}</span>
                    <span className={`flex items-center ${camera.isOffline ? 'text-[#4caf50]' : 'text-[#f44336]'}`}>
                      <span className={`w-2 h-2 rounded-full mr-1 ${camera.isOffline ? 'bg-[#4caf50]' : 'bg-[#f44336] status-indicator'}`}></span>
                      {camera.status}
                    </span>
                  </div>
                  
                  <div className="camera-content">
                    <div className="scan-line"></div>
                    <div className="noise-overlay"></div>
                    
                    {/* Real Video Feed */}
                    {!camera.isOffline && (
                      <video
                        className="camera-video"
                        muted
                        loop
                        playsInline
                        autoPlay
                        src={videoSources[sentinelCameras.indexOf(camera)]}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: isColorMode ? 'contrast(1.2) brightness(0.9)' : 'grayscale(1) contrast(1.2) brightness(0.9)',
                          opacity: camera.isOffline ? 0.5 : 1
                        }}
                        onError={(e) => {
                          console.error('Video loading error:', e);
                          // Fallback to placeholder if video fails
                          const video = e.target as HTMLVideoElement;
                          video.style.display = 'none';
                        }}
                      />
                    )}
                    
                    {/* Offline State */}
                    {camera.isOffline && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                        <div className="absolute inset-0 bg-gray-800 opacity-60">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900"></div>
                          <div className="absolute top-4 left-4 w-8 h-12 bg-gray-600 rounded opacity-80"></div>
                          <div className="absolute top-8 right-6 w-10 h-10 bg-gray-500 rounded-full opacity-70"></div>
                          <div className="absolute bottom-8 left-1/3 w-12 h-6 bg-gray-600 rounded opacity-60"></div>
                          <div className="absolute top-1/2 right-1/4 w-6 h-8 bg-gray-700 rounded opacity-50"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Overlays */}
                    <div className="glitch-overlay"></div>
                    <div className="color-distortion"></div>
                    
                    {/* Status indicators */}
                    <div className="absolute top-2 left-2 text-xs text-[#2196f3] font-mono bg-black/60 px-2 py-1 rounded z-10">
                      {camera.isOffline ? "NO SIGNAL" : "RECORDING"}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#2196f3]/5"></div>
                  </div>
                  
                  <div className="px-3 py-1 bg-black/60 text-xs font-bold text-center">
                    {camera.location}
                  </div>
                </div>
              ))}
            </div>

            {/* Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-black/80 rounded border border-[#2196f3]/30 overflow-hidden">
                <div className="bg-[#2196f3] text-black text-xs font-bold px-3 py-1">
                  SYSTEM LOG
                </div>
                <div className="p-3 h-32 overflow-y-auto text-xs leading-relaxed">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="mb-1">
                      {log.startsWith('>') ? log : `> ${log}`}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={toggleGridLayout}
                  className="bg-black/60 text-[#2196f3] border border-[#2196f3] hover:bg-[#2196f3] hover:text-black transition-all text-xs"
                >
                  GRID VIEW
                </Button>
                <Button
                  onClick={resetSystem}
                  className="bg-black/60 text-[#2196f3] border border-[#2196f3] hover:bg-[#2196f3] hover:text-black transition-all text-xs"
                >
                  RESET SYSTEM
                </Button>
                <Button
                  onClick={triggerGlitch}
                  className="bg-black/60 text-[#2196f3] border border-[#2196f3] hover:bg-[#2196f3] hover:text-black transition-all text-xs"
                >
                  FORCE GLITCH
                </Button>
                <Button
                  onClick={toggleFilter}
                  className="bg-black/60 text-[#2196f3] border border-[#2196f3] hover:bg-[#2196f3] hover:text-black transition-all text-xs"
                >
                  {isColorMode ? "BW MODE" : "COLOR MODE"}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
