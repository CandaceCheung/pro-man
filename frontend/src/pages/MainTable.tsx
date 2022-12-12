import React from 'react';
import { createStyles } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { TableState } from '../redux/table/slice';

const useStyles = createStyles(theme => ({
    itemGroup: {
        marginTop: 20,
        padding: 10,

        "> div": {
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10,
            marginBottom: 10
        }
    },

    tableGroup: {
        fontFamily: "Roboto",
        borderCollapse: "collapse",
        borderRadius: 10,
        borderStyle: "hidden",
        boxShadow: "0 0 0 1px #ddd",
        width: "95%",
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
                '&:first-child': {
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
                '&:nth-child(even)': {
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
                        item_group_name: cell.item_group_name
                    });
                    previousItemID = currentItemID;
                    itemCells[itemGroupID] = [[itemCell]];
                }
            }
        }
        setItemCellsState(itemCells);
        setItemGroupsState(itemGroups);
    }, [tableSummary, projectID]);

    return (
        <div className="main-table">
            {
                itemGroupsState.map(({ item_group_id, item_group_name }) => {
                    return (
                        <div
                            className={classes.itemGroup}
                        >
                            <div
                                style={{ color: theme.colors.groupTag[item_group_id] }}
                            >
                                {item_group_name}
                            </div>
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
                                        itemCellsState[item_group_id].map((row) => {
                                            return (
                                                <tr>
                                                    <td style={{ backgroundColor: theme.colors.groupTag[item_group_id] }}></td>
                                                    <td>
                                                        {row[0].item_name}
                                                    </td>
                                                    {
                                                        row.map(cell => {
                                                            return retrieveCellData(cell)
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </div>
    )
}

function retrieveCellData(cell: itemCellsElement): JSX.Element {
    switch (cell.type_name) {
        case "persons":
            return (
                <td>
                    {cell.item_person_name}
                </td>
            )
        case "dates":
            return (
                <td>
                    {cell.item_dates_datetime}
                </td>
            )
        case "money":
            return (
                <td>
                    <span>{cell.item_money_date}</span>
                    <span>{cell.item_money_cashflow}</span>
                </td>
            )
        case "times":
            return (
                <td>
                    <div>{"Start:" + cell.item_times_start_date}</div>
                    <div>{"End:" + cell.item_times_end_date}</div>
                </td>
            )
        case "status":
            return (
                <td>
                    <div>{"Status:" + cell.item_status_name}</div>
                    <div>{"Color:" + cell.item_status_color}</div>
                </td>
            )
        case "text":
            return (
                <td>
                    {cell.item_text_text}
                </td>
            )
        default:
            return (
                <td></td>
            )
    }
}