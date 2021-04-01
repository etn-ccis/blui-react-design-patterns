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

void i18n
    .use(initReactI18next)
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
            format: (value, format, lng): string => {
                if (format === 'currency') {
                    const price = (Math.round(value * 100) / 100).toFixed(2);
                    if (lng === 'en') {
                        return `$${price}`;
                    } else if (lng === 'zh') {
                        return `¥${price}`;
                    } else if (lng === 'ar') {
                        return ` ج.م.‏${price}`;
                    }
                    return `${price.replace('.', ',')} €`;
                }
                return value;
            },
        },
    });

export default i18n;
