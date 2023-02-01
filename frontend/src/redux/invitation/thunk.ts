import { Dispatch } from '@reduxjs/toolkit';
import { showNotification } from '@mantine/notifications';
import { acceptInviteAction, deleteInvitationAction, getInvitationListAction, Invitation, sendInviteAction, InvitationState } from './slice';
import { getTableListAction, MyTable } from '../table/slice';
import { MakeRequest } from '../../utils/requestUtils';

const makeRequest = (token: string) => new MakeRequest(token);

export function sendInvitation(projectId: number, userId: number, value: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).post<
            {
                projectId: number;
                userId: number;
                email: string;
            },
            {
                success?: boolean;
                invitation?: Invitation;
                msg: string;
            }
        >(`/invitation`, {
            projectId,
            userId,
            email: value
        });

        if (result.success) {
            dispatch(sendInviteAction(result.invitation!));
        }

        showNotification({
            title: 'Invitation notification',
            message: result.msg
        });
    };
}

export function acceptInvitation(tokenInput: string, userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).put<
            {
                userId: number;
                tokenInput: string;
            },
            {
                success?: boolean;
                invitation?: Invitation;
                tableList?: MyTable[];
                msg: string;
            }
        >(`/invitation/response`, {
            userId,
            tokenInput
        });

        if (result.success) {
            dispatch(acceptInviteAction(result.invitation!));
            dispatch(getTableListAction(result.tableList!));
        }

        showNotification({
            title: 'Invitation notification',
            message: result.msg
        });
    };
}

export function acceptMemberInvitation(projectId: number, userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).post<
            {
                userId: number;
                projectId: number;
            },
            {
                success?: boolean;
                tableList?: MyTable[];
                msg: string;
            }
        >(`/member/invitation`, {
            userId,
            projectId
        });

        if (result.success) {
            dispatch(getTableListAction(result.tableList!));
        }

        showNotification({
            title: 'Invitation notification',
            message: result.msg
        });
    };
}

export function getInvitationList(projectId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).get<{
            success?: boolean;
            invitationList?: InvitationState;
            msg?: string;
        }>(`/invitation/${projectId}`);

        if (result.success) {
            dispatch(getInvitationListAction(result.invitationList!));
        } else {
            showNotification({
                title: 'Invitation notification',
                message: result.msg
            });
        }
    };
}

export function deleteInvitation(invitationId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).delete<
            {
                invitationId: number;
            },
            {
                success?: boolean;
                msg: string;
            }
        >(`/invitation`, {
            invitationId
        });

        if (result.success) {
            dispatch(deleteInvitationAction({ id: invitationId }));
        }

        showNotification({
            title: 'Invitation notification',
            message: result.msg
        });
    };
}
