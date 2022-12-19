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
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 160,
        height: 25,
        backgroundColor: theme.colors.dateBarColor[1],
        color: "#fff",
        fontSize: 10,
        borderRadius: 50,
        "&:hover::before": {
            opacity: 1,
            visibility: "visible"
        },
        "&::before": {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 160,
            height: 25,
            backgroundColor: theme.colors.dateBarColor[2],
            color: "#fff",
            fontSize: 10,
            borderRadius: 50,
            content: "attr(data-hover)",
            visibility: "hidden",
            opacity: 0,
            zIndex: 1,
            left: 0,
            top: 0
        }
    },

    emptyBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        height: 160,
        backgroundColor: theme.colors.dateBarColor[3],
        color: "#fff",
        fontSize: 10,
        borderRadius: 50,
        "&:hover::before": {
            opacity: 1,
            visibility: "visible"
        },
        "&::before": {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 160,
            height: 25,
            backgroundColor: theme.colors.dateBarColor[4],
            color: "#fff",
            fontSize: 10,
            borderRadius: 50,
            content: "Set Dates",
            visibility: "hidden",
            opacity: 0,
            zIndex: 1,
            left: 0,
            top: 0
        }
    }
}));

export function Times({ startDate, endDate }: TimesProps) {
    const { classes, theme } = useStyle();
    let pastTime = null;
    let barLeftPercentage = null;
    let totalDays = null;
    const timeNow = new Date(new Date().toDateString()).getTime();
    if (startDate && endDate) {
        pastTime = (timeNow - startDate) / (endDate - startDate);
        if (pastTime < 0) {
            barLeftPercentage = "0%";
        } else if (pastTime >= 1) {
            barLeftPercentage = "100%";
        } else {
            barLeftPercentage = (roundToTen(pastTime * 100)).toString() + "%";
        }
        totalDays = (endDate - startDate) / (1000*60*60*24);
    }
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
                    data-hover={
                        totalDays === 1
                        ?
                        totalDays + " day"
                        :
                        totalDays + " days"
                    }
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