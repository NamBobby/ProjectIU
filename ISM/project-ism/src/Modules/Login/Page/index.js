import "./index.css";
import "../bootstrap.scss";
// import "./newind.scss";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

// @components
import ReactCodeInput from "react-code-input";

// @svg and img
import pet from "../assets/svg/PetAdoption.svg";
import welcome from "../assets/svg/Welcome.svg";

// @antd
import { Button, notification, Form, Modal } from "antd";

// @service
import { signIn, signUp, confirmActiveAccount } from "../Store/service";
import { checkExistCart } from "@store/user/service";

// @helpers
import { setAccessToken } from "../helpers";
import apiMethod from "@utility/ApiMethod";

// @constants
import { RETCODE_SUCCESS } from "@configs/contants";

// @actions
import { actions as ActionsUser } from "@store/user/reducer";
import { getListCart } from "../../ProductDetail/Store/actions";

// @Utility
import { phoneRegex } from "@utility/Utils";

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // sign up
  const [isDisableSignUp, setIsDisableSignUp] = useState(true);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [dataSignUp, setDataSignUp] = useState({});
  const [codeActive, setCodeActive] = useState();
  const [loadingActive, setLoadingActive] = useState(false);

  // sign in
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchCheckExistCart = async (id) => {
    try {
      const { data } = await checkExistCart({ userId: id });
      return data;
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
    }
  };

  const fetchSignIn = async () => {
    try {
      setLoading(true);
      const { data } = await signIn({
        username,
        password,
      });
      if (data?.retCode === RETCODE_SUCCESS) {
        const accessToken = data?.retData?.accessToken;
        await setAccessToken(accessToken);
        apiMethod.defaults.headers.common["Authorization"] = accessToken;
        await dispatch(ActionsUser.setInfoData(data?.retData));
        const isCart = await fetchCheckExistCart(data?.retData?.id);
        if (isCart?.retCode === 0) {
          dispatch(
            getListCart({
              userId: data?.retData?.id,
            })
          );
        }
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          window.location.href = "/";
          // history.push("/");
        }, 2000);
      } else {
        notification.error({
          message: "Fail",
          description: "Login unsuccessfully!",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfirmActiveAccount = async () => {
    try {
      setLoadingActive(true);

      const payloadActive = {
        code: Number(codeActive),
        userId: dataSignUp?.userId,
      };

      const { data } = await confirmActiveAccount(payloadActive);

      if (data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: data?.retText,
          duration: 2,
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        notification.error({
          message: "Fail",
          description: "Active code is not correct",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingActive(false);
    }
  };

  const onFinishSignUp = async (value) => {
    // console.log("value", value);
    const { email, confirmPassword, ...rest } = value || {};
    try {
      setLoadingSignUp(true);
      const payload = {
        username: email,
        statusActive: 0,
        roles: ["user"],
        ...rest,
      };
      const { data } = await signUp(payload);
      if (data.retCode === RETCODE_SUCCESS) {
        setIsModalOpen(true);
        setDataSignUp(data.retData);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingSignUp(false);
    }
  };

  const onFieldsChangeSignUp = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    const hasValues = form.getFieldsValue();
    setIsDisableSignUp(
      hasErrors ||
        !hasValues?.email ||
        !hasValues?.password ||
        !hasValues?.confirmPassword ||
        !hasValues?.fullName ||
        !hasValues?.phone ||
        !hasValues?.address
    );
  };

  const onChangeCodeActive = (e) => {
    // console.log("e", typeof e);
    setCodeActive(e);
  };

  return (
    <>
      <div className="contain-wrapper">
        <Modal
          title=""
          open={isModalOpen}
          // onOk={handleOk}
          // onCancel={handleCancel}
          // maskClosable={false}
          closable={false}
          keyboard={false}
          footer={null}
          className="pop-up-container"
          getContainer={() => document.querySelector(".contain-wrapper")}
          centered
        >
          <h2 className="popup-title text-center">Confirm Active Account</h2>
          <p className=" text-center">
            Your code active has been sent to your email{" "}
            <span className="fw-bold">{form.getFieldValue("email")}</span>.
          </p>
          <p className="text-center mb-3">
            Please enter your code to confirm active your account
          </p>
          <div className="code-input-content">
            <ReactCodeInput
              type="number"
              fields={6}
              className="code-item"
              autoFocus={true}
              onChange={(value) => onChangeCodeActive(value)}
              // isValid={form.getFieldsError(["otp"])}
              // value={code}
            />
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <Button
              className="confirm-active"
              onClick={() => fetchConfirmActiveAccount()}
              loading={loadingActive}
            >
              Confirm Active
            </Button>
          </div>
        </Modal>
        <div className="forms-container">
          <div className="login-signup">
            <form action="#" className="login-form">
              <h2 className="title">Log in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                loading={loading}
                className="btn solid"
                onClick={() => fetchSignIn()}
              >
                Login
              </Button>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <Link href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </form>
            <Form
              form={form}
              onFinish={onFinishSignUp}
              onFieldsChange={onFieldsChangeSignUp}
              className="sign-up-form"
              layout="horizontal"
              initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                fullName: "",
                phone: "",
                address: "",
              }}
            >
              <h2 className="title">Sign up</h2>
              <Form.Item
                label={false}
                required
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                  {
                    max: 250,
                    message: "Your email must be limited to 250",
                  },
                  {
                    type: "email",
                    message: "Please enter correct format of email!",
                  },
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Username" maxLength={251} />
                </div>
              </Form.Item>
              <Form.Item
                label={false}
                required
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Password" />
                </div>
              </Form.Item>
              <Form.Item
                label={false}
                required
                name={"confirmPassword"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your password again to confirm!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Your confirm password is not correct")
                      );
                    },
                  }),
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Confirm password" />
                </div>
              </Form.Item>
              <Form.Item
                label={false}
                required
                name={"fullName"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name!",
                  },
                  {
                    max: 60,
                    message: "Your full name must be limited to 60 words",
                  },
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="text" placeholder="Full name" />
                </div>
              </Form.Item>
              <Form.Item
                label={false}
                required
                name={"phone"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                  {
                    pattern: new RegExp(phoneRegex),
                    message: "Please enter your correct format of phone",
                  },
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="text" placeholder="Phone" />
                </div>
              </Form.Item>
              <Form.Item
                label={false}
                required
                name={"address"}
                rules={[
                  {
                    required: true,
                    message: "Please enter your address!",
                  },
                  {
                    max: 150,
                    message: "Your address must be limited to 150 words",
                  },
                ]}
              >
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input type="text" placeholder="Address" />
                </div>
              </Form.Item>
              <Button
                className="btn"
                htmlType="submit"
                disabled={isDisableSignUp}
                loading={loadingSignUp}
              >
                Sign up
              </Button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <Link href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </Link>
                <Link href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </Form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Let's Create your new account, then join with us!!!</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={() => {
                  const container = document.querySelector(".contain-wrapper");
                  container.classList.add("sign-up-mode");
                  // console.log("test", container);
                }}
              >
                Sign up
              </button>
            </div>
            <img src={pet} className="image" alt="Pet Adoption Picture" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>Then let's login and enjoy our services</p>
              <button
                className="btn transparent"
                id="login-btn"
                onClick={() => {
                  const container = document.querySelector(".contain-wrapper");
                  container.classList.remove("sign-up-mode");
                  // console.log("test", container);
                }}
              >
                Login
              </button>
            </div>
            <img src={welcome} className="image" alt="Welcome Picture" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
