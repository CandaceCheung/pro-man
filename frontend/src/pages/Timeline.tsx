import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { defaultTimeEnd, defaultTimeStart, interval } from '../components/TimelineComponents/config'

const groups = [{ id: 1, title: 'group 1' }, { id: 2, title: 'group 2' }]

const items = [
  {
    id: 1,
    group: 1,
    title: 'Random title',
    start_time: moment().add(4, 'day'),
    end_time: moment().add(7, 'day'),
    canMove: true,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia',
        borderRadius: '10px',
      }
    }
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'day'),
    end_time: moment().add(0.5, 'day'),
    itemProps: {
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'green',
        borderRadius: '10px',
      }
    }
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'day'),
    end_time: moment().add(3, 'day')
  },
  {
    id: 4,
    group: 1,
    title: 'item 4',
    start_time: moment().add(2, 'day'),
    end_time: moment().add(3, 'day')
  }
]

const keys = { // default
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
  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        useResizeHandle
        sidebarWidth={150}
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
        // timeSteps={{hour: 12}}
        dragSnap={interval}
        minZoom={minZoom}
        maxZoom={maxZoom}
        // onItemDoubleClick={updateItems}
        lineHeight={50}
      />
    </div>
  )
}