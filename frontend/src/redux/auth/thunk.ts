import { Dispatch } from "@reduxjs/toolkit";
import { failedLoginAction, loginAction } from "./action";

const { REACT_APP_API_SERVER } = process.env;

export function loginThunk(username: string, password: string) {
    return async (dispatch: Dispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(loginAction(username));
            console.log(`${username} has logged in.`);
        } else {
            dispatch(failedLoginAction());
        }
    }
}