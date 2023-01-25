import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeObject } from '../../theme';

export interface TableMember {
    username: string;
    firstName: string | null;
    lastName: string | null;
    color?: string;
}

export type TableMembers = {
    [keys in number]: TableMember;
};

export type MyFavoriteListState = {
    userId?: number;
    creatorId?: number;
    projectId?: number;
    favoriteId?: number;
    projectName: string;
}[];

export type MyTableState = {
    creatorId?: number;
    projectId?: number;
    memberTableId?: number;
    username: string;
    projectName: string;
};
export interface MyTableListState extends Array<MyTableState> {}

export type StatusListState = {
    id?: number;
    name?: string;
    color?: string;
};
export interface StatusListStateArray extends Array<StatusListState> {}

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

export interface TableStateV2 {
    horizontalOrder: number | null;
    horizontalOrderId: number;
    itemCreatorId: number;
    itemDatesDatetime: string;
    itemDatesDate: string;
    itemDatetimeId: number;
    itemDatetimeColor: string;
    itemGroupId: number;
    itemGroupName: string;
    itemId: number;
    itemIsDeleted: boolean;
    itemMoneyCashflow: number;
    itemMoneyDate: string;
    itemName: string;
    itemPersonId: number;
    itemPersonUserId: number;
    itemPersonName: string;
    itemStatusColor: string;
    itemStatusName: string;
    itemTextId: number;
    itemTextText: string;
    itemTimesEndDate: number;
    itemTimesId: number;
    itemTimesStartDate: number;
    itemTimesColor: string;
    joinedProjectId: number;
    projectCreatorId: number;
    projectId: number;
    projectIsDeleted: boolean;
    myFavoriteList?: number;
    projectName: string;
    userId: number;
    role: string;
    stateId: number;
    transactionId: number;
    verticalOrder: number;
    typeName: 'persons' | 'dates' | 'times' | 'money' | 'status' | 'text';
    elementName: string;
}
export interface TableStateArray extends Array<TableState> {}

export interface ItemCell {
    itemId: TableStateV2['itemId'];
    itemName: TableStateV2['itemName'];
    typeId: TableStateV2['horizontalOrderId'];
    typeName: TableStateV2['typeName'];
    elementName: TableStateV2['elementName'];
    itemDatesDatetime?: TableStateV2['itemDatesDatetime'];
    itemDatesDate?: TableStateV2['itemDatesDate'];
    transactionId?: Array<TableStateV2['transactionId']>;
    itemMoneyCashflow?: Array<TableStateV2['itemMoneyCashflow']>;
    itemMoneyDate?: Array<TableStateV2['itemMoneyDate']>;
    itemPersonUserId?: Array<TableStateV2['itemPersonUserId']>;
    itemStatusColor?: TableStateV2['itemStatusColor'];
    itemStatusName?: TableStateV2['itemStatusName'];
    itemTextText?: TableStateV2['itemTextText'];
    itemTimesStartDate?: TableStateV2['itemTimesStartDate'];
    itemTimesEndDate?: TableStateV2['itemTimesEndDate'];
}
export type ItemCells = {
    [keys in number]: {
        [keys in number]: { [keys in number]: ItemCell };
    };
};

export interface ItemGroup {
    itemGroupId: TableStateV2['itemGroupId'];
    itemGroupName: TableStateV2['itemGroupName'];
}

export type ItemsOrders = Record<number, Array<number>>;

export type TypesOrders = Record<number, Array<number>>;

export type DeleteGroupModal = Record<number, boolean>;

export interface CombinedTableState {
    memberList: TableMembers;
    myFavoriteList: MyFavoriteListState;
    projectList: MyTableListState;
    statusList: StatusListStateArray;
    summary: TableStateArray;
    itemCells: ItemCells;
    itemGroups: ItemGroup[];
    itemsOrders: ItemsOrders;
    typesOrders: TypesOrders;
    itemGroupsCollapsed: boolean[];
    itemGroupsInputActive: boolean[];
    itemGroupsInputValue: string[];
    newItemsInputActive: boolean[];
    newItemsInputValue: string[];
    deleteGroupModalOpened: DeleteGroupModal;
}

const initialState: CombinedTableState = {
    memberList: [],
    projectList: [
        {
            creatorId: undefined,
            projectId: undefined,
            memberTableId: undefined,
            username: '',
            projectName: ''
        }
    ],
    myFavoriteList: [
        {
            userId: undefined,
            creatorId: undefined,
            projectId: undefined,
            favoriteId: undefined,
            projectName: ''
        }
    ],
    statusList: [
        {
            id: undefined,
            name: undefined,
            color: undefined
        }
    ],
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
                    itemId: 0,
                    itemName: '',
                    typeId: 0,
                    typeName: 'persons',
                    elementName: '',
                    itemDatesDatetime: '',
                    itemDatesDate: '',
                    transactionId: [0],
                    itemMoneyCashflow: [0],
                    itemMoneyDate: [''],
                    itemPersonUserId: [0],
                    itemStatusColor: '',
                    itemStatusName: '',
                    itemTextText: '',
                    itemTimesStartDate: 0,
                    itemTimesEndDate: 0
                }
            }
        }
    },
    itemGroups: [
        {
            itemGroupId: 0,
            itemGroupName: ''
        }
    ],
    itemsOrders: {
        0: []
    },
    typesOrders: {
        0: []
    },
    itemGroupsCollapsed: [],
    itemGroupsInputActive: [],
    itemGroupsInputValue: [],
    newItemsInputActive: [],
    newItemsInputValue: [],
    deleteGroupModalOpened: {}
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

const setMemberList: CaseReducer<CombinedTableState, PayloadAction<TableMembers>> = (state, action) => {
    const colors = themeObject.colors!.personsTypeComponentColor!;
    let i = 0;
    for (let id of Object.keys(action.payload)) {
        action.payload[parseInt(id)].color = colors[i % colors.length];
        i++;
    }
    state.memberList = action.payload;
};

const setItemGroupsCollapsed: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsCollapsed = Array(action.payload).fill(false);
};

const setItemGroupsInputActive: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive = Array(action.payload).fill(false);
};

const setItemGroupsInputValue: CaseReducer<CombinedTableState, PayloadAction<ItemGroup[]>> = (state, action) => {
    let temp: string[] = [];
    action.payload.forEach((each) => {
        temp.push(each.itemGroupName);
    });
    state.itemGroupsInputValue = temp;
};

const setNewItemsInputActive: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputActive = Array(action.payload).fill(false);
};

const setNewItemsInputValue: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputValue = Array(action.payload).fill('');
};

const setDeleteGroupModalOpened: CaseReducer<CombinedTableState, PayloadAction<ItemGroup[]>> = (state, action) => {
    let temp: DeleteGroupModal = {};
    action.payload.forEach((each) => {
        temp[each.itemGroupId] = false;
    });
    state.deleteGroupModalOpened = temp;
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
        if (project.projectId === action.payload.projectId) {
            project.projectName = action.payload.projectName;
        }
    });
    state.myFavoriteList.forEach((project) => {
        if (project.projectId === action.payload.projectId) {
            project.projectName = action.payload.projectName;
        }
    });
};
const updateItemGroupName: CaseReducer<CombinedTableState, PayloadAction<{ itemGroupId: number; itemGroupName: string }>> = (state, action) => {
    for (let itemGroup of state.itemGroups) {
        if (itemGroup.itemGroupId === action.payload.itemGroupId) {
            itemGroup.itemGroupName = action.payload.itemGroupName;
        }
    }
};
const updateItemName: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; name: string }>> = (state, action) => {
    const itemCells = state.itemCells[action.payload.groupId][action.payload.itemId];
    for (let typeId of Object.keys(itemCells)) {
        itemCells[parseInt(typeId)].itemName = action.payload.name;
    }
};
const updateTypeName: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number, typeId: number; name: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const typeId = action.payload.typeId;
    const name = action.payload.name;

    for (let itemId of Object.keys(state.itemCells[groupId])) {
        state.itemCells[groupId][parseInt(itemId)][typeId].elementName = name;
    }
};
const updateText: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; text: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const text = action.payload.text;
    state.itemCells[groupId][itemId][typeId].itemTextText = text;
};
const updateState: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; name: string; color: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const name = action.payload.name;
    const color = action.payload.color;
    state.itemCells[groupId][itemId][typeId].itemStatusName = name;
    state.itemCells[groupId][itemId][typeId].itemStatusColor = color;
};
const removePerson: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    const i = state.itemCells[groupId][itemId][typeId].itemPersonUserId!.indexOf(personId);
    state.itemCells[groupId][itemId][typeId].itemPersonUserId!.splice(i, 1);
};
const addPerson: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    state.itemCells[groupId][itemId][typeId].itemPersonUserId!.push(personId);
};
const addTransaction: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; transactionId: number; date: Date; cashFlow: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;
    const date = action.payload.date;
    const cashFlow = action.payload.cashFlow;

    state.itemCells[groupId][itemId][typeId].itemMoneyDate!.forEach((i, each) => {
        if (new Date(each) >= date) {
            state.itemCells[groupId][itemId][typeId].transactionId!.splice(parseInt(i), 0, transactionId);
            state.itemCells[groupId][itemId][typeId].itemMoneyCashflow!.splice(parseInt(i), 0, cashFlow);
            state.itemCells[groupId][itemId][typeId].itemMoneyDate!.splice(parseInt(i), 0, date.toISOString());
            return;
        }
        state.itemCells[groupId][itemId][typeId].transactionId!.push(transactionId);
        state.itemCells[groupId][itemId][typeId].itemMoneyCashflow!.push(cashFlow);
        state.itemCells[groupId][itemId][typeId].itemMoneyDate!.push(date.toISOString());
    });
};
const removeTransaction: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; transactionId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;

    const i = state.itemCells[groupId][itemId][typeId].transactionId!.indexOf(transactionId);
    state.itemCells[groupId][itemId][typeId].transactionId!.splice(i, 1);
};
const reorderItems: CaseReducer<CombinedTableState, PayloadAction<{ newOrder: number[]; groupId: number }>> = (state, action) => {
    state.itemsOrders[action.payload.groupId] = action.payload.newOrder;
};
const reorderTypes: CaseReducer<CombinedTableState, PayloadAction<{ newOrder: number[]; groupId: number }>> = (state, action) => {
    state.typesOrders[action.payload.groupId] = action.payload.newOrder;
};
const deleteItem: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number; itemId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    delete state.itemCells[groupId][itemId];
    const i = state.itemsOrders[groupId].indexOf(itemId);
    state.itemsOrders[groupId].splice(i, 1);
};
const deleteGroup: CaseReducer<CombinedTableState, PayloadAction<{ groupId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const groupIds = state.itemGroups.map((each) => each.itemGroupId);
    const index = groupIds.indexOf(groupId);
    delete state.itemCells[groupId];
    state.itemGroups = state.itemGroups.filter((each) => each.itemGroupId != groupId);
    delete state.itemsOrders[groupId];
    delete state.typesOrders[groupId];
    delete state.deleteGroupModalOpened[groupId];

    state.itemGroupsCollapsed.splice(index, 1);
    state.itemGroupsInputActive.splice(index, 1);
    state.itemGroupsInputValue.splice(index, 1);
    state.newItemsInputActive.splice(index, 1);
    state.newItemsInputValue.splice(index, 1);
};
const toggleItemGroupsCollapsed: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsCollapsed[action.payload] = !state.itemGroupsCollapsed[action.payload];
};
const selectItemGroupInput: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive[action.payload] = true;
};
const deselectItemGroupInput: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive[action.payload] = false;
};
const changeItemGroupInputValue: CaseReducer<CombinedTableState, PayloadAction<{ index: number; value: string }>> = (state, action) => {
    state.itemGroupsInputValue[action.payload.index] = action.payload.value;
};
const resetItemGroupInputValue: CaseReducer<CombinedTableState, PayloadAction<{ index: number; originalValue: string }>> = (state, action) => {
    state.itemGroupsInputValue[action.payload.index] = action.payload.originalValue;
    state.itemGroups[action.payload.index].itemGroupName = action.payload.originalValue;
};
const toggleNewItemsInputActive: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputActive[action.payload] = !state.newItemsInputActive[action.payload];
};
const changeNewItemsInputValue: CaseReducer<CombinedTableState, PayloadAction<{index: number, value: string}>> = (state, action) => {
    state.newItemsInputValue[action.payload.index] = action.payload.value;
};
const insertItem: CaseReducer<CombinedTableState, PayloadAction<ItemCells>> = (state, action) => {
    const [groupIdString] = Object.keys(action.payload);
    const groupId = parseInt(groupIdString);
    const [itemIdString] = Object.keys(action.payload[groupId]);
    const itemId = parseInt(itemIdString);
    state.itemCells[groupId][itemId] = action.payload[groupId][itemId];
    state.itemsOrders[groupId].unshift(itemId);
};
const insertItemGroup: CaseReducer<CombinedTableState, PayloadAction<{itemGroupId: number, itemGroupName: string, typeIds: number[]}>> = (state, action) => {
    const itemGroupId = action.payload.itemGroupId;
    const itemGroupName = action.payload.itemGroupName;
    const typeIds = action.payload.typeIds;
    state.itemCells[itemGroupId] = {};
    state.itemGroups.unshift({
        itemGroupId: itemGroupId,
        itemGroupName: itemGroupName
    });
    state.itemGroupsCollapsed.unshift(false);
    state.itemGroupsInputActive.unshift(false);
    state.itemGroupsInputValue.unshift(itemGroupName);
    state.itemsOrders[itemGroupId] = [];
    state.typesOrders[itemGroupId] = typeIds;
    state.newItemsInputActive.unshift(false);
    state.newItemsInputValue.unshift("");
    state.deleteGroupModalOpened[itemGroupId] = false;
};
const toggleDeleteGroupModal: CaseReducer<CombinedTableState, PayloadAction<number>> = (state, action) => {
    state.deleteGroupModalOpened[action.payload] = !state.deleteGroupModalOpened[action.payload];
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
        setItemGroupsCollapsed,
        setItemGroupsInputActive,
        setItemGroupsInputValue,
        setNewItemsInputActive,
        setNewItemsInputValue,
        setDeleteGroupModalOpened,
        updateTimelineItem,
        updateDatelineItem,
        getFavorite,
        getTableList,
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
        toggleItemGroupsCollapsed,
        selectItemGroupInput,
        deselectItemGroupInput,
        changeItemGroupInputValue,
        resetItemGroupInputValue,
        toggleNewItemsInputActive,
        changeNewItemsInputValue,
        insertItem,
        insertItemGroup,
        toggleDeleteGroupModal,
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
    setItemGroupsCollapsed: setItemGroupsCollapsedAction,
    setItemGroupsInputActive: setItemGroupsInputActiveAction,
    setItemGroupsInputValue: setItemGroupsInputValueAction,
    setNewItemsInputActive: setNewItemsInputActiveAction,
    setNewItemsInputValue: setNewItemsInputValueAction,
    setDeleteGroupModalOpened: setDeleteGroupModalOpenedAction,
    updateTimelineItem: updateTimelineItemAction,
    updateDatelineItem: updateDatelineItemAction,
    getFavorite: getFavoriteAction,
    getTableList: getTableListAction,
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
    toggleItemGroupsCollapsed: toggleItemGroupsCollapsedAction,
    selectItemGroupInput: selectItemGroupInputAction,
    deselectItemGroupInput: deselectItemGroupInputAction,
    changeItemGroupInputValue: changeItemGroupInputValueAction,
    resetItemGroupInputValue: resetItemGroupInputValueAction,
    toggleNewItemsInputActive: toggleNewItemsInputActiveAction,
    changeNewItemsInputValue: changeNewItemsInputValueAction,
    insertItem: insertItemAction,
    insertItemGroup: insertItemGroupAction,
    toggleDeleteGroupModal: toggleDeleteGroupModalAction,
    addProject: addProjectAction,
    updateTableList: updateTableListAction,
    renameProjectInTableList: renameProjectInTableListAction,
    addStatus: addStatusAction
} = tableSlice.actions;

export default tableSlice.reducer;
