import React from 'react';
import { createStyles } from '@mantine/core';
import { Logo } from '../components/Logo';
import { loginThunk } from '../redux/auth/thunk';
import { useAppDispatch, useAppSelector } from '../store';
import SwitchSelector from "react-switch-selector";
import { useSelector } from 'react-redux';

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
        alignItems: 'center',
        fontFamily: 'Lalezar'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40
    },
    logoChild: {
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggle: {
        width: 250,
        height: 40,
        fontFamily: "Lalezar",
        margin: "30px 0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

export function Auth() {
    const user = useAppSelector(state => state.auth.username);
    const dispatch = useAppDispatch();
    const { classes, theme } = useStyles();

    const toggleOptions = [
        {
            label: "Foo",
            value: "foo",
            selectedBackgroundColor: theme.white
        },
        {
            label: "Bar",
            value: "bar",
            selectedBackgroundColor: theme.white
        }
    ];

    const onChange = (newValue: any) => {
        console.log(newValue);
    };


    const login = (event: any) => {
        event.preventDefault();
        dispatch(loginThunk(event.target.username.value, event.target.password.value));
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.logo}>
                    <div className={classes.logoChild}>
                        <Logo size={50} />
                    </div>
                    <div className={classes.logoChild}>
                        Proman
                    </div>
                </div>
            </div>
            <div className={classes.toggle}>
                <SwitchSelector
                    onChange={onChange}
                    options={toggleOptions}
                    initialSelectedIndex={0}
                    backgroundColor={theme.colors.normalViolet[0]}
                    fontColor={theme.white}
                    selectedFontColor={theme.black}
                    fontSize={20}
                />
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