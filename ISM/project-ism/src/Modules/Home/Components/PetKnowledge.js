import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

// @antd
import { Button, Spin } from "antd";

// @svg and img
import { ArrowRightViewMore } from "../assets/svg";

// @components
import NewItem from "./NewItem";

// @service
import { getListNews } from "../Store/service";

// @constants
import { RETCODE_SUCCESS, SUCCESS } from "@configs/contants";

const PetKnowledge = ({ title, header, listProducts = [] }) => {
  // console.log("listProducts", listProducts);

  const history = useHistory();

  const [listNews, setListNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGetListNews();
  }, []);

  const fetchGetListNews = async () => {
    try {
      setLoading(true);
      const { data } = await getListNews({
        page: 1,
        size: 3,
      });
      if (data.retCode === RETCODE_SUCCESS) {
        const list = data.retData.news;
        setListNews(list);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  const goToNewDetail = (idNews) => {
    history.push({
      pathname: "/news",
      state: {
        idNews,
      },
    });
  };

  return (
    <div className="homepage-wrapper__content">
      <div className="homepage-wrapper__content-header">
        <div className="homepage-wrapper__content-header-left">
          <h5>{title}</h5>
          <h4>{header}</h4>
        </div>
        {/* <div className="homepage-wrapper__content-header-right">
          <Button className="view-more">
            <div className="btn-title">View more</div>
            <div>
              <ArrowRightViewMore />
            </div>
          </Button>
        </div> */}
      </div>
      <div className="homepage-wrapper__content-body">
        <Spin spinning={loading} size="large">
          <div className="row">
            {listNews.map((item) => {
              return (
                <div
                  className="col-4 cursor-pointer"
                  onClick={() => goToNewDetail(item._id)}
                >
                  <NewItem data={item} />
                </div>
              );
            })}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default PetKnowledge;
