import { Card } from '@/components/ui/card';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-islamic opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 shadow-islamic bg-card/90 backdrop-blur-sm">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4 animate-gentle">
                ذكرى طيبة
              </h1>
              <h2 className="text-2xl md:text-3xl text-islamic-green font-semibold mb-2">
                صدقة جارية
              </h2>
              <div className="w-24 h-1 bg-islamic-gold mx-auto rounded-full"></div>
            </div>

            {/* Deceased Photo */}
            <div className="mb-8">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-golden border-4 border-islamic-gold/30 animate-float">
                <img 
                  src="/images/deceased-photo.jpg" 
                  alt="المرحومه شاديه عبد الغني عبد الرحمن مشالي"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name and Prayer */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                المرحوم شاديه عبد الغني عبد الرحمن مشالي
              </h3>
              <div className="text-lg md:text-xl text-muted-foreground leading-relaxed font-quran">
                <p className="mb-4">رحمه الله تعالى وأسكنه فسيح جناته</p>
                <p className="text-islamic-green">
                  "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَٰئِكَ أَصْحَابُ الْجَنَّةِ ۖ هُمْ فِيهَا خَالِدُونَ"
                </p>
                <p className="text-sm mt-2 text-muted-foreground">البقرة: 82</p>
              </div>
            </div>

            {/* Prayer Box */}
            <Card className="p-6 bg-islamic-green-light border-islamic-green/20">
              <div className="text-lg font-quran leading-relaxed">
                <p className="text-islamic-green font-semibold mb-3">
                  اللهم اغفر له وارحمه وعافه واعف عنه
                </p>
                <p className="text-muted-foreground">
                  وأكرم نزله ووسع مدخله واغسله بالماء والثلج والبرد
                  ونقه من الخطايا كما ينقى الثوب الأبيض من الدنس
                </p>
              </div>
            </Card>

            {/* Memorial Message */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                هذا الموقع صدقة جارية نسأل الله أن يتقبلها وأن ينفع بها
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
