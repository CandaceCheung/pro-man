import { AppDispatch } from "../../store";
import { failKanbanAction, setKanbanInfo } from "./action";
import { Status } from "./state";

export function getKanbanItems(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/${projectId}`
        );
        const result:{projectInfo: Status[], success: boolean} = await res.json();

        console.log(result)
        if (result.success) {
            dispatch(setKanbanInfo(result.projectInfo));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban info fail");
        }
    };
}

export function postItem() {
    return async (dispatch: AppDispatch) => {

    };
}
