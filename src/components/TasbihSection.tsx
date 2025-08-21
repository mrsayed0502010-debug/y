import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Minus, RotateCcw } from 'lucide-react';

const TasbihSection = () => {
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [currentZikr, setCurrentZikr] = useState('سُبْحَانَ اللهِ');

  const azkarList = [
    'سُبْحَانَ اللهِ',
    'الْحَمْدُ للهِ',
    'اللهُ أَكْبَرُ',
    'لَا إِلَهَ إِلَّا اللهُ',
    'أَسْتَغْفِرُ اللهَ',
    'سُبْحَانَ اللهِ وَبِحَمْدِهِ',
    'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ'
  ];

  // Load saved data from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('tasbih-count');
    const savedTotal = localStorage.getItem('tasbih-total');
    const savedTarget = localStorage.getItem('tasbih-target');
    const savedZikr = localStorage.getItem('tasbih-zikr');

    if (savedCount) setCount(parseInt(savedCount));
    if (savedTotal) setTotalCount(parseInt(savedTotal));
    if (savedTarget) setTarget(parseInt(savedTarget));
    if (savedZikr) setCurrentZikr(savedZikr);
  }, []);

  // Save to localStorage when values change
  useEffect(() => {
    localStorage.setItem('tasbih-count', count.toString());
    localStorage.setItem('tasbih-total', totalCount.toString());
    localStorage.setItem('tasbih-target', target.toString());
    localStorage.setItem('tasbih-zikr', currentZikr);
  }, [count, totalCount, target, currentZikr]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setTotalCount(totalCount + 1);
    
    // Check if target is reached
    if (newCount >= target) {
      setCount(0);
      // Vibrate if supported
      if ('vibrate' in navigator && navigator.vibrate) {
        navigator.vibrate(200);
      }
    }
  };

  const reset = () => {
    setCount(0);
  };

  const resetAll = () => {
    setCount(0);
    setTotalCount(0);
  };

  const updateTarget = (newTarget: number) => {
    if (newTarget > 0) {
      setTarget(newTarget);
      setCount(0);
    }
  };

  const progress = (count / target) * 100;

  return (
    <section id="tasbih" className="py-20 bg-islamic-gold-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <RefreshCw className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-islamic-green">السبحة الإلكترونية</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            سبحة رقمية لعد الأذكار والتسبيح
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="p-8 text-center shadow-islamic">
            {/* Current Zikr */}
            <div className="mb-8">
              <select 
                value={currentZikr}
                onChange={(e) => setCurrentZikr(e.target.value)}
                className="w-full p-3 border rounded-lg bg-background text-center text-lg font-quran text-islamic-green"
              >
                {azkarList.map((zikr) => (
                  <option key={zikr} value={zikr}>{zikr}</option>
                ))}
              </select>
            </div>

            {/* Progress Ring */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.827} 282.7`}
                  className="text-islamic-green transition-all duration-300"
                />
              </svg>
              
              {/* Count Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-islamic-green">{count}</span>
                <span className="text-sm text-muted-foreground">من {target}</span>
              </div>
            </div>

            {/* Target Controls */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">الهدف</p>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTarget(target - 1)}
                  disabled={target <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 bg-islamic-green-light rounded text-islamic-green font-bold min-w-[60px]">
                  {target}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateTarget(target + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Target Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[33, 66, 99, 100].map((num) => (
                <Button
                  key={num}
                  variant={target === num ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateTarget(num)}
                  className="text-xs"
                >
                  {num}
                </Button>
              ))}
            </div>

            {/* Main Counter Button */}
            <Button
              onClick={increment}
              className="w-full h-16 text-xl font-bold bg-islamic-green hover:bg-islamic-green/90 mb-4"
            >
              سَبِّح
            </Button>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button
                variant="outline"
                onClick={reset}
                className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-primary-foreground"
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                إعادة تعيين
              </Button>
              <Button
                variant="outline"
                onClick={resetAll}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                مسح الكل
              </Button>
            </div>

            {/* Total Count */}
            <Card className="p-4 bg-islamic-gold-light">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">العدد الإجمالي</p>
                <p className="text-2xl font-bold text-islamic-gold">{totalCount.toLocaleString()}</p>
              </div>
            </Card>
          </Card>

          {/* Usage Tips */}
          <Card className="mt-6 p-4 bg-accent">
            <h3 className="font-bold text-center mb-2">نصائح الاستخدام</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• اضغط على "سَبِّح" لزيادة العدد</li>
              <li>• يتم حفظ التقدم تلقائياً</li>
              <li>• اختر الذكر من القائمة المنسدلة</li>
              <li>• عند الوصول للهدف يبدأ العد من جديد</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TasbihSection;