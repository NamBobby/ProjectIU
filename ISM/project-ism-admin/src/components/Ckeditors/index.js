import React, { useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { convertFileToBase64 } from "@utility/common";

// @utility
import { uploadImg } from "@utility/UploadImg";

const Ckeditor = ({ placeholder, description = "", onChange = () => {} }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [value]);

  return (
    <CKEditor
      editor={Editor}
      data={description}
      onChange={(event, editor) => {
        const data = editor.getData();
        setValue(data);
        // console.log({ event, editor, data });
      }}
      config={{
        placeholder,
        extraPlugins: [MyCustomUploadAdapterPlugin],
      }}
      // onReady={(editor) => {
      //   // You can store the "editor" and use when it is needed.
      //   console.log("Editor is ready to use!", editor);
      // }}
      // onBlur={(event, editor) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(event, editor) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
};

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(props) {
    this.loader = props;
  }

  // Starts the upload process.
  async upload() {
    return this.loader.file.then((uploadedFile) => {
      return new Promise(async (resolve, reject) => {
        const encodeBase64 = await convertFileToBase64(uploadedFile);
        try {
          const res = await uploadImg(encodeBase64?.base64);
          if (res?.status === 200) {
            const { secure_url, ...rest } = res?.data;
            resolve({ default: secure_url });
          }
        } catch (err) {
          reject("Upload failed");
        }
      });
    });
  }
}

export default Ckeditor;
