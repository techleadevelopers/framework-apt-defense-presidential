import React, { useState, useEffect, useRef } from "react";
import { Terminal, Copy, Minimize2, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  commands: string[];
  outputs: string[];
}

export function AdvancedTerminal({ isOpen, onClose, commands, outputs }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output', text: string, timestamp: Date }>>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command: string) => {
    const newEntry = { type: 'command' as const, text: command, timestamp: new Date() };
    setHistory(prev => [...prev, newEntry]);

    // Simulate command execution
    setTimeout(() => {
      let output = "Command not recognized. Type 'help' for available commands.";
      
      if (command.toLowerCase() === 'help') {
        output = `Available commands:
- scan [ip/range] - Network scan
- threat-hunt - Start threat hunting
- mitre [technique] - MITRE ATT&CK lookup
- alert [severity] - Generate test alert
- status - System status
- clear - Clear terminal`;
      } else if (command.toLowerCase().startsWith('scan')) {
        output = `Scanning network... Found 15 devices\n192.168.1.1 - Router (Online)\n192.168.1.100 - Desktop (Online)\n192.168.1.200 - Server (Online)`;
      } else if (command.toLowerCase() === 'threat-hunt') {
        output = `Initiating threat hunting...\n[+] Analyzing 50,000 events\n[+] Found 3 potential IOCs\n[!] Suspicious PowerShell execution detected`;
      } else if (command.toLowerCase().startsWith('mitre')) {
        output = `MITRE ATT&CK Technique: T1055 - Process Injection\nTactic: Defense Evasion, Privilege Escalation\nDescription: Adversaries may inject code into processes...`;
      }

      const outputEntry = { type: 'output' as const, text: output, timestamp: new Date() };
      setHistory(prev => [...prev, outputEntry]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isMinimized ? 'w-80 h-12' : 'w-96 h-80'} 
                    bg-black border border-[var(--cyber-cyan)] rounded-lg shadow-2xl transition-all duration-300`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 bg-[var(--cyber-navy)] border-b border-[var(--cyber-cyan)]">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-[var(--cyber-cyan)]" />
          <span className="text-xs text-[var(--cyber-cyan)] font-mono">SOC Terminal</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 p-0"
          >
            {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onClose}
            className="w-6 h-6 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      {!isMinimized && (
        <div className="flex flex-col h-full">
          <div 
            ref={terminalRef}
            className="flex-1 p-3 overflow-y-auto bg-black font-mono text-xs"
          >
            {history.map((entry, index) => (
              <div key={index} className="mb-1">
                {entry.type === 'command' ? (
                  <div className="text-[var(--cyber-cyan)]">
                    <span className="text-green-400">user@soc:~$</span> {entry.text}
                  </div>
                ) : (
                  <div className="text-gray-300 whitespace-pre-line pl-4">
                    {entry.text}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Input Line */}
          <div className="flex items-center p-2 border-t border-[var(--cyber-cyan)]/30 bg-[var(--cyber-dark)]">
            <span className="text-green-400 font-mono text-xs mr-2">user@soc:~$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-[var(--cyber-cyan)] font-mono text-xs outline-none"
              placeholder="Type command..."
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
}