import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import logger from 'redux-logger';
import rootReducer from './rootReducer';

const reducer = rootReducer;

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
export default store;

export type AppDispatch = typeof store.dispatch;
