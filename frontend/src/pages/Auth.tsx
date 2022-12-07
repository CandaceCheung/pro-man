import { createStyles } from '@mantine/core';
import React from 'react';
import { Logo } from '../components/Logo';
import { loginThunk } from '../redux/auth/thunk';
import { useAppDispatch, useAppSelector } from '../store';

const useStyles = createStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: theme.colors.lightViolet,
        padding: 15,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))

export function Auth() {
    const user = useAppSelector(state => state.auth.username);
    const dispatch = useAppDispatch();
    const {classes} = useStyles();

    const login = (event: any) => {
        event.preventDefault();
        dispatch(loginThunk(event.target.username.value, event.target.password.value));
    }

    return (
        <div className={classes.wrapper}>
            {user.length > 0 && <div>Hi {user}!</div>}
            <div className={classes.header}>
                <Logo size={50}/>
            </div>
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