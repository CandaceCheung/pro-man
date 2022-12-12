import { Card, Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { stringify } from "querystring";
import ProjectNavbar from "../ProjectNavbar";
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
    const itemList = [
        { itemName: "item name", memberName: "user 2", itemDate: "12/12/2022" },
    ];

    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            mt={15}
            mr={6}
            maw={320}
            mah={750}
        >
            <Group position="center" mb={6}>
                <Text weight={500}>
                    {props.statesName} / {props.itemList.length}
                </Text>
            </Group>

            <div>
                {itemList.map((status) => (
                    <ItemCard itemName={status.itemName} memberName={status.memberName} itemDate={status.itemDate} />
                ))}
            </div>

            <UnstyledButton>
                <Group position="left" m="sm" mb={5}>
                    <ThemeIcon variant="light" radius="xl" color="gray">
                        <IconPlus />
                    </ThemeIcon>
                    <Text color="dimmed">Add Item</Text>
                </Group>
            </UnstyledButton>

        </Card>
    );
}
