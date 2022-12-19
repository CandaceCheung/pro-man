import { createStyles } from '@mantine/core';

interface DateProps {
    date: string
}

const useStyle = createStyles(() => ({
    dateContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Date({ date }: DateProps) {
    const { classes } = useStyle();
    return (
        <span className={classes.dateContainer}>
            {date}
        </span>
    )
}