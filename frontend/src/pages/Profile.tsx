import { ClassNames } from "@emotion/react";
import {
    Button,
    Center,
    createStyles,
    Group,
    Input,
    Text,
} from "@mantine/core";
import { IconAt, IconKey, IconUserCircle } from "@tabler/icons";
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

    profileText:{
        minWidth: 80,
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",
    }
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
                    <Group>
                        <Text className={classes.profileText}>Email:</Text>
                        <Input icon={<IconAt size={16} />}></Input>
                    </Group>
                    <Group>
                        <Text className={classes.profileText}>Password:</Text>
                        <Input icon={<IconKey size={16} />}></Input>
                    </Group>
                    <Button color="cyan" mt={10} maw={100}>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
}
