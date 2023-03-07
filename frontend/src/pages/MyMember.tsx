import { Button, Grid } from '@mantine/core';
import { useEffect } from 'react';
import { NameCard } from '../components/MyMemberComponents/NameCard';
import { Messager } from '../components/NotificationComponents/Messager';
import { toggleInviteMemberModalAction } from '../redux/project/slice';
import { getMemberList } from '../redux/project/thunk';
import { useAppDispatch, useAppSelector } from '../store';

export function MyMember() {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId);
    const memberList = useAppSelector((state) => state.project.memberList);

    function clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        dispatch(toggleInviteMemberModalAction(true));
    }

    console.log(memberList)

    useEffect(() => {
        userId && dispatch(getMemberList(userId!));
    }, [userId, dispatch]);

    return (
        <div>
            <h2>My Members</h2>
            <div
                style={{
                    marginBottom: '20px',
                    position: 'sticky',
                    top: '0px',
                    zIndex: '99'
                }}
            >
                <Button onClick={(e) => clickHandler(e)} variant='light' color='green' fullWidth mt='md' radius='md'>
                    Invite New Members
                </Button>
            </div>
            <Grid grow justify='space-between'>
                {memberList.map((member) => {
                    return (
                        <Grid.Col span={4} key={member.memberId}>
                            <NameCard memberId={member.memberId} username={member.username} lastName={member.lastName} firstName={member.firstName} projects={member.projects} members={member.members} />
                        </Grid.Col>
                    );
                })}
            </Grid>
            <Messager />
        </div>
    );
}
