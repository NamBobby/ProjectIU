import "../bootstrap.scss";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment/moment";

// @img and svg
import Banner from "../../Home/assets/images/banner.png";

// @selector
import { getUserData } from "@store/user/selector";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Table, notification, Carousel, Input } from "antd";

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @service
import { getListOrderClient } from "../Store/service";

let timeoutId;

const CustomerOrder = () => {
  const history = useHistory();
  const userInfo = useSelector(getUserData);

  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState({});

  useEffect(() => {
    const payload = {
      page: PAGE_DEFAULT,
      size: LIMIT_DEFAULT,
      userId: userInfo.id,
    };
    fetchGetListOrders(payload);
  }, []);

  const fetchGetListOrders = async (payload) => {
    try {
      setLoading(true);
      const res = await getListOrderClient(payload);
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        const { orders, ...rest } = res?.data?.retData || {};
        const listData = orders?.map((item, index) => {
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

  const goToDetailOrder = (order) => {
    // console.log("order", order);
    history.push({
      pathname: "/checkout/payment",
      state: {
        orderId: order?._id,
      },
    });
  };

  const columnsTable = [
    {
      title: "Code order",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer's name",
      dataIndex: "infoOrder",
      key: "infoOrder",
      render: (data) => {
        return data.fullname;
      },
    },
    {
      title: "Customer's email",
      dataIndex: "infoOrder",
      key: "infoOrder",
      render: (data) => {
        return data.mail;
      },
    },
    {
      title: "Customer's phone",
      dataIndex: "infoOrder",
      key: "infoOrder",
      render: (data) => {
        return data.phone;
      },
    },
    {
      title: "Customer's address",
      dataIndex: "infoOrder",
      key: "infoOrder",
      render: (data) => {
        return data.address;
      },
    },
    {
      title: "Total item",
      dataIndex: "cartId",
      key: "cartId",
      render: (data) => {
        return data.totalProduct;
      },
    },
    {
      title: "Total price",
      dataIndex: "cartId",
      key: "cartId",
      render: (data) => {
        return formatToCurrencyVND(data.totalPrice);
      },
    },
    {
      title: "Date create order",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return date && moment(date).isValid()
          ? moment(date).format("MM/DD/YYYY")
          : "--";
      },
    },
    {
      title: "Status order",
      dataIndex: "statusOrder",
      key: "statusOrder",
      render: (statusOrder) => {
        if (statusOrder === 0) {
          return <span className="text-warning">Pending payment</span>;
        } else if (statusOrder === 1) {
          return <span className="text-success">Successfully payment</span>;
        } else {
          return <span className="text-danger">Cancel payment</span>;
        }
      },
    },
    {
      title: "Method payment",
      dataIndex: "methodPayment",
      key: "methodPayment",
      render: (methodPayment) => {
        if (methodPayment === 0) {
          return "Payment online";
        } else {
          return "Payment directly at store";
        }
      },
    },
    {
      title: "Method receive",
      dataIndex: "methodReiceive",
      key: "methodReiceive",
      render: (methodReiceive) => {
        if (methodReiceive === 0) {
          return "Delivery online";
        } else {
          return "Delivery to customer's home";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <span
            className="text-primary cursor-pointer"
            onClick={() => goToDetailOrder(record)}
          >
            More detail
          </span>
        );
      },
    },
  ];

  // search
  const [input, setInput] = React.useState("");
  const [prevSearch, setPrevSearch] = React.useState("");
  const [searchData, setSearchData] = React.useState("");

  useEffect(() => {
    if (searchData) {
      // console.log("search data", searchData);
      const payload = {
        page: PAGE_DEFAULT,
        size: LIMIT_DEFAULT,
        productText: searchData,
      };
      fetchGetListOrders(payload);
    }
  }, [searchData]);

  const handleSeachItem = (e) => {
    const search = e.target.value;
    setInput(search);
    setPrevSearch(search);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (search !== prevSearch || search === "") {
        // console.log("value", search);
        setSearchData(search);
      }
    }, 1000);
  };

  return (
    <div className="profile-wrapper">
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

      <div className="profile-wrapper__orderContent">
        <div className="p-5">
          <h1>List of order you have created</h1>
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
              onChange: (pageitem) => {
                // console.log("pageitem", pageitem);
                const payload = {
                  page: pageitem,
                  size: LIMIT_DEFAULT,
                  productText: searchData,
                };
                fetchGetListOrders(payload);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerOrder;
