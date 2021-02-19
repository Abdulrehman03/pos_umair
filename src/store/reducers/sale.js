

const initialState = {
  loading: false,
  sales: null,
  selectedSale: null
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "SALE_ADDED":
      return {
        ...state,
        loading: false,
      };
    case "SALE_LOADED":
      return {
        ...state,
        loading: false,
        sales: payload,
      };
    case "SALE_ADDING_FAILED":
    case "SALE_LOADING_FAILED":
      return {
        ...state,
        loading: false,
      };
    case "SET_SALE_DATA":
      return {
        ...state,
        loading: false,
        selectedSale: payload
      };
    case "SALE_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
