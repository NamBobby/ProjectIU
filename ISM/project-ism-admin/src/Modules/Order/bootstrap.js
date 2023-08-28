import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Order",
  dir: "Order",
  pathRoot: "manage-order",
  routes: [
    {
      url: "",
      component: "Page/ManageOrder",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Orders",
        titleI18n: "Manage Orders",
        exact: true,
      },
    },
    {
      url: "update-order",
      component: "Page/CreateOrder",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Orders",
        titleI18n: "Create Orders",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
