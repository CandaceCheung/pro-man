import { FormEvent, useEffect, useState } from 'react';
import { Modal, Button, Group, Input, Tooltip, Stack, ColorPicker } from '@mantine/core';
import { IconAlertCircle, IconIndentIncrease } from '@tabler/icons';
import { useId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { triggerUpdateTimelineModalAction } from '../../redux/project/slice';
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
  const [color, setColor] = useState('#FFFFFF')
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<string>('')

  useEffect(() => {
    if (itemType === 'dates') {
      setType('dates')
      setColor(projectSummary.filter(project => project.item_datetime_id === itemId)[0].item_datetime_color)
      setName(projectSummary.filter(project => project.item_datetime_id === itemId)[0].element_name)
    }
    if (itemType === 'times') {
      setType('times')
      setColor(projectSummary.filter(project => project.item_times_id === itemId)[0].item_times_color)
      setName(projectSummary.filter(project => project.item_times_id === itemId)[0].element_name)
    }
  }, [targetElementId])


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (itemType === 'dates') {
      const date = projectSummary.filter((item)=> item.item_datetime_id===itemId)[0].item_dates_datetime
      dispatch(updateDatelineItem(itemId, new Date(date).getTime(), name, color))
    }
    if (itemType === 'times') {
      const start = projectSummary.filter((item)=> item.item_times_id===itemId)[0].item_times_start_date
      const end = projectSummary.filter((item)=> item.item_times_id===itemId)[0].item_times_end_date
      dispatch(updateTimelineItem(itemId, start, end, name, color))
    }
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