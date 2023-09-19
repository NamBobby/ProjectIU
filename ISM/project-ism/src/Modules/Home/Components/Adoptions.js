import React from "react";

// @svg and img
import BoxFrameLeft from "../assets/images/adoption.png";

// @antd
import { Button } from "antd";

const Adoption = ({ title, subtitle, description }) => {
  return (
    <div className="box-frame-wrapper mt-5 adoption-box">
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <div className="box-frame-wrapper__contentBox contentBox-adoption">
              <h2>{title}</h2>
              <h3>{subtitle}</h3>
              <p>{description}</p>
              {/* <div className="btn-explore-box">
                <Button>Explore now</Button>
              </div> */}
              <div className="box-color adoption-color-left" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center align-items-start h-100">
            <div className="box-frame-wrapper__imageBox">
              <img src={BoxFrameLeft} alt="img-box" className="img-box" />
              <div className="image-color adoption-color-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adoption;
