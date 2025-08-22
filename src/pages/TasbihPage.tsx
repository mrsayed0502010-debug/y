import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RotateCcw, Plus, Minus, ArrowLeft, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TasbihPage = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100);
  const [customDhikr, setCustomDhikr] = useState('سبحان الله');
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const predefinedDhikr = [
    'سبحان الله',
    'الحمد لله',
    'الله أكبر',
    'لا إله إلا الله',
    'استغفر الله',
    'لا حول ولا قوة إلا بالله',
    'سبحان الله وبحمده',
    'سبحان الله العظيم'
  ];

  useEffect(() => {
    const savedCount = localStorage.getItem('tasbih-count');
    const savedTarget = localStorage.getItem('tasbih-target');
    const savedDhikr = localStorage.getItem('tasbih-dhikr');
    const savedTotal = localStorage.getItem('tasbih-total');
    
    if (savedCount) setCount(parseInt(savedCount));
    if (savedTarget) setTarget(parseInt(savedTarget));
    if (savedDhikr) setCustomDhikr(savedDhikr);
    if (savedTotal) setTotalCount(parseInt(savedTotal));
  }, []);

  const saveToStorage = (newCount: number, newTotal: number) => {
    localStorage.setItem('tasbih-count', newCount.toString());
    localStorage.setItem('tasbih-target', target.toString());
    localStorage.setItem('tasbih-dhikr', customDhikr);
    localStorage.setItem('tasbih-total', newTotal.toString());
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    const newTotal = totalCount + 1;
    setCount(newCount);
    setTotalCount(newTotal);
    saveToStorage(newCount, newTotal);

    // Reset count if target reached
    if (newCount >= target) {
      setTimeout(() => {
        setCount(0);
        saveToStorage(0, newTotal);
      }, 1000);
    }
  };

  const handleReset = () => {
    setCount(0);
    saveToStorage(0, totalCount);
  };

  const handleResetAll = () => {
    setCount(0);
    setTotalCount(0);
    saveToStorage(0, 0);
  };

  const progress = target > 0 ? (count / target) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-islamic-gold-light/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4 text-islamic-gold border-islamic-gold hover:bg-islamic-gold hover:text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-islamic-gold flex items-center justify-center text-primary-foreground">
              <span className="text-sm">⚪</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-gold">السبحة الإلكترونية</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            احسب الأذكار والتسبيح • يتم الحفظ تلقائياً
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Current Dhikr */}
          <Card className="p-6 text-center">
            <h2 className="text-2xl font-quran text-islamic-gold mb-4">
              {customDhikr}
            </h2>
            
            {/* Count Display */}
            <div className="relative mb-6">
              <div className="w-40 h-40 mx-auto rounded-full border-8 border-islamic-gold-light flex items-center justify-center mb-4 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-islamic-gold-light rounded-full transform origin-bottom transition-transform duration-300"
                  style={{ 
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((progress * 3.6 - 90) * Math.PI / 180)}% ${50 - 50 * Math.sin((progress * 3.6 - 90) * Math.PI / 180)}%, 50% 50%)`,
                    backgroundColor: progress >= 100 ? 'hsl(var(--islamic-gold))' : 'hsl(var(--islamic-gold-light))'
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-islamic-gold mb-1">
                    {count}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    من {target}
                  </div>
                </div>
              </div>
              
              {progress >= 100 && (
                <div className="text-center text-islamic-gold font-bold text-lg animate-pulse">
                  مبروك! أكملت الهدف 🎉
                </div>
              )}
            </div>

            {/* Main Counter Button */}
            <Button
              onClick={handleIncrement}
              className="w-32 h-32 rounded-full text-xl font-bold bg-islamic-gold hover:bg-islamic-gold/90 text-primary-foreground mb-4"
            >
              <Plus className="w-8 h-8" />
            </Button>

            {/* Total Count */}
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                العدد الإجمالي: <span className="font-bold text-islamic-gold">{totalCount}</span>
              </p>
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-4">
            <h3 className="font-bold mb-4 text-center">الإعدادات</h3>
            
            {/* Target Setting */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">الهدف:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTarget(Math.max(1, target - 10))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTarget(target + 10)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Dhikr Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">الذكر:</label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {predefinedDhikr.map((dhikr) => (
                  <Button
                    key={dhikr}
                    variant={customDhikr === dhikr ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCustomDhikr(dhikr)}
                    className="text-xs h-auto py-2 px-2"
                  >
                    {dhikr}
                  </Button>
                ))}
              </div>
              <Input
                value={customDhikr}
                onChange={(e) => setCustomDhikr(e.target.value)}
                placeholder="أو اكتب ذكراً مخصصاً..."
                className="text-right"
              />
            </div>

            {/* Reset Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="text-islamic-gold border-islamic-gold hover:bg-islamic-gold hover:text-primary-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                إعادة تعيين العدد
              </Button>
              <Button
                variant="outline"
                onClick={handleResetAll}
                className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                مسح الكل
              </Button>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TasbihPage;