import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  LogIn, 
  UserPlus, 
  Home,
  Settings,
  Users,
  BookOpen
} from "lucide-react";

interface AuthNavbarProps {
  currentPath?: string;
}

export default function AuthNavbar({ currentPath }: AuthNavbarProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--cyber-dark)]/95 backdrop-blur-md border-b border-[var(--cyber-cyan)]/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--cyber-cyan)] to-blue-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-orbitron font-bold text-[var(--cyber-cyan)]">
                  SOC Defense
                </h1>
                <p className="text-xs text-gray-400">Security Operations Center</p>
              </div>
            </a>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <a className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                <Home className="w-4 h-4" />
                <span>Início</span>
              </a>
            </Link>
            
            <Link href="/soc-dashboard">
              <a className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/soc-dashboard') 
                  ? 'bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                <Shield className="w-4 h-4" />
                <span>SOC Dashboard</span>
              </a>
            </Link>

            <Link href="/student-dashboard">
              <a className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/student-dashboard') 
                  ? 'bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                <BookOpen className="w-4 h-4" />
                <span>Estudante</span>
              </a>
            </Link>

            <Link href="/admin">
              <a className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                isActive('/admin') 
                  ? 'bg-[var(--cyber-cyan)]/20 text-[var(--cyber-cyan)]' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                <Users className="w-4 h-4" />
                <span>Admin</span>
              </a>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-[var(--cyber-cyan)] text-black hover:bg-cyan-400">
                <UserPlus className="w-4 h-4 mr-2" />
                Cadastrar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}