import { Button, Card, Loader, Table } from "@mantine/core"
import { IconEraser, IconSend } from "@tabler/icons";
import { MouseEvent } from "react";
import { sendInvitation } from "../../redux/invitation/thunk";
import { toggleInvitationButtonAction } from "../../redux/project/slice";
import { useAppDispatch, useAppSelector } from "../../store";

export function InvitationList() {
    const dispatch =useAppDispatch()
    const invitationList = useAppSelector(state => state.invitation)
    const toggle = useAppSelector(state => state.project.toggle_invitation_button)
    const userID = useAppSelector(state=> state.auth.userId)
    const projectId = useAppSelector(state=> state.project.project_id)

    const elements = []
    for (let item of invitationList) {
        console.log(item.email)
        const obj = {
            id: item.id,
            email: item.email,
            updated_at: new Date(item.updated_at).toLocaleString('en-us'),
            status: item.status
        }
        elements.push(obj)
    }

    function clickHandler(e: MouseEvent<HTMLButtonElement>){
        dispatch(sendInvitation(projectId!, userID!, e.currentTarget.value))
        dispatch(toggleInvitationButtonAction(true))
    }

    const rows = elements.map((element) => (
        <tr key={element.email}>
            <td>{element.email}</td>
            <td>{element.updated_at}</td>
            <td><Card style={{ background: element.status === 'pending' ? '#FDAB3D' : '#00C875', color: 'white', textAlign: 'center' }}>{element.status.toUpperCase()}</Card></td>
            <td><Button value={element.email} onClick={(e)=>clickHandler(e)} variant='subtle' disabled={toggle}>{toggle? <Loader size={14} /> : <IconSend size={14} />}</Button></td>
            <td><Button value={element.id!} variant='subtle'>{<IconEraser size={14} />}</Button></td>
        </tr>
    ))
    return (
        <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
            <Table horizontalSpacing="sm" highlightOnHover >
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
        </div>
    )
}