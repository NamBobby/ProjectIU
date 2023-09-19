import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
import initReducer from "./Store/initReducer";
import initSagas from "./Store/initSagas";

export default {
  name: "Profile",
  dir: "Profile",
  pathRoot: "Profile",
  routes: [
    {
      url: "information",
      component: "Page/Profile",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Profile Information | Hita Camp",
        titleI18n: "Profile Information | Hita Camp",
        headerStyle: "fill",
        exact: true,
      },
    },
    {
      url: "order",
      component: "Page/CustomerOrder",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Profile Order | Hita Camp",
        titleI18n: "Profile Order | Hita Camp",
        headerStyle: "fill",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: "Any",
  sagas: initSagas,
  redux: initReducer,
};
