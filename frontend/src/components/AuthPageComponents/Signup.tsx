import { Button, createStyles, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { signUpThunk } from "../../redux/auth/thunk";
import { useAppDispatch } from "../../store";

const useStyles = createStyles(theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
}));

export function Signup() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | undefined>();

    const { classes } = useStyles();

    const login = () => {
        if (confirmPassword === password) {
            dispatch(signUpThunk(username, password));
        } else {
            setError("Passwords do not match.")
        }
    }

    return (
        <div className={classes.wrapper}>
            <TextInput
                label="Username"
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'input']}
                onChange={(e) => { setUsername(e.target.value) }}
            />
            <TextInput
                label="Password"
                type='password'
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'input']}
                onChange={(e) => { setPassword(e.target.value) }}
            />
            <TextInput
                label="Confirm Password"
                error={error}
                type='password'
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'error', 'input']}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
            <Button
                onClick={login}
            >
                Sign Up
            </Button>
        </div>
    )
}