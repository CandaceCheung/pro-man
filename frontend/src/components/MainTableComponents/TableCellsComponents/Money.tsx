import { Button, createStyles, Input, Popover, Table } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { IconBrandCashapp } from '@tabler/icons';
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
    },
    popUpContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
}));

export function Money({ moneySum, transactionIds, cashFlows, transactionDates }: MoneyProps) {
    const [opened, setOpened] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [inputValue, setInputValue] = useState<string>("");


    const { classes } = useStyle();

    return (
        <Popover
            width={300}
            position="bottom"
            withArrow shadow="md"
            opened={opened}
            onChange={setOpened}
            zIndex={2}
        >
            <Popover.Target>
                <span
                    className={classes.moneyContainer}
                    onClick={() => setOpened((o) => !o)}
                >
                    {moneySum.toLocaleString()}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span className={classes.popUpContainer}>
                    {
                        editStatus
                            ?
                            <span>
                                <Calendar
                                    size='xs'
                                    value={dateValue}
                                    onChange={setDateValue}
                                />
                                <Input
                                    icon={<IconBrandCashapp />}
                                    placeholder="Input Amount"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                            </span>
                            :
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionIds.map((transactionId, index) => (
                                        <tr
                                            key={"transaction_" + transactionId}
                                            style={{ textAlign: "left" }}
                                        >
                                            <td>
                                                {
                                                    (new Date(transactionDates[index])).toDateString()
                                                }
                                            </td>
                                            <td>{cashFlows[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                    }


                    <Button
                        variant="subtle"
                        style={{ marginTop: 10 }}
                        onClick={() => setEditStatus((e) => !e)}
                    >
                        {editStatus ? "Cancel" : "Add Transaction"}
                    </Button>
                </span>
            </Popover.Dropdown>
        </Popover>
    )
}