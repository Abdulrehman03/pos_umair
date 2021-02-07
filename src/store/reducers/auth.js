const initialState = {
  user: null,
  token: "",
  isAuthenticated: false,
  loading:false
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
    case "LOGIN_SUCCESS_BY_GOOGLE":
    case "REGISTER_SUCCESS_BY_GOOGLE":
      localStorage.setItem("token", payload.token);
      console.log(payload);
      return {
        ...state,
        ...payload,
        token: payload.token,
        loading:false,
        isAuthenticated: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
      };

    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading:false,
        isAuthenticated: false,
        user: null,
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        laoding:false
      };
    case'AUTH_LOADING': 
      return{
        ...state,
        loading:true
      }
    default:
      return state;
  }
}
