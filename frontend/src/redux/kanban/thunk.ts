import { AppDispatch } from '../../store';
import { MakeRequest } from '../../utils/requestUtils';
import { addKanbanItem, setKanbanGroup, setKanbanInfo, setKanbanMember } from './action';
import { Group, Member, Status } from './state';

const makeRequest = (token: string) => new MakeRequest(token);

export function getKanbanItems(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).get<{
            projectInfo?: Status[];
            success?: boolean;
            msg?: string;
        }>(`/kanban/${projectId}`);

        if (result.success) {
            dispatch(setKanbanInfo(result.projectInfo!));
        } else {
            console.log('Get Kanban info fail');
        }
    };
}

export function getMember(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).get<{
            memberList?: Member[];
            success?: boolean;
            msg?: string;
        }>(`/kanban/member/${projectId}`);

        if (result.success) {
            dispatch(setKanbanMember(result.memberList!));
        } else {
            console.log('Get Kanban member list info fail');
        }
    };
}

export function getGroup(projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).get<{
            groupList?: Group[];
            success?: boolean;
            msg?: string;
        }>(`/kanban/group/${projectId}`);

        if (result.success) {
            dispatch(setKanbanGroup(result.groupList!));
        } else {
            console.log('Get Kanban group list info fail');
        }
    };
}

export function postItem(projectId: number, stateId: number, userId: number, itemName: string, memberName: string[], memberId: string[], date: Date, groupId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).post<
            {
                projectId: number;
                stateId: number;
                userId: number;
                itemName: string;
                memberName: string[];
                memberId: string[];
                date: Date;
                groupId: number;
            },
            {
                success?: boolean;
                itemId?: number;
                msg?: string;
            }
        >(`/kanban/addItem`, {
            projectId,
            stateId,
            userId,
            itemName,
            memberName,
            memberId,
            date,
            groupId
        });

        if (result.success) {
            dispatch(addKanbanItem(projectId, stateId, result.itemId!, itemName, memberName, date, groupId));
        } else {
            console.log('Post Kanban item fail');
        }
    };
}

export function putOrder(statusList: Status[]) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const result = await makeRequest(token!).put<
            {
                order: number[];
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/kanban/order`, {
            order: statusList.map((status) => status.id)
        });

        if (result.success) {
            dispatch(setKanbanInfo(statusList));
        } else {
            console.log('Put Kanban order fail');
        }
    };
}
