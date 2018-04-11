// @flow
import i18n from 'react-native-i18n';

import { defaultLocale } from './constants/languages';
import translations from './locales';

export default function sutup() {
  i18n.fallbacks = true;
  i18n.defaultLocale = defaultLocale;
  i18n.translations = translations;
  i18n.missingBehaviour = 'guess';
  i18n.missingTranslationPrefix = '';

  const originalMissingTranslation = i18n.missingTranslation;
  i18n.missingTranslation = (...args) => {
    try {
      return originalMissingTranslation.apply(i18n, args);
    } catch (e) {
      return '';
    }
  };

  (function i18nCache() {
    const cache = Object.create(null);

    i18n.t = (scope, options) => {
      if (options || typeof scope !== 'string') {
        return i18n.translate(scope, options);
      }
      if (!cache[i18n.locale]) {
        cache[i18n.locale] = Object.create(null);
      }

      if (!cache[i18n.locale][scope]) {
        cache[i18n.locale][scope] = i18n.translate(scope, options);
      }

      return cache[i18n.locale][scope];
    };
  })();
}
