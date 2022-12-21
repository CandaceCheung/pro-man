import { Grid } from "@mantine/core";
import { useEffect } from "react";
import { NameCard } from "../components/MyMemberComponents/NameCard";
import { getMemberList } from "../redux/project/thunk";
import { useAppDispatch, useAppSelector } from "../store";


export function MyMember() {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state=>state.auth.userId)
    const memberList = useAppSelector(state => state.project.member_list)

    useEffect(() => {
        userId && dispatch(getMemberList(userId!));
      }, [userId, dispatch]);

    console.log(memberList)
    return (
        <div>
            <h2>My Members</h2>
            <Grid grow gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>

                {memberList.map(member => {
                    return <Grid.Col span={4}>
                        <NameCard
                            key={member.membership_id}
                            member_id={member.member_id}
                            username={member.username}
                            last_name={member.last_name}
                            first_name={member.first_name}
                            avatar={member.avatar}
                            project_id={member.project_id}
                            membership_id={member.membership_id}
                            project_name={member.project_name}
                        />
                    </Grid.Col>
                })}
            </Grid>
        </div>
    )
}