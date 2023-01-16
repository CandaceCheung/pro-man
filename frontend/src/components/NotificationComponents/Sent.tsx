import { Button, Card, Center, Container, Input, Table } from '@mantine/core';
import { IconCheck, IconChecks, IconEraser } from '@tabler/icons';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { toggleReceiverDelete } from '../../redux/project/thunk';
import { useAppDispatch, useAppSelector } from '../../store';

export function Sent() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const messageSummary = useAppSelector((state) => state.project.message_summary);
    const [search, setSearch] = useState('');
    let messages = messageSummary.filter((message) => message.sender_id === userId && !message.is_deleted_receiver);
    messages = messages.filter(
        (message) => message.receiver?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || message.message?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || new Date(message.created_at).toLocaleString('en-us')?.includes(search)
    );

    const rows = messages.map((message) => {
        const inviteMessage = (
            <div>
                Hello, {message.receiver}. I want to invite you to join my project. Please click
                <Button variant='subtle'>Here</Button>to accept.{' '}
            </div>
        );

        return (
            <tr key={message.id} className={message.status ? 'read-message' : 'unread-message'}>
                {message.message_type === 'message' ? <td>{message.message}</td> : <td>{inviteMessage}</td>}
                <td>{message.receiver}</td>
                <td>{new Date(message.created_at).toLocaleString('en-us')}</td>
                <td>{message.status ? <IconChecks size={16} style={{ color: 'green' }} /> : <IconCheck size={16} style={{ color: 'grey' }} />}</td>
                <td>
                    <Button onClick={(e) => onDelete(e)} value={message.id!} variant='subtle' leftIcon={<IconEraser size={16} />}></Button>
                </td>
            </tr>
        );
    });

    function onDelete(e: MouseEvent<HTMLButtonElement>) {
        dispatch(toggleReceiverDelete(parseInt(e.currentTarget.value)));
    }

    function onSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.currentTarget.value);
    }

    return (
        <div style={{ paddingTop: '20px' }}>
            <Container fluid={true}>
                <Input.Wrapper id='search' withAsterisk label='Search' error={search.length === 0 ? '' : messages.length === 0 ? 'Search not found' : undefined} className='row'>
                    <Input value={search} onChange={(e) => onSearch(e)} id='search' placeholder='Content/Name/Date Search' />
                </Input.Wrapper>
                <Container fluid={true} style={{ paddingTop: '20px' }}>
                    <Table horizontalSpacing='sm'>
                        <thead>
                            <tr>
                                <th style={{ width: '500px' }}>Message</th>
                                <th style={{ width: '100px' }}>Receiver</th>
                                <th style={{ width: '120px' }}>Sent On</th>
                                <th style={{ width: '120px' }}>Status</th>
                                <th style={{ width: '40px' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Container>
                <Center style={{ padding: '20px' }}>
                    <Card style={{ color: '#238BE6' }}>You Have No Sent Messages</Card>
                </Center>
            </Container>
        </div>
    );
}
