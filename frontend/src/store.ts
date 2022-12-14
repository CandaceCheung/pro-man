import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from 'redux-logger';
import { AuthAction } from "./redux/auth/action";
import { authReducer } from "./redux/auth/reducer";
import { AuthState } from "./redux/auth/state";
import { KanbanAction } from "./redux/kanban/action";
import { kanbanReducer } from "./redux/kanban/reducer";
import { KanbanState } from "./redux/kanban/state";
import projectReducer,{ ActiveProjectState } from "./redux/project/slice";
import  tableReducer, { CombinedTableState }  from "./redux/table/slice";

export interface IRootState {
    auth: AuthState,
    table: CombinedTableState,
    project: ActiveProjectState,
    kanban: KanbanState,
}

const rootReducer = combineReducers({
    auth: authReducer,
    table: tableReducer,
    project: projectReducer,
    kanban: kanbanReducer,
});

export type IRootAction = AuthAction;
export type IRootKanban = KanbanAction;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;