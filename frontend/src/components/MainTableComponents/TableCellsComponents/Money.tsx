import { createStyles, Popover, Table } from '@mantine/core';
import { useState } from 'react';

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

export function Money({ moneySum, transactionIds, cashFlows, transactionDates }: MoneyProps) {
    const [opened, setOpened] = useState(false);
    const { classes } = useStyle();

    return (
        <Popover width={300} position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
                <span
                    className={classes.moneyContainer}
                    onClick={() => setOpened((o) => !o)}
                >
                    {moneySum.toLocaleString()}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span>
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactionIds.map((transactionId, index) => (
                                    <tr 
                                        key={"transaction_" + transactionId}
                                        style={{textAlign: "left"}}
                                    >
                                        <td>
                                            {
                                                (new Date(transactionDates[index])).toDateString()
                                            }
                                        </td>
                                        <td>{cashFlows[index]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </span>
            </Popover.Dropdown>
        </Popover>
    )
}