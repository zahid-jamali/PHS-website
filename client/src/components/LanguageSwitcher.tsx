import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

// Define languages with their names in native language
const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', dir: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  // Set document direction based on language
  useEffect(() => {
    const currentLanguage = languages.find(lang => lang.code === currentLang);
    
    if (currentLanguage?.dir === 'rtl') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }, [currentLang]);
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem('i18nextLng', lng);
  };
  
  // Get current language data
  const getCurrentLanguageData = () => {
    const langItem = languages.find(l => l.code === currentLang) || languages[0];
    return langItem;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-2 ${
              currentLang === lang.code ? 'bg-accent/10 font-medium' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}