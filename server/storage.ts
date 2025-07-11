import { 
  users, threats, networkDevices, securityEvents, aiModels,
  type User, type InsertUser, 
  type Threat, type InsertThreat,
  type NetworkDevice, type InsertNetworkDevice,
  type SecurityEvent, type InsertSecurityEvent,
  type AiModel, type InsertAiModel
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Threats
  getThreats(): Promise<Threat[]>;
  getThreat(id: number): Promise<Threat | undefined>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  updateThreatStatus(id: number, status: string): Promise<Threat | undefined>;
  getActiveThreatsByeverity(severity?: string): Promise<Threat[]>;

  // Network Devices
  getNetworkDevices(): Promise<NetworkDevice[]>;
  getNetworkDevice(id: number): Promise<NetworkDevice | undefined>;
  createNetworkDevice(device: InsertNetworkDevice): Promise<NetworkDevice>;
  updateDeviceStatus(id: number, status: string): Promise<NetworkDevice | undefined>;

  // Security Events
  getSecurityEvents(limit?: number): Promise<SecurityEvent[]>;
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;

  // AI Models
  getAiModels(): Promise<AiModel[]>;
  getAiModel(id: number): Promise<AiModel | undefined>;
  createAiModel(model: InsertAiModel): Promise<AiModel>;
  updateAiModelStats(id: number, stats: Partial<AiModel>): Promise<AiModel | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private threats: Map<number, Threat>;
  private networkDevices: Map<number, NetworkDevice>;
  private securityEvents: Map<number, SecurityEvent>;
  private aiModels: Map<number, AiModel>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.threats = new Map();
    this.networkDevices = new Map();
    this.securityEvents = new Map();
    this.aiModels = new Map();
    this.currentId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize AI Models
    const tactiCoreModel: AiModel = {
      id: this.currentId++,
      name: "TactiCore Kernel",
      type: "tacticore",
      status: "active",
      accuracy: 98,
      lastUpdated: new Date(),
      predictions: 1247,
      responseTime: 0.3
    };
    this.aiModels.set(tactiCoreModel.id, tactiCoreModel);

    const missionOpsModel: AiModel = {
      id: this.currentId++,
      name: "Mission Ops Kernel",
      type: "mission_ops",
      status: "active",
      accuracy: 95,
      lastUpdated: new Date(),
      predictions: 847,
      responseTime: 0.5
    };
    this.aiModels.set(missionOpsModel.id, missionOpsModel);

    // Initialize Critical Threats
    const threat1: Threat = {
      id: this.currentId++,
      title: "APT29 - MITRE T1055.002",
      description: "Process injection detected in explorer.exe - Possible privilege escalation attempt",
      severity: "critical",
      mitreId: "T1055.002",
      sourceIp: "192.168.1.45",
      targetHost: "DESKTOP-ABC123",
      confidence: 97,
      status: "active",
      detectedAt: new Date(Date.now() - 2 * 60 * 1000),
      metadata: { processName: "explorer.exe", technique: "Process Injection" }
    };
    this.threats.set(threat1.id, threat1);

    const threat2: Threat = {
      id: this.currentId++,
      title: "Cobalt Strike - MITRE T1071.001",
      description: "Suspicious HTTP beacon detected - Possible C2 communication",
      severity: "critical",
      mitreId: "T1071.001",
      sourceIp: "10.0.0.23",
      targetHost: "malicious-domain.com",
      confidence: 94,
      status: "active",
      detectedAt: new Date(Date.now() - 5 * 60 * 1000),
      metadata: { protocol: "HTTP", beaconInterval: 30000 }
    };
    this.threats.set(threat2.id, threat2);

    const threat3: Threat = {
      id: this.currentId++,
      title: "Suspicious PowerShell - MITRE T1059.001",
      description: "Obfuscated PowerShell script execution detected",
      severity: "high",
      mitreId: "T1059.001",
      sourceIp: "192.168.1.78",
      targetHost: "WORKSTATION-456",
      confidence: 89,
      status: "monitoring",
      detectedAt: new Date(Date.now() - 8 * 60 * 1000),
      metadata: { processName: "powershell.exe", scriptObfuscated: true }
    };
    this.threats.set(threat3.id, threat3);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Threat methods
  async getThreats(): Promise<Threat[]> {
    return Array.from(this.threats.values()).sort((a, b) => 
      new Date(b.detectedAt || 0).getTime() - new Date(a.detectedAt || 0).getTime()
    );
  }

  async getThreat(id: number): Promise<Threat | undefined> {
    return this.threats.get(id);
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const id = this.currentId++;
    const threat: Threat = { 
      ...insertThreat, 
      id, 
      detectedAt: new Date(),
      metadata: insertThreat.metadata || {},
      mitreId: insertThreat.mitreId || null,
      sourceIp: insertThreat.sourceIp || null,
      targetHost: insertThreat.targetHost || null
    };
    this.threats.set(id, threat);
    return threat;
  }

  async updateThreatStatus(id: number, status: string): Promise<Threat | undefined> {
    const threat = this.threats.get(id);
    if (threat) {
      threat.status = status;
      this.threats.set(id, threat);
      return threat;
    }
    return undefined;
  }

  async getActiveThreatsByeverity(severity?: string): Promise<Threat[]> {
    const allThreats = Array.from(this.threats.values());
    let filtered = allThreats.filter(t => t.status === 'active' || t.status === 'monitoring');
    
    if (severity) {
      filtered = filtered.filter(t => t.severity === severity);
    }
    
    return filtered.sort((a, b) => 
      new Date(b.detectedAt || 0).getTime() - new Date(a.detectedAt || 0).getTime()
    );
  }

  // Network Device methods
  async getNetworkDevices(): Promise<NetworkDevice[]> {
    return Array.from(this.networkDevices.values());
  }

  async getNetworkDevice(id: number): Promise<NetworkDevice | undefined> {
    return this.networkDevices.get(id);
  }

  async createNetworkDevice(insertDevice: InsertNetworkDevice): Promise<NetworkDevice> {
    const id = this.currentId++;
    const device: NetworkDevice = { 
      ...insertDevice, 
      id, 
      lastScanned: new Date(),
      hostname: insertDevice.hostname || null,
      deviceType: insertDevice.deviceType || null,
      operatingSystem: insertDevice.operatingSystem || null,
      services: insertDevice.services || {},
      vulnerabilities: insertDevice.vulnerabilities || {}
    };
    this.networkDevices.set(id, device);
    return device;
  }

  async updateDeviceStatus(id: number, status: string): Promise<NetworkDevice | undefined> {
    const device = this.networkDevices.get(id);
    if (device) {
      device.status = status;
      this.networkDevices.set(id, device);
      return device;
    }
    return undefined;
  }

  // Security Event methods
  async getSecurityEvents(limit = 50): Promise<SecurityEvent[]> {
    const events = Array.from(this.securityEvents.values())
      .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime());
    
    return events.slice(0, limit);
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const id = this.currentId++;
    const event: SecurityEvent = { 
      ...insertEvent, 
      id, 
      timestamp: new Date(),
      metadata: insertEvent.metadata || {}
    };
    this.securityEvents.set(id, event);
    return event;
  }

  // AI Model methods
  async getAiModels(): Promise<AiModel[]> {
    return Array.from(this.aiModels.values());
  }

  async getAiModel(id: number): Promise<AiModel | undefined> {
    return this.aiModels.get(id);
  }

  async createAiModel(insertModel: InsertAiModel): Promise<AiModel> {
    const id = this.currentId++;
    const model: AiModel = { 
      ...insertModel, 
      id, 
      lastUpdated: new Date(),
      accuracy: insertModel.accuracy || null,
      predictions: insertModel.predictions || null,
      responseTime: insertModel.responseTime || null
    };
    this.aiModels.set(id, model);
    return model;
  }

  async updateAiModelStats(id: number, stats: Partial<AiModel>): Promise<AiModel | undefined> {
    const model = this.aiModels.get(id);
    if (model) {
      Object.assign(model, stats, { lastUpdated: new Date() });
      this.aiModels.set(id, model);
      return model;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
