import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const SentinelInterface = () => {
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

  const cameras = [
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
    // Add glitch effect to random camera
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

  return (
    <div className="sentinel-system min-h-screen bg-[#0e0e12] text-[#e0e0e0] font-mono p-4">
      <style jsx>{`
        .sentinel-system {
          font-family: 'Share Tech Mono', monospace;
        }
        
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
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(-2px, 2px);
          }
          20% {
            clip-path: inset(72% 0 28% 0);
            transform: translate(-1px, 1px);
          }
          40% {
            clip-path: inset(54% 0 46% 0);
            transform: translate(1px, 3px);
          }
          60% {
            clip-path: inset(20% 0 80% 0);
            transform: translate(3px, -1px);
          }
          80% {
            clip-path: inset(66% 0 34% 0);
            transform: translate(-3px, -2px);
          }
          100% {
            clip-path: inset(91% 0 9% 0);
            transform: translate(2px, 2px);
          }
        }
        
        @keyframes glitch-anim-2 {
          0% {
            clip-path: inset(13% 0 87% 0);
            transform: translate(3px, -1px);
          }
          20% {
            clip-path: inset(25% 0 75% 0);
            transform: translate(-3px, 1px);
          }
          40% {
            clip-path: inset(63% 0 37% 0);
            transform: translate(1px, 3px);
          }
          60% {
            clip-path: inset(42% 0 58% 0);
            transform: translate(3px, 2px);
          }
          80% {
            clip-path: inset(74% 0 26% 0);
            transform: translate(2px, -3px);
          }
          100% {
            clip-path: inset(50% 0 50% 0);
            transform: translate(-2px, 2px);
          }
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
          0% {
            background-position: 0 0;
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            background-position: 0 100%;
            opacity: 0.1;
          }
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
        
        .three-per-row {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .two-per-row {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .single-column {
          grid-template-columns: 1fr;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
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
          {cameras.map((camera) => (
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
                <div className="text-[#2196f3] text-lg font-bold opacity-60">
                  {camera.isOffline ? "OFFLINE" : "LIVE FEED"}
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
    </div>
  );
};

export default SentinelInterface;