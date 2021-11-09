import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";
import * as types from "./actionTypes";
const getProduct = (product) => ({
  type: types.GET_PRODUCT,
  payload: product,
});
const productAdded = () => ({
  type: types.CREATE_PRODUCT,
});

export const loadProduct = () => {
  return function (dispatch) {
    axios
      .get("https://frozen-basin-45437.herokuapp.com/product")
      .then((res) => {
        dispatch(getProduct(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const addProduct = (product, callback, action) => {
  return function (dispatch) {
    axios
      .post("https://frozen-basin-45437.herokuapp.com/product", product)
      .then((res) => {
        dispatch(productAdded());
        notification.open({
          message: "Notification Title",
          description: "Them thanh cong",
          duration: 2,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        callback();
        action([]);
        dispatch(loadProduct());
      });
  };
};

//cata
const getCata = (catalog) => ({
  type: types.GET_CATA,
  payload: catalog,
});

const cataAdded = () => ({
  type: types.ADD_CATA,
});

export const loadCata = () => {
  return function (dispatch) {
    axios
      .get("https://frozen-basin-45437.herokuapp.com/catalog")
      .then((res) => {
        dispatch(getCata(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const addCata = (catalog, reset) => {
  return function (dispatch) {
    axios
      .post("https://frozen-basin-45437.herokuapp.com/catalog", catalog)
      .then((res) => {
        dispatch(cataAdded());
        notification.open({
          message: "Notification Title",
          description: "Them thanh cong",
          duration: 2,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        reset();
        dispatch(loadCata());
      });
  };
};
