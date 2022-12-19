import { createStyles } from '@mantine/core';

interface StatusProps {
    status: string,
    color: string
}

const useStyle = createStyles((theme, _params) => ({
    statusContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        width: "100%",
        height: "100%",

        "&::before": {
            position: "absolute",
            content: "''",
            top: 0,
            right: 0,
            borderStyle: "solid",
            width: 0,
            borderWidth: 0,
            borderColor: "#fff #fff rgba(0,0,0,0.2) rgba(0,0,0,0.2)",
            borderRadius: "0 0 5px 0",
            transition: "border-width .2s"
        },

        "&:hover::before": {
            transitionDelay: ".2s",
            borderWidth: 5
        }
    }
}));

export function Status({ status, color }: StatusProps) {
    const { classes } = useStyle();
    return (
        <div 
            className={classes.statusContainer}
            style={{backgroundColor: color}}
        >
            {status === "Empty" ? "" : status}
        </div>
    )
}