import { showNotification } from '@mantine/notifications';
import { Dispatch } from '@reduxjs/toolkit';
import { MakeRequest } from '../../utils/requestUtils';
import { renameProjectInTableListAction } from '../table/slice';
import {
    changeAvatarAction,
    checkUsernameAction,
    clearActiveProjectAction,
    deleteMemberAction,
    getMemberListAction,
    getMessagesAction,
    MessageState,
    MyMemberState,
    sendMessageAction,
    setActiveProjectAction,
    setMessageTargetAction,
    setProjectNameAction,
    toggleDeleteAction,
    toggleReadAction,
    toggleReceiverDeleteAction
} from './slice';

const token = localStorage.getItem('token');
const makeRequest = new MakeRequest(token!);

export function setActiveProject(projectId: number, projectName: string) {
    return async (dispatch: Dispatch) => {
        dispatch(setActiveProjectAction(projectId));
        dispatch(setProjectNameAction(projectName));
        // in case needed to save state to db
    };
}

export function clearActiveProject() {
    return async (dispatch: Dispatch) => {
        dispatch(clearActiveProjectAction());
        // in case needed to remove state to db
    };
}

export function renameProject(projectId: number, projectName: string) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.put<
            {
                projectId: number;
                projectName: string;
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/newProjectName`, {
            projectId,
            projectName
        });

        if (result.success) {
            dispatch(setProjectNameAction(projectName));
            dispatch(
                renameProjectInTableListAction({
                    projectId,
                    projectName
                })
            );
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
        const result = await makeRequest.post<
            {
                value: string;
            },
            {
                success?: boolean;
                userId?: number;
                msg: string;
            }
        >(`/invitation/username`, {
            value
        });

        if (result.success) {
            dispatch(checkUsernameAction(true));
            dispatch(setMessageTargetAction(result.userId!));
            showNotification({
                title: 'Username Format Notification',
                message: result.msg
            });
        } else {
            dispatch(checkUsernameAction(false));
            showNotification({
                title: 'Username Format Notification',
                message: result.msg
            });
        }
    };
}

export function sendMessage(sender: string, senderId: number, receiver: string, receiverId: number, text: string, messageType: 'invite' | 'message') {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.post<
            {
                sender: string;
                senderId: number;
                receiver: string;
                receiverId: number;
                text: string;
                messageType: 'invite' | 'message';
            },
            {
                success?: boolean;
                message?: MessageState;
                msg: string;
            }
        >(`/notification`, {
            sender,
            senderId,
            receiver,
            receiverId,
            text,
            messageType
        });

        if (result.success) {
            dispatch(sendMessageAction(result.message!));
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
        const result = await makeRequest.get<{
            success?: boolean;
            message?: MessageState[];
            msg?: string;
        }>(`/notification/${userId}`);

        if (result.success) {
            dispatch(getMessagesAction(result.message!));
        } else {
            showNotification({
                title: 'Message Box Notification',
                message: result.msg
            });
        }
    };
}

export function getMemberList(userId: number) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.get<{
            success?: boolean;
            memberList?: MyMemberState[];
            msg: string;
        }>(`/member/${userId}`);

        if (result.success) {
            dispatch(getMemberListAction(result.memberList!));
        } else {
            showNotification({
                title: 'Member List Notification',
                message: result.msg
            });
        }
    };
}

export function deleteMember(membershipId: number) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.delete<
            {
                membershipId: number;
            },
            {
                success?: boolean;
                projectId?: number;
                msg: string;
            }
        >(`/member`, {
            membershipId
        });

        if (result.success) {
            dispatch(
                deleteMemberAction({
                    membershipId,
                    projectId: result.projectId!
                })
            );
            showNotification({
                title: 'Member Notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Member Notification',
                message: result.msg
            });
        }
    };
}

export function changeAvatar(membershipIds: number[], avatar: number) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.put<
            {
                membershipIds: number[];
                avatar: number;
            },
            {
                success?: boolean;
                msg: string;
            }
        >(`/member/avatar`, {
            membershipIds,
            avatar
        });

        if (result.success) {
            dispatch(changeAvatarAction({ membershipIds, avatar }));
        } else {
            showNotification({
                title: 'Member List Notification',
                message: result.msg
            });
        }
    };
}

export function toggleRead(notificationId: number, checked: boolean) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.put<
            {
                notificationId: number;
                checked: boolean;
            },
            {
                success?: boolean;
                checkStatus?: boolean;
                msg: string;
            }
        >(`/notification`, {
            notificationId,
            checked
        });

        if (result.success) {
            dispatch(toggleReadAction({ notificationId, checkStatus: result.checkStatus! }));
        }

        showNotification({
            title: 'Message Notification',
            message: result.msg
        });
    };
}

export function toggleDelete(notificationId: number) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.delete<
            {
                notificationId: number;
            },
            {
                success?: boolean;
                isDeleted?: boolean;
                msg: string;
            }
        >(`/notification`, {
            notificationId
        });

        if (result.success) {
            dispatch(
                toggleDeleteAction({
                    notificationId,
                    isDeleted: result.isDeleted!
                })
            );
        }

        showNotification({
            title: 'Message Notification',
            message: result.msg
        });
    };
}
export function toggleReceiverDelete(notificationId: number) {
    return async (dispatch: Dispatch) => {
        const result = await makeRequest.delete<
            {
                notificationId: number;
            },
            {
                success?: boolean;
                isDeletedByReceiver?: boolean;
                msg: string;
            }
        >(`/notification/receiver`, {
            notificationId
        });

        if (result.success) {
            dispatch(
                toggleReceiverDeleteAction({
                    notificationId,
                    isDeletedByReceiver: result.isDeletedByReceiver!
                })
            );
        }

        showNotification({
            title: 'Message Notification',
            message: result.msg
        });
    };
}
