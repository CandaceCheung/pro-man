import { Dispatch } from "@reduxjs/toolkit";
import { getTypesFailedAction, getTypesAction } from "./slice";

export function getTypes(userID: number) {
	return async (dispatch: Dispatch) => {

		const res = await fetch(
			`${process.env.REACT_APP_API_SERVER}/table/types/${userID}`
		);
		const result = await res.json();

		if (result.success) {
			console.log("Passed")
            dispatch(getTypesAction(result.types))
		} else {
			dispatch(getTypesFailedAction())
		}
	};
}