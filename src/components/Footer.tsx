import { Card } from '@/components/ui/card';
import { Heart, Star } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-islamic-green-light/20 border-t border-border">
      <div className="container mx-auto px-4">
        <Card className="p-8 text-center bg-card/50 backdrop-blur-sm">
          {/* Memorial Message */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-islamic-gold" />
              <h3 className="text-xl font-bold text-islamic-green">ذكرى طيبة</h3>
              <Heart className="w-6 h-6 text-islamic-gold" />
            </div>
            
            <p className="text-lg font-quran text-foreground mb-4">
              "صدقة جارية إهداءً لروح المرحوم دهمان صالح الشحات"
            </p>
            
            <div className="w-24 h-1 bg-islamic-gold mx-auto rounded-full mb-4"></div>
            
            <p className="text-muted-foreground font-quran">
              رحمه الله تعالى وأسكنه فسيح جناته
            </p>
          </div>

          {/* Quranic Verse */}
          <Card className="p-6 bg-islamic-green-light/30 border-islamic-green/20 mb-8">
            <div className="text-center">
              <Star className="w-8 h-8 text-islamic-gold mx-auto mb-4" />
              <p className="text-lg font-quran leading-relaxed text-islamic-green mb-2">
                "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ"
              </p>
              <p className="text-sm text-muted-foreground">
                سورة النجم: 39
              </p>
            </div>
          </Card>

          {/* Sadaqah Jariyah */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-islamic-green mb-4">
              الصدقة الجارية
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-islamic-blue-light/30 rounded-lg">
                <p className="font-semibold text-islamic-blue mb-1">علم ينتفع به</p>
                <p className="text-muted-foreground">القرآن الكريم والأذكار</p>
              </div>
              <div className="p-3 bg-islamic-green-light/30 rounded-lg">
                <p className="font-semibold text-islamic-green mb-1">عمل صالح</p>
                <p className="text-muted-foreground">التسبيح والذكر</p>
              </div>
              <div className="p-3 bg-islamic-gold-light/30 rounded-lg">
                <p className="font-semibold text-islamic-gold mb-1">دعاء صالح</p>
                <p className="text-muted-foreground">دعوات الزوار</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-6">
            <p className="text-muted-foreground text-sm">
              © {currentYear} ذكرى طيبة - صدقة جارية
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              "من دعا إلى هدى كان له من الأجر مثل أجور من تبعه"
            </p>
          </div>

          {/* Final Prayer */}
          <div className="mt-6 p-4 bg-islamic-gold-light/20 rounded-lg">
            <p className="text-islamic-green font-quran">
              اللهم تقبل منا واجعل هذا العمل في ميزان حسنات المرحوم
            </p>
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;