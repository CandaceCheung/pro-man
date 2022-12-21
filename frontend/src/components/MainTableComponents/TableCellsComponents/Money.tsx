import { createStyles } from '@mantine/core';

interface MoneyProps {
    moneySum: number,
    transactionIds: Array<number>,
    cashFlows: Array<number>,
    transactionDates: Array<string>
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
        <div className={classes.moneyContainer}>
            {moneySum.toLocaleString()}
        </div>
    )
}