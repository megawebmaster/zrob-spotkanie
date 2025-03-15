import Backend from 'i18next-fs-backend/cjs';
import { RemixI18Next } from 'remix-i18next/server';
import { resolve } from 'node:path';
import process from 'node:process';

import i18n from '~/i18n';

const  i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve(`./${process.env.NS_LOCATION}/locales/{{lng}}/{{ns}}.json`),
    },
  },
  plugins: [Backend],
});

export default i18next;
