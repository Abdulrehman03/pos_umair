import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { addLogs } from './logs'

//Login User

export const addProduct = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/product", body, config);
    console.log(res);
    dispatch({
      type: "PRODUCT_ADDED",
      payload: res.data,
    });
    toast.success("PRODUCT Added", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getProducts());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "PRODUCT_ADDING_FAILED",
    });
    toast.error("PRODUCT Adding Failed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};
export const editProduct = (body, cart) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(setLoading());
    const res = await axios.put(`/api/product/${body._id}`, body, config);
    console.log(res);
    dispatch({
      type: "PRODUCT_EDITED",
      payload: res.data,
    });
    if (!cart) {
      toast.success("PRODUCT EDITED", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }

    dispatch(getProducts());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "PRODUCT_EDITING_FAILED",
    });
    if (!cart) {
      toast.error("PRODUCT EDITING Failed!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }

  }
};
export const deleteProduct = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log(body)
    const res = await axios.delete(`/api/product/${body}`);
    console.log(res);
    dispatch({
      type: "PRODUCT_DELETED",
      payload: res.data,
    });
    toast.warn("PRODUCT DELETED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    dispatch(getProducts());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "PRODUCT_DELETING_FAILED",
    });
    toast.error("PRODUCT DELETING Failed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get("/api/product");

    dispatch({
      type: "PRODUCT_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "PRODUCT_LOADING_FAILED",
    });
  }
};
export const setSelectedProduct = (data) => async (dispatch) => {
  dispatch({
    type: "SET_PRODUCT_DATA",
    payload: data,
  });
};

//Loading
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: "PRODUCT_LOADING",
  });
};


export const editProductQuantity = (body, data2) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(setLoading());
    const res = await axios.put(`/api/product/${body._id}`, body, config);
    console.log(res);
    dispatch(addLogs(data2))
    console.log(data2)
    dispatch({
      type: "PRODUCT_EDITED",
      payload: res.data,
    });

    toast.success("PRODUCT EDITED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getProducts());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "PRODUCT_EDITING_FAILED",
    });

    toast.error("PRODUCT EDITING Failed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

  }
};