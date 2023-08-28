import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment/moment";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

// @service
import { getListOrders, deleteDetailOrder } from "../Store/service";

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

// @svg and img
import { DeleteIcon, EditIcon } from "../../Products/assets/svg";

let timeoutId;

const Home = () => {
  const history = useHistory();
  const userInfo = useSelector(getUserData);
  const codeLanguage = useSelector((state) => getCodeLanguage(state));

  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState([]);
  const [page, setPage] = useState({});

  useEffect(() => {
    const payload = {
      page: PAGE_DEFAULT,
      size: LIMIT_DEFAULT,
      productText: searchData,
    };
    fetchGetListOrders(payload);
  }, []);

  const fetchGetListOrders = async (payload) => {
    try {
      setLoading(true);
      const res = await getListOrders(payload);
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

  const fetchDeleteOrder = async (item) => {
    try {
      const res = await deleteDetailOrder({
        idOrder: item?._id,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete product successfully",
          duration: 2,
        });
        const payload = {
          page: PAGE_DEFAULT,
          size: LIMIT_DEFAULT,
          productText: searchData,
        };
        fetchGetListOrders(payload);
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

  const goToEditOrder = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-order/update-order",
      state: {
        idOrder: record?._id,
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
          return "Pending payment";
        } else if (statusOrder === 1) {
          return "Successfully payment";
        } else {
          return "Cancel payment";
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
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        // console.log("item", record);
        return (
          <div className="d-flex flex-row justify-content-between align-items-center">
            {record.statusOrder === 0 ? (
              <div
                className="edit-icon d-flex flex-column justify-content-center align-items-center"
                onClick={() => goToEditOrder(record)}
              >
                <EditIcon />
              </div>
            ) : null}
            <div
              onClick={() => fetchDeleteOrder(record)}
              className="delete-icon d-flex flex-column justify-content-center align-items-center"
            >
              <DeleteIcon />
            </div>
          </div>
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
    <div className="manage-products">
      <div className="d-flex flex-row justify-content-between align-items-center mb-3">
        <h1 className="manage-products__title">Orders List</h1>

        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <Input
            placeholder="Enter your customer to search"
            onChange={(e) => handleSeachItem(e)}
            value={input}
          />
        </div>
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
  );
};
export default Home;
