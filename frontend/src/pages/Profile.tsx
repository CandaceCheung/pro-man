import {
    Button,
    createStyles,
    Group,
    Input,
    PasswordInput,
    Text,
} from "@mantine/core";
import { IconKey, IconSignature, IconUserCircle } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme) => ({
    profileTable: {
        backgroundColor: theme.colors.lightViolet,
        height: 520,

        "> .username": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 25,
            color: "statusLabelsColor",
            margin: 15,
        },

        profileInfo: {
            Group: {
                display: "flex",
                justifyContent: "center",
            },
        },
    },

    profileText: {
        minWidth: 80,
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
    },
}));

export function Profile() {
    const { classes } = useStyles();

    return (
        <div>
            <Group position="center" mb={20}>
                <IconUserCircle stroke-width={1.0} size={150} />
            </Group>
            <div className={classes.profileTable}>
                <div className="username">
                    <Text>User Name</Text>
                </div>
                <div className="profileInfo">
                    <Group position="center" m={10}>
                        <Text className={classes.profileText}>First Name:</Text>
                        <Input icon={<IconSignature size={16} />}></Input>
                    </Group>
                    <Group position="center" m={10} >
                        <Text className={classes.profileText}> Last Name:</Text>
                        <Input icon={<IconSignature size={16} />} ></Input>
                    </Group>
                    <Group position="center" m={10}>
                    <Text className={classes.profileText}> Password:</Text>
                        <PasswordInput
                            placeholder="Password"
                            description="Password must include at least one letter, number and special character"
                            withAsterisk
                            icon={<IconKey size={16} />}
                        />
                    </Group>
                    <Group position="center">
                        <Button color="cyan" mt={10} maw={120}>
                            Update
                        </Button>
                    </Group>
                </div>
            </div>
        </div>
    );
}
