import '../components/styles/Timeline.css'
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { useAppDispatch, useAppSelector } from '../store'
import { IconArrowBadgeLeft, IconArrowBadgeRight, IconPinned } from '@tabler/icons'
import { useEffect, useState } from 'react'
import moment from 'moment';
import React from 'react'
import { updateTimelineItem } from '../redux/table/thunk'

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

type ItemProps = {
  id: number
  group: number
  title: string
  start_time: number
  end_time: number
  canMove?: boolean
  canResize?: boolean
  canChangeGroup?: boolean
  itemProps?: {}
}[]

export function TimeFrame() {

  const dispatch = useAppDispatch()
  const targetProjectId = useAppSelector(state => state.project.project_id)
  const projectSummary = useAppSelector(state => state.table)
  const timelineDetail = projectSummary.filter((project) => project.project_id === targetProjectId && project.type_name === 'times').sort((a, b) => a.item_group_id - b.item_group_id)
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

  let groups = []
  let items: ItemProps = []
  for (let item of timelineDetail) {
    let checking: number[] = []
    if (!checking.includes(item.item_id)) {
      checking.push(item.item_id)
      groups.push({
        id: item.item_id,
        title: item.item_name
      })
    }
  }


  for (let item of timelineDetail) {
    items.push({
      id: item.item_times_id,
      group: item.item_id,
      title: item.element_name,
      start_time: item.item_times_start_date,
      end_time: item.item_times_end_date,
      canMove: true,
      canResize: true,
      canChangeGroup: false,
      itemProps: {
        'key': item.item_times_id + '',
        'aria-hidden': false,
        onDoubleClick: () => { openPanel() },
        className: 'time-block',
        style: {
          backgroundColor: item.item_times_color,
          borderRadius: '10px',
        }
      }
    })
  }

  let lastEndedTime = 0
  for (let item of timelineDetail) {
    lastEndedTime = Math.max(item.item_times_end_date, lastEndedTime)
  }

  let firstStartedTime = lastEndedTime
  for (let item of timelineDetail) {
    firstStartedTime = Math.min(item.item_times_end_date, firstStartedTime)
  }
  const lastEndDate = new Date(lastEndedTime)
  const firstStartDate = new Date(firstStartedTime)

  function openPanel() {
  }

  function handleItemMove(itemId: number, newStartTime: number, index: number) {
    const newEndTime = newStartTime - items[index].start_time + parseInt(items[index].end_time + "")
    dispatch(updateTimelineItem(itemId, newStartTime, newEndTime))
  }



  return (
    <div id='timeline-container' className='container container-fluid'>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        visibleTimeStart={autofit ? firstStartedTime : now ? startPointAnchor : undefined}
        visibleTimeEnd={autofit ? lastEndedTime : now ? endPointAnchor : undefined}
        useResizeHandle
        sidebarWidth={toggle ? 30 : 150}
        keys={keys}
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove
        canResize={'both'}
        onItemMove={handleItemMove}
        // onItemResize={handleItemResize}
        dragSnap={interval}
        minZoom={minZoom}
        maxZoom={maxZoom}
        // onItemDoubleClick={updateItems}
        lineHeight={50}
        traditionalZoom={true}
        timeSteps={{
          second: 60,
          minute: 60,
          hour: 24,
          day: 1,
          month: 1,
          year: 1
        }}
      // onItemClick={viewMenu}
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
            {show && <CustomMarker date={Date.now()}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'deepskyblue',
                  width: '4px'
                }
                return <div className='pin-container' style={customStyles} onClick={() => { return }}><span className='pin-label' style={{ backgroundColor: 'deepskyblue', right: '10px' }}>Today : {new Date(Date.now()).toDateString()}</span><span className='pin'><IconPinned size={30} /></span></div>


              }}
            </CustomMarker>}
            {show && <CustomMarker date={lastEndDate}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'deeppink',
                  width: '4px'
                }
                return <div className='pin-container' style={customStyles} onClick={() => { return }}><span className='pin-label' style={{ backgroundColor: 'deeppink', left: '10px' }}>End Date : {lastEndDate.toDateString()}</span><span className='pin' title='End Date'><IconPinned size={30} /></span></div>

              }}
            </CustomMarker>
            }
          </TimelineMarkers>
        </TimelineHeaders>
      </Timeline>
    </div>
  )
}