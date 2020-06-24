import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { initReactI18next } from 'react-i18next';
import { english } from './english';
import { arabic } from './arabic';
import { spanish } from './spanish';
import { german } from './german';
import { french } from './french';
import { portuguese } from './portuguese';
import { chinese } from './chinese';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: english,
            ar: arabic,
            es: spanish,
            de: german,
            fr: french,
            pt: portuguese,
            zh: chinese,
        },
        fallbackLng: 'english',
        debug: false,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
