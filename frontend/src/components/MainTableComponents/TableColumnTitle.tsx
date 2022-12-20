import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";
import { useStyles } from "./styles";

export interface TableColumnTitleProps {
    id: number,
    cellColumnType: string,
    cellColumnCustomName: string,
    index: number,
    lastCell: boolean,
    onTypeRename: (typeId: number, name: string) => void
}

export function TableColumnTitle({ id, cellColumnType, cellColumnCustomName, index, lastCell, onTypeRename }: TableColumnTitleProps) {
    const [typeNameInput, setTypeNameInput] = useState(cellColumnCustomName);
    const [typeNameInputSelected, setTypeNameInputSelected] = useState(false);
    const { classes, cx } = useStyles();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    const retrieveCellData = (cellColumnType: string, index: number) => {
        switch (cellColumnType) {
            case "persons":
                return cx(classes.tableCell, classes.persons, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            case "dates":
                return cx(classes.tableCell, classes.dates, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            case "money":
                return cx(classes.tableCell, classes.money, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            case "times":
                return cx(classes.tableCell, classes.times, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            case "status":
                return cx(classes.tableCell, classes.status, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            case "text":
                return cx(classes.tableCell, classes.text, classes.draggableTitleCell, { [classes.lastCell]: lastCell })
            default:
                return ""
        }
    }

    const onSelectTypeInput = () => {
        setTypeNameInputSelected(true);
    }

    const deselectTypeNameInput = () => {
        if (typeNameInput !== cellColumnCustomName) {
            if (typeNameInput) {
                onTypeRename(id, typeNameInput);
            } else {
                setTypeNameInput(cellColumnCustomName);
            }
        }
        setTypeNameInputSelected(false);
    }

    const handleTypeNameInputKeyDown = (key: string) => {
        if (key === "Enter") {
            deselectTypeNameInput();
        }
    }

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div 
                key={"cell_column" + index}
                className={retrieveCellData(cellColumnType, index)}
            >
                <div
                    className={cx(classes.typeNameContainer, classes.draggableTitleCell, { [classes.lastCell]: lastCell })}
                >
                    {
                        typeNameInputSelected
                            ?
                            <input
                                onBlur={deselectTypeNameInput}
                                type="text"
                                autoFocus
                                className={classes.typeNameInput}
                                value={typeNameInput}
                                onKeyDown={(e) => handleTypeNameInputKeyDown(e.key)}
                                onChange={(e) => setTypeNameInput(e.target.value)}
                            >

                            </input>
                            :
                            <span
                                className={classes.typeName}
                                onClick={onSelectTypeInput}
                            >
                                {cellColumnCustomName}
                            </span>
                    }
                </div>
            </div>
        </div>
    )
}