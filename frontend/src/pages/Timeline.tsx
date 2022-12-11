import '../components/styles/Timeline.css'
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers} from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { useAppSelector } from '../store'
import { IconArrowBadgeLeft, IconArrowBadgeRight } from '@tabler/icons'
import { useEffect, useState } from 'react'
import moment from 'moment';
import React from 'react'
import { TimeLineViewState } from '../redux/project/slice'

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

export function TimeFrame() {
  
  const targetProjectId = useAppSelector(state => state.project.project_id)
  const projectSummary = useAppSelector(state => state.table)
  const timelineDetail = projectSummary.filter((project) => project.project_id === targetProjectId && project.type_name === 'times')
  const [toggle, setToggle] = useState<boolean|null>(false)
  const autofit = useAppSelector(state=> state.project.time_line_autofit)
  const zoom = useAppSelector(state =>state.project.time_line_view)
  const startPointAnchor = useAppSelector(state=> state.project.time_line_start_anchor)
  const endPointAnchor = useAppSelector(state=> state.project.time_line_end_anchor)
  const now = useAppSelector(state =>state.project.time_line_now)
  const minZoom = 1 * 24 * 60 * 60 * 1000;
  const maxZoom = 31 * 24 * 60 * 60 * 1000;
  const defaultTimeStart = moment().startOf('day');
  const defaultTimeEnd = moment().add(1, zoom);
  const interval = 24 * 60 * 60 * 1000;

  let groups = []
  let items = []
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
      start_time: new Date(item.item_times_start_date).getTime(),
      end_time: new Date(item.item_times_end_date).getTime(),
      canMove: true,
      canResize: false,
      canChangeGroup: false,
      itemProps: {
        'data-custom-attribute': 'Random content',
        'aria-hidden': true,
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
    lastEndedTime = Math.max(new Date(item.item_times_end_date).getTime(), lastEndedTime)
  }

  let firstStartedTime = lastEndedTime
  for (let item of timelineDetail) {
    firstStartedTime = Math.min(new Date(item.item_times_end_date).getTime(), firstStartedTime)
  }
  
  function openPanel() {
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
        sidebarWidth={toggle? 30:150}
        keys={keys}
        // fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove
        canResize={'both'}
        // onItemMove={handleItemMove}
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
                <span id='toggle-arrow' onClick={()=>setToggle((state)=>!state)}>{toggle ? <IconArrowBadgeRight size={30} />:<IconArrowBadgeLeft size={30} />}</span>
              </div>;
            }}
          </SidebarHeader>
          <DateHeader unit="primaryHeader" labelFormat={'YYYY MMM'} />
          <DateHeader
            unit="day"
            labelFormat={'D, ddd'}
            style={{fontSize: '10px', color: '#999999' }}
          />
          <TimelineMarkers>
            <CustomMarker date={Date.now()}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: '#636CD2',
                  width: '4px'
                }
                return <div style={customStyles} onClick={() => { return }} />
              }}
            </CustomMarker>
            <CustomMarker date={new Date(lastEndedTime)}>
              {({ styles, date }) => {
                const customStyles = {
                  ...styles,
                  backgroundColor: 'deeppink',
                  width: '4px'
                }
                return <div style={customStyles} onClick={() => { return }} />
              }}
            </CustomMarker>
          </TimelineMarkers>
        </TimelineHeaders>
      </Timeline>
    </div>
  )
}