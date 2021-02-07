import { bindActionCreators, combineReducers } from "redux";
import auth from "./auth";
import customer from "./customer";
import product from "./product";
import sale from "./sale";
import logs from "./logs";
const appReducer = combineReducers({
  auth,
  product,
  customer,
  logs,
  sale
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.removeItem("token");
    localStorage.clear();
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
