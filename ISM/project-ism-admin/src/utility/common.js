export const sleep = (second) => {
  //console.log(1);
  const waitTill = new Date(new Date().getTime() + second * 1000);
  while (waitTill > new Date()) {}
  //console.log(2);
};

export const formatVND = (num) => {
  if (!num) return 0;
  return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
};

export function formatToCurrencyVND(number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(0);
}

export const getFirstLetter = (str) => {
  if (str && typeof str === "string" && str.length > 0) {
    return str[0].toUpperCase();
  } else {
    return null;
  }
};

export const messageError = (message, field, params = {}) => {
  let str = message;
  str = str.replace(/{_field_}/gi, field);
  for (const i in params) {
    const value = params[i];
    str = str.replace(new RegExp(i, "gi"), value);
  }
  return str;
};

export const messageFormat = (message, params = {}) => {
  let str = message;
  for (const i in params) {
    const value = params[i];
    str = str.replace(new RegExp(i, "gi"), value);
  }
  return str;
};

export const secretPhone = (phoneNumber) => {
  phoneNumber = phoneNumber.replace(phoneNumber.substring(4, 6), "***");
  return phoneNumber;
};

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^.{8,50}$/;
export const fullNameRegex =
  /^[a-zA-ZÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ"+"ụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]{1,50}$/;
export const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
/*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
export const usernameRegex = /^[a-zA-Z0-9_\.]+$/;
export const emailOrPhoneRegex =
  /((84|0[3|5|7|8|9])+([0-9]{8})\b)|(^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$)/;

const isIPhoneXSize = () => dim.height === 812 || dim.width === 812;
const isIPhoneXrSize = () => dim.height === 896 || dim.width === 896;
const isIPhone12Size = () => dim.height === 844 || dim.width === 844;
export const isIphoneX = () =>
  Platform.OS === "ios" &&
  (isIPhoneXSize() || isIPhoneXrSize() || isIPhone12Size());

export const getIDFromYoutubeURL = (url) => {
  try {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  } catch (e) {
    return "";
  }
};

export const matchYoutubeUrl = (url) => {
  try {
    const p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () =>
      resolve({
        fileName: file.name,
        base64: reader.result,
      });
    reader.onerror = reject;
  });
