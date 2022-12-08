import { Dispatch } from "@reduxjs/toolkit";
import { getTableFailedAction, getTableAction } from "./slice";

export function getTable(userID: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/${userID}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Passed")
			console.log (result.table)
            dispatch(getTableAction(result.table))
		} else {
			dispatch(getTableFailedAction())
		}
	};
}