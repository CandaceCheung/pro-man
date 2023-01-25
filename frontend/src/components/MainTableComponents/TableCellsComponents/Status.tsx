import { Button, createStyles, Popover } from '@mantine/core';
import { useState } from 'react';
import { newState } from '../../../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../../../store';

interface StatusProps {
    groupId: number;
    itemId: number;
    typeId: number;
    status: string;
    color: string;
    onStatusChange: (groupId: number, itemId: number, stateId: number, typeId: number, name: string, color: string) => void;
}

const useStyle = createStyles((theme, _params) => ({
    statusContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        width: '100%',
        height: '100%',

        '&::before': {
            position: 'absolute',
            content: "''",
            top: 0,
            right: 0,
            borderStyle: 'solid',
            width: 0,
            borderWidth: 0,
            borderColor: '#fff #fff rgba(0,0,0,0.2) rgba(0,0,0,0.2)',
            borderRadius: '0 0 5px 0',
            transition: 'border-width .2s'
        },

        '&:hover::before': {
            transitionDelay: '.2s',
            borderWidth: 5
        }
    },
    statusList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusTag: {
        width: 160,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        margin: '5px 0',

        '&:hover': {
            opacity: 0.8
        }
    },
    statusTagInputContainer: {
        width: 160,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFF',
        margin: '5px 0'
    },
    statusTagInput: {
        width: '100%',
        height: '100%',
        color: 'inherit',
        backgroundColor: 'inherit',
        outline: 'none',
        boxSizing: 'border-box'
    }
}));

export function Status({ groupId, itemId, typeId, status, color, onStatusChange }: StatusProps) {
    const statusList = useAppSelector((state) => state.table.statusList);
    const projectId = useAppSelector((state) => state.project.projectId);
    const [opened, setOpened] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [newStatusInputValue, setNewStatusInputValue] = useState('');

    const { classes, theme } = useStyle();
    const dispatch = useAppDispatch();

    const handleNewStatusInputKeyDown = (key: string) => {
        if (key === 'Enter') {
            projectId && dispatch(newState(projectId, newStatusInputValue, theme.colors.statusLabelsColor[statusList.length]));
            setEditStatus(false);
            setNewStatusInputValue('');
        }
    };

    return (
        <Popover width={200} position='bottom' withArrow shadow='md' opened={opened} onChange={setOpened}>
            <Popover.Target>
                <span className={classes.statusContainer} style={{ backgroundColor: color }} onClick={() => setOpened((o) => !o)}>
                    {status === 'Empty' ? '' : status}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span className={classes.statusList}>
                    {statusList.map((status) => (
                        <span
                            key={'status_tag_' + status.id}
                            className={classes.statusTag}
                            style={{ backgroundColor: status.color }}
                            onClick={() => {
                                onStatusChange(groupId, itemId, status.id!, typeId, status.name!, status.color!);
                                setOpened((o) => !o);
                            }}
                        >
                            {status.name}
                        </span>
                    ))}
                    {editStatus && (
                        <span
                            className={classes.statusTagInputContainer}
                            style={{
                                backgroundColor: theme.colors.statusLabelsColor[statusList.length]
                            }}
                        >
                            <input
                                className={classes.statusTagInput}
                                value={newStatusInputValue}
                                onChange={(e) => setNewStatusInputValue(e.target.value)}
                                onKeyDown={(e) => handleNewStatusInputKeyDown(e.key)}
                                onBlur={() => {
                                    setEditStatus(false);
                                    setNewStatusInputValue('');
                                }}
                            ></input>
                        </span>
                    )}
                    <Button variant='subtle' style={{ marginTop: 10 }} onClick={() => setEditStatus((e) => !e)}>
                        {editStatus ? 'Cancel' : 'Add Status'}
                    </Button>
                </span>
            </Popover.Dropdown>
        </Popover>
    );
}
