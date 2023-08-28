import AWS from "aws-sdk";
import { ENVIRONMENT_awsKeys } from "../configs/environment";

AWS.config.update({
  accessKeyId: ENVIRONMENT_awsKeys.accessKeyID,
  secretAccessKey: ENVIRONMENT_awsKeys.secretKeyID,
  region: "sgn",
  signatureVersion: "v4",
  s3ForcePathStyle: true,
});
const s3Bucket = new AWS.S3({ endpoint: ENVIRONMENT_awsKeys.endpoint });

// const uploadImage = async (
//   file = {},
//   refFolder = "",
//   fileName = "",
//   onBeginUpLoad = () => {},
//   onEndUpLoad = () => {},
//   onUpLoadError = () => {}
// ) => {
//   if (!file) {
//     return
//   }
//   try {
//     onBeginUpLoad()

//     await firebaseStorage
//       .ref(rootDir + refFolder)
//       .child(fileName)
//       .put(file)
//     const resUrl = await firebaseStorage
//       .ref(rootDir + refFolder)
//       .child(fileName)
//       .getDownloadURL()

//     return resUrl
//   } catch (err) {
//     console.log("UPLOAD ERR", err)
//     onUpLoadError()
//   } finally {
//     onEndUpLoad()
//   }
// }
const getBuffer = (blob) => {
  console.log("BLOB FILE", blob);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.log("READER ERR", error);
      reject(error);
    };
  });
};

export const uploadImage = async (file, dir, filename) => {
  try {
    // let buf = await getBuffer(file)

    const params = {
      Bucket: "social",
      Key: `${dir}_${filename}`, // File name you want to save as in S3
      Body: file,
      ContentType: "image/jpg",
      ContentEncoding: "base64",
      ACL: "public-read",
    };

    return s3Bucket
      .upload(params)
      .promise()
      .then((res) => res.Location)
      .catch((err) => {
        console.log("UPLOAD ERR", err);
      });
  } catch (error) {
    console.log("list folder error", error);
  }
};
export default uploadImage;
