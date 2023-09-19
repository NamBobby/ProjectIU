import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
import initReducer from "./Store/initReducer";
import initSagas from "./Store/initSagas";

export default {
  name: "Checkout",
  dir: "Checkout",
  pathRoot: "checkout",
  routes: [
    {
      url: "",
      component: "Page/CheckOut",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Checkout",
        titleI18n: "Checkout",
        headerStyle: "fill",
        exact: true,
      },
    },
    {
      url: "payment",
      component: "Page/Payment",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Payment",
        titleI18n: "Payment",
        headerStyle: "fill",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: "Any",
  // redux: initReducer,
  // sagas: initSagas,
};
