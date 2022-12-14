import '../components/styles/Timeline.css'
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { useAppDispatch, useAppSelector } from '../store'
import { IconArrowBadgeLeft, IconArrowBadgeRight, IconPinned } from '@tabler/icons'
import { useEffect, useState } from 'react'
import moment from 'moment';
import { updateDatelineItem, updateTimelineItem } from '../redux/table/thunk'
import { AddNewItemModal } from '../components/TimelineComponents/TimelineAddNewItemModal'
import ClockLoader from "react-spinners/ClockLoader";
import { setTargetUpdateElementAction, toggleLoadingAction, triggerUpdateTimelineModalAction } from '../redux/project/slice'
import { ChangNameColorModal } from '../components/TimelineComponents/ChangeNameColorModal'


const keys = { // default key name
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',    // key for item div content
  itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
}

export type GroupState = {
  id: number
  title: string
  groupId: number
  groupName: string
}[]

type ItemState = {
  id: number
  group: number
  title: string
  type_id: number
  start_time: number
  end_time: number
  color: string
  canMove?: boolean
  canResize?: boolean
  canChangeGroup?: boolean
  itemProps?: {}
}[]

export function TimeFrame() {

  const dispatch = useAppDispatch()
  const targetProjectId = useAppSelector(state => state.project.project_id)
  const projectSummary = useAppSelector(state => state.table.summary)
  const timelineDetail = projectSummary.filter((project) => project.project_id === targetProjectId && project.type_name === 'times').sort((a, b) => a.item_group_id - b.item_group_id)
  const datelineDetail = projectSummary.filter((project) => project.project_id === targetProjectId && project.type_name === 'dates').sort((a, b) => a.item_group_id - b.item_group_id)
  const [toggle, setToggle] = useState<boolean | null>(false)
  const autofit = useAppSelector(state => state.project.time_line_autofit)
  const zoom = useAppSelector(state => state.project.time_line_view)
  const startPointAnchor = useAppSelector(state => state.project.time_line_start_anchor)
  const endPointAnchor = useAppSelector(state => state.project.time_line_end_anchor)
  const now = useAppSelector(state => state.project.time_line_now)
  const show = useAppSelector(state => state.project.time_line_show_marker)
  const minZoom = 1 * 24 * 60 * 60 * 1000;
  const maxZoom = 31 * 24 * 60 * 60 * 1000;
  const defaultTimeStart = moment().startOf('day');
  const defaultTimeEnd = moment().add(1, zoom);
  const interval = 24 * 60 * 60 * 1000;
  const loading = useAppSelector(state=>state.project.toggle_loading)
  const toggleUpdateModal = useAppSelector(state=>state.project.update_time_line_modal_opened)
   
  let groups: GroupState = []
  let items: ItemState = []
  let dateItems: ItemState = []

  for (let item of timelineDetail) {
    let checking: number[] = []
    if (!checking.includes(item.item_id)) {
      checking.push(item.item_id)
      groups.push({
        id: item.item_id,
        title: item.item_name,
        groupId: item.item_group_id,
        groupName: item.item_group_name
      })
    }
  }

  for (let item of timelineDetail) {
    items.push({
      id: parseInt('1' + item.item_times_id),
      group: item.item_id,
      title: item.element_name,
      type_id: item.horizontal_order_id,
      start_time: item.item_times_start_date,
      end_time: item.item_times_end_date,
      color: item.item_times_color,
      canMove: true,
      canResize: true,
      canChangeGroup: false,
      itemProps: {
        'aria-hidden': false,
        className: 'time-block',
        style: {
          background: item.item_times_color,
          borderRadius: '10px',
          border: 'none',
        }
      }
    })
  }

  for (let item of datelineDetail) {
    dateItems.push({
      id: parseInt('2' + item.item_datetime_id),
      group: item.item_id,
      title: item.element_name,
      type_id: item.horizontal_order_id,
      start_time: new Date(item.item_dates_datetime).getTime(),
      end_time: new Date(item.item_dates_datetime).getTime() + 8.64e+7,
      color: item.item_datetime_color,
      canMove: true,
      canResize: false,
      canChangeGroup: false,
      itemProps: {
        'aria-hidden': false,
        className: 'date-block',
        style: {
          background: item.item_datetime_color,
          border: '4px solid darkgrey'
        }
      }
    })
  }

  let lastEndedTime = 0
  for (let item of timelineDetail) {
    lastEndedTime = Math.max(item.item_times_end_date, lastEndedTime)
    lastEndedTime = Math.max(new Date(item.item_dates_datetime).getTime() + 8.64e+7, lastEndedTime)
  }
  let firstStartedTime = lastEndedTime
  for (let item of timelineDetail) {
    firstStartedTime = Math.min(item.item_times_start_date, firstStartedTime)
    firstStartedTime = Math.min(new Date(item.item_dates_datetime).getTime(), firstStartedTime)
  }
  
  function handleItemResize(itemId: number, time: number, edge: 'left' | 'right') {
    if (itemId.toString()[0] === '1') {
      const id = parseInt(itemId.toString().slice(1))
      const originalStartTime = items.filter(x => x.id === itemId)[0].start_time
      const originalEndTime = items.filter(x => x.id === itemId)[0].end_time
      const name = items.filter(x => x.id === itemId)[0].title
      const color = items.filter(x => x.id === itemId)[0].color
      let newStartTime = originalStartTime
      let newEndTime = originalEndTime
      if (edge === 'left') {
        newStartTime = time
      } else if (edge === 'right') {
        newEndTime = time
      }
      dispatch(updateTimelineItem(id, newStartTime, newEndTime, name, color))
      dispatch(toggleLoadingAction(true))
    }
  }

  function handleItemMove(itemId: number, newStartTime: number, index: number) {
    const id = parseInt(itemId.toString().slice(1))
    if (itemId.toString()[0] === '1') {
      const name = items.filter(x => x.id === itemId)[0].title
      const color = items.filter(x => x.id === itemId)[0].color
      const typeId = items.filter(x => x.id === itemId)[0].type_id
      const newEndTime = newStartTime - items[index].start_time + parseInt(items[index].end_time + "")
      
      console.log(typeId, name)
      dispatch(updateTimelineItem(id, newStartTime, newEndTime, name, color))
    }
    if (itemId.toString()[0] === '2') {
      const name = dateItems.filter(x => x.id === itemId)[0].title
      const color = dateItems.filter(x => x.id === itemId)[0].color
      const typeId = dateItems.filter(x => x.id === itemId)[0].type_id
      console.log(typeId, name)

      dispatch(updateDatelineItem(id, newStartTime, name, color))
    }
    dispatch(toggleLoadingAction(true))
  }

  function handleItemDoubleClick(itemId: number, e: any, startTime: number) {
    dispatch(setTargetUpdateElementAction(itemId))
    dispatch(triggerUpdateTimelineModalAction(!toggleUpdateModal))
  }

  useEffect(() => {
    let timeout = setTimeout(() => dispatch(toggleLoadingAction(false)), 500)
    return ()=>{clearTimeout(timeout)}
  }, [loading, zoom])

  return (
    <div id='timeline-container'>
      {loading ?
        <div id='loader-container'>
          <ClockLoader
            color={'#238BE6'}
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
        :
        <Timeline
          groups={groups}
          items={[...items, ...dateItems]}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          visibleTimeStart={autofit ? firstStartedTime - 2.592e+8 : now ? startPointAnchor : undefined}
          visibleTimeEnd={autofit ? lastEndedTime + 2.592e+8 : now ? endPointAnchor : undefined}
          useResizeHandle
          sidebarWidth={toggle ? 30 : 150}
          keys={keys}
          stackItems={true}
          itemHeightRatio={0.75}
          canMove
          canResize={'both'}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          onItemDoubleClick={handleItemDoubleClick}
          dragSnap={interval}
          minZoom={minZoom}
          maxZoom={maxZoom}
          lineHeight={50}
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
                return <div
                  id='left-bar' {...getRootProps()}>
                  <span id='toggle-arrow' onClick={() => setToggle((state) => !state)}>{toggle ? <IconArrowBadgeRight size={30} /> : <IconArrowBadgeLeft size={30} />}</span>
                </div>;
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" labelFormat={'YYYY MMM'} />
            <DateHeader

              unit="day"
              labelFormat={'D, ddd'}
              style={{ fontSize: '10px', color: '#999999' }}
            />
            <TimelineMarkers>
              {show && <CustomMarker date={firstStartedTime}>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    background: 'darkgreen',
                    width: '4px'
                  }
                  return <div
                    className='pin-container'
                    style={customStyles}
                    onClick={() => { return }}>
                    <span
                      className='pin-label'
                      style={{ background: 'darkgreen', right: '10px' }}
                    >Start Date : {new Date(firstStartedTime).toDateString()}
                    </span>
                    <span className='pin'><IconPinned size={30} />
                    </span>
                  </div>
                }}
              </CustomMarker>}
              {show && <CustomMarker date={Date.now()}>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    background: 'deepskyblue',
                    width: '4px'
                  }
                  return <div className='pin-container' style={customStyles} onClick={() => { return }}><span className='pin-label' style={{ background: 'deepskyblue', right: '10px' }}>Today : {new Date(Date.now()).toDateString()}</span><span className='pin'><IconPinned size={30} /></span></div>


                }}
              </CustomMarker>}
              {show && <CustomMarker date={lastEndedTime}>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    background: 'deeppink',
                    width: '4px'
                  }
                  return <div className='pin-container' style={customStyles} onClick={() => { return }}><span className='pin-label' style={{ background: 'deeppink', left: '10px' }}>End Date : {new Date(lastEndedTime).toDateString()}</span><span className='pin' title='End Date'><IconPinned size={30} /></span></div>

                }}
              </CustomMarker>
              }
            </TimelineMarkers>
          </TimelineHeaders>
        </Timeline>
      }
      <ChangNameColorModal /> 
      <AddNewItemModal groups={groups} />
    </div>
  )
}