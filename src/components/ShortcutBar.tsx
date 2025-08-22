import { Heart, BookOpen, Clock, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ShortcutBar = () => {
  const shortcuts = [
    {
      id: 'quran',
      icon: BookOpen,
      label: 'القرآن',
      color: 'text-islamic-green',
      bgColor: 'bg-islamic-green-light',
    },
    {
      id: 'azkar',
      icon: Heart,
      label: 'الأذكار',
      color: 'text-islamic-blue',
      bgColor: 'bg-islamic-blue-light',
    },
    {
      id: 'tasbih',
      icon: Compass,
      label: 'السبحة',
      color: 'text-islamic-gold',
      bgColor: 'bg-islamic-gold-light',
    },
    {
      id: 'prayer',
      icon: Clock,
      label: 'المواقيت',
      color: 'text-islamic-purple',
      bgColor: 'bg-islamic-purple-light',
    },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Card className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 p-2 shadow-islamic bg-background/95 backdrop-blur-md border border-border/50">
      <div className="flex items-center gap-2">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon;
          return (
            <Button
              key={shortcut.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(shortcut.id)}
              className={`flex flex-col items-center gap-1 h-auto p-2 hover:${shortcut.bgColor} transition-all`}
            >
              <div className={`w-8 h-8 rounded-full ${shortcut.bgColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${shortcut.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{shortcut.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ShortcutBar;