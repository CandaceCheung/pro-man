import { createStyles } from '@mantine/core';

interface StatusProps {
    status: string,
    color: string
}

const useStyle = createStyles(() => ({
    statusContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        width: "100%",
        height: "100%"
    }
}));

export function Status({ status, color }: StatusProps) {
    const { classes } = useStyle();
    return (
        <span 
            className={classes.statusContainer}
            style={{backgroundColor: color}}
        >
            {status === "Empty" ? "" : status}
        </span>
    )
}