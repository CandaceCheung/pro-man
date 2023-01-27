import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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
import { ItemCell } from '../../redux/table/slice';

export interface TableRowProps {
    itemId: number;
    groupId: number;
    typeOrder: number[];
    cellDetails: { [key in number]: ItemCell };
    color: string;
    lastRow: boolean;
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

    const retrieveCellData = (cell: ItemCell, cellIndex: number): JSX.Element => {
        switch (cell.typeName) {
            case 'persons':
                return (
                    <div className={cx(classes.tableCell, classes.persons)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Persons
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.typeId}
                        />
                    </div>
                );
            case 'dates':
                return (
                    <div className={cx(classes.tableCell, classes.dates)} key={'item' + itemId + 'cell' + cellIndex}>
                        <DateCell date={cell.itemDatesDate!} />
                    </div>
                );
            case 'money':
                return (
                    <div className={cx(classes.tableCell, classes.money)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Money
                            groupId={groupId}
                            itemId={itemId}
                            typeId={cell.typeId}
                            transactionIds={cell.transactionId!}
                            cashFlows={cell.itemMoneyCashflow!}
                            transactionDates={cell.itemMoneyDate!}
                            onAddTransaction={onAddTransaction}
                            onDeleteTransaction={onDeleteTransaction}
                        />
                    </div>
                );
            case 'times':
                return (
                    <div className={cx(classes.tableCell, classes.times)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Times startDate={cell.itemTimesStartDate} endDate={cell.itemTimesEndDate} />
                    </div>
                );
            case 'status':
                return (
                    <div className={cx(classes.tableCell, classes.status)} key={'item' + itemId + 'cell' + cellIndex}>
                        <Status groupId={groupId} itemId={itemId} typeId={cell.typeId} status={cell.itemStatusName!} color={cell.itemStatusColor!} />
                    </div>
                );
            case 'text':
                return (
                    <div className={cx(classes.tableCell, classes.text)} key={'item' + itemId + 'cell' + cellIndex}>
                        <TextCell groupId={groupId} itemId={itemId} typeId={cell.typeId} text={cell.itemTextText!} />
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
        <div className={cx(classes.tableRow, { [classes.lastRow]: lastRow })} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className={classes.tableCell} style={{ backgroundColor: color }}></div>
            <div className={cx(classes.tableCell, classes.item)}>
                <Item itemId={itemId} groupId={groupId} itemName={cellDetails[typeOrder[0]].itemName} />
            </div>
            {typeOrder.map((typeId, cellIndex) => {
                return retrieveCellData(cellDetails[typeId], cellIndex);
            })}
            <Modal opened={deleteItemModalOpened} onClose={() => setDeleteItemModalOpened(false)} title={<span className={classes.modalTitle}>{'Delete this item?'}</span>} centered>
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
