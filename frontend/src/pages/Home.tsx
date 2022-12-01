import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../redux/auth/thunk';
import { AppDispatch, useAppSelector } from '../store';

export function Home() {
    const user = useAppSelector(state => state.auth.username);
    const dispatch = useDispatch<AppDispatch>();

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