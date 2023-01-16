export interface KanbanState {
    statusList: Status[];
    memberList: Member[];
    groupList: Group[];
}

export interface Status {
    id: number;
    name: string;
    color: string;
    order: number;
    itemsList: Item[];
}

export interface Item {
    id: number;
    name: string;
    date: string;
    membersList: string[];
}

export interface Member {
    id: number;
    username: string;
    firstName: string | null;
    lastName: string | null;
}

export interface Group {
    id: number;
    name: string;
}
