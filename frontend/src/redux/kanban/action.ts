import { Status } from "./state";

export function KanbanShowInfo(statusList: Status[]){
    return {
        type: "KANBAN/SET" as const,
        statusList,
    };
}

export function KanbanAddItem() {
    return {
        type: "KANBAN/ADD" as const,
    };
}

export type KanbanAction =
    | ReturnType<typeof KanbanShowInfo>
    | ReturnType<typeof KanbanAddItem>;
