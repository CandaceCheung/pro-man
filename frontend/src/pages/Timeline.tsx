/* eslint-disable */
import '../components/styles/Timeline.css'
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { defaultTimeEnd, defaultTimeStart, interval } from '../components/TimelineComponents/config'
import { useAppSelector } from '../store'
import { IconArrowBadgeLeft, IconArrowBadgeRight } from '@tabler/icons'
import { useState } from 'react'


// let groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]
// let items = [
//   {
//     id: 1,
//     group: 1,
//     title: 'Random title',
//     start_time: moment().add(4, 'day'),
//     end_time: moment().add(7, 'day'),
//     canMove: true,
//     canResize: false,
//     canChangeGroup: false,
//     itemProps: {
//       // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
//       'data-custom-attribute': 'Random content',
//       'aria-hidden': true,
//       onDoubleClick: () => { console.log('You clicked double!') },
//       className: 'weekend',
//       style: {
//         background: 'fuchsia',
//         borderRadius: '10px',
//       }
//     }
//   },
// ]

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

const minZoom = 7 * 24 * 60 * 60 * 1000;
const maxZoom = 31 * 24 * 60 * 60 * 1000;

const sideBarObj = "Test"


export function TestTimeFrame() {

  const targetProjectId = useAppSelector(state => state.project.project_id)
  const projectSummary = useAppSelector(state => state.table)
  const timelineDetail = projectSummary.filter((project) => project.project_id === targetProjectId && project.type_name === 'times')
  const [toggle, setToggle] = useState<boolean|null>(false)

  console.log(timelineDetail)
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
          background: 'fuchsia',
          borderRadius: '10px',
        }
      }
    })
  }

  let lastEndedTime = 0
  for (let item of timelineDetail) {
    lastEndedTime = Math.max(new Date(item.item_times_end_date).getTime(), lastEndedTime)
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
        useResizeHandle
        sidebarWidth={toggle? 30:150}
        sidebarContent={sideBarObj}
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
          <DateHeader unit="primaryHeader" />
          <DateHeader
            unit="day"
            labelFormat='YY-MMM-D'
            style={{ height: 50, width: 100, color: '#999999' }}
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