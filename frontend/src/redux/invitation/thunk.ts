import { Dispatch } from "@reduxjs/toolkit";
import { showNotification } from '@mantine/notifications';
import { acceptInviteAction, sendInviteAction } from "./slice";

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

export function acceptInvitation(token: string) {
    return async (dispatch: Dispatch) => {
        
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/response/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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


