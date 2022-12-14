import { AppDispatch } from "../../store";
import { addKanbanItem, failKanbanAction, setKanbanInfo } from "./action";
import { Status } from "./state";

export function getKanbanItems(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/${projectId}`
        );
        const result: { projectInfo: Status[]; success: boolean } =
            await res.json();

        console.log(result);
        if (result.success) {
            dispatch(setKanbanInfo(result.projectInfo));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban info fail");
        }
    };
}

export function postItem(itemName: string, date: string, member: string[], projectId: number) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/kanban/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId,
                itemName,
                date,
                member,
            }),
        });
        const result = await res.json();

        if (result.success) {
            dispatch(addKanbanItem(result.));
        } else {
            dispatch(failKanbanAction());
            console.log("Post Kanban item fail");
        }
    };
}
