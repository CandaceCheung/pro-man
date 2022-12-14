import { KanbanAction } from "./action";
import { KanbanState } from "./state";

const initState: KanbanState = {
    projectId: 0, 
    statusList: [], 
};

export const kanbanReducer = (state: KanbanState = initState, action: KanbanAction) : KanbanState => {
    switch (action.type) {
        case "KANBAN/SET":
            return {
               ...state,
               statusList: action.statusList
            }
          default: return state  
    }
}