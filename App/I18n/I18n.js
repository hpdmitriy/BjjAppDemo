import I18n from 'react-native-i18n';
I18n.fallbacks = true;
I18n.translations = {
  en: require('./languages/en.json')
};
const languageCode = I18n.locale.substr(0, 2);
switch (languageCode) {
  case 'ru':
    I18n.translations.ru = require('./languages/ru.json');
    break;
}
