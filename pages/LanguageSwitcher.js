// components/LanguageSwitcher.js

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale } = router;
  const { t } = useTranslation('common');

  const changeLanguage = (e) => {
    const newLocale = e.target.value;
    router.push(router.asPath, undefined, { locale: newLocale });
  };

  return (
    <div>
      <label>{t('language')}:</label>
      <select value={locale} onChange={changeLanguage}>
        {locales.map((lng) => (
          <option key={lng} value={lng}>
            {lng.toUpperCase()} {/* Display language codes in uppercase */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
