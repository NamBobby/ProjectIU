import intlMessagesEN from './i18n/localization/en.json';
import intlMessagesVi from './i18n/localization/vi.json';
// import initReducer from './Store/initReducer';

export default {
  name: 'ComingSoon',
  dir: 'ComingSoon',
  pathRoot: 'coming-soon',
  routes: [
    {
      url: '',
      component: 'Page/index',
      meta: {
        authRoute: true,
      },
      props: {
        title: 'Hita Camp',
        titleI18n: 'ComingSoon:title',
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: 'Any',
  // redux: initReducer,
};
