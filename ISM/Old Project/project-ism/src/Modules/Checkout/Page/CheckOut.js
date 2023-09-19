import "../bootstrap.scss";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// @components
import PaymentForm from "../components/Payship/PaymentForm";
import Placeorder from "../components/Placeorder/Placeorder";
import Ship from "../components/Payship/Ship";
import CheckTop from "../components/CheckTop/CheckTop";

// @selector
import { getUserData } from "@store/user/selector";
import { getDataCart } from "../../ProductDetail/Store/selectors";

// @service
import { createOrder } from "../Store/service";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

const CheckOut = () => {
  const history = useHistory();

  const cartInfo = useSelector(getDataCart);
  const userInfo = useSelector(getUserData);

  const [infoUser, setInfoUser] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchCreateOrder = async () => {
    try {
      setLoading(true);
      const { methodPayment, methodReiceive, ...rest } = infoUser || {};
      const payload = {
        userId: userInfo?.id,
        cartId: cartInfo?._id,
        infoOrder: rest,
        statusOrder: 0,
        methodPayment: methodPayment === "onlinePayment" ? 0 : 1,
        methodReiceive: methodReiceive === "onlineReceive" ? 0 : 1,
      };
      const { data } = await createOrder(payload);
      if (data.retCode === RETCODE_SUCCESS) {
        history.push({
          pathname: "/checkout/payment",
          state: {
            orderId: data?.retData?._id,
          },
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PayMoney">
      <div className="container">
        <CheckTop />
        <div className="checkout">
          <div className="payship">
            <PaymentForm
              setIsDisable={setIsDisable}
              setInfoUser={setInfoUser}
              fetchCreateOrder={fetchCreateOrder}
            />
            {/* <Ship /> */}
          </div>
          <Placeorder
            cartInfo={cartInfo}
            isDisable={isDisable}
            fetchCreateOrder={fetchCreateOrder}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
