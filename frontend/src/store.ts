import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from 'redux-logger';
import { AuthAction } from "./redux/auth/action";
import { authReducer } from "./redux/auth/reducer";
import { AuthState } from "./redux/auth/state";
import  tableReducer, { TableState }  from "./redux/table/slice";

export interface IRootState {
    auth: AuthState,
    table: TableState
}

const rootReducer = combineReducers({
    auth: authReducer,
    table: tableReducer
});

export type IRootAction = AuthAction;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;