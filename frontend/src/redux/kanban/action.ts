import { Item, Status } from "./state";

export function setKanbanInfo(statusList: Status[]) {
    return {
        type: "KANBAN/SET" as const,
        statusList,
    };
}

export function setKanbanMember(memberList: []) {
    return {
        type: "KANBAN/SET_MEMBER" as const,
        memberList,
    };
}

export function setKanbanGroup(groupList: []) {
    return {
        type: "KANBAN/SET_GROUP" as const,
        groupList,
    };
}

export function addKanbanItem(
    projectId: number,
    stateId: number,
    itemId:number,
    itemName: string,
    memberId: string[],
    date: Date,
    groupId: string[],
) {
    const dateString = date.toISOString();
    const item:Item = {id:itemId, name:itemName, date:dateString, membersList:memberId}

    return {
        type: "KANBAN/ADD" as const,
        projectId,
        stateId,
        item,
        groupId,
    };
}

export function failKanbanAction() {
    return {
        type: "KANBAN/FETCH_FAIL" as const,
    };
}

export type KanbanAction =
    | ReturnType<typeof setKanbanInfo>
    | ReturnType<typeof setKanbanMember>
    | ReturnType<typeof setKanbanGroup>
    | ReturnType<typeof addKanbanItem>
    | ReturnType<typeof failKanbanAction>;
