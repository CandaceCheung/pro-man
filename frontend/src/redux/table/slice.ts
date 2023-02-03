import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themeObject } from '../../theme';

export interface TableState {
    memberList: {[keys in number]: TableMember};
    myFavoriteList: MyFavorite[];
    projectList: MyTable[];
    statusList: StatusList[];
    summary: TableSummary[];
    itemCells: ItemCells;
    itemGroups: ItemGroup[];
    itemsOrders: Orders;
    typesOrders: Orders;
    itemGroupsCollapsed: boolean[];
    itemGroupsInputActive: boolean[];
    itemGroupsInputValue: string[];
    newItemsInputActive: boolean[];
    newItemsInputValue: string[];
}

export interface TableMember {
    username: string;
    firstName: string | null;
    lastName: string | null;
    color?: string;
}

export type MyFavorite = {
    userId?: number;
    creatorId?: number;
    projectId?: number;
    favoriteId?: number;
    projectName: string;
};

export type MyTable = {
    creatorId?: number;
    projectId?: number;
    memberTableId?: number;
    username: string;
    projectName: string;
};

export type StatusList = {
    id?: number;
    name?: string;
    color?: string;
};

export interface TableSummary {
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

export interface ItemCell {
    itemId: TableSummary['itemId'];
    itemName: TableSummary['itemName'];
    typeId: TableSummary['horizontalOrderId'];
    typeName: TableSummary['typeName'];
    elementName: TableSummary['elementName'];
    itemDatesDatetime?: TableSummary['itemDatesDatetime'];
    itemDatesDate?: TableSummary['itemDatesDate'];
    transactionId?: Array<TableSummary['transactionId']>;
    itemMoneyCashflow?: Array<TableSummary['itemMoneyCashflow']>;
    itemMoneyDate?: Array<TableSummary['itemMoneyDate']>;
    itemPersonUserId?: Array<TableSummary['itemPersonUserId']>;
    itemStatusColor?: TableSummary['itemStatusColor'];
    itemStatusName?: TableSummary['itemStatusName'];
    itemTextText?: TableSummary['itemTextText'];
    itemTimesStartDate?: TableSummary['itemTimesStartDate'];
    itemTimesEndDate?: TableSummary['itemTimesEndDate'];
}

export type ItemCells = {
    [keys in number]: {
        [keys in number]: { [keys in number]: ItemCell };
    };
};

export interface ItemGroup {
    itemGroupId: TableSummary['itemGroupId'];
    itemGroupName: TableSummary['itemGroupName'];
}

export type Orders = Record<number, Array<number>>;

const initialState: TableState = {
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
            horizontalOrder: 0,
            horizontalOrderId: 0,
            itemCreatorId: 0,
            itemDatesDatetime: '',
            itemDatesDate: '',
            itemDatetimeId: 0,
            itemDatetimeColor: '#238BE6',
            itemGroupId: 0,
            itemGroupName: '',
            itemId: 0,
            itemIsDeleted: false,
            itemMoneyCashflow: 0,
            itemMoneyDate: '',
            itemName: '',
            itemPersonId: 0,
            itemPersonUserId: 0,
            itemPersonName: '',
            itemStatusColor: '',
            itemStatusName: '',
            itemTextId: 0,
            itemTextText: '',
            itemTimesEndDate: 0,
            itemTimesId: 0,
            itemTimesStartDate: 0,
            itemTimesColor: '#238BE6',
            joinedProjectId: 0,
            projectCreatorId: 0,
            projectId: 0,
            projectIsDeleted: false,
            myFavoriteList: undefined,
            projectName: '',
            userId: 0,
            role: 'member',
            stateId: 0,
            transactionId: 0,
            verticalOrder: 0,
            typeName: 'persons',
            elementName: ''
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
    newItemsInputValue: []
};

const getTable: CaseReducer<TableState, PayloadAction<TableSummary[]>> = (state, action) => {
    state.summary = action.payload;
};

const setItemCells: CaseReducer<TableState, PayloadAction<ItemCells>> = (state, action) => {
    state.itemCells = action.payload;
};

const setItemGroups: CaseReducer<TableState, PayloadAction<ItemGroup[]>> = (state, action) => {
    state.itemGroups = action.payload;
};

const setItemsOrders: CaseReducer<TableState, PayloadAction<Orders>> = (state, action) => {
    state.itemsOrders = action.payload;
};

const setTypesOrders: CaseReducer<TableState, PayloadAction<Orders>> = (state, action) => {
    state.typesOrders = action.payload;
};

const setMemberList: CaseReducer<TableState, PayloadAction<{[keys in number]: TableMember}>> = (state, action) => {
    const colors = themeObject.colors!.personsTypeComponentColor!;
    let i = 0;
    for (let id of Object.keys(action.payload)) {
        action.payload[parseInt(id)].color = colors[i % colors.length];
        i++;
    }
    state.memberList = action.payload;
};

const setItemGroupsCollapsed: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsCollapsed = Array(action.payload).fill(false);
};

const setItemGroupsInputActive: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive = Array(action.payload).fill(false);
};

const setItemGroupsInputValue: CaseReducer<TableState, PayloadAction<ItemGroup[]>> = (state, action) => {
    let temp: string[] = [];
    action.payload.forEach((each) => {
        temp.push(each.itemGroupName);
    });
    state.itemGroupsInputValue = temp;
};

const setNewItemsInputActive: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputActive = Array(action.payload).fill(false);
};

const setNewItemsInputValue: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputValue = Array(action.payload).fill('');
};

const updateTimelineItem: CaseReducer<
    TableState,
    PayloadAction<{
        timelineId: number;
        startTime: number;
        endTime: number;
        name: string;
        color: string;
        typeId: number;
    }>
> = (state, action) => {
    for (let item of state.summary) {
        if (item.itemTimesId === action.payload.timelineId) {
            item.itemTimesStartDate = action.payload?.startTime;
            item.itemTimesEndDate = action.payload?.endTime;
            item.itemTimesColor = action.payload?.color;
        }
        if (item.horizontalOrderId === action.payload.typeId) {
            item.elementName = action.payload?.name;
        }
    }
};
const updateDatelineItem: CaseReducer<
    TableState,
    PayloadAction<{
        datelineId: number;
        date: number;
        name: string;
        color: string;
        typeId: number;
    }>
> = (state, action) => {
    for (let item of state.summary) {
        if (item.itemDatetimeId === action.payload.datelineId) {
            item.itemDatesDatetime = new Date(action.payload.date).toDateString();
            item.itemDatetimeColor = action.payload?.color;
        }
        if (item.horizontalOrderId === action.payload.typeId) {
            item.elementName = action.payload?.name;
        }
    }
};

const getFavorite: CaseReducer<TableState, PayloadAction<MyFavorite[]>> = (state, action) => {
    state.myFavoriteList = action.payload;
};
const getTableList: CaseReducer<TableState, PayloadAction<MyTable[]>> = (state, action) => {
    state.projectList = action.payload;
};
const getStatusList: CaseReducer<TableState, PayloadAction<StatusList[]>> = (state, action) => {
    state.statusList = action.payload;
};
const updateTableList: CaseReducer<TableState, PayloadAction<MyTable>> = (state, action) => {
    state.projectList.push(action.payload);
};
const renameProjectInTableList: CaseReducer<TableState, PayloadAction<{ projectId: number; projectName: string }>> = (state, action) => {
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
const updateItemGroupName: CaseReducer<TableState, PayloadAction<{ itemGroupId: number; itemGroupName: string }>> = (state, action) => {
    for (let itemGroup of state.itemGroups) {
        if (itemGroup.itemGroupId === action.payload.itemGroupId) {
            itemGroup.itemGroupName = action.payload.itemGroupName;
        }
    }
};
const updateItemName: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; name: string }>> = (state, action) => {
    const itemCells = state.itemCells[action.payload.groupId][action.payload.itemId];
    for (let typeId of Object.keys(itemCells)) {
        itemCells[parseInt(typeId)].itemName = action.payload.name;
    }
};
const updateTypeName: CaseReducer<TableState, PayloadAction<{ groupId: number; typeId: number; name: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const typeId = action.payload.typeId;
    const name = action.payload.name;

    for (let itemId of Object.keys(state.itemCells[groupId])) {
        state.itemCells[groupId][parseInt(itemId)][typeId].elementName = name;
    }
};
const updateText: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; text: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const text = action.payload.text;
    state.itemCells[groupId][itemId][typeId].itemTextText = text;
};
const updateState: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; name: string; color: string }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const name = action.payload.name;
    const color = action.payload.color;
    state.itemCells[groupId][itemId][typeId].itemStatusName = name;
    state.itemCells[groupId][itemId][typeId].itemStatusColor = color;
};
const removePerson: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    const i = state.itemCells[groupId][itemId][typeId].itemPersonUserId!.indexOf(personId);
    state.itemCells[groupId][itemId][typeId].itemPersonUserId!.splice(i, 1);
};
const addPerson: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; personId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const personId = action.payload.personId;

    state.itemCells[groupId][itemId][typeId].itemPersonUserId!.push(personId);
};
const addTransaction: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; transactionId: number; date: Date; cashFlow: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;
    const date = action.payload.date;
    const cashFlow = action.payload.cashFlow;

    state.itemCells[groupId][itemId][typeId].itemMoneyDate!.forEach((each, i) => {
        if (new Date(each) >= date) {
            state.itemCells[groupId][itemId][typeId].transactionId!.splice(i, 0, transactionId);
            state.itemCells[groupId][itemId][typeId].itemMoneyCashflow!.splice(i, 0, cashFlow);
            state.itemCells[groupId][itemId][typeId].itemMoneyDate!.splice(i, 0, date.toISOString());
            return;
        }
        state.itemCells[groupId][itemId][typeId].transactionId!.push(transactionId);
        state.itemCells[groupId][itemId][typeId].itemMoneyCashflow!.push(cashFlow);
        state.itemCells[groupId][itemId][typeId].itemMoneyDate!.push(date.toISOString());
    });
};
const removeTransaction: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number; typeId: number; transactionId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    const typeId = action.payload.typeId;
    const transactionId = action.payload.transactionId;

    const i = state.itemCells[groupId][itemId][typeId].transactionId!.indexOf(transactionId);
    state.itemCells[groupId][itemId][typeId].transactionId!.splice(i, 1);
    state.itemCells[groupId][itemId][typeId].itemMoneyCashflow!.splice(i, 1);
    state.itemCells[groupId][itemId][typeId].itemMoneyDate!.splice(i, 1);
};
const reorderItems: CaseReducer<TableState, PayloadAction<{ newOrder: number[]; groupId: number }>> = (state, action) => {
    state.itemsOrders[action.payload.groupId] = action.payload.newOrder;
};
const reorderTypes: CaseReducer<TableState, PayloadAction<{ newOrder: number[]; groupId: number }>> = (state, action) => {
    state.typesOrders[action.payload.groupId] = action.payload.newOrder;
};
const deleteItem: CaseReducer<TableState, PayloadAction<{ groupId: number; itemId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const itemId = action.payload.itemId;
    delete state.itemCells[groupId][itemId];
    const i = state.itemsOrders[groupId].indexOf(itemId);
    state.itemsOrders[groupId].splice(i, 1);
};
const deleteGroup: CaseReducer<TableState, PayloadAction<{ groupId: number }>> = (state, action) => {
    const groupId = action.payload.groupId;
    const groupIds = state.itemGroups.map((each) => each.itemGroupId);
    const index = groupIds.indexOf(groupId);
    delete state.itemCells[groupId];
    state.itemGroups = state.itemGroups.filter((each) => each.itemGroupId != groupId);
    delete state.itemsOrders[groupId];
    delete state.typesOrders[groupId];

    state.itemGroupsCollapsed.splice(index, 1);
    state.itemGroupsInputActive.splice(index, 1);
    state.itemGroupsInputValue.splice(index, 1);
    state.newItemsInputActive.splice(index, 1);
    state.newItemsInputValue.splice(index, 1);
};
const toggleItemGroupsCollapsed: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsCollapsed[action.payload] = !state.itemGroupsCollapsed[action.payload];
};
const selectItemGroupInput: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive[action.payload] = true;
};
const deselectItemGroupInput: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.itemGroupsInputActive[action.payload] = false;
};
const changeItemGroupInputValue: CaseReducer<TableState, PayloadAction<{ index: number; value: string }>> = (state, action) => {
    state.itemGroupsInputValue[action.payload.index] = action.payload.value;
};
const resetItemGroupInputValue: CaseReducer<TableState, PayloadAction<{ index: number; originalValue: string }>> = (state, action) => {
    state.itemGroupsInputValue[action.payload.index] = action.payload.originalValue;
    state.itemGroups[action.payload.index].itemGroupName = action.payload.originalValue;
};
const toggleNewItemsInputActive: CaseReducer<TableState, PayloadAction<number>> = (state, action) => {
    state.newItemsInputActive[action.payload] = !state.newItemsInputActive[action.payload];
};
const changeNewItemsInputValue: CaseReducer<TableState, PayloadAction<{ index: number; value: string }>> = (state, action) => {
    state.newItemsInputValue[action.payload.index] = action.payload.value;
};
const insertItem: CaseReducer<TableState, PayloadAction<ItemCells>> = (state, action) => {
    const [groupIdString] = Object.keys(action.payload);
    const groupId = parseInt(groupIdString);
    const [itemIdString] = Object.keys(action.payload[groupId]);
    const itemId = parseInt(itemIdString);
    state.itemCells[groupId][itemId] = action.payload[groupId][itemId];
    state.itemsOrders[groupId].unshift(itemId);
};
const insertItemGroup: CaseReducer<TableState, PayloadAction<{ itemGroupId: number; itemGroupName: string; typeIds: number[] }>> = (state, action) => {
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
    state.newItemsInputValue.unshift('');
};
const addProject: CaseReducer<TableState, PayloadAction<MyTable>> = (state, action) => {
    state.projectList.push(action.payload);
};
const addStatus: CaseReducer<TableState, PayloadAction<StatusList>> = (state, action) => {
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
    addProject: addProjectAction,
    updateTableList: updateTableListAction,
    renameProjectInTableList: renameProjectInTableListAction,
    addStatus: addStatusAction
} = tableSlice.actions;

export default tableSlice.reducer;
