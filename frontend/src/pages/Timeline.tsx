import '../components/styles/Timeline.css'
import Timeline, { CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import { useAppDispatch, useAppSelector } from '../store'
import { IconArrowBadgeLeft, IconArrowBadgeRight, IconPinned } from '@tabler/icons'
import { useEffect, useState } from 'react'
import moment from 'moment';
import { updateDatelineItem, updateTimelineItem } from '../redux/table/thunk'
import { TimeLineAddNewItemModal } from '../components/TimelineComponents/TimelineAddNewItemModal'
import ClockLoader  from "react-spinners/ClockLoader";

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
  const [loading, setLoading] = useState(true)

  let groups = []
  let items: ItemProps = []
  let dateItems: ItemProps = []
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
      id: parseInt('1' + item.item_times_id),
      group: item.item_id,
      title: item.element_name,
      start_time: item.item_times_start_date,
      end_time: item.item_times_end_date,
      canMove: true,
      canResize: true,
      canChangeGroup: false,
      itemProps: {
        'aria-hidden': true,
        className: 'time-block',
        style: {
          backgroundColor: item.item_times_color,
          borderRadius: '10px',
          border: 'none'
        }
      }
    })
  }

  for (let item of datelineDetail) {
    dateItems.push({
      id: parseInt('2' + item.item_datetime_id),
      group: item.item_id,
      title: item.element_name,
      start_time: new Date(item.item_dates_datetime).getTime(),
      end_time: new Date(item.item_dates_datetime).getTime() + 8.64e+7,
      canMove: true,
      canResize: false,
      canChangeGroup: false,
      itemProps: {
        'aria-hidden': true,
        className: 'date-block',
        style: {
          backgroundColor: item.item_datetime_color,
          borderStyle: 'solid',
          borderWidth: '4px',
          borderColor: 'darkgrey',
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
      let newStartTime = originalStartTime
      let newEndTime = originalEndTime
      if (edge === 'left') {
        newStartTime = time
      } else if (edge === 'right') {
        newEndTime = time
      }
      dispatch(updateTimelineItem(id, newStartTime, newEndTime))
      setLoading(true)
    }
  }

  function handleItemMove(itemId: number, newStartTime: number, index: number) {
    if (itemId.toString()[0] === '1') {
      const newEndTime = newStartTime - items[index].start_time + parseInt(items[index].end_time + "")
      const id = parseInt(itemId.toString().slice(1))
      dispatch(updateTimelineItem(id, newStartTime, newEndTime))
    } else if (itemId.toString()[0] === '2') {
      const id = parseInt(itemId.toString().slice(1))
      dispatch(updateDatelineItem(id, newStartTime))
    }
    setLoading(true)
  }

  function handleItemSelect(itemId: number, e: any, time: number) {
    console.log(itemId, e, time)
  }
  function handleItemDeselect(e: any) {
    console.log(e)
  }

  const lastEndDate = new Date(lastEndedTime)
  const firstStartDate = new Date(firstStartedTime)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [loading])

  return (
    <div id='timeline-container'>
      {loading ?
        <div id='loader-container'>
        <ClockLoader 
          color={'#238BE6'}
          loading={loading}
          size={150}
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
          stackItems
          itemHeightRatio={0.75}
          canMove
          canResize={'both'}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          onItemSelect={handleItemSelect}
          onItemDeselect={handleItemDeselect}
          dragSnap={interval}
          minZoom={minZoom}
          maxZoom={maxZoom}
          // onItemDoubleClick={updateItems}
          lineHeight={50}
          timeSteps={{
            second: 60,
            minute: 60,
            hour: 12,
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
              {show && <CustomMarker date={firstStartDate}>
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    backgroundColor: 'darkgreen',
                    width: '4px'
                  }
                  return <div className='pin-container' style={customStyles} onClick={() => { return }}><span className='pin-label' style={{ backgroundColor: 'darkgreen', right: '10px' }}>Start Date : {new Date(firstStartDate).toDateString()}</span><span className='pin'><IconPinned size={30} /></span></div>


                }}
              </CustomMarker>}
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
      }
      <TimeLineAddNewItemModal groups={groups} />
    </div>
  )
}