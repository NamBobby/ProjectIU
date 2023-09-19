import React from "react";

// @svg and img
import BoxFrameLeft from "../assets/images/boxframeleft.png";

//@antd
import { Button } from "antd";

const BoxFrame = ({ title, subtitle, description }) => {
  return (
    <div className="box-frame-wrapper">
      <div className="row">
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center align-items-start h-100">
            <div className="box-frame-wrapper__imageBox">
              <img src={BoxFrameLeft} alt="img-box" className="img-box" />
              <div className="image-color" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <div className="box-frame-wrapper__contentBox">
              <h2>{title}</h2>
              <h3>{subtitle}</h3>
              <p>{description}</p>
              {/* <div className="btn-explore-box">
                <Button>Explore now</Button>
              </div> */}
              <div className="box-color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxFrame;
