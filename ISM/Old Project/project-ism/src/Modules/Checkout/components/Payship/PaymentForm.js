import React, { useEffect, useState } from "react";
import QRcode from "@src/Modules/Checkout/assets/images/qr.png";
import { useSelector } from "react-redux";

// @antd
import { Form, Input, Radio, Space } from "antd";

// @utility
import { emailRegex, phoneRegex } from "@utility/Utils";

// @selector
import { getUserData } from "@store/user/selector";

const PaymentForm = ({ setInfoUser = () => {}, setIsDisable = () => {} }) => {
  const userInfo = useSelector(getUserData);
  const [form] = Form.useForm();

  useEffect(() => {
    onInitData();
  }, []);

  const onInitData = () => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      const { fullName, username, phone, address } = userInfo || {};
      form.setFieldsValue({
        fullname: fullName,
        mail: username,
        phone,
        address,
      });
    }
  };

  const onFieldsChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisable(
      hasErrors ||
        !hasValues?.fullname ||
        !hasValues?.mail ||
        !hasValues?.phone ||
        !hasValues?.address ||
        !hasValues?.methodPayment ||
        !hasValues?.methodReiceive
    );
    // console.log("hasValues", hasValues);
    setInfoUser(hasValues);
  };

  return (
    <React.Fragment>
      <div className="paymentinfo">
        <h4>Payment Information</h4>
        <br />
        <div className="form">
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={onFieldsChange}
            // onFinish={onFinish}
          >
            <Form.Item
              label="Full name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your full name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="mail"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Please input correct format of email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number",
                },
                {
                  pattern: new RegExp(phoneRegex),
                  message: "Please input correct format of phone number",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Payment method"
              name={"methodPayment"}
              rules={[
                {
                  required: true,
                  message: "Please choose your payment method",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={"onlinePayment"}> Payment online </Radio>
                  <Radio value={"offlinePayment"}> Payment on delivery </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Payment receive"
              name={"methodReiceive"}
              rules={[
                {
                  required: true,
                  message: "Please choose your payment receive",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={"onlineReceive"}>
                    {" "}
                    Grab bike will delivery your pets to your home{" "}
                  </Radio>
                  <Radio value={"offlineReceive"}>
                    {" "}
                    Receive pets at the store{" "}
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentForm;
