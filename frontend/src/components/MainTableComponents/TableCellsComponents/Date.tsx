import { createStyles } from '@mantine/core';

interface DateProps {
    date: string;
}

const useStyle = createStyles(() => ({
    date: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export function DateCell({ date }: DateProps) {
    const { classes } = useStyle();

    return <div className={classes.date}>{date}</div>;
}
