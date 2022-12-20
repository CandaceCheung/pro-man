import { createStyles } from '@mantine/core';

interface DateProps {
    date: string,
    datetime: string
}

const useStyle = createStyles(() => ({
    date: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

export function DateCell({ date, datetime }: DateProps) {
    const { classes } = useStyle();

    return (
        <div className={classes.date}>
            {date}
        </div>
    )
}