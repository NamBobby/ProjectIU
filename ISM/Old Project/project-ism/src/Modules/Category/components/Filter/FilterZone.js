import React, { useState, useEffect } from "react";

// @antd
import { Form, InputNumber, Input, Radio, Space } from "antd";

// @utility
import { formatToCurrencyVND } from "@utility/common";

let timeoutId;

const FilterZone = ({ fetchGetListProduct = () => {} }) => {
  const [form] = Form.useForm();

  // const onFieldsChange = () => {
  //   const hasValues = form.getFieldsValue();
  //   console.log(hasValues);
  //   // const payload = {
  //   //   gender,
  //   //   ...hasValues,
  //   // };
  //   if (hasValues && Object.keys(hasValues).length > 0) {
  //     fetchGetListProduct(hasValues);
  //   }
  // };

  const formatterNumber = (val) => {
    if (!val) return 0;
    return `${val}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{0,2}$)/g, ",");
  };

  const parserNumber = (val) => {
    if (!val) return 0;
    return Number.parseFloat(
      val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
    ).toFixed(2);
  };

  const [input, setInput] = React.useState("");
  const [prevSearch, setPrevSearch] = React.useState("");
  const [searchData, setSearchData] = React.useState("");

  useEffect(() => {
    if (!!searchData) {
      const hasValues = form.getFieldsValue();
      fetchGetListProduct(hasValues);
    } else {
      fetchGetListProduct();
    }
  }, [searchData]);

  const handleSeachItem = (e) => {
    const search = Object.values(form.getFieldsValue(e[0].name))[0];
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
    <div className="filter">
      <h3>Filter</h3>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={(e) => handleSeachItem(e)}
        // onFinish={onFinish}
        className="w-100 p-2 filter-frame"
      >
        {/* <Form.Item label="" name={"gender"}>
          <h4>Gender</h4>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={"female"}> Female </Radio>
              <Radio value={"male"}> Male </Radio>
            </Space>
          </Radio.Group>
        </Form.Item> */}
        <h4 className="">Price</h4>
        <div className="d-flex flex-column justify-content-between align-items-start w-100">
          <Form.Item label="" name={"minPrice"}>
            <InputNumber
              style={{ width: 250 }}
              // defaultValue={0}
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
              prefix="VNĐ"
              placeholder="Enter min price"
            />
          </Form.Item>
          <Form.Item label="" name={"maxPrice"}>
            <InputNumber
              style={{ width: 250 }}
              // defaultValue={0}
              formatter={(value) => formatterNumber(value)}
              parser={(value) => parserNumber(value)}
              prefix="VNĐ"
              placeholder="Enter max price"
            />
          </Form.Item>
        </div>
        <h4 className="">Weight</h4>
        <Form.Item label="" name={"weight"}>
          <Input placeholder="Enter your weight you want to filter" />
        </Form.Item>
        <h4 className="">Product searching</h4>
        <Form.Item label="" name={"productText"}>
          <Input placeholder="Enter your product you want to search" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FilterZone;
