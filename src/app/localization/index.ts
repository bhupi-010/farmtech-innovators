import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import genericEn from './en/english.json';
import genericFr from './fr/french.json';

const resources = {
  en: {
    translation: genericEn,
  },
  fr: {
    translation: genericFr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
