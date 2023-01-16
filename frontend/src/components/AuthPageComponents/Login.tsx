import { Button, createStyles, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { loginThunk } from '../../redux/auth/thunk';
import { useAppDispatch } from '../../store';

const useStyles = createStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        marginTop: 20
    }
}));

export function Login() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { classes } = useStyles();

    const login = () => {
        dispatch(loginThunk(username, password));
    };

    const handleInputKeyDown = (key: string) => {
        if (key === 'Enter') {
            login();
        }
    };

    return (
        <div className={classes.wrapper}>
            <TextInput
                label='Username'
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                onKeyDown={(e) => handleInputKeyDown(e.key)}
            />
            <TextInput
                label='Password'
                type='password'
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                onKeyDown={(e) => handleInputKeyDown(e.key)}
            />
            <Button onClick={login} className={classes.loginButton}>
                Login
            </Button>
        </div>
    );
}
