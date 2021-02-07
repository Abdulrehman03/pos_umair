const initialState = {
  loading: false,
  allLogs: null
};

export default function (state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case "LOGS_LOADED":
      return {
        ...state,
        loading: false,
        allLogs: payload
      };

    default:
      return state;
  }
}
