import { Button, createStyles, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { signUpThunk } from "../../redux/auth/thunk";
import { useAppDispatch } from "../../store";

const useStyles = createStyles(() => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        marginTop: 20
    }
}));

export function Signup() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | undefined>();

    const { classes } = useStyles();

    const signUp = () => {
        if (confirmPassword === password) {
            if (password.length) {
                dispatch(signUpThunk(username, password));
            } else {
                setError("Please enter password.");
            }
        } else {
            setError("Passwords do not match.");
        }
    }

    const handleInputKeyDown = (key: string) => {
        if (key === "Enter") {
            signUp();
        }
    }

    return (
        <div className={classes.wrapper}>
            <TextInput
                label="Username"
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'input']}
                onChange={(e) => { setUsername(e.target.value) }}
                onKeyDown={(e) => handleInputKeyDown(e.key)}
            />
            <TextInput
                label="Password"
                type='password'
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'input']}
                onChange={(e) => { setPassword(e.target.value) }}
                onKeyDown={(e) => handleInputKeyDown(e.key)}
            />
            <TextInput
                label="Confirm Password"
                error={error}
                type='password'
                placeholder="Custom layout"
                inputWrapperOrder={['label', 'error', 'input']}
                onChange={(e) => { setConfirmPassword(e.target.value) }}
                onKeyDown={(e) => handleInputKeyDown(e.key)}
            />
            <Button
                onClick={signUp}
                className={classes.signUpButton}
            >
                Sign Up
            </Button>
        </div>
    )
}