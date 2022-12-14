import { useEffect, useState } from 'react';
import { Modal, Button, Group, Input, Tooltip, Stack, ColorPicker } from '@mantine/core';
import { IconAlertCircle, IconIndentIncrease } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { triggerUpdateTimelineModalAction } from '../../redux/project/slice';


export function ChangNameColorModal() {
  const dispatch = useAppDispatch()
  const opened = useAppSelector(state => state.project.update_time_line_modal_opened)
  const targetElementId = useAppSelector(state => state.project.target_element_id)
  const itemType = targetElementId.toString()[0] === '0' ? null : targetElementId.toString()[0] === '1' ? 'times' : 'dates'
  const page = useAppSelector(state => state.project.active_page)
  const id = useId()
  const projectSummary = useAppSelector(state => state.table.summary)
  const [color, setColor] = useState('#FFFFFF')
  const [name, setName] = useState<string>('')
  const [submittedValues, setSubmittedValues] = useState<string>('')

  useEffect(() => {
    if (targetElementId !== 0) {
      const itemId = parseInt(targetElementId.toString().slice(1))
      if (itemType === 'dates') {
        setColor(projectSummary.filter(project => project.item_datetime_id === itemId)[0].item_datetime_color)
        setName(projectSummary.filter(project => project.item_datetime_id === itemId)[0].element_name)
      }
      if (itemType === 'times') {
        setColor(projectSummary.filter(project => project.item_times_id === itemId)[0].item_times_color)
        setName(projectSummary.filter(project => project.item_times_id === itemId)[0].element_name)
      }
    }
  }, [targetElementId])


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
      blockName: '',
      itemId: 0,
      color: '#FFFFFF',
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
              {...form.getInputProps('blockName')}
              icon={<IconIndentIncrease size={16} />}
              required
              value={name}
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
              <ColorPicker {...form.getInputProps('color')} format='hex' value={color} onChange={setColor} />
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