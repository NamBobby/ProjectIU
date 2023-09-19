import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
import initReducer from "./Store/initReducer";
import initSagas from "./Store/initSagas";

export default {
  name: "Home",
  dir: "Home",
  pathRoot: "",
  routes: [
    {
      url: "",
      component: "Page/Home",

      meta: {
        authRoute: true,
      },
      props: {
        title: "HomePage | Monito",
        titleI18n: "HomePage | Monito",
        headerStyle: "fill",
        exact: true,
      },
    },
    {
      url: "news",
      component: "Page/News",

      meta: {
        authRoute: true,
      },
      props: {
        title: "News | Monito",
        titleI18n: "News | Monito",
        headerStyle: "fill",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: "Any",
  redux: initReducer,
  sagas: initSagas,
};
