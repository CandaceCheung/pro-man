import { ThemeIcon } from "@mantine/core";
import { IconCalendar, IconCalendarStats, IconUserCircle } from "@tabler/icons";

type itemCardProps = {
    itemName: string;
    memberName: string;
    itemDate: string;
};
export function ItemCard(props: itemCardProps) {
    return (
        <div className="item-card">
            <div>{props.itemName}</div>
            <div className="person-name">
                <ThemeIcon radius="lg" size="sm" variant="outline" color="gray">
                    <IconUserCircle />
                </ThemeIcon>
                Person
                <div>{props.memberName}</div>
            </div>
            <div className="item-date">
                <ThemeIcon radius="lg" size="sm" variant="outline" color="gray">
                    <IconCalendarStats />
                </ThemeIcon>
                Date
                <div>{props.itemDate}</div>
            </div>
        </div>
    );
}
