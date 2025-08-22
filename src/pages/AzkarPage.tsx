import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Sun, Moon, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AzkarPage = () => {
  const [activeCategory, setActiveCategory] = useState('morning');
  const navigate = useNavigate();

  const azkarCategories = {
    morning: {
      title: 'أذكار الصباح',
      icon: Sun,
      azkar: [
        {
          text: 'أعوذ بالله من الشيطان الرجيم • اللَّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
          count: 1
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          count: 3
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
          count: 3
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَـهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
          count: 3
        },
        {
          text: 'أَصْبَحْنا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَـذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَـذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ',
          count: 1
        },
        {
          text: 'اللَّهُمَّ بِكَ أَصْبَحْنا وَبِكَ أَمْسَيْنا، وَبِكَ نَحْيا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
          count: 1
        },
        {
          text: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
          count: 1
        },
        {
          text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلامِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم رَسُولاً',
          count: 3
        },
        {
          text: 'اللَّهُمَّ عافِنِي فِي بَدَنِي، اللَّهُمَّ عافِنِي فِي سَمْعِي، اللَّهُمَّ عافِنِي فِي بَصَرِي، لا إِلَهَ إِلاَّ أَنْتَ',
          count: 3
        },
        {
          text: 'سُبْحانَ اللَّهِ وَبِحَمْدِهِ',
          count: 100
        }
      ]
    },
    evening: {
      title: 'أذكار المساء',
      icon: Moon,
      azkar: [
        {
          text: 'أعوذ بالله من الشيطان الرجيم • اللَّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ',
          count: 1
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ هُوَ اللَّهُ أَحَدٌ، اللَّهُ الصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          count: 3
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
          count: 3
        },
        {
          text: 'بِسْمِ اللَّهِ الرَّحْمَـنِ الرَّحِيمِ • قُلْ أَعُوذُ بِرَبِّ النَّاسِ، مَلِكِ النَّاسِ، إِلَـهِ النَّاسِ، مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ، الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ، مِنَ الْجِنَّةِ وَالنَّاسِ',
          count: 3
        },
        {
          text: 'أَمْسَيْنا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَـذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَها، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَـذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَها',
          count: 1
        },
        {
          text: 'اللَّهُمَّ بِكَ أَمْسَيْنا وَبِكَ أَصْبَحْنا، وَبِكَ نَحْيا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ',
          count: 1
        },
        {
          text: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَـهَ إِلاَّ أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ',
          count: 1
        },
        {
          text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلامِ دِيناً، وَبِمُحَمَّدٍ صلى الله عليه وسلم رَسُولاً',
          count: 3
        },
        {
          text: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لا إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
          count: 3
        },
        {
          text: 'سُبْحانَ اللَّهِ وَبِحَمْدِهِ',
          count: 100
        }
      ]
    },
    general: {
      title: 'أذكار عامة',
      icon: BookOpen,
      azkar: [
        {
          text: 'سُبْحانَ اللَّهِ',
          count: 33
        },
        {
          text: 'الْحَمْدُ لِلَّهِ',
          count: 33
        },
        {
          text: 'اللَّهُ أَكْبَرُ',
          count: 34
        },
        {
          text: 'لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
          count: 10
        },
        {
          text: 'أَسْتَغْفِرُ اللَّهَ',
          count: 100
        },
        {
          text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنا مُحَمَّدٍ',
          count: 10
        },
        {
          text: 'لا حَوْلَ وَلا قُوَّةَ إِلاَّ بِاللَّهِ',
          count: 10
        },
        {
          text: 'حَسْبِيَ اللَّهُ لا إِلَهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
          count: 7
        }
      ]
    }
  };

  const currentCategory = azkarCategories[activeCategory as keyof typeof azkarCategories];

  return (
    <div className="min-h-screen bg-gradient-to-b from-islamic-purple-light/20 to-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4 text-islamic-purple border-islamic-purple hover:bg-islamic-purple hover:text-primary-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-islamic-purple" />
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-purple">الأذكار</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            أذكار الصباح والمساء والأذكار العامة
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(azkarCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <Button
                  key={key}
                  variant={activeCategory === key ? "default" : "outline"}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 ${
                    activeCategory === key 
                      ? "bg-islamic-purple text-primary-foreground" 
                      : "text-islamic-purple border-islamic-purple hover:bg-islamic-purple hover:text-primary-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </Button>
              );
            })}
          </div>

          {/* Azkar List */}
          <div className="space-y-4">
            {currentCategory.azkar.map((dhikr, index) => (
              <Card key={index} className="p-6">
                <div className="text-right space-y-4">
                  <p className="text-lg leading-relaxed font-quran text-islamic-purple">
                    {dhikr.text}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="bg-islamic-purple-light rounded-full px-4 py-2">
                      <span className="text-sm font-medium text-islamic-purple">
                        العدد: {dhikr.count}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ذكر {index + 1} من {currentCategory.azkar.length}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Reminder */}
          <Card className="p-4 bg-accent mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              💡 نصيحة: اجعل قراءة الأذكار جزءاً من روتينك اليومي للحصول على البركة والحماية
            </p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AzkarPage;