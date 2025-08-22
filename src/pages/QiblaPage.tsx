import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Compass, MapPin, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const QiblaPage = () => {
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [deviceDirection, setDeviceDirection] = useState<number>(0);
  const [city, setCity] = useState('القاهرة');
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const navigate = useNavigate();

  // Kaaba coordinates
  const KAABA_LAT = 21.422487;
  const KAABA_LNG = 39.826206;

  const calculateQiblaDirection = (lat: number, lng: number) => {
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const toDegrees = (rad: number) => rad * (180 / Math.PI);

    const lat1 = toRadians(lat);
    const lng1 = toRadians(lng);
    const lat2 = toRadians(KAABA_LAT);
    const lng2 = toRadians(KAABA_LNG);

    const deltaLng = lng2 - lng1;

    const y = Math.sin(deltaLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);

    let bearing = toDegrees(Math.atan2(y, x));
    return (bearing + 360) % 360;
  };

  const fetchCoordinatesFromCity = async (cityName: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=a8bc4e2c8f0c46c6b7d6c7e9f8a7b9c5&language=ar`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setCoordinates({ lat, lng });
        const direction = calculateQiblaDirection(lat, lng);
        setQiblaDirection(direction);
      }
    } catch (error) {
      console.error('خطأ في جلب الإحداثيات:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setPermissionStatus('الموقع الجغرافي غير مدعوم في هذا المتصفح');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        const direction = calculateQiblaDirection(latitude, longitude);
        setQiblaDirection(direction);
        setPermissionStatus('تم الحصول على الموقع بنجاح');
        setIsLoading(false);
      },
      (error) => {
        console.error('خطأ في الحصول على الموقع:', error);
        setPermissionStatus('فشل في الحصول على الموقع. يرجى السماح بالوصول للموقع أو إدخال المدينة يدوياً.');
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  useEffect(() => {
    // Request device orientation permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission().then((response: string) => {
        if (response === 'granted') {
          setupCompass();
        }
      });
    } else {
      setupCompass();
    }

    // Default to Cairo
    fetchCoordinatesFromCity('القاهرة');
  }, []);

  const setupCompass = () => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setDeviceDirection(360 - event.alpha);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  };

  const handleCitySearch = () => {
    if (city.trim()) {
      fetchCoordinatesFromCity(city);
    }
  };

  const qiblaArrowRotation = qiblaDirection - deviceDirection;

  return (
    <div className="min-h-screen bg-gradient-to-b from-islamic-green-light/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4 text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-8 h-8 text-islamic-green" />
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-green">اتجاه القبلة</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            اعرف اتجاه القبلة الصحيح من موقعك
          </p>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Location Input */}
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">المدينة:</label>
                <div className="flex gap-2">
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="أدخل اسم المدينة..."
                    className="text-right"
                    onKeyPress={(e) => e.key === 'Enter' && handleCitySearch()}
                  />
                  <Button
                    onClick={handleCitySearch}
                    disabled={isLoading}
                    className="bg-islamic-green hover:bg-islamic-green/90"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  onClick={getCurrentLocation}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  استخدم موقعي الحالي
                </Button>
                {permissionStatus && (
                  <p className="text-xs text-muted-foreground mt-2">{permissionStatus}</p>
                )}
              </div>
            </div>
          </Card>

          {/* Compass */}
          <Card className="p-6 text-center">
            <div className="relative w-64 h-64 mx-auto mb-4">
              {/* Compass Background */}
              <div className="absolute inset-0 rounded-full border-4 border-islamic-green-light bg-gradient-to-br from-islamic-green-light/20 to-transparent">
                {/* Direction markers */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-islamic-green">ش</div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-islamic-green">ج</div>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-islamic-green">غ</div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-bold text-islamic-green">ر</div>
              </div>

              {/* Qibla Arrow */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                style={{ transform: `translate(-50%, -50%) rotate(${qiblaArrowRotation}deg)` }}
              >
                <div className="w-1 h-20 bg-islamic-green rounded-full relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-islamic-green"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-islamic-green rounded-full"></div>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-islamic-green rounded-full"></div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                اتجاه القبلة: <span className="font-bold text-islamic-green">{qiblaDirection.toFixed(1)}°</span>
              </p>
              {coordinates && (
                <p className="text-xs text-muted-foreground">
                  الإحداثيات: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                أمسك الهاتف بشكل مسطح واتجه حيث يشير السهم الأخضر
              </p>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-4 bg-accent">
            <h3 className="font-bold mb-2 text-center">تعليمات الاستخدام:</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-right">
              <li>• امسك الهاتف بشكل مسطح أمامك</li>
              <li>• اسمح للمتصفح بالوصول لاتجاه الجهاز</li>
              <li>• السهم الأخضر يشير إلى اتجاه القبلة</li>
              <li>• يمكنك إدخال مدينتك للحصول على دقة أكبر</li>
            </ul>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QiblaPage;