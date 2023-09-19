import "../bootstrap.scss";

import React, { useEffect, useState } from "react";

// svg and img
import Banner from "../assets/images/banner.png";

// @service
import { getListProducts } from "../Store/service";

// @components
import HomePart from "../Components/HomePart";
import BoxFrame from "../Components/BoxFrame";
import PetKnowledge from "../Components/PetKnowledge";
import Adoption from "../Components/Adoptions";

// @antd
import { Spin } from "antd";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    fetchGetListProducts();
  }, []);

  const fetchGetListProducts = async () => {
    try {
      setLoading(true);
      const { data } = await getListProducts({
        page: 1,
        size: 6,
      });
      if (data.retCode === RETCODE_SUCCESS) {
        const list = data?.retData?.products;
        setListProducts(list);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-wrapper">
      <div className="banner-wrapper">
        <div className="banner-wrapper__content">
          <div className="row">
            <div className="col-6">
              <div className="banner-wrapper__content-info">
                <h2>One more friend</h2>
                <h3>Thousands more fun!</h3>
                <p>
                  Having a pet means you have more joy, a new friend, a happy
                  person who will always be with you to have fun. We have 200+
                  different pets that can meet your needs!
                </p>
                <div className="img-left-orange" />
              </div>
            </div>
            <div className="col-6">
              <div className="banner-wrapper__content-imgBox">
                <img src={Banner} alt="banner-img" className="banner-img" />
                <div className="img-right-orange" />
                <div className="img-right-blue" />
              </div>
            </div>
          </div>
          <div className="banner-background-color" />
        </div>
      </div>
      <div className="container">
        <Spin spinning={loading}>
          <HomePart
            listProducts={listProducts}
            title="Whats new?"
            header="Take a look at some of our pets"
          />
        </Spin>
        <BoxFrame
          title={"One more friend"}
          subtitle={"Thousands more fun!"}
          description={
            "Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!"
          }
        />
        <PetKnowledge
          title="You already know ?"
          header="Useful pet knowledge"
        />
        <Adoption
          title={"Adoption"}
          subtitle={"We need help. so do they."}
          description={
            "Adopt a pet and give it a home,it will be love you back unconditionally."
          }
        />
      </div>
    </div>
  );
};

export default Home;
