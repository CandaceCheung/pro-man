import { Dispatch } from "@reduxjs/toolkit";
import { setActiveProjectAction } from "./slice";

export function setActiveProject (projectId: number) {
	return async (dispatch: Dispatch) => {
        dispatch(setActiveProjectAction(projectId))
	};
}