import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

// @utility
import { uploadImg } from "../../../utility/UploadImg";

// @components
import {
  Form,
  Input,
  Button,
  notification,
  Select,
  DatePicker,
  Modal,
  Upload,
  message,
  Spin,
} from "antd";
const { Option } = Select;
import { PlusOutlined } from "@ant-design/icons";

// @service
import {
  createProduct,
  getDetailProduct,
  updateProduct,
} from "../Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const { idProduct } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [imgBase64, setImgBase64] = useState();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (idProduct) {
      fetchDetailProduct();
      // handleFormChange();
    }
  }, []);

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

  const fetchDetailProduct = async () => {
    try {
      const res = await getDetailProduct({
        idProduct,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        onInitData(res?.data?.retData);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const onInitData = (dataProduct) => {
    if (dataProduct && Object.keys(dataProduct).length > 0) {
      const {
        name,
        description,
        price,
        gender,
        age,
        weight,
        location,
        dob,
        image,
      } = dataProduct || {};
      setFileList(image);
      form.setFieldsValue({
        dob: moment(dob),
        name,
        description,
        price,
        gender,
        age,
        weight,
        location,
        // dob,
      });
    }
  };

  const disabledDate = (current) => {
    const LIMIT_YEAR = 1900;
    return current && current.year() < LIMIT_YEAR;
  };

  const getBase64Img = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgBase64(reader.result);
    };
  };

  const onFinish = async (values) => {
    // console.log("values", values);
    const { dob, image, ...rest } = values || {};
    try {
      setLoading(true);
      const { data } = idProduct
        ? await updateProduct({
            idProduct,
            dob: moment(dob).format(),
            image: fileList,
            ...rest,
          })
        : await createProduct({
            dob: moment(dob).format(),
            image: fileList,
            ...rest,
          });

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-products");
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
        !hasValues?.name ||
        !hasValues?.description ||
        // !hasValues?.image ||
        !hasValues?.price ||
        !hasValues?.gender ||
        !hasValues?.age ||
        !hasValues?.weight ||
        !hasValues?.location ||
        !hasValues?.dob
    );
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
            name="name"
            className="form-custom col-6 ps-3 pe-3"
            label={`Product name`}
            rules={[
              {
                required: true,
                message: "Please, enter your product name",
              },
            ]}
          >
            <Input
              autoFocus
              className="input-field"
              placeholder={`Enter your product name`}
            />
          </Form.Item>

          <Form.Item
            name="description"
            className="form-custom col-6 ps-3 pe-3"
            label={`Description`}
            rules={[
              {
                required: true,
                message: "Please, enter your description",
              },
            ]}
          >
            <Input
              className="input-field"
              placeholder={`Enter your description`}
            />
          </Form.Item>

          <Form.Item
            name="image"
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
              {fileList.length >= 8 ? null : uploadButton}
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
            name="price"
            className="form-custom col-6 ps-3 pe-3"
            label={`Price`}
            rules={[
              {
                required: true,
                message: "Please, enter your price",
              },
            ]}
          >
            <Input
              type="number"
              className="input-field"
              placeholder={`Enter your price`}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            className="form-custom col-6 ps-3 pe-3"
            label={`Gender`}
            rules={[
              {
                required: true,
                message: "Please, enter your gender",
              },
            ]}
          >
            <Select
              placeholder={"Enter your gender"}
              className="custom-select-text"
              // suffixIcon={<ArrowDown />}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="age"
            className="form-custom col-6 ps-3 pe-3"
            label={`Age`}
            rules={[
              {
                required: true,
                message: "Please, enter your age",
              },
            ]}
          >
            <Input className="input-field" placeholder={`Enter your age`} />
          </Form.Item>

          <Form.Item
            name="weight"
            className="form-custom col-6 ps-3 pe-3"
            label={`Weight`}
            rules={[
              {
                required: true,
                message: "Please, enter your weight",
              },
            ]}
          >
            <Input className="input-field" placeholder={`Enter your weight`} />
          </Form.Item>

          <Form.Item
            name="location"
            className="form-custom col-6 ps-3 pe-3"
            label={`Location`}
            rules={[
              {
                required: true,
                message: "Please, enter your location",
              },
            ]}
          >
            <Input
              className="input-field"
              placeholder={`Enter your location`}
            />
          </Form.Item>

          <Form.Item
            name="dob"
            className="form-custom col-6 ps-3 pe-3"
            label={`Day of birth`}
            rules={[
              {
                required: true,
                message: "Please, enter your day of birth",
              },
            ]}
          >
            <DatePicker
              disabledDate={disabledDate}
              placeholder={`Enter your day of birth`}
              className="w-100 custome-antpicker"
              // suffixIcon={<ArrowDown />}
              // disabled
              // format={"DD/MM/YYYY"}
              // onChange={handleBirthDayChange}
            />
          </Form.Item>

          <div className="d-flex flex-row justify-content-end align-items-center">
            <Button
              className={classNames({
                "submit-btn": true,
                disable: idProduct ? false : isDisable,
              })}
              disabled={idProduct ? false : isDisable}
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

export default CreateProduct;
