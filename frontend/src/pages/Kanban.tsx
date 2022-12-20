import { DndContext, DragEndEvent, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Group } from "@mantine/core";
import { StatusColumn } from "../components/KanbanComponent/StatusColumn";
import { SmartPointerSensor } from "../pointerSensor";
import { Status } from "../redux/kanban/state";
import { putOrder } from "../redux/kanban/thunk";
import { useAppDispatch, useAppSelector } from "../store";

export type kanbanState = Status;

export function Kanban() {
    const dispatch = useAppDispatch();
    const statusList = useAppSelector((state) => state.kanban.statusList);

    const sensors = useSensors(useSensor(SmartPointerSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = statusList.findIndex(
                (status) => status.id === active.id
            );
            const newIndex = statusList.findIndex(
                (status) => status.id === over?.id
            );
            if (oldIndex >= 0 && newIndex >= 0) {
                const newArr = arrayMove(statusList, oldIndex, newIndex);
                dispatch(putOrder(newArr))
            }
        }
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={statusList.map((status) => status.id)}>
                <div className="kanban-table">
                    <Group position="left">
                        {statusList.map((status) => (
                            <StatusColumn
                                key={status.id}
                                id={status.id}
                                name={status.name}
                                color={status.color}
                                order={status.order}
                                itemsList={status.itemsList}
                            />
                        ))}
                    </Group>
                </div>
            </SortableContext>
        </DndContext>
    );
}
