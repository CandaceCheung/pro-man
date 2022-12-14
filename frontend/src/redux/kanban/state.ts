export interface KanbanState {
    projectId: number, // common 
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
    membersList: string[],
}