import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { TableState } from '../redux/table/slice';
import { ItemGroupCollapser } from '../components/MainTableComponents/ItemGroupCollapser';
import { reorderItems, reorderTypes, updateItemGroupName } from '../redux/table/thunk';
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { TableRow } from '../components/MainTableComponents/TableRow';
import { useStyles } from '../components/MainTableComponents/styles';
import { TableColumnTitle } from '../components/MainTableComponents/TableColumnTitle';

export interface itemCellsElement {
    item_id: TableState["item_id"],
    item_name: TableState["item_name"],
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
    item_group_name: TableState["item_group_name"]
}

export function MainTable() {
    const userId = useAppSelector(state => state.auth.userId);
    const projectID = useAppSelector(state => state.project.project_id);
    const tableSummary = useAppSelector(state => state.table.summary);
    const [itemCellsState, setItemCellsState] = useState<{ [keys in number]: { [keys in number]: { [keys in number]: itemCellsElement } } }>({});
    const [itemGroupsState, setItemGroupsState] = useState<itemsGroupElement[]>([]);
    const [itemsOrdersState, setItemsOrdersState] = useState<{ [keys in number]: number[] }>({});
    const [typesOrdersState, setTypesOrdersState] = useState<{ [keys in number]: number[] }>({});
    const [itemGroupsCollapsedState, setItemGroupCollapsedState] = useState<boolean[]>([]);
    const [itemGroupsInputSelectState, setItemGroupsInputSelectState] = useState<boolean[]>([]);
    const [itemGroupsInputValueState, setItemGroupsInputValueState] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    const { classes, theme, cx } = useStyles();

    const sensors = useSensors(
        useSensor(MouseSensor)
    );

    useEffect(() => {
        let itemCells: { [keys in number]: { [keys in number]: { [keys in number]: itemCellsElement } } } = {};
        let itemGroups: itemsGroupElement[] = [];
        let itemGroupsCollapsed: boolean[] = [];
        let itemGroupsInputSelected: boolean[] = [];
        let itemGroupsInputValue: string[] = [];
        let itemsOrders: { [keys in number]: number[] } = {};
        let typesOrders: { [keys in number]: number[] } = {};
        let typesOrderSet: Set<number> = new Set();
        for (const cell of tableSummary) {
            if (cell.project_id === projectID) {
                const itemGroupID = cell.item_group_id;
                const itemID = cell.item_id;
                const typeID = cell.horizontal_order_id;
                let itemCell: itemCellsElement = {
                    item_id: cell.item_id,
                    item_name: cell.item_name,
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

                if (itemCells[itemGroupID]) {
                    if (!itemCells[itemGroupID][itemID]) {
                        itemCells[itemGroupID][itemID] = {};
                        itemsOrders[itemGroupID].push(itemID);
                    }
                } else {
                    itemCells[itemGroupID] = {};
                    itemCells[itemGroupID][itemID] = {};
                    itemGroups.push({
                        item_group_id: cell.item_group_id,
                        item_group_name: cell.item_group_name
                    });
                    itemGroupsCollapsed.push(false);
                    itemGroupsInputSelected.push(false);
                    itemGroupsInputValue.push(cell.item_group_name);
                    itemsOrders[itemGroupID] = [itemID];
                }
                itemCells[itemGroupID][itemID][typeID] = itemCell;

                if (!typesOrders[itemGroupID]) {
                    typesOrderSet = new Set();
                }
                typesOrderSet.add(typeID);
                typesOrders[itemGroupID] = Array.from(typesOrderSet);
            }
        }
        setItemGroupsState(itemGroups);
        setItemCellsState(itemCells);
        setItemGroupCollapsedState(itemGroupsCollapsed);
        setItemGroupsInputSelectState(itemGroupsInputSelected);
        setItemGroupsInputValueState(itemGroupsInputValue);

        setItemsOrdersState(itemsOrders);
        setTypesOrdersState(typesOrders);
    }, [tableSummary, projectID]);

    const toggleItemGroupCollapsed = (index: number) => {
        const newItemGroupsCollapsedState = [...itemGroupsCollapsedState];
        setItemGroupCollapsedState(newItemGroupsCollapsedState.map((each: boolean, i: number) => {
            if (index === i) {
                each = !each;
            }
            return each;
        }));
    }

    const selectItemGroupInput = (index: number) => {
        const newItemGroupsInputSelectState = [...itemGroupsInputSelectState];
        setItemGroupsInputSelectState(newItemGroupsInputSelectState.map((each: boolean, i: number) => {
            if (index === i) {
                each = !each;
            }
            return each;
        }));
    }

    const deselectItemGroupInput = (index: number, value: string) => {
        const newItemGroupsInputSelectState = [...itemGroupsInputSelectState];
        setItemGroupsInputSelectState(newItemGroupsInputSelectState.map((each: boolean, i: number) => {
            if (index === i) {
                each = !each;
            }
            return each;
        }));
        if (value !== itemGroupsState[index].item_group_name) {
            // Set new group name into itemGroupsState
            let newItemGroupsState: itemsGroupElement[] = JSON.parse(JSON.stringify(itemGroupsState));
            newItemGroupsState[index].item_group_name = value;
            setItemGroupsState(newItemGroupsState);

            // Fetch to the server
            dispatch(updateItemGroupName(itemGroupsState[index].item_group_id, value));
        }
    }

    const changeItemGroupInputValue = (index: number, value: string) => {
        const newItemGroupsInputValueState = [...itemGroupsInputValueState];
        setItemGroupsInputValueState(newItemGroupsInputValueState.map((each: string, i: number) => {
            if (index === i) {
                each = value;
            }
            return each;
        }))
    }

    const handleItemGroupInputKeyDown = (index: number, key: string) => {
        if (key === "Enter") {
            // Set new group name into itemGroupsState
            const groupId = itemGroupsState[index].item_group_id;
            const newValue = itemGroupsInputValueState[index];
            let newItemGroupsState: itemsGroupElement[] = JSON.parse(JSON.stringify(itemGroupsState));
            newItemGroupsState[index].item_group_name = newValue;
            setItemGroupsState(newItemGroupsState);

            // Fetch to the server
            dispatch(updateItemGroupName(groupId, newValue));
        }
    }

    const handleDragEndRow = (event: any, item_group_id: number) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = itemsOrdersState[item_group_id].indexOf(active.id);
            const newIndex = itemsOrdersState[item_group_id].indexOf(over.id);
            const newItemsOrdersState = JSON.parse(JSON.stringify(itemsOrdersState));
            newItemsOrdersState[item_group_id] = arrayMove(itemsOrdersState[item_group_id], oldIndex, newIndex);
            setItemsOrdersState(newItemsOrdersState);
            userId && dispatch(reorderItems(arrayMove(itemsOrdersState[item_group_id], oldIndex, newIndex), userId));
        }
    }

    const handleDragEndColumn = (event: any, item_group_id: number) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = typesOrdersState[item_group_id].indexOf(active.id);
            const newIndex = typesOrdersState[item_group_id].indexOf(over.id);
            const newTypesOrdersState = JSON.parse(JSON.stringify(typesOrdersState));
            newTypesOrdersState[item_group_id] = arrayMove(newTypesOrdersState[item_group_id], oldIndex, newIndex);
            setTypesOrdersState(newTypesOrdersState);
            userId && dispatch(reorderTypes(arrayMove(typesOrdersState[item_group_id], oldIndex, newIndex), userId));
        }
    }

    return (
        <div className="main-table">
            {
                itemGroupsState.map((
                    {
                        item_group_id,
                        item_group_name
                    }, itemGroupArrayIndex) => {
                    return (
                        <div
                            className={classes.itemGroup}
                            key={itemGroupArrayIndex}
                        >
                            <div
                                style={{
                                    color: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length],
                                }}
                            >
                                <span
                                    onClick={() => toggleItemGroupCollapsed(itemGroupArrayIndex)}
                                    className={classes.hovertext}
                                    data-hover={itemGroupsCollapsedState[itemGroupArrayIndex] ? "Expand group" : "Collapse Group"}
                                    key={itemGroupArrayIndex}
                                >
                                    {
                                        <ItemGroupCollapser
                                            size={20}
                                            className={itemGroupsCollapsedState[itemGroupArrayIndex] ? "" : classes.collapserButton}
                                        />}
                                </span>
                                <span
                                    className={classes.itemCount}
                                >
                                    {
                                        itemGroupsInputSelectState[itemGroupArrayIndex]
                                            ?
                                            <input
                                                onBlur={(e) => deselectItemGroupInput(
                                                    itemGroupArrayIndex,
                                                    e.target.value
                                                )}
                                                type="text"
                                                autoFocus
                                                className={classes.groupNameInput}
                                                style={{
                                                    borderColor: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]
                                                }}
                                                value={itemGroupsInputValueState[itemGroupArrayIndex]}
                                                onChange={(e) => changeItemGroupInputValue(
                                                    itemGroupArrayIndex,
                                                    e.target.value
                                                )}
                                                onKeyDown={(e) => handleItemGroupInputKeyDown(
                                                    itemGroupArrayIndex,
                                                    e.key
                                                )}
                                            >

                                            </input>
                                            :
                                            <span
                                                onClick={() => selectItemGroupInput(itemGroupArrayIndex)}
                                                className={classes.groupName + " " + classes.hovertext + " " + classes.itemCount}
                                                data-hover="Click to edit"
                                                item-count={
                                                    itemsOrdersState[item_group_id].length
                                                        ?
                                                        itemsOrdersState[item_group_id].length
                                                        + " item"
                                                        + `${itemsOrdersState[item_group_id].length === 1 ? "" : "s"}`
                                                        :
                                                        "No items"
                                                }
                                            >
                                                {item_group_name}
                                            </span>
                                    }
                                </span>
                            </div>
                            {
                                !itemGroupsCollapsedState[itemGroupArrayIndex] &&
                                <div
                                    id={`table_group_${item_group_id}`}
                                    className={classes.tableGroup}
                                >
                                    <div className={classes.tableHead}>
                                        <div className={classes.tableRow}>
                                            <div className={classes.tableCell}></div>
                                            <div className={cx(classes.tableCell, classes.item)}>Item</div>
                                            <DndContext sensors={sensors} onDragEnd={(event) => handleDragEndColumn(event, item_group_id)}>
                                                <SortableContext items={typesOrdersState[item_group_id]} strategy={horizontalListSortingStrategy}>
                                                    {typesOrdersState[item_group_id].map((typeId, index) => (
                                                        <TableColumnTitle
                                                            key={typeId}
                                                            id={typeId}
                                                            cellColumnType={itemCellsState[item_group_id][itemsOrdersState[item_group_id][0]][typeId].type_name}
                                                            index={index}
                                                            lastCell={index === typesOrdersState[item_group_id].length - 1}
                                                        />
                                                    ))}
                                                </SortableContext>
                                            </DndContext >
                                        </div>
                                    </div>
                                    <div className={classes.tableBody}>
                                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEndRow(event, item_group_id)}>
                                            <SortableContext items={itemsOrdersState[item_group_id]} strategy={verticalListSortingStrategy}>
                                                {
                                                    itemsOrdersState[item_group_id].map((itemId, itemIndex) =>
                                                        <TableRow
                                                            key={"group_" + itemGroupArrayIndex + "_item_" + itemId}
                                                            id={itemId}
                                                            rowOrder={typesOrdersState[item_group_id]}
                                                            cellDetails={itemCellsState[item_group_id][itemId]}
                                                            color={theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]}
                                                            lastRow={itemIndex === itemsOrdersState[item_group_id].length - 1}
                                                        />
                                                    )
                                                }

                                            </SortableContext>
                                        </DndContext >
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}