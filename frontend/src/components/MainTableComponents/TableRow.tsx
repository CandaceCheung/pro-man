import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { itemCellsElement } from "../../pages/MainTable";
import { Persons } from "./TableCellsComponents/Persons";
import { useStyles } from "./styles";
import { Text } from "./TableCellsComponents/Text";

export interface TableRowProps {
    id: number,
    rowOrder: number[],
    cellDetails: {[key in number]: itemCellsElement},
    color: string,
    lastRow: boolean,
    personsColors: {[key in string]: string}
}

export function TableRow({id, rowOrder, cellDetails, color, lastRow, personsColors}: TableRowProps) {
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
                        {cell.item_dates_datetime}
                    </div>
                )
            case "money":
                return (
                    <div
                        className={cx(classes.tableCell, classes.money)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <span>{cell.item_money_date}</span>
                        <span>{cell.item_money_cashflow}</span>
                    </div>
                )
            case "times":
                return (
                    <div
                        className={cx(classes.tableCell, classes.times)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <div>{"Start:" + cell.item_times_start_date}</div>
                        <div>{"End:" + cell.item_times_end_date}</div>
                    </div>
                )
            case "status":
                return (
                    <div
                        className={cx(classes.tableCell, classes.status)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <div>{"Status:" + cell.item_status_name}</div>
                        <div>{"Color:" + cell.item_status_color}</div>
                    </div>
                )
            case "text":
                return (
                    <div
                        className={cx(classes.tableCell, classes.text)}
                        key={"item" + id + "cell" + cellIndex}
                    >
                        <Text text={cell.item_text_text!}></Text>
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
                {cellDetails[rowOrder[0]].item_name}
            </div>
            {
                rowOrder.map((typeId, cellIndex) => {
                    return retrieveCellData(cellDetails[typeId], cellIndex)
                })
            }
        </div>
    )
}