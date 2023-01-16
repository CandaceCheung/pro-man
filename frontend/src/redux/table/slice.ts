import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableState {
    horizontal_order: number | null;
    horizontal_order_id: number;
    item_creator_id: number;
    item_dates_datetime: string;
    item_dates_date: string;
    item_datetime_id: number;
    item_datetime_color: string;
    item_group_id: number;
    item_group_name: string;
    item_id: number;
    item_is_deleted: boolean;
    item_money_cashflow: number;
    item_money_date: string;
    item_name: string;
    item_person_id: number;
    item_person_user_id: number;
    item_person_name: string;
    item_status_color: string;
    item_status_name: string;
    item_text_id: number;
    item_text_text: string;
    item_times_end_date: number;
    item_times_id: number;
    item_times_start_date: number;
    item_times_color: string;
    joined_project_id: number;
    project_creator_id: number;
    project_id: number;
    project_is_deleted: boolean;
    my_favorite_list?: number;
    project_name: string;
    user_id: number;
    role: string;
    state_id: number;
    transaction_id: number;
    vertical_order: number;
    type_name: 'persons' | 'dates' | 'times' | 'money' | 'status' | 'text';
    element_name: string;
}

export type MyFavoriteListState = {
    user_id?: number;
    creator_id?: number;
    project_id?: number;
    favorite_id?: number;
    project_name: string;
}[];

export type MyTableState = {
    creator_id?: number;
    project_id?: number;
    member_table_id?: number;
    username: string;
    project_name: string;
};

export type StatusListState = {
    id?: number;
    name?: string;
    color?: string;
};

export interface MyTableListState extends Array<MyTableState> {}

export interface TableStateArray extends Array<TableState> {}

export interface StatusListStateArray extends Array<StatusListState> {}

export interface CombinedTableState {
    summary: TableStateArray;
    my_favorite_list: MyFavoriteListState;
    project_list: MyTableListState;
    status_list: StatusListStateArray;
}

const initialState: CombinedTableState = {
    summary: [
        {
            horizontal_order: 0,
            horizontal_order_id: 0,
            item_creator_id: 0,
            item_dates_datetime: '',
            item_dates_date: '',
            item_datetime_id: 0,
            item_datetime_color: '#238BE6',
            item_group_id: 0,
            item_group_name: '',
            item_id: 0,
            item_is_deleted: false,
            item_money_cashflow: 0,
            item_money_date: '',
            item_name: '',
            item_person_id: 0,
            item_person_user_id: 0,
            item_person_name: '',
            item_status_color: '',
            item_status_name: '',
            item_text_id: 0,
            item_text_text: '',
            item_times_end_date: 0,
            item_times_id: 0,
            item_times_start_date: 0,
            item_times_color: '#238BE6',
            joined_project_id: 0,
            project_creator_id: 0,
            project_id: 0,
            project_is_deleted: false,
            my_favorite_list: undefined,
            project_name: '',
            user_id: 0,
            role: 'member',
            state_id: 0,
            transaction_id: 0,
            vertical_order: 0,
            type_name: 'persons',
            element_name: '',
        },
    ],
    project_list: [
        {
            creator_id: undefined,
            project_id: undefined,
            member_table_id: undefined,
            username: '',
            project_name: '',
        },
    ],
    my_favorite_list: [
        {
            user_id: undefined,
            creator_id: undefined,
            project_id: undefined,
            favorite_id: undefined,
            project_name: '',
        },
    ],
    status_list: [
        {
            id: undefined,
            name: undefined,
            color: undefined,
        },
    ],
};

const getTable: CaseReducer<CombinedTableState, PayloadAction<TableStateArray>> = (state, action) => {
    state.summary = action.payload;
};
// 怪怪的
const getTableFailed: CaseReducer<CombinedTableState, PayloadAction> = (state, action) => {
    state = { ...state };
};

const updateTimelineItem: CaseReducer<
    CombinedTableState,
    PayloadAction<{
        timelineID: number;
        startTime: number;
        endTime: number;
        name: string;
        color: string;
        typeId: number;
    }>
> = (state, action) => {
    for (let item of state.summary) {
        if (item.item_times_id === action.payload.timelineID) {
            item.item_times_start_date = action.payload?.startTime;
            item.item_times_end_date = action.payload?.endTime;
            item.item_times_color = action.payload?.color;
        }
        if (item.horizontal_order_id === action.payload.typeId) {
            item.element_name = action.payload?.name;
        }
    }
};
const updateDatelineItem: CaseReducer<
    CombinedTableState,
    PayloadAction<{
        datelineID: number;
        date: number;
        name: string;
        color: string;
        typeId: number;
    }>
> = (state, action) => {
    for (let item of state.summary) {
        if (item.item_datetime_id === action.payload.datelineID) {
            item.item_dates_datetime = new Date(action.payload.date).toDateString();
            item.item_datetime_color = action.payload?.color;
        }
        if (item.horizontal_order_id === action.payload.typeId) {
            item.element_name = action.payload?.name;
        }
    }
};

const getFavorite: CaseReducer<CombinedTableState, PayloadAction<MyFavoriteListState>> = (state, action) => {
    state.my_favorite_list = action.payload;
};
const getTableList: CaseReducer<CombinedTableState, PayloadAction<MyTableListState>> = (state, action) => {
    state.project_list = action.payload;
};
const getStatusList: CaseReducer<CombinedTableState, PayloadAction<StatusListStateArray>> = (state, action) => {
    state.status_list = action.payload;
};
const updateTableList: CaseReducer<CombinedTableState, PayloadAction<MyTableState>> = (state, action) => {
    state.project_list.push(action.payload);
};
const renameProjectInTableList: CaseReducer<
    CombinedTableState,
    PayloadAction<{ projectId: number; projectName: string }>
> = (state, action) => {
    state.project_list.forEach((project) => {
        if (project.project_id === action.payload.projectId) {
            project.project_name = action.payload.projectName;
        }
    });
    state.my_favorite_list.forEach((project) => {
        if (project.project_id === action.payload.projectId) {
            project.project_name = action.payload.projectName;
        }
    });
};
const updateItemGroupName: CaseReducer<
    CombinedTableState,
    PayloadAction<{ itemGroupId: number; itemGroupName: string }>
> = (state, action) => {
    for (let item of state.summary) {
        if (item.item_group_id === action.payload.itemGroupId) {
            item.item_group_name = action.payload.itemGroupName;
        }
    }
};
const addProject: CaseReducer<CombinedTableState, PayloadAction<MyTableState>> = (state, action) => {
    state.project_list.push(action.payload);
};
const addStatus: CaseReducer<CombinedTableState, PayloadAction<StatusListState>> = (state, action) => {
    state.status_list.push({
        id: action.payload.id,
        name: action.payload.name,
        color: action.payload.color,
    });
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTable,
        getTableFailed,
        updateTimelineItem,
        updateDatelineItem,
        getFavorite,
        getStatusList,
        updateItemGroupName,
        getTableList,
        addProject,
        updateTableList,
        renameProjectInTableList,
        addStatus,
    },
});

export const {
    getTable: getTableAction,
    getTableFailed: getTableFailedAction,
    updateTimelineItem: updateTimelineItemAction,
    updateDatelineItem: updateDatelineItemAction,
    getFavorite: getFavoriteAction,
    getStatusList: getStatusListAction,
    updateItemGroupName: updateItemGroupNameAction,
    getTableList: getTableListAction,
    addProject: addProjectAction,
    updateTableList: updateTableListAction,
    renameProjectInTableList: renameProjectInTableListAction,
    addStatus: addStatusAction,
} = tableSlice.actions;

export default tableSlice.reducer;
