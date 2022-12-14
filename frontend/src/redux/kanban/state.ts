export interface KanbanState {
    statusList: Status[], 
}

export interface Status {
    id: number, 
    name: string,
    color: string,
    itemsList: Item[],
}

export interface Item {
    id: number,
    name: string, 
    date: string,
    membersList: string[],
}