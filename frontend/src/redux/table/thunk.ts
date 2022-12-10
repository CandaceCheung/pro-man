import { Dispatch } from "@reduxjs/toolkit";
import { setActiveProjectAction } from "../project/slice";
import { getTableFailedAction, getTableAction } from "./slice";

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

// export function updateTimelineItem(timelineID: number, startTime: number, endTime: number) {
// 	return async (dispatch: Dispatch) => {

// 		const res = await fetch(
// 			`${process.env.REACT_APP_API_SERVER}/table/updateTimeline`
// 		);
// 		const result = await res.json();

// 		if (result.success) {
// 			console.log("Passed")
		
//             dispatch(getTableAction(result.table))
// 		} else {
// 			dispatch(getTableFailedAction())
// 		}
// 	};
// }