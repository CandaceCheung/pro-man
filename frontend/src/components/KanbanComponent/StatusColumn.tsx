import {
    Card,
    Group,
    Modal,
    ScrollArea,
    Text,
    ThemeIcon,
    UnstyledButton,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useAppSelector } from "../../store";
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
    const [opened, setOpened] = useState(false);

    const projectSummary = useAppSelector((state) => state.table);
    const targetProjectId = useAppSelector((state) => state.project.project_id);
    const allItemsInfo = projectSummary.filter(
        (project) =>
            project.project_id === targetProjectId &&
            project.type_name === "status"
    );
    const itemsUnderSameState = allItemsInfo.filter(
        (item) => item.item_status_name === props.statesName
    );
    // const itemNames = itemsUnderSameState.map((item) => item.item_name);
    // const eachItemName = itemNames.filter((item, i) => itemNames.indexOf(item) === i);
    // const allCreator = allItemsInfo.map((item) => item.item_person_name)

    // const itemCreator = allCreator.map
    console.log(itemsUnderSameState);

    const itemList = [];
    for (let item of itemsUnderSameState) {
        const obj = {
            itemName: item.item_name,
            memberName: "user1",
            itemDate: "12/12/2022",
        };

        itemList.push(obj);
    }

    // const itemList = [
    //     { itemName: "card item", memberName: "user 12", itemDate: "12/12/2022" },
    // ];

    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            mt={15}
            mr={6}
            maw={320}
        >
            <Group position="center" mb={6}>
                {/* <Card.Section >{props.color}</Card.Section> */}
                <Text weight={500}>
                    {props.statesName} / {props.itemList.length}
                </Text>
            </Group>

            <ScrollArea style={{ height: 750 }} type="auto" scrollbarSize={6}>
                <div>
                    {itemList.map((status) => (
                        <ItemCard
                            itemName={status.itemName}
                            memberName={status.memberName}
                            itemDate={status.itemDate}
                        />
                    ))}
                </div>
            </ScrollArea>

            <UnstyledButton onClick={() => setOpened(true)}>
                <Group position="left" m="sm" mb={5}>
                    <ThemeIcon variant="light" radius="xl" color="gray">
                        <IconPlus />
                    </ThemeIcon>
                    <Text color="dimmed">Add Item</Text>
                </Group>
            </UnstyledButton>

            <>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Item"
                    size={600}
                >
                    <Group position="center" mb={6}></Group>
                </Modal>
            </>
        </Card>
    );
}
