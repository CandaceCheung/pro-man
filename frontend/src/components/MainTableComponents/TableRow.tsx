import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { itemCellsElement } from "../../pages/MainTable";
import { Persons } from "./TableCellsComponents/Persons";
import { useStyles } from "./styles";
import { TextCell } from "./TableCellsComponents/Text";
import { Status } from "./TableCellsComponents/Status";
import { Times } from "./TableCellsComponents/Times";
import { DateCell } from "./TableCellsComponents/Date";
import { Money } from "./TableCellsComponents/Money";
import { Item } from "./TableCellsComponents/Item";

export interface TableRowProps {
    id: number,
    groupId: number,
    typeOrder: number[],
    cellDetails: { [key in number]: itemCellsElement },
    color: string,
    lastRow: boolean,
    personsColors: { [key in number]: string },
    moneySums: { [key in number]: number },
    onItemRename: (groupId: number, itemId: number, name: string) => void,
    onTextChange: (groupId: number, itemId: number, typeId: number, text: string) => void
}

export function TableRow({ 
    id, groupId, typeOrder, cellDetails, color, lastRow, personsColors, moneySums, 
    onItemRename, onTextChange 
}: TableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const { classes, cx } = useStyles();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const retrieveCellData = (cell: itemCellsElement, cellIndex: number): JSX.Element => {
        switch (cell.type_name) {
            case "persons":
                return (
                    <div
                        className={cx(classes.tableCell, classes.persons)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <Persons
                            itemPersonsNames={cell.item_person_name!}
                            itemPersonsIds={cell.item_person_user_id!}
                            personsColors={personsColors}
                        />
                    </div>
                )
            case "dates":
                return (
                    <div
                        className={cx(classes.tableCell, classes.dates)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <DateCell date={cell.item_dates_date!} />
                    </div>
                )
            case "money":
                return (
                    <div
                        className={cx(classes.tableCell, classes.money)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <Money moneySum={moneySums[id]} />
                    </div>
                )
            case "times":
                return (
                    <div
                        className={cx(classes.tableCell, classes.times)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <Times startDate={cell.item_times_start_date} endDate={cell.item_times_end_date} />
                    </div>
                )
            case "status":
                return (
                    <div
                        className={cx(classes.tableCell, classes.status)}
                        key={"item" + id + "cell" + cellIndex}
                    >   
                        <Status status={cell.item_status_name!} color={cell.item_status_color!}></Status>
                    </div>
                )
            case "text":
                return (
                    <div
                        className={cx(classes.tableCell, classes.text)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <TextCell groupId={groupId} itemId={id} typeId={cell.type_id} text={cell.item_text_text!} onTextChange={onTextChange}></TextCell>
                    </div>
                )
            default:
                return (
                    <div
                        key={"item" + id + "cell" + cellIndex}
                    ></div>
                )
        }
    }

    return (
        <div
            className={cx(classes.tableRow, { [classes.lastRow]: lastRow })}
            ref={setNodeRef} style={style} {...listeners} {...attributes}
        >
            <div
                className={classes.tableCell}
                style={{ backgroundColor: color }}
            ></div>
            <div className={cx(classes.tableCell, classes.item)}>
                <Item itemId={id} groupId={groupId} itemName={cellDetails[typeOrder[0]].item_name} onItemRename={onItemRename} />
            </div>
            {
                typeOrder.map((typeId, cellIndex) => {
                    return retrieveCellData(cellDetails[typeId], cellIndex)
                })
            }
        </div>
    )
}