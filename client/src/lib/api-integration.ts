// Real API Integration for SOC Dashboard
// This file manages connections to public cybersecurity APIs

interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  rateLimit: number; // requests per minute
  requiresKey: boolean;
}

// API Configuration
export const API_CONFIGS = {
  // Threat Intelligence APIs
  VIRUSTOTAL: {
    baseUrl: 'https://www.virustotal.com/api/v3',
    headers: { 'x-apikey': import.meta.env.VITE_VIRUSTOTAL_API_KEY || '' },
    rateLimit: 4, // 4 requests per minute
    requiresKey: true
  },
  
  ABUSEIPDB: {
    baseUrl: 'https://api.abuseipdb.com/api/v2',
    headers: { 
      'Key': import.meta.env.VITE_ABUSEIPDB_API_KEY || '',
      'Accept': 'application/json'
    },
    rateLimit: 16, // 1000 requests per day
    requiresKey: true
  },
  
  // Geolocation APIs
  IP_GEOLOCATION: {
    baseUrl: 'https://api.ipgeolocation.io/ipgeo',
    headers: {},
    rateLimit: 60, // 30,000 requests per month
    requiresKey: true
  },
  
  IP_API: {
    baseUrl: 'http://ip-api.com/json',
    headers: {},
    rateLimit: 45, // 45 requests per minute
    requiresKey: false
  },
  
  // Vulnerability APIs
  NVD_NIST: {
    baseUrl: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    headers: {},
    rateLimit: 5, // 5 requests per 30 seconds without key
    requiresKey: false
  },
  
  // Threat Intelligence
  URLHAUS: {
    baseUrl: 'https://urlhaus-api.abuse.ch/v1',
    headers: {},
    rateLimit: 100, // generous rate limit
    requiresKey: false
  },
  
  // Real-time threat feeds
  PHISHTANK: {
    baseUrl: 'http://data.phishtank.com/data/online-valid.json',
    headers: {},
    rateLimit: 60,
    requiresKey: false
  }
} as const;

// Rate limiting utility
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  canMakeRequest(apiKey: string, limit: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(apiKey) || [];
    
    // Remove requests older than 1 minute
    const recentRequests = requests.filter(time => now - time < 60000);
    
    if (recentRequests.length >= limit) {
      return false;
    }
    
    recentRequests.push(now);
    this.requests.set(apiKey, recentRequests);
    return true;
  }
  
  async waitForSlot(apiKey: string, limit: number): Promise<void> {
    while (!this.canMakeRequest(apiKey, limit)) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export const rateLimiter = new RateLimiter();

// Generic API request function
export async function makeApiRequest<T>(
  apiName: keyof typeof API_CONFIGS,
  endpoint: string,
  params: Record<string, any> = {}
): Promise<T | null> {
  const config = API_CONFIGS[apiName];
  
  // Check if API key is required but missing
  if (config.requiresKey && !Object.values(config.headers || {}).some(v => v && v.trim() !== '')) {
    console.warn(`API key required for ${apiName} but not provided`);
    return null;
  }
  
  // Rate limiting
  await rateLimiter.waitForSlot(apiName, config.rateLimit);
  
  try {
    const url = new URL(endpoint, config.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: config.headers,
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error making request to ${apiName}:`, error);
    // Return null instead of throwing to prevent unhandled promise rejections
    return null;
  }
}

// Specific API integration functions
export const ApiIntegration = {
  // IP Reputation Check
  async checkIpReputation(ip: string) {
    const results = await Promise.allSettled([
      makeApiRequest('ABUSEIPDB', '/check', { ipAddress: ip, maxAgeInDays: 90 }),
      makeApiRequest('IP_API', `/${ip}`),
      makeApiRequest('VIRUSTOTAL', `/ip_addresses/${ip}`)
    ]);
    
    return {
      abuseipdb: results[0].status === 'fulfilled' ? results[0].value : null,
      ipapi: results[1].status === 'fulfilled' ? results[1].value : null,
      virustotal: results[2].status === 'fulfilled' ? results[2].value : null
    };
  },
  
  // Domain/URL Analysis
  async analyzeUrl(url: string) {
    const results = await Promise.allSettled([
      makeApiRequest('VIRUSTOTAL', `/urls`, { url }),
      makeApiRequest('URLHAUS', '/url/', { url })
    ]);
    
    return {
      virustotal: results[0].status === 'fulfilled' ? results[0].value : null,
      urlhaus: results[1].status === 'fulfilled' ? results[1].value : null
    };
  },
  
  // Get recent vulnerabilities
  async getRecentVulnerabilities(limit = 20) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const startDate = thirtyDaysAgo.toISOString().split('T')[0] + 'T00:00:00.000';
    
    return await makeApiRequest('NVD_NIST', '', {
      lastModStartDate: startDate,
      resultsPerPage: limit
    });
  },
  
  // Get IP geolocation with threat intelligence
  async getIpGeolocation(ip: string) {
    const apiKey = import.meta.env.VITE_IP_GEOLOCATION_API_KEY;
    if (apiKey) {
      return await makeApiRequest('IP_GEOLOCATION', '', { 
        ip, 
        apiKey,
        security: 1 // Include security threat data
      });
    }
    
    // Fallback to free IP-API
    return await makeApiRequest('IP_API', `/${ip}`);
  },
  
  // Get phishing URLs
  async getPhishingThreats() {
    return await makeApiRequest('PHISHTANK', '');
  }
};

// Data transformation utilities
export const DataTransformers = {
  // Transform API data to our internal threat format
  transformToThreatData(apiData: any, source: string) {
    // This would transform various API responses to our standard ThreatData format
    // Implementation depends on specific API response formats
    return {
      id: `real_${Date.now()}`,
      sourceIp: apiData.ip || 'unknown',
      targetIp: '0.0.0.0',
      sourceCountry: apiData.country || 'unknown',
      targetCountry: 'unknown',
      latitude: apiData.lat || 0,
      longitude: apiData.lon || 0,
      threatType: apiData.threat_type || 'unknown',
      severity: apiData.severity || 'medium',
      timestamp: new Date(),
      description: apiData.description || 'Real threat detected',
      attackVector: apiData.attack_vector || 'network',
      port: apiData.port || 80,
      confidence: apiData.confidence || 75,
      source: source
    };
  }
};