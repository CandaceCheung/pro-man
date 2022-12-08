import { Button, createStyles, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { loginThunk } from "../../redux/auth/thunk";
import { useAppDispatch } from "../../store";

const useStyles = createStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export function Login() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { classes } = useStyles();

    const login = () => {
        dispatch(loginThunk(username, password));
    }

    return (
        <div className={classes.wrapper}>
            <TextInput
                label="Username"
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <TextInput
                label="Password"
                type='password'
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'error', 'input', 'description']}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <Button
                onClick={login}
            >
                Login
            </Button>
        </div>
    )
}