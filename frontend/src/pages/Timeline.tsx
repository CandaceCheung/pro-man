import '../components/styles/Timeline.css';
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { useAppDispatch, useAppSelector } from '../store';
import { IconArrowBadgeLeft, IconArrowBadgeRight, IconPinned } from '@tabler/icons';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getTable, updateDatelineItem, updateTimelineItem } from '../redux/table/thunk';
import ClockLoader from 'react-spinners/ClockLoader';
import { setTargetUpdateElementAction, toggleLoadingAction, triggerUpdateTimelineModalAction } from '../redux/project/slice';
import { ChangNameColorModal } from '../components/TimelineComponents/ChangeNameColorModal';

const keys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemTimeStartKey: 'start_time',
    itemTimeEndKey: 'end_time'
};

export type GroupState = {
    id: number;
    title: string;
    groupId: number;
    groupName: string;
}[];

type ItemState = {
    id: number;
    group: number;
    title: string;
    typeId: number;
    start_time: number;
    end_time: number;
    color: string;
    canMove?: boolean;
    canResize?: boolean;
    canChangeGroup?: boolean;
    itemProps?: {};
}[];

export function TimeFrame() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const targetProjectId = useAppSelector((state) => state.project.projectId);
    const projectSummary = useAppSelector((state) => state.table.summary);
    const [toggle, setToggle] = useState<boolean | null>(false);
    const autofit = useAppSelector((state) => state.project.timeLineAutofit);
    const zoom = useAppSelector((state) => state.project.timeLineView);
    const startPointAnchor = useAppSelector((state) => state.project.timeLineStartAnchor);
    const endPointAnchor = useAppSelector((state) => state.project.timeLineEndAnchor);
    const now = useAppSelector((state) => state.project.timeLineNow);
    const show = useAppSelector((state) => state.project.timeLineShowMarker);
    const loading = useAppSelector((state) => state.project.toggleLoading);
    const toggleUpdateModal = useAppSelector((state) => state.project.updateTimeLineModalOpened);
    const stack = useAppSelector((state) => state.project.timeLineStackItem);
    const sortByPersonId = useAppSelector((state) => state.project.sortByPersonId);
    const sortByGroupId = useAppSelector((state) => state.project.sortByGroupId);
    const setHideByType = useAppSelector((state) => state.project.setHideByType);
    const itemHeight = useAppSelector((state) => state.project.setTimelineItemHeight);

    const unfilteredTimelineDetails = projectSummary.filter((project) => project.projectId === targetProjectId && project.typeName === 'times' && !project.projectIsDeleted && !project.itemIsDeleted).sort((a, b) => a.itemGroupId - b.itemGroupId);
    const unfilteredDatelineDetails = projectSummary.filter((project) => project.projectId === targetProjectId && project.typeName === 'dates' && !project.projectIsDeleted && !project.itemIsDeleted).sort((a, b) => a.itemGroupId - b.itemGroupId);
    const timelineDetail = unfilteredTimelineDetails.filter((project) => (sortByPersonId ? project.itemPersonUserId === sortByPersonId : project)).filter((project) => (sortByGroupId ? project.itemGroupId === sortByGroupId : project));
    const datelineDetail = unfilteredDatelineDetails.filter((project) => (sortByPersonId ? project.itemPersonUserId === sortByPersonId : project)).filter((project) => (sortByGroupId ? project.itemGroupId === sortByGroupId : project));

    const minZoom = 1 * 24 * 60 * 60 * 1000;
    const maxZoom = 31 * 24 * 60 * 60 * 1000;
    const defaultTimeStart = moment().startOf('day');
    const defaultTimeEnd = moment().add(1, zoom);
    const interval = 24 * 60 * 60 * 1000;

    useEffect(() => {
        userId && targetProjectId && dispatch(getTable(userId, targetProjectId));
    }, [userId, targetProjectId, dispatch]);

    let groups: GroupState = [];
    let items: ItemState = [];
    let dateItems: ItemState = [];

    let checking: number[] = [];
    for (let item of timelineDetail) {
        if (!checking.includes(item.itemId)) {
            checking.push(item.itemId);
            groups.push({
                id: item.itemId,
                title: item.itemName,
                groupId: item.itemGroupId,
                groupName: item.itemGroupName
            });
        }
    }

    checking = [];
    for (let item of timelineDetail) {
        if (!checking.includes(item.itemTimesId)) {
            checking.push(item.itemTimesId);
            items.push({
                id: parseInt('1' + item.itemTimesId),
                group: item.itemId,
                title: item.elementName,
                typeId: item.horizontalOrderId,
                start_time: item.itemTimesStartDate,
                end_time: item.itemTimesEndDate,
                color: item.itemTimesColor,
                canMove: true,
                canChangeGroup: false,
                itemProps: {
                    'aria-hidden': false,
                    className: 'time-block',
                    style: {
                        background: item.itemTimesColor,
                        borderRadius: '5px',
                        border: 'none'
                    }
                }
            });
        }
    }

    checking = [];
    for (let item of datelineDetail) {
        if (!checking.includes(item.itemDatetimeId)) {
            checking.push(item.itemDatetimeId);
            dateItems.push({
                id: parseInt('2' + item.itemDatetimeId),
                group: item.itemId,
                title: item.elementName,
                typeId: item.horizontalOrderId,
                start_time: new Date(item.itemDatesDatetime).getTime(),
                end_time: new Date(item.itemDatesDatetime).getTime() + 8.64e7,
                color: item.itemDatetimeColor,
                canMove: true,
                canResize: false,
                canChangeGroup: false,
                itemProps: {
                    'aria-hidden': false,
                    className: 'date-block',
                    style: {
                        background: item.itemDatetimeColor,
                        border: '4px solid darkgrey'
                    }
                }
            });
        }
    }

    let lastEndedTime = 0;
    for (let item of timelineDetail) {
        lastEndedTime = Math.max(item.itemTimesEndDate, lastEndedTime);
        lastEndedTime = Math.max(new Date(item.itemDatesDatetime).getTime() + 8.64e7, lastEndedTime);
    }
    let firstStartedTime = lastEndedTime;
    for (let item of timelineDetail) {
        firstStartedTime = Math.min(item.itemTimesStartDate, firstStartedTime);
        firstStartedTime = Math.min(new Date(item.itemDatesDatetime).getTime(), firstStartedTime);
    }

    function handleItemResize(itemId: number, time: number, edge: 'left' | 'right') {
        if (itemId.toString()[0] === '1') {
            const id = parseInt(itemId.toString().slice(1));
            const originalStartTime = items.filter((x) => x.id === itemId)[0].start_time;
            const originalEndTime = items.filter((x) => x.id === itemId)[0].end_time;
            const name = items.filter((x) => x.id === itemId)[0].title;
            const color = items.filter((x) => x.id === itemId)[0].color;
            let newStartTime = originalStartTime;
            let newEndTime = originalEndTime;
            if (edge === 'left') {
                newStartTime = time;
            } else if (edge === 'right') {
                newEndTime = time;
            }
            dispatch(updateTimelineItem(id, newStartTime, newEndTime, name, color));
            dispatch(toggleLoadingAction(true));
        }
    }

    function handleItemMove(itemId: number, newStartTime: number, index: number) {
        const id = parseInt(itemId.toString().slice(1));
        if (itemId.toString()[0] === '1') {
            const name = items.filter((x) => x.id === itemId)[0].title;
            const color = items.filter((x) => x.id === itemId)[0].color;
            const newEndTime = newStartTime - items[index].start_time + parseInt(items[index].end_time + '');

            dispatch(updateTimelineItem(id, newStartTime, newEndTime, name, color));
        }
        if (itemId.toString()[0] === '2') {
            const name = dateItems.filter((x) => x.id === itemId)[0].title;
            const color = dateItems.filter((x) => x.id === itemId)[0].color;

            dispatch(updateDatelineItem(id, newStartTime, name, color));
        }
        dispatch(toggleLoadingAction(true));
    }

    function handleItemDoubleClick(itemId: number, e: any, startTime: number) {
        dispatch(setTargetUpdateElementAction(itemId));
        dispatch(triggerUpdateTimelineModalAction(!toggleUpdateModal));
    }

    useEffect(() => {
        let timeout = setTimeout(() => dispatch(toggleLoadingAction(false)), 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [loading, zoom, dispatch]);

    return (
        <div id='timeline-container'>
            {loading ? (
                <div id='loader-container'>
                    <ClockLoader color={'#238BE6'} loading={loading} size={200} aria-label='Loading Spinner' data-testid='loader' />
                </div>
            ) : (
                <Timeline
                    groups={groups}
                    items={setHideByType ? (setHideByType === 'dates' ? [...items] : [...dateItems]) : [...items, ...dateItems]}
                    defaultTimeStart={defaultTimeStart}
                    defaultTimeEnd={defaultTimeEnd}
                    visibleTimeStart={autofit ? firstStartedTime - 2.592e8 : now ? startPointAnchor : undefined}
                    visibleTimeEnd={autofit ? lastEndedTime + 2.592e8 : now ? endPointAnchor : undefined}
                    useResizeHandle
                    sidebarWidth={toggle ? 30 : 150}
                    keys={keys}
                    stackItems={stack}
                    itemHeightRatio={0.8}
                    canMove
                    canResize={'both'}
                    onItemMove={handleItemMove}
                    onItemResize={handleItemResize}
                    onItemDoubleClick={handleItemDoubleClick}
                    dragSnap={interval}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    lineHeight={itemHeight}
                    timeSteps={{
                        second: 60,
                        minute: 60,
                        hour: 12,
                        day: 1,
                        month: 1,
                        year: 1
                    }}
                >
                    <TimelineHeaders>
                        <SidebarHeader>
                            {({ getRootProps }) => {
                                return (
                                    <div id='left-bar' {...getRootProps()}>
                                        <span id='toggle-arrow' onClick={() => setToggle((state) => !state)}>
                                            {toggle ? <IconArrowBadgeRight size={30} /> : <IconArrowBadgeLeft size={30} />}
                                        </span>
                                    </div>
                                );
                            }}
                        </SidebarHeader>
                        <DateHeader unit='primaryHeader' labelFormat={'YYYY MMM'} />
                        <DateHeader unit='day' labelFormat={'D'} style={{ fontSize: '10px', color: '#999999' }} />
                        <TimelineMarkers>
                            {show && (
                                <CustomMarker date={firstStartedTime}>
                                    {({ styles, date }) => {
                                        const customStyles = {
                                            ...styles,
                                            background: 'darkgreen',
                                            width: '4px'
                                        };
                                        return (
                                            <div
                                                className='pin-container'
                                                style={customStyles}
                                                onClick={() => {
                                                    return;
                                                }}
                                            >
                                                <span
                                                    className='pin-label'
                                                    style={{
                                                        background: 'darkgreen',
                                                        right: '10px'
                                                    }}
                                                >
                                                    Start Date : {new Date(firstStartedTime).toDateString()}
                                                </span>
                                                <span className='pin'>
                                                    <IconPinned size={30} />
                                                </span>
                                            </div>
                                        );
                                    }}
                                </CustomMarker>
                            )}
                            {show && (
                                <CustomMarker date={Date.now()}>
                                    {({ styles, date }) => {
                                        const customStyles = {
                                            ...styles,
                                            background: 'deepskyblue',
                                            width: '4px'
                                        };
                                        return (
                                            <div
                                                className='pin-container'
                                                style={customStyles}
                                                onClick={() => {
                                                    return;
                                                }}
                                            >
                                                <span
                                                    className='pin-label'
                                                    style={{
                                                        background: 'deepskyblue',
                                                        right: '10px'
                                                    }}
                                                >
                                                    Today : {new Date(Date.now()).toDateString()}
                                                </span>
                                                <span className='pin'>
                                                    <IconPinned size={30} />
                                                </span>
                                            </div>
                                        );
                                    }}
                                </CustomMarker>
                            )}
                            {show && (
                                <CustomMarker date={lastEndedTime}>
                                    {({ styles, date }) => {
                                        const customStyles = {
                                            ...styles,
                                            background: 'deeppink',
                                            width: '4px'
                                        };
                                        return (
                                            <div
                                                className='pin-container'
                                                style={customStyles}
                                                onClick={() => {
                                                    return;
                                                }}
                                            >
                                                <span
                                                    className='pin-label'
                                                    style={{
                                                        background: 'deeppink',
                                                        left: '10px'
                                                    }}
                                                >
                                                    End Date : {new Date(lastEndedTime).toDateString()}
                                                </span>
                                                <span className='pin' title='End Date'>
                                                    <IconPinned size={30} />
                                                </span>
                                            </div>
                                        );
                                    }}
                                </CustomMarker>
                            )}
                        </TimelineMarkers>
                    </TimelineHeaders>
                </Timeline>
            )}
            <ChangNameColorModal />
        </div>
    );
}
