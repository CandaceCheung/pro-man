import { Dispatch } from "@reduxjs/toolkit";
import { setActiveProjectAction, setProjectNameAction } from "../project/slice";
import { getTableFailedAction, getTableAction, updateTimelineItemAction, updateDatelineItemAction, getFavoriteAction, updateItemGroupNameAction, getTableListAction, addProjectAction, getStatusListAction, addStatusAction } from "./slice";
import { showNotification } from '@mantine/notifications';
import { AppDispatch } from "../../store";
import { setActiveProject } from "../project/thunk";

export function likeProject (projectId: number, userId: number) {
	return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/favorite`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				projectId,
				userId
			})
		});
		const result = await res.json();

		if (result.success) {
			dispatch(getFavoriteAction(result.favorite))
			showNotification({
				title: 'Like Project notification',
				message: result.msg
			});
		} else {
			dispatch(getTableFailedAction())
			showNotification({
				title: 'Like Project notification',
				message: result.msg
			});
		}
	};
}

export function getTable(userID: number, projectID: number) {
	return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/${userID}&${projectID}`,{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(getTableAction(result.table));

		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function getTableList(userId: number) {
	return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/list/${userId}`,{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const result = await res.json();

		if (result.success) {
			dispatch(getTableListAction(result.list))
			dispatch(setActiveProjectAction(result.list[0].project_id));
			dispatch(setProjectNameAction(result.list[0].project_name));
		} else {
			dispatch(getTableFailedAction())
		}
	};
}


export function updateTimelineItem(timelineID: number, startTime: number, endTime: number, name: string, color: string) {
	return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");
		
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/updateTimeline`, {
				method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
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
			dispatch(updateTimelineItemAction({ timelineID, startTime, endTime, name, color, typeId: result.typeId }))
			showNotification({
				title: 'Data update notification',
				message: result.msg
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateDatelineItem(datelineID: number, date: number, name: string, color: string) {
	return async (dispatch: Dispatch) => {
		const token = localStorage.getItem("token");
		
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/updateDateline`, {
				method: "PUT",
				headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
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
			dispatch(updateDatelineItemAction({ datelineID, date, name, color, typeId: result.typeId }))
			showNotification({
				title: 'Data update notification',
				message: result.msg
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function getProjectStatusList(projectId: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/status/${projectId}`
		);
		const result = await res.json();

		if (result.success) {
			dispatch(getStatusListAction(result.statusList));
		} else {
			showNotification({
				title: 'Data retrieve notification',
				message: "Failed to get status list! 🤥"
			});
		}
	};
}

export function updateItemGroupName(itemGroupId: number, itemGroupName: string, userId: number, projectID: number) {
	return async (dispatch: AppDispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/itemGroupName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				itemGroupId,
				itemGroupName
			})
		});
		let result = await res.json();

		if (result.success) {
			dispatch(updateItemGroupNameAction({ itemGroupId, itemGroupName }));
		} else {
			showNotification({
				title: 'Data update notification',
				message: 'Failed to update group item name! 🤥'
			});
			dispatch(getTable(userId, projectID));
		}
	};
}

export function getFavorite(userId: number) {
	return async (dispatch: Dispatch) => {
        const token = localStorage.getItem("token");

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/favorite/${userId}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Request Passed")
			dispatch(getFavoriteAction(result.favorite))
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function insertItem(projectId: number, userId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/item`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
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
				message: 'Failed to add new item! 🤥'
			});
		}
	}
}

export function insertItemGroup(projectId: number, userId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/itemGroup`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
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
	}
}

export function reorderItems(newOrder: number[], userId: number, projectID: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/itemsOrder`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
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
	}
}

export function reorderTypes(newOrder: number[], userId: number, projectID: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/typesOrder`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
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
	}
}

export function insertNewProject(userId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newProject`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
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
			dispatch(addProjectAction({
				creator_id: userId,
				project_id: projectId,
				member_table_id: memberTableId,
				username: username,
				project_name: projectName,
			}));
		} else {
			showNotification({
				title: 'Insert data notification',
				message: 'Failed to insert new project! 🤥'
			});
		}
	}
}

export function renameItem(itemId: number, name: string, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newItemName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, name })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Update data notification',
				message: 'Failed to rename item! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function renameType(typeId: number, name: string, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newTypeName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ typeId, name })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Update data notification',
				message: 'Failed to rename type! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function updateText(itemId: number, text: string, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newText`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, text })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Update data notification',
				message: 'Failed to update text! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function newState(projectId: number, name: string, color: string) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newState`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ projectId, name, color })
		});
		const result = await res.json();
		if (result.success) {
			dispatch(addStatusAction({
				id: result.id,
				name,
				color
			}));
		} else {
			showNotification({
				title: 'Add state notification',
				message: 'Failed to add state! 🤥'
			});
		}
	}
}

export function updateState(itemId: number, stateId: number, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/state`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, stateId })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Update state notification',
				message: 'Failed to update state! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function addPerson(itemId: number, personId: number, userId: number, projectId: number, typeId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/person`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, personId, typeId })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Add person notification',
				message: 'Failed to add person! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function addTransaction(itemId: number, date: string, cashFlow: number, updateState: (transactionId: number) => void) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/transaction`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, date, cashFlow })
		});
		const result = await res.json();
		if (result.success) {
			updateState(result.transactionId);
		} else {
			showNotification({
				title: 'Add transaction notification',
				message: 'Failed to add transaction! 🤥'
			});
		}
	}
}

export function removePerson(itemId: number, personId: number, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/person`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, personId })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Delete person notification',
				message: 'Failed to delete person! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}

export function removeTransaction(itemId: number, transactionId: number, userId: number, projectId: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/transaction`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ itemId, transactionId })
		});
		const result = await res.json();
		if (!result.success) {
			showNotification({
				title: 'Delete transaction notification',
				message: 'Failed to delete transaction! 🤥'
			});
			dispatch(getTable(userId, projectId));
		}
	}
}