import { Heart, BookOpen, Clock, Compass, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const ShortcutBar = () => {
  const navigate = useNavigate();
  
  const shortcuts = [
    {
      id: 'quran',
      icon: BookOpen,
      label: 'القرآن',
      color: 'text-islamic-green',
      bgColor: 'bg-islamic-green-light',
      route: '/quran',
    },
    {
      id: 'azkar',
      icon: Heart,
      label: 'الأذكار',
      color: 'text-islamic-purple',
      bgColor: 'bg-islamic-purple-light',
      route: '/azkar',
    },
    {
      id: 'tasbih',
      icon: Compass,
      label: 'السبحة',
      color: 'text-islamic-gold',
      bgColor: 'bg-islamic-gold-light',
      route: '/tasbih',
    },
    {
      id: 'prayer',
      icon: Clock,
      label: 'المواقيت',
      color: 'text-islamic-blue',
      bgColor: 'bg-islamic-blue-light',
      route: '/prayer',
    },
    {
      id: 'qibla',
      icon: Navigation,
      label: 'القبلة',
      color: 'text-islamic-green',
      bgColor: 'bg-islamic-green-light',
      route: '/qibla',
    },
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-40 p-3 shadow-islamic bg-background/95 backdrop-blur-md border border-border/50 mx-auto max-w-lg">
      <div className="grid grid-cols-5 gap-2">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <Button
              key={shortcut.id}
              variant="ghost"
              size="lg"
              onClick={() => handleNavigation(shortcut.route)}
              className="flex flex-col items-center gap-2 h-auto p-3 hover:bg-accent transition-all"
            >
              <div className={`w-12 h-12 rounded-full ${shortcut.bgColor} flex items-center justify-center shadow-sm`}>
                <Icon className={`w-6 h-6 ${shortcut.color}`} />
              </div>
              <span className="text-xs font-medium text-foreground">{shortcut.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ShortcutBar;