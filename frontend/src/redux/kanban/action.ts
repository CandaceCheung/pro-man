import { Status } from "./state";

export function setKanbanInfo(statusList: Status[]){
    return {
        type: "KANBAN/SET" as const,
        statusList,
    };
}

export function addKanbanItem() {
    return {
        type: "KANBAN/ADD" as const,
    };
}

export function failKanbanAction() {
    return {
        type: "KANBAN/FETCH_FAIL" as const
    };
}

export type KanbanAction =
    | ReturnType<typeof setKanbanInfo>
    | ReturnType<typeof addKanbanItem>
    | ReturnType<typeof failKanbanAction>;
