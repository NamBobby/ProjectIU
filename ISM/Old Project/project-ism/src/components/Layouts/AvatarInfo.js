import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// @service
import { checkExistCart } from "@store/user/service";

// @selector
import { getUserData } from "@store/user/selector";

// @action
import { resetCart } from "../../Modules/ProductDetail/Store/actions";

const AvatarInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector(getUserData);

  const goToCustomerProfile = () => {
    history.push("/profile/information");
  };

  const goToCustomerOrder = () => {
    history.push("/profile/order");
  };

  const fetchCheckExistCart = async () => {
    try {
      const { data } = await checkExistCart({ userId: userInfo?.id });
      if (data.retCode === 0) {
        dispatch(resetCart());
        setTimeout(() => {
          logout();
        }, 500);
      } else {
        setTimeout(() => {
          logout();
        }, 500);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:user");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("persist:Payment");
    localStorage.removeItem("persist:Auth");
    localStorage.removeItem("mode");
    localStorage.removeItem("persist:layout");
    window.location.href = "/";
  };

  return (
    <div className="avatar-info-content">
      <div onClick={() => goToCustomerProfile()}>Customer's Profile</div>
      <div onClick={() => goToCustomerOrder()}>Customer's Order</div>
      <div onClick={() => fetchCheckExistCart()}>Log out</div>
    </div>
  );
};

export default AvatarInfo;
