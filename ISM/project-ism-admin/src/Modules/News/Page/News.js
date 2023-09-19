import "../bootstrap.scss";
import "../responsive.scss";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment/moment";

// @selector
import { getUserData } from "@store/user/selector";
import { getCodeLanguage } from "@store/common/selectors";

// @service
import { getListNews, deleteDetailNews } from "../Store/service";

// @constants
import {
  RETCODE_SUCCESS,
  PAGE_DEFAULT,
  LIMIT_DEFAULT,
} from "@configs/contants";

// @antd
import { Table, notification } from "antd";

// @svg and img
import { DeleteIcon, EditIcon } from "../../Products/assets/svg";

const News = () => {
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
    };
    fetchGetListNews(payload);
  }, []);

  const fetchGetListNews = async (payload) => {
    try {
      setLoading(true);
      const res = await getListNews(payload);
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        const { news, ...rest } = res?.data?.retData || {};
        const listData = news?.map((item, index) => {
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

  const fetchDeleteNews = async (item) => {
    try {
      const res = await deleteDetailNews({
        idNews: item?._id,
      });
      if (res?.data?.retCode === RETCODE_SUCCESS) {
        notification.success({
          message: "Successfully",
          description: "Delete news successfully",
          duration: 2,
        });
        const payload = {
          page: PAGE_DEFAULT,
          size: LIMIT_DEFAULT,
        };
        fetchGetListNews(payload);
      } else {
        notification.error({
          message: "Fail",
          description: "Delete news unsuccessfully",
          duration: 2,
        });
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  };

  const goToCreateProducts = () => {
    history.push("/manage-news/create-news");
  };

  const goToEditNews = (record) => {
    // console.log("record", record?._id);
    history.push({
      pathname: "/manage-news/update-news",
      state: {
        idNews: record?._id,
      },
    });
  };

  const columnsTable = [
    {
      title: "New's name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "New's description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "News's content",
    //   dataIndex: "content",
    //   key: "content",
    //   width: 500,
    //   // render: (data) => {
    //   //   return data.content;
    //   // },
    // },
    {
      title: "Date create news",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => {
        return date && moment(date).isValid()
          ? moment(date).format("MM/DD/YYYY")
          : "--";
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
              onClick={() => goToEditNews(record)}
            >
              <EditIcon />
            </div>
            <div
              onClick={() => fetchDeleteNews(record)}
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
        <h1 className="manage-products__title">News List</h1>

        <button
          className="manage-products__create"
          onClick={goToCreateProducts}
        >
          Create news
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
          onChange: (pageitem) => {
            // console.log("pageitem", pageitem);
            const payload = {
              page: pageitem,
              size: LIMIT_DEFAULT,
            };
            fetchGetListNews(payload);
          },
        }}
      />
    </div>
  );
};

export default News;
