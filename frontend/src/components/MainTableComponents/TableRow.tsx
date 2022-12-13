import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { itemCellsElement } from "../../pages/MainTable";

export interface TableRowProps {
    id: string,
    row: itemCellsElement[],
    color: string
}

export function TableRow(props: TableRowProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

    return (
        <tr ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <td style={{ backgroundColor: props.color }}></td>
            <td>
                {props.row[0].item_name}
            </td>
            {
                props.row.map((cell, cellIndex) => {
                    return retrieveCellData(cell, cellIndex)
                })
            }
        </tr>
    )
}

function retrieveCellData(cell: itemCellsElement, cellIndex: number): JSX.Element {
    switch (cell.type_name) {
        case "persons":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    {cell.item_person_name}
                </td>
            )
        case "dates":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    {cell.item_dates_datetime}
                </td>
            )
        case "money":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    <span>{cell.item_money_date}</span>
                    <span>{cell.item_money_cashflow}</span>
                </td>
            )
        case "times":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    <div>{"Start:" + cell.item_times_start_date}</div>
                    <div>{"End:" + cell.item_times_end_date}</div>
                </td>
            )
        case "status":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    <div>{"Status:" + cell.item_status_name}</div>
                    <div>{"Color:" + cell.item_status_color}</div>
                </td>
            )
        case "text":
            return (
                <td
                    key={"cell" + cellIndex}
                >
                    {cell.item_text_text}
                </td>
            )
        default:
            return (
                <td
                    key={"cell" + cellIndex}
                ></td>
            )
    }
}