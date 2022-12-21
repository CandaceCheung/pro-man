import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { TableState } from '../redux/table/slice';
import { ItemGroupCollapser } from '../components/MainTableComponents/ItemGroupCollapser';
import { addPerson, addTransaction, getProjectStatusList, getTable, removePerson, removeTransaction, renameItem, renameType, reorderItems, reorderTypes, updateItemGroupName, updateState, updateText } from '../redux/table/thunk';
import { closestCenter, DndContext, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { TableRow } from '../components/MainTableComponents/TableRow';
import { useStyles } from '../components/MainTableComponents/styles';
import { TableColumnTitle } from '../components/MainTableComponents/TableColumnTitle';
import { SmartPointerSensor } from '../pointerSensor';
import produce from "immer";
import { ScrollArea } from '@mantine/core';
import { getMember } from '../redux/kanban/thunk';
import { showNotification } from '@mantine/notifications';
import { format } from 'date-fns';

export interface itemCellsElement {
    item_id: TableState["item_id"],
    item_name: TableState["item_name"],
    type_id: TableState["horizontal_order_id"],
    type_name: TableState["type_name"],
    element_name: TableState["element_name"],
    item_dates_datetime?: TableState["item_dates_datetime"],
    item_dates_date?: TableState["item_dates_date"],
    transaction_id?: Array<TableState["transaction_id"]>,
    item_money_cashflow?: Array<TableState["item_money_cashflow"]>,
    item_money_date?: Array<TableState["item_money_date"]>,
    item_person_user_id?: Array<TableState["item_person_user_id"]>,
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

export interface MembersFullName {
    username: string,
    firstName: string | null,
    lastName: string | null
}

export function MainTable() {
    const userId = useAppSelector(state => state.auth.userId);
    const projectID = useAppSelector(state => state.project.project_id);
    const tableSummary = useAppSelector(state => state.table.summary);
    const members = useAppSelector(state => state.kanban.memberList);

    const [itemCellsState, setItemCellsState] = useState<{ [keys in number]: { [keys in number]: { [keys in number]: itemCellsElement } } }>({});
    const [itemGroupsState, setItemGroupsState] = useState<itemsGroupElement[]>([]);
    const [itemsOrdersState, setItemsOrdersState] = useState<Record<number, Array<number>>>({});
    const [typesOrdersState, setTypesOrdersState] = useState<Record<number, Array<number>>>({});
    const [itemGroupsCollapsedState, setItemGroupCollapsedState] = useState<boolean[]>([]);
    const [itemGroupsInputSelectState, setItemGroupsInputSelectState] = useState<boolean[]>([]);
    const [itemGroupsInputValueState, setItemGroupsInputValueState] = useState<string[]>([]);

    const [membersFullName, setMembersFullName] = useState<Record<number, MembersFullName>>({});
    const [personsColors, setPersonsColors] = useState<Record<number, string>>({});

    const dispatch = useAppDispatch();
    const { classes, theme, cx } = useStyles();

    const sensors = useSensors(
        useSensor(SmartPointerSensor)
    );

    useEffect(() => {
        projectID && dispatch(getMember(projectID));
        projectID && dispatch(getProjectStatusList(projectID));
        userId && projectID && dispatch(getTable(userId, projectID));
    }, [userId, projectID, dispatch]);

    useEffect(() => {
        const membersFullNameTemp: Record<number, MembersFullName> = {};
        members.forEach(member => {
            membersFullNameTemp[member.id] = {
                username: member.username,
                firstName: member.firstName,
                lastName: member.lastName
            }
        });
        setMembersFullName(membersFullNameTemp);
    }, [members]);

    useEffect(() => {
        let itemCells: { [keys in number]: { [keys in number]: { [keys in number]: itemCellsElement } } } = {};
        let itemGroups: itemsGroupElement[] = [];
        let itemGroupsCollapsed: boolean[] = [];
        let itemGroupsInputSelected: boolean[] = [];
        let itemGroupsInputValue: string[] = [];
        let itemsOrders: Record<number, Array<number>> = {};
        let typesOrders: Record<number, Array<number>> = {};
        let typesOrderSet: Set<number> = new Set();

        let personsColorsTemp: Record<number, string> = {};
        let personsMembers: Set<number> = new Set();

        for (const cell of tableSummary) {
            if (cell.project_id) {
                const itemGroupID = cell.item_group_id;
                const itemID = cell.item_id;
                const typeID = cell.horizontal_order_id;
                let itemCell: itemCellsElement = {
                    item_id: cell.item_id,
                    item_name: cell.item_name,
                    type_id: cell.horizontal_order_id,
                    type_name: cell.type_name,
                    element_name: cell.element_name
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

                switch (cell.type_name) {
                    case "dates":
                        itemCell["item_dates_datetime"] = cell.item_dates_datetime;
                        itemCell["item_dates_date"] = cell.item_dates_date;
                        itemCells[itemGroupID][itemID][typeID] = itemCell;
                        break;
                    case "money":
                        if (itemCells[itemGroupID][itemID][typeID]) {
                            if (!itemCells[itemGroupID][itemID][typeID]!.transaction_id!.includes(cell.transaction_id)) {
                                itemCells[itemGroupID][itemID][typeID]!.transaction_id!.push(cell.transaction_id);
                                itemCells[itemGroupID][itemID][typeID]!.item_money_cashflow!.push(cell.item_money_cashflow);
                                itemCells[itemGroupID][itemID][typeID]!.item_money_date!.push(cell.item_money_date);
                            }
                        } else {
                            itemCell["transaction_id"] = [cell.transaction_id];
                            itemCell["item_money_cashflow"] = [cell.item_money_cashflow];
                            itemCell["item_money_date"] = [cell.item_money_date];
                            itemCells[itemGroupID][itemID][typeID] = itemCell;
                        }
                        break;
                    case "persons":
                        if (itemCells[itemGroupID][itemID][typeID]) {
                            if (!itemCells[itemGroupID][itemID][typeID].item_person_user_id!.includes(cell.item_person_user_id)) {
                                itemCells[itemGroupID][itemID][typeID].item_person_user_id!.push(cell.item_person_user_id);
                            }
                        } else {
                            itemCell.item_person_user_id = [cell.item_person_user_id];
                            itemCells[itemGroupID][itemID][typeID] = itemCell;
                        }
                        personsMembers.add(cell.item_person_user_id);
                        break;
                    case "status":
                        itemCell["item_status_color"] = cell.item_status_color;
                        itemCell["item_status_name"] = cell.item_status_name;
                        itemCells[itemGroupID][itemID][typeID] = itemCell;
                        break;
                    case "text":
                        itemCell["item_text_text"] = cell.item_text_text;
                        itemCells[itemGroupID][itemID][typeID] = itemCell;
                        break;
                    case "times":
                        itemCell["item_times_start_date"] = cell.item_times_start_date;
                        itemCell["item_times_end_date"] = cell.item_times_end_date;
                        itemCells[itemGroupID][itemID][typeID] = itemCell;
                        break;
                    default:
                        break;
                }

                if (!typesOrders[itemGroupID]) {
                    typesOrderSet = new Set();
                }
                typesOrderSet.add(typeID);
                typesOrders[itemGroupID] = Array.from(typesOrderSet);
            }
        }

        // Set type_persons members initials colors
        let personsMembersArray = Array.from(personsMembers).sort();
        personsMembersArray.forEach((id, index) => { personsColorsTemp[id] = theme.colors.personsTypeComponentColor[index % theme.colors.personsTypeComponentColor.length] });

        setItemCellsState(itemCells);
        setItemGroupsState(itemGroups);
        setItemGroupCollapsedState(itemGroupsCollapsed);
        setItemGroupsInputSelectState(itemGroupsInputSelected);
        setItemGroupsInputValueState(itemGroupsInputValue);

        setItemsOrdersState(itemsOrders);
        setTypesOrdersState(typesOrders);

        setPersonsColors(personsColorsTemp);
    }, [tableSummary, projectID, theme.colors.personsTypeComponentColor]);

    const toggleItemGroupCollapsed = (index: number) => {
        const newItemGroupsCollapsedState = produce(itemGroupsCollapsedState, draftState => {
            draftState[index] = !draftState[index];
        })
        setItemGroupCollapsedState(newItemGroupsCollapsedState);
    }

    const selectItemGroupInput = (index: number) => {
        const newItemGroupsInputSelectState = produce(itemGroupsInputSelectState, draftState => {
            draftState[index] = true;
        })
        setItemGroupsInputSelectState(newItemGroupsInputSelectState);
    }

    const changeItemGroupInputValue = (index: number, value: string) => {
        const newItemGroupsInputValueState = produce(itemGroupsInputValueState, draftState => {
            draftState[index] = value;
        })
        setItemGroupsInputValueState(newItemGroupsInputValueState);
    }

    const deselectItemGroupInput = (index: number) => {
        if (userId && projectID) {
            const newItemGroupsInputSelectState = produce(itemGroupsInputSelectState, draftState => {
                draftState[index] = false
            });
            setItemGroupsInputSelectState(newItemGroupsInputSelectState);

            if (itemGroupsInputValueState[index] !== itemGroupsState[index].item_group_name) {
                if (itemGroupsInputValueState[index].length) {
                    // Set new group name into itemGroupsState
                    const nextNewItemGroupsState = produce(itemGroupsState, draftState => {
                        draftState[index].item_group_name = itemGroupsInputValueState[index];
                    })
                    setItemGroupsState(nextNewItemGroupsState);

                    // Fetch to the server
                    dispatch(updateItemGroupName(itemGroupsState[index].item_group_id, itemGroupsInputValueState[index], userId, projectID));
                } else {
                    const newItemGroupsInputValueState = produce(itemGroupsInputValueState, draftState => {
                        draftState[index] = itemGroupsState[index].item_group_name;
                    });
                    setItemGroupsInputValueState(newItemGroupsInputValueState);
                }
            }
        }
    }

    const handleItemGroupInputKeyDown = (index: number, key: string) => {
        if (key === "Enter") {
            deselectItemGroupInput(index);
        }
    }

    const handleDragEndRow = (event: any, item_group_id: number) => {
        const { active, over } = event;
        if (active.id !== over.id && userId && projectID) {
            const oldIndex = itemsOrdersState[item_group_id].indexOf(active.id);
            const newIndex = itemsOrdersState[item_group_id].indexOf(over.id);
            const nextItemOrdersState = produce(itemsOrdersState, draftState => {
                draftState[item_group_id] = arrayMove(draftState[item_group_id], oldIndex, newIndex);
            });
            setItemsOrdersState(nextItemOrdersState);
            userId && dispatch(reorderItems(nextItemOrdersState[item_group_id], userId, projectID));
        }
    }

    const handleDragEndColumn = (event: any, item_group_id: number) => {
        const { active, over } = event;
        if (active.id !== over.id && userId && projectID) {
            const oldIndex = typesOrdersState[item_group_id].indexOf(active.id);
            const newIndex = typesOrdersState[item_group_id].indexOf(over.id);
            const nextTypesOrdersState = produce(typesOrdersState, draftState => {
                Object.keys(draftState).forEach((itemGroupId, _) => {
                    draftState[parseInt(itemGroupId)] = arrayMove(draftState[parseInt(itemGroupId)], oldIndex, newIndex)
                });
            });
            setTypesOrdersState(nextTypesOrdersState);
            userId && dispatch(reorderTypes(nextTypesOrdersState[item_group_id], userId, projectID));
        }
    }

    const onItemRename = (groupId: number, itemId: number, name: string) => {
        const newItemCellsState = produce(itemCellsState, draftState => {
            Object.keys(draftState[groupId][itemId]).forEach((typeId, _) => {
                draftState[groupId][itemId][parseInt(typeId)].item_name = name;
            });
        });
        setItemCellsState(newItemCellsState);
        dispatch(renameItem(itemId, name, userId!, projectID!));
    }

    const onTypeRename = (typeId: number, name: string) => {
        const newItemCellsState = produce(itemCellsState, draftState => {
            Object.keys(draftState).forEach((groupId, _) => {
                Object.keys(draftState[parseInt(groupId)]).forEach((itemId, _) => {
                    Object.keys(draftState[parseInt(groupId)][parseInt(itemId)]).forEach((each, _) => {
                        if (parseInt(each) === typeId) {
                            draftState[parseInt(groupId)][parseInt(itemId)][typeId].element_name = name;
                        }
                    })
                });
            })
        });
        setItemCellsState(newItemCellsState);
        dispatch(renameType(typeId, name, userId!, projectID!));
    }

    const onTextChange = (groupId: number, itemId: number, typeId: number, text: string) => {
        const newItemCellsState = produce(itemCellsState, draftState => {
            draftState[groupId][itemId][typeId].item_text_text = text;
        });
        setItemCellsState(newItemCellsState);
        dispatch(updateText(itemId, text, userId!, projectID!));
    }

    const onStatusChange = (groupId: number, itemId: number, stateId: number, typeId: number, name: string, color: string) => {
        const newItemCellsState = produce(itemCellsState, draftState => {
            draftState[groupId][itemId][typeId].item_status_name = name;
            draftState[groupId][itemId][typeId].item_status_color = color;
        });
        setItemCellsState(newItemCellsState);
        dispatch(updateState(itemId, stateId, userId!, projectID!));
    }

    const onRemovePerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        if (itemCellsState[groupId][itemId][typeId].item_person_user_id!.length <= 1) {
            showNotification({
				title: 'Delete person notification',
				message: 'Failed to delete person! At least one person is required for items! 🤥'
			});
        } else {
            const newItemCellsState = produce(itemCellsState, draftState => {
                draftState[groupId][itemId][typeId].item_person_user_id = 
                draftState[groupId][itemId][typeId].item_person_user_id?.filter(id => id !== personId);
            });
            setItemCellsState(newItemCellsState);
            dispatch(removePerson(itemId, personId, userId!, projectID!));
        }
    }

    const onAddPerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        const newItemCellsState = produce(itemCellsState, draftState => {
            draftState[groupId][itemId][typeId].item_person_user_id!.push(personId);
        });
        setItemCellsState(newItemCellsState);
        dispatch(addPerson(itemId, personId, userId!, projectID!, typeId));
    }

    const onAddTransaction = (groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) => {
        const updateState = (transactionId: number) => {
            const newItemCellsState = produce(itemCellsState, draftState => {
                for (const i in draftState[groupId][itemId][typeId].item_money_date!) {
                    const each = draftState[groupId][itemId][typeId].item_money_date![i];
                    if (new Date(each) >= date) {
                        draftState[groupId][itemId][typeId].transaction_id!.splice(parseInt(i), 0, transactionId);
                        draftState[groupId][itemId][typeId].item_money_cashflow!.splice(parseInt(i), 0, cashFlow);
                        draftState[groupId][itemId][typeId].item_money_date!.splice(parseInt(i), 0, date.toISOString());
                        return;
                    }
                }
                draftState[groupId][itemId][typeId].transaction_id!.push(transactionId);
                draftState[groupId][itemId][typeId].item_money_cashflow!.push(cashFlow);
                draftState[groupId][itemId][typeId].item_money_date!.push(date.toISOString());
            });
            setItemCellsState(newItemCellsState);
        }
        dispatch(addTransaction(itemId, format(date, 'yyyy-MM-dd'), cashFlow, updateState));
    }

    const onDeleteTransaction= (groupId: number, itemId: number, typeId: number, transactionId: number) => {
        if (itemCellsState[groupId][itemId][typeId].transaction_id!.length <= 1) {
            showNotification({
				title: 'Delete transaction notification',
				message: 'Failed to delete transaction! At least one transaction is required for items! 🤥'
			});
        } else {
            const newItemCellsState = produce(itemCellsState, draftState => {
                const deleteIndex = draftState[groupId][itemId][typeId].transaction_id!.indexOf(transactionId);
                if (deleteIndex > -1) {
                    draftState[groupId][itemId][typeId].transaction_id!.splice(deleteIndex, 1);
                    draftState[groupId][itemId][typeId].item_money_cashflow!.splice(deleteIndex, 1);
                    draftState[groupId][itemId][typeId].item_money_date!.splice(deleteIndex, 1);
                  }
            });
            setItemCellsState(newItemCellsState);
            dispatch(removeTransaction(itemId, transactionId, userId!, projectID!));
        }
    }

    return (
        <ScrollArea style={{ width: "calc(100vw - 140px)", height: "calc(100vh - 160px)" }} type="auto" >
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
                                                    onBlur={() => deselectItemGroupInput(itemGroupArrayIndex)}
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
                                                    className={cx(classes.groupName, classes.hovertext, classes.itemCount)}
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
                                                <div className={cx(classes.tableCell, classes.item)}><span>Item</span></div>
                                                <DndContext sensors={sensors} onDragEnd={(event) => handleDragEndColumn(event, item_group_id)}>
                                                    <SortableContext items={typesOrdersState[item_group_id]} strategy={horizontalListSortingStrategy}>
                                                        {typesOrdersState[item_group_id].map((typeId, index) => (
                                                            <TableColumnTitle
                                                                key={typeId}
                                                                id={typeId}
                                                                cellColumnType={itemCellsState[item_group_id][itemsOrdersState[item_group_id][0]][typeId].type_name}
                                                                cellColumnCustomName={itemCellsState[item_group_id][itemsOrdersState[item_group_id][0]][typeId].element_name}
                                                                index={index}
                                                                lastCell={index === typesOrdersState[item_group_id].length - 1}
                                                                onTypeRename={onTypeRename}
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
                                                                itemId={itemId}
                                                                groupId={item_group_id}
                                                                typeOrder={typesOrdersState[item_group_id]}
                                                                cellDetails={itemCellsState[item_group_id][itemId]}
                                                                color={theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]}
                                                                lastRow={itemIndex === itemsOrdersState[item_group_id].length - 1}
                                                                personsColors={personsColors}
                                                                membersFullName={membersFullName}
                                                                onItemRename={onItemRename}
                                                                onTextChange={onTextChange}
                                                                onStatusChange={onStatusChange}
                                                                onRemovePerson={onRemovePerson}
                                                                onAddPerson={onAddPerson}
                                                                onAddTransaction={onAddTransaction}
                                                                onDeleteTransaction={onDeleteTransaction}
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
        </ScrollArea>
    )
}