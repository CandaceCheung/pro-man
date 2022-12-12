import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
    horizontal_order: number,
    horizontal_order_id: number,
    item_creator_id: number,
    item_dates_datetime: string,
    item_datetime_id: number,
    item_datetime_color: string,
    item_group_id: number,
    item_group_name: string,
    item_id: number,
    item_is_deleted: boolean,
    item_money_cashflow: number,
    item_money_date: string,
    item_name: string,
    item_person_id: number,
    item_person_name: string,
    item_status_color: string,
    item_status_name: string,
    item_text_id: number,
    item_text_text: string,
    item_times_end_date: number,
    item_times_id: number,
    item_times_start_date: number,
    item_times_color: string,
    joined_project_id: number,
    project_creator_id: number,
    project_id: number,
    project_is_deleted: boolean,
    my_favorite_list?: number,
    project_name: string,
    role: string,
    state_id: number,
    transaction_id: number,
    vertical_order: number,
    type_name: 'persons' | 'dates' | 'times' | 'money' | 'status' | 'text',
    element_name: string,
}

export type MyFavoriteListState = {
    creator_id?: number
    project_id?: number
    project_name: string
}[]

export interface TableStateArray extends Array<TableState> { }
export interface CombinedTableState{
    summary: TableStateArray
    my_favorite_list: MyFavoriteListState
}

const initialState: CombinedTableState = {
    summary: [{
        horizontal_order: 0,
        horizontal_order_id: 0,
        item_creator_id: 0,
        item_dates_datetime: "",
        item_datetime_id: 0,
        item_datetime_color: '#238BE6',
        item_group_id: 0,
        item_group_name: "",
        item_id: 0,
        item_is_deleted: false,
        item_money_cashflow: 0,
        item_money_date: "",
        item_name: "",
        item_person_id: 0,
        item_person_name: "",
        item_status_color: "",
        item_status_name: "",
        item_text_id: 0,
        item_text_text: "",
        item_times_end_date: 0,
        item_times_id: 0,
        item_times_start_date: 0,
        item_times_color: '#238BE6',
        joined_project_id: 0,
        project_creator_id: 0,
        project_id: 0,
        project_is_deleted: false,
        my_favorite_list: undefined,
        project_name: "",
        role: "member",
        state_id: 0,
        transaction_id: 0,
        vertical_order: 0,
        type_name: "persons",
        element_name: ''
    }],
    my_favorite_list: [{
        creator_id: undefined,
        project_id: undefined,
        project_name: ""
    }]
}

const getTable: CaseReducer<CombinedTableState, PayloadAction<TableStateArray>> =
    (state, action) => {state.summary = action.payload}
const getTableFailed: CaseReducer<CombinedTableState, PayloadAction> =
    (state, action) => {state = initialState}
const updateTimelineItem: CaseReducer<CombinedTableState, PayloadAction<{ timelineID: number, startTime: number, endTime: number }>> =
    (state, action) => {
        for (let item of state.summary) {
            if (item.item_times_id === action.payload.timelineID) {
                item.item_times_start_date = action.payload.startTime
                item.item_times_end_date = action.payload.endTime
            }
        }
    }
const updateDatelineItem: CaseReducer<CombinedTableState, PayloadAction<{ datelineID: number, date: number }>> =
    (state, action) => {
        for (let item of state.summary) {
            if (item.item_datetime_id === action.payload.datelineID) {
                item.item_dates_datetime = new Date(action.payload.date).toDateString()
            }
        }
    }

const getFavorite: CaseReducer<CombinedTableState, PayloadAction<MyFavoriteListState>> =
    (state, action) => {state.my_favorite_list = action.payload}
const updateItemGroupName: CaseReducer<CombinedTableState, PayloadAction<{itemGroupId: number, itemGroupName: string}>> =
(state, action) =>  {
    for (let item of state.summary){
        if (item.item_group_id === action.payload.itemGroupId){
            item.item_group_name = action.payload.itemGroupName;
        }
    }
}
const updateItemGroupNameFailed: CaseReducer<CombinedTableState, PayloadAction> =
(state, action) =>  {
    state.summary[0] = {...state.summary[0]};
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTable,
        getTableFailed,
        updateTimelineItem,
        updateDatelineItem,
        getFavorite,
        updateItemGroupName,
        updateItemGroupNameFailed
    },
})

export const {
    getTable: getTableAction,
    getTableFailed: getTableFailedAction,
    updateTimelineItem: updateTimelineItemAction,
    updateDatelineItem: updateDatelineItemAction,
    getFavorite: getFavoriteAction,
    updateItemGroupName: updateItemGroupNameAction,
    updateItemGroupNameFailed: updateItemGroupNameFailedAction,
} = tableSlice.actions

export default tableSlice.reducer