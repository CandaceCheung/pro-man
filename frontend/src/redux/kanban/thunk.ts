import { AppDispatch } from "../../store";
import { addKanbanItem, failKanbanAction, setKanbanInfo, setKanbanMember } from "./action";
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
};

export function getMember(projectId : number) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/member/${projectId}`
        );

        const result: {memberList:[]; success: boolean } =
        await res.json();
        console.log(result);

        if (result.success) {
            dispatch(setKanbanMember(result.memberList));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban member list info fail");
        }
    };
};

export function getGroup(projectId : number) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/group/${projectId}`
        );
        const result: {groupList:[]; success: boolean } =
        await res.json();
        console.log(result);

        if (result.success) {
            dispatch(setKanbanMember(result.groupList));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban group list info fail");
        }

    }
}

export function postItem(projectId: number, itemName: string, member: string[], date: string, group: number ) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/kanban/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                projectId,
                itemName,
                member,
                date,
                group,
            }),
        });
        const result = await res.json();

        if (result.success) {
            // dispatch(addKanbanItem(result.state.id,result.state.item));
        } else {
            dispatch(failKanbanAction());
            console.log("Post Kanban item fail");
        }
    };
}
