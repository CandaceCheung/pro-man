import { Button, Modal } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { deleteItem } from '../../redux/table/thunk';
import { useAppDispatch, useAppSelector } from '../../store';
import { useStyles } from './styles';

export interface ItemModalProps {
    opened: boolean;
    itemGroupId: number | null;
    itemId: number | null;
    onClose: () => void;
}

export function ItemModal({ opened, itemId, itemGroupId, onClose }: ItemModalProps) {
    const itemCellsState = useAppSelector((state) => state.table.itemCells);

    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const handleDeleteItem = () => {
        if (!itemGroupId || !itemId) {
            return;
        }

        if (Object.keys(itemCellsState[itemGroupId]).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete item! Each group should have at least 1 item! 🤥'
            });
        } else {
            dispatch(deleteItem(itemGroupId, itemId));
            onClose();
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<span className={classes.modalTitle}>{'Delete this item?'}</span>} centered>
            <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
            <span className={classes.modalFooter}>
                <Button color='red' onClick={handleDeleteItem}>
                    Delete
                </Button>
            </span>
        </Modal>
    );
}
