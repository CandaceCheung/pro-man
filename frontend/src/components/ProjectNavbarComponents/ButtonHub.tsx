import { Button, Divider, Menu } from "@mantine/core";
import { IconEyeOff, IconFilter, IconUser, IconColumns, IconArrowBack } from "@tabler/icons";
import { MouseEvent } from "react";
import { setHideByTypeAction, setSortByGroupIdAction, setSortByPersonIdAction, triggerTimelineModalAction } from "../../redux/project/slice";
import { insertItem, insertItemGroup } from "../../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { TimelineButton } from "../TimelineComponents/TimelineButtons";

export function ButtonHub() {
    const dispatch = useAppDispatch()
    const projectSummary = useAppSelector(state => state.table.summary)
    const projectId = useAppSelector(state => state.project.project_id);
    const userId = useAppSelector(state => state.auth.userId);
    const page = useAppSelector(state => state.project.active_page)
    const sortByPersonId = useAppSelector(state => state.project.sort_by_person_id)
    const sortByGroupId = useAppSelector(state => state.project.sort_by_group_id)
    const setHideByType = useAppSelector(state => state.project.set_hide_by_type)
    const typeColumn = ['dates', 'times']

    // timeline logic
    const groupSummary = projectSummary.filter((project, index, self) =>
        project.joined_project_id === projectId &&
        index === self.findIndex((obj) => obj.item_group_id === project.item_group_id))
    const personsSummary = projectSummary.filter((project, index, self) =>
        project.project_id === projectId &&
        project.type_name === 'persons')
    const personsSummaryArr = []
    const checking: number[] = []
    for (let item of personsSummary) {
        if (!checking.includes(item.item_person_user_id)) {
            checking.push(item.item_person_user_id)
            personsSummaryArr.push({
                name: item.item_person_name,
                userId: item.item_person_user_id
            })
        }
    }
    // timeline logic

    const onNewItemClick = () => {
        projectId && userId && dispatch(insertItem(projectId, userId));
    }
    const onNewGroupClick = () => {
        projectId && userId && dispatch(insertItemGroup(projectId, userId));
    }
    const onSortByPersonsClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setSortByPersonIdAction(parseInt(e.currentTarget.value)))
    }
    const onSortByGroupClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setSortByGroupIdAction(parseInt(e.currentTarget.value)))
    }
    const onSetHideByTypeClick = (e: MouseEvent<HTMLButtonElement>) => {
        page === 'timeline' && dispatch(setHideByTypeAction(e.currentTarget.value))
    }


    return (
        <div id="button-panel">
            <div id='fixed-button-group'>
                <Button className='button-panel-group' onClick={onNewItemClick}>New Item</Button>
                <Button className='button-panel-group' onClick={onNewGroupClick}>New Group</Button>

                <Menu transition='pop-top-left' transitionDuration={150}>
                    <Menu.Target>
                        {sortByPersonId ?
                            <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSortByPersonsClick(e)}><IconArrowBack size={14} /> Reset</Button>
                            :
                            <Button className='button-panel-group' variant='subtle'><IconUser size={14} /> Person</Button>
                        }
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by person</Menu.Label>
                        {page === 'timeline' && personsSummaryArr.map((person, index) => {
                            return <Menu.Item
                                key={index}
                                disabled={!!sortByPersonId}
                                value={person.userId}
                                icon={<IconUser size={14} />}
                                onClick={(e) => onSortByPersonsClick(e)}
                            >
                                {person.name}
                            </Menu.Item>
                        })}
                        <Divider my="sm" />
                    </Menu.Dropdown>
                </Menu>

                <Menu transition="pop-top-right" transitionDuration={150}>
                    <Menu.Target>
                        {sortByGroupId ?
                            <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSortByGroupClick(e)}><IconArrowBack size={14} /> Reset</Button>
                            :
                            <Button className='button-panel-group' variant='subtle'><IconFilter size={14} />Filter</Button>
                        }
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by column</Menu.Label>
                        {page === 'timeline' && groupSummary.map((group, index) => {
                            return <Menu.Item
                                key={index}
                                value={group.item_group_id}
                                icon={<IconColumns size={14} />}
                                disabled={!!sortByGroupId}
                                onClick={(e) => onSortByGroupClick(e)}
                            >
                                {group.item_group_name}
                            </Menu.Item>
                        })}
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        {setHideByType ?
                            <Button className='button-panel-group' value={undefined} variant='outline' onClick={(e) => onSetHideByTypeClick(e)}><IconArrowBack size={14} /> Reset</Button>
                            :
                            <Button className='button-panel-group' variant='subtle'><IconEyeOff size={14} />Hide</Button>
                        }
                    </Menu.Target>
                    <Menu.Dropdown>
                        {page === 'timeline' && typeColumn.map((column, index) => {
                            return <Menu.Item
                                value={column}
                                key={index}
                                icon={<IconColumns size={14} />}
                                disabled={!!setHideByType}
                                onClick={e => onSetHideByTypeClick(e)}
                            >
                                {column.toUpperCase()}
                            </Menu.Item>
                        })}
                    </Menu.Dropdown>
                </Menu>
            </div>
            {page === "timeline" && <TimelineButton />}
        </div>
    )
}