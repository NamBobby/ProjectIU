import React from "react";
import { useHistory, useLocation } from "react-router-dom";

// @svg and img
import imageText from "../assets/images/image-2-9@2x.png";

// @utility
import { formatToCurrencyVND } from "@utility/common";

const ProductItem = ({ detail }) => {
  // console.log("detail", detail);
  const history = useHistory();

  const { _id, name, image, gender, age, price } = detail || {};

  const goToProductDetail = () => {
    history.push({
      pathname: "/product-detail",
      state: {
        productId: _id,
      },
    });
  };

  return (
    <div
      className="homepage-wrapper__content-body-product"
      onClick={() => goToProductDetail()}
    >
      <div className="homepage-wrapper__content-body-product-img">
        <img src={image[0]?.url} alt="image-item" className="image-item" />
      </div>
      <h2 className="homepage-wrapper__content-body-product-name">{name}</h2>
      <div className="homepage-wrapper__content-body-product-des">
        <div>
          <p>
            Gene: <span>{gender}</span>
          </p>
        </div>
        <div>
          <p>-</p>
        </div>
        <div>
          <p>
            Age: <span>{age}</span>
          </p>
        </div>
      </div>
      <h3 className="homepage-wrapper__content-body-product-price">
        {formatToCurrencyVND(price)}
      </h3>
    </div>
  );
};

export default ProductItem;
