import { Button, Select, Slider, Tooltip } from '@mantine/core';
import { IconBrandStackoverflow, IconCalendar, IconPinned } from '@tabler/icons';
import moment from 'moment';
import {
    setAutofitAction,
    setShowMarkerAction,
    setTimelineItemHeightAction,
    setTimelineNowAction,
    setTimeLineViewAction,
    TimeLineViewState,
    toggleLoadingAction,
    toggleStackItemAction,
} from '../../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../../store';

export function TimelineButton() {
    const dispatch = useAppDispatch();
    const defaultView = useAppSelector((state) => state.project.time_line_view);
    const autofit = useAppSelector((state) => state.project.time_line_autofit);
    const now = useAppSelector((state) => state.project.time_line_now);
    const show = useAppSelector((state) => state.project.time_line_show_marker);
    const stack = useAppSelector((state) => state.project.time_line_stack_item);
    const itemHeight = useAppSelector((state) => state.project.set_timeline_item_height);

    function changeTimeLineView(value: TimeLineViewState) {
        dispatch(setAutofitAction(false));
        let startPointAnchor = moment().startOf('minute').add(-0.5, value);
        let endPointAnchor = moment().startOf('minute').add(0.5, value);

        const payload = {
            value,
            start: startPointAnchor,
            end: endPointAnchor,
        };
        dispatch(setTimeLineViewAction(payload));
        dispatch(toggleLoadingAction(true));
    }
    function changeAutofit() {
        dispatch(setAutofitAction(!autofit));
    }
    function changeNow() {
        dispatch(setTimelineNowAction(!now));
    }
    function onSliderChange(value: number) {
        dispatch(setTimelineItemHeightAction(value));
    }

    return (
        <div style={{ display: 'flex' }}>
            <span style={{ width: '200px', paddingRight: '20px' }}>
                <Tooltip
                    multiline
                    width={220}
                    withArrow
                    offset={30}
                    transition='fade'
                    transitionDuration={200}
                    label='Change Item height'
                >
                    <Slider
                        size='lg'
                        value={itemHeight}
                        min={30}
                        max={100}
                        onChange={onSliderChange}
                        marks={[
                            { value: 50, label: '20%' },
                            { value: 75, label: '50%' },
                            { value: 100, label: '100%' },
                        ]}
                    />
                </Tooltip>
            </span>

            <Button.Group>
                <Tooltip multiline width={220} withArrow transition='fade' transitionDuration={200} label='Stack Item'>
                    <Button
                        className='button-panel-group'
                        variant={stack ? 'filled' : 'subtle'}
                        onClick={() => dispatch(toggleStackItemAction(!stack))}
                    >
                        <IconBrandStackoverflow size={14} />
                    </Button>
                </Tooltip>
                <Tooltip
                    multiline
                    width={220}
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                    label='Toggle Show Time Markers'
                >
                    <Button
                        className='button-panel-group'
                        variant={show ? 'filled' : 'subtle'}
                        onClick={() => dispatch(setShowMarkerAction(!show))}
                    >
                        <IconPinned size={14} />
                    </Button>
                </Tooltip>
                <Tooltip
                    multiline
                    width={220}
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                    label='Press to Re-center'
                >
                    <Button
                        className='button-panel-group'
                        variant={now ? 'filled' : 'subtle'}
                        disabled={autofit}
                        onMouseDown={() => changeNow()}
                        onMouseUp={() => changeNow()}
                    >
                        <IconCalendar size={14} />
                    </Button>
                </Tooltip>
                <Tooltip
                    multiline
                    width={220}
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                    label='Toggle Auto-fit Timeline'
                >
                    <Button
                        className='button-panel-group'
                        variant={autofit ? 'filled' : 'subtle'}
                        onClick={() => changeAutofit()}
                        disabled={now}
                    >
                        Auto Fit
                    </Button>
                </Tooltip>
                <Tooltip
                    multiline
                    width={220}
                    withArrow
                    transition='fade'
                    transitionDuration={200}
                    label='Select View and Press Re-centered'
                >
                    <Select
                        value={defaultView}
                        onChange={changeTimeLineView}
                        className='selection-box'
                        placeholder='View'
                        size='xs'
                        data={[
                            { value: 'day', label: 'Days' },
                            { value: 'week', label: 'Weeks' },
                            { value: 'month', label: 'Months' },
                            { value: 'year', label: 'Years' },
                        ]}
                    />
                </Tooltip>
            </Button.Group>
        </div>
    );
}
