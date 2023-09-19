import React from "react";

const Ship = () => {
    return (
        <div className="delivery">
            <h4>Delivery</h4>
            <div className="address">
                <p>Khu phố 6, Phường Linh Trung, Quận Thủ Đức, Thành phố Hồ Chí Minh</p>
                <div className="changeaddress">
                    <input type="text" id="address" placeholder="Type another address" />
                    <button>Change</button>
                </div>
            </div>
        </div>
    );
};

export default Ship;