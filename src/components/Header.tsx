import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const menuItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'quran', label: 'القرآن الكريم' },
    { id: 'azkar', label: 'الأذكار' },
    { id: 'tasbih', label: 'السبحة' },
    { id: 'prayer', label: 'مواقيت الصلاة' },
    { id: 'duas', label: 'الإهداءات' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-islamic-green flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">ذ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-islamic-green">ذكرى طيبة</h1>
              <p className="text-xs text-muted-foreground">صدقة جارية</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-islamic-green hover:bg-islamic-green-light"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <Card className="md:hidden mt-4 p-4 shadow-islamic">
            <nav className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className="justify-start text-foreground hover:text-islamic-green hover:bg-islamic-green-light"
                >
                  {item.label}
                </Button>
              ))}
            </nav>
          </Card>
        )}
      </div>
    </header>
  );
};

export default Header;