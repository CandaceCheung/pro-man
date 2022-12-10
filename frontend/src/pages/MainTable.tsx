import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SmartPointerSensor } from '../pointerSensor';
import { useEffect, useState } from 'react';
import { TableRow } from '../components/MainTableComponents/TableRow';
import { useAppSelector } from '../store';

export const elements: TableElement = {
    1: { 1: 6, 2: 12.011, 3: 'C', 4: 'Carbon' },
    2: { 1: 7, 2: 14.007, 3: 'N', 4: 'Nitrogen' },
    3: { 1: 39, 2: 88.906, 3: 'Y', 4: 'Yttrium' },
    4: { 1: 56, 2: 137.33, 3: 'Ba', 4: 'Barium' },
    5: { 1: 58, 2: 140.12, 3: 'Ce', 4: 'Cerium' },
}

export interface TableElement {
    [keys: number]: RowElement
}

export interface RowElement {
    1: number,
    2: number,
    3: string,
    4: string
}

export function MainTable() {
    const tableSummary = useAppSelector(state => state.table);
    const projectID = useAppSelector(state => state.project.project_id);
    const [] = useState();
    const [rowIDs, setRowIDs] = useState([1, 2, 3, 4, 5]);

    useEffect(()=>{
        for (const cell of tableSummary) {
            
        }
    }, [tableSummary]);

    const sensors = useSensors(
        useSensor(SmartPointerSensor)
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = rowIDs.indexOf(active.id);
            const newIndex = rowIDs.indexOf(over.id);
            const newOrderArray = arrayMove(rowIDs, oldIndex, newIndex);
            setRowIDs(newOrderArray);
            // dispatch(reorderTodo(name, itemsAllIds, newOrderArray));
        }
    }

    return (
        <div className="tab-content">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={rowIDs}
                    strategy={verticalListSortingStrategy}
                >
                    {rowIDs.map((rowID) =>(
                        <TableRow
                            key={rowID}
                            rowID={rowID}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
}