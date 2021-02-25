import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import Router from "next/router";
import { toast } from "react-toastify";

import { getProducts } from "./product";
import { getCustomers } from "./customer";
import { getSales } from "./sale";
import { getTransactionLogs, getLogs } from "./logs";

//Load User
export const loadUser = () => async (dispatch) => {


  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/load-user");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
    dispatch(getSales());
    dispatch(getProducts());
    dispatch(getCustomers());
    dispatch(getTransactionLogs());
    dispatch(getLogs());
    dispatch(getUsers());
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data,
    });
    Router.push("/");
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map((error) => {
        // ToastsStore.error(error.msg)
      });
    }

    console.log(errors);

    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};

//Register User WITH google
export const registerByGoogle = ({ name, email, googleId }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, googleId });
  console.log(body);

  try {
    const res = await axios.post("/api/auth/google/register", body, config);

    dispatch({
      type: "REGISTER_SUCCESS_BY_GOOGLE",
      payload: res.data,
    });

    dispatch(loadUser());
    Router.push("/dashboard-main");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map((error) => {
        // ToastsStore.error(error.msg)
      });
    }

    console.log(errors);

    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};
//Login User WITH google
export const loginByGoogle = ({ name, email, googleId }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, googleId });
  console.log(body);

  try {
    const res = await axios.post("/api/auth/google/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS_BY_GOOGLE",
      payload: res.data,
    });

    dispatch(loadUser());
    Router.push("/dashboard-main");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.map((error) => {
        // ToastsStore.error(error.msg)
      });
    }

    console.log(errors);

    dispatch({
      type: "REGISTER_FAIL",
    });
  }
};

//Login User

export const login = ({ email, password }) => async (dispatch) => {
  dispatch(setLoading());
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);
    console.log(res);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });
    toast.success("Login Success", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    Router.push("/dashboard-main");

    dispatch(loadUser());
    // dispatch(checkPayments());
  } catch (err) {
    toast.error("Login Failed", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((error) => {
        // ToastsStore.error(error.msg)
      });
    }

    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};
//sendForgotPassReq of Account
export const sendForgotPassReq = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/forgot_request", data);
    console.log(res);
    if (res.data.successMsg) {
      dispatch({
        type: "FORGOT_PASS_MAIL_SENT",
      });
      toast.success("Mail Sent", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error("Mail Sent Failed", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//Reset Password of Account
export const resetPassword = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/reset_password", data);
    console.log(res);

    dispatch({
      type: "PASSWORD_CHANGED",
    });
    toast.success("Password Successfully Changed", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    Router.push("/");
  } catch (error) {
    console.log(error.message);
  }
};
//Activate Account

export const activateAccount = (data) => async (dispatch) => {
  const res = await axios.put("/api/auth/verifying_account", data);
  console.log(res);
  dispatch({
    type: "ACTIVATE_ACCOUNT",
  });
};


export const editUser = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch(setLoading());
    console.log(body)
    const res = await axios.put(`/api/auth/${body._id}`, body, config);
    console.log(res);
    dispatch({
      type: "User_EDITED",
      payload: res.data,
    });
    toast.success("User EDITED", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    dispatch(getUsers());
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "User_EDITING_FAILED",
    });
    toast.error("User EDITING Failed!", {
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


export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    console.log(res.data)
    dispatch({
      type: "USERS_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "USERS_LOADING_FAILED",
    });
  }
};



//Logout User

export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

//Loading
export const setLoading = () => async (dispatch) => {
  dispatch({
    type: "AUTH_LOADING",
  });
};
