import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";


export const addLogs = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/logs", body, config);
    console.log(res);
    dispatch({
      type: "LOGS_ADDED",
      payload: res.data,
    });
    dispatch(getLogs())
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "LOGS_ADDING_FAILED",
    });

  }
};
export const addTransactionLogs = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/logs/transaction", body, config);
    console.log(res);
    dispatch({
      type: "LOGS_ADDED",
      payload: res.data,
    });
    dispatch(getTransactionLogs())
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "LOGS_ADDING_FAILED",
    });

  }
};


export const getLogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/logs");
    console.log(res.data)
    dispatch({
      type: "LOGS_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "LOGS_LOADING_FAILED",
    });
  }
};
export const getTransactionLogs = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/logs/transaction");
    console.log(res.data)
    let user = localStorage.getItem('user');
    user = JSON.parse(user)
    let filtered = []
    if (user) {
      filtered = res.data.filter((item) => {
        return user._id == item.CREATED_BY || user.email == 'admin@mail.com'
      })
    }
    dispatch({
      type: "TANSACTION_LOGS_LOADED",
      payload: filtered,
    });
  } catch (err) {
    dispatch({
      type: "LOGS_LOADING_FAILED",
    });
  }
};
