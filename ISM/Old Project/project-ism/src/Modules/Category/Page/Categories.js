import "../bootstrap.scss";

import React, { useEffect, useState } from "react";

// @components
import FilterZone from "../components/Filter/FilterZone";
import CatePro from "../components/CateProduct/CatePro";
import Banner from "../components/Banner/Banner";

// @service
import { getListProduct } from "../Store/service";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Spin } from "antd";

const Categories = () => {
  useEffect(() => {
    fetchGetListProduct();
  }, []);

  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  const fetchGetListProduct = async (payload = {}) => {
    try {
      setLoading(true);
      const { data } = await getListProduct({
        page: PAGE_DEFAULT,
        size: LIMIT_DEFAULT,
        ...payload,
      });
      if (data.retCode === RETCODE_SUCCESS) {
        const list = data.retData.products.reverse();
        setListProducts(list);
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Category">
      <Banner />
      <div className="filterproduct">
        <FilterZone fetchGetListProduct={fetchGetListProduct} />

        <Spin spinning={loading}>
          <CatePro loading={loading} listProducts={listProducts} />
        </Spin>
      </div>
    </div>
  );
};

export default Categories;
