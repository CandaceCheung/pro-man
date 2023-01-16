import { Button, Group, Input, Modal, Textarea, Tooltip } from '@mantine/core';
import { IconChecks } from '@tabler/icons';
import { FormEvent, useState } from 'react';
import { setMessageTargetAction, toggleIReplyModalAction } from '../../redux/project/slice';
import { sendMessage } from '../../redux/project/thunk';
import { useAppDispatch, useAppSelector } from '../../store';

export function ReplyModal() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const sender = useAppSelector((state) => state.auth.username);
    const targetId = useAppSelector((state) => state.project.message_target);
    const targetUser = useAppSelector((state) => state.project.message_summary).filter((message) => message.sender_id === targetId)[0]?.sender;
    const opened = useAppSelector((state) => state.project.toggle_reply_modal);
    const [text, setText] = useState<string>('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(sendMessage(sender!, userId!, targetUser!, targetId!, text, 'message'));
        onClose();
    }

    function onClose() {
        dispatch(toggleIReplyModalAction(false));
        dispatch(setMessageTargetAction(0));
    }

    return (
        <Modal opened={opened} onClose={onClose} title='New Message'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input.Wrapper label='Receiver' required>
                    <Input
                        value={targetUser!}
                        disabled
                        rightSection={
                            <Tooltip label='Wait 3 seconds after finishing input' position='top-end' withArrow>
                                <IconChecks size={18} style={{ color: 'green' }} />
                            </Tooltip>
                        }
                    />
                </Input.Wrapper>

                <Textarea onChange={(event) => setText(event.currentTarget.value)} value={text} autosize placeholder='Input your message here' label='Your Message' withAsterisk minRows={4} />

                <Group position='center' mt='xl'>
                    <Button variant='outline' type='submit'>
                        Submit
                    </Button>
                </Group>
            </form>
        </Modal>
    );
}
