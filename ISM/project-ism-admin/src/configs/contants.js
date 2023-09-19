import {
  ENVIRONMENT_FIRE_BASE_SECURITY,
  ENVIRONMENT_VERSION_DESKTOP,
} from "./environment";

export const FIRE_BASE_SECURITY = ENVIRONMENT_FIRE_BASE_SECURITY;

//API STATUS
export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const SESSION_EXPIRED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const POST_SUCCESS = 201;
export const DELETE_SUCCESS = 204;
export const RETCODE_SUCCESS = 0;

// PARAM QUERY
export const PAGE_DEFAULT = 1;
export const LIMIT_DEFAULT = 5;

// PARAM QUERY

// ROUTES
export const ROUTES = {
  PRODUCT: "PRODUCT",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",
  ORDER: "ORDER",
  SELECT_BRANCH: "SELECT_BRANCH",
};

//ACTION SHEET
export const CANCEL_INDEX = 0;
export const PICK_IMAGE_OPTIONS = [
  "Huỷ",
  "Chọn từ bộ sưu tập ảnh",
  "Chụp hình",
];

export const APP_ID = "5PTB";

export const OPTION_OTP = "app_5ptb";

// export const PAYMENT_STEP_LIST = [
//   {
//     title: "order",
//     route:
//       PaymentRoutesConfig.PaymentStack.screens.TopTabs.screens
//         .SuperSchoolMemoryOrderDetails.name
//   },
//   {
//     title: "payment_method",
//     route:
//       PaymentRoutesConfig.PaymentStack.screens.TopTabs.screens
//         .SuperSchoolMemoryPaymentMethod.name
//   },
//   {
//     title: "payment_finish",
//     route:
//       PaymentRoutesConfig.PaymentStack.screens.TopTabs.screens
//         .SuperSchoolMemoryPaymentFinish.name
//   }
// ]

export const CLASS = [
  { name: "Lớp mầm", code: "1" },
  { name: "Lớp chồi", code: "2" },
  { name: "Lớp lá", code: "3" },
];
export const CLOTHES_SIZE = [
  { name: "S", code: "1" },
  { name: "M", code: "2" },
  { name: "L", code: "3" },
  { name: "XL", code: "4" },
  { name: "XXL", code: "5" },
  { name: "XXL", code: "6" },
];
export const GENDER = [
  { name: "Nam", code: "1" },
  { name: "Nữ", code: "2" },
];

export const HOT_LINE = "0939 279 868";
export const WEBSITE = "5phutthuocbai.com";
export const PRIVACY_POLICY = "https://5phutthuocbai.com/Policy/privacy";
export const NEWS_EVENT = "https://tamtriluc.com/category/tin-su-kiens/";

export const VIDEO_ALLOW = "Allow";
export const VIDEO_DENIED = "AccessDenied";
export const ORDER_CODE = "OTHER";

export const TRIAL_CODE = "TRIAL";
export const OTP_ERROR_CODE = 7;

export const SCREEN_TYPES = {
  JOURNEY_365: "JOURNEY_365",
  DRAW_SKETCH_NOTE: "DRAW_SKETCH_NOTE",
  JOURNEY_TO_CONQUER_STAR: "JOURNEY_TO_CONQUER_STAR",
};

export const BANNER_APP_LINK = {
  MuaTaiKhoan: "/pricing",
  DangKyTraiNghiemKhoaHoc: "/accounts/active_free_account/0",
  DangKyHocSTNHD: "/signup",
  KichHoatTaiKhoan: "/accounts/active/0",
  VaoTrangEbook: "/Book",
  VaoTrangVideoKTGN: "/memorization-video",
  VaoTrangVideoBGSK: "/lectures/1",
  VaoTrangMindmap: "/lectures/2",
  VaoTrangDienDan: "/forum",
};

export const HOST_URL = "https://5phutthuocbai.com";
