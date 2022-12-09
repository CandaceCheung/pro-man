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
        background: 'fuchsia'
      }
    }
  },
  {
    id: 2,
    group: 2,
    title: 'item 2',
    start_time: moment().add(-0.5, 'day'),
    end_time: moment().add(0.5, 'day')
  },
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'day'),
    end_time: moment().add(3, 'day')
  }
]

const defaultZoom = 7 * 24 * 60 * 60 * 1000;

export function TestTimeFrame() {
  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}

        // keys={keys}
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
        minZoom={defaultZoom}
        maxZoom={defaultZoom}
        // onItemDoubleClick={updateItems}
        lineHeight={50}
      />
    </div>
  )
}