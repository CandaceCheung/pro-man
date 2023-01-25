export interface TableState {
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

export interface itemCellsElement {
    itemId: TableState['itemId'];
    itemName: TableState['itemName'];
    typeId: TableState['horizontalOrderId'];
    typeName: TableState['typeName'];
    elementName: TableState['elementName'];
    itemDatesDatetime?: TableState['itemDatesDatetime'];
    itemDatesDate?: TableState['itemDatesDate'];
    transactionId?: Array<TableState['transactionId']>;
    itemMoneyCashflow?: Array<TableState['itemMoneyCashflow']>;
    itemMoneyDate?: Array<TableState['itemMoneyDate']>;
    itemPersonUserId?: Array<TableState['itemPersonUserId']>;
    itemStatusColor?: TableState['itemStatusColor'];
    itemStatusName?: TableState['itemStatusName'];
    itemTextText?: TableState['itemTextText'];
    itemTimesStartDate?: TableState['itemTimesStartDate'];
    itemTimesEndDate?: TableState['itemTimesEndDate'];
}

export interface itemsGroupElement {
    itemGroupId: TableState['itemGroupId'];
    itemGroupName: TableState['itemGroupName'];
}