import { Button, createStyles, Input, Popover, Table } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { IconBrandCashapp, IconX } from '@tabler/icons';
import { useState } from 'react';

interface MoneyProps {
    groupId: number;
    itemId: number;
    typeId: number;
    transactionIds: Array<number>;
    cashFlows: Array<number>;
    transactionDates: Array<string>;
    onAddTransaction: (groupId: number, itemId: number, typeId: number, date: Date, cashFlow: number) => void;
    onDeleteTransaction: (groupId: number, itemId: number, typeId: number, transactionId: number) => void;
}

const useStyle = createStyles((theme, _params, getRef) => ({
    moneyContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    popUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableRow: {
        position: 'relative',

        '&:hover': {
            [`& .${getRef('deleteButton')}`]: {
                visibility: 'visible'
            }
        }
    },
    deleteButton: {
        ref: getRef('deleteButton'),
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translate(0, -50%)',
        visibility: 'hidden',
        borderRadius: 100,

        '&:hover': {
            backgroundColor: '#E5F4FF',
            opacity: 0.7
        }
    }
}));

export function Money({
    groupId,
    itemId,
    typeId,
    transactionIds,
    cashFlows,
    transactionDates,
    onAddTransaction,
    onDeleteTransaction
}: MoneyProps) {
    const [opened, setOpened] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [dateValue, setDateValue] = useState<Date | null>(new Date());
    const [inputValue, setInputValue] = useState<string>('');

    const { classes } = useStyle();

    const handleKeyDown = (key: string) => {
        if (key === 'Enter') {
            if (dateValue && !isNaN(parseInt(inputValue))) {
                onAddTransaction(groupId, itemId, typeId, dateValue, parseInt(inputValue));
                setInputValue('');
                setDateValue(new Date());
                setEditStatus(false);
            }
        }
    };

    return (
        <Popover width={300} position='bottom' withArrow shadow='md' opened={opened} onChange={setOpened} zIndex={2}>
            <Popover.Target>
                <span className={classes.moneyContainer} onClick={() => setOpened((o) => !o)}>
                    {cashFlows
                        .reduce((acc, val) => {
                            return acc + val;
                        }, 0)
                        .toLocaleString()}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span className={classes.popUpContainer}>
                    {editStatus ? (
                        <span>
                            <Calendar size='xs' value={dateValue} onChange={setDateValue} />
                            <Input
                                icon={<IconBrandCashapp />}
                                placeholder='Input Amount'
                                type='number'
                                required
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e.key)}
                            />
                        </span>
                    ) : (
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
                                        key={'transaction_' + transactionId}
                                        style={{ textAlign: 'left' }}
                                        className={classes.tableRow}
                                    >
                                        <td>{new Date(transactionDates[index]).toDateString()}</td>
                                        <td>{cashFlows[index]}</td>

                                        <IconX
                                            size={14}
                                            className={classes.deleteButton}
                                            onClick={() => onDeleteTransaction(groupId, itemId, typeId, transactionId)}
                                        />
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

                    <Button variant='subtle' style={{ marginTop: 10 }} onClick={() => setEditStatus((e) => !e)}>
                        {editStatus ? 'Cancel' : 'Add Transaction'}
                    </Button>
                </span>
            </Popover.Dropdown>
        </Popover>
    );
}
