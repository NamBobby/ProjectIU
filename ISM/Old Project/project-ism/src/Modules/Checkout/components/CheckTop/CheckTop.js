import React from "react";

const CheckTop = () => {
    return (
        <div className="cart-top-wrap">
            <div className="cart-top">
                <div className="cart-top-cart cart-top-item">
                    <i className='bx bxs-cart'></i>
                </div>
                <div className="cart-top-payment cart-top-item">
                    <i className='bx bx-credit-card-front'></i>
                </div>
            </div>
        </div>
    );
};

export default CheckTop;