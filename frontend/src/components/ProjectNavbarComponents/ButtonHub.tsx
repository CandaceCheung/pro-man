import { Button, Menu } from "@mantine/core";
import { IconEyeOff, IconFilter, IconUser, IconColumns} from "@tabler/icons";
import { triggerTimelineModalAction } from "../../redux/project/slice";
import { insertItemGroup } from "../../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { TimelineButton } from "../TimelineComponents/TimelineButtons";

export function ButtonHub() {
    const dispatch = useAppDispatch()
    const projectId = useAppSelector(state => state.project.project_id);
    const userId = useAppSelector(state => state.auth.userId);
    const page = useAppSelector(state => state.project.active_page)

    const onNewItemClick = ()=>{
        page==='timeline' && dispatch(triggerTimelineModalAction(true))
    } 
    const onNewGroupClick = ()=>{
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
                        <Menu.Item icon={<IconUser size={14} />}>place holder</Menu.Item>
                        <Menu.Item icon={<IconUser size={14} />}>place holder 2</Menu.Item>
                        <Menu.Item icon={<IconUser size={14} />}>place holder 3</Menu.Item>
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
            {page === "timeline" && <TimelineButton  />}
        </div>
    )
}