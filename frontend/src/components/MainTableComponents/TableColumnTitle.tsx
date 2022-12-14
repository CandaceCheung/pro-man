import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useStyles } from "./styles";

export interface TableColumnTitleProps {
    id: number,
    cellColumnType: string,
    index: number
}

export function TableColumnTitle({ id, cellColumnType, index }: TableColumnTitleProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const { classes, cx } = useStyles();

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    const retrieveCellData = (cellColumnType: string, index: number): JSX.Element => {
        switch (cellColumnType) {
            case "persons":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.persons)}>Persons</div>
            case "dates":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.dates)}>Dates</div>
            case "money":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.money)}>Money</div>
            case "times":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.times)}>Times</div>
            case "status":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.status)}>Status</div>
            case "text":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.text)}>Text</div>
            default:
                return <div key={"cell_column" + index}></div>
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {retrieveCellData(cellColumnType, index)}
        </div>
    )
}