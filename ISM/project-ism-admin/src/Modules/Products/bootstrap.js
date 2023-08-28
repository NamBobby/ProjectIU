import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Products",
  dir: "Products",
  pathRoot: "manage-products",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Products",
        titleI18n: "Manage Products",
        exact: true,
      },
    },
    {
      url: "create-product",
      component: "Page/CreateProduct",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Products",
        titleI18n: "Create Products",
        exact: true,
      },
    },
    {
      url: "update-product",
      component: "Page/CreateProduct",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update Products",
        titleI18n: "Update Products",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
