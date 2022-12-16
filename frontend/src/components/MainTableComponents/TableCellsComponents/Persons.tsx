import { createStyles } from '@mantine/core';

interface PersonsProps {
    itemPersonsNames: string[],
    itemPersonsIds: number[],
    personsColors: { [key in number]: string }
}

const useStyles = createStyles(() => ({
    personsComponentsContainer: {
        position: "relative",
        width: "100%",
        height: "100%"
    },

    personsComponent: {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
        borderRadius: 50,
        width: 30,
        height: 30,
        color: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
        border: "2px solid #fff"
    },

    personsSingleComponent: {
        left: "50%"
    },

    personsFirstComponent: {
        left: "calc(50% - 10px)",
        zIndex: 1
    },

    personsSecondComponent: {
        left: "calc(50% + 10px)",
        zIndex: 2
    },

    personsMultipleComponent: {
        left: "calc(50% + 10px)",
        zIndex: 2,
        fontSize: 11,
        fontWeight: "normal"
    }
}));

export function Persons({ itemPersonsNames, itemPersonsIds, personsColors }: PersonsProps) {    
    const { classes, cx } = useStyles();

    switch (itemPersonsNames.length) {
        case 0:
            return <span className={classes.personsComponentsContainer}></span>
        case 1:
            return (
                <span className={classes.personsComponentsContainer}>
                    <span
                        className={cx(classes.personsComponent, classes.personsSingleComponent)}
                        style={{
                            backgroundColor: personsColors[itemPersonsIds[0]]
                        }}
                    >
                        {itemPersonsNames[0][0].toUpperCase()}
                    </span>
                </span>
            )
        case 2:
            return (
                <span className={classes.personsComponentsContainer}>
                    {itemPersonsNames.map((name, index) => {
                        const userId = itemPersonsIds[index];
                        const initial = name[0].toUpperCase();
                        return (
                            <span
                                key={"person_" + userId}
                                className={
                                    index
                                        ?
                                        cx(classes.personsComponent, classes.personsSecondComponent)
                                        :
                                        cx(classes.personsComponent, classes.personsFirstComponent)
                                }
                                style={{
                                    backgroundColor: personsColors[itemPersonsIds[index]]
                                }}
                            >
                                {initial}
                            </span>
                        )
                    })}
                </span>
            )
        default:
            return (
                <span className={classes.personsComponentsContainer}>
                    <span
                        key={"person_" + itemPersonsIds[0]}
                        className={cx(classes.personsComponent, classes.personsFirstComponent)}
                        style={{ backgroundColor: personsColors[itemPersonsIds[0]] }}
                    >
                        {itemPersonsNames[0][0].toUpperCase()}
                    </span>
                    <span
                        key={"person_multiple"}
                        className={cx(classes.personsComponent, classes.personsMultipleComponent)}
                        style={{ backgroundColor: "#323232" }}
                    >
                        {`+${itemPersonsNames.length - 1}`}
                    </span>
                </span>
            )
    }
}