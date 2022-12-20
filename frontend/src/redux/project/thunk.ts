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