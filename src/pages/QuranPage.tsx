import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, BookOpen, ArrowLeft } from 'lucide-react';
import { quranData } from '@/data/quran-data';
import { getSurahImageUrl } from '@/data/quran-readers';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const QuranPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const navigate = useNavigate();

  const filteredSurahs = quranData.filter(surah => 
    surah.name.includes(searchTerm) || 
    surah.arabicName.includes(searchTerm) ||
    surah.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadSurah = (surahId: number) => {
    setSelectedSurah(surahId);
  };

  const selectedSurahData = selectedSurah ? quranData.find(s => s.id === selectedSurah) : null;

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
            <BookOpen className="w-8 h-8 text-islamic-green" />
            <h1 className="text-3xl md:text-4xl font-bold text-islamic-green">القرآن الكريم</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            اقرأ القرآن الكريم كاملاً • 114 سورة
          </p>
        </div>

        {selectedSurahData ? (
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSurah(null)}
                  className="text-islamic-green border-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  العودة للقائمة
                </Button>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-islamic-green mb-1">
                    {selectedSurahData.name}
                  </h2>
                  <p className="text-lg font-quran text-islamic-green">
                    {selectedSurahData.arabicName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSurahData.verses} آية • {selectedSurahData.type}
                  </p>
                </div>
                <div className="w-20"></div>
              </div>
              
              <div className="text-center">
                <img 
                  src={getSurahImageUrl(selectedSurahData.id)}
                  alt={`صورة سورة ${selectedSurahData.name}`}
                  className="max-w-full h-auto mx-auto rounded-lg border border-border shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <Card className="p-4 mb-6">
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
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-islamic-green flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                        {surah.id}
                      </div>
                      <div className="text-right flex-1">
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

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleReadSurah(surah.id)}
                      className="border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-primary-foreground"
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      اقرأ
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default QuranPage;