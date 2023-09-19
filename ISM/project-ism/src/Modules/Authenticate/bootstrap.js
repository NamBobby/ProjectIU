import intlMessagesEN from "./i18n/localization/en.json";
import intlMessagesVi from "./i18n/localization/vi.json";
import accountListSaga from "./store/accountList/sagas";
import accountListReducer from "./store/accountList/reducer";

import authSaga from "./store/auth/sagas";
import formSignUpSaga from "./store/formSignUp/sagas";
import formSignUpDevSaga from "./store/formSignUpDev/sagas";
import formForgotPasswordSaga from "./store/formForgotPassword/sagas";
import formForgotPasswordEmailSaga from "./store/formForgotPasswordEmail/sagas";
import formForgotUsernameEmailSaga from "./store/formForgotUsernameEmail/sagas";
import formVerifyAccountSaga from "./store/formVerifyAccount/sagas";
import formForgotUsernameSaga from "./store/formForgotUsername/sagas";
import formVerifyAccountEmailSaga from "./store/formVerifyAccountEmail/sagas";

import authRedux from "./store/auth/reducer";
import formSignUpReducer from "./store/formSignUp/reducer";
import formSignUpDevReducer from "./store/formSignUpDev/reducer";
import formForgotPasswordReducer from "./store/formForgotPassword/reducer";
import formForgotPasswordEmailReducer from "./store/formForgotPasswordEmail/reducer";
import formForgotUsernameEmailReducer from "./store/formForgotUsernameEmail/reducer";
import formVerifyAccountReducer from "./store/formVerifyAccount/reducer";
import formForgotUsernameReducer from "./store/formForgotUsername/reducer";
import formVerifyAccountEmailReducer from "./store/formVerifyAccountEmail/reducer";

export default {
  name: "Authenticate",
  dir: "Authenticate",
  pathRoot: "",
  routes: [
    {
      url: "confirm-password-v2/:phoneNumber",
      component: "Page/ConfirmPasswordV2",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "confirm-parent-v2/:phoneNumber",
      component: "Page/ConfirmParentInfoV2",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "confirm-forgot-v2/:phoneNumber",
      component: "Page/ConfirmForgotV2",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "confirm-v2/:phoneNumber",
      component: "Page/ConfirmOTPV2",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "confirm-contract-otp/:phoneNumber",
      component: "Page/ContractConfirmOTP",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "recaptcha-confirm/:otp",
      component: "Page/ReCaptchaConfirm",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "recaptcha/:phoneNumber",
      component: "Page/ReCaptcha",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "signup",
      component: "Page/Signup",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "register",
      component: "Page/SignupPublic",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Đăng ký | Tâm Trí Lực",
        titleI18n: "FormSignUp:title",
      },
    },
    {
      url: "forgot-username",
      component: "Page/ForgotUsername",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Quên tên đăng nhập | Tâm Trí Lực",
        titleI18n: "FormForgotUsername:title",
      },
    },
    {
      url: "forgot-password",
      component: "Page/ForgotPassword",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Quên mật khẩu | Tâm Trí Lực",
        titleI18n: "FormForgotPassword:title",
      },
    },
    {
      url: "accounts/list",
      component: "Page/AccountList",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Quên mật khẩu | Tâm Trí Lực",
        titleI18n: "FormForgotPassword:title",
      },
    },
    {
      url: "verify/:type",
      component: "Page/VerifyAccount",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Xác thực tài khoản | Tâm Trí Lực",
        titleI18n: "FormVerifyAccount:title",
      },
    },
    {
      url: "active-code",
      component: "Page/FormActiveCode",
      layout: "BlankLayout",
      meta: {
        authRoute: true,
      },
      props: {
        title: "Xác thực tài khoản | Tâm Trí Lực",
        titleI18n: "FormVerifyAccount:title",
      },
    },
  ],
  lang: { vi: intlMessagesVi, en: intlMessagesEN },
  isAuthenticate: "Any",
  sagas: [
    authSaga(),
    formSignUpSaga(),
    formSignUpDevSaga(),
    accountListSaga(),
    formVerifyAccountSaga(),
    formForgotPasswordSaga(),
    formForgotUsernameSaga(),
    formVerifyAccountEmailSaga(),
    formForgotPasswordEmailSaga(),
    formForgotUsernameEmailSaga(),
  ],
  redux: {
    auth: authRedux,
    formSignUp: formSignUpReducer,
    formSignUpDev: formSignUpDevReducer,
    accountListReducer: accountListReducer,
    formVerifyAccount: formVerifyAccountReducer,
    formForgotPassword: formForgotPasswordReducer,
    formForgotUsername: formForgotUsernameReducer,
    formVerifyAccountEmail: formVerifyAccountEmailReducer,
    formForgotPasswordEmail: formForgotPasswordEmailReducer,
    formForgotUsernameEmail: formForgotUsernameEmailReducer,
  },
};
