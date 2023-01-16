import { DndContext, DragEndEvent, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Group, ScrollArea } from '@mantine/core';
import { useEffect } from 'react';
import { StatusColumn } from '../components/KanbanComponent/StatusColumn';
import { SmartPointerSensor } from '../pointerSensor';
import { Status } from '../redux/kanban/state';
import { getGroup, getKanbanItems, getMember, putOrder } from '../redux/kanban/thunk';
import { getTable } from '../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../store';

export type kanbanState = Status;

export function Kanban() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const statusList = useAppSelector((state) => state.kanban.statusList);
    const projectId = useAppSelector((state) => state.project.project_id);
    const sensors = useSensors(useSensor(SmartPointerSensor));

    useEffect(() => {
        if (projectId !== null) {
            dispatch(getKanbanItems(projectId));
            dispatch(getMember(projectId));
            dispatch(getGroup(projectId));
        }
    }, [projectId, dispatch]);

    useEffect(() => {
        userId && projectId && dispatch(getTable(userId, projectId));
    }, [projectId, dispatch]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = statusList.findIndex((status) => status.id === active.id);
            const newIndex = statusList.findIndex((status) => status.id === over?.id);
            if (oldIndex >= 0 && newIndex >= 0) {
                const newArr = arrayMove(statusList, oldIndex, newIndex);
                dispatch(putOrder(newArr));
            }
        }
    }

    return (
        <ScrollArea
            style={{
                width: 'calc(100vw - 140px)',
                height: 'calc(100vh - 160px)'
            }}
            type='auto'
        >
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <SortableContext items={statusList.map((status) => status.id)}>
                    <div className='kanban-table'>
                        <Group noWrap position='left'>
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
        </ScrollArea>
    );
}
