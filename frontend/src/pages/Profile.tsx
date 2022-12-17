import { Button, Group, Input, Text } from "@mantine/core";
import { IconAt, IconKey, IconUserCircle } from "@tabler/icons";
import React from "react";

export function Profile() {
    return (
        <div>
            <Group position="center">
                <IconUserCircle size={100} />
            </Group>
            <Text>User Name</Text>
            <Group>
                <Text>Email:</Text>
                <Input icon={<IconAt size={16} />}></Input>
            </Group>
            <Group>
                <Text>Password</Text>
                <Input icon={<IconKey size={16} />}></Input>
            </Group>
            <Button color="cyan" mt={5}>
                Update
            </Button>
        </div>
    );
}
