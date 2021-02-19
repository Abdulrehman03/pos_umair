import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { addTransactionLogs } from './logs'


//Login User

export const addSale = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    dispatch(setLoading());
    console.log(body)

    const res = await axios.post("/api/sale", body, config);
    console.log(res);
    dispatch({
      type: "SALE_ADDED",
      payload: res.data,
    });
    toast.success("SALE Added", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    Router.push('/reports/sale')
    dispatch(getSales());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SALE_ADDING_FAILED",
    });
    toast.error("SALE Adding Failed!", {
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
export const editSale = (body, data2) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    const res = await axios.put(`/api/sale/${body._id}`, body, config);
    console.log(res);
    dispatch({
      type: "SALE_EDITED",
      payload: res.data,
    });
    toast.success("SALE EDITED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    if (data2) {
      dispatch(addTransactionLogs(data2))
    }
    dispatch(getSales());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SALE_EDITING_FAILED",
    });
    toast.error("SALE EDITING Failed!", {
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
export const deleteSale = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log(body)
    const res = await axios.delete(`/api/sale/${body}`);
    console.log(res);
    dispatch({
      type: "SALE_DELETED",
      payload: res.data,
    });
    toast.warn("SALE DELETED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });

    dispatch(getSales());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SALE_DELETING_FAILED",
    });
    toast.error("SALE DELETING Failed!", {
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



export const getSales = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axios.get("/api/sale");
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    console.log(user)
    let filtered = []
    if (user) {
      filtered = res.data.filter((item) => {
        return user._id == item.CREATED_BY || user.email == 'admin@mail.com'
      })
    }
    console.log(filtered)
    dispatch({
      type: "SALE_LOADED",
      payload: filtered,
    });
  } catch (err) {
    dispatch({
      type: "SALE_LOADING_FAILED",
    });
  }
};
export const setSelectedSale = (data) => async (dispatch) => {
  dispatch({
    type: "SET_SALE_DATA",
    payload: data,
  });
};

//Loading
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: "SALE_LOADING",
  });
};
