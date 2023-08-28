import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import moment from "moment/moment";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

// @service
import { getListVouchers, deleteVoucher } from "../Store/service";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Table, notification, Carousel } from "antd";

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @svg and img
import { DeleteIcon, EditIcon, NextIcon, PrevIcon } from "../assets/svg";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const refCarousel = useRef();

  const userInfo = useSelector(getUserData);
  const codeLanguage = useSelector((state) => getCodeLanguage(state));

  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState({});

  useEffect(() => {
    fetchGetListProducts();
  }, []);

  const fetchGetListProducts = async (
    page = PAGE_DEFAULT,
    size = LIMIT_DEFAULT
  ) => {
    try {
      setLoading(true);
      const res = await getListVouchers({
        payload: {
          page,
          size,
        },
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        const { vouchers, ...rest } = res?.data?.retData || {};
        const listData = vouchers?.map((item, index) => {
          return {
            key: index,
            ...item,
          };
        });
        setListProducts(listData);
        setPage(rest);
      }
    } catch (err) {
      console.log("FETCH FAIL", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeleteProduct = async (item) => {
    try {
      const res = await deleteVoucher({
        payload: item?._id,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        fetchGetListProducts();
      } else {
        notification.error({
          message: "Fail",
          description: "Delete product unsuccessfully",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const goToCreateProducts = () => {
    history.push("/manage-voucher/create-voucher");
  };

  const goToEditProduct = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-voucher/create-voucher",
      state: {
        idVoucher: record?._id,
      },
    });
  };

  const columnsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: record.description,
            }}
          />
        );
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        // console.log("item", record);
        return (
          <div className="d-flex flex-row justify-content-between align-items-center">
            <div
              className="edit-icon d-flex flex-column justify-content-center align-items-center"
              onClick={() => goToEditProduct(record)}
            >
              <EditIcon />
            </div>
            <div
              onClick={() => fetchDeleteProduct(record)}
              className="delete-icon d-flex flex-column justify-content-center align-items-center"
            >
              <DeleteIcon />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="manage-products">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
        <h1 className="manage-products__title">Products List</h1>

        <button
          className="manage-products__create"
          onClick={goToCreateProducts}
        >
          Create new vouchers
        </button>
      </div>
      <Table
        rowKey={(record) => record?.key}
        columns={columnsTable}
        dataSource={listProducts}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: LIMIT_DEFAULT,
          current: +page?.currentPage + 1,
          total: page?.totalItems,
          onChange: (page) => fetchGetListProducts(page, LIMIT_DEFAULT),
        }}
      />
    </div>
  );
};
export default Home;
