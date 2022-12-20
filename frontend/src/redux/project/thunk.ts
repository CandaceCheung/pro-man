import { showNotification } from "@mantine/notifications";
import { showNotification } from "@mantine/notifications";
import { Dispatch } from "@reduxjs/toolkit";
import { checkUsernameAction, clearActiveProjectAction, sendMessageAction, setActiveProjectAction, setMessageTargetAction, setProjectNameAction } from "./slice";

export function setActiveProject (projectId: number, projectName: string) {
	return async (dispatch: Dispatch) => {
        dispatch(setActiveProjectAction(projectId))
        dispatch(setProjectNameAction(projectName))
		// in case needed to save state to db
	};
}

export function clearActiveProject() {
	return async (dispatch: Dispatch) => {
        dispatch(clearActiveProjectAction())
		// in case needed to remove state to db
	};
}

export function renameProject (projectId: number, projectName: string) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newProjectName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId,
				projectName
			})
		});
		const result = await res.json();
		if (result.success) {
			dispatch(setProjectNameAction(projectName));
		} else {
			showNotification({
				title: 'Rename Project notification',
				message: 'Failed to rename project! 🤥'
			});
		}
	};
}

export function checkUsername(value: string) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/username`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(checkUsernameAction(true))
			dispatch(setMessageTargetAction(result.username.id))
			showNotification({
				title: 'Username Format Notification',
				message: result.msg
			});
        } else {
            dispatch(checkUsernameAction(false))
			showNotification({
				title: 'Username Format Notification',
				message: result.msg
			});
        }
    };
}

export function sendMessage(userId:number, targetUserId: number, text: string) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/message/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				userId,
                targetUserId,
				text
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(sendMessageAction(result))
			showNotification({
				title: 'Message Notification',
				message: result.msg
			});
        } else {
			showNotification({
				title: 'Message Notification',
				message: result.msg
			});
        }
    };
}