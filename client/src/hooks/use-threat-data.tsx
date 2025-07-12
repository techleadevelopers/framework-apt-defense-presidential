import { useState, useEffect } from 'react';

export interface ThreatData {
  id: string;
  sourceIp: string;
  targetIp: string;
  sourceCountry: string;
  targetCountry: string;
  latitude: number;
  longitude: number;
  threatType: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  description: string;
  attackVector: string;
  port: number;
  confidence: number;
}

export interface ThreatStats {
  totalThreats: number;
  criticalThreats: number;
  highThreats: number;
  mediumThreats: number;
  lowThreats: number;
  topSourceCountries: { country: string; count: number }[];
  topThreatTypes: { type: string; count: number }[];
}

// Simulated real-time threat data generator
const generateThreatData = (): ThreatData => {
  const threatTypes = [
    'APT Attack', 'Malware', 'DDoS', 'Phishing', 'Ransomware', 'Botnet', 
    'SQL Injection', 'Cross-site Scripting', 'Brute Force', 'Zero-day Exploit',
    'Man-in-the-Middle', 'Data Exfiltration', 'Cryptocurrency Mining', 'IoT Exploitation'
  ];

  const attackVectors = [
    'Email Attachment', 'Malicious URL', 'Network Scan', 'Credential Stuffing',
    'Exploit Kit', 'Social Engineering', 'Supply Chain', 'Watering Hole',
    'USB/Removable Media', 'Remote Access', 'Insider Threat', 'API Abuse'
  ];

  const countries = [
    { name: 'United States', lat: 39.8283, lng: -98.5795 },
    { name: 'China', lat: 35.8617, lng: 104.1954 },
    { name: 'Russia', lat: 61.5240, lng: 105.3188 },
    { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
    { name: 'India', lat: 20.5937, lng: 78.9629 },
    { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
    { name: 'Germany', lat: 51.1657, lng: 10.4515 },
    { name: 'France', lat: 46.6034, lng: 1.8883 },
    { name: 'Japan', lat: 36.2048, lng: 138.2529 },
    { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
    { name: 'Iran', lat: 32.4279, lng: 53.6880 },
    { name: 'North Korea', lat: 40.3399, lng: 127.5101 },
    { name: 'Ukraine', lat: 48.3794, lng: 31.1656 },
    { name: 'Turkey', lat: 38.9637, lng: 35.2433 },
    { name: 'Israel', lat: 31.0461, lng: 34.8516 },
    { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
    { name: 'Canada', lat: 56.1304, lng: -106.3468 },
    { name: 'Australia', lat: -25.2744, lng: 133.7751 },
    { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
    { name: 'Argentina', lat: -38.4161, lng: -63.6167 }
  ];

  const severities: ThreatData['severity'][] = ['critical', 'high', 'medium', 'low'];
  const severityWeights = [0.05, 0.15, 0.35, 0.45]; // Distribution probability

  // Select severity based on weighted probability
  const randomSeverity = () => {
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < severityWeights.length; i++) {
      cumulative += severityWeights[i];
      if (random < cumulative) {
        return severities[i];
      }
    }
    return 'low';
  };

  const sourceCountry = countries[Math.floor(Math.random() * countries.length)];
  const targetCountry = countries[Math.floor(Math.random() * countries.length)];
  const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const attackVector = attackVectors[Math.floor(Math.random() * attackVectors.length)];
  const severity = randomSeverity();

  // Generate realistic IP addresses
  const generateIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const commonPorts = [80, 443, 22, 21, 25, 53, 110, 143, 993, 995, 3389, 5900, 8080, 8443];
  const port = commonPorts[Math.floor(Math.random() * commonPorts.length)];

  return {
    id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    sourceIp: generateIP(),
    targetIp: generateIP(),
    sourceCountry: sourceCountry.name,
    targetCountry: targetCountry.name,
    latitude: sourceCountry.lat + (Math.random() - 0.5) * 10, // Add some variation
    longitude: sourceCountry.lng + (Math.random() - 0.5) * 10,
    threatType,
    severity,
    timestamp: new Date(),
    description: `${threatType} detected from ${sourceCountry.name} targeting ${targetCountry.name}`,
    attackVector,
    port,
    confidence: Math.floor(Math.random() * 30) + 70 // 70-100% confidence
  };
};

export const useThreatData = () => {
  const [activeThreats, setActiveThreats] = useState<ThreatData[]>([]);
  const [threatStats, setThreatStats] = useState<ThreatStats>({
    totalThreats: 0,
    criticalThreats: 0,
    highThreats: 0,
    mediumThreats: 0,
    lowThreats: 0,
    topSourceCountries: [],
    topThreatTypes: []
  });
  const [selectedThreat, setSelectedThreat] = useState<ThreatData | null>(null);

  // Generate initial threat data
  useEffect(() => {
    const initialThreats = Array.from({ length: 50 }, () => generateThreatData());
    setActiveThreats(initialThreats);
  }, []);

  // Real-time threat generation
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = generateThreatData();
      setActiveThreats(prev => {
        const updated = [...prev, newThreat];
        // Keep only the last 200 threats to prevent memory issues
        return updated.slice(-200);
      });
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update threat statistics
  useEffect(() => {
    const stats: ThreatStats = {
      totalThreats: activeThreats.length,
      criticalThreats: activeThreats.filter(t => t.severity === 'critical').length,
      highThreats: activeThreats.filter(t => t.severity === 'high').length,
      mediumThreats: activeThreats.filter(t => t.severity === 'medium').length,
      lowThreats: activeThreats.filter(t => t.severity === 'low').length,
      topSourceCountries: [],
      topThreatTypes: []
    };

    // Calculate top source countries
    const countryCount = activeThreats.reduce((acc, threat) => {
      acc[threat.sourceCountry] = (acc[threat.sourceCountry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    stats.topSourceCountries = Object.entries(countryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([country, count]) => ({ country, count }));

    // Calculate top threat types
    const typeCount = activeThreats.reduce((acc, threat) => {
      acc[threat.threatType] = (acc[threat.threatType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    stats.topThreatTypes = Object.entries(typeCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    setThreatStats(stats);
  }, [activeThreats]);

  // Clean up old threats (older than 30 minutes)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const cutoffTime = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes ago
      setActiveThreats(prev => prev.filter(threat => threat.timestamp > cutoffTime));
    }, 60000); // Run every minute

    return () => clearInterval(cleanupInterval);
  }, []);

  return {
    activeThreats,
    threatStats,
    selectedThreat,
    setSelectedThreat,
    generateThreatData: () => {
      const newThreat = generateThreatData();
      setActiveThreats(prev => [...prev, newThreat]);
      return newThreat;
    }
  };
};