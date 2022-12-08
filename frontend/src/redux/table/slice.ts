import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
    project: []
}

const initialState: TableState = {
    project: [],
}

const getTable: CaseReducer<TableState, PayloadAction<[]>> = 
    (state, action) => { state.project = action.payload}

const getTableFailed: CaseReducer<TableState, PayloadAction> =
    (state, action) => { state.project = []}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTable,
        getTableFailed
    },
})

export const {getTable : getTableAction, getTableFailed : getTableFailedAction} = tableSlice.actions

export default tableSlice.reducer