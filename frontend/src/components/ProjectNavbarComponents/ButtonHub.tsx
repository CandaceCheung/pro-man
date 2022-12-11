import { Button, Menu, Select } from "@mantine/core";
import { IconEyeOff, IconFilter, IconUser, IconColumns, IconCalendar } from "@tabler/icons";
import moment from "moment";
import { setAutofitAction, setTimelineNowAction, setTimeLineViewAction, TimeLineViewState } from "../../redux/project/slice";
import { useAppDispatch, useAppSelector } from "../../store";

type ButtonHubProps = {
    page: string | null
}

export function ButtonHub(prop: ButtonHubProps) {

    const dispatch = useAppDispatch()
    const defaultView = useAppSelector(state => state.project.time_line_view)
    const autofit = useAppSelector(state => state.project.time_line_autofit)
    const now = useAppSelector(state => state.project.time_line_now)


    function changeTimeLineView(value: TimeLineViewState) {
        let startPointAnchor = moment().add(-0.5, value)
        let endPointAnchor = moment().add(0.5, value)
        
        const payload = {
            value,
            start: startPointAnchor,
            end: endPointAnchor
        }
        dispatch(setTimeLineViewAction(payload))
    }
    function changeAutofit() {
        dispatch(setAutofitAction(!autofit))
    }
    function changeNow() {
        dispatch(setTimelineNowAction(!now))
    }

    return (
        <div id="button-panel">
            <div id='fixed-button-group'>
                <Button className='button-panel-group'>New Item</Button>
                <Button className='button-panel-group'>New Group</Button>

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
            <div>
                {prop.page === "timeline" &&
                    <Button.Group>
                        <Button className='button-panel-group' variant={now ? 'outline' : 'subtle'} disabled={autofit} onMouseDown={() => changeNow()} onMouseUp={() => changeNow()}><IconCalendar size={14} /></Button>
                        <Button className='button-panel-group' variant={autofit ? 'outline' : 'subtle'} onClick={() => changeAutofit()} disabled={now}>Auto Fit</Button>
                        <Select
                            value={defaultView} onChange={changeTimeLineView}
                            className='selection-box'
                            placeholder="View"
                            size='xs'
                            data={[
                                { value: 'day', label: 'Days' },
                                { value: 'week', label: 'Weeks' },
                                { value: 'month', label: 'Months' }
                            ]}
                        />
                    </Button.Group>
                }
            </div>
        </div>
    )
}