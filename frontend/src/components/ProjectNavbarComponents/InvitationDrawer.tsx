import { Divider, Drawer, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconPlus, IconUserPlus } from '@tabler/icons';
import { sendInvitation } from '../../redux/invitation/thunk';
import { useAppDispatch, useAppSelector } from '../../store';

type InvitationDrawerProps = {
    toggle: boolean, 
    onRemove: ()=>void
}


export default function InvitationDrawer(props: InvitationDrawerProps) {
  const dispatch = useAppDispatch()
  const [value, setValue] = useInputState('')
  const projectId = useAppSelector(state => state.project.project_id);
  const userId = useAppSelector(state => state.auth.userId);

  const submitHandler = ()=>{
    dispatch(sendInvitation(projectId as number, value))
    console.log(value)
  }

  return (
    <>
      <Drawer
        position="right"
        opened={props.toggle}
        onClose={() => props.onRemove()}
        title="Invite Users"
        padding="xl"
        size="50%"
      >
        <TextInput 
        label="Email"
        placeholder="email@example.com" 
        type="email"
        value={value}
        icon={<IconUserPlus size={14}/>}
        rightSection={<IconPlus onClick={submitHandler} size="xs" />}
        onChange={setValue}
      />
      <Divider my="xs" label="Invited List" labelPosition="center"/>
      </Drawer>
    </>
  );
}