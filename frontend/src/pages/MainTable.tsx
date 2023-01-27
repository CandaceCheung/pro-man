import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { ItemGroupCollapser } from '../components/MainTableComponents/ItemGroupCollapser';
import {
    addTransaction,
    deleteItem,
    deleteItemGroup,
    getProjectStatusList,
    getTable,
    getTableV2,
    insertItem,
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
import { Button, Modal, ScrollArea } from '@mantine/core';
import { getMember } from '../redux/kanban/thunk';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { changeItemGroupInputValueAction, changeNewItemsInputValueAction, deselectItemGroupInputAction, ItemCell, ItemGroup, resetItemGroupInputValueAction, selectItemGroupInputAction, toggleDeleteGroupModalAction, toggleItemGroupsCollapsedAction, toggleNewItemsInputActiveAction } from '../redux/table/slice';

export function MainTable() {
    const userId = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.projectId);
    const itemCellsState = useAppSelector((state) => state.table.itemCells);
    const itemGroupsState = useAppSelector((state) => state.table.itemGroups);
    const itemsOrdersState = useAppSelector((state) => state.table.itemsOrders);
    const typesOrdersState = useAppSelector((state) => state.table.typesOrders);
    const itemGroupsCollapsed = useAppSelector((state) => state.table.itemGroupsCollapsed);
    const itemGroupsInputActive = useAppSelector((state) => state.table.itemGroupsInputActive);
    const itemGroupsInputValue = useAppSelector((state) => state.table.itemGroupsInputValue);
    const newItemsInputActive = useAppSelector((state) => state.table.newItemsInputActive);
    const newItemsInputValue = useAppSelector((state) => state.table.newItemsInputValue);
    const deleteGroupModalOpened = useAppSelector((state) => state.table.deleteGroupModalOpened);

    const dispatch = useAppDispatch();
    const { classes, theme, cx } = useStyles();

    const sensors = useSensors(useSensor(SmartPointerSensor));

    useEffect(() => {
        if (projectId) {
            dispatch(getMember(projectId));
            dispatch(getProjectStatusList(projectId));
            dispatch(getTableV2(userId!, projectId));
        }
    }, [userId, projectId, dispatch]);

    const changeItemGroupInputValue = (index: number, value: string) => {
        dispatch(changeItemGroupInputValueAction({index, value}));
    };

    const deselectItemGroupInput = (index: number) => {
        if (userId && projectId) {
            if (itemGroupsInputValue[index] !== itemGroupsState[index].itemGroupName) {
                const originalValue = itemGroupsState[index].itemGroupName;
                if (itemGroupsInputValue[index].length) {
                    // Fetch to the server
                    dispatch(updateItemGroupName(itemGroupsState[index].itemGroupId, itemGroupsInputValue[index], index, originalValue));
                } else {
                    dispatch(resetItemGroupInputValueAction({index, originalValue}));
                }
            }
        }
        dispatch(deselectItemGroupInputAction(index));
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

    const onAddTransaction = (groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) => {
        dispatch(addTransaction(groupId, itemId, typeId, date, cashFlow));
    };

    const onDeleteTransaction = (groupId: number, itemId: number, typeId: number, transactionId: number) => {
        if (itemCellsState[groupId][itemId][typeId].transactionId!.length <= 1) {
            showNotification({
                title: 'Delete transaction notification',
                message: 'Failed to delete transaction! At least one transaction is required for items! 🤥'
            });
        } else {
            dispatch(removeTransaction(groupId, itemId, typeId, transactionId));
        }
    };

    const toggleNewItemInputSelected = (index: number) => {
        dispatch(toggleNewItemsInputActiveAction(index));
    };

    const updateNewItemInputValue = (index: number, value: string) => {
        dispatch(changeNewItemsInputValueAction({index, value}));
    };

    const deselectNewItemNameInput = (index: number, groupId: number) => {
        if (newItemsInputValue[index].length) {
            dispatch(insertItem(projectId!, userId!, groupId, newItemsInputValue[index]));
        }
        updateNewItemInputValue(index, '');
        toggleNewItemInputSelected(index);
    };

    const handleNewItemNameInputKeyDown = (key: string, index: number, groupId: number) => {
        if (key === 'Enter') {
            deselectNewItemNameInput(index, groupId);
        }
    };

    const onDeleteItem = (groupId: number, itemId: number) => {
        if (Object.keys(itemCellsState[groupId]).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete item! Each group should have at least 1 item! 🤥'
            });
        } else {
            dispatch(deleteItem(groupId, itemId));
        }
    };

    const onDeleteGroup = (groupId: number, projectId: number) => {
        dispatch(toggleDeleteGroupModalAction(groupId));
        if (Object.keys(itemCellsState).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! Each project should have at least 1 item group! 🤥'
            });
        } else {
            dispatch(deleteItemGroup(groupId, projectId));
        }
    };

    return (
        <>
            {
                !itemCellsState[0] &&
                <ScrollArea
                    style={{
                        width: 'calc(100vw - 140px)',
                        height: 'calc(100vh - 160px)'
                    }}
                    type='auto'
                >
                    <div className='main-table'>
                        {itemGroupsState.map(({ itemGroupId, itemGroupName }, itemGroupArrayIndex) => {
                            return (
                                <div className={classes.itemGroup} key={itemGroupArrayIndex}>
                                    <div
                                        className={classes.itemGroupBar}
                                        style={{
                                            color: theme.colors.groupTag[itemGroupId % theme.colors.groupTag.length]
                                        }}
                                    >
                                        <span className={classes.itemGroupIcon} onClick={() => dispatch(toggleDeleteGroupModalAction(itemGroupId))}>
                                            <IconX size={16} />
                                        </span>
                                        <Modal opened={deleteGroupModalOpened[itemGroupId]} onClose={() => dispatch(toggleDeleteGroupModalAction(itemGroupId))} title={<span className={classes.modalTitle}>{'Delete this item group?'}</span>} centered>
                                            <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
                                            <span className={classes.modalFooter}>
                                                <Button color='red' onClick={() => onDeleteGroup(itemGroupId, projectId!)}>
                                                    Delete
                                                </Button>
                                            </span>
                                        </Modal>

                                        <span onClick={() => dispatch(toggleItemGroupsCollapsedAction(itemGroupArrayIndex))} className={classes.hovertext} data-hover={itemGroupsCollapsed[itemGroupArrayIndex] ? 'Expand' : 'Collapse'} key={itemGroupArrayIndex}>
                                            {<ItemGroupCollapser size={20} className={itemGroupsCollapsed[itemGroupArrayIndex] ? '' : classes.collapserButton} />}
                                        </span>
                                        <span className={classes.itemCount}>
                                            {itemGroupsInputActive[itemGroupArrayIndex] ? (
                                                <input
                                                    onBlur={() => deselectItemGroupInput(itemGroupArrayIndex)}
                                                    type='text'
                                                    autoFocus
                                                    className={classes.groupNameInput}
                                                    style={{
                                                        borderColor: theme.colors.groupTag[itemGroupId % theme.colors.groupTag.length]
                                                    }}
                                                    value={itemGroupsInputValue[itemGroupArrayIndex]}
                                                    onChange={(e) => changeItemGroupInputValue(itemGroupArrayIndex, e.target.value)}
                                                    onKeyDown={(e) => handleItemGroupInputKeyDown(itemGroupArrayIndex, e.key)}
                                                ></input>
                                            ) : (
                                                <span
                                                    onClick={() => dispatch(selectItemGroupInputAction(itemGroupArrayIndex))}
                                                    className={cx(classes.groupName, classes.hovertext, classes.itemCount)}
                                                    data-hover='Click to edit'
                                                    item-count={itemsOrdersState[itemGroupId].length ? itemsOrdersState[itemGroupId].length + ' item' + `${itemsOrdersState[itemGroupId].length === 1 ? '' : 's'}` : 'No items'}
                                                >
                                                    {itemGroupName}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    {!itemGroupsCollapsed[itemGroupArrayIndex] && (
                                        <div>
                                            <div id={`table_group_${itemGroupId}`} className={classes.tableGroup}>
                                                <div className={classes.tableHead}>
                                                    <div className={classes.tableRow}>
                                                        <div className={classes.tableCell}></div>
                                                        <div className={cx(classes.tableCell, classes.item)}>
                                                            <span>Item</span>
                                                        </div>
                                                        <DndContext sensors={sensors} onDragEnd={(event) => handleDragEndColumn(event, itemGroupId)}>
                                                            <SortableContext items={typesOrdersState[itemGroupId]} strategy={horizontalListSortingStrategy}>
                                                                {typesOrdersState[itemGroupId].map((typeId, index) => (
                                                                    <TableColumnTitle
                                                                        key={typeId}
                                                                        id={typeId}
                                                                        cellColumnType={itemCellsState[itemGroupId][itemsOrdersState[itemGroupId][0]][typeId].typeName}
                                                                        cellColumnCustomName={itemCellsState[itemGroupId][itemsOrdersState[itemGroupId][0]][typeId].elementName}
                                                                        index={index}
                                                                        lastCell={index === typesOrdersState[itemGroupId].length - 1}
                                                                        groupId={itemGroupId}
                                                                    />
                                                                ))}
                                                            </SortableContext>
                                                        </DndContext>
                                                    </div>
                                                </div>
                                                <div className={classes.tableBody}>
                                                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(event) => handleDragEndRow(event, itemGroupId)}>
                                                        <SortableContext items={itemsOrdersState[itemGroupId]} strategy={verticalListSortingStrategy}>
                                                            {itemsOrdersState[itemGroupId].map((itemId, itemIndex) => (
                                                                <TableRow
                                                                    key={'group_' + itemGroupArrayIndex + '_item_' + itemId}
                                                                    itemId={itemId}
                                                                    groupId={itemGroupId}
                                                                    typeOrder={typesOrdersState[itemGroupId]}
                                                                    cellDetails={itemCellsState[itemGroupId][itemId]}
                                                                    color={theme.colors.groupTag[itemGroupId % theme.colors.groupTag.length]}
                                                                    lastRow={itemIndex === itemsOrdersState[itemGroupId].length - 1}
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
                                                        backgroundColor: theme.colors.groupTag[itemGroupId % theme.colors.groupTag.length]
                                                    }}
                                                ></div>
                                                <div className={cx(classes.tableCell, classes.item)}>
                                                    {newItemsInputActive[itemGroupArrayIndex] ? (
                                                        <input
                                                            onBlur={() => deselectNewItemNameInput(itemGroupArrayIndex, itemGroupId)}
                                                            type='text'
                                                            autoFocus
                                                            className={classes.newItemNameInput}
                                                            value={newItemsInputValue[itemGroupArrayIndex]}
                                                            onKeyDown={(e) => handleNewItemNameInputKeyDown(e.key, itemGroupArrayIndex, itemGroupId)}
                                                            onChange={(e) => updateNewItemInputValue(itemGroupArrayIndex, e.target.value)}
                                                        ></input>
                                                    ) : (
                                                        <div className={classes.typeName} onClick={() => toggleNewItemInputSelected(itemGroupArrayIndex)}>
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
            }
        </>
    );
}
