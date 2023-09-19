import React from "react";

// @components
import Pagination from "@src/Modules/Category/components/Pagigation/Pagination.js";
import CategoryProduct from "./Product/CategoryProduct";

const CatePro = ({ loading, listProducts = [] }) => {
  return (
    <div className="product-category">
      <div className="containery">
        <div className="container">
          <div className="title">
            <h3>Our products</h3>
          </div>
          <div className="list">
            <h5>{listProducts.length} puppies</h5>
          </div>
        </div>
      </div>

      <div className="framescontainer">
        {listProducts.map((product, index) => (
          <CategoryProduct key={index} {...product} />
        ))}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};

export default CatePro;
