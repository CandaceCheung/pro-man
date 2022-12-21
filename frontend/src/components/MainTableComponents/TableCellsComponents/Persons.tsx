import { Button, createStyles, Popover } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../store';

interface PersonsProps {
    itemPersonsNames: string[],
    itemPersonsIds: number[],
    personsColors: { [key in number]: string }
}

interface MembersFullName {
    username: string,
    firstName: string | null,
    lastName: string | null
}

const useStyles = createStyles(() => ({
    personsComponentsContainer: {
        position: "relative",
        width: "100%",
        height: "100%"
    },

    personsComponent: {
        position: "absolute",
        top: "50%",
        transform: "translate(-50%,-50%)",
        borderRadius: 50,
        width: 30,
        height: 30,
        color: "#FFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 12,
        fontWeight: "bold",
        border: "2px solid #fff"
    },

    personsSingleComponent: {
        left: "50%"
    },

    personsFirstComponent: {
        left: "calc(50% - 10px)",
        zIndex: 1
    },

    personsSecondComponent: {
        left: "calc(50% + 10px)",
        zIndex: 2
    },

    personsMultipleComponent: {
        left: "calc(50% + 10px)",
        zIndex: 2,
        fontSize: 11,
        fontWeight: "normal"
    },
    personsPopUpContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 15
    },
    personsList: {
        display: "flex",
        flexWrap: "wrap",
        width: "100%"
    },
    personsExisting: {
        backgroundColor: "#E5F4FF",
        borderRadius: 20,
        fontSize: "inherit"
    },
    suggestionTitle: {
        color: "grey",
        fontSize: "inherit"
    }
}));

export function Persons({ itemPersonsNames, itemPersonsIds, personsColors }: PersonsProps) {
    const members = useAppSelector(state => state.kanban.memberList);
    const [membersFullName, setMembersFullName] = useState<Record<number, MembersFullName>>({});
    const [opened, setOpened] = useState(false);
    const { classes, cx } = useStyles();

    useEffect(() => {
        const membersFullNameTemp: Record<number, MembersFullName> = {};
        members.forEach(member => {
            membersFullNameTemp[member.id] = {
                username: member.username,
                firstName: member.firstName,
                lastName: member.lastName
            }
        });
        setMembersFullName(membersFullNameTemp);
    }, [members]);

    const innerPersonsComponents = (personsNumber: number) => {
        switch (personsNumber) {
            case 0:
                return <></>
            case 1:
                return (
                    <>
                        <span
                            className={cx(classes.personsComponent, classes.personsSingleComponent)}
                            style={{
                                backgroundColor: personsColors[itemPersonsIds[0]]
                            }}
                        >
                            {itemPersonsNames[0][0].toUpperCase()}
                        </span>
                    </>
                )
            case 2:
                return (
                    <>
                        {itemPersonsNames.map((name, index) => {
                            const userId = itemPersonsIds[index];
                            const initial = name[0].toUpperCase();
                            return (
                                <span
                                    key={"person_" + userId}
                                    className={
                                        index
                                            ?
                                            cx(classes.personsComponent, classes.personsSecondComponent)
                                            :
                                            cx(classes.personsComponent, classes.personsFirstComponent)
                                    }
                                    style={{
                                        backgroundColor: personsColors[itemPersonsIds[index]]
                                    }}
                                >
                                    {initial}
                                </span>
                            )
                        })}
                    </>
                )
            default:
                return (
                    <>
                        <span
                            key={"person_" + itemPersonsIds[0]}
                            className={cx(classes.personsComponent, classes.personsFirstComponent)}
                            style={{ backgroundColor: personsColors[itemPersonsIds[0]] }}
                        >
                            {itemPersonsNames[0][0].toUpperCase()}
                        </span>
                        <span
                            key={"person_multiple"}
                            className={cx(classes.personsComponent, classes.personsMultipleComponent)}
                            style={{ backgroundColor: "#323232" }}
                        >
                            {`+${itemPersonsNames.length - 1}`}
                        </span>
                    </>
                )
        }
    }

    return (
        <Popover width={200} position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
            <Popover.Target>
                <span
                    className={classes.personsComponentsContainer}
                    onClick={() => setOpened((o) => !o)}
                >
                    {innerPersonsComponents(itemPersonsIds.length)}
                </span>
            </Popover.Target>
            <Popover.Dropdown>
                <span className={classes.personsList}>
                    {"hi"}
                </span>
                <span className={classes.suggestionTitle}>
                    Suggested People
                </span>
            </Popover.Dropdown>
        </Popover >
    )
}