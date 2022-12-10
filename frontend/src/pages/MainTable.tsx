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
import { TableState } from '../redux/table/slice';

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

export interface itemCellsElement {
    item_id: TableState["item_id"],
    type_name: TableState["type_name"],
    item_dates_datetime?: TableState["item_dates_datetime"],
    item_money_cashflow?: TableState["item_money_cashflow"],
    item_money_date?: TableState["item_money_date"],
    item_person_name?: TableState["item_person_name"],
    item_status_color?: TableState["item_status_color"],
    item_status_name?: TableState["item_status_name"],
    item_text_text?: TableState["item_text_text"],
    item_times_start_date?: TableState["item_times_start_date"],
    item_times_end_date?: TableState["item_times_end_date"]
}

export interface itemsGroupElement {
    item_group_id: TableState["item_group_id"],
    item_group_name: TableState["item_group_name"],
}

export function MainTable() {
    const tableSummary = useAppSelector(state => state.table);
    const projectID = useAppSelector(state => state.project.project_id);
    const [itemCellsState, setItemCellsState] = useState<{[keys in number]: itemCellsElement[]}>({});
    const [itemGroupsState, setItemGroupsState] = useState<itemsGroupElement[]>([]);
    const [rowIDs, setRowIDs] = useState([1, 2, 3, 4, 5]);

    
    useEffect(() => {
        let itemCells: {[keys in number]: itemCellsElement[]} = {};
        let itemGroups: itemsGroupElement[] = [];
        for (const cell of tableSummary) {
            if (cell.project_id === projectID) {
                const itemGroupID = cell.item_group_id;
                let itemCell: itemCellsElement = {
                    item_id: cell.item_id,
                    type_name: cell.type_name,
                }
                switch (cell.type_name) {
                    case "dates":
                        itemCell["item_dates_datetime"] = cell.item_dates_datetime;
                        break;
                    case "money":
                        itemCell["item_money_cashflow"] = cell.item_money_cashflow;
                        itemCell["item_money_date"] = cell.item_money_date;
                        break;
                    case "persons":
                        itemCell["item_person_name"] = cell.item_person_name;
                        break;
                    case "status":
                        itemCell["item_status_color"] = cell.item_status_color;
                        itemCell["item_status_name"] = cell.item_status_name;
                        break;
                    case "text":
                        itemCell["item_text_text"] = cell.item_text_text;
                        break;
                    case "times":
                        itemCell["item_times_start_date"] = cell.item_times_start_date;
                        itemCell["item_times_end_date"] = cell.item_times_end_date;
                        break;
                    default:
                        break;
                }
                if (!itemCells[itemGroupID]) {
                    itemGroups.push({
                        item_group_id: cell.item_group_id,
                        item_group_name: cell.item_group_name
                    });
                    itemCells[itemGroupID].push(itemCell);
                } else {
                    itemCells[itemGroupID] = [itemCell];
                }
            }
        }
        setItemCellsState(itemCells);
        setItemGroupsState(itemGroups);
    }, [tableSummary, projectID]);

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
                    {rowIDs.map((rowID) => (
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