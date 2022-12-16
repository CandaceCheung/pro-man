import { Card, Text, Group, ThemeIcon } from "@mantine/core";
import { IconCalendarStats, IconUserCircle } from "@tabler/icons";
import { Item } from "../../redux/kanban/state";

export type itemCardProps = Item

export function ItemCard(props: itemCardProps) {
    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            sx={{ maxWidth: 300 }}
            mx="auto"
            mb={10}
            w={250}
        >
            <div className="item-card">
                <Text weight={550} mb={10}>
                    {props.name}
                </Text>
                <div className="person-name">
                    <Group position="left">
                        <ThemeIcon
                            radius="lg"
                            size="sm"
                            variant="outline"
                            color="gray"
                        >
                            <IconUserCircle />
                        </ThemeIcon>
                        <Text weight={500} color="dimmed">
                            Person
                        </Text>
                        <div>{props.membersList}</div> 
                    </Group>
                </div>
                <div className="item-date">
                    <Group position="left">
                        <ThemeIcon
                            radius="lg"
                            size="sm"
                            variant="outline"
                            color="gray"
                        >
                            <IconCalendarStats />
                        </ThemeIcon>
                        <Text weight={500} color="dimmed">
                            Date
                        </Text>
                        <div>{props.date}</div>
                    </Group>
                </div>
            </div>
        </Card>
    );
}
