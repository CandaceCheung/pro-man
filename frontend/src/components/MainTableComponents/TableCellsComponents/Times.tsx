import { format } from "date-fns";
import { createStyles } from '@mantine/core';

interface TimesProps {
    startDate: number,
    endDate: number
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
        backgroundColor: theme.colors.dateBarColor[1],
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
    const { classes, theme } = useStyle();
    const timeNow = new Date(new Date().toDateString()).getTime();
    const pastTime = startDate && endDate 
                    ? (timeNow - startDate) / (endDate - startDate)
                    : 0;
    let barLeftPercentage = "";
    if (pastTime < 0) {
        barLeftPercentage = "0%";
    } else if (pastTime >= 1) {
        barLeftPercentage = "100%";
    } else {
        barLeftPercentage = (roundToTen(pastTime * 100)).toString() + "%";
    }
    const startDateString = new Date(startDate).toDateString();
    const endDateString = new Date(endDate).toDateString();
    return (
        <span className={classes.dateContainer}>
            {
                (startDate && endDate) 
                ?
                <span 
                    className={classes.dateBar}
                    style={{
                        backgroundImage: `linear-gradient(to right, transparent ${barLeftPercentage}, ${theme.colors.dateBarColor[0]} ${barLeftPercentage})`,
                    }}
                >   
                    {`${format(new Date(Number(startDate)), 'MMM dd')} - ${format(new Date(Number(endDate)), 'MMM dd')}`}
                </span>
                :
                <span className={classes.emptyBar}>-</span>
            }
        </span>
    )
}

function roundToTen(number: number): number {
    return Math.floor(number / 10) * 10;
}