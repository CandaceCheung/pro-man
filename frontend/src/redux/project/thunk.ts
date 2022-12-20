import { showNotification } from "@mantine/notifications";
import { Dispatch } from "@reduxjs/toolkit";
import { clearActiveProjectAction, setActiveProjectAction, setProjectNameAction } from "./slice";

export function setActiveProject (projectId: number, projectName: string) {
	return async (dispatch: Dispatch) => {
        dispatch(setActiveProjectAction(projectId))
        dispatch(setProjectNameAction(projectName))
		// in case needed to save state to db
	};
}

export function clearActiveProject() {
	return async (dispatch: Dispatch) => {
        dispatch(clearActiveProjectAction())
		// in case needed to remove state to db
	};
}

export function renameProject (projectId: number, projectName: string) {
	return async (dispatch: Dispatch) => {
		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/newProjectName`, {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId,
				projectName
			})
		});
		const result = await res.json();
		if (result.success) {
			dispatch(setProjectNameAction(projectName));
		} else {
			showNotification({
				title: 'Rename Project notification',
				message: 'Failed to rename project! 🤥'
			});
		}
	};
}