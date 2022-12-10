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
import { useState } from 'react';
import { TableRow } from '../components/MainTableComponents/TableRow';

const elements = {
    1: { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    2: { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    3: { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    4: { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    5: { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
}

export interface TableElement {
    [keys: number]: {
        position: number,
        mass: number,
        symbol: string,
        name: string
    }
}

export function MainTable() {

    const [rank, setRank] = useState([1, 2, 3, 4, 5]);

    const sensors = useSensors(
        useSensor(SmartPointerSensor)
    );

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = rank.indexOf(active.id);
            const newIndex = rank.indexOf(over.id);
            const newOrderArray = arrayMove(rank, oldIndex, newIndex);
            setRank(newOrderArray);
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
                    items={rank}
                    strategy={verticalListSortingStrategy}
                >
                    {rank.map((each) => (
                        <TableRow
                            key={each}
                            id={each}
                            elements={elements}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
}