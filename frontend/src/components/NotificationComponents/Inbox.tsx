import { Button, Center, Checkbox, Container, Input, Table } from "@mantine/core";
import { IconArrowBackUp, IconPlus } from "@tabler/icons";
import { ChangeEvent, MouseEvent, useState } from "react";
import { checkUsernameAction, setMessageTargetAction, toggleIReplyModalAction, toggleMessagerAction } from "../../redux/project/slice";
import { toggleRead } from "../../redux/project/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { Messager } from "./Messager";
import { ReplyModal } from "./ReplyModal";

export function Inbox() {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state=>state.auth.userId)
    const messageSummary = useAppSelector(state=> state.project.message_summary)
    const [search, setSearch] = useState('')
    let messages = messageSummary.filter((message)=> message.receiver_id === userId)
    messages = messages.filter(message=> message.sender?.includes(search) || message.message?.includes(search) || new Date(message.created_at).toLocaleString('en-us')?.includes(search))

    const rows = messages.map((message) => (
        <tr key={message.id} className={message.status ? "read-message" : 'unread-message'}>
            <td >{message.message}</td>
            <td>{message.sender}</td>
            <td>{new Date(message.created_at).toLocaleString('en-us')}</td>
            <td><Button onClick={(e)=>onReply(e)} value={message.sender_id!} variant="subtle" leftIcon={<IconArrowBackUp size={16} />}></Button></td>
            <td><Checkbox value={message.id!} defaultChecked={message.status} onChange={e=>onToggleRead(e)}/></td>
        </tr>
    ));

    function onReply(e : MouseEvent<HTMLButtonElement>){
        dispatch(setMessageTargetAction(parseInt(e.currentTarget.value)))
        dispatch(toggleIReplyModalAction(true))
    }

    function clickHandler (){
        dispatch(checkUsernameAction(false))
        dispatch(toggleMessagerAction(true))
    }

    function onToggleRead(e :ChangeEvent<HTMLInputElement>){
        dispatch(toggleRead(parseInt(e.currentTarget.value), e.target.checked))
    }
    function onSearch(e :ChangeEvent<HTMLInputElement>){
        setSearch(e.currentTarget.value)
    }

    return (
        <div style={{ padding: '10px' }}>
            <Container fluid={true}>
                <Input.Wrapper
                    id="search"
                    withAsterisk
                    label="Search"
                    error={search.length===0 ? "" : messages.length===0 ? "Search not found": undefined}
                    className="row"
                >
                    <Input value={search} onChange={e=>onSearch(e)} id="search" placeholder="Content/Name/Date Search" />
                </Input.Wrapper>
                <Container fluid={true} >
                    <Center style={{padding: '20px'}}>
                        <Button onClick={clickHandler} variant='outline' rightIcon={<IconPlus size={14} />}>New Message</Button>
                    </Center>
                        <Table horizontalSpacing='sm'>
                            <thead>
                                <tr >
                                    <th style={{ width: '500px' }}>Message</th>
                                    <th style={{ width: '120px' }}>Sender</th>
                                    <th style={{ width: '120px' }}>Received On</th>
                                    <th style={{ width: '120px' }}>Reply</th>
                                    <th style={{ width: '120px' }}>Mark As Read</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </Table>
                </Container>
            </Container>
            <Messager />
            <ReplyModal />
        </div>
    )
}