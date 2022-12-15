import { Dispatch } from "@reduxjs/toolkit";
import { setActiveProjectAction } from "../project/slice";
import { getTableFailedAction, getTableAction, updateTimelineItemAction, updateDatelineItemAction, getFavoriteAction, updateItemGroupNameAction, updateItemGroupNameFailedAction, getTableListAction } from "./slice";
import { showNotification } from '@mantine/notifications';
import { AppDispatch } from "../../store";

export function getTable(userID: number, projectID: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/${userID}&${projectID}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Passed")
			dispatch(getTableAction(result.table));
			
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function getTableList(userId: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/list/${userId}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Request Passed")
			dispatch(getTableListAction(result.list))
			dispatch(setActiveProjectAction(result.list[0].project_id));
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateTimelineItem(timelineID: number, startTime: number, endTime: number, name: string, color: string) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/updateTimeline`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
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
			dispatch(updateTimelineItemAction({ timelineID, startTime, endTime, name, color, typeId: result.typeId}))
			showNotification({
				title: 'Data update notification',
				message: 'Update Success'
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateDatelineItem(datelineID: number, date: number, name: string, color :string) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/updateDateline`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
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
			dispatch(updateDatelineItemAction({ datelineID, date, name, color, typeId: result.typeId}))
			showNotification({
				title: 'Data update notification',
				message: 'Update Success'
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateItemGroupName(itemGroupId: number, itemGroupName: string, userId: number, projectID: number) {
	return async (dispatch: AppDispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/updateItemGroupName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
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
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/insertItem`, {
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
			const res = await fetch(
				`${process.env.REACT_APP_API_SERVER}/table/${userId}`
			);
			const tableResult = await res.json();
			tableResult.success && dispatch(getTableAction(tableResult.table));
		} else {
			showNotification({
				title: 'Insert data notification',
				message: 'Failed to add new item! 🤥'
			});
		}
	}
}

export function insertItemGroup(projectId: number, userId: number) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/insertItemGroup`, {
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
			const res = await fetch(
				`${process.env.REACT_APP_API_SERVER}/table/${userId}`
			);
			const tableResult = await res.json();
			tableResult.success && dispatch(getTableAction(tableResult.table));
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
			`${process.env.REACT_APP_API_SERVER}/table/reorderItems`, {
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
		}
		dispatch(getTable(userId, projectID));
	}
}

export function reorderTypes(newOrder: number[], userId: number, projectID: number) {
	return async (dispatch: AppDispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/reorderTypes`, {
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
		}
		dispatch(getTable(userId, projectID));
	}
}