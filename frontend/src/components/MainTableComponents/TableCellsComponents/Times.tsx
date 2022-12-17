import { format } from "date-fns";
import { createStyles } from '@mantine/core';

interface TimesProps {
    startDate?: number,
    endDate?: number
}

const useStyle = createStyles((theme) => ({
    dateContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },

    dateBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 160,
        height: 25,
        backgroundColor: theme.colors.dateBarColor[0],
        color: "#fff",
        fontSize: 10,
        borderRadius: 50
    },

    emptyBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 160,
        backgroundColor: theme.colors.dateBarColor[2],
        color: "#fff",
        fontSize: 10,
        borderRadius: 50
    }
}));

export function Times({ startDate, endDate }: TimesProps) {
    const { classes } = useStyle();
    return (
        <span className={classes.dateContainer}>
            {
                (startDate && endDate) 
                ?
                <span className={classes.dateBar}>
                    {`${format(new Date(startDate*1000), 'MMM dd')} - ${format(new Date(endDate*1000), 'MMM dd')}`}
                </span>
                :
                <span className={classes.emptyBar}>-</span>
            }
        </span>
    )
}