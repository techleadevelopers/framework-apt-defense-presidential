import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertThreatSchema, insertSecurityEventSchema, insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store connected clients
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws) => {
    clients.add(ws);
    console.log('Client connected to WebSocket');

    ws.on('close', () => {
      clients.delete(ws);
      console.log('Client disconnected from WebSocket');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });

    // Send initial data
    ws.send(JSON.stringify({
      type: 'connection',
      message: 'Connected to APT Defense Universe SOC'
    }));
  });

  // Broadcast function for real-time updates
  function broadcast(data: any) {
    const message = JSON.stringify(data);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  // API Routes
  
  // User Authentication Routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
      
      // Create new user (password should be hashed in production)
      const user = await storage.createUser(userData);
      
      // Don't return password in response
      const { password, ...userResponse } = user;
      
      res.status(201).json({ 
        message: 'Usuário criado com sucesso',
        user: userResponse 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: 'Dados inválidos para registro' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Don't return password in response
      const { password: _, ...userResponse } = user;
      
      res.json({ 
        message: 'Login realizado com sucesso',
        user: userResponse 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  // User profile and gamification routes
  app.get('/api/user/:id', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Get user progress and achievements
      const progress = await storage.getStudentProgress(userId);
      const achievements = await storage.getStudentAchievements(userId);
      const certifications = await storage.getStudentCertifications(userId);
      
      // Calculate total points from achievements
      const totalPoints = achievements.reduce((sum, achievement) => {
        const achievementData = storage.achievements.get(achievement.achievementId);
        return sum + (achievementData?.points || 0);
      }, 0);
      
      const { password, ...userResponse } = user;
      
      res.json({
        user: userResponse,
        gamification: {
          totalPoints,
          level: Math.floor(totalPoints / 100) + 1,
          achievements: achievements.length,
          certifications: certifications.length,
          coursesCompleted: progress.filter(p => p.isCompleted).length,
          totalCourses: progress.length
        },
        progress,
        achievements,
        certifications
      });
    } catch (error) {
      console.error('User profile error:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });

  app.get('/api/threats', async (req, res) => {
    try {
      const severity = req.query.severity as string;
      const threats = severity 
        ? await storage.getActiveThreatsByeverity(severity)
        : await storage.getThreats();
      res.json(threats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threats' });
    }
  });

  app.get('/api/threats/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const threat = await storage.getThreat(id);
      if (!threat) {
        return res.status(404).json({ error: 'Threat not found' });
      }
      res.json(threat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threat' });
    }
  });

  app.post('/api/threats', async (req, res) => {
    try {
      const threatData = insertThreatSchema.parse(req.body);
      const threat = await storage.createThreat(threatData);
      
      // Broadcast new threat to all connected clients
      broadcast({
        type: 'new_threat',
        data: threat
      });

      res.status(201).json(threat);
    } catch (error) {
      res.status(400).json({ error: 'Invalid threat data' });
    }
  });

  app.patch('/api/threats/:id/status', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!['active', 'monitoring', 'blocked', 'dismissed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const threat = await storage.updateThreatStatus(id, status);
      if (!threat) {
        return res.status(404).json({ error: 'Threat not found' });
      }

      // Broadcast threat status update
      broadcast({
        type: 'threat_status_update',
        data: threat
      });

      res.json(threat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update threat status' });
    }
  });

  app.get('/api/network-devices', async (req, res) => {
    try {
      const devices = await storage.getNetworkDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch network devices' });
    }
  });

  app.get('/api/security-events', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const events = await storage.getSecurityEvents(limit);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch security events' });
    }
  });

  app.post('/api/security-events', async (req, res) => {
    try {
      const eventData = insertSecurityEventSchema.parse(req.body);
      const event = await storage.createSecurityEvent(eventData);
      
      // Broadcast new security event
      broadcast({
        type: 'security_event',
        data: event
      });

      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: 'Invalid event data' });
    }
  });

  app.get('/api/ai-models', async (req, res) => {
    try {
      const models = await storage.getAiModels();
      res.json(models);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch AI models' });
    }
  });

  app.get('/api/dashboard/metrics', async (req, res) => {
    try {
      const threats = await storage.getThreats();
      const activeThreats = threats.filter(t => t.status === 'active');
      const criticalThreats = activeThreats.filter(t => t.severity === 'critical');
      const aiModels = await storage.getAiModels();
      
      const metrics = {
        activeThreats: activeThreats.length,
        criticalThreats: criticalThreats.length,
        blockedAttacks: 1247, // This would come from historical data
        networkHealth: 98.7,
        aiConfidence: 96.4,
        totalThreatsToday: threats.length,
        aiModels: aiModels
      };

      res.json(metrics);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
    }
  });

  // Simulate real-time threat generation
  setInterval(async () => {
    if (Math.random() < 0.1) { // 10% chance every interval
      const newEvent = {
        eventType: 'threat_detection',
        source: `192.168.1.${Math.floor(Math.random() * 255)}`,
        message: 'Suspicious network activity detected',
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
      };

      const event = await storage.createSecurityEvent(newEvent);
      broadcast({
        type: 'security_event',
        data: event
      });
    }
  }, 10000); // Every 10 seconds

  return httpServer;
}
