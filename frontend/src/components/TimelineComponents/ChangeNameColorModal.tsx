import { FormEvent, useEffect, useState } from 'react';
import { Modal, Button, Group, Input, Tooltip, Stack, ColorPicker } from '@mantine/core';
import { IconAlertCircle, IconIndentIncrease } from '@tabler/icons';
import { useId } from '@mantine/hooks';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleLoadingAction, triggerUpdateTimelineModalAction } from '../../redux/project/slice';
import { updateDatelineItem, updateTimelineItem } from '../../redux/table/thunk';

export function ChangNameColorModal() {
    const dispatch = useAppDispatch();
    const opened = useAppSelector((state) => state.project.updateTimeLineModalOpened);
    const targetElementId = useAppSelector((state) => state.project.targetElementId);
    const itemType = targetElementId.toString()[0] === '0' ? null : targetElementId.toString()[0] === '1' ? 'times' : 'dates';
    const itemId = parseInt(targetElementId.toString().slice(1));
    const page = useAppSelector((state) => state.project.activePage);
    const id = useId();
    const projectSummary = useAppSelector((state) => state.table.summary);
    const dateItem = projectSummary.filter((project) => project.itemDatetimeId === itemId && project.typeName === 'dates')[0];
    const timeItem = projectSummary.filter((project) => project.itemTimesId === itemId && project.typeName === 'times')[0];
    const [color, setColor] = useState('#FFFFFF');
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (itemType === 'dates') {
            if (dateItem) {
                setColor(dateItem.itemDatetimeColor);
                setName(dateItem.elementName);
            }
        }
        if (itemType === 'times') {
            if (timeItem) {
                setColor(timeItem.itemTimesColor);
                setName(timeItem.elementName);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetElementId, itemType]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (itemType === 'dates') {
            const date = dateItem.itemDatesDatetime;
            dispatch(updateDatelineItem(itemId, new Date(date).getTime(), name, color));
        } else {
            const start = timeItem.itemTimesStartDate;
            const end = timeItem.itemTimesEndDate;
            dispatch(updateTimelineItem(itemId, start, end, name, color));
        }
        dispatch(toggleLoadingAction(true));
        onClose();
    };

    const onClose = () => {
        page === 'timeline' && dispatch(triggerUpdateTimelineModalAction(false));
    };

    return (
        <>
            <Modal opened={opened} onClose={() => onClose()} title='Update Item'>
                <form onSubmit={handleSubmit}>
                    <Input.Wrapper id={id} label={itemType === 'times' ? 'Time Block Name' : 'Date Block Name'}>
                        <Input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<IconIndentIncrease size={16} />}
                            required
                            placeholder='Change Name'
                            rightSection={
                                <Tooltip label='This will be shown on the time block' position='top-end' withArrow>
                                    <div>
                                        <IconAlertCircle
                                            size={18}
                                            style={{
                                                display: 'block',
                                                opacity: 0.5
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            }
                        />
                    </Input.Wrapper>
                    <Input.Wrapper id={id} label='Select Item Color'>
                        <Stack align='center'>
                            <ColorPicker value={color} onChange={setColor} format='hexa' />
                        </Stack>
                    </Input.Wrapper>

                    <Group position='center' mt='xl'>
                        <Button variant='outline' type='submit'>
                            Submit
                        </Button>
                    </Group>
                </form>
            </Modal>
        </>
    );
}
