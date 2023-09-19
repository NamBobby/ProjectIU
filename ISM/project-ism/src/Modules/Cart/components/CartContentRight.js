import React from "react";

const CartContentRight = () => {
    return (
        <div className="cart-content-right">
            <table>
                <tbody>
                    <tr>
                        <th colspan="2">SHOPPING CART</th>
                    </tr>
                    <tr>
                        <td>QUANTITY</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>UNIT PRICE</td>
                        <td><p>6.900.000 VND</p></td>
                    </tr>
                    <tr>
                        <td>TOTAL PRICE</td>
                        <td><p style={{ color: '#000000', fontWeight: 'bold' }}>6.900.000 VND</p></td>
                    </tr>
                </tbody>
            </table>
            <div className="voucher">
                <input type="text" placeholder="Voucher" />
            </div>
            <div className="cart-content-right-button">
                <button className="continue">CONTINUE</button>
                <button className="checkout">CHECKOUT</button>
            </div>
            <div className="cart-content-right-login">
                <p>Please <a href="">Login</a> to your account to earn membership points</p>
            </div>
        </div>
    );
};

export default CartContentRight;