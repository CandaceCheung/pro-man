import { Group } from "@mantine/core";
import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { useAppSelector } from "../store";

export function Kanban() {
    const statusList = useAppSelector((state) => state.kanban.statusList);

    return (
        <div className="kanban-table">
            <Group position="left">
                {statusList.map((status) => (
                    <StatusColumn
                        key={status.id}
                        id={status.id}
                        name={status.name}
                        color={status.color}
                        itemsList={status.itemsList}
                    />
                ))}
            </Group>
        </div>
    );
}
