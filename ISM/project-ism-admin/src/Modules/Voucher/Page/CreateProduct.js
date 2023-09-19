import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

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
import Ckeditor from "@components/Ckeditors";

// @service
import {
  getDetailVoucher,
  createVoucher,
  updateVoucher,
} from "../Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const { idVoucher } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const [descriptionCke, setDescriptionCke] = useState("");

  useEffect(() => {
    if (idVoucher) {
      fetchDetailProduct();
    }
  }, []);

  const fetchDetailProduct = async () => {
    try {
      const res = await getDetailVoucher({
        idVoucher,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        onInitData(res?.data?.retData);
        setDescriptionCke(res?.data?.retData?.description);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const onInitData = (dataVoucher) => {
    if (dataVoucher && Object.keys(dataVoucher).length > 0) {
      const { name, description } = dataVoucher || {};
      form.setFieldsValue({
        name,
        description,
      });
    }
  };

  const disabledDate = (current) => {
    const LIMIT_YEAR = 1900;
    return current && current.year() < LIMIT_YEAR;
  };

  const onFinish = async (values) => {
    // console.log("values", values);
    const { name, description } = values || {};
    try {
      setLoading(true);
      const { data } = idVoucher
        ? await updateVoucher({
            idVoucher,
            name: name,
            description: description,
          })
        : await createVoucher({
            name: name,
            description: description,
          });

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          history.push("/manage-voucher");
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
    // console.log("test", hasValues);
    setIsDisable(hasErrors || !hasValues?.name || !hasValues?.description);
  };

  return (
    <div className="create-product">
      <div className="mb-3">
        <h1 className="create-product__title">Create voucher</h1>
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
            className="form-custom col-12 ps-3 pe-3"
            label={`Voucher name`}
            rules={[
              {
                required: true,
                message: "Please, enter your voucher name",
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
            className="form-custom col-12 ps-3 pe-3"
            label={`Description`}
            rules={[
              {
                required: true,
                message: "Please, enter your description",
              },
            ]}
          >
            <Ckeditor
              placeholder={"Enter your description"}
              // onChange={(e) => console.log("e", e)}
              description={descriptionCke}
            />
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

          <div className="d-flex flex-row justify-content-end align-items-center">
            <Button
              className={classNames({
                "submit-btn": true,
                disable: idVoucher ? false : isDisable,
              })}
              disabled={idVoucher ? false : isDisable}
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
