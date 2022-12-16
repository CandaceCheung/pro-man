import React, {  useState } from 'react';
import { createStyles } from '@mantine/core';
import { Logo } from '../components/Logo';
import SwitchSelector from "react-switch-selector";
import { Signup } from '../components/AuthPageComponents/Signup';
import { Login } from '../components/AuthPageComponents/Login';

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
        margin: "20px 0",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export function Auth() {
    const [value, setValue] = useState("login");
    const { classes, theme } = useStyles();

    const toggleOptions = [
        {
            label: "Login",
            value: "login",
            selectedBackgroundColor: theme.white
        },
        {
            label: "Sign up",
            value: "signup",
            selectedBackgroundColor: theme.white
        }
    ];

    const onChange = (newValue: any) => {
        setValue(newValue);
    };

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
                    fontSize={15}
                    optionBorderRadius={20}
                />
            </div>
            {
                value === "signup"
                ? <Signup/>
                : <Login/>
            }
        </div>
    )
}