export interface QuranReader {
  id: string;
  name: string;
  arabicName: string;
  serverUrl: string;
  description: string;
}

export const quranReaders: QuranReader[] = [
  {
    id: 'afasy',
    name: 'أحمد العفاسي',
    arabicName: 'أحمد فريد العفاسي',
    serverUrl: 'https://server8.mp3quran.net/afs',
    description: 'قراءة هادئة ومؤثرة'
  },
  {
    id: 'sudais',
    name: 'عبد الرحمن السديس',
    arabicName: 'عبد الرحمن السديس',
    serverUrl: 'https://server6.mp3quran.net/sudais',
    description: 'إمام الحرم المكي'
  },
  {
    id: 'shuraim',
    name: 'سعود الشريم',
    arabicName: 'سعود الشريم',
    serverUrl: 'https://server6.mp3quran.net/shuraim',
    description: 'إمام الحرم المكي'
  },
  {
    id: 'maher',
    name: 'ماهر المعيقلي',
    arabicName: 'ماهر المعيقلي',
    serverUrl: 'https://server12.mp3quran.net/maher',
    description: 'إمام الحرم المكي'
  },
  {
    id: 'husary',
    name: 'محمود خليل الحصري',
    arabicName: 'محمود خليل الحصري',
    serverUrl: 'https://server13.mp3quran.net/husr',
    description: 'شيخ قراء مصر'
  },
  {
    id: 'abdulbasit',
    name: 'عبد الباسط عبد الصمد',
    arabicName: 'عبد الباسط عبد الصمد',
    serverUrl: 'https://server7.mp3quran.net/basit',
    description: 'صوت القرآن الذهبي'
  },
  {
    id: 'minshawi',
    name: 'محمد صديق المنشاوي',
    arabicName: 'محمد صديق المنشاوي',
    serverUrl: 'https://server10.mp3quran.net/minsh',
    description: 'قراءة مجودة مرتلة'
  },
  {
    id: 'alafasy_slow',
    name: 'أحمد العفاسي (مرتل)',
    arabicName: 'أحمد العفاسي - مرتل',
    serverUrl: 'https://server8.mp3quran.net/afs_murtal',
    description: 'قراءة مرتلة بطيئة للحفظ'
  }
];

export const getAudioUrl = (readerId: string, surahNumber: number): string => {
  const reader = quranReaders.find(r => r.id === readerId);
  if (!reader) return '';
  
  const paddedNumber = surahNumber.toString().padStart(3, '0');
  return `${reader.serverUrl}/${paddedNumber}.mp3`;
};

// صور السور المكتوبة من موقع equran
export const getSurahImageUrl = (surahNumber: number): string => {
  const paddedNumber = surahNumber.toString().padStart(3, '0');
  return `https://www.equran.org/img/sura${paddedNumber}.gif`;
};

// رابط قراءة السورة المكتوبة
export const getSurahTextUrl = (surahNumber: number): string => {
  const surahNames = [
    '', 'alFaatiha', 'albaqara', 'ali-imran', 'an-nisa', 'al-maidah',
    'al-anam', 'al-araf', 'al-anfal', 'at-tawbah', 'yunus',
    'hud', 'yusuf', 'ar-raad', 'ibrahim', 'al-hijr',
    'al-nahl', 'al-isra', 'al-kahf', 'maryam', 'taha',
    'al-anbiya', 'al-hajj', 'al-muminun', 'an-nur', 'al-furqan',
    'ash-shuara', 'an-naml', 'al-qasas', 'al-ankabut', 'ar-rum',
    'luqman', 'as-sajdah', 'al-ahzab', 'saba', 'fatir',
    'ya-sin', 'as-saffat', 'sad', 'az-zumar', 'ghafir',
    'fussilat', 'ash-shura', 'az-zukhruf', 'ad-dukhan', 'al-jathiyah',
    'al-ahqaf', 'muhammad', 'al-fath', 'al-hujurat', 'qaf',
    'adh-dhariyat', 'at-tur', 'an-najm', 'al-qamar', 'ar-rahman',
    'al-waqiah', 'al-hadid', 'al-mujadila', 'al-hashr', 'al-mumtahinah',
    'as-saff', 'al-jumuah', 'al-munafiqun', 'at-taghabun', 'at-talaq',
    'at-tahrim', 'al-mulk', 'al-qalam', 'al-haqqah', 'al-maarij',
    'nuh', 'al-jinn', 'al-muzzammil', 'al-muddaththir', 'al-qiyamah',
    'al-insan', 'al-mursalat', 'an-naba', 'an-naziat', 'abasa',
    'at-takwir', 'al-infitar', 'al-mutaffifin', 'al-inshiqaq', 'al-buruj',
    'at-tariq', 'al-ala', 'al-ghashiyah', 'al-fajr', 'al-balad',
    'ash-shams', 'al-layl', 'ad-duha', 'ash-sharh', 'at-tin',
    'al-alaq', 'al-qadr', 'al-bayyinah', 'az-zalzalah', 'al-adiyat',
    'al-qariah', 'at-takathur', 'al-asr', 'al-humazah', 'al-fil',
    'quraysh', 'al-maun', 'al-kawthar', 'al-kafirun', 'an-nasr',
    'al-masad', 'al-ikhlas', 'al-falaq', 'an-nas'
  ];
  
  if (surahNumber >= 1 && surahNumber <= 114) {
    return `https://www.equran.org/surah/${surahNames[surahNumber]}.html`;
  }
  return '';
};