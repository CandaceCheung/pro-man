import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
    projectName: string
}

const initialState: TableState = {
    projectName: "",
}

const getTable: CaseReducer<TableState, PayloadAction<string>> = 
    (state, action) => { state.projectName = action.payload}

const getTableFailed: CaseReducer<TableState, PayloadAction> =
    (state, action) => { state.projectName = ""}

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