import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Flag icons for languages
const languageFlags: Record<string, string> = {
  en: "🇺🇸",
  ar: "🇸🇦",
  zh: "🇨🇳"
};

// Language names
const languageNames: Record<string, string> = {
  en: "English",
  ar: "العربية",
  zh: "中文"
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  
  // When language changes, update document direction for RTL support
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    localStorage.setItem('i18nextLng', i18n.language);
  }, [i18n.language]);
  
  // Handle language change
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Language Switcher</span>
          <span className="absolute -top-1 -right-1 text-xs">
            {languageFlags[currentLang]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1">
        {Object.keys(languageFlags).map((lang) => (
          <DropdownMenuItem 
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLang === lang ? 'font-semibold bg-accent/10' : ''
            }`}
          >
            <span>{languageFlags[lang]}</span>
            <span>{languageNames[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}