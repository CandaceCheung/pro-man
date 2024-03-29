import { Button, Divider, Menu } from '@mantine/core';
import { IconEyeOff, IconFilter, IconUser, IconColumns, IconArrowBack } from '@tabler/icons';
import { MouseEvent } from 'react';
import { setHideByTypeAction, setSortByGroupIdAction, setSortByPersonIdAction } from '../../redux/project/slice';
import { insertItem, insertItemGroup } from '../../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../../store';
import { TimelineButton } from '../TimelineComponents/TimelineButtons';

export function ButtonHub() {
    const dispatch = useAppDispatch();
    const projectSummary = useAppSelector((state) => state.table.summary);
    const projectId = useAppSelector((state) => state.project.projectId);
    const userId = useAppSelector((state) => state.auth.userId);
    const page = useAppSelector((state) => state.project.activePage);
    const sortByPersonId = useAppSelector((state) => state.project.sortByPersonId);
    const sortByGroupId = useAppSelector((state) => state.project.sortByGroupId);
    const setHideByType = useAppSelector((state) => state.project.setHideByType);
    const typeColumn = ['dates', 'times'];

    // timeline logic
    const groupSummary = projectSummary.filter((project, index, self) => project.joinedProjectId === projectId && index === self.findIndex((obj) => obj.itemGroupId === project.itemGroupId));
    const personsSummary = projectSummary.filter((project, index, self) => project.projectId === projectId && project.typeName === 'persons');
    const personsSummaryArr = [];
    const checking: number[] = [];
    for (let item of personsSummary) {
        if (!checking.includes(item.itemPersonUserId)) {
            checking.push(item.itemPersonUserId);
            personsSummaryArr.push({
                name: item.itemPersonName,
                userId: item.itemPersonUserId
            });
        }
    }
    // timeline logic

    const onNewItemClick = () => {
        projectId && userId && dispatch(insertItem(projectId, userId));
    };
    const onNewGroupClick = () => {
        projectId && userId && dispatch(insertItemGroup(projectId, userId));
    };
    const onSortByPersonsClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setSortByPersonIdAction(parseInt(e.currentTarget.value)));
    };
    const onSortByGroupClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setSortByGroupIdAction(parseInt(e.currentTarget.value)));
    };
    const onSetHideByTypeClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setHideByTypeAction(e.currentTarget.value));
    };

    return (
        <div id='button-panel'>
            <div id='fixed-button-group'>
                <Button className='button-panel-group' onClick={onNewItemClick}>
                    New Item
                </Button>
                <Button className='button-panel-group' onClick={onNewGroupClick}>
                    New Group
                </Button>

                {page === 'timeline' && (
                    <Menu transition='pop-top-left' transitionDuration={150}>
                        <Menu.Target>
                            {sortByPersonId ? (
                                <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSortByPersonsClick(e)}>
                                    <IconArrowBack size={14} /> Reset
                                </Button>
                            ) : (
                                <Button className='button-panel-group' variant='subtle'>
                                    <IconUser size={14} /> Person
                                </Button>
                            )}
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Filter by person</Menu.Label>
                            {page === 'timeline' &&
                                personsSummaryArr.map((person, index) => {
                                    return (
                                        <Menu.Item key={index} disabled={!!sortByPersonId} value={person.userId} icon={<IconUser size={14} />} onClick={(e) => onSortByPersonsClick(e)}>
                                            {person.name}
                                        </Menu.Item>
                                    );
                                })}
                            <Divider my='sm' />
                        </Menu.Dropdown>
                    </Menu>
                )}
                {page === 'timeline' && (
                    <Menu transition='pop-top-right' transitionDuration={150}>
                        <Menu.Target>
                            {sortByGroupId ? (
                                <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSortByGroupClick(e)}>
                                    <IconArrowBack size={14} /> Reset
                                </Button>
                            ) : (
                                <Button className='button-panel-group' variant='subtle'>
                                    <IconFilter size={14} />
                                    Filter
                                </Button>
                            )}
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Filter by column</Menu.Label>
                            {page === 'timeline' &&
                                groupSummary.map((group, index) => {
                                    return (
                                        <Menu.Item key={index} value={group.itemGroupId} icon={<IconColumns size={14} />} disabled={!!sortByGroupId} onClick={(e) => onSortByGroupClick(e)}>
                                            {group.itemGroupName}
                                        </Menu.Item>
                                    );
                                })}
                        </Menu.Dropdown>
                    </Menu>
                )}
                {page === 'timeline' && (
                    <Menu>
                        <Menu.Target>
                            {setHideByType ? (
                                <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSetHideByTypeClick(e)}>
                                    <IconArrowBack size={14} /> Reset
                                </Button>
                            ) : (
                                <Button className='button-panel-group' variant='subtle'>
                                    <IconEyeOff size={14} />
                                    Hide
                                </Button>
                            )}
                        </Menu.Target>
                        <Menu.Dropdown>
                            {page === 'timeline' &&
                                typeColumn.map((column, index) => {
                                    return (
                                        <Menu.Item value={column} key={index} icon={<IconColumns size={14} />} disabled={!!setHideByType} onClick={(e) => onSetHideByTypeClick(e)}>
                                            {column.toUpperCase()}
                                        </Menu.Item>
                                    );
                                })}
                        </Menu.Dropdown>
                    </Menu>
                )}
            </div>
            {page === 'timeline' && <TimelineButton />}
        </div>
    );
}
