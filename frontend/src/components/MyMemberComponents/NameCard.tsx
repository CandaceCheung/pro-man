import { Badge, Button, Card, Group, Text, Image, Menu, Tooltip } from '@mantine/core';
import { IconBackspace, IconRefresh } from '@tabler/icons';
import React, { useState } from 'react';
import image_1 from '../../images/MemberPhotos/1.jpg';
import image_2 from '../../images/MemberPhotos/2.jpg';
import image_3 from '../../images/MemberPhotos/3.jpg';
import image_4 from '../../images/MemberPhotos/4.jpg';
import image_5 from '../../images/MemberPhotos/5.jpg';
import { MyMemberState } from '../../redux/project/slice';
import { changeAvatar, deleteMember } from '../../redux/project/thunk';
import { useAppDispatch, useAppSelector } from '../../store';
import { ConfirmationHub } from '../ProjectNavbarComponents/ConfirmationHub';

export function NameCard(props: MyMemberState) {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const isCreator = props.memberId === userId;
    const [targetId, setTargetId] = useState<number | null>(null);
    const [opened, setOpened] = useState(false);
    const [show, setShow] = useState(false);
    const avatar = [image_1, image_2, image_3, image_4, image_5];
    const idList: number[] = [];
    for (let item of props.members) {
        idList.push(item.membershipId!);
    }

    function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setTargetId(parseInt(e.currentTarget.value));
        setShow(true);
    }

    function onDelete() {
        dispatch(deleteMember(targetId!));
        setShow(false);
    }

    function onClose() {
        setTargetId(null);
        setShow(false);
    }

    function changeHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setOpened(false);
        dispatch(changeAvatar(idList, parseInt(e.currentTarget.value)));
    }

    return (
        <Card shadow='sm' p='lg' radius='md' withBorder>
            <Card.Section>
                <Image src={avatar[props.members[0].avatar!]} height={160} alt='Portrait' fit='contain' withPlaceholder />

                <Menu shadow='md' width={20} opened={opened} onChange={setOpened}>
                    <Menu.Target>
                        <Button
                            style={{
                                width: '10px',
                                position: 'absolute',
                                top: '0px',
                                left: '0px'
                            }}
                            variant='subtle'
                            rightIcon={<IconRefresh />}
                        ></Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Button variant='subtle' value={0} onClick={(e) => changeHandler(e)}>
                            <img src={image_1} alt='logo' style={{ height: '60px' }} />
                        </Button>
                        <Button variant='subtle' value={1} onClick={(e) => changeHandler(e)}>
                            <img src={image_2} alt='logo' style={{ height: '60px' }} />
                        </Button>
                        <Button variant='subtle' value={2} onClick={(e) => changeHandler(e)}>
                            <img src={image_3} alt='logo' style={{ height: '60px' }} />
                        </Button>
                        <Button variant='subtle' value={3} onClick={(e) => changeHandler(e)}>
                            <img src={image_4} alt='logo' style={{ height: '60px' }} />
                        </Button>
                        <Button variant='subtle' value={4} onClick={(e) => changeHandler(e)}>
                            <img src={image_5} alt='logo' style={{ height: '60px' }} />
                        </Button>
                    </Menu.Dropdown>
                </Menu>
            </Card.Section>

            <Group position='apart' mt='md' mb='xs'>
                <Text weight={500}>
                    {props.firstName} {props.lastName}
                </Text>
                <Badge color={props.memberId === userId ? 'pink' : 'blue'} variant='light'>
                    {props.memberId === userId ? 'Project Owner' : 'Member'}
                </Badge>
            </Group>

            <Card style={{ maxHeight: '100px', overflow: 'auto' }}>
                {props.projects.map((project, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Text size='sm' color='dimmed'>
                                {project.projectName}
                            </Text>
                            {!isCreator && (
                                <Tooltip label='Remove from project' color='red' position='right' withArrow>
                                    <Button value={props.members[index].membershipId!} onClick={(e) => clickHandler(e)} variant='subtle' style={{ height: '20px' }}>
                                        <IconBackspace size={20} />
                                    </Button>
                                </Tooltip>
                            )}
                        </div>
                    );
                })}
            </Card>
            <ConfirmationHub isShow={show} onClose={onClose} onDelete={onDelete} />
        </Card>
    );
}
