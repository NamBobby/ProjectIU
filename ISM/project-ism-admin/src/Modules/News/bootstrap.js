import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "News",
  dir: "News",
  pathRoot: "manage-news",
  routes: [
    {
      url: "",
      component: "Page/News",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage News",
        titleI18n: "Manage News",
        exact: true,
      },
    },
    {
      url: "create-news",
      component: "Page/CreateNews",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create News",
        titleI18n: "Create News",
        exact: true,
      },
    },
    {
      url: "update-news",
      component: "Page/UpdateNews",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update News",
        titleI18n: "Update News",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
