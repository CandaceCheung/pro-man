import { Badge, Button, Card, Group, Text, Image, Menu, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons";
import React, { useState } from "react";
import image_1 from '../../images/MemberPhotos/1.jpg'
import image_2 from '../../images/MemberPhotos/2.jpg'
import image_3 from '../../images/MemberPhotos/3.jpg'
import image_4 from '../../images/MemberPhotos/4.jpg'
import image_5 from '../../images/MemberPhotos/5.jpg'
import { MyMemberState } from "../../redux/project/slice";
import { changeAvatar } from "../../redux/project/thunk";
import { useAppDispatch, useAppSelector } from "../../store";

export function NameCard(props: MyMemberState) {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth.userId)
    const [opened, setOpened] = useState(false);
    const avatar = [image_1, image_2, image_3, image_4, image_5]
    const isOwner = props.member_id === userId

    function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(toggleInviteMemberModal(true))
    }

    function changeHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setOpened(false)
        dispatch(changeAvatar(props.membership_id!, parseInt(e.currentTarget.value)))
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={avatar[props.avatar!]}
                    height={160}
                    alt="Portrait"
                    fit='contain'
                    withPlaceholder
                />

                <Menu shadow="md" width={20} opened={opened} onChange={setOpened}>
                    <Menu.Target >
                        <Button style={{ width: '10px', position: "absolute", top: '0px', left: '0px' }} variant='subtle' rightIcon={<IconRefresh />}></Button>
                    </Menu.Target>

                    <Menu.Dropdown >
                        <Button variant="subtle" value={0} onClick={(e) => changeHandler(e)}><img src={image_1} alt="logo" style={{ height: '60px' }} /></Button>
                        <Button variant="subtle" value={1} onClick={(e) => changeHandler(e)}><img src={image_2} alt="logo" style={{ height: '60px' }} /></Button>
                        <Button variant="subtle" value={2} onClick={(e) => changeHandler(e)}><img src={image_3} alt="logo" style={{ height: '60px' }} /></Button>
                        <Button variant="subtle" value={3} onClick={(e) => changeHandler(e)}><img src={image_4} alt="logo" style={{ height: '60px' }} /></Button>
                        <Button variant="subtle" value={4} onClick={(e) => changeHandler(e)}><img src={image_5} alt="logo" style={{ height: '60px' }} /></Button>
                    </Menu.Dropdown>
                </Menu>



            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500}>{props.first_name} {props.last_name}</Text>
                <Badge color={props.member_id === userId ? 'pink' : "blue"} variant="light">
                    {props.member_id === userId ? 'Project Owner' : "Member"}
                </Badge>
            </Group>
            <Tooltip label="Joined Project" color="blue" position="top" withArrow>
                <Card>
                    {props.project_name.map((project, index) => {
                        return <Text key={index} size="sm" color="dimmed">{project}</Text>
                    })}
                </Card>
            </Tooltip>

            {!isOwner &&

                <Button onClick={e=>clickHandler(e)} variant="light" color="blue" fullWidth mt="md" radius="md">
                    Change Status
                </Button>
            }
        </Card>
    )
}

function toggleInviteMemberModal(arg0: boolean): any {
    throw new Error("Function not implemented.");
}
