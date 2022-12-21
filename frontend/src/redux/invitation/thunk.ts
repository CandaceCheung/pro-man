import { Dispatch } from "@reduxjs/toolkit";
import { showNotification } from '@mantine/notifications';
import { acceptInviteAction, deleteInvitationAction, getInvitationListAction, sendInviteAction } from "./slice";
import { getTableListAction } from "../table/slice";

export function sendInvitation(projectId: number, userId: number, value: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
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
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/response/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                token,
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(acceptInviteAction(result.invitation))
            dispatch(getTableListAction(result.tableList))
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

export function acceptMemberInvitation(projectId: number, userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/member/invitation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId,
                projectId,
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getTableListAction(result.tableList))
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
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
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
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/invitation/${projectId}&${invitationId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
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


