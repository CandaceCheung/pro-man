import React from 'react';
import { createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { TableState } from '../redux/table/slice';
import { ItemGroupCollapser } from '../components/MainTableComponents/ItemGroupCollapser';

const useStyles = createStyles(theme => ({
    collapser: {
        transform: "rotate(90deg)"
    },

    itemGroup: {
        marginTop: 20,
        padding: 10,

        "> div": {
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10,
            marginBottom: 10,
            display: "flex",

            span: {
                "&:first-of-type": {
                    marginLeft: 10,
                    marginRight: 10,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }
        }
    },

    tableGroup: {
        fontFamily: "Roboto",
        borderCollapse: "collapse",
        borderRadius: 10,
        borderStyle: "hidden",
        boxShadow: "0 0 0 1px #ddd",
        minWidth: getWidth() - 180,
        fontSize: 14,
        margin: 5,

        td: {
            border: "1px solid #ddd",
            paddingLeft: 8,
            paddingRight: 8,
            textAlign: "center"
        },

        th: {
            border: "1px solid #ddd",
            paddingTop: 12,
            paddingBottom: 12,
            textAlign: "left",
            backgroundColor: "#04AA6D",
            color: "#FFFFFF"
        },

        tr: {
            td: {
                '&:first-of-type': {
                    padding: 0,
                    width: 8,
                    border: "none"
                }
            }
        },

        thead: {
            td: {
                padding: 8
            }
        },

        tbody: {
            tr: {
                '&:nth-of-type(even)': {
                    backgroundColor: "#f2f2f2"
                },
                '&:hover': {
                    backgroundColor: "#ddd"
                }
            }
        }

    }
}));

export interface itemCellsElement {
    item_id: TableState["item_id"],
    item_name: TableState["item_name"],
    type_name: TableState["type_name"],
    item_dates_datetime?: TableState["item_dates_datetime"],
    item_money_cashflow?: TableState["item_money_cashflow"],
    item_money_date?: TableState["item_money_date"],
    item_person_name?: TableState["item_person_name"],
    item_status_color?: TableState["item_status_color"],
    item_status_name?: TableState["item_status_name"],
    item_text_text?: TableState["item_text_text"],
    item_times_start_date?: TableState["item_times_start_date"],
    item_times_end_date?: TableState["item_times_end_date"]
}

export interface itemsGroupElement {
    item_group_id: TableState["item_group_id"],
    item_group_name: TableState["item_group_name"],
    item_group_collapsed: boolean
}

export function MainTable() {
    const tableSummary = useAppSelector(state => state.table);
    const projectID = useAppSelector(state => state.project.project_id);
    const [itemCellsState, setItemCellsState] = useState<{ [keys in number]: itemCellsElement[][] }>({});
    const [itemGroupsState, setItemGroupsState] = useState<itemsGroupElement[]>([]);

    const { classes, theme } = useStyles();

    useEffect(() => {
        let itemCells: { [keys in number]: itemCellsElement[][] } = {};
        let itemGroups: itemsGroupElement[] = [];
        let previousItemID: null | number = null;
        for (const cell of tableSummary) {
            if (cell.project_id === projectID) {
                const currentItemID = cell.item_id;
                const itemGroupID = cell.item_group_id;
                let itemCell: itemCellsElement = {
                    item_id: cell.item_id,
                    item_name: cell.item_name,
                    type_name: cell.type_name,
                }
                switch (cell.type_name) {
                    case "dates":
                        itemCell["item_dates_datetime"] = cell.item_dates_datetime;
                        break;
                    case "money":
                        itemCell["item_money_cashflow"] = cell.item_money_cashflow;
                        itemCell["item_money_date"] = cell.item_money_date;
                        break;
                    case "persons":
                        itemCell["item_person_name"] = cell.item_person_name;
                        break;
                    case "status":
                        itemCell["item_status_color"] = cell.item_status_color;
                        itemCell["item_status_name"] = cell.item_status_name;
                        break;
                    case "text":
                        itemCell["item_text_text"] = cell.item_text_text;
                        break;
                    case "times":
                        itemCell["item_times_start_date"] = cell.item_times_start_date;
                        itemCell["item_times_end_date"] = cell.item_times_end_date;
                        break;
                    default:
                        break;
                }
                if (itemCells[itemGroupID]) {
                    if (currentItemID === previousItemID) {
                        itemCells[itemGroupID][itemCells[itemGroupID].length - 1].push(itemCell);
                    } else {
                        previousItemID = currentItemID;
                        itemCells[itemGroupID].push([itemCell]);
                    }
                } else {
                    itemGroups.push({
                        item_group_id: cell.item_group_id,
                        item_group_name: cell.item_group_name,
                        item_group_collapsed: false
                    });
                    previousItemID = currentItemID;
                    itemCells[itemGroupID] = [[itemCell]];
                }
            }
        }
        setItemCellsState(itemCells);
        setItemGroupsState(itemGroups);
    }, [tableSummary, projectID]);

    const toggleItemGroupCollapsed = (index: number) => {
        const newItemGroupState = JSON.parse(JSON.stringify(itemGroupsState));
        setItemGroupsState(newItemGroupState.map((each: itemsGroupElement, i: number) => {
            if (index === i) {
                each.item_group_collapsed = !each.item_group_collapsed;
            }
            return each;
        }));
    }

    return (
        <div className="main-table">
            {
                itemGroupsState.map(({ item_group_id, item_group_name, item_group_collapsed }, itemGroupArrayIndex) => {
                    return (
                        <div
                            className={classes.itemGroup}
                            key={itemGroupArrayIndex}
                        >
                            <div
                                style={{
                                    color: theme.colors.groupTag[item_group_id % theme.colors.groupTag.length],
                                }}
                            >
                                <span
                                    onClick={() => toggleItemGroupCollapsed(itemGroupArrayIndex)}
                                    key={itemGroupArrayIndex}
                                >
                                    {
                                        <ItemGroupCollapser
                                            size={20}
                                            className={item_group_collapsed ? "" : classes.collapser}
                                        />}
                                </span>
                                <span>
                                    {item_group_name}
                                </span>
                            </div>
                            {
                                !item_group_collapsed &&
                                <table
                                    id={`table_group_${item_group_id}`}
                                    className={classes.tableGroup}
                                >
                                    <thead>
                                        <tr>
                                            <td></td>
                                            <td>Item</td>
                                            <td>Persons</td>
                                            <td>Dates</td>
                                            <td>Times</td>
                                            <td>Money</td>
                                            <td>Status</td>
                                            <td>Text</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemCellsState[item_group_id].map((row, rowIndex) => {
                                                return (
                                                    <tr
                                                        key={"row" + rowIndex}
                                                    >
                                                        <td style={{ backgroundColor: theme.colors.groupTag[item_group_id] }}></td>
                                                        <td>
                                                            {row[0].item_name}
                                                        </td>
                                                        {
                                                            row.map((cell, cellIndex) => {
                                                                return retrieveCellData(cell, cellIndex)
                                                            })
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            }
                        </div>
                    )
                })
            }
        </div>
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

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}