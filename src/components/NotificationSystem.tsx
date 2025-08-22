import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'azkar' | 'salawat' | 'prayer';
  time: Date;
}

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  // أذكار الصباح والمساء والإشعارات
  const azkarReminders = [
    { time: '06:00', message: 'حان وقت أذكار الصباح 🌅', type: 'azkar' as const },
    { time: '18:00', message: 'حان وقت أذكار المساء 🌙', type: 'azkar' as const },
  ];

  // تذكير بالصلاة على النبي
  const salawatReminders = [
    'صلِّ على النبي ﷺ - اللهم صل وسلم على نبينا محمد',
    'لا تنس الصلاة على النبي ﷺ - صلى الله عليه وسلم',
    'اللهم صل وسلم وبارك على سيدنا محمد ﷺ',
    'قال ﷺ: من صلى علي صلاة صلى الله عليه بها عشراً',
  ];

  // إضافة إشعار جديد
  const addNotification = (title: string, message: string, type: 'azkar' | 'salawat' | 'prayer') => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      time: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    setIsVisible(true);
    
    // إخفاء الإشعار تلقائياً بعد 8 ثوان
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 8000);
  };

  // إزالة إشعار
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // التحقق من أوقات الأذكار
  useEffect(() => {
    const checkAzkarTime = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      azkarReminders.forEach(reminder => {
        if (currentTime === reminder.time) {
          addNotification('تذكير بالأذكار', reminder.message, reminder.type);
        }
      });
    };

    // التحقق كل دقيقة
    const azkarInterval = setInterval(checkAzkarTime, 60000);

    // تذكير بالصلاة على النبي كل 30 دقيقة
    const salawatInterval = setInterval(() => {
      const randomMessage = salawatReminders[Math.floor(Math.random() * salawatReminders.length)];
      addNotification('صل على النبي ﷺ', randomMessage, 'salawat');
    }, 30 * 60 * 1000); // 30 دقيقة

    return () => {
      clearInterval(azkarInterval);
      clearInterval(salawatInterval);
    };
  }, []);

  if (!isVisible || notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Card key={notification.id} className="p-4 max-w-sm shadow-islamic bg-background/95 backdrop-blur-md border-l-4 border-l-islamic-green animate-in slide-in-from-right">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-islamic-green-light flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-islamic-green" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-foreground mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {notification.time.toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeNotification(notification.id)}
              className="w-6 h-6 p-0 hover:bg-destructive/10"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationSystem;