/* eslint-disable */
import { Card, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { randomFill } from "crypto";
import { ItemCard } from "./ItemCard";

export type Item = {
    itemId: string;
    people: string;
    name: string;
};

type StatusProps = {
    projectId: number;
    statesName: string;
    itemList: Item[];
    color: string;
};

export function StatusColumn(props: StatusProps) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder m={15}>
            <Group >
                <Text weight={500}>
                    {props.statesName} / {props.itemList.length}
                </Text>
            </Group>

            <div>
                {<ItemCard itemName={""} memberName={""} itemDate={""} />}
            </div>
            <UnstyledButton>
                <Group position="left" m="xs" mb="xs">
                    <ThemeIcon variant="light" radius="xl" color="gray">
                        <IconPlus />
                    </ThemeIcon>
                    <Text color="dimmed">Add Item</Text>
                </Group>
            </UnstyledButton>
        </Card>
    );
}
