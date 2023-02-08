import { Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deleteItemGroup } from '../../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../../store';
import { useStyles } from './styles';

export interface ItemGroupModalProps {
    opened: boolean;
    itemGroupId: number | null;
    onClose: () => void;
}

export function ItemGroupModal({ opened, itemGroupId, onClose }: ItemGroupModalProps) {
    const projectId = useAppSelector((state) => state.project.projectId);
    const itemCellsState = useAppSelector((state) => state.table.itemCells);

    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const onDeleteGroup = () => {
        if (!itemGroupId || !projectId) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! 🤥'
            });
            return;
        }

        if (Object.keys(itemCellsState).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! Each project should have at least 1 item group! 🤥'
            });
        } else {
            dispatch(deleteItemGroup(itemGroupId, projectId));
            onClose();
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<span className={classes.modalTitle}>{'Delete this item group?'}</span>} centered>
            <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
            <span className={classes.modalFooter}>
                <Button color='red' onClick={onDeleteGroup}>
                    Delete
                </Button>
            </span>
        </Modal>
    );
}
