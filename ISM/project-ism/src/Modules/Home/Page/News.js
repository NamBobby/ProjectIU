import "../bootstrap.scss";

import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// @svg and img
import Banner from "../assets/images/banner.png";

// @service
import { getDetailNews } from "../Store/service";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

// @antd
import { Spin } from "antd";

const News = () => {
  const location = useLocation();
  const { idNews } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [detailNews, setDetailNews] = useState();

  useEffect(() => {
    if (idNews) {
      fetchGetDetailNews();
    }
  }, []);

  const fetchGetDetailNews = async () => {
    try {
      setLoading(true);
      const { data } = await getDetailNews({
        idNews,
      });
      if (data.retCode === RETCODE_SUCCESS) {
        setDetailNews(data.retData);
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
      <Spin spinning={loading} size="large">
        <div className="container">
          <div className="content-news">
            <h1>{detailNews?.title}</h1>
            <p>{detailNews?.description}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: detailNews?.content,
              }}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default News;
