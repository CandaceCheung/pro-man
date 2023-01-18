import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeObject } from '../../theme';

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
    myFavoriteList?: number;
    project_name: string;
    user_id: number;
    role: string;
    state_id: number;
    transaction_id: number;
    vertical_order: number;
    type_name: 'persons' | 'dates' | 'times' | 'money' | 'status' | 'text';
    element_name: string;
}
export interface TableStateArray extends Array<TableState> {}

export interface ItemCell {
    item_id: TableState['item_id'];
    item_name: TableState['item_name'];
    type_id: TableState['horizontal_order_id'];
    type_name: TableState['type_name'];
    element_name: TableState['element_name'];
    item_dates_datetime?: TableState['item_dates_datetime'];
    item_dates_date?: TableState['item_dates_date'];
    transaction_id?: Array<TableState['transaction_id']>;
    item_money_cashflow?: Array<TableState['item_money_cashflow']>;
    item_money_date?: Array<TableState['item_money_date']>;
    item_person_user_id?: Array<TableState['item_person_user_id']>;
    item_status_color?: TableState['item_status_color'];
    item_status_name?: TableState['item_status_name'];
    item_text_text?: TableState['item_text_text'];
    item_times_start_date?: TableState['item_times_start_date'];
    item_times_end_date?: TableState['item_times_end_date'];
}
export type ItemCells = {
    [keys in number]: {
        [keys in number]: { [keys in number]: ItemCell };
    };
};

export interface ItemGroup {
    item_group_id: TableState['item_group_id'];
    item_group_name: TableState['item_group_name'];
}

export type ItemsOrders = Record<number, Array<number>>;

export type TypesOrders = Record<number, Array<number>>;

export interface TableMember {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
    color?: string;
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
export interface MyTableListState extends Array<MyTableState> {}

export type StatusListState = {
    id?: number;
    name?: string;
    color?: string;
};
export interface StatusListStateArray extends Array<StatusListState> {}

export interface CombinedTableState {
    summary: TableStateArray;
    itemCells: ItemCells;
    itemGroups: ItemGroup[];
    itemsOrders: ItemsOrders;
    typesOrders: TypesOrders;
    memberList: TableMember[];
    myFavoriteList: MyFavoriteListState;
    projectList: MyTableListState;
    statusList: StatusListStateArray;
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
            myFavoriteList: undefined,
            project_name: '',
            user_id: 0,
            role: 'member',
            state_id: 0,
            transaction_id: 0,
            vertical_order: 0,
            type_name: 'persons',
            element_name: ''
        }
    ],
    itemCells: {
        0: {
            0: {
                0: {
                    item_id: 0,
                    item_name: '',
                    type_id: 0,
                    type_name: 'persons',
                    element_name: '',
                    item_dates_datetime: '',
                    item_dates_date: '',
                    transaction_id: [0],
                    item_money_cashflow: [0],
                    item_money_date: [''],
                    item_person_user_id: [0],
                    item_status_color: '',
                    item_status_name: '',
                    item_text_text: '',
                    item_times_start_date: 0,
                    item_times_end_date: 0
                }
            }
        }
    },
    itemGroups: [
        {
            item_group_id: 0,
            item_group_name: ''
        }
    ],
    itemsOrders: {
        0: []
    },
    typesOrders: {
        0: []
    },
    memberList: [],
    projectList: [
        {
            creator_id: undefined,
            project_id: undefined,
            member_table_id: undefined,
            username: '',
            project_name: ''
        }
    ],
    myFavoriteList: [
        {
            user_id: undefined,
            creator_id: undefined,
            project_id: undefined,
            favorite_id: undefined,
            project_name: ''
        }
    ],
    statusList: [
        {
            id: undefined,
            name: undefined,
            color: undefined
        }
    ]
};

const getTable: CaseReducer<CombinedTableState, PayloadAction<TableStateArray>> = (state, action) => {
    state.summary = action.payload;
};

const setItemCells: CaseReducer<CombinedTableState, PayloadAction<ItemCells>> = (state, action) => {
    state.itemCells = action.payload;
};

const setItemGroups: CaseReducer<CombinedTableState, PayloadAction<ItemGroup[]>> = (state, action) => {
    state.itemGroups = action.payload;
};

const setItemsOrders: CaseReducer<CombinedTableState, PayloadAction<ItemsOrders>> = (state, action) => {
    state.itemsOrders = action.payload;
};

const setTypesOrders: CaseReducer<CombinedTableState, PayloadAction<TypesOrders>> = (state, action) => {
    state.typesOrders = action.payload;
};

const setMemberList: CaseReducer<CombinedTableState, PayloadAction<TableMember[]>> = (state, action) => {
    const colors = themeObject.colors!.personsTypeComponentColor!;
    for (let i in action.payload) {
        action.payload[i].color = colors[parseInt(i) % colors.length];
    }
    state.memberList = action.payload;
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
    state.myFavoriteList = action.payload;
};
const getTableList: CaseReducer<CombinedTableState, PayloadAction<MyTableListState>> = (state, action) => {
    state.projectList = action.payload;
};
const getStatusList: CaseReducer<CombinedTableState, PayloadAction<StatusListStateArray>> = (state, action) => {
    state.statusList = action.payload;
};
const updateTableList: CaseReducer<CombinedTableState, PayloadAction<MyTableState>> = (state, action) => {
    state.projectList.push(action.payload);
};
const renameProjectInTableList: CaseReducer<CombinedTableState, PayloadAction<{ projectId: number; projectName: string }>> = (state, action) => {
    state.projectList.forEach((project) => {
        if (project.project_id === action.payload.projectId) {
            project.project_name = action.payload.projectName;
        }
    });
    state.myFavoriteList.forEach((project) => {
        if (project.project_id === action.payload.projectId) {
            project.project_name = action.payload.projectName;
        }
    });
};
const updateItemGroupName: CaseReducer<CombinedTableState, PayloadAction<{ itemGroupId: number; itemGroupName: string }>> = (state, action) => {
    for (let itemGroup of state.itemGroups) {
        if (itemGroup.item_group_id === action.payload.itemGroupId) {
            itemGroup.item_group_name = action.payload.itemGroupName;
        }
    }
};
const updateItemName: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; name: string }>> = (state, action) => {
    const itemCells = state.itemCells[action.payload.groupId][action.payload.itemId];
    for (let typeId of Object.keys(itemCells)) {
        itemCells[parseInt(typeId)].item_name = action.payload.name;
    }
};
const updateTypeName: CaseReducer<CombinedTableState, PayloadAction<{ typeId: number; name: string }>> = (state, action) => {
    const itemGroups = state.itemCells;
    for (let itemGroupId of Object.keys(itemGroups)) {
        const items = itemGroups[parseInt(itemGroupId)];
        for (let itemId of Object.keys(items)) {
            const types = items[parseInt(itemId)];
            types[action.payload.typeId].element_name = action.payload.name;
        }
    }
};
const updateText: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; text: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const text = action.payload.text;
    state.itemCells[groupId][itemId][typeId].item_text_text = text;
};
const updateState: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; name: string; color: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const name = action.payload.name;
    const color = action.payload.color;
    state.itemCells[groupId][itemId][typeId].item_status_name = name;
    state.itemCells[groupId][itemId][typeId].item_status_color = color;
};
const removePerson: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, itemId: number, typeId: number, personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    const i = state.itemCells[groupId][itemId][typeId].item_person_user_id!.indexOf(personId);
    state.itemCells[groupId][itemId][typeId].item_person_user_id!.splice(i, 1);
};
const addPerson: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, itemId: number, typeId: number, personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    state.itemCells[groupId][itemId][typeId].item_person_user_id!.push(personId);
};
const addTransaction: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, itemId: number, typeId: number, transactionId: number, date: Date, cashFlow: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;
    const date = action.payload.date;
    const cashFlow = action.payload.cashFlow;

    state.itemCells[groupId][itemId][typeId].item_money_date!.forEach((i, each) => {
        if (new Date(each) >= date) {
            state.itemCells[groupId][itemId][typeId].transaction_id!.splice(parseInt(i), 0, transactionId);
            state.itemCells[groupId][itemId][typeId].item_money_cashflow!.splice(parseInt(i), 0, cashFlow);
            state.itemCells[groupId][itemId][typeId].item_money_date!.splice(parseInt(i), 0, date.toISOString());
            return;
        }
        state.itemCells[groupId][itemId][typeId].transaction_id!.push(transactionId);
        state.itemCells[groupId][itemId][typeId].item_money_cashflow!.push(cashFlow);
        state.itemCells[groupId][itemId][typeId].item_money_date!.push(date.toISOString());
    });
};
const removeTransaction: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, itemId: number, typeId: number, transactionId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;

    const i = state.itemCells[groupId][itemId][typeId].transaction_id!.indexOf(transactionId);
    state.itemCells[groupId][itemId][typeId].transaction_id!.splice(i, 1);
};
const reorderItems: CaseReducer<CombinedTableState, PayloadAction<{ newOrder: number[], groupId: number }>> = (state, action) => {
    state.itemsOrders[action.payload.groupId] = action.payload.newOrder;
};
const reorderTypes: CaseReducer<CombinedTableState, PayloadAction<{ newOrder: number[], groupId: number }>> = (state, action) => {
    state.typesOrders[action.payload.groupId] = action.payload.newOrder;
};
const deleteItem: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, itemId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    delete state.itemCells[groupId][itemId];
    const i = state.itemsOrders[groupId].indexOf(itemId);
    state.itemsOrders[groupId].splice(i, 1);
};
const deleteGroup: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    delete state.itemCells[groupId];
    state.itemGroups = state.itemGroups.filter((each) => each.item_group_id != groupId);
    delete state.itemsOrders[groupId];
    delete state.typesOrders[groupId];
};
const addProject: CaseReducer<CombinedTableState, PayloadAction<MyTableState>> = (state, action) => {
    state.projectList.push(action.payload);
};
const addStatus: CaseReducer<CombinedTableState, PayloadAction<StatusListState>> = (state, action) => {
    state.statusList.push({
        id: action.payload.id,
        name: action.payload.name,
        color: action.payload.color
    });
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        getTable,
        setItemCells,
        setItemGroups,
        setItemsOrders,
        setTypesOrders,
        setMemberList,
        updateTimelineItem,
        updateDatelineItem,
        getFavorite,
        getStatusList,
        updateItemGroupName,
        updateItemName,
        updateTypeName,
        updateText,
        updateState,
        removePerson,
        addPerson,
        addTransaction,
        removeTransaction,
        reorderItems,
        reorderTypes,
        deleteItem,
        deleteGroup,
        getTableList,
        addProject,
        updateTableList,
        renameProjectInTableList,
        addStatus
    }
});

export const {
    getTable: getTableAction,
    setItemCells: setItemCellsAction,
    setItemGroups: setItemGroupsAction,
    setItemsOrders: setItemsOrdersAction,
    setTypesOrders: setTypesOrdersAction,
    setMemberList: setMemberListAction,
    updateTimelineItem: updateTimelineItemAction,
    updateDatelineItem: updateDatelineItemAction,
    getFavorite: getFavoriteAction,
    getStatusList: getStatusListAction,
    updateItemGroupName: updateItemGroupNameAction,
    updateItemName: updateItemNameAction,
    updateTypeName: updateTypeNameAction,
    updateText: updateTextAction,
    updateState: updateStateAction,
    removePerson: removePersonAction,
    addPerson: addPersonAction,
    addTransaction: addTransactionAction,
    removeTransaction: removeTransactionAction,
    reorderItems: reorderItemsAction,
    reorderTypes: reorderTypesAction,
    deleteItem: deleteItemAction,
    deleteGroup: deleteGroupAction,
    getTableList: getTableListAction,
    addProject: addProjectAction,
    updateTableList: updateTableListAction,
    renameProjectInTableList: renameProjectInTableListAction,
    addStatus: addStatusAction
} = tableSlice.actions;

export default tableSlice.reducer;
