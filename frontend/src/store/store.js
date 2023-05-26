import {configureStore} from '@reduxjs/toolkit'; 
import orderReducer from './orderSlice';
import paymentStepSlice from './paymentStepSlice';
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, authSlice);



  const store = configureStore({
    reducer: {
      step: paymentStepSlice,
      order: orderReducer,
      auth: persistedReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
  });




export const persistor = persistStore(store);
export default store;