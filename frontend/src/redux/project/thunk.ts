import { Dispatch } from "@reduxjs/toolkit";
import { clearActiveProjectAction, setActiveProjectAction } from "./slice";

export function setActiveProject (projectId: number) {
	return async (dispatch: Dispatch) => {
        dispatch(setActiveProjectAction(projectId))
		// in case needed to save state to db
	};
}

export function clearActiveProject() {
	return async (dispatch: Dispatch) => {
        dispatch(clearActiveProjectAction())
		// in case needed to remove state to db
	};
}