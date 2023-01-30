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
import { useState } from 'react';
import { ItemCell, openItemModalAction } from '../../redux/table/slice';
import { useAppDispatch, useAppSelector } from '../../store';

export interface TableRowProps {
    itemId: number;
    groupId: number;
    typeOrder: number[];
    cellDetails: { [key in number]: ItemCell };
    color: string;
    lastRow: boolean;
}

export function TableRow({ itemId, groupId, typeOrder, cellDetails, color, lastRow }: TableRowProps) {
    const itemCellsState = useAppSelector((state) => state.table.itemCells);
    const [deleteItemModalOpened, setDeleteItemModalOpened] = useState(false);

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: itemId });
    const dispatch = useAppDispatch();
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
                        <Persons groupId={groupId} itemId={itemId} typeId={cell.typeId} />
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
                        <Money groupId={groupId} itemId={itemId} typeId={cell.typeId} transactionIds={cell.transactionId!} cashFlows={cell.itemMoneyCashflow!} transactionDates={cell.itemMoneyDate!} />
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

    return (
        <div className={cx(classes.tableRow, { [classes.lastRow]: lastRow })} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className={classes.tableCell} style={{ backgroundColor: color }}></div>
            <div className={cx(classes.tableCell, classes.item)}>
                <Item itemId={itemId} groupId={groupId} itemName={cellDetails[typeOrder[0]].itemName} />
            </div>
            {typeOrder.map((typeId, cellIndex) => {
                return retrieveCellData(cellDetails[typeId], cellIndex);
            })}

            <span className={classes.rowIcon} onClick={() => dispatch(openItemModalAction({groupId, itemId}))}>
                <IconX size={16} />
            </span>
        </div>
    );
}
