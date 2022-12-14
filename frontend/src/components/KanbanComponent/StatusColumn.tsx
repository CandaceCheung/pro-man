import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
    Card,
    Group,
    Modal,
    ScrollArea,
    Text,
    ThemeIcon,
    UnstyledButton,
    createStyles,
    Input,
} from "@mantine/core";
import { IconCalendarEvent, IconGripVertical, IconPlus, IconUser } from "@tabler/icons";
import { useState } from "react";
import { Status } from "../../redux/kanban/state";
import { ItemCard } from "./ItemCard";

type StatusProps = Status; //state

const useStyles = createStyles((theme, color: string) => ({
    cardHeader: {
        align: "center",
        cursor: "grab",
        backgroundColor: color,
        borderRadius: 5,

        "&": {
            ".grip": {
                opacity: 0,
                transition: "opacity",
            },
        },

        "&:hover": {
            ".grip": {
                opacity: 1,
            },
        },

        ".headerText": {
            fontSize: 18,
        },
    },
}));

export function StatusColumn(props: StatusProps) {
    const [opened, setOpened] = useState(false);
    const { classes, theme } = useStyles(props.color);

    const handleDnd = (event: DragEndEvent) => {
        const { active, over } = event;
    };

    return (
        <DndContext onDragEnd={handleDnd}>
            <Card
                shadow="md"
                pt={1}
                pb={10}
                pr={6}
                pl={6}
                radius="md"
                withBorder
                mt={15}
                mr={6}
                w={290}
            >
                <div className={classes.cardHeader}>
                    <Group position="left" pt={10} pb={10} m={5}>
                        <IconGripVertical className="grip" size={20} />
                        <Text weight={570} className="headerText">
                            {props.name} / {props.name.length}
                        </Text>
                    </Group>
                </div>

                <ScrollArea
                    style={{ height: 750 }}
                    type="auto"
                    scrollbarSize={6}
                >
                    <div>
                        {props.itemsList.map((item) => (
                            <ItemCard
                                id={item.id}
                                name={item.name}
                                date={item.date}
                                membersList={item.membersList}
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
                        size="sm"
                    >
                        <Group position="left" m={6}>
                            <Group>
                                <Text>People</Text>
                                <Input variant="filled" icon={<IconUser size={16} />} ></Input>
                            </Group>
                            <Group>
                                <Text>Date</Text>
                                <Input variant="filled" icon={<IconCalendarEvent size={16} />} ></Input>
                            </Group>
                            
                        </Group>
                    </Modal>
                </>
            </Card>
        </DndContext>
    );
}
