import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Monitor, Smartphone, Router, Server } from "lucide-react";

interface NetworkDevice {
  id: number;
  ipAddress: string;
  hostname: string;
  deviceType: string;
  operatingSystem: string;
  status: string;
  services: string[];
}

export default function NetworkScanner() {
  const [scanTarget, setScanTarget] = useState("192.168.1.0/24");
  const [isScanning, setIsScanning] = useState(false);
  const [devices] = useState<NetworkDevice[]>([
    {
      id: 1,
      ipAddress: "192.168.1.1",
      hostname: "router.local",
      deviceType: "router",
      operatingSystem: "RouterOS",
      status: "online",
      services: ["80", "443", "22"]
    },
    {
      id: 2,
      ipAddress: "192.168.1.100",
      hostname: "desktop-abc123",
      deviceType: "computer",
      operatingSystem: "Windows 11",
      status: "online",
      services: ["135", "139", "445"]
    },
    {
      id: 3,
      ipAddress: "192.168.1.200",
      hostname: "server-01",
      deviceType: "server",
      operatingSystem: "Ubuntu 22.04",
      status: "online",
      services: ["22", "80", "443", "3306"]
    }
  ]);

  const handleScan = async () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'computer':
      case 'workstation':
        return Monitor;
      case 'mobile':
      case 'phone':
        return Smartphone;
      case 'router':
      case 'gateway':
        return Router;
      case 'server':
        return Server;
      default:
        return Monitor;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? Wifi : WifiOff;
  };

  return (
    <div className="space-y-6">
      {/* Scanner Controls */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Network Scanner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Target (e.g., 192.168.1.0/24)"
              value={scanTarget}
              onChange={(e) => setScanTarget(e.target.value)}
              className="bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30"
            />
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="bg-[var(--cyber-cyan)] text-[var(--cyber-dark)] hover:bg-cyan-400"
            >
              {isScanning ? "Scanning..." : "Start Scan"}
            </Button>
          </div>
          
          {isScanning && (
            <div className="w-full bg-[var(--cyber-steel)] rounded-full h-2">
              <div className="bg-[var(--cyber-cyan)] h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scanner Results */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Discovered Devices</CardTitle>
        </CardHeader>
        <CardContent>
          {devices && devices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {devices.map((device) => {
                const DeviceIcon = getDeviceIcon(device.deviceType || 'unknown');
                const StatusIcon = getStatusIcon(device.status);
                
                return (
                  <div key={device.id} className="bg-[var(--cyber-dark)]/50 border border-[var(--cyber-cyan)]/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="w-5 h-5 text-[var(--cyber-cyan)]" />
                        <span className="font-medium">{device.hostname || 'Unknown Device'}</span>
                      </div>
                      <StatusIcon className={`w-4 h-4 ${getStatusColor(device.status)}`} />
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-gray-400">IP:</span>
                        <span className="text-white ml-1">{device.ipAddress}</span>
                      </div>
                      
                      {device.operatingSystem && (
                        <div>
                          <span className="text-gray-400">OS:</span>
                          <span className="text-white ml-1">{device.operatingSystem}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1 mt-2">
                        <span className="text-gray-400">Status:</span>
                        <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                          {device.status}
                        </Badge>
                      </div>
                      
                      {device.services && Array.isArray(device.services) && device.services.length > 0 && (
                        <div className="mt-2">
                          <span className="text-gray-400 text-xs">Services:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {device.services.slice(0, 3).map((service: any, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service.port || service}
                              </Badge>
                            ))}
                            {device.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{device.services.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Monitor className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No devices discovered yet. Start a network scan to discover devices.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Network Topology (Placeholder) */}
      <Card className="glass-panel border-[var(--cyber-cyan)]/30">
        <CardHeader>
          <CardTitle className="font-orbitron text-[var(--cyber-cyan)]">Network Topology</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-[var(--cyber-dark)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Router className="w-12 h-12 text-[var(--cyber-cyan)] mx-auto mb-2" />
              <p className="text-gray-400">Network topology visualization would be rendered here</p>
              <p className="text-xs text-gray-500 mt-1">Using D3.js or similar visualization library</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
