import React from "react";
import { useHistory } from "react-router-dom";

// @antd
import { Button } from "antd";

// @svg and img
import { ArrowRightViewMore } from "../assets/svg";

// @components
import ProductItem from "./ProductItem";

const HomePart = ({ title, header, listProducts = [] }) => {
  const history = useHistory();

  return (
    <div className="homepage-wrapper__content">
      <div className="homepage-wrapper__content-header">
        <div className="homepage-wrapper__content-header-left">
          <h5>{title}</h5>
          <h4>{header}</h4>
        </div>
        <div className="homepage-wrapper__content-header-right">
          <Button
            className="view-more"
            onClick={() => history.push("/cate-gory")}
          >
            <div className="btn-title">View more</div>
            <div>
              <ArrowRightViewMore />
            </div>
          </Button>
        </div>
      </div>
      <div className="homepage-wrapper__content-body">
        <div className="row">
          {listProducts?.map((item, index) => {
            return (
              <div className="col-4 col-md-4 mb-4" key={`${item._id}-${index}`}>
                <ProductItem detail={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePart;
