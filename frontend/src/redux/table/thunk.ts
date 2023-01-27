import { Dispatch } from '@reduxjs/toolkit';
import { setActiveProjectAction, setProjectNameAction } from '../project/slice';
import {
    getTableAction,
    updateTimelineItemAction,
    updateDatelineItemAction,
    getFavoriteAction,
    updateItemGroupNameAction,
    getTableListAction,
    addProjectAction,
    getStatusListAction,
    addStatusAction,
    MyFavoriteListState,
    setItemCellsAction,
    setItemGroupsAction,
    updateItemNameAction,
    updateTypeNameAction,
    updateTextAction,
    updateStateAction,
    removePersonAction,
    addPersonAction,
    addTransactionAction,
    removeTransactionAction,
    setItemsOrdersAction,
    setTypesOrdersAction,
    reorderItemsAction,
    reorderTypesAction,
    deleteItemAction,
    deleteGroupAction,
    setMemberListAction,
    setItemGroupsCollapsedAction,
    setItemGroupsInputActiveAction,
    setItemGroupsInputValueAction,
    resetItemGroupInputValueAction,
    setNewItemsInputActiveAction,
    setNewItemsInputValueAction,
    insertItemAction,
    setDeleteGroupModalOpenedAction,
    insertItemGroupAction,
    ItemCells,
    ItemGroup,
    ItemsOrders,
    TypesOrders,
    TableMembers,
    TableStateArray
} from './slice';
import { showNotification } from '@mantine/notifications';
import { AppDispatch } from '../../store';
import { setActiveProject } from '../project/thunk';
import { MakeRequest } from '../../utils/requestUtils';
import { format } from 'date-fns';

export function likeProject(projectId: number, userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                projectId: number;
                userId: number;
            },
            {
                success?: boolean;
                favorite?: Array<{
                    creatorId: number,
                    userId: number,
                    projectId: number,
                    projectName: string,
                    favoriteId: number
                }>
                msg: string;
            }
        >(`/table/favorite`, {
            projectId,
            userId
        });

        if (result.success) {
            dispatch(getFavoriteAction(result.favorite!));
            showNotification({
                title: 'Like Project notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Like Project notification',
                message: result.msg
            });
        }
    };
}

export function getTable(userId: number, projectId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.get<{
            success?: boolean;
            table?: TableStateArray;
            msg?: string;
        }>(`/table/${userId}&${projectId}`);

        if (result.success) {
            dispatch(getTableAction(result.table!));
        } else {
            showNotification({
                title: 'Project Table notification',
                message: 'Fail to obtain table information'
            });
        }
    };
}

export function getTableV2(userId: number, projectId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.get<{
            success?: boolean;
            itemCells?: ItemCells;
            itemGroups?: ItemGroup[];
            itemsOrders?: ItemsOrders;
            typesOrders?: TypesOrders;
            memberList?: TableMembers;
            msg?: string;
        }>(`/table/v2/${userId}&${projectId}`);

        if (result.success) {
            dispatch(setItemCellsAction(result.itemCells!));
            dispatch(setItemGroupsAction(result.itemGroups!));
            dispatch(setItemsOrdersAction(result.itemsOrders!));
            dispatch(setTypesOrdersAction(result.typesOrders!));
            dispatch(setMemberListAction(result.memberList!));
            dispatch(setItemGroupsCollapsedAction(result.itemGroups!.length));
            dispatch(setItemGroupsInputActiveAction(result.itemGroups!.length));
            dispatch(setItemGroupsInputValueAction(result.itemGroups!));
            dispatch(setNewItemsInputActiveAction(result.itemGroups!.length));
            dispatch(setNewItemsInputValueAction(result.itemGroups!.length));
            dispatch(setDeleteGroupModalOpenedAction(result.itemGroups!));
        } else {
            showNotification({
                title: 'Project Table notification',
                message: 'Fail to obtain table information'
            });
        }
    };
}

export function getTableList(userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.get<{
            success?: boolean;
            list?: Array<{
                creatorId: number;
                projectId: number;
                projectName: string;
                memberTableId: number;
                username: string;
            }>;
            msg?: string;
        }>(`/table/list/${userId}`);

        if (result.success) {
            dispatch(getTableListAction(result.list!));
            dispatch(setActiveProjectAction(result.list![0].projectId));
            dispatch(setProjectNameAction(result.list![0].projectName));
        } else {
            showNotification({
                title: 'Project List notification',
                message: 'Fail to obtain projct list information'
            });
        }
    };
}

export function updateTimelineItem(timelineId: number, startTime: number, endTime: number, name: string, color: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                typeTimeId: number;
                startTime: number;
                endTime: number;
                name: string;
                color: string;
            },
            {
                success?: boolean;
                typeId?: number;
                msg: string;
            }
        >(`/table/updateTimeline`, {
            typeTimeId: timelineId,
            startTime,
            endTime,
            name,
            color
        });

        if (result.success) {
            dispatch(
                updateTimelineItemAction({
                    timelineId,
                    startTime,
                    endTime,
                    name,
                    color,
                    typeId: result.typeId!
                })
            );
            showNotification({
                title: 'Data update notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Data update notification',
                message: 'Fail to update timeline information'
            });
        }
    };
}

export function updateDatelineItem(datelineId: number, date: number, name: string, color: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                typeDateId: number;
                date: number;
                name: string;
                color: string;
            },
            {
                success?: boolean;
                typeId?: number;
                msg: string;
            }
        >(`/table/updateDateline`, {
            typeDateId: datelineId,
            date,
            name,
            color
        });

        if (result.success) {
            dispatch(
                updateDatelineItemAction({
                    datelineId,
                    date,
                    name,
                    color,
                    typeId: result.typeId!
                })
            );
            showNotification({
                title: 'Data update notification',
                message: result.msg
            });
        } else {
            showNotification({
                title: 'Data update notification',
                message: 'Fail to update dateline information'
            });
        }
    };
}

export function getProjectStatusList(projectId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.get<{
            success?: boolean;
            statusList?: Array<{
                id: number;
                name: string;
                color: string;
            }>;
            msg?: string;
        }>(`/table/status/${projectId}`);

        if (result.success) {
            dispatch(getStatusListAction(result.statusList!));
        } else {
            showNotification({
                title: 'Data retrieve notification',
                message: 'Failed to get status list! 🤥'
            });
        }
    };
}

export function updateItemGroupName(itemGroupId: number, itemGroupName: string, index: number, originalValue: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        // Update frontend first to improve user experience
        dispatch(updateItemGroupNameAction({ itemGroupId, itemGroupName }));

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                itemGroupId: number;
                itemGroupName: string;
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/itemGroupName`, {
            itemGroupId,
            itemGroupName
        });

        // If not successful, revert the frontend
        if (!result.success) {
            showNotification({
                title: 'Data update notification',
                message: 'Failed to update group item name! 🤥'
            });
            dispatch(resetItemGroupInputValueAction({ index, originalValue }));
        }
    };
}

export function getFavorite(userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);

        const result = await makeRequest.get<{
            success?: boolean;
            favorite?: MyFavoriteListState;
            msg?: string;
        }>(`/table/favorite/${userId}`);

        if (result.success) {
            dispatch(getFavoriteAction(result.favorite!));
        } else {
            showNotification({
                title: 'Favorite projects notification',
                message: 'Fail to obtain favorite project list'
            });
        }
    };
}

export function insertItem(projectId: number, userId: number, itemGroupId?: number, itemName?: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.post<
            {
                projectId: number;
                userId: number;
                itemGroupId?: number;
                itemName?: string;
            },
            {
                success?: boolean;
                itemCells?: ItemCells;
                msg?: string;
            }
        >(`/table/item`, {
            projectId,
            userId,
            itemGroupId,
            itemName
        });

        if (result.success) {
            dispatch(insertItemAction(result.itemCells!));
        } else {
            showNotification({
                title: 'Insert data notification',
                message: 'Failed to add new item! 🤥'
            });
        }
    };
}

export function insertItemGroup(projectId: number, userId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.post<
            {
                projectId: number;
                userId: number;
            },
            {
                success?: boolean;
				itemCells?: ItemCells;
				itemGroupId?: number;
				itemGroupName?: string;
				typeIds?: number[];
                msg?: string;
            }
        >(`/table/itemGroup`, {
            projectId,
            userId
        });

        if (result.success) {
            dispatch(
                insertItemGroupAction({
                    itemGroupId: result.itemGroupId!,
                    itemGroupName: result.itemGroupName!,
                    typeIds: result.typeIds!
                })
            );
            dispatch(insertItemAction(result.itemCells!));
        } else {
            showNotification({
                title: 'Insert data notification',
                message: 'Failed to add new group item! 🤥'
            });
        }
    };
}

export function reorderItems(newOrder: number[], groupId: number, userId: number, projectID: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        dispatch(reorderItemsAction({ newOrder, groupId }));

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                newOrder: number[]
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/itemsOrder`, {
            newOrder
        });

        if (!result.success) {
            showNotification({
                title: 'Insert data notification',
                message: 'Failed to reorder items! 🤥'
            });
            dispatch(getTable(userId, projectID));
        }
    };
}

export function reorderTypes(newOrder: number[], groupId: number, userId: number, projectID: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        dispatch(reorderTypesAction({ newOrder, groupId }));

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                newOrder: number[];
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/typesOrder`, {
            newOrder
        });

        if (!result.success) {
            showNotification({
                title: 'Insert data notification',
                message: 'Failed to reorder types! 🤥'
            });
            dispatch(getTable(userId, projectID));
        }
    };
}

export function insertNewProject(userId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.post<
            {
                userId: number;
            },
            {
                success?: boolean;
                projectId?: number;
				projectName?: string;
				memberTableId?: number;
                username?: string;
                msg?: string;
            }
        >(`/table/newProject`, {
            userId
        });

        if (result.success) {
            const projectId = result.projectId!;
            const projectName = result.projectName!;
            const memberTableId = result.memberTableId!;
            const username = result.username!;
            dispatch(setActiveProject(projectId, projectName));
            dispatch(
                addProjectAction({
                    creatorId: userId,
                    projectId: projectId,
                    memberTableId: memberTableId,
                    username: username,
                    projectName: projectName
                })
            );
        } else {
            showNotification({
                title: 'Insert data notification',
                message: 'Failed to insert new project! 🤥'
            });
        }
    };
}

export function renameItem(groupId: number, itemId: number, name: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                itemId: number;
                name: string;
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/newItemName`, {
            itemId, name
        });

        if (result.success) {
            dispatch(updateItemNameAction({ groupId, itemId, name }));
        } else {
            showNotification({
                title: 'Update data notification',
                message: 'Failed to rename item! 🤥'
            });
        }
    };
}

export function renameType(groupId: number, typeId: number, name: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                typeId: number;
                name: string;
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/newTypeName`, {
            typeId, name
        });

        if (result.success) {
            dispatch(updateTypeNameAction({ groupId, typeId, name }));
        } else {
            showNotification({
                title: 'Update data notification',
                message: 'Failed to rename type! 🤥'
            });
        }
    };
}

export function updateText(groupId: number, itemId: number, typeId: number, text: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                itemId: number;
                text: string;
            },
            {
                success?: boolean;
                msg?: string;
            }
        >(`/table/newText`, {
            itemId, text
        });

        if (result.success) {
            dispatch(updateTextAction({ groupId, itemId, typeId, text }));
        } else {
            showNotification({
                title: 'Update data notification',
                message: 'Failed to update text! 🤥'
            });
        }
    };
}

export function newState(projectId: number, name: string, color: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.post<
            {
                projectId: number;
                name: string;
                color: string;
            },
            {
                success?: boolean;
                id?: number;
                msg?: string;
            }
        >(`/table/newState`, {
            projectId, name, color
        });

        if (result.success) {
            dispatch(
                addStatusAction({
                    id: result.id!,
                    name,
                    color
                })
            );
        } else {
            showNotification({
                title: 'Add state notification',
                message: 'Failed to add state! 🤥'
            });
        }
    };
}

export function updateState(groupId: number, itemId: number, stateId: number, typeId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);
        const result = await makeRequest.put<
            {
                itemId: number;
                stateId: number;
            },
            {
                success?: boolean;
                name?: string;
                color?: string;
                msg?: string;
            }
        >(`/table/state`, {
            itemId, stateId
        });

        if (result.success) {
            const name = result.name!;
            const color = result.color!;
            dispatch(updateStateAction({ groupId, itemId, typeId, name, color }));
        } else {
            showNotification({
                title: 'Update state notification',
                message: 'Failed to update state! 🤥'
            });
        }
    };
}

export function addPerson(groupId: number, itemId: number, typeId: number, personId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/person`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, personId, typeId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(addPersonAction({ groupId, itemId, typeId, personId }));
        } else {
            showNotification({
                title: 'Add person notification',
                message: 'Failed to add person! 🤥'
            });
        }
    };
}

export function addTransaction(groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/transaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, date: format(date, 'yyyy-MM-dd'), cashFlow })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(addTransactionAction({ groupId, itemId, typeId, transactionId: result.transactionId, date, cashFlow }));
        } else {
            showNotification({
                title: 'Add transaction notification',
                message: 'Failed to add transaction! 🤥'
            });
        }
    };
}

export function removePerson(groupId: number, itemId: number, typeId: number, personId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/person`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, personId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(removePersonAction({ groupId, itemId, typeId, personId }));
        } else {
            showNotification({
                title: 'Delete person notification',
                message: 'Failed to delete person! 🤥'
            });
        }
    };
}

export function removeTransaction(groupId: number, itemId: number, typeId: number, transactionId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/transaction`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, transactionId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(removeTransactionAction({ groupId, itemId, typeId, transactionId }));
        } else {
            showNotification({
                title: 'Delete transaction notification',
                message: 'Failed to delete transaction! 🤥'
            });
        }
    };
}

export function deleteItem(groupId: number, itemId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/item`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, groupId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(deleteItemAction({ groupId, itemId }));
            showNotification({
                title: 'Delete item notification',
                message: 'Successfully deleted item! 😎'
            });
        } else {
            showNotification({
                title: 'Delete item notification',
                message: 'Failed to delete item! 🤥'
            });
        }
    };
}

export function deleteItemGroup(groupId: number, projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/itemGroup`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ groupId, projectId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(deleteGroupAction({ groupId }));
            showNotification({
                title: 'Delete item notification',
                message: 'Successfully deleted item group! 😎'
            });
        } else {
            showNotification({
                title: 'Delete item notification',
                message: 'Failed to delete item group! 🤥'
            });
        }
    };
}
export function deleteProject(userId: number, projectId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/project`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ projectId, userId })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(getTableList(userId));
            showNotification({
                title: 'Delete project notification',
                message: 'Successfully deleted project! 😎'
            });
        } else {
            showNotification({
                title: 'Delete project notification',
                message: 'Failed to delete project! 🤥'
            });
        }
    };
}
