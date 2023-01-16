import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { itemCellsElement, MembersFullName } from '../../pages/MainTable';
import { Persons } from './TableCellsComponents/Persons';
import { useStyles } from './styles';
import { TextCell } from './TableCellsComponents/Text';
import { Status } from './TableCellsComponents/Status';
import { Times } from './TableCellsComponents/Times';
import { DateCell } from './TableCellsComponents/Date';
import { Money } from './TableCellsComponents/Money';
import { Item } from './TableCellsComponents/Item';
import { IconX } from '@tabler/icons';
import { Button, Modal } from '@mantine/core';
import { useState } from 'react';

export interface TableRowProps {
    itemId: number;
    groupId: number;
    typeOrder: number[];
    cellDetails: { [key in number]: itemCellsElement };
    color: string;
    lastRow: boolean;
    personsColors: { [key in number]: string };
    membersFullName: Record<number, MembersFullName>;
    onItemRename: (groupId: number, itemId: number, name: string) => void;
    onTextChange: (groupId: number, itemId: number, typeId: number, text: string) => void;
    onStatusChange: (
        groupId: number,
        itemId: number,
        stateId: number,
        typeId: number,
        name: string,
        color: string
    ) => void;
    onRemovePerson: (groupId: number, itemId: number, typeId: number, personId: number) => void;
    onAddPerson: (groupId: number, itemId: number, typeId: number, personId: number) => void;
    onAddTransaction: (groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) => void;
    onDeleteTransaction: (groupId: number, itemId: number, typeId: number, transactionId: number) => void;
    onDeleteItem: (groupId: number, itemId: number) => void;
}

export function TableRow({
    itemId,
    groupId,
    typeOrder,
    cellDetails,
    color,
    lastRow,
    personsColors,
    membersFullName,
    onItemRename,
    onTextChange,
    onStatusChange,
    onRemovePerson,
    onAddPerson,
    onAddTransaction,
    onDeleteTransaction,
    onDeleteItem
}: TableRowProps) {
    const [deleteItemModalOpened, setDeleteItemModalOpened] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: itemId });

    const { classes, cx } = useStyles();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const retrieveCellData = (cell: itemCellsElement, cellIndex: number): JSX.Element => {
        switch (cell.type_name) {
            case 'persons':
                return (
                    <div className={cx(classes.tableCell, classes.persons)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Persons
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.type_id}
                            itemPersonsIds={cell.item_person_user_id!}
                            personsColors={personsColors}
                            membersFullName={membersFullName}
                            onRemovePerson={onRemovePerson}
                            onAddPerson={onAddPerson}
                        />
                    </div>
                );
            case 'dates':
                return (
                    <div className={cx(classes.tableCell, classes.dates)} key={'item' + itemId + 'cell' + cellIndex}>
                        <DateCell date={cell.item_dates_date!} />
                    </div>
                );
            case 'money':
                return (
                    <div className={cx(classes.tableCell, classes.money)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Money
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.type_id}
                            transactionIds={cell.transaction_id!}
                            cashFlows={cell.item_money_cashflow!}
                            transactionDates={cell.item_money_date!}
                            onAddTransaction={onAddTransaction}
                            onDeleteTransaction={onDeleteTransaction}
                        />
                    </div>
                );
            case 'times':
                return (
                    <div className={cx(classes.tableCell, classes.times)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Times startDate={cell.item_times_start_date} endDate={cell.item_times_end_date} />
                    </div>
                );
            case 'status':
                return (
                    <div className={cx(classes.tableCell, classes.status)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Status
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.type_id}
                            status={cell.item_status_name!}
                            color={cell.item_status_color!}
                            onStatusChange={onStatusChange}
                        />
                    </div>
                );
            case 'text':
                return (
                    <div className={cx(classes.tableCell, classes.text)} key={'item' + itemId + 'cell' + cellIndex}>
                        <TextCell
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.type_id}
                            text={cell.item_text_text!}
                            onTextChange={onTextChange}
                        />
                    </div>
                );
            default:
                return <div key={'item' + itemId + 'cell' + cellIndex}></div>;
        }
    };

    const handleDeleteItem = () => {
        setDeleteItemModalOpened(false);
        onDeleteItem(groupId, itemId);
    };

    return (
        <div
            className={cx(classes.tableRow, { [classes.lastRow]: lastRow })}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <div className={classes.tableCell} style={{ backgroundColor: color }}></div>
            <div className={cx(classes.tableCell, classes.item)}>
                <Item
                    itemId={itemId}
                    groupId={groupId}
                    itemName={cellDetails[typeOrder[0]].item_name}
                    onItemRename={onItemRename}
                />
            </div>
            {typeOrder.map((typeId, cellIndex) => {
                return retrieveCellData(cellDetails[typeId], cellIndex);
            })}
            <Modal
                opened={deleteItemModalOpened}
                onClose={() => setDeleteItemModalOpened(false)}
                title={<span className={classes.modalTitle}>{'Delete this item?'}</span>}
                centered
            >
                <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
                <span className={classes.modalFooter}>
                    <Button color='red' onClick={handleDeleteItem}>
                        Delete
                    </Button>
                </span>
            </Modal>

            <span className={classes.rowIcon} onClick={() => setDeleteItemModalOpened(true)}>
                <IconX size={16} />
            </span>
        </div>
    );
}
