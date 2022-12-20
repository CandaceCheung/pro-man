import { Modal, Button, Group, Input, Tooltip, Textarea, Loader } from '@mantine/core';
import { IconAlertCircle, IconChecks, IconChevronDown } from '@tabler/icons';
import { checkUsernameAction, toggleMessagerAction } from '../../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { FormEvent, useEffect, useState } from 'react';
import { checkUsername, sendMessage } from '../../redux/project/thunk';
import { showNotification } from '@mantine/notifications';

export function Messager() {
    const dispatch = useAppDispatch()
    const opened = useAppSelector(state => state.project.toggle_messager)
    const name = useAppSelector(state => state.auth.username)
    const userId = useAppSelector(state => state.auth.userId)
    const check = useAppSelector(state => state.project.check_username)
    const targetUser = useAppSelector(state => state.project.message_target)
    const projectList = useAppSelector(state=> state.table.project_list)

    const [messageType, setMessageType] = useState<'invite' | 'message' | undefined>(undefined)
    const [text, setText] = useState<string>('');
    const [project, setProject] = useState<number>(0);
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')

    const waitTime = 3000
    let timer: ReturnType<typeof setTimeout>
    // eslint-disable-next-line 
    const pattern = /[.,\/#!@$%\^&\*;:{}=\-_`~()\s]/g

    useEffect(() => {
        setLoading(false)
    }, [check, dispatch])

    function keyDownHandler() {
        setLoading(true)
        dispatch(checkUsernameAction(false))
        clearTimeout(timer)
    }
    function keyUpHandler() {
        clearTimeout(timer)
        timer = setTimeout(() => {
            if (pattern.test(username)|| username.length<1) {
                showNotification({
                    title: 'Username Format Incorrect',
                    message: 'Input field is empty or contains invalid characters, please remove them and try again'
                });
                setLoading(false)
            } else {
                dispatch(checkUsername(username.trim()))
            }
        }, waitTime)
    }

    const onClose = () => {
        clearTimeout(timer)
        dispatch(toggleMessagerAction(false))
        dispatch(checkUsernameAction(false))
        setUsername('')
        setText('')
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (messageType === 'invite'){
            

        } else if (messageType ==='message'){
            dispatch(sendMessage(name!, userId!, username, targetUser!, text))

        } else {
            showNotification({
                title: 'Message Type Missing',
                message: 'Message Incomplete'
            });
            return
        }
        onClose()
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title="New Message"
            >
                <form
                    onSubmit={(e)=>handleSubmit(e)}
                >
                    <Input.Wrapper label="Receiver" required>
                        <Input
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={keyDownHandler}
                            onKeyUp={keyUpHandler}
                            value={username}
                            placeholder="Input username"
                            rightSection={
                                <Tooltip label="Wait 3 seconds after finishing input" position="top-end" withArrow>
                                        {loading ? <Loader variant='dots' /> : check? <IconChecks size={18} style={{color: 'green'}}/>:<IconAlertCircle size={18} style={{ display: 'block', opacity: 0.5 }} />}
                                </Tooltip>
                            }
                        />
                    </Input.Wrapper>

                    {check &&
                        <>
                            <Input.Wrapper label="Select Message Type" required>
                                <Input value={messageType} component="select"
                                    onChange={(e) => setMessageType(e.target.value as 'invite' | 'message' | undefined)} rightSection={<IconChevronDown size={14} stroke={1.5} />}>
                                    <option value={undefined} >Select Message Type</option>
                                    <option value={'invite'}>Invite to Project</option>
                                    <option value={'message'}>Send a Message</option>
                                </Input>
                            </Input.Wrapper>

                            {messageType === 'invite' ?
                                <Input.Wrapper label="Select Project" required >
                                    <Input value={project} component="select"
                                        onChange={(e) => setProject(parseInt(e.target.value))} rightSection={<IconChevronDown size={14} stroke={1.5} />}>
                                        {projectList.filter(project=> project.creator_id===userId).map((project, index) => {
                                            return <option key={index} value={project.project_id}>{project.project_name}</option>
                                        })}
                                    </Input>
                                </Input.Wrapper>
                                : messageType === 'message' ?
                                    <Textarea
                                        onChange={(event) => setText(event.currentTarget.value)}
                                        value={text}
                                        autosize
                                        placeholder="Input your message here"
                                        label="Your Message"
                                        withAsterisk
                                        minRows={4}
                                    />
                                    : null}
                            <Group position="center" mt="xl">
                                <Button variant="outline" type='submit'>
                                    Submit
                                </Button>
                            </Group>
                        </>
                    }
                </form>
            </Modal>
        </>
    );
}