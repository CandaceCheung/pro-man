import React from "react";
import { loginThunk } from "../../redux/auth/thunk";
import { useAppDispatch } from "../../store";

export function Login() {
    const dispatch = useAppDispatch();
    const login = (event: any) => {
        event.preventDefault();
        dispatch(loginThunk(event.target.username.value, event.target.password.value));
    }
    return (
        <form onSubmit={login}>
            Login
            <label htmlFor="username">Username</label>
            <input name="username" id="username"></input>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password"></input>
            <button type="submit">Login</button>
        </form>
    )
}