import { Dispatch } from "@reduxjs/toolkit";
import { showNotification } from '@mantine/notifications';
import { acceptInviteAction, deleteInvitationAction, getInvitationListAction, sendInviteAction } from "./slice";

export function sendInvitation(projectId: number, userId: number, value: string) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId,
                userId,
                email: value,
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(sendInviteAction(result.invitation))
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        }
    };
}

export function acceptInvitation(token: string, userId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/response/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId,
                token,
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(acceptInviteAction(result.invitation))
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        }
    };
}

export function getInvitationList(projectId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/${projectId}`,

        );
        const result = await res.json();

        if (result.success) {
            dispatch(getInvitationListAction(result.invitationList))
            console.log(result.msg)
        } else {
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        }
    };
}

export function deleteInvitation(invitationId: number, projectId: number) {
    return async (dispatch: Dispatch) => {

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/${projectId}&${invitationId}`, {
            method: "DELETE",
        });
        const result = await res.json();

        if (result.success) {
            dispatch(deleteInvitationAction({id :invitationId}))
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        }
    };
}


