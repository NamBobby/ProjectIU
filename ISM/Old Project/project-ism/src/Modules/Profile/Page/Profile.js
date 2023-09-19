import "../bootstrap.scss";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// @img and svg
import Banner from "../../Home/assets/images/banner.png";

// @antd
import { Button, Form, Input, notification } from "antd";

// @utility
import { emailRegex, phoneRegex } from "@utility/Utils";

// @selector
import { getUserData } from "@store/user/selector";

// @service
import { updateInfoUser } from "../Store/service";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

// @actions
import { actions as ActionsUser } from "@store/user/reducer";

const Profile = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userInfo = useSelector(getUserData);

  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      onInitData();
      onFieldsChange();
    }
  }, []);

  const onInitData = () => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      const { fullName, username, phone, address } = userInfo || {};
      form.setFieldsValue({
        fullName,
        username,
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
        !hasValues?.fullName ||
        !hasValues?.username ||
        !hasValues?.phone ||
        !hasValues?.address
    );
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const payload = {
        userId: userInfo?.id ?? userInfo?._id,
        ...values,
      };
      const { data } = await updateInfoUser(payload);
      if (data.retCode === RETCODE_SUCCESS) {
        await dispatch(ActionsUser.setInfoData(data?.retData));
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="banner-wrapper">
        <div className="banner-wrapper__content">
          <div className="row">
            <div className="col-6">
              <div className="banner-wrapper__content-info">
                <h2>One more friend</h2>
                <h3>Thousands more fun!</h3>
                <p>
                  Having a pet means you have more joy, a new friend, a happy
                  person who will always be with you to have fun. We have 200+
                  different pets that can meet your needs!
                </p>
                <div className="img-left-orange" />
              </div>
            </div>
            <div className="col-6">
              <div className="banner-wrapper__content-imgBox">
                <img src={Banner} alt="banner-img" className="banner-img" />
                <div className="img-right-orange" />
                <div className="img-right-blue" />
              </div>
            </div>
          </div>
          <div className="banner-background-color" />
        </div>
      </div>

      <div className="profile-wrapper__infoContent">
        <div className="container p-5">
          <h1>User information</h1>
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
          >
            <div className="row">
              <Form.Item
                className="col-6 ps-3 pe-3"
                label="Full name"
                name="fullName"
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
                className="col-6 ps-3 pe-3"
                label="Email"
                name="username"
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
                className="col-6 ps-3 pe-3"
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
                className="col-6 ps-3 pe-3"
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

              <div className="col-12">
                <div className="d-flex flex-row justify-content-end align-items-center">
                  <Button
                    className={`btn-update-info`}
                    disabled={isDisable}
                    loading={loading}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
