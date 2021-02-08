const initialState = {
  loading: false,
  allLogs: null,
  transactionLogs:null
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
    case "TANSACTION_LOGS_LOADED":
      return {
        ...state,
        loading: false,
        transactionLogs: payload
      };

    default:
      return state;
  }
}
