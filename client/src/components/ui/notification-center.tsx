import React, { useState, useEffect } from "react";
import { Bell, X, AlertTriangle, Shield, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  source: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Critical Threat Detected',
      message: 'APT29 activity detected on endpoint DESKTOP-ABC123. Process injection in explorer.exe.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      source: 'ThreatHunter AI'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Suspicious Network Activity',
      message: 'Unusual outbound traffic detected to malicious-domain.com from 192.168.1.45.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      source: 'Network Monitor'
    },
    {
      id: '3',
      type: 'info',
      title: 'System Update',
      message: 'MITRE ATT&CK framework database updated with 15 new techniques.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      read: true,
      source: 'System'
    },
    {
      id: '4',
      type: 'success',
      title: 'Threat Mitigated',
      message: 'Malware sample successfully quarantined and analyzed.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true,
      source: 'EDR System'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  // Add new notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.7 ? 'critical' : 'warning',
          title: 'New Security Event',
          message: 'Real-time security event detected and analyzed.',
          timestamp: new Date(),
          read: false,
          source: 'AI Engine'
        };
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-red-400 bg-red-400/5';
      case 'warning': return 'border-l-yellow-400 bg-yellow-400/5';
      case 'info': return 'border-l-blue-400 bg-blue-400/5';
      case 'success': return 'border-l-green-400 bg-green-400/5';
      default: return 'border-l-gray-400 bg-gray-400/5';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'critical') return notif.type === 'critical';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4">
      <Card className="w-96 max-h-[80vh] bg-[var(--cyber-dark)] border-[var(--cyber-cyan)]/30 shadow-2xl">
        <CardHeader className="border-b border-[var(--cyber-cyan)]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[var(--cyber-cyan)]" />
              <CardTitle className="text-[var(--cyber-cyan)] font-orbitron">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" onClick={onClose} className="w-8 h-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2 mt-4">
            <Button
              size="sm"
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="text-xs"
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === 'unread' ? 'default' : 'outline'}
              onClick={() => setFilter('unread')}
              className="text-xs"
            >
              Unread ({unreadCount})
            </Button>
            <Button
              size="sm"
              variant={filter === 'critical' ? 'default' : 'outline'}
              onClick={() => setFilter('critical')}
              className="text-xs"
            >
              Critical
            </Button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              className="text-xs mt-2"
            >
              Mark All Read
            </Button>
          )}
        </CardHeader>
        
        <CardContent className="p-0 max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No notifications to display
            </div>
          ) : (
            <div className="space-y-1">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 transition-all duration-200 cursor-pointer
                    ${getTypeColor(notification.type)}
                    ${!notification.read ? 'bg-[var(--cyber-cyan)]/5' : 'hover:bg-[var(--cyber-navy)]/30'}
                  `}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-semibold text-white truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-[var(--cyber-cyan)] rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {notification.source}
                          </span>
                          <span className="text-xs text-gray-400">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="w-6 h-6 p-0 ml-2"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}