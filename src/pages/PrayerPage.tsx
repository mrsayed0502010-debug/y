import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Clock, MapPin, ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PrayerPage = () => {
  const [city, setCity] = useState('القاهرة');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adhanEnabled, setAdhanEnabled] = useState(false);
  const [timeToNext, setTimeToNext] = useState<string>('');
  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);
  const [adhanAudio, setAdhanAudio] = useState<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchPrayerTimes();
  }, [city]);

  useEffect(() => {
    if (prayerTimes) {
      calculateTimeToNext();
    }
  }, [currentTime, prayerTimes]);

  useEffect(() => {
    // Initialize adhan audio
    const audio = new Audio('https://www.islamcan.com/audio/adhan/adhan1.mp3');
    audio.volume = 0.7;
    setAdhanAudio(audio);

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=&method=2`
      );
      const data = await response.json();
      
      if (data.code === 200 && data.data && data.data.timings) {
        const timings = data.data.timings;
        setPrayerTimes({
          Fajr: timings.Fajr,
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha
        });
      } else {
        console.error('فشل في جلب مواقيت الصلاة');
        // Fallback times for Cairo
        setPrayerTimes({
          Fajr: '05:30',
          Dhuhr: '12:00',
          Asr: '15:30',
          Maghrib: '17:45',
          Isha: '19:15'
        });
      }
    } catch (error) {
      console.error('خطأ في جلب مواقيت الصلاة:', error);
      setPrayerTimes({
        Fajr: '05:30',
        Dhuhr: '12:00',
        Asr: '15:30',
        Maghrib: '17:45',
        Isha: '19:15'
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeToNext = () => {
    if (!prayerTimes) return;

    const now = new Date();
    const prayers = [
      { name: 'الفجر', time: prayerTimes.Fajr },
      { name: 'الظهر', time: prayerTimes.Dhuhr },
      { name: 'العصر', time: prayerTimes.Asr },
      { name: 'المغرب', time: prayerTimes.Maghrib },
      { name: 'العشاء', time: prayerTimes.Isha }
    ];

    const todayPrayers = prayers.map(prayer => {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);
      return { ...prayer, date: prayerTime };
    });

    // Find next prayer
    let nextPrayer = todayPrayers.find(prayer => prayer.date > now);
    
    if (!nextPrayer) {
      // Next prayer is tomorrow's Fajr
      nextPrayer = { ...todayPrayers[0] };
      nextPrayer.date.setDate(nextPrayer.date.getDate() + 1);
    }

    const timeDiff = nextPrayer.date.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    setTimeToNext(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  };

  const prayerNames: { [key: string]: string } = {
    Fajr: 'الفجر',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
  };

  const getCurrentPrayer = () => {
    if (!prayerTimes) return 'غير محدد';
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const prayers = Object.entries(prayerTimes).map(([name, time]) => {
      const [hour, minute] = time.split(':').map(Number);
      return { name, timeMinutes: hour * 60 + minute };
    });

    prayers.sort((a, b) => a.timeMinutes - b.timeMinutes);

    for (let i = 0; i < prayers.length; i++) {
      const nextIndex = (i + 1) % prayers.length;
      const currentPrayerTime = prayers[i].timeMinutes;
      const nextPrayerTime = prayers[nextIndex].timeMinutes;

      if (nextPrayerTime > currentPrayerTime) {
        if (currentTime >= currentPrayerTime && currentTime < nextPrayerTime) {
          return prayerNames[prayers[i].name];
        }
      } else {
        if (currentTime >= currentPrayerTime || currentTime < nextPrayerTime) {
          return prayerNames[prayers[i].name];
        }
      }
    }

    return 'غير محدد';
  };

  const playAdhan = () => {
    if (adhanAudio) {
      if (isPlayingAdhan) {
        adhanAudio.pause();
        setIsPlayingAdhan(false);
      } else {
        adhanAudio.currentTime = 0;
        adhanAudio.play().then(() => {
          setIsPlayingAdhan(true);
        }).catch(console.error);

        adhanAudio.onended = () => {
          setIsPlayingAdhan(false);
        };
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-islamic-blue-light/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4 text-islamic-blue border-islamic-blue hover:bg-islamic-blue hover:text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-islamic-blue" />
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-blue">مواقيت الصلاة</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            مواقيت الصلاة الدقيقة لمدينتك
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* City Input */}
          <Card className="p-4">
            <div className="flex gap-2">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="أدخل اسم المدينة..."
                className="text-right"
                onKeyPress={(e) => e.key === 'Enter' && fetchPrayerTimes()}
              />
              <Button
                onClick={fetchPrayerTimes}
                disabled={loading}
                className="bg-islamic-blue hover:bg-islamic-blue/90"
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Current Time & Status */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">الوقت الحالي</h3>
              <p className="text-2xl font-bold text-islamic-blue">
                {currentTime.toLocaleTimeString('ar-EG', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                })}
              </p>
            </Card>

            <Card className="p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">الصلاة الحالية</h3>
              <p className="text-xl font-bold text-islamic-gold">
                {getCurrentPrayer()}
              </p>
            </Card>

            <Card className="p-4 text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">وقت الصلاة القادمة</h3>
              <p className="text-lg font-bold text-islamic-green">
                {timeToNext}
              </p>
            </Card>
          </div>

          {/* Prayer Times */}
          {prayerTimes && (
            <Card className="p-6">
              <h3 className="text-xl font-bold text-center mb-6 text-islamic-blue">
                مواقيت الصلاة - {city}
              </h3>
              
              <div className="space-y-4">
                {Object.entries(prayerTimes).map(([prayer, time]) => (
                  <div
                    key={prayer}
                    className="flex justify-between items-center p-4 rounded-lg bg-accent/50 border border-border/50"
                  >
                    <div className="text-right">
                      <h4 className="font-bold text-lg text-islamic-blue">
                        {prayerNames[prayer]}
                      </h4>
                    </div>
                    <div className="text-left">
                      <p className="text-xl font-bold text-foreground">
                        {time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Adhan Controls */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-center mb-6 text-islamic-blue">
              الأذان والإشعارات
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/50">
                <div className="text-right">
                  <h4 className="font-medium">تفعيل إشعارات الأذان</h4>
                  <p className="text-sm text-muted-foreground">
                    سيتم إشعارك عند كل صلاة
                  </p>
                </div>
                <Switch
                  checked={adhanEnabled}
                  onCheckedChange={setAdhanEnabled}
                />
              </div>

              <div className="text-center">
                <Button
                  onClick={playAdhan}
                  className="bg-islamic-green hover:bg-islamic-green/90 text-primary-foreground"
                  size="lg"
                >
                  {isPlayingAdhan ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      إيقاف الأذان
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      تشغيل الأذان
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Reference */}
          <Card className="p-4 bg-accent text-center">
            <p className="text-sm text-muted-foreground">
              مواقيت الصلاة من API Aladhan •
              <a 
                href="https://timesprayer.com/prayer-times-in-cairo.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-islamic-blue hover:underline mr-2"
              >
                للمزيد من التفاصيل
              </a>
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrayerPage;