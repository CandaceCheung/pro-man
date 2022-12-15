import { FormEvent, useEffect, useState } from 'react';
import { Modal, Button, Group, Input, Tooltip, Stack, ColorPicker } from '@mantine/core';
import { IconAlertCircle, IconIndentIncrease } from '@tabler/icons';
import { useId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleLoadingAction, triggerUpdateTimelineModalAction } from '../../redux/project/slice';
import { updateDatelineItem, updateTimelineItem } from '../../redux/table/thunk';


export function ChangNameColorModal() {
  const dispatch = useAppDispatch()
  const opened = useAppSelector(state => state.project.update_time_line_modal_opened)
  const targetElementId = useAppSelector(state => state.project.target_element_id)
  const itemType = targetElementId.toString()[0] === '0' ? null : targetElementId.toString()[0] === '1' ? 'times' : 'dates'
  const itemId = parseInt(targetElementId.toString().slice(1))
  const page = useAppSelector(state => state.project.active_page)
  const id = useId()
  const projectSummary = useAppSelector(state => state.table.summary)
  const dateItem = projectSummary.filter(project => project.item_times_id === itemId && project.type_name==='times')[0]
  const timeItem = projectSummary.filter(project => project.item_times_id === itemId && project.type_name==='times')[0]
  const [color, setColor] = useState('#FFFFFF')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (itemType === 'dates') {
      setColor(dateItem.item_datetime_color)
      setName(dateItem.element_name)
    }
    if (itemType === 'times') {
      setColor(timeItem.item_times_color)
      setName(timeItem.element_name)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetElementId, itemType])


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (itemType === 'dates') {
      const date = dateItem.item_dates_datetime
      dispatch(updateDatelineItem(itemId, new Date(date).getTime(), name, color))
    } else {
      const start = timeItem.item_times_start_date
      const end = timeItem.item_times_end_date
      dispatch(updateTimelineItem(itemId, start, end, name, color))
    }
    dispatch(toggleLoadingAction(true))
    onClose()
  }

  const onClose = () => {
    if (page === 'timeline') dispatch(triggerUpdateTimelineModalAction(false))
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title="Update Item"
      >
        <form
          onSubmit={handleSubmit}
        >
          <Input.Wrapper id={id} label={itemType === "times" ? 'Time Block Name' : 'Date Block Name'}>
            <Input
              type='text'
              value={name}
              onChange={(e)=>setName(e.target.value)}
              icon={<IconIndentIncrease size={16} />}
              required
              placeholder="Change Name"
              rightSection={
                <Tooltip label="This will be shown on the time block" position="top-end" withArrow>
                  <div >
                    <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />
                  </div>
                </Tooltip>
              }
            />
          </Input.Wrapper>
          <Input.Wrapper id={id} label="Select Item Color">

            <Stack align="center">
              <ColorPicker
                value={color}
                onChange={setColor}
                format='hexa'
              />
            </Stack>
          </Input.Wrapper>

          <Group position="center" mt="xl">
            <Button variant="outline" type='submit'>
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}