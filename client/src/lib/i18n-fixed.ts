import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enNavigation from './i18n/en/navigation.json';
import enSeo from './i18n/en/seo.json';
import enFooter from './i18n/en/footer.json';
import enCarbonCalculator from './i18n/en/carbon-calculator.json';
import enFlavorMatcher from './i18n/en/flavor-matcher.json';
import enKnowledge from './i18n/en/knowledge.json';

import arNavigation from './i18n/ar/navigation.json';
import arSeo from './i18n/ar/seo.json';
import arFooter from './i18n/ar/footer.json';
import arCarbonCalculator from './i18n/ar/carbon-calculator.json';
import arFlavorMatcher from './i18n/ar/flavor-matcher.json';
import arKnowledge from './i18n/ar/knowledge.json';

import zhNavigation from './i18n/zh/navigation.json'; 
import zhSeo from './i18n/zh/seo.json';
import zhFooter from './i18n/zh/footer.json';
import zhCarbonCalculator from './i18n/zh/carbon-calculator.json';
import zhFlavorMatcher from './i18n/zh/flavor-matcher.json';
import zhKnowledge from './i18n/zh/knowledge.json';

// Misc translations - can be moved to dedicated files later
const enMisc = {
  "search": "Search",
  "searchForProducts": "Search for products",
  "readMore": "Read More",
  "back": "Back",
  "next": "Next",
  "previous": "Previous",
  "loading": "Loading...",
  "noResultsFound": "No results found"
};

const arMisc = {
  "search": "بحث",
  "searchForProducts": "البحث عن منتجات",
  "readMore": "قراءة المزيد",
  "back": "رجوع",
  "next": "التالي",
  "previous": "السابق",
  "loading": "جاري التحميل...",
  "noResultsFound": "لم يتم العثور على نتائج"
};

const zhMisc = {
  "search": "搜索",
  "searchForProducts": "搜索产品",
  "readMore": "阅读更多",
  "back": "返回",
  "next": "下一个",
  "previous": "上一个",
  "loading": "加载中...",
  "noResultsFound": "未找到结果"
};

// Define resources
const resources = {
  en: {
    translation: {
      navbar: enNavigation,
      seo: enSeo,
      footer: enFooter,
      misc: enMisc,
      carbonCalculator: enCarbonCalculator,
      flavor_matcher: enFlavorMatcher,
      ...enKnowledge
    },
    common: {
      flavor_matcher: enFlavorMatcher
    }
  },
  ar: {
    translation: {
      navbar: arNavigation,
      seo: arSeo,
      footer: arFooter,
      misc: arMisc,
      carbonCalculator: arCarbonCalculator,
      flavor_matcher: arFlavorMatcher,
      ...arKnowledge
    },
    common: {
      flavor_matcher: arFlavorMatcher
    }
  },
  zh: {
    translation: {
      navbar: zhNavigation,
      seo: zhSeo,
      footer: zhFooter,
      misc: zhMisc,
      carbonCalculator: zhCarbonCalculator,
      flavor_matcher: zhFlavorMatcher,
      ...zhKnowledge
    },
    common: {
      flavor_matcher: zhFlavorMatcher
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