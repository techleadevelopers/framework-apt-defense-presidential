// Hook for integrating real API data into SOC Dashboard
import { useState, useEffect, useCallback } from 'react';
import { ApiIntegration, DataTransformers } from '@/lib/api-integration';

interface RealApiData {
  threats: any[];
  vulnerabilities: any[];
  phishingUrls: any[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export function useRealApiData(): RealApiData {
  const [threats, setThreats] = useState<any[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [phishingUrls, setPhishingUrls] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch vulnerabilities from NVD (always available)
      const vulnData = await ApiIntegration.getRecentVulnerabilities(10);
      if (vulnData) {
        setVulnerabilities(vulnData.vulnerabilities || []);
      }
      
      // Fetch phishing URLs (free API)
      const phishingData = await ApiIntegration.getPhishingThreats();
      if (phishingData) {
        setPhishingUrls(Array.isArray(phishingData) ? phishingData.slice(0, 20) : []);
      }
      
      // Check some sample IPs for threat intelligence
      const sampleIps = [
        '8.8.8.8', // Google DNS
        '1.1.1.1', // Cloudflare DNS
        '185.220.101.7', // Known malicious IP
        '192.168.1.1' // Local IP
      ];
      
      const threatPromises = sampleIps.map(async (ip) => {
        try {
          const geoData = await ApiIntegration.getIpGeolocation(ip);
          const repData = await ApiIntegration.checkIpReputation(ip);
          
          return {
            ip,
            geolocation: geoData,
            reputation: repData,
            timestamp: new Date()
          };
        } catch (error) {
          console.warn(`Failed to fetch data for IP ${ip}:`, error);
          return {
            ip,
            geolocation: null,
            reputation: null,
            timestamp: new Date()
          };
        }
      });
      
      const threatResults = await Promise.allSettled(threatPromises);
      const successfulResults = threatResults
        .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
        .map(result => result.value);
      setThreats(successfulResults.filter(t => t.geolocation || t.reputation));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch API data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(refreshData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [refreshData]);

  return {
    threats,
    vulnerabilities,
    phishingUrls,
    isLoading,
    error,
    refreshData
  };
}

// Hook for checking specific IP addresses
export function useIpAnalysis() {
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeIp = useCallback(async (ip: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [geolocation, reputation] = await Promise.all([
        ApiIntegration.getIpGeolocation(ip),
        ApiIntegration.checkIpReputation(ip)
      ]);
      
      setResults({
        ip,
        geolocation,
        reputation,
        timestamp: new Date()
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze IP');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    results,
    isLoading,
    error,
    analyzeIp
  };
}

// Hook for vulnerability monitoring
export function useVulnerabilityMonitoring() {
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVulnerabilities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ApiIntegration.getRecentVulnerabilities(50);
      
      if (data?.vulnerabilities) {
        setVulnerabilities(data.vulnerabilities);
        
        // Calculate statistics
        const stats = data.vulnerabilities.reduce((acc: any, vuln: any) => {
          acc.total++;
          
          // Extract CVSS score and severity
          const cvssData = vuln.cve?.metrics?.cvssMetricV31?.[0]?.cvssData;
          if (cvssData) {
            const severity = cvssData.baseSeverity?.toLowerCase();
            if (severity in acc) {
              acc[severity]++;
            }
          }
          
          return acc;
        }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });
        
        setStats(stats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vulnerabilities');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVulnerabilities();
    
    // Refresh vulnerabilities every hour
    const interval = setInterval(fetchVulnerabilities, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchVulnerabilities]);

  return {
    vulnerabilities,
    stats,
    isLoading,
    error,
    refreshVulnerabilities: fetchVulnerabilities
  };
}