import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

//Login User

export const addCustomer = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/customer", body, config);
    console.log(res);
    dispatch({
      type: "CUSTOMER_ADDED",
      payload: res.data,
    });
    toast.success("CUSTOMER Added", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getCustomers());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "CUSTOMER_ADDING_FAILED",
    });
    toast.error("CUSTOMER Adding Failed!", {
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
export const editCustomer = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log(body)
    const res = await axios.put(`/api/customer/${body._id}`, body, config);
    console.log(res);
    dispatch({
      type: "CUSTOMER_EDITED",
      payload: res.data,
    });
    toast.success("CUSTOMER EDITED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getCustomers());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "CUSTOMER_EDITING_FAILED",
    });
    toast.error("CUSTOMER EDITING Failed!", {
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
export const deleteCustomer = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log(body)
    const res = await axios.delete(`/api/customer/${body}`);
    console.log(res);
    dispatch({
      type: "CUSTOMER_DELETED",
      payload: res.data,
    });
    toast.warn("CUSTOMER DELETED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    dispatch(getCustomers());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "CUSTOMER_DELETING_FAILED",
    });
    toast.error("CUSTOMER DELETING Failed!", {
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



export const getCustomers = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get("/api/customer");

    dispatch({
      type: "CUSTOMER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "CUSTOMER_LOADING_FAILED",
    });
  }
};
export const setSelectedCustomer = (data) => async (dispatch) => {
  dispatch({
    type: "CUSTOMER_DATA",
    payload: data,
  });
};

//Loading
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: "CUSTOMER_LOADING",
  });
};
