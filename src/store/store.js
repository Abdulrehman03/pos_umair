import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
const persistConfig = {
  key: 'CartReducer',
  storage: storage,
  whitelist: ['auth', 'product', 'customer', 'sale','logs'] // which reducer want to store 
};
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);
let storeData = { persistor, store };
export default storeData