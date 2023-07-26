import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import productReducer from './product/productSlice';
import formDataReducer from './product/formDataSlice';

const middleware = [thunkMiddleware];

const reducers = combineReducers({
    product: productReducer,
    form: formDataReducer
});

export const store = configureStore({
  reducer: reducers,
  middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()