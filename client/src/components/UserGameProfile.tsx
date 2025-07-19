import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Trophy, 
  Award, 
  Target, 
  BookOpen,
  Star,
  Shield,
  Zap,
  Crown
} from "lucide-react";

interface UserGameProfileProps {
  className?: string;
}

interface UserData {
  user: {
    id: number;
    username: string;
  };
  gamification: {
    totalPoints: number;
    level: number;
    achievements: number;
    certifications: number;
    coursesCompleted: number;
    totalCourses: number;
  };
}

export default function UserGameProfile({ className = "" }: UserGameProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const response = await fetch(`/api/user/${user.id}`);
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Card className={`glass-panel border-[var(--cyber-cyan)]/30 ${className}`}>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userData) return null;

  const { user, gamification } = userData;
  
  // Calculate progress to next level
  const currentLevelPoints = (gamification.level - 1) * 100;
  const nextLevelPoints = gamification.level * 100;
  const progressToNextLevel = ((gamification.totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;

  const getLevelIcon = () => {
    if (gamification.level >= 10) return Crown;
    if (gamification.level >= 5) return Shield;
    return Star;
  };

  const LevelIcon = getLevelIcon();

  const getRankTitle = () => {
    if (gamification.level >= 10) return "Cybersec Master";
    if (gamification.level >= 7) return "SOC Expert";
    if (gamification.level >= 5) return "Security Analyst";
    if (gamification.level >= 3) return "Threat Hunter";
    return "Rookie Defender";
  };

  return (
    <Card className={`glass-panel border-[var(--cyber-cyan)]/30 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-[var(--cyber-cyan)]">
            <AvatarFallback className="bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)] font-bold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white truncate">{user.username}</h3>
              <Badge variant="outline" className="border-[var(--cyber-cyan)] text-[var(--cyber-cyan)]">
                <LevelIcon className="w-3 h-3 mr-1" />
                Lv. {gamification.level}
              </Badge>
            </div>
            <p className="text-xs text-gray-400">{getRankTitle()}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Próximo Nível</span>
            <span className="text-sm text-[var(--cyber-cyan)]">
              {gamification.totalPoints} / {nextLevelPoints} XP
            </span>
          </div>
          <Progress 
            value={progressToNextLevel} 
            className="h-2 bg-gray-700"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-gray-400">Pontos</span>
            </div>
            <div className="text-lg font-bold text-white">{gamification.totalPoints}</div>
          </div>
          
          <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-400">Conquistas</span>
            </div>
            <div className="text-lg font-bold text-white">{gamification.achievements}</div>
          </div>
          
          <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-400">Certificados</span>
            </div>
            <div className="text-lg font-bold text-white">{gamification.certifications}</div>
          </div>
          
          <div className="bg-[var(--cyber-dark)]/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center space-x-2 mb-1">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-400">Cursos</span>
            </div>
            <div className="text-lg font-bold text-white">
              {gamification.coursesCompleted}/{gamification.totalCourses}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-2 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Status SOC</span>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-[var(--cyber-cyan)]" />
              <span className="text-xs text-[var(--cyber-cyan)]">Online</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}