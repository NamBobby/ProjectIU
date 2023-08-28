import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
// import accountListSaga from "./store/accountList/sagas";
// import accountListReducer from "./store/accountList/reducer";

// import authSaga from "./store/auth/sagas";
// import formSignUpSaga from "./store/formSignUp/sagas";
// import formSignUpDevSaga from "./store/formSignUpDev/sagas";
// import formForgotPasswordSaga from "./store/formForgotPassword/sagas";
// import formForgotPasswordEmailSaga from "./store/formForgotPasswordEmail/sagas";
// import formForgotUsernameEmailSaga from "./store/formForgotUsernameEmail/sagas";
// import formVerifyAccountSaga from "./store/formVerifyAccount/sagas";
// import formForgotUsernameSaga from "./store/formForgotUsername/sagas";
// import formVerifyAccountEmailSaga from "./store/formVerifyAccountEmail/sagas";

// import authRedux from "./store/auth/reducer";
// import formSignUpReducer from "./store/formSignUp/reducer";
// import formSignUpDevReducer from "./store/formSignUpDev/reducer";
// import formForgotPasswordReducer from "./store/formForgotPassword/reducer";
// import formForgotPasswordEmailReducer from "./store/formForgotPasswordEmail/reducer";
// import formForgotUsernameEmailReducer from "./store/formForgotUsernameEmail/reducer";
// import formVerifyAccountReducer from "./store/formVerifyAccount/reducer";
// import formForgotUsernameReducer from "./store/formForgotUsername/reducer";
// import formVerifyAccountEmailReducer from "./store/formVerifyAccountEmail/reducer";

export default {
  name: "Authenticate",
  dir: "Authenticate",
  pathRoot: "",
  routes: [
    {
      url: "",
      component: "Page/LoginPage",
      layout: "LoginLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng nhập Admin",
        titleI18n: "Login Admin",
        exact: true,
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: false,
  // sagas: [
  //   authSaga(),
  //   formSignUpSaga(),
  //   formSignUpDevSaga(),
  //   accountListSaga(),
  //   formVerifyAccountSaga(),
  //   formForgotPasswordSaga(),
  //   formForgotUsernameSaga(),
  //   formVerifyAccountEmailSaga(),
  //   formForgotPasswordEmailSaga(),
  //   formForgotUsernameEmailSaga(),
  // ],
  // redux: {
  //   auth: authRedux,
  //   formSignUp: formSignUpReducer,
  //   formSignUpDev: formSignUpDevReducer,
  //   accountListReducer: accountListReducer,
  //   formVerifyAccount: formVerifyAccountReducer,
  //   formForgotPassword: formForgotPasswordReducer,
  //   formForgotUsername: formForgotUsernameReducer,
  //   formVerifyAccountEmail: formVerifyAccountEmailReducer,
  //   formForgotPasswordEmail: formForgotPasswordEmailReducer,
  //   formForgotUsernameEmail: formForgotUsernameEmailReducer,
  // },
};
