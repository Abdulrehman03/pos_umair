const initialState = {
  loading: false,
  products: null,
  selectedProduct: null
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "PRODUCT_ADDED":
      return {
        ...state,
        loading: false,
      };
    case "PRODUCT_LOADED":
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case "PRODUCT_ADDING_FAILED":
    case "PRODUCT_LOADING_FAILED":
      return {
        ...state,
        loading: false,
      };
    case "SET_PRODUCT_DATA":
      return {
        ...state,
        loading: false,
        selectedProduct: payload
      };
    case "PRODUCT_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
