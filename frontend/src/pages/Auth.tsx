import React from 'react';
import { loginThunk } from '../redux/auth/thunk';
import { useAppDispatch, useAppSelector } from '../store';

export function Auth() {
    const user = useAppSelector(state => state.auth.username);
    const dispatch = useAppDispatch();

    const login = (event: any) => {
        event.preventDefault();
        dispatch(loginThunk(event.target.username.value, event.target.password.value));
    }

    return (
        <div>
            {user.length > 0 && <div>Hi {user}!</div>}
            <form onSubmit={login}>
                <label htmlFor="username">Username</label>
                <input name="username" id="username"></input>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password"></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}