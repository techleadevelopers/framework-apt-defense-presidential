import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const attackSteps = [
  { id: 1, name: "Initial Access", description: "Phishing email delivered and link clicked" },
  { id: 2, name: "Execution", description: "PowerShell payload executed on victim machine" },
  { id: 3, name: "Persistence", description: "Registry run key added for persistence" },
  { id: 4, name: "Privilege Escalation", description: "Token impersonation via Service Injection" },
  { id: 5, name: "Lateral Movement", description: "SMB session established to server-01" },
  { id: 6, name: "Credential Access", description: "Dumped LSASS memory for creds" },
  { id: 7, name: "Data Exfiltration", description: "Sensitive files exfiltrated via HTTPS" },
]

export function SimulatedAPTChain() {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [logs, setLogs] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && currentStep < attackSteps.length) {
      interval = setInterval(() => {
        const step = attackSteps[currentStep]
        setLogs(prev => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] 🚨 ${step.name}: ${step.description}`,
        ])
        toast({
          title: `APT Simulation - ${step.name}`,
          description: step.description,
          variant: "destructive",
        })
        setCurrentStep(prev => prev + 1)
      }, 3500)
    }

    return () => clearInterval(interval)
  }, [isRunning, currentStep])

  const startSimulation = () => {
    setIsRunning(true)
    setCurrentStep(0)
    setLogs([])
    toast({
      title: "APT29 Simulation Started",
      description: "Attack chain emulation has begun",
    })
  }

  return (
    <Card className="glass-panel cyber-border p-4 animate-glow max-w-3xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="font-orbitron text-lg text-cyan-400">APT29 Attack Chain Simulation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {attackSteps.map((step, index) => (
            <Badge
              key={step.id}
              variant={index < currentStep ? "destructive" : "secondary"}
              className={`transition duration-500 ${index === currentStep && "animate-pulse-slow"}`}
            >
              {step.name}
            </Badge>
          ))}
        </div>

        <div className="bg-[var(--cyber-navy)] rounded p-3 text-sm font-code h-64 overflow-y-auto cyber-border">
          {logs.map((log, idx) => (
            <div key={idx} className="text-cyan-300">{log}</div>
          ))}
        </div>

        <Button
          onClick={startSimulation}
          disabled={isRunning}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-orbitron tracking-widest"
        >
          {isRunning ? "Running..." : "Start APT Simulation"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default SimulatedAPTChain
