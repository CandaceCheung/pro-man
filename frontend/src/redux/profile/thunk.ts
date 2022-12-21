import { AppDispatch } from "../../store";
import { setInfoAction, updateInfoAction } from "./slice";

export function getProfile(userId: number) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/profile/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const result = await res.json();
        console.log(result);

        if (result.success) {
            dispatch(setInfoAction(result.data));
        } else {
            console.log("Get profile info fail");
        };
    };
}

export function putProfileInfo(firstName: string, lastName: string, password: string) {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `${process.env.REACT_APP_API_SERVER}/profile/update`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    password
                }),
            }
        );
        const result = await res.json();
        
        if (result.success) {
            dispatch(updateInfoAction(result));
        } else {
            console.log("Update Profile info fail");
        };
    };
}
