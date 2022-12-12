import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from "date-fns";

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
    project_is_favorite?: number,
    my_favorite_list?: number,
    project_name: string,
    role: string,
    state_id: number,
    transaction_id: number,
    vertical_order: number,
    type_name: 'persons'|'dates'|'times'|'money'|'status'|'text',
    element_name: string, 
}

export interface TableStateArray extends Array<TableState>{}

const initialState: TableStateArray = [{
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
    project_is_favorite: undefined,
    my_favorite_list: undefined,
    project_name: "",
    role: "member",
    state_id: 0,
    transaction_id: 0,
    vertical_order: 0,
    type_name: "persons",
    element_name: ''
}]

const getTable: CaseReducer<TableStateArray, PayloadAction<TableStateArray>> =
    (state, action) =>  state = action.payload
const getTableFailed: CaseReducer<TableStateArray, PayloadAction> =
    (state, action) =>  state = initialState 
const updateTimelineItem: CaseReducer<TableStateArray, PayloadAction<{timelineID: number, startTime: number, endTime:number}>> =
(state, action) =>  {
    for (let item of state){
        if (item.item_times_id === action.payload.timelineID){
            item.item_times_start_date = action.payload.startTime
            item.item_times_end_date = action.payload.endTime
        }
    }
}
const updateDatelineItem: CaseReducer<TableStateArray, PayloadAction<{datelineID: number, date: number}>> =
(state, action) =>  {
    for (let item of state){
        if (item.item_datetime_id === action.payload.datelineID){
            // console.log(format(new Date(action.payload.date), 'yyyy-MM-dd'))
            item.item_dates_datetime = new Date(action.payload.date).toDateString()
        }
    }
}

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTable,
        getTableFailed,
        updateTimelineItem,
        updateDatelineItem
    },
})

export const { 
    getTable: getTableAction, 
    getTableFailed: getTableFailedAction,
    updateTimelineItem: updateTimelineItemAction,
    updateDatelineItem: updateDatelineItemAction
} = tableSlice.actions

export default tableSlice.reducer