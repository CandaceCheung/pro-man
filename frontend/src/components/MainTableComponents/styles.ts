import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
    collapserButton: {
        transform: "rotate(90deg)"
    },

    hovertext: {
        position: "relative",

        "&:hover::before": {
            opacity: 1,
            visibility: "visible"
        },
        "&::before": {
            content: "attr(data-hover)",
            visibility: "hidden",
            opacity: 0,
            width: "max-content",
            backgroundColor: "black",
            color: "#fff",
            textAlign: "center",
            borderRadius: 5,
            padding: "5px 5px",
            transition: "opacity 0.5s ease-in-out",
            position: "absolute",
            zIndex: 1,
            left: "50%",
            top: "-110%",
            transform: "translate(-50%, 0)",
            fontSize: 10
        }
    },

    itemCount: {
        position: "relative",
        "&:hover::after": {
            opacity: 1,
            visibility: "visible"
        },
        "&::after": {
            content: "attr(item-count)",
            visibility: "hidden",
            opacity: 0,
            width: "max-content",
            color: "#676879",
            textAlign: "center",
            position: "absolute",
            zIndex: 1,
            left: "110%",
            top: "50%",
            transform: "translate(0, -50%)",
            fontSize: 15,
            fontWeight: "normal"
        }

    },

    itemGroup: {
        marginTop: 20,
        padding: 10,

        "> div:first-of-type": {
            fontWeight: "bold",
            fontSize: 18,
            marginLeft: 10,
            marginBottom: 10,
            display: "flex",

            "> span": {
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

    groupNameInput: {
        width: "100%",
        transition: "0.5s",
        outline: "none",
        border: "1px solid",
        borderRadius: 5,
        boxSizing: "border-box",
        height: 12,
        color: "inherit",
        fontSize: "inherit",
        fontFamily: "inherit",
        fontWeight: "inherit",

        "&:focus": {
            width: "100%",
            transition: "0.5s",
            outline: "none",
            border: "1px solid",
            borderRadius: 5,
            minHeight: 30,
            boxSizing: "border-box",
            height: 12,
        }
    },

    groupName: {
        border: "1px solid transparent",
        borderRadius: 5,

        "&:hover": {
            border: `1px solid ${theme.colors.borderColor[0]}`
        }
    },

    tableGroup: {
        fontFamily: "Roboto",
        borderRadius: 10,
        boxShadow: `0 0 0 1px ${theme.colors.borderColor[0]}`,
        fontSize: 12,
        margin: 5,
        display: "flex",
        flexDirection: "column",
        width: "max-content"
    },

    tableCell: {
        ref: getRef("tableCell"),
        border: `1px solid ${theme.colors.borderColor[0]}`,
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: "center",
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
    },

    item: {
        width: 200
    },
    persons: {
        width: 98
    },
    dates: {
        width: 140
    },
    times: {
        width: 188
    },
    money: {
        width: 140
    },
    status: {
        width: 140
    },
    text: {
        width: 140
    },

    tableRow: {
        ref: getRef("tableRow"),
        display: "flex",
        [`& > .${getRef('tableCell')}`]: {
            "&:first-of-type": {
                padding: 0,
                width: 8,
                border: "none"
            }
        }
    },

    tableHead: {
        display: "flex",
        flexDirection: "column",

        [`& .${getRef('tableRow')}`]: {
            [`& > .${getRef('tableCell')}:first-of-type`]: {
                borderTopLeftRadius: 10,
                borderLeft: `1px solid ${theme.colors.borderColor[0]}`,
                borderTop: `1px solid ${theme.colors.borderColor[0]}`
            }
        }
    },

    tableBody: {
        display: "flex",
        flexDirection: "column",

        [`& > .${getRef('tableRow')}`]: {
            '&:hover': {
                cursor: "pointer",
                backgroundColor: `${theme.colors.boardContentBackgroundColor[0]}`,
                boxShadow: `0 5px 15px 1px ${theme.colors.borderColor[0]}`
            },
            "&:active": {
                cursor: "grabbing"
            }
        },
    },

    lastRow: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

        [`& .${getRef('tableCell')}:first-of-type`]: {
            borderBottomLeftRadius: 10
        },
        [`& .${getRef('tableCell')}:last-of-type`]: {
            borderBottomRightRadius: 10
        }
    },

    lastCell: {
        borderTopRightRadius: 10
    },

    draggableTitleCell: {
        "&:hover": {
            cursor: "grab",
            backgroundColor: `${theme.colors.boardContentBackgroundColor[0]}`
        },
        "&:active": {
            cursor: "grabbing"
        }
    }
}));
