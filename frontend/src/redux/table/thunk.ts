import { Dispatch } from "@reduxjs/toolkit";
import { setActiveProjectAction } from "../project/slice";
import { getTableFailedAction, getTableAction, updateTimelineItemAction, updateDatelineItemAction, getFavoriteAction, updateItemGroupNameAction, updateItemGroupNameFailedAction } from "./slice";
import { showNotification } from '@mantine/notifications';

export function getTable(userID: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/${userID}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Passed")
			dispatch(getTableAction(result.table));
			dispatch(setActiveProjectAction(result.table[0].project_id));
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateTimelineItem(timelineID: number, startTime: number, endTime: number) {
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
				endTime
			})
		});
		const result = await res.json();

		if (result.success) {
			dispatch(updateTimelineItemAction({ timelineID, startTime, endTime }))
			showNotification({
				title: 'Data update notification',
				message: 'Update Success'
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateDatelineItem(datelineID: number, date: number) {
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
			})
		});
		const result = await res.json();

		if (result.success) {
			dispatch(updateDatelineItemAction({ datelineID, date }))
			showNotification({
				title: 'Data update notification',
				message: 'Update Success'
			});
		} else {
			dispatch(getTableFailedAction())
		}
	};
}

export function updateItemGroupName(itemGroupId: number, itemGroupName: string) {
	return async (dispatch: Dispatch) => {

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
		const result = await res.json();

		if (result.success) {
			dispatch(updateItemGroupNameAction({ itemGroupId, itemGroupName }));
		} else {
			showNotification({
				title: 'Data update notification',
				message: 'Failed to update group item name! 🤥'
			});
			dispatch(updateItemGroupNameFailedAction());
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

export function reorderItems(newOrder: number[], userId: number) {
	return async (dispatch: Dispatch) => {
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

		result = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/${userId}`
		);
		const tableResult = await result.json();
		tableResult.success && dispatch(getTableAction(tableResult.table));
		
	}
}