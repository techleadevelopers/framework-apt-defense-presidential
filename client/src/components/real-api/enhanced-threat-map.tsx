// Enhanced Threat Map with Real API Integration
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useThreatData } from '@/hooks/use-threat-data';
import { useRealApiData } from '@/hooks/use-real-api-data';
import { MapPin, Maximize2, Minimize2, RefreshCw, Globe, AlertTriangle } from 'lucide-react';

export default function EnhancedThreatMap() {
  const { activeThreats, threatStats } = useThreatData();
  const { threats: realThreats, isLoading, refreshData } = useRealApiData();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<any>(null);
  const [showRealData, setShowRealData] = useState(false);

  // World map SVG coordinates for major countries
  const countryCoordinates = {
    'United States': { x: 240, y: 150 },
    'China': { x: 580, y: 160 },
    'Russia': { x: 520, y: 100 },
    'Germany': { x: 420, y: 140 },
    'United Kingdom': { x: 400, y: 130 },
    'France': { x: 410, y: 150 },
    'Japan': { x: 640, y: 170 },
    'Brazil': { x: 280, y: 250 },
    'India': { x: 550, y: 200 },
    'Australia': { x: 620, y: 280 },
    'South Korea': { x: 630, y: 170 },
    'Canada': { x: 240, y: 100 },
    'Italy': { x: 430, y: 160 },
    'Spain': { x: 400, y: 170 },
    'Netherlands': { x: 420, y: 130 },
    'Poland': { x: 440, y: 130 },
    'Sweden': { x: 440, y: 110 },
    'Norway': { x: 430, y: 100 },
    'Finland': { x: 450, y: 100 },
    'Turkey': { x: 460, y: 170 },
    'Iran': { x: 500, y: 180 },
    'North Korea': { x: 630, y: 160 },
    'Ukraine': { x: 460, y: 140 },
    'Romania': { x: 450, y: 150 },
    'Czech Republic': { x: 430, y: 140 },
    'Singapore': { x: 580, y: 230 },
    'Hong Kong': { x: 600, y: 190 },
    'Taiwan': { x: 610, y: 190 },
    'Thailand': { x: 570, y: 210 },
    'Vietnam': { x: 580, y: 210 },
    'Malaysia': { x: 575, y: 230 },
    'Indonesia': { x: 590, y: 250 },
    'Philippines': { x: 610, y: 220 },
    'Bangladesh': { x: 560, y: 200 },
    'Pakistan': { x: 530, y: 180 },
    'Afghanistan': { x: 520, y: 170 },
    'Kazakhstan': { x: 520, y: 140 },
    'Uzbekistan': { x: 510, y: 160 },
    'Mongolia': { x: 580, y: 140 },
    'Myanmar': { x: 570, y: 200 },
    'Cambodia': { x: 580, y: 220 },
    'Laos': { x: 575, y: 200 },
    'Israel': { x: 470, y: 180 },
    'Syria': { x: 470, y: 170 },
    'Iraq': { x: 480, y: 180 },
    'Jordan': { x: 470, y: 180 },
    'Lebanon': { x: 470, y: 170 },
    'Cyprus': { x: 460, y: 170 },
    'Georgia': { x: 480, y: 160 },
    'Armenia': { x: 480, y: 165 },
    'Azerbaijan': { x: 485, y: 165 },
    'Saudi Arabia': { x: 485, y: 200 },
    'UAE': { x: 500, y: 200 },
    'Qatar': { x: 495, y: 200 },
    'Kuwait': { x: 485, y: 185 },
    'Bahrain': { x: 495, y: 195 },
    'Oman': { x: 505, y: 210 },
    'Yemen': { x: 485, y: 215 },
    'Egypt': { x: 460, y: 190 },
    'Libya': { x: 440, y: 190 },
    'Algeria': { x: 415, y: 190 },
    'Morocco': { x: 390, y: 180 },
    'Tunisia': { x: 430, y: 175 },
    'Sudan': { x: 460, y: 215 },
    'South Africa': { x: 450, y: 300 },
    'Nigeria': { x: 420, y: 220 },
    'Kenya': { x: 470, y: 240 },
    'Ethiopia': { x: 470, y: 225 },
    'Ghana': { x: 400, y: 220 },
    'Senegal': { x: 380, y: 210 },
    'Mali': { x: 395, y: 210 },
    'Burkina Faso': { x: 405, y: 215 },
    'Niger': { x: 420, y: 210 },
    'Chad': { x: 440, y: 215 },
    'Cameroon': { x: 430, y: 225 },
    'Central African Republic': { x: 440, y: 225 },
    'Democratic Republic of Congo': { x: 450, y: 245 },
    'Republic of Congo': { x: 440, y: 240 },
    'Angola': { x: 440, y: 260 },
    'Zambia': { x: 450, y: 260 },
    'Zimbabwe': { x: 460, y: 270 },
    'Botswana': { x: 450, y: 280 },
    'Namibia': { x: 440, y: 280 },
    'Mozambique': { x: 470, y: 275 },
    'Madagascar': { x: 485, y: 275 },
    'Mauritius': { x: 495, y: 280 },
    'Seychelles': { x: 495, y: 245 },
    'Comoros': { x: 485, y: 265 },
    'Djibouti': { x: 480, y: 220 },
    'Eritrea': { x: 470, y: 215 },
    'Somalia': { x: 485, y: 230 },
    'Uganda': { x: 465, y: 235 },
    'Rwanda': { x: 462, y: 240 },
    'Burundi': { x: 465, y: 245 },
    'Tanzania': { x: 470, y: 250 },
    'Malawi': { x: 467, y: 260 },
    'Lesotho': { x: 452, y: 295 },
    'Eswatini': { x: 465, y: 285 },
    'Gabon': { x: 430, y: 235 },
    'Equatorial Guinea': { x: 425, y: 235 },
    'Sao Tome and Principe': { x: 425, y: 240 },
    'Cape Verde': { x: 355, y: 210 },
    'Gambia': { x: 375, y: 215 },
    'Guinea-Bissau': { x: 375, y: 220 },
    'Guinea': { x: 380, y: 220 },
    'Sierra Leone': { x: 385, y: 225 },
    'Liberia': { x: 385, y: 230 },
    'Ivory Coast': { x: 395, y: 225 },
    'Togo': { x: 405, y: 225 },
    'Benin': { x: 410, y: 225 },
    'Mexico': { x: 220, y: 200 },
    'Guatemala': { x: 210, y: 210 },
    'Belize': { x: 210, y: 205 },
    'El Salvador': { x: 205, y: 215 },
    'Honduras': { x: 205, y: 210 },
    'Nicaragua': { x: 200, y: 220 },
    'Costa Rica': { x: 200, y: 225 },
    'Panama': { x: 195, y: 230 },
    'Colombia': { x: 250, y: 230 },
    'Venezuela': { x: 260, y: 220 },
    'Guyana': { x: 270, y: 225 },
    'Suriname': { x: 275, y: 225 },
    'French Guiana': { x: 280, y: 225 },
    'Ecuador': { x: 240, y: 240 },
    'Peru': { x: 245, y: 260 },
    'Bolivia': { x: 260, y: 270 },
    'Chile': { x: 250, y: 300 },
    'Argentina': { x: 265, y: 320 },
    'Uruguay': { x: 280, y: 310 },
    'Paraguay': { x: 270, y: 285 },
    'Cuba': { x: 225, y: 195 },
    'Jamaica': { x: 220, y: 205 },
    'Haiti': { x: 230, y: 200 },
    'Dominican Republic': { x: 235, y: 200 },
    'Puerto Rico': { x: 245, y: 200 },
    'Bahamas': { x: 235, y: 190 },
    'Barbados': { x: 270, y: 215 },
    'Trinidad and Tobago': { x: 275, y: 220 },
    'Grenada': { x: 275, y: 220 },
    'Saint Vincent and the Grenadines': { x: 275, y: 215 },
    'Saint Lucia': { x: 275, y: 215 },
    'Dominica': { x: 275, y: 210 },
    'Antigua and Barbuda': { x: 275, y: 205 },
    'Saint Kitts and Nevis': { x: 275, y: 205 },
    'Greenland': { x: 340, y: 50 },
    'Iceland': { x: 380, y: 100 },
    'Faroe Islands': { x: 390, y: 105 },
    'Ireland': { x: 395, y: 130 },
    'Malta': { x: 430, y: 175 },
    'Monaco': { x: 415, y: 155 },
    'San Marino': { x: 425, y: 160 },
    'Vatican City': { x: 425, y: 165 },
    'Liechtenstein': { x: 425, y: 150 },
    'Andorra': { x: 405, y: 165 },
    'Luxembourg': { x: 415, y: 145 },
    'Belgium': { x: 415, y: 140 },
    'Switzerland': { x: 420, y: 150 },
    'Austria': { x: 435, y: 150 },
    'Slovenia': { x: 435, y: 155 },
    'Croatia': { x: 440, y: 155 },
    'Bosnia and Herzegovina': { x: 440, y: 160 },
    'Montenegro': { x: 445, y: 160 },
    'Serbia': { x: 445, y: 155 },
    'Albania': { x: 445, y: 165 },
    'North Macedonia': { x: 445, y: 165 },
    'Bulgaria': { x: 450, y: 160 },
    'Moldova': { x: 455, y: 150 },
    'Belarus': { x: 455, y: 130 },
    'Lithuania': { x: 450, y: 125 },
    'Latvia': { x: 450, y: 120 },
    'Estonia': { x: 450, y: 115 },
    'Slovakia': { x: 440, y: 145 },
    'Hungary': { x: 445, y: 150 },
    'Denmark': { x: 425, y: 125 },
    'New Zealand': { x: 670, y: 320 },
    'Papua New Guinea': { x: 640, y: 250 },
    'Fiji': { x: 700, y: 280 },
    'Solomon Islands': { x: 680, y: 260 },
    'Vanuatu': { x: 680, y: 275 },
    'New Caledonia': { x: 675, y: 285 },
    'Samoa': { x: 720, y: 270 },
    'Tonga': { x: 715, y: 285 },
    'Palau': { x: 640, y: 225 },
    'Marshall Islands': { x: 680, y: 225 },
    'Micronesia': { x: 660, y: 225 },
    'Kiribati': { x: 715, y: 235 },
    'Nauru': { x: 680, y: 235 },
    'Tuvalu': { x: 700, y: 255 }
  };

  const displayThreats = showRealData ? realThreats : activeThreats;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getCountryPosition = (country: string) => {
    return countryCoordinates[country] || { x: 400, y: 200 };
  };

  return (
    <Card className={`glass-panel border-[var(--cyber-cyan)]/30 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader>
        <CardTitle className="font-orbitron text-[var(--cyber-cyan)] flex items-center justify-between">
          <span className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Global Threat Map
            <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-400">
              {showRealData ? 'Real API Data' : 'Simulated Data'}
            </Badge>
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRealData(!showRealData)}
              className="border-[var(--cyber-cyan)]/50"
            >
              {showRealData ? 'Show Simulated' : 'Show Real Data'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="border-[var(--cyber-cyan)]/50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-[var(--cyber-cyan)]/50"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* World Map SVG */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-64 md:h-96 bg-[var(--cyber-navy)]/20 rounded-lg border border-[var(--cyber-cyan)]/20"
          >
            {/* Simplified world map paths */}
            <defs>
              <pattern id="gridPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--cyber-cyan)" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            
            {/* Grid background */}
            <rect width="800" height="400" fill="url(#gridPattern)" />
            
            {/* Continents (simplified shapes) */}
            <path d="M 100 100 L 350 100 L 350 200 L 100 200 Z" fill="var(--cyber-steel)" opacity="0.3" />
            <path d="M 370 120 L 650 120 L 650 250 L 370 250 Z" fill="var(--cyber-steel)" opacity="0.3" />
            <path d="M 150 220 L 320 220 L 320 350 L 150 350 Z" fill="var(--cyber-steel)" opacity="0.3" />
            <path d="M 400 200 L 550 200 L 550 320 L 400 320 Z" fill="var(--cyber-steel)" opacity="0.3" />
            <path d="M 600 260 L 720 260 L 720 350 L 600 350 Z" fill="var(--cyber-steel)" opacity="0.3" />
            
            {/* Threat indicators */}
            {displayThreats.slice(0, 50).map((threat, index) => {
              const position = getCountryPosition(threat.sourceCountry || 'United States');
              const severity = threat.severity || 'medium';
              const color = getSeverityColor(severity);
              
              return (
                <g key={index}>
                  {/* Animated pulse effect */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="8"
                    fill={color}
                    opacity="0.3"
                    className="animate-ping"
                  />
                  {/* Main threat dot */}
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r="4"
                    fill={color}
                    stroke="white"
                    strokeWidth="1"
                    className="cursor-pointer hover:r-6 transition-all"
                    onClick={() => setSelectedThreat(threat)}
                  />
                  {/* Threat level indicator */}
                  <text
                    x={position.x}
                    y={position.y - 12}
                    textAnchor="middle"
                    className="text-xs fill-white font-mono"
                    fontSize="10"
                  >
                    {severity.charAt(0).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Threat Details Popup */}
          {selectedThreat && (
            <div className="absolute top-4 right-4 bg-[var(--cyber-navy)] border border-[var(--cyber-cyan)]/50 rounded-lg p-4 max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-[var(--cyber-cyan)]">Threat Details</h4>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Source:</span>
                  <span className="text-white">{selectedThreat.sourceCountry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white">{selectedThreat.threatType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Severity:</span>
                  <Badge className={`text-xs ${
                    selectedThreat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    selectedThreat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    selectedThreat.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {selectedThreat.severity}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">IP:</span>
                  <span className="text-white font-mono">{selectedThreat.sourceIp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white">{selectedThreat.timestamp?.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-400">Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-400">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-xs text-gray-400">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Low</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--cyber-cyan)]">
              {displayThreats.length}
            </div>
            <div className="text-xs text-gray-400">Active Threats</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">
              {displayThreats.filter(t => t.severity === 'critical').length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">
              {displayThreats.filter(t => t.severity === 'high').length}
            </div>
            <div className="text-xs text-gray-400">High</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-400">
              {displayThreats.filter(t => t.severity === 'medium').length}
            </div>
            <div className="text-xs text-gray-400">Medium</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}