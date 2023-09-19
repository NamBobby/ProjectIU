import "../bootstrap.scss";
import "../responsive.scss";

import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";

// @components
import { Form, Input, Button, notification, Modal, Upload, Spin } from "antd";
import Ckeditor from "@components/Ckeditors";
import { PlusOutlined } from "@ant-design/icons";

// @service
import { createNews } from "../Store/service";
import { uploadImg } from "@utility/UploadImg";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

const CreateNews = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await createNews({
        ...values,
        linkImage: fileList[0].url,
      });

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-news");
        }, 1000);
      } else {
        notification.error({
          message: "Fail",
          description: "Create fail",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(
      hasErrors ||
        !hasValues?.title ||
        !hasValues?.description ||
        !hasValues?.content
    );
  };

  const [imgBase64, setImgBase64] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(async () => {
    if (imgBase64) {
      try {
        setLoadingUpload(true);
        const res = await uploadImg(imgBase64);
        if (res?.status === 200) {
          const listImg = {
            uid: res?.data?.version_id,
            url: res?.data?.secure_url,
          };
          setFileList((prev) => [...prev, listImg]);
          setImgBase64();
        }
      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoadingUpload(false);
      }
    }
  }, [imgBase64]);

  const getBase64Img = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgBase64(reader.result);
    };
  };

  const handleCancel = () => setPreviewOpen(false);

  const validateFile = (file) => {
    // console.log("hihi", file);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Your image must less than 10MB");
    }
    return isJpgOrPng && isLt10M;
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleChange = async (props) => {
    const { file, fileList } = props || {};
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (isJpgOrPng) await getBase64Img(file?.originFileObj);
  };

  const handleRemove = (e) => {
    // console.log("e", e);
    const fileRemoved = fileList?.filter((item) => item?.uid !== e?.uid);
    setFileList(fileRemoved);
  };

  const uploadButton = (
    <Spin spinning={loadingUpload}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </Spin>
  );

  return (
    <div className="create-product">
      <div className="mb-3">
        <h1 className="create-product__title">Create product</h1>
      </div>
      <div className="create-product__formCreate">
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFieldsChange={handleFormChange}
          className="box-form row"
          requiredMark={false}
        >
          <Form.Item
            name="title"
            className="form-custom col-6 ps-3 pe-3"
            label={`New's title`}
            rules={[
              {
                required: true,
                message: "Please, enter news title",
              },
            ]}
          >
            <Input
              autoFocus
              className="input-field"
              placeholder={`Enter news title`}
            />
          </Form.Item>

          <Form.Item
            name="description"
            className="form-custom col-6 ps-3 pe-3"
            label={`New's description`}
            rules={[
              {
                required: true,
                message: "Please, enter news description",
              },
            ]}
          >
            <Input
              className="input-field"
              placeholder={`Enter news description`}
            />
          </Form.Item>

          <Form.Item
            name="linkImage"
            className="form-custom col-6 ps-3 pe-3"
            label={`Image`}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={(options) => {
                const { file } = options || {};
                options.onSuccess(file, options.file);
              }}
              beforeUpload={validateFile}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={(e) => handleRemove(e)}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={""}
              footer={null}
              onCancel={handleCancel}
              centered
            >
              <img
                alt="preview-img"
                style={{ width: "100%" }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

          <Form.Item
            name="content"
            className="form-custom col-12 ps-3 pe-3"
            label={`New's content`}
            rules={[
              {
                required: true,
                message: "Please, enter news content",
              },
            ]}
          >
            <Ckeditor placeholder={"Enter news content"} />
          </Form.Item>

          <div className="d-flex flex-row justify-content-end align-items-center">
            <Button
              className={classNames({
                "submit-btn": true,
                disable: isDisable,
              })}
              disabled={isDisable}
              loading={loading}
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateNews;
