import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sun, Moon, Star } from 'lucide-react';

const AzkarSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('morning');

  const morningAzkar = [
    {
      id: 1,
      text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      count: 1,
      benefit: "من أفضل أذكار الصباح"
    },
    {
      id: 2,
      text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ",
      count: 1,
      benefit: "للحفظ والبركة"
    },
    {
      id: 3,
      text: "أَصْبَحْنَا عَلَى فِطْرَةِ الإِسْلَامِ وَعَلَى كَلِمَةِ الإِخْلَاصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
      count: 1,
      benefit: "للثبات على الدين"
    },
    {
      id: 4,
      text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
      count: 100,
      benefit: "من قالها مائة مرة حُطت خطاياه"
    },
    {
      id: 5,
      text: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      count: 10,
      benefit: "عشر حسنات ومحو عشر سيئات"
    }
  ];

  const eveningAzkar = [
    {
      id: 1,
      text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ للهِ، وَالْحَمْدُ للهِ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      count: 1,
      benefit: "من أفضل أذكار المساء"
    },
    {
      id: 2,
      text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ",
      count: 1,
      benefit: "للحفظ والبركة"
    },
    {
      id: 3,
      text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ",
      count: 1,
      benefit: "سيد الاستغفار"
    },
    {
      id: 4,
      text: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَهَ إِلَّا أَنْتَ",
      count: 3,
      benefit: "للعافية في البدن"
    }
  ];

  const generalAzkar = [
    {
      id: 1,
      text: "سُبْحَانَ اللهِ",
      count: 33,
      benefit: "من أذكار بعد الصلاة"
    },
    {
      id: 2,
      text: "الْحَمْدُ للهِ",
      count: 33,
      benefit: "من أذكار بعد الصلاة"
    },
    {
      id: 3,
      text: "اللهُ أَكْبَرُ",
      count: 34,
      benefit: "من أذكار بعد الصلاة"
    },
    {
      id: 4,
      text: "أَسْتَغْفِرُ اللهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
      count: 100,
      benefit: "للاستغفار والتوبة"
    }
  ];

  const getAzkarData = () => {
    switch (selectedCategory) {
      case 'morning': return morningAzkar;
      case 'evening': return eveningAzkar;
      case 'general': return generalAzkar;
      default: return morningAzkar;
    }
  };

  return (
    <section id="azkar" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-islamic-green">الأذكار</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            أذكار الصباح والمساء والأذكار العامة
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="morning" className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                أذكار الصباح
              </TabsTrigger>
              <TabsTrigger value="evening" className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                أذكار المساء
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                أذكار عامة
              </TabsTrigger>
            </TabsList>

            {['morning', 'evening', 'general'].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-6">
                  {getAzkarData().map((zikr) => (
                    <Card key={zikr.id} className="p-6 hover:shadow-islamic transition-all">
                      <div className="space-y-4">
                        {/* Zikr Text */}
                        <div className="text-center">
                          <p className="text-lg md:text-xl font-quran leading-relaxed text-foreground">
                            {zikr.text}
                          </p>
                        </div>

                        {/* Count and Benefit */}
                        <div className="flex items-center justify-between border-t pt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">التكرار:</span>
                            <span className="bg-islamic-green text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                              {zikr.count} {zikr.count === 1 ? 'مرة' : 'مرات'}
                            </span>
                          </div>
                          
                          <div className="text-sm text-islamic-blue font-medium">
                            {zikr.benefit}
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="text-center">
                          <Button 
                            variant="outline"
                            className="border-islamic-gold text-islamic-gold hover:bg-islamic-gold hover:text-primary-foreground"
                          >
                            تم القراءة
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Time Recommendations */}
          <Card className="mt-8 p-6 bg-islamic-green-light">
            <h3 className="text-lg font-bold text-islamic-green mb-4 text-center">
              أوقات الأذكار المستحبة
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-islamic-gold" />
                <span>أذكار الصباح: من الفجر حتى الشروق</span>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-islamic-blue" />
                <span>أذكار المساء: من العصر حتى المغرب</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AzkarSection;