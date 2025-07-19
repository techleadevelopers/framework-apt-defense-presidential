import { useState, useEffect } from 'react';
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

export default function UserResume() {
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
      <div className="p-4 border-b border-[var(--cyber-cyan)]/30">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4 border-b border-[var(--cyber-cyan)]/30">
        <div className="text-center text-gray-400 text-sm">
          No user data available
        </div>
      </div>
    );
  }

  const { user, gamification } = userData;
  const experienceNeededForNextLevel = gamification.level * 1000;
  const currentLevelProgress = (gamification.totalPoints % 1000) / 10;
  const completionPercentage = Math.round((gamification.coursesCompleted / gamification.totalCourses) * 100);

  const getLevelIcon = (level: number) => {
    if (level >= 10) return <Crown className="w-4 h-4 text-yellow-400" />;
    if (level >= 5) return <Shield className="w-4 h-4 text-blue-400" />;
    return <Star className="w-4 h-4 text-[var(--cyber-cyan)]" />;
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return "text-yellow-400";
    if (level >= 5) return "text-blue-400";
    return "text-[var(--cyber-cyan)]";
  };

  return (
    <div className="p-4 border-b border-[var(--cyber-cyan)]/30">
      <div className="space-y-3">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 border-2 border-[var(--cyber-cyan)]/30">
            <AvatarFallback className="bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)] font-bold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-white truncate">{user.username}</h3>
              {getLevelIcon(gamification.level)}
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`text-xs px-2 py-0 ${getLevelColor(gamification.level)} border-current`}
              >
                Level {gamification.level}
              </Badge>
              <span className="text-xs text-gray-400">{gamification.totalPoints} pts</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Experience</span>
            <span>{Math.round(currentLevelProgress)}%</span>
          </div>
          <Progress 
            value={currentLevelProgress} 
            className="h-2 bg-[var(--cyber-steel)]/30"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span className="text-gray-400">{gamification.achievements}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-3 h-3 text-blue-400" />
            <span className="text-gray-400">{gamification.certifications}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-3 h-3 text-green-400" />
            <span className="text-gray-400">{gamification.coursesCompleted}/{gamification.totalCourses}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-3 h-3 text-purple-400" />
            <span className="text-gray-400">{completionPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}