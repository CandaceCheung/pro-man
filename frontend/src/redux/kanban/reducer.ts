import { KanbanAction } from "./action";
import { KanbanState } from "./state";
import produce from "immer";

const initState: KanbanState = {
    statusList: [],
};

export const kanbanReducer = (
    state: KanbanState = initState,
    action: KanbanAction
): KanbanState => {
    switch (action.type) {
        case "KANBAN/SET":
            return {
                ...state,
                statusList: action.statusList,
            };

        case "KANBAN/ADD":
            //immer applied
            const newStatus = produce(state, (draft) => {
                const targetStatus = draft.statusList.find((status) => {
                    if (action.statusId === status.id) {
                        return true;
                    }
                });
                targetStatus?.itemsList.push(action.item);
            });
            return newStatus;

        case "KANBAN/FETCH_FAIL":
            console.error("Failed");
            return state;


        default:
            return state;
    }
};
