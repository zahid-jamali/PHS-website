import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enNavigation from './en/navigation.json';
import enSeo from './en/seo.json';
import enFooter from './en/footer.json';

import arNavigation from './ar/navigation.json';
import arSeo from './ar/seo.json';
import arFooter from './ar/footer.json';

import zhNavigation from './zh/navigation.json'; 
import zhSeo from './zh/seo.json';
import zhFooter from './zh/footer.json';

// Define resources
const resources = {
  en: {
    translation: {
      navbar: enNavigation,
      seo: enSeo,
      footer: enFooter
    }
  },
  ar: {
    translation: {
      navbar: arNavigation,
      seo: arSeo,
      footer: arFooter
    }
  },
  zh: {
    translation: {
      navbar: zhNavigation,
      seo: zhSeo,
      footer: zhFooter
    }
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;