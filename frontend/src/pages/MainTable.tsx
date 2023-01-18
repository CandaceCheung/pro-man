import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { itemCellsElement, itemsGroupElement, TableState } from '../redux/table/slice';
import { ItemGroupCollapser } from '../components/MainTableComponents/ItemGroupCollapser';
import {
    addPerson,
    addTransaction,
    deleteItem,
    deleteItemGroup,
    getProjectStatusList,
    getTable,
    insertItem,
    removePerson,
    removeTransaction,
    renameItem,
    renameType,
    reorderItems,
    reorderTypes,
    updateItemGroupName,
    updateState,
    updateText
} from '../redux/table/thunk';
import { closestCenter, DndContext, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { TableRow } from '../components/MainTableComponents/TableRow';
import { useStyles } from '../components/MainTableComponents/styles';
import { TableColumnTitle } from '../components/MainTableComponents/TableColumnTitle';
import { SmartPointerSensor } from '../pointerSensor';
import produce from 'immer';
import { Button, Modal, ScrollArea } from '@mantine/core';
import { getMember } from '../redux/kanban/thunk';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';

export interface MembersFullName {
    username: string;
    firstName: string | null;
    lastName: string | null;
}

export function MainTable() {
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.project_id);
    const tableSummary = useAppSelector((state) => state.table.summary);

    const itemCellsState = useAppSelector((state) => state.table.itemCells);
    const itemGroupsState = useAppSelector((state) => state.table.itemGroups);
    const itemsOrdersState = useAppSelector((state) => state.table.itemsOrders);
    const typesOrdersState = useAppSelector((state) => state.table.typesOrders);

    const members = useAppSelector((state) => state.kanban.memberList);

    const [itemGroupsCollapsedState, setItemGroupCollapsedState] = useState<boolean[]>([]);
    const [itemGroupsInputSelectState, setItemGroupsInputSelectState] = useState<boolean[]>([]);
    const [itemGroupsInputValueState, setItemGroupsInputValueState] = useState<string[]>([]);

    const [membersFullName, setMembersFullName] = useState<Record<number, MembersFullName>>({});
    const [personsColors, setPersonsColors] = useState<Record<number, string>>({});

    const [newItemInputSelected, setNewItemInputSelected] = useState<Record<number, boolean>>({});
    const [newItemInputValue, setNewItemInputValue] = useState<Record<number, string>>({});

    const [deleteGroupModalOpened, setDeleteGroupModalOpened] = useState<Record<number, boolean>>({});

    const dispatch = useAppDispatch();
    const { classes, theme, cx } = useStyles();

    const sensors = useSensors(useSensor(SmartPointerSensor));

    useEffect(() => {
        projectId && dispatch(getMember(projectId));
        projectId && dispatch(getProjectStatusList(projectId));
        userId && projectId && dispatch(getTable(userId, projectId));
    }, [userId, projectId, dispatch]);

    useEffect(() => {
        const membersFullNameTemp: Record<number, MembersFullName> = {};
        members.forEach((member) => {
            membersFullNameTemp[member.id] = {
                username: member.username,
                firstName: member.firstName,
                lastName: member.lastName
            };
        });
        setMembersFullName(membersFullNameTemp);
    }, [members]);

    useEffect(() => {
        let itemCells: {
            [keys in number]: {
                [keys in number]: { [keys in number]: itemCellsElement };
            };
        } = {};
        let itemGroups: itemsGroupElement[] = [];
        let itemGroupsCollapsed: boolean[] = [];
        let itemGroupsInputSelected: boolean[] = [];
        let itemGroupsInputValue: string[] = [];
        let itemsOrders: Record<number, Array<number>> = {};
        let typesOrders: Record<number, Array<number>> = {};
        let typesOrderSet: Set<number> = new Set();

        let personsColorsTemp: Record<number, string> = {};
        let personsMembers: Set<number> = new Set();

        let newItemInputSelectedTemp: Record<number, boolean> = {};
        let newItemInputValueTemp: Record<number, string> = {};

        let deleteGroupModalOpenedTemp: Record<number, boolean> = {};

        for (const cell of tableSummary) {
            if (cell.project_id) {
                const itemGroupId = cell.item_group_id;
                const itemId = cell.item_id;
                const typeId = cell.horizontal_order_id;
                let itemCell: itemCellsElement = {
                    item_id: cell.item_id,
                    item_name: cell.item_name,
                    type_id: cell.horizontal_order_id,
                    type_name: cell.type_name,
                    element_name: cell.element_name
                };

                if (itemCells[itemGroupId]) {
                    if (!itemCells[itemGroupId][itemId]) {
                        itemCells[itemGroupId][itemId] = {};
                        itemsOrders[itemGroupId].push(itemId);
                    }
                } else {
                    itemCells[itemGroupId] = {};
                    itemCells[itemGroupId][itemId] = {};
                    itemGroups.push({
                        item_group_id: cell.item_group_id,
                        item_group_name: cell.item_group_name
                    });
                    itemGroupsCollapsed.push(false);
                    itemGroupsInputSelected.push(false);
                    itemGroupsInputValue.push(cell.item_group_name);
                    itemsOrders[itemGroupId] = [itemId];
                }

                switch (cell.type_name) {
                    case 'dates':
                        itemCell['item_dates_datetime'] = cell.item_dates_datetime;
                        itemCell['item_dates_date'] = cell.item_dates_date;
                        itemCells[itemGroupId][itemId][typeId] = itemCell;
                        break;
                    case 'money':
                        if (itemCells[itemGroupId][itemId][typeId]) {
                            if (!itemCells[itemGroupId][itemId][typeId]!.transaction_id!.includes(cell.transaction_id)) {
                                itemCells[itemGroupId][itemId][typeId]!.transaction_id!.push(cell.transaction_id);
                                itemCells[itemGroupId][itemId][typeId]!.item_money_cashflow!.push(cell.item_money_cashflow);
                                itemCells[itemGroupId][itemId][typeId]!.item_money_date!.push(cell.item_money_date);
                            }
                        } else {
                            itemCell['transaction_id'] = [cell.transaction_id];
                            itemCell['item_money_cashflow'] = [cell.item_money_cashflow];
                            itemCell['item_money_date'] = [cell.item_money_date];
                            itemCells[itemGroupId][itemId][typeId] = itemCell;
                        }
                        break;
                    case 'persons':
                        if (itemCells[itemGroupId][itemId][typeId]) {
                            if (!itemCells[itemGroupId][itemId][typeId].item_person_user_id!.includes(cell.item_person_user_id)) {
                                itemCells[itemGroupId][itemId][typeId].item_person_user_id!.push(cell.item_person_user_id);
                            }
                        } else {
                            itemCell.item_person_user_id = [cell.item_person_user_id];
                            itemCells[itemGroupId][itemId][typeId] = itemCell;
                        }
                        personsMembers.add(cell.item_person_user_id);
                        break;
                    case 'status':
                        itemCell['item_status_color'] = cell.item_status_color;
                        itemCell['item_status_name'] = cell.item_status_name;
                        itemCells[itemGroupId][itemId][typeId] = itemCell;
                        break;
                    case 'text':
                        itemCell['item_text_text'] = cell.item_text_text;
                        itemCells[itemGroupId][itemId][typeId] = itemCell;
                        break;
                    case 'times':
                        itemCell['item_times_start_date'] = cell.item_times_start_date;
                        itemCell['item_times_end_date'] = cell.item_times_end_date;
                        itemCells[itemGroupId][itemId][typeId] = itemCell;
                        break;
                    default:
                        break;
                }

                if (!typesOrders[itemGroupId]) {
                    typesOrderSet = new Set();
                }
                typesOrderSet.add(typeId);
                typesOrders[itemGroupId] = Array.from(typesOrderSet);

                if (!newItemInputSelectedTemp[itemGroupId]) {
                    newItemInputSelectedTemp[itemGroupId] = false;
                }
                if (!newItemInputValueTemp[itemGroupId]) {
                    newItemInputValueTemp[itemGroupId] = '';
                }
                if (!deleteGroupModalOpenedTemp[itemGroupId]) {
                    deleteGroupModalOpenedTemp[itemGroupId] = false;
                }
            }
        }

        // Set type_persons members initials colors
        let personsMembersArray = Array.from(personsMembers).sort();
        personsMembersArray.forEach((id, index) => {
            personsColorsTemp[id] = theme.colors.personsTypeComponentColor[index % theme.colors.personsTypeComponentColor.length];
        });

        setItemGroupCollapsedState(itemGroupsCollapsed);
        setItemGroupsInputSelectState(itemGroupsInputSelected);
        setItemGroupsInputValueState(itemGroupsInputValue);

        setPersonsColors(personsColorsTemp);

        setNewItemInputSelected(newItemInputSelectedTemp);
        setNewItemInputValue(newItemInputValueTemp);

        setDeleteGroupModalOpened(deleteGroupModalOpenedTemp);
    }, [tableSummary, projectId, theme.colors.personsTypeComponentColor]);

    const toggleItemGroupCollapsed = (index: number) => {
        const newItemGroupsCollapsedState = produce(itemGroupsCollapsedState, (draftState) => {
            draftState[index] = !draftState[index];
        });
        setItemGroupCollapsedState(newItemGroupsCollapsedState);
    };

    const selectItemGroupInput = (index: number) => {
        const newItemGroupsInputSelectState = produce(itemGroupsInputSelectState, (draftState) => {
            draftState[index] = true;
        });
        setItemGroupsInputSelectState(newItemGroupsInputSelectState);
    };

    const changeItemGroupInputValue = (index: number, value: string) => {
        const newItemGroupsInputValueState = produce(itemGroupsInputValueState, (draftState) => {
            draftState[index] = value;
        });
        setItemGroupsInputValueState(newItemGroupsInputValueState);
    };

    const deselectItemGroupInput = (index: number) => {
        if (userId && projectId) {
            const newItemGroupsInputSelectState = produce(itemGroupsInputSelectState, (draftState) => {
                draftState[index] = false;
            });
            setItemGroupsInputSelectState(newItemGroupsInputSelectState);

            if (itemGroupsInputValueState[index] !== itemGroupsState[index].item_group_name) {
                if (itemGroupsInputValueState[index].length) {
                    // Fetch to the server
                    dispatch(updateItemGroupName(itemGroupsState[index].item_group_id, itemGroupsInputValueState[index], userId, projectId));
                } else {
                    const newItemGroupsInputValueState = produce(itemGroupsInputValueState, (draftState) => {
                        draftState[index] = itemGroupsState[index].item_group_name;
                    });
                    setItemGroupsInputValueState(newItemGroupsInputValueState);
                }
            }
        }
    };

    const handleItemGroupInputKeyDown = (index: number, key: string) => {
        if (key === 'Enter') {
            deselectItemGroupInput(index);
        }
    };

    const handleDragEndRow = (event: any, groupId: number) => {
        const { active, over } = event;
        if (active.id !== over.id && userId && projectId) {
            const oldIndex = itemsOrdersState[groupId].indexOf(active.id);
            const newIndex = itemsOrdersState[groupId].indexOf(over.id);
            userId && dispatch(reorderItems(arrayMove(itemsOrdersState[groupId], oldIndex, newIndex), groupId, userId, projectId));
        }
    };

    const handleDragEndColumn = (event: any, groupId: number) => {
        const { active, over } = event;
        if (active.id !== over.id && userId && projectId) {
            const oldIndex = typesOrdersState[groupId].indexOf(active.id);
            const newIndex = typesOrdersState[groupId].indexOf(over.id);
            userId && dispatch(reorderTypes(arrayMove(typesOrdersState[groupId], oldIndex, newIndex), groupId, userId, projectId));
        }
    };

    const onItemRename = (groupId: number, itemId: number, name: string) => {
        dispatch(renameItem(groupId, itemId, name));
    };

    const onTypeRename = (typeId: number, name: string) => {
        dispatch(renameType(typeId, name));
    };

    const onTextChange = (groupId: number, itemId: number, typeId: number, text: string) => {
        dispatch(updateText(groupId, itemId, typeId, text));
    };

    const onStatusChange = (groupId: number, itemId: number, stateId: number, typeId: number) => {
        dispatch(updateState(groupId, itemId, stateId, typeId));
    };

    const onRemovePerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        if (itemCellsState[groupId][itemId][typeId].item_person_user_id!.length <= 1) {
            showNotification({
                title: 'Delete person notification',
                message: 'Failed to delete person! At least one person is required for items! 🤥'
            });
        } else {
            dispatch(removePerson(groupId, itemId, typeId, personId));
        }
    };

    const onAddPerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        dispatch(addPerson(groupId, itemId, typeId, personId));
    };

    const onAddTransaction = (groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) => {
        dispatch(addTransaction(groupId, itemId, itemId, date, cashFlow));
    };

    const onDeleteTransaction = (groupId: number, itemId: number, typeId: number, transactionId: number) => {
        if (itemCellsState[groupId][itemId][typeId].transaction_id!.length <= 1) {
            showNotification({
                title: 'Delete transaction notification',
                message: 'Failed to delete transaction! At least one transaction is required for items! 🤥'
            });
        } else {
            dispatch(removeTransaction(groupId, itemId, typeId, transactionId));
        }
    };

    const toggleNewItemInputSelected = (groupId: number) => {
        const newState = produce(newItemInputSelected, (draftState) => {
            draftState[groupId] = !draftState[groupId];
        });
        setNewItemInputSelected(newState);
    };

    const updateNewItemInputValue = (groupId: number, value: string) => {
        const newState = produce(newItemInputValue, (draftState) => {
            draftState[groupId] = value;
        });
        setNewItemInputValue(newState);
    };

    const deselectNewItemNameInput = (groupId: number) => {
        if (newItemInputValue[groupId].length) {
            projectId && userId && dispatch(insertItem(projectId, userId, groupId, newItemInputValue[groupId]));
        }
        updateNewItemInputValue(groupId, '');
        toggleNewItemInputSelected(groupId);
    };

    const handleNewItemNameInputKeyDown = (key: string, groupId: number) => {
        if (key === 'Enter') {
            deselectNewItemNameInput(groupId);
        }
    };

    const toggleDeleteGroupModalSelected = (groupId: number) => {
        const newState = produce(deleteGroupModalOpened, (draftState) => {
            draftState[groupId] = !draftState[groupId];
        });
        setDeleteGroupModalOpened(newState);
    };

    const onDeleteItem = (groupId: number, itemId: number) => {
        if (Object.keys(itemCellsState[groupId]).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete item! Each group should have at least 1 item! 🤥'
            });
        } else {
            userId && projectId && dispatch(deleteItem(groupId, itemId, userId, projectId));
        }
    };

    const onDeleteGroup = (groupId: number) => {
        toggleDeleteGroupModalSelected(groupId);
        if (Object.keys(itemCellsState).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! Each project should have at least 1 item group! 🤥'
            });
        } else {
            userId && projectId && dispatch(deleteItemGroup(groupId, userId, projectId));
        }
    };

    return (
        <ScrollArea
            style={{
                width: 'calc(100vw - 140px)',
                height: 'calc(100vh - 160px)'
            }}
            type='auto'
        >
            <div className='main-table'>
                {itemGroupsState.map(({ item_group_id, item_group_name }, itemGroupArrayIndex) => {
                    return (
                        <div className={classes.itemGroup} key={itemGroupArrayIndex}>
                            <div
                                className={classes.itemGroupBar}
                                style={{
                                    color: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]
                                }}
                            >
                                <span className={classes.itemGroupIcon} onClick={() => toggleDeleteGroupModalSelected(item_group_id)}>
                                    <IconX size={16} />
                                </span>
                                <Modal opened={deleteGroupModalOpened[item_group_id]} onClose={() => toggleDeleteGroupModalSelected(item_group_id)} title={<span className={classes.modalTitle}>{'Delete this item group?'}</span>} centered>
                                    <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
                                    <span className={classes.modalFooter}>
                                        <Button color='red' onClick={() => onDeleteGroup(item_group_id)}>
                                            Delete
                                        </Button>
                                    </span>
                                </Modal>

                                <span onClick={() => toggleItemGroupCollapsed(itemGroupArrayIndex)} className={classes.hovertext} data-hover={itemGroupsCollapsedState[itemGroupArrayIndex] ? 'Expand' : 'Collapse'} key={itemGroupArrayIndex}>
                                    {<ItemGroupCollapser size={20} className={itemGroupsCollapsedState[itemGroupArrayIndex] ? '' : classes.collapserButton} />}
                                </span>
                                <span className={classes.itemCount}>
                                    {itemGroupsInputSelectState[itemGroupArrayIndex] ? (
                                        <input
                                            onBlur={() => deselectItemGroupInput(itemGroupArrayIndex)}
                                            type='text'
                                            autoFocus
                                            className={classes.groupNameInput}
                                            style={{
                                                borderColor: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]
                                            }}
                                            value={itemGroupsInputValueState[itemGroupArrayIndex]}
                                            onChange={(e) => changeItemGroupInputValue(itemGroupArrayIndex, e.target.value)}
                                            onKeyDown={(e) => handleItemGroupInputKeyDown(itemGroupArrayIndex, e.key)}
                                        ></input>
                                    ) : (
                                        <span
                                            onClick={() => selectItemGroupInput(itemGroupArrayIndex)}
                                            className={cx(classes.groupName, classes.hovertext, classes.itemCount)}
                                            data-hover='Click to edit'
                                            item-count={itemsOrdersState[item_group_id].length ? itemsOrdersState[item_group_id].length + ' item' + `${itemsOrdersState[item_group_id].length === 1 ? '' : 's'}` : 'No items'}
                                        >
                                            {item_group_name}
                                        </span>
                                    )}
                                </span>
                            </div>
                            {!itemGroupsCollapsedState[itemGroupArrayIndex] && (
                                <div>
                                    <div id={`table_group_${item_group_id}`} className={classes.tableGroup}>
                                        <div className={classes.tableHead}>
                                            <div className={classes.tableRow}>
                                                <div className={classes.tableCell}></div>
                                                <div className={cx(classes.tableCell, classes.item)}>
                                                    <span>Item</span>
                                                </div>
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
                                                </DndContext>
                                            </div>
                                        </div>
                                        <div className={classes.tableBody}>
                                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEndRow(event, item_group_id)}>
                                                <SortableContext items={itemsOrdersState[item_group_id]} strategy={verticalListSortingStrategy}>
                                                    {itemsOrdersState[item_group_id].map((itemId, itemIndex) => (
                                                        <TableRow
                                                            key={'group_' + itemGroupArrayIndex + '_item_' + itemId}
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
                                                            onDeleteItem={onDeleteItem}
                                                        />
                                                    ))}
                                                </SortableContext>
                                            </DndContext>
                                        </div>
                                    </div>
                                    <div className={classes.addItemCell}>
                                        <div
                                            className={classes.tableCell}
                                            style={{
                                                backgroundColor: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length]
                                            }}
                                        ></div>
                                        <div className={cx(classes.tableCell, classes.item)}>
                                            {newItemInputSelected[item_group_id] ? (
                                                <input
                                                    onBlur={() => deselectNewItemNameInput(item_group_id)}
                                                    type='text'
                                                    autoFocus
                                                    className={classes.newItemNameInput}
                                                    value={newItemInputValue[item_group_id]}
                                                    onKeyDown={(e) => handleNewItemNameInputKeyDown(e.key, item_group_id)}
                                                    onChange={(e) => updateNewItemInputValue(item_group_id, e.target.value)}
                                                ></input>
                                            ) : (
                                                <div className={classes.typeName} onClick={() => toggleNewItemInputSelected(item_group_id)}>
                                                    + Add Item
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
}
