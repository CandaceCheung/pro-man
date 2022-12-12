import { Card, Text, Group, ThemeIcon } from "@mantine/core";
import { IconCalendarStats, IconUserCircle } from "@tabler/icons";

export type itemCardProps = {
    itemName: string;
    memberName: string;
    itemDate: string;
};
export function ItemCard(props: itemCardProps) {
    return (
        <Card
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
            sx={{ maxWidth: 300 }}
            mx="auto"
        >
            <div className="item-card">
                <div>{props.itemName}</div>
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
                    </Group>
                    <div>{props.memberName}</div>
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
                        {props.itemDate}
                    </Group>
                </div>
            </div>
        </Card>
    );
}
