import { Dispatch } from "@reduxjs/toolkit";

export function getItems(projectId:number) {

    return async (dispatch: Dispatch) => {
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/kanban/${projectId}`
        );

        const result = await res.json();

        // if (result,success) {
        //     console.log("RequestPassed")
        //     dispatch(get)
        // }
    }
}



export function postItem() {
    return async(dispatch: Dispatch) => {

    }
}