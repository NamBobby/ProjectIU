import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @antd
import { Button, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

// @actions
import { deleteItemCart } from "../../Modules/ProductDetail/Store/actions";

// @selector
import { getUserData } from "@store/user/selector";
import { getLoadingCart } from "../../Modules/ProductDetail/Store/selectors";

const CartInfo = ({ cartInfo }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector(getUserData);
  const loadingCart = useSelector(getLoadingCart);

  const { listCart } = cartInfo || {};

  const [isHover, setIsHover] = useState(false);
  const [itemHover, setItemHover] = useState({});

  // console.log("cartInfo", loadingCart);

  const handleDeleteItemCart = (itemCart) => {
    dispatch(
      deleteItemCart({
        userId: userInfo?.id,
        cartProduct: {
          ...itemCart,
          totalItem: 1,
          totalPrice: itemCart?.price,
        },
      })
    );
  };

  const goToCheckout = () => {
    if (userInfo && Object.keys(userInfo).length > 0) {
      history.push("/checkout");
    } else {
      history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <div className="cart-content">
        <Spin spinning={loadingCart}>
          {listCart?.map((item) => {
            return (
              <div
                className="cart-content__item"
                onMouseOver={() => {
                  setIsHover(true);
                  setItemHover(item);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setItemHover({});
                }}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="cart-content__item-image">
                      <img
                        src={item.image[0].url}
                        className="image-cart"
                        alt="image-cart"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h3 className="cart-content__item-title">
                      {item.name} <span>x{item.totalItem}</span>
                    </h3>
                    <p className="cart-content__item-description">
                      {item.description}
                    </p>
                    <p className="cart-content__item-price">
                      {formatToCurrencyVND(item.price)}
                    </p>
                  </div>
                </div>
                {isHover && itemHover._id === item._id ? (
                  <div
                    className="btn-delete"
                    onClick={() => handleDeleteItemCart(item)}
                  >
                    <DeleteOutlined />
                  </div>
                ) : undefined}
              </div>
            );
          })}
        </Spin>
      </div>
      <div className="cart-total">
        <div className="cart-total__item">
          <h4 className="cart-total__item-title">Total item</h4>
          <p className="cart-total__item-price">x{cartInfo.totalProduct}</p>
        </div>

        <div className="cart-total__item">
          <h4 className="cart-total__item-title">Total price</h4>
          <p className="cart-total__item-price">
            {formatToCurrencyVND(cartInfo.totalPrice)}
          </p>
        </div>
      </div>
      <div className="cart-payment">
        <Button className="btn-payment" onClick={() => goToCheckout()}>
          Payment
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CartInfo;
