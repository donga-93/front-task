const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'], // Add English and French languages here
  },
  localePath: path.resolve('./public/locales'), // Path to your translation files
};
