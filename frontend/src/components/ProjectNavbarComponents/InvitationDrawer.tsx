import { Divider, Drawer, Loader, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconPlus, IconUserPlus } from '@tabler/icons';
import { useEffect } from 'react';
import { sendInvitation } from '../../redux/invitation/thunk';
import { toggleInvitationButtonAction } from '../../redux/project/slice';
import { useAppDispatch, useAppSelector } from '../../store';
import { InvitationList } from './InvitationList';

type InvitationDrawerProps = {
    toggle: boolean;
    onRemove: () => void;
};

export default function InvitationDrawer(props: InvitationDrawerProps) {
    const dispatch = useAppDispatch();
    const [value, setValue] = useInputState('');
    const projectId = useAppSelector((state) => state.project.project_id);
    const userId = useAppSelector((state) => state.auth.userId);
    const toggle = useAppSelector((state) => state.project.toggle_invitation_button);

    useEffect(() => {
        let timer = setTimeout(() => dispatch(toggleInvitationButtonAction(false)), 10000);
        return () => clearTimeout(timer);

        // eslint-disable-next-line
    }, [toggle]);

    const submitHandler = () => {
        dispatch(toggleInvitationButtonAction(true));
        dispatch(sendInvitation(projectId!, userId!, value));
    };

    return (
        <>
            <Drawer position='right' opened={props.toggle} onClose={() => props.onRemove()} title={<h2>Invite Users</h2>} padding='xl' size='50%'>
                <TextInput
                    label='Email'
                    pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                    placeholder='email@example.com'
                    type='email'
                    value={value}
                    icon={<IconUserPlus size={14} />}
                    rightSection={toggle ? <Loader size={14} /> : /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value) ? <IconPlus onClick={submitHandler} size={14} /> : <Loader size={14} variant='dots' />}
                    onChange={setValue}
                    error={toggle ? 'Please wait 10 seconds between each send' : null}
                />
                <Divider my='xs' label='Invited List' labelPosition='center' />
                <InvitationList />
            </Drawer>
        </>
    );
}
