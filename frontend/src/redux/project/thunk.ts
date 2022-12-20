import { showNotification } from "@mantine/notifications";
import { Dispatch } from "@reduxjs/toolkit";
import { checkUsernameAction, clearActiveProjectAction, getMessagesAction, sendMessageAction, setActiveProjectAction, setMessageTargetAction, setProjectNameAction, toggleDeleteAction, toggleReadAction, toggleReceiverDeleteAction } from "./slice";

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

export function sendMessage(sender :string, senderId:number, receiver: string, receiverId: number, text: string) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/notification/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				sender,
				senderId,
				receiver,
                receiverId,
				text
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(sendMessageAction(result.message))
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

export function getMessages(userId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/notification/${userId}`, 
        );
        const result = await res.json();

        if (result.success) {
            dispatch(getMessagesAction(result.message))
        } else {
			showNotification({
				title: 'Message Box Notification',
				message: result.msg
			});
        }
    };
}

export function toggleRead(notificationId: number, checked: boolean) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/notification/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
				notificationId,
				checked,
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(toggleReadAction({notificationId, checked: result.check}))
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

export function toggleDelete(notificationId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/notification/${notificationId}`, {
            method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
            dispatch(toggleDeleteAction({notificationId, isDeleted: result.is_deleted }))
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
export function toggleReceiverDelete(notificationId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/notification/receiver/${notificationId}`, {
            method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
            dispatch(toggleReceiverDeleteAction({notificationId, isDeletedReceiver: result.is_deleted_receiver }))
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