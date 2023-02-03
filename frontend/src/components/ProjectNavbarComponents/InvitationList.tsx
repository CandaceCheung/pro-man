import { Button, Card, Loader, Table } from '@mantine/core';
import { IconChecks, IconEraser, IconSend } from '@tabler/icons';
import { MouseEvent, useState } from 'react';
import { deleteInvitation, sendInvitation } from '../../redux/invitation/thunk';
import { toggleInvitationButtonAction } from '../../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { ConfirmationHub } from './ConfirmationHub';

export function InvitationList() {
    const dispatch = useAppDispatch();
    const invitationList = useAppSelector((state) => state.invitation);
    const userID = useAppSelector((state) => state.auth.userId);
    const projectId = useAppSelector((state) => state.project.projectId);
    const [toggle, setToggle] = useState(false);
    const loading = useAppSelector((state) => state.project.toggleInvitationButton);
    const [targetInvitationId, setTargetInvitationId] = useState(0);

    const elements = [];
    for (let item of invitationList) {
        if (item.email) {
            const obj = {
                id: item.id,
                email: item.email,
                updated_at: new Date(item.updatedAt).toLocaleString('en-us'),
                status: item.status
            };
            elements.push(obj);
        }
    }

    function clickHandler(e: MouseEvent<HTMLButtonElement>) {
        dispatch(sendInvitation(projectId!, userID!, e.currentTarget.value));
        dispatch(toggleInvitationButtonAction(true));
    }

    function onDelete(e: MouseEvent<HTMLButtonElement>) {
        setTargetInvitationId(parseInt(e.currentTarget.value));
        setToggle(true);
    }

    function onConfirmDelete() {
        setToggle(false);
        dispatch(deleteInvitation(targetInvitationId));
    }

    const rows = elements.map((element) => (
        <tr key={element.email}>
            <td>{element.email}</td>
            <td>{element.updated_at}</td>
            <td>
                <Card
                    style={{
                        background: element.status === 'pending' ? '#FDAB3D' : '#00C875',
                        color: 'white',
                        textAlign: 'center'
                    }}
                >
                    {element.status.toUpperCase()}
                </Card>
            </td>
            <td>
                {element.status === 'pending' ? (
                    <Button value={element.email} onClick={(e) => clickHandler(e)} variant='subtle' disabled={loading}>
                        {loading ? <Loader size={14} /> : <IconSend size={16} />}
                    </Button>
                ) : (
                    <Button variant='subtle'>
                        <IconChecks size={20} />
                    </Button>
                )}
            </td>
            <td>
                <Button value={element.id!} onClick={(e) => onDelete(e)} variant='subtle'>
                    {<IconEraser size={16} />}
                </Button>
            </td>
        </tr>
    ));
    return (
        <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
            <Table horizontalSpacing='sm' highlightOnHover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Last sent</th>
                        <th>Status</th>
                        <th>Resend</th>
                        <th>Delete Record</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <ConfirmationHub isShow={toggle} onDelete={onConfirmDelete} onClose={() => setToggle(false)} />
        </div>
    );
}
