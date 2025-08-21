import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, MapPin, Volume2, VolumeX } from 'lucide-react';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerSection = () => {
  const [city, setCity] = useState('Cairo');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAdhanEnabled, setIsAdhanEnabled] = useState(false);

  // Sample prayer times (in real app, you'd fetch from an API)
  const samplePrayerTimes: PrayerTimes = {
    Fajr: '04:45',
    Dhuhr: '12:15',
    Asr: '15:30',
    Maghrib: '18:20',
    Isha: '19:45'
  };

  useEffect(() => {
    setPrayerTimes(samplePrayerTimes);
    
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchPrayerTimes = async () => {
    setLoading(true);
    try {
      // In a real app, you'd use an API like:
      // https://api.aladhan.com/v1/timingsByCity?city=${city}&country=&method=2
      // For now, we'll simulate with sample data
      setTimeout(() => {
        setPrayerTimes(samplePrayerTimes);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setLoading(false);
    }
  };

  const prayerNames = {
    Fajr: 'الفجر',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
  };

  const getCurrentPrayer = () => {
    if (!prayerTimes) return null;
    
    const now = currentTime.getHours() * 100 + currentTime.getMinutes();
    const prayers = Object.entries(prayerTimes).map(([name, time]) => {
      const [hour, minute] = time.split(':').map(Number);
      return { name, time: hour * 100 + minute };
    });

    for (let i = 0; i < prayers.length; i++) {
      if (now < prayers[i].time) {
        return i === 0 ? prayers[prayers.length - 1] : prayers[i - 1];
      }
    }
    return prayers[prayers.length - 1];
  };

  const getNextPrayer = () => {
    if (!prayerTimes) return null;
    
    const now = currentTime.getHours() * 100 + currentTime.getMinutes();
    const prayers = Object.entries(prayerTimes).map(([name, time]) => {
      const [hour, minute] = time.split(':').map(Number);
      return { name, time: hour * 100 + minute };
    });

    for (const prayer of prayers) {
      if (now < prayer.time) {
        return prayer;
      }
    }
    return prayers[0]; // Next day's Fajr
  };

  const currentPrayer = getCurrentPrayer();
  const nextPrayer = getNextPrayer();

  return (
    <section id="prayer" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-islamic-blue" />
            <h2 className="text-3xl md:text-4xl font-bold text-islamic-green">مواقيت الصلاة</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            مواقيت الصلاة والأذان
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* City Input */}
          <Card className="p-4 mb-8">
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="w-5 h-5 text-islamic-blue" />
                <Input
                  placeholder="أدخل اسم المدينة..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="text-right"
                />
              </div>
              <Button 
                onClick={fetchPrayerTimes}
                disabled={loading}
                className="bg-islamic-blue hover:bg-islamic-blue/90"
              >
                {loading ? 'جاري البحث...' : 'بحث'}
              </Button>
            </div>
          </Card>

          {/* Current Time & Next Prayer */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 text-center bg-islamic-green-light">
              <h3 className="text-lg font-bold text-islamic-green mb-2">الوقت الحالي</h3>
              <p className="text-3xl font-bold text-foreground">
                {currentTime.toLocaleTimeString('ar-EG', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {currentTime.toLocaleDateString('ar-EG', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </Card>

            <Card className="p-6 text-center bg-islamic-blue-light">
              <h3 className="text-lg font-bold text-islamic-blue mb-2">الصلاة القادمة</h3>
              {nextPrayer && (
                <>
                  <p className="text-2xl font-bold text-foreground">
                    {prayerNames[nextPrayer.name as keyof typeof prayerNames]}
                  </p>
                  <p className="text-xl text-islamic-blue">
                    {prayerTimes?.[nextPrayer.name as keyof PrayerTimes]}
                  </p>
                </>
              )}
            </Card>
          </div>

          {/* Prayer Times */}
          {prayerTimes && (
            <Card className="p-6 mb-8">
              <h3 className="text-xl font-bold text-center mb-6 text-islamic-green">
                مواقيت الصلاة - {city}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <div
                    key={prayer}
                    className={`text-center p-4 rounded-lg border transition-all ${
                      currentPrayer?.name === prayer
                        ? 'bg-islamic-green text-primary-foreground border-islamic-green'
                        : 'bg-background border-border hover:border-islamic-green'
                    }`}
                  >
                    <h4 className="font-bold text-lg mb-2">
                      {prayerNames[prayer as keyof typeof prayerNames]}
                    </h4>
                    <p className="text-xl font-mono">{time}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Adhan Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-center mb-4 text-islamic-green">
              إعدادات الأذان
            </h3>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isAdhanEnabled ? "default" : "outline"}
                onClick={() => setIsAdhanEnabled(!isAdhanEnabled)}
                className="flex items-center gap-2"
              >
                {isAdhanEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                {isAdhanEnabled ? 'الأذان مفعل' : 'تفعيل الأذان'}
              </Button>
            </div>
            
            {isAdhanEnabled && (
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  سيتم تشغيل الأذان تلقائياً عند دخول وقت الصلاة
                </p>
              </div>
            )}
          </Card>

          {/* Reference Link */}
          <div className="text-center mt-8">
            <Card className="p-4 bg-accent">
              <p className="text-muted-foreground">
                للمزيد من مواقيت الصلاة الدقيقة، يرجى زيارة:
                <a href="https://timesprayer.com/prayer-times-in-cairo.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-islamic-blue hover:underline mr-2">
                  موقع أوقات الصلاة
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerSection;