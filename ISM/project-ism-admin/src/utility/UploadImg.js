import { uploadImgProduct } from "../Modules/Products/Store/service";

export const uploadImg = (base64ImgEncode) => {
  // try {
  //   const res = await uploadImgProduct({ data: base64ImgEncode });
  //   return res;
  // } catch (err) {
  //   console.log("err", err);
  // }
  return uploadImgProduct({ data: base64ImgEncode });

  // try {
  //   await fetch("http://localhost:3000/upload/upload-cloudinary", {
  //     method: "POST",
  //     body: JSON.stringify({ data: base64ImgEncode }),
  //     headers: { "Content-type": "application/json" },
  //   });
  // } catch (err) {
  //   console.log("err", err);
  // }
};
