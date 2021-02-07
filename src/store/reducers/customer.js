const initialState = {
  loading: false,
  customers: null,
  selectedCustomer: null
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "CUSTOMER_ADDED":
      return {
        ...state,
        loading: false,
      };
    case "CUSTOMER_LOADED":
      return {
        ...state,
        loading: false,
        customers: payload,
      };
    case "CUSTOMER_ADDING_FAILED":
    case "CUSTOMER_LOADING_FAILED":
      return {
        ...state,
        loading: false,
      };
    case "SET_CUSTOMER_DATA":
      return {
        ...state,
        loading: false,
        selectedCustomer: payload
      };
    case "CUSTOMER_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
