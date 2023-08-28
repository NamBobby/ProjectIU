import intlMessagesEN from "./i18n/en.json";
import intlMessagesVi from "./i18n/vi.json";
// import initReducer from "./Store/initReducer";
// import initSagas from "./Store/initSagas";

export default {
  name: "Login",
  dir: "Login",
  pathRoot: "login",
  routes: [
    {
      url: "",
      component: "Page/index",
      layout: "LoginLayout",
      meta: {
        authRoute: false,
      },
      props: {
        title: "Login-Signup | Monito",
        titleI18n: "Login-Signup",
        headerStyle: "fill",
        exact: false,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: "Any",
  // redux: initReducer,
  // sagas: initSagas,
};
