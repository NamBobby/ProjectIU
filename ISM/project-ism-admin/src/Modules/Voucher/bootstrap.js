import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Voucher",
  dir: "Voucher",
  pathRoot: "manage-voucher",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Manage Vouchers",
        titleI18n: "Manage Vouchers",
        exact: true,
      },
    },
    {
      url: "create-voucher",
      component: "Page/CreateProduct",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Create Vouchers",
        titleI18n: "Create Vouchers",
        exact: true,
      },
    },
    {
      url: "update-voucher",
      component: "Page/CreateProduct",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Update Vouchers",
        titleI18n: "Update Vouchers",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: true,
  // redux: initReducer,
  // sagas: initSagas,
};
