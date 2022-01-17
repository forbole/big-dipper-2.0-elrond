/* eslint-disable */

module.exports = {
  // locales: ['en', 'zht'],
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common'],
    '/': ['home'],
    'rgx:^/blocks': ['blocks'],
    // 'rgx:^/@*': ['profiles', 'accounts'],
    // 'rgx:^/transactions': ['transactions', 'message_labels', 'message_contents'],
    // 'rgx:^/proposals': ['proposals'],
    // 'rgx:^/validators': ['validators', 'transactions', 'accounts', 'message_labels', 'message_contents'],
    // 'rgx:^/accounts': ['accounts', 'transactions', 'validators', 'message_labels', 'message_contents'],
    // 'rgx:^/params': ['params'],
  },
  loadLocaleFrom: (lang, ns) => import(`./public/locales/${lang}/${ns}.json`).then((m) => m.default),
};
