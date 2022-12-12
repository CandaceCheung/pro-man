import { Modal, Button, Group, Input, Tooltip } from '@mantine/core';
import { IconAlertCircle, IconChevronDown, IconIndentIncrease } from '@tabler/icons';
import { triggerTimelineModalAction } from '../../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { useId } from '@mantine/hooks';
import { DatePicker, DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { useState } from 'react';
import { useForm } from '@mantine/form'

export type TimeLineAddNewItemModalProps = {
    groups: {
        id: number,
        title: string,
    }[]
}

export function TimeLineAddNewItemModal(props: TimeLineAddNewItemModalProps) {
    const dispatch = useAppDispatch()
    const opened = useAppSelector(state => state.project.time_line_modal_opened)
    const userId = useAppSelector(state => state.auth.userId)
    const projectId = useAppSelector(state => state.project.project_id)
    const page = useAppSelector(state => state.project.active_page)
    const id = useId()
    let year = parseInt(new Date().toLocaleString("default", { year: "numeric" }));
    let month = parseInt(new Date().toLocaleString("default", { month: "2-digit" }));
    let day = parseInt(new Date().toLocaleString("default", { day: "2-digit" }));

    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(year, month, day),
        new Date(year, month, day + 1)
    ]);

    const [itemType, setItemType] = useState<'time' | 'date'>('time')
    const [submittedValues, setSubmittedValues] = useState<string>('')

    const onClose = () => {
        if (page === 'timeline') dispatch(triggerTimelineModalAction(false))
    }

    const handleSubmit= (value : string)=>{
        setSubmittedValues(value)
        console.log(value)
        onClose()
    }

    const form = useForm({
        initialValues: {
            type: 'time',
            block_name: '',
            item_id: null,
            date_range: value,
            date: new Date(year, month, day)
        },
    });

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => onClose()}
                title="Create New Item"
            >
                <form
                    onSubmit={form.onSubmit((value) => handleSubmit(JSON.stringify(value, null, 2)))}
                >
                    <Input.Wrapper id={id} label="Select Type" required {...form.getInputProps('type')}>
                        <Input value={itemType} component="select" onChange={(e) => setItemType(e.target.value as 'time' | 'date')} rightSection={<IconChevronDown size={14} stroke={1.5} />}>
                            <option value={'time'}>Time Block</option>
                            <option value={'date'}>Date Block</option>
                        </Input>
                    </Input.Wrapper>
                    <Input.Wrapper id={id} label="Time Block Name" >
                        <Input
                            icon={<IconIndentIncrease size={16} />}
                            required
                            {...form.getInputProps('block_name')}
                            placeholder="Item Name"
                            rightSection={
                                <Tooltip label="This will be shown on the time block" position="top-end" withArrow>
                                    <div >
                                        <IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Input.Wrapper>
                    <Input.Wrapper id={id} label="Select Item" required>
                        <Input
                            component="select"
                            rightSection={<IconChevronDown size={14} stroke={1.5} />}
                            {...form.getInputProps('item_id')}
                        >
                            {props.groups.map((content, index) =>
                                <option key={index} value={content.id}>{content.title}</option>
                            )}
                        </Input>
                    </Input.Wrapper>
                    {itemType === 'time' ?
                        <DateRangePicker
                            {...form.getInputProps('date_range')}
                            label="Pick Date Range"
                            placeholder="Pick dates range"
                            value={value}
                            onChange={setValue}
                        /> : itemType === 'date' ?
                            <DatePicker
                                {...form.getInputProps('date')}
                                placeholder="Pick date" label="Event date" withAsterisk />
                            : null}
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