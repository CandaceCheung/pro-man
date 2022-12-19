import { DndContext, useSensor, useSensors } from "@dnd-kit/core";
import { Group } from "@mantine/core";
import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { SmartPointerSensor } from "../pointerSensor";
import { Status } from "../redux/kanban/state";
import { useAppSelector } from "../store";

export type kanbanState = Status

export function Kanban() {
    const statusList = useAppSelector((state) => state.kanban.statusList);

    const sensors = useSensors(
        useSensor(SmartPointerSensor)
    );
    
    const handleDragEndColumn = (event: any, statusId: Status["id"]) => {
        const { active, over } = event;
        if(active.id !== over.id && statusId){
            // const oldIndex = active.statusId;
            // const newIndex = over.statusId;
            // const nextItemOrder = 
        }
    };

    return (
        <DndContext sensors={sensors} >
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
        </DndContext>
    );
}
