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
    resetItemGroupInputValueAction
} from './slice';
import { showNotification } from '@mantine/notifications';
import { AppDispatch } from '../../store';
import { setActiveProject } from '../project/thunk';
import { MakeRequest } from '../../utils';
import { format } from 'date-fns';

export function likeProject(projectId: number, userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/favorite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                projectId,
                userId
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getFavoriteAction(result.favorite));
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

export function getTable(userID: number, projectID: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/v2/${userID}&${projectID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getTableAction(result.table));
            dispatch(setItemCellsAction(result.itemCells));
            dispatch(setItemGroupsAction(result.itemGroups));
            dispatch(setItemsOrdersAction(result.itemsOrders));
            dispatch(setTypesOrdersAction(result.typesOrders));
            dispatch(setMemberListAction(result.memberList));
            dispatch(setItemGroupsCollapsedAction(result.itemGroups.length));
            dispatch(setItemGroupsInputActiveAction(result.itemGroups.length));
            dispatch(setItemGroupsInputValueAction(result.itemGroups));
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

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/list/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getTableListAction(result.list));
            dispatch(setActiveProjectAction(result.list[0].project_id));
            dispatch(setProjectNameAction(result.list[0].project_name));
        } else {
            showNotification({
                title: 'Project List notification',
                message: 'Fail to obtain projct list information'
            });
        }
    };
}

export function updateTimelineItem(timelineID: number, startTime: number, endTime: number, name: string, color: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/updateTimeline`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                typeTimeId: timelineID,
                startTime,
                endTime,
                name,
                color
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(
                updateTimelineItemAction({
                    timelineID,
                    startTime,
                    endTime,
                    name,
                    color,
                    typeId: result.typeId
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

export function updateDatelineItem(datelineID: number, date: number, name: string, color: string) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/updateDateline`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                typeDateId: datelineID,
                date,
                name,
                color
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(
                updateDatelineItemAction({
                    datelineID,
                    date,
                    name,
                    color,
                    typeId: result.typeId
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/status/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getStatusListAction(result.statusList));
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/itemGroupName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                itemGroupId,
                itemGroupName
            })
        });
        let result = await res.json();
        // If not successful, revert the frontend
        if (!result.success) {
            showNotification({
                title: 'Data update notification',
                message: 'Failed to update group item name! 🤥'
            });
            dispatch(resetItemGroupInputValueAction({index, originalValue}));
        }
    };
}

export function getFavorite(userId: number) {
    return async (dispatch: Dispatch) => {
        const token = localStorage.getItem('token');

        const makeRequest = new MakeRequest(token!);

        const result = await makeRequest.get<{
            success: Boolean;
            favorite: MyFavoriteListState;
        }>(`/table/favorite/${userId}`);

        // const res = await fetch(
        // 	`${process.env.REACT_APP_API_SERVER}/table/favorite/${userId}`,
        // 	{
        // 		headers: {
        // 			Authorization: `Bearer ${token}`,
        // 		},
        // 	}
        // );
        // const result = await res.json();

        if (result.success) {
            dispatch(getFavoriteAction(result.favorite));
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                projectId,
                userId,
                itemGroupId,
                itemName
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getTable(userId, projectId));
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/itemGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                projectId,
                userId
            })
        });
        const result = await res.json();

        if (result.success) {
            dispatch(getTable(userId, projectId));
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

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/itemsOrder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                newOrder
            })
        });
        let result = await res.json();

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

        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/typesOrder`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                newOrder
            })
        });
        let result = await res.json();

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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/newProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId })
        });
        const result = await res.json();
        if (result.success) {
            const projectId = result.project_id;
            const projectName = result.project_name;
            const memberTableId = result.member_table_id;
            const username = result.username;
            dispatch(setActiveProject(projectId, projectName));
            dispatch(
                addProjectAction({
                    creator_id: userId,
                    project_id: projectId,
                    member_table_id: memberTableId,
                    username: username,
                    project_name: projectName
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/newItemName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, name })
        });
        const result = await res.json();
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

export function renameType(typeId: number, name: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/newTypeName`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ typeId, name })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(updateTypeNameAction({ typeId, name }));
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/newText`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, text })
        });
        const result = await res.json();
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/newState`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ projectId, name, color })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(
                addStatusAction({
                    id: result.id,
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
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/table/state`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ itemId, stateId })
        });
        const result = await res.json();
        if (result.success) {
            const name = result.name;
            const color = result.color;
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
