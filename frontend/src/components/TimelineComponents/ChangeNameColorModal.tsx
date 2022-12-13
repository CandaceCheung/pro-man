import { useEffect, useState } from 'react';
import { Modal, Button, Group, Input, Tooltip, Stack, ColorPicker } from '@mantine/core';
import { IconAlertCircle, IconIndentIncrease } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { DatePicker, DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import { triggerUpdateTimelineModalAction } from '../../redux/project/slice';


export type ChangNameColorModalProps = {
  itemId: number
}

export function ChangNameColorModal(props: ChangNameColorModalProps) {
  const dispatch = useAppDispatch()
  const opened = useAppSelector(state => state.project.update_time_line_modal_opened)
  const itemType = props.itemId.toString()[0] === '1' ? 'times' : 'dates'
  const [itemId, setItemId] = useState(0)
  const page = useAppSelector(state => state.project.active_page)
  const id = useId()
  const projectSummary = useAppSelector(state => state.table.summary)
  const itemDetail = itemType === 'times' ? projectSummary.filter((project) => project.item_times_id === itemId)[0] : projectSummary.filter((project) => project.item_datetime_id === itemId)[0]
  const year = parseInt(new Date().toLocaleString("default", { year: "numeric" }));
  const month = parseInt(new Date().toLocaleString("default", { month: "2-digit" }));
  const day = parseInt(new Date().toLocaleString("default", { day: "2-digit" }));
  const [color, setColor] = useState('rgba(47, 119, 150, 0.7)')
  const [dateValue, setDateValue] = useState<DateRangePickerValue>([
    new Date(year, month, day),
    new Date(year, month, day + 1)
  ]);

  const [submittedValues, setSubmittedValues] = useState<string>('')

  useEffect(() => {
    if (props.itemId) {
      setItemId(parseInt(props.itemId.toString().slice(1)))
    }
  }, [])

  const handleSubmit = (value: string) => {
    setSubmittedValues(value)
    console.log(value)
    onClose()
  }

  const onClose = () => {
    if (page === 'timeline') dispatch(triggerUpdateTimelineModalAction(false))
  }

  const form = useForm({
    initialValues: {
      type: 'times',
      block_name: '',
      item_id: 0,
      date_range: [new Date(year, month, day), new Date(year, month, day + 1)],
      color: 'rgba(47, 119, 150, 0.7)',
      date: new Date()
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title="Update Item"
      >
        <form
          onSubmit={form.onSubmit((value) => handleSubmit(JSON.stringify(value, null, 2)))}
        >

          <Input.Wrapper id={id} label={itemType === "times" ? 'Time Block Name' : 'Date Block Name'}>
            <Input
              icon={<IconIndentIncrease size={16} />}
              required

              {...form.getInputProps('block_name')}
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
          {itemType === 'times' ?
            <DateRangePicker
              {...form.getInputProps('date_range')}
              label="Pick Date Range"
              placeholder="Pick dates range"
              value={dateValue}
              onChange={setDateValue}
            /> : itemType === 'dates' ?
              <DatePicker
                {...form.getInputProps('date')}
                placeholder="Pick date" label="Event date" withAsterisk />
              : null}
          <Input.Wrapper id={id} label="Select Item Color">

            <Stack align="center">
              <ColorPicker {...form.getInputProps('color')} format="rgba" value={color} onChange={setColor} />
            </Stack>
          </Input.Wrapper>

          <Group position="center" mt="xl">
            <Button variant="outline" type='submit'>
              Submit
            </Button>
            <Button
              variant="outline"
              onClick={() => form.reset()}
            >
              Clear Form
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}