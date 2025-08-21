import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Search, BookOpen } from 'lucide-react';

const QuranSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);

  // Sample Surahs (first few for demo)
  const surahs = [
    { id: 1, name: 'الفاتحة', arabicName: 'سُورَةُ الْفَاتِحَةِ', verses: 7, type: 'مكية' },
    { id: 2, name: 'البقرة', arabicName: 'سُورَةُ الْبَقَرَةِ', verses: 286, type: 'مدنية' },
    { id: 3, name: 'آل عمران', arabicName: 'سُورَةُ آلِ عِمْرَانَ', verses: 200, type: 'مدنية' },
    { id: 4, name: 'النساء', arabicName: 'سُورَةُ النِّسَاءِ', verses: 176, type: 'مدنية' },
    { id: 5, name: 'المائدة', arabicName: 'سُورَةُ الْمَائِدَةِ', verses: 120, type: 'مدنية' },
    { id: 6, name: 'الأنعام', arabicName: 'سُورَةُ الْأَنْعَامِ', verses: 165, type: 'مكية' },
    { id: 7, name: 'الأعراف', arabicName: 'سُورَةُ الْأَعْرَافِ', verses: 206, type: 'مكية' },
    { id: 8, name: 'الأنفال', arabicName: 'سُورَةُ الْأَنْفَالِ', verses: 75, type: 'مدنية' },
  ];

  const handlePlayPause = (surahId: number) => {
    if (currentSurah === surahId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSurah(surahId);
      setIsPlaying(true);
      // Here you would integrate with a Quran audio API
    }
  };

  const filteredSurahs = surahs.filter(surah => 
    surah.name.includes(searchTerm) || 
    surah.arabicName.includes(searchTerm)
  );

  return (
    <section id="quran" className="py-20 bg-islamic-blue-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-islamic-green" />
            <h2 className="text-3xl md:text-4xl font-bold text-islamic-green">القرآن الكريم</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            اقرأ واستمع للقرآن الكريم كاملاً
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <Card className="p-4 mb-8">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="ابحث عن السورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 text-right"
              />
            </div>
          </Card>

          {/* Surahs List */}
          <div className="grid gap-4">
            {filteredSurahs.map((surah) => (
              <Card key={surah.id} className="p-4 hover:shadow-islamic transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-islamic-green flex items-center justify-center text-primary-foreground font-bold">
                      {surah.id}
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {surah.name}
                      </h3>
                      <p className="text-lg font-quran text-islamic-green mb-1">
                        {surah.arabicName}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{surah.verses} آية</span>
                        <span>{surah.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
                    >
                      اقرأ
                    </Button>
                    <Button
                      variant={currentSurah === surah.id && isPlaying ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePlayPause(surah.id)}
                      className="border-islamic-blue text-islamic-blue hover:bg-islamic-blue hover:text-primary-foreground"
                    >
                      {currentSurah === surah.id && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {currentSurah === surah.id && (
                  <div className="mt-4 p-4 bg-islamic-green-light rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {isPlaying ? 'جاري التشغيل...' : 'متوقف'}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Card className="p-4 bg-accent">
              <p className="text-muted-foreground">
                للاستماع الكامل، يرجى زيارة:
                <a href="https://www.tvquran.com/ar/selections/category/9" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-islamic-green hover:underline mr-2">
                  موقع التلاوات المرئية
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuranSection;