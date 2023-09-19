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
import { getListProducts, deleteProduct } from "../Store/service";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Table, notification, Carousel, Input } from "antd";
const { Search } = Input;

// @utility
import { formatToCurrencyVND } from "@utility/common";

// @svg and img
import { DeleteIcon, EditIcon, NextIcon, PrevIcon } from "../assets/svg";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

let timeoutId;

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
    const payload = {
      page: PAGE_DEFAULT,
      size: LIMIT_DEFAULT,
      productText: searchData,
    };
    fetchGetListProducts(payload);
  }, []);

  const fetchGetListProducts = async (payload) => {
    try {
      setLoading(true);
      const res = await getListProducts(payload);
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        const { products, ...rest } = res?.data?.retData || {};
        const listData = products?.map((item, index) => {
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
      const res = await deleteProduct({
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
    history.push("/manage-products/create-product");
  };

  const goToEditProduct = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-products/create-product",
      state: {
        idProduct: record?._id,
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
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img) => {
        return (
          <div className="d-flex flex-row justify-content-between align-items-center">
            {/* {img?.length > 1 && (
              <div
                style={{ width: 30, height: 30 }}
                className="d-flex flex-column justify-content-center align-items-center cursor-pointer"
                onClick={() => refCarousel.current.prev()}
              >
                <PrevIcon />
              </div>
            )} */}
            <div className="box-image">
              {img?.length > 0 && (
                <Carousel
                  {...settings}
                  ref={refCarousel}
                  dots={img?.length > 1 ? true : false}
                >
                  {img?.map((item) => {
                    return (
                      <div className="img-item-box">
                        <img
                          src={item?.url}
                          className="img-item"
                          alt="img-item"
                        />
                      </div>
                    );
                  })}
                </Carousel>
              )}
            </div>
            {/* {img?.length > 1 && (
              <div
                style={{ width: 30, height: 30 }}
                className="d-flex flex-column justify-content-center align-items-center cursor-pointer"
                onClick={() => refCarousel.current.next()}
              >
                <NextIcon />
              </div>
            )} */}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (currency) => (currency ? formatToCurrencyVND(currency) : "--"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Day of birth",
      dataIndex: "dob",
      key: "dob",
      render: (dob) =>
        dob && moment(dob).isValid() ? moment(dob).format("DD/MM/YYYY") : "--",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
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
      fetchGetListProducts(payload);
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
        <h1 className="manage-products__title">Products List</h1>

        <div className="d-flex flex-row justify-content-center align-items-center gap-3">
          <Input
            placeholder="Enter your pets to search"
            onChange={(e) => handleSeachItem(e)}
            value={input}
          />

          <button
            className="manage-products__create"
            onClick={goToCreateProducts}
          >
            Create product
          </button>
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
            fetchGetListProducts(payload);
          },
        }}
      />
    </div>
  );
};
export default Home;
