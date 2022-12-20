import { AppDispatch } from "../../store";
import {
    addKanbanItem,
    failKanbanAction,
    setKanbanGroup,
    setKanbanInfo,
    setKanbanMember,
} from "./action";
import { Status } from "./state";

export function getKanbanItems(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/${projectId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
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

export function getMember(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/member/${projectId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const result: { memberList: []; success: boolean } = await res.json();
        console.log(result);

        if (result.success) {
            dispatch(setKanbanMember(result.memberList));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban member list info fail");
        }
    };
}

export function getGroup(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/group/${projectId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        const result: { groupList: []; success: boolean } = await res.json();
        console.log(result);

        if (result.success) {
            dispatch(setKanbanGroup(result.groupList));
        } else {
            dispatch(failKanbanAction());
            console.log("Get Kanban group list info fail");
        }
    };
}

export function postItem(
    projectId: number,
    stateId: number,
    itemName: string,
    memberName: string[],
    memberId: string[],
    date: Date,
    groupId: number
) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/addItem`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    projectId,
                    stateId,
                    itemName,
                    memberId,
                    date,
                    groupId,
                }),
            }
        );
        const result = await res.json();

        if (result.success) {
            dispatch(
                addKanbanItem(
                    projectId,
                    stateId,
                    result.itemId,
                    itemName,
                    memberName,
                    date,
                    groupId
                )
            );
        } else {
            dispatch(failKanbanAction());
            console.log("Post Kanban item fail");
        }
    };
}

export function putOrder(statusList: Status[]) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/order`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    order: statusList.map((status) => status.id),
                }),
            }
        );
        const result = await res.json();

        if (result.success) {
            dispatch(setKanbanInfo(statusList));
        } else {
            dispatch(failKanbanAction());
            console.log("Put Kanban order fail");
        }
    };
}
