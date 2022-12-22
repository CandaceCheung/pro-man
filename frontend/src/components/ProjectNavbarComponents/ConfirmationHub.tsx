import { Alert, Button, Group, Modal } from "@mantine/core";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons";

interface ConfirmationHubProps {
  isShow: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export function ConfirmationHub(props: ConfirmationHubProps) {

  return (
    <Modal
      centered
      opened={props.isShow}
      title="Confirmation Required" onClose={props.onClose}    >
      <Alert icon={<IconAlertCircle size={16} />} title="Attention!" color="red" radius="md">
        This Action cannot be reversed. Are you sure to proceed?
      </Alert>

      <Group position="center" style={{ paddingTop: '10px' }}>
        <Button leftIcon={<IconCheck />} variant="white" onClick={props.onDelete}>Confirm</Button>
        <Button leftIcon={<IconX />} variant="white" onClick={props.onClose}>Cancel</Button>

      </Group>

    </Modal>
  )
}