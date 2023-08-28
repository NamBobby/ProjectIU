import React from "react";

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @antd
import { Button } from "antd";

const Placeorder = ({
  cartInfo,
  isDisable,
  fetchCreateOrder = () => {},
  loading,
}) => {
  const { listCart } = cartInfo || {};

  return (
    <div className="placeorder">
      <h3>CHECK OUT</h3>
      <table>
        <tr>
          <th>Product</th>
          <th>Discount</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
        {/* <tr>
          <td>MO231 - Pomeranian White</td>
          <td>30%</td>
          <td>1</td>
          <td>6.900.000 VND</td>
        </tr>
        <tr>
          <td>MO502 - Poodle Tiny Yellow</td>
          <td>30%</td>
          <td>1</td>
          <td>3.900.000 VND</td>
        </tr> */}
        {!!cartInfo && listCart?.length > 0
          ? listCart.map((item) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>--</td>
                  <td>{item.totalItem}</td>
                  <td>{formatToCurrencyVND(item.price)}</td>
                </tr>
              );
            })
          : undefined}
        <tr>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>
              Merchandise Subtotal
            </p>
          </td>
          <td></td>
          <td></td>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>
              {formatToCurrencyVND(cartInfo.totalPrice) || 0}
            </p>
          </td>
        </tr>
        {/* <tr>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>
              Shipping Total
            </p>
          </td>
          <td></td>
          <td></td>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>500.000 VND</p>
          </td>
        </tr> */}
        <tr>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>
              Total Payment
            </p>
          </td>
          <td></td>
          <td></td>
          <td>
            <p style={{ color: "#000000", fontWeight: "bold" }}>
              {formatToCurrencyVND(cartInfo.totalPrice) || 0}
            </p>
          </td>
        </tr>
      </table>

      <div className="placeorder-button">
        <Button
          type="submit"
          disabled={isDisable}
          loading={loading}
          onClick={() => fetchCreateOrder()}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Placeorder;
