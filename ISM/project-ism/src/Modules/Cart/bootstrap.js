import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
import initReducer from "./Store/initReducer";
import initSagas from "./Store/initSagas";

export default {
  name: "Cart",
  dir: "Cart",
  pathRoot: "cart",
  routes: [
    {
      url: "",
      component: "Page/Carriage",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Trang chủ | Hita Camp",
        titleI18n: "Cart information",
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
