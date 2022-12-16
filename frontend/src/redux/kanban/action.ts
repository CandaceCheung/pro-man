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
    userId: number,
    itemName: string,
    memberId: number,
    date: string,
    groupId: string
) {
    return {
        type: "KANBAN/ADD" as const,
        projectId,
        stateId,
        userId,
        itemName,
        memberId,
        date,
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
