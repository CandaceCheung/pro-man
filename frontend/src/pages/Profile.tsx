import { Button, createStyles, Group, Input, PasswordInput, Text } from '@mantine/core';
import { IconKey, IconUserCircle } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { ProfileText } from '../components/ProfileText';
import { getProfile, putProfileInfo } from '../redux/profile/thunk';
import { useAppDispatch, useAppSelector } from '../store';

const useStyles = createStyles((theme) => ({
    profileTable: {
        backgroundColor: theme.colors.lightViolet,
        height: 520,

        '> .username': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 25,
            color: 'statusLabelsColor',
            margin: 15,
        },

        profileInfo: {
            Group: {
                display: 'flex',
                justifyContent: 'center',
            },
        },
    },

    profileText: {
        minWidth: 80,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
    },
}));

export function Profile() {
    const dispatch = useAppDispatch();
    const { classes } = useStyles();
    const userId = useAppSelector((state) => state.auth.userId);
    const username = useAppSelector((state) => state.profile.username);
    const firstName = useAppSelector((state) => state.profile.firstName);
    const lastName = useAppSelector((state) => state.profile.lastName);

    useEffect(() => {
        userId && dispatch(getProfile(userId));
    }, [userId, dispatch]);

    const [password, setPassword] = useState('');
    const updateInfo = () => {
        dispatch(putProfileInfo({ password }));
    };

    return (
        <div>
            <Group position='center' mb={20}>
                <IconUserCircle stroke-width={1.0} size={150} />
            </Group>
            <div className={classes.profileTable}>
                <div className='username'>
                    <Text>{username}</Text>
                </div>
                <div className='profileInfo'>
                    <Group position='center' m={10}>
                        <Text className={classes.profileText}>First Name:</Text>
                        <ProfileText
                            text={firstName}
                            onTextChange={(textInput) => {
                                dispatch(putProfileInfo({ firstName: textInput }));
                            }}
                        ></ProfileText>
                    </Group>
                    <Group position='center' m={10}>
                        <Text className={classes.profileText}> Last Name:</Text>
                        <ProfileText
                            text={lastName}
                            onTextChange={(textInput) => {
                                dispatch(putProfileInfo({ lastName: textInput }));
                            }}
                        ></ProfileText>
                    </Group>
                    <Group position='center' m={10}>
                        <Text className={classes.profileText}> New Password:</Text>
                        <PasswordInput
                            placeholder='Password'
                            description='Password must include at least one letter, number and special character'
                            withAsterisk
                            icon={<IconKey size={16} />}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <Button color='cyan' mt={17} maw={180} onClick={updateInfo}>
                            Update Password
                        </Button>
                    </Group>
                </div>
            </div>
        </div>
    );
}
