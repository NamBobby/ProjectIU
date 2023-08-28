import "../bootstrap.scss";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// @service
import {
  getDetailOrder,
  deleteDetailOrder,
  sendEmailConfirm,
} from "../Store/service";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

// @antd
import { Spin, Empty, Radio, Space, Button } from "antd";

// @images
import CREDIT_CARD from "../assets/images/creditcard.jpg";
import MOMO from "../assets/images/momo.jpg";

// @utility
import { formatToCurrencyVND } from "@utility/common";

const Payment = () => {
  const location = useLocation();
  const history = useHistory();

  const { orderId } = location.state || {};

  const [detailOrder, setDetailOrder] = useState({});

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const [value, setValue] = useState(1);

  useEffect(() => {
    fetchGetDetailOrder();
  }, []);

  const fetchGetDetailOrder = async () => {
    if (orderId) {
      try {
        setLoading(true);
        const { data } = await getDetailOrder({
          orderId,
        });
        // console.log(data);
        if (data?.retCode === RETCODE_SUCCESS) {
          setDetailOrder(data?.retData);
        }
      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchDeleteDetailOrder = async () => {
    try {
      setLoadingDelete(true);
      const payload = {
        orderId,
      };
      const { data } = await deleteDetailOrder(payload);
      if (data.retCode === RETCODE_SUCCESS) {
        history.push("/checkout");
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingDelete(false);
    }
  };

  const fetchSendEmailConfirm = async () => {
    try {
      setLoadingConfirm(true);
      const payload = {
        orderId: detailOrder?._id,
        userEmail: detailOrder?.infoOrder?.mail,
        userName: detailOrder?.infoOrder?.fullname,
      };
      const { data } = await sendEmailConfirm(payload);
      if (data.retCode === RETCODE_SUCCESS) {
        history.push("/");
      }
      // console.log("data", data);
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoadingConfirm(false);
    }
  };

  // console.log("state", detailOrder);

  const onChange = (e) => {
    // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="payment-wrapper">
        <div className="container">
          <h1 className="payment-title">Payment information</h1>
          <div
            className="payment-content"
            style={{ height: loading ? "70vh" : false }}
          >
            {loading ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <Spin />
              </div>
            ) : !detailOrder ? (
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <Empty description="There is no current order which was created" />
              </div>
            ) : (
              <div className="row">
                <div className="col-6 p-3">
                  {detailOrder?.statusOrder === 0 ? (
                    detailOrder?.methodPayment === 0 ? (
                      <div className="select-method-payment">
                        <h3 className="select-method-payment__title">
                          Select your payment
                        </h3>
                        <div className="d-flex flex-row justify-content-center align-items-center">
                          <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>Credit card</Radio>
                            <Radio value={2}>Momo</Radio>
                          </Radio.Group>
                        </div>
                        <div className="payment-qr">
                          <img
                            src={value === 1 ? CREDIT_CARD : MOMO}
                            className="qr-image"
                            alt="qr-image"
                          />
                        </div>
                        <div className="btn-payment">
                          <Button
                            onClick={() => fetchDeleteDetailOrder()}
                            loading={loadingDelete}
                          >
                            Cancel Payment
                          </Button>
                          <Button
                            onClick={() => fetchSendEmailConfirm()}
                            loading={loadingConfirm}
                          >
                            Confirm Payment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex flex-column justify-content-center align-items-center h-100">
                        <h1 className="text-center text-primary">
                          Direct payment upon receipt
                        </h1>
                      </div>
                    )
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100">
                      <h1 className="text-center text-primary">
                        You have already paid or canceled payment for this order
                      </h1>
                    </div>
                  )}
                </div>
                <div className="col-6 p-3">
                  <div className="order-payment-information">
                    <h3 className="order-payment-information__title">
                      Order information
                    </h3>
                    <div className="order-payment-information__content">
                      <div className="order-payment-information__content-box">
                        <h4>Order detail:</h4>
                        <p>Id order: {detailOrder?._id}</p>
                        <p>
                          Status order:{" "}
                          {detailOrder?.statusOrder === 0 && (
                            <span className="text-warning">
                              Pending payment
                            </span>
                          )}
                        </p>
                        <p>
                          Method payment:{" "}
                          {detailOrder?.methodPayment === 0
                            ? "Payment online"
                            : "Payment on delivery"}{" "}
                        </p>
                        <p>
                          Method receive:{" "}
                          {detailOrder?.methodReiceive === 0
                            ? "Grab bike will delivery your pets to your home"
                            : "Receive pets at the store"}{" "}
                        </p>
                      </div>
                      <div className="order-payment-information__content-box">
                        <h4>Customer:</h4>
                        <p>Full name: {detailOrder?.infoOrder?.fullname}</p>
                        <p>Email: {detailOrder?.infoOrder?.mail}</p>
                        <p>Phone number: {detailOrder?.infoOrder?.phone}</p>
                        <p>Address: {detailOrder?.infoOrder?.address}</p>
                      </div>
                      <div className="order-payment-information__content-box">
                        <h4>Cart:</h4>
                        <p>
                          Total products: {detailOrder?.cartId?.totalProduct}
                        </p>
                        <p>Total price: {detailOrder?.cartId?.totalPrice}</p>
                        <p>List products:</p>
                        {detailOrder?.cartId?.listCart?.map((item) => {
                          return (
                            <div className="row">
                              <div className="col-5">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                  <img
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      objectFit: "contain",
                                    }}
                                    src={item?.image[0].url}
                                    className="image-box"
                                  />
                                </div>
                              </div>
                              <div className="col-7">
                                <div className="d-flex flex-column justify-content-center align-items-start h-100">
                                  <h4 className="mb-1">
                                    {item?.name} - x{item?.totalItem}
                                  </h4>
                                  <p className="mb-1 ms-0">
                                    {" "}
                                    {formatToCurrencyVND(item?.totalPrice)}
                                  </p>
                                  <p
                                    style={{ textTransform: "capitalize" }}
                                    className="mb-1 ms-0"
                                  >
                                    Gender: {item.gender}
                                  </p>
                                  <p
                                    style={{ textTransform: "capitalize" }}
                                    className="mb-1 ms-0"
                                  >
                                    Age: {item.age}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
