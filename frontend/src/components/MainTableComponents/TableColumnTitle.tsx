import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useStyles } from "./styles";

export interface TableColumnTitleProps {
    id: number,
    cellColumnType: string,
    cellColumnCustomName: string,
    index: number,
    lastCell: boolean
}

export function TableColumnTitle({ id, cellColumnType, cellColumnCustomName, index, lastCell }: TableColumnTitleProps) {
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
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.persons, classes.draggableTitleCell,{ [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
            case "dates":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.dates, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
            case "money":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.money, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
            case "times":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.times, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
            case "status":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.status, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
            case "text":
                return <div key={"cell_column" + index} className={cx(classes.tableCell, classes.text, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}><span className={classes.typeName}>{cellColumnCustomName}</span></div>
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