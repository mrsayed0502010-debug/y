import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Dua {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

const DuasSection = () => {
  const [duas, setDuas] = useState<Dua[]>([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  // Load duas from localStorage
  useEffect(() => {
    const savedDuas = localStorage.getItem('memorial-duas');
    if (savedDuas) {
      try {
        const parsedDuas = JSON.parse(savedDuas).map((dua: any) => ({
          ...dua,
          timestamp: new Date(dua.timestamp)
        }));
        setDuas(parsedDuas);
      } catch (error) {
        console.error('Error loading duas:', error);
      }
    }
  }, []);

  // Save duas to localStorage
  const saveDuas = (newDuas: Dua[]) => {
    localStorage.setItem('memorial-duas', JSON.stringify(newDuas));
    setDuas(newDuas);
  };

  const addDua = () => {
    if (!newName.trim() || !newMessage.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الاسم والرسالة",
        variant: "destructive"
      });
      return;
    }

    const newDua: Dua = {
      id: Date.now().toString(),
      name: newName.trim(),
      message: newMessage.trim(),
      timestamp: new Date()
    };

    const updatedDuas = [newDua, ...duas];
    saveDuas(updatedDuas);
    
    setNewName('');
    setNewMessage('');
    
    toast({
      title: "تم إضافة الدعاء",
      description: "شكراً لك على دعائك للمرحوم",
    });
  };

  const deleteDua = (id: string) => {
    const updatedDuas = duas.filter(dua => dua.id !== id);
    saveDuas(updatedDuas);
    
    toast({
      title: "تم حذف الدعاء",
      description: "تم حذف الدعاء بنجاح",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="duas" className="py-20 bg-islamic-green-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-islamic-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-islamic-green">الإهداءات والدعوات</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            شاركنا دعواتك وإهداءاتك للمرحوم
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Add New Dua Form */}
          <Card className="p-6 mb-8 shadow-islamic">
            <h3 className="text-xl font-bold text-islamic-green mb-6 text-center">
              أضف دعاء أو إهداء
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  الاسم (اختياري)
                </label>
                <Input
                  placeholder="اكتب اسمك..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="text-right"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  الدعاء أو الإهداء *
                </label>
                <Textarea
                  placeholder="اللهم اغفر له وارحمه... أو أي دعاء آخر"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="text-right min-h-[100px] font-quran"
                  rows={4}
                />
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={addDua}
                  className="bg-islamic-green hover:bg-islamic-green/90 px-8"
                >
                  <MessageCircle className="w-4 h-4 ml-2" />
                  إضافة الدعاء
                </Button>
              </div>
            </div>
          </Card>

          {/* Duas List */}
          <div className="space-y-6">
            {duas.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  لا توجد دعوات بعد. كن أول من يدعو للمرحوم
                </p>
              </Card>
            ) : (
              duas.map((dua) => (
                <Card key={dua.id} className="p-6 hover:shadow-islamic transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-islamic-gold" />
                        <span className="font-semibold text-islamic-green">
                          {dua.name || 'مجهول'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(dua.timestamp)}
                      </p>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteDua(dua.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="bg-islamic-green-light/30 rounded-lg p-4">
                    <p className="text-foreground leading-relaxed font-quran">
                      {dua.message}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Prayer for the Deceased */}
          <Card className="mt-12 p-8 bg-islamic-gold-light text-center">
            <h3 className="text-xl font-bold text-islamic-green mb-4">
              دعاء للمرحوم
            </h3>
            <div className="text-lg font-quran leading-relaxed text-foreground">
              <p className="mb-4">
                "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ"
              </p>
              <p className="text-islamic-green font-semibold">
                اللهم آمين يا رب العالمين
              </p>
            </div>
          </Card>

          {/* Statistics */}
          {duas.length > 0 && (
            <Card className="mt-6 p-4 bg-accent">
              <div className="text-center">
                <p className="text-muted-foreground">
                  إجمالي الدعوات المرسلة: 
                  <span className="font-bold text-islamic-green mr-2">
                    {duas.length}
                  </span>
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default DuasSection;