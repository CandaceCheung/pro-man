import { Drawer } from '@mantine/core';

type InvitationDrawerProps = {
    toggle: boolean, 
    onRemove: ()=>void
}


export default function InvitationDrawer(props: InvitationDrawerProps) {
  const PlaceHolder = "This Space reserved for invitations"

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
        {PlaceHolder}
      </Drawer>
    </>
  );
}