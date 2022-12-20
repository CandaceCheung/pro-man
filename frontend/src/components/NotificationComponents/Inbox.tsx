import { Button, Center, Checkbox, Container, Input, Table } from "@mantine/core";
import { IconArrowBackUp, IconPlus } from "@tabler/icons";
import { checkUsernameAction, toggleMessagerAction } from "../../redux/project/slice";
import { useAppDispatch, useAppSelector } from "../../store";
import { Messager } from "./Messager";

export function Inbox() {
    const dispatch = useAppDispatch()
    const toggle = useAppSelector(state=> state.project.toggle_messager)

    const elements = [
        { message: 6, sender: 12.011, created_at: 'C', status: true },
        { message: 7, sender: 14.007, created_at: 'N', status: true },
        { message: 39, sender: 88.906, created_at: 'Y', status: true },
        { message: 56, sender: 137.33, created_at: 'Ba', status: true },
        { message: 58, sender: 140.12, created_at: 'Ce', status: true },
    ];

    const rows = elements.map((element) => (
        <tr key={element.sender} className={element.status ? "read-message" : 'unread-message'}>
            <td >{element.message}</td>
            <td>{element.sender}</td>
            <td>{element.created_at}</td>
            <td><Button variant="subtle"><IconArrowBackUp size={16} /></Button></td>
            <td><Checkbox checked={element.status} /></td>
        </tr>
    ));

    function clickHandler (){
        dispatch(checkUsernameAction(false))
        dispatch(toggleMessagerAction(true))
    }

    return (
        <div style={{ padding: '10px' }}>
            <Container fluid={true}>
                <Input.Wrapper
                    id="input-demo"
                    withAsterisk
                    label="Search"
                    error="Search not found"
                    className="row"
                >
                    <Input id="input-demo" placeholder="Your email" />
                </Input.Wrapper>
                <Container fluid={true} >
                    <Center style={{paddingBottom: '10px'}}>
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
        </div>
    )
}