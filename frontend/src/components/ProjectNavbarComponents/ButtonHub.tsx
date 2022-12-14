import { Button, Menu } from "@mantine/core";
import { valueGetters } from "@mantine/core/lib/Box/style-system-props/value-getters/value-getters";
import { IconEyeOff, IconFilter, IconUser, IconColumns } from "@tabler/icons";
import { triggerTimelineModalAction } from "../../redux/project/slice";
import { insertItem, insertItemGroup } from "../../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { TimelineButton } from "../TimelineComponents/TimelineButtons";

export function ButtonHub() {
    const dispatch = useAppDispatch()
    const projectSummary = useAppSelector(state => state.table.summary)
    const projectId = useAppSelector(state => state.project.project_id);
    const personsSummary = projectSummary.filter((project, index, self) => 
        project.project_id === projectId && 
        project.type_name === 'persons' && 
        index === self.findIndex((obj) => obj.item_person_id === project.item_person_id))
    const userId = useAppSelector(state => state.auth.userId);
    const page = useAppSelector(state => state.project.active_page)
    console.log(personsSummary)

    const onNewItemClick = () => {
        page === 'timeline' && dispatch(triggerTimelineModalAction(true));
        page === 'mainTable' && projectId && userId && dispatch(insertItem(projectId, userId));
    }
    const onNewGroupClick = () => {
        projectId && userId && dispatch(insertItemGroup(projectId, userId));
    }
    return (
        <div id="button-panel">
            <div id='fixed-button-group'>
                <Button className='button-panel-group' onClick={onNewItemClick}>New Item</Button>
                <Button className='button-panel-group' onClick={onNewGroupClick}>New Group</Button>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconUser size={14} />Person</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by person</Menu.Label>
                        {personsSummary.map((person, index) => {
                            return <Menu.Item key={index} value={person.item_person_id} icon={<IconUser size={14} />}>{person.item_person_name}</Menu.Item>
                        })
                        }
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconFilter size={14} />Filter</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Filter by column</Menu.Label>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu>
                    <Menu.Target>
                        <Button className='button-panel-group' variant='subtle'><IconEyeOff size={14} />Hide</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Hide column</Menu.Label>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconColumns size={14} />}>place holder 3</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            {page === "timeline" && <TimelineButton />}
        </div>
    )
}