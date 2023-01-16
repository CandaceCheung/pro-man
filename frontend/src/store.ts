import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import { AuthAction } from './redux/auth/action';
import { authReducer } from './redux/auth/reducer';
import { AuthState } from './redux/auth/state';
import invitationReducer, { InvitationState } from './redux/invitation/slice';
import { KanbanAction } from './redux/kanban/action';
import { kanbanReducer } from './redux/kanban/reducer';
import { KanbanState } from './redux/kanban/state';
import profileReducer, { ProfileState } from './redux/profile/slice';
import projectReducer, { ActiveProjectState } from './redux/project/slice';
import tableReducer, { CombinedTableState } from './redux/table/slice';

export interface IRootState {
    auth: AuthState;
    table: CombinedTableState;
    project: ActiveProjectState;
    kanban: KanbanState;
    invitation: InvitationState;
    profile: ProfileState;
}

export const rootReducer = combineReducers({
    auth: authReducer,
    table: tableReducer,
    project: projectReducer,
    kanban: kanbanReducer,
    invitation: invitationReducer,
    profile: profileReducer
});

export type IRootAction = AuthAction;
export type IRootKanban = KanbanAction;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
