import { createStyles, Popover } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconUserCircle, IconX } from '@tabler/icons';
import { useState } from 'react';
import { addPerson, removePerson } from '../../../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../../../store';

interface PersonsProps {
    groupId: number;
    itemId: number;
    typeId: number;
}

const useStyles = createStyles(() => ({
    personsComponentsContainer: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },

    personsComponent: {
        position: 'absolute',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        borderRadius: 50,
        width: 30,
        height: 30,
        color: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        border: '2px solid #fff'
    },

    personsSingleComponent: {
        left: '50%'
    },

    personsFirstComponent: {
        left: 'calc(50% - 10px)',
        zIndex: 1
    },

    personsSecondComponent: {
        left: 'calc(50% + 10px)',
        zIndex: 2
    },

    personsMultipleComponent: {
        left: 'calc(50% + 10px)',
        zIndex: 2,
        fontSize: 11,
        fontWeight: 'normal'
    },
    personsPopUpContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15
    },
    personsList: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    personsExisting: {
        backgroundColor: '#E5F4FF',
        borderRadius: 20,
        fontSize: 12,
        margin: 5,
        padding: '0 2px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    suggestionTitle: {
        color: 'grey',
        fontSize: 'inherit',
        margin: '5px 0'
    },
    iconUser: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    iconX: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,

        '&:hover': {
            backgroundColor: '#FFF',
            borderRadius: 30
        }
    },
    suggestionList: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    personsSuggestion: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        borderRadius: 10,
        margin: 2,

        '&:hover': {
            backgroundColor: '#DCDFEC'
        }
    }
}));

export function Persons({ groupId, itemId, typeId }: PersonsProps) {
    const members = useAppSelector((state) => state.table.memberList);
    const itemPersonsIds = useAppSelector((state) => state.table.itemCells[groupId][itemId][typeId].itemPersonUserId!);

    const [opened, setOpened] = useState(false);
    const { classes, cx } = useStyles();
    const dispatch = useAppDispatch();

    const innerPersonsComponents = (personsNumber: number) => {
        switch (personsNumber) {
            case 0:
                return <></>;
            case 1:
                return (
                    <>
                        <span
                            className={cx(classes.personsComponent, classes.personsSingleComponent)}
                            style={{
                                backgroundColor: members[itemPersonsIds[0]].color
                            }}
                        >
                            {members[itemPersonsIds[0]] &&
                                (members[itemPersonsIds[0]].firstName && members[itemPersonsIds[0]].lastName
                                    ? members[itemPersonsIds[0]].firstName![0].toUpperCase() + members[itemPersonsIds[0]].lastName![0].toUpperCase()
                                    : members[itemPersonsIds[0]].username[0].toUpperCase())}
                        </span>
                    </>
                );
            case 2:
                return (
                    <>
                        {itemPersonsIds.map((id, index) => {
                            return (
                                <span
                                    key={'person_' + id}
                                    className={index ? cx(classes.personsComponent, classes.personsSecondComponent) : cx(classes.personsComponent, classes.personsFirstComponent)}
                                    style={{
                                        backgroundColor: members[itemPersonsIds[index]].color
                                    }}
                                >
                                    {members[id] && (members[id].firstName && members[id].lastName ? members[id].firstName![0].toUpperCase() + members[id].lastName![0].toUpperCase() : members[id].username[0].toUpperCase())}
                                </span>
                            );
                        })}
                    </>
                );
            default:
                return (
                    <>
                        <span
                            key={'person_' + itemPersonsIds[0]}
                            className={cx(classes.personsComponent, classes.personsFirstComponent)}
                            style={{
                                backgroundColor: members[itemPersonsIds[0]].color
                            }}
                        >
                            {members[itemPersonsIds[0]] &&
                                (members[itemPersonsIds[0]].firstName && members[itemPersonsIds[0]].lastName
                                    ? members[itemPersonsIds[0]].firstName![0].toUpperCase() + members[itemPersonsIds[0]].lastName![0].toUpperCase()
                                    : members[itemPersonsIds[0]].username[0].toUpperCase())}
                        </span>
                        <span key={'person_multiple'} className={cx(classes.personsComponent, classes.personsMultipleComponent)} style={{ backgroundColor: '#323232' }}>
                            {`+${itemPersonsIds.length - 1}`}
                        </span>
                    </>
                );
        }
    };

    const onRemovePerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        if (itemPersonsIds.length <= 1) {
            showNotification({
                title: 'Delete person notification',
                message: 'Failed to delete person! At least one person is required for items! 🤥'
            });
        } else {
            dispatch(removePerson(groupId, itemId, typeId, personId));
        }
    };

    const onAddPerson = (groupId: number, itemId: number, typeId: number, personId: number) => {
        dispatch(addPerson(groupId, itemId, typeId, personId));
    };

    return (
        <Popover width={200} position='bottom' withArrow shadow='md' opened={opened} onChange={setOpened}>
            <Popover.Target>
                <span className={classes.personsComponentsContainer} onClick={() => setOpened((o) => !o)}>
                    {innerPersonsComponents(itemPersonsIds.length)}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span className={classes.personsPopUpContainer}>
                    <span className={classes.personsList}>
                        {itemPersonsIds.map((id) => {
                            if (members[id]) {
                                const firstName = members[id].firstName;
                                const lastName = members[id].lastName;
                                const username = members[id].username;
                                return (
                                    <span key={'person_' + id} className={classes.personsExisting}>
                                        <span className={classes.iconUser}>
                                            <IconUserCircle />
                                        </span>
                                        {firstName && lastName ? firstName + ' ' + lastName : username}
                                        <span className={classes.iconX}>
                                            <IconX size={15} onClick={() => onRemovePerson(groupId, itemId, typeId, id)} />
                                        </span>
                                    </span>
                                );
                            }
                        })}
                    </span>
                    <span className={classes.suggestionTitle}>Suggested People</span>
                    <span className={classes.suggestionList}>
                        {Object.keys(members).map((key) => {
                            const memberId = parseInt(key);
                            if (!itemPersonsIds.includes(memberId) && members[memberId]) {
                                const firstName = members[memberId].firstName;
                                const lastName = members[memberId].lastName;
                                const username = members[memberId].username;
                                return (
                                    <span key={'person_' + key} className={classes.personsSuggestion} onClick={() => onAddPerson(groupId, itemId, typeId, memberId)}>
                                        <span className={classes.iconUser}>
                                            <IconUserCircle />
                                        </span>
                                        {firstName && lastName ? firstName + ' ' + lastName : username}
                                    </span>
                                );
                            }
                        })}
                    </span>
                </span>
            </Popover.Dropdown>
        </Popover>
    );
}
