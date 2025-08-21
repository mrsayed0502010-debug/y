import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, Search, BookOpen, Download, Volume2, VolumeX } from 'lucide-react';
import { quranData } from '@/data/quran-data';

const QuranSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = (surahId: number) => {
    const surah = quranData.find(s => s.id === surahId);
    if (!surah) return;

    if (currentSurah === surahId && isPlaying) {
      // Pause current
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // Play new or resume
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(surah.audioUrl);
      audio.volume = isMuted ? 0 : volume;
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentSurah(null);
      };
      
      audio.onerror = () => {
        console.error('خطأ في تشغيل الصوت');
        setIsPlaying(false);
        setCurrentSurah(null);
      };
      
      audioRef.current = audio;
      audio.play().catch(console.error);
      
      setCurrentSurah(surahId);
      setIsPlaying(true);
    }
  };

  const filteredSurahs = quranData.filter(surah => 
    surah.name.includes(searchTerm) || 
    surah.arabicName.includes(searchTerm) ||
    surah.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
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
            اقرأ واستمع للقرآن الكريم كاملاً • 114 سورة
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Search */}
            <Card className="p-4">
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

            {/* Audio Controls & PDF Download */}
            <Card className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
                >
                  <a
                    href="https://docs.google.com/file/d/0B5ouQ_Ym2-loTFpsTzNlYnh5RFE/edit?resourcekey=0-5mXEzPJTsYpXr7cbrnKLVw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    تحميل المصحف PDF
                  </a>
                </Button>
              </div>
            </Card>
          </div>

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
              <p className="text-muted-foreground text-sm">
                جميع التلاوات بصوت الشيخ أحمد فريد العفاسي • للمزيد من القراء:
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