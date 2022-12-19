import { createStyles } from '@mantine/core';

interface MoneyProps {
    moneySum: number
}

const useStyle = createStyles(() => ({
    moneyContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Money({ moneySum }: MoneyProps) {
    const { classes } = useStyle();
    return (
        <span className={classes.moneyContainer}>
            {moneySum.toLocaleString()}
        </span>
    )
}