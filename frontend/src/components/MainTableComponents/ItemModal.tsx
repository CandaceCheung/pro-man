import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { closeItemModalAction } from "../../redux/table/slice";
import { deleteItem } from "../../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { useStyles } from "./styles";

export function ItemModal() {
    const itemCellsState = useAppSelector((state) => state.table.itemCells);
    const itemModalState = useAppSelector((state) => state.table.itemModal);
    const { open, itemId, groupId } = itemModalState;

    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const handleDeleteItem = () => {
        if (!groupId || !itemId) {
            return;
        }
        
        if (Object.keys(itemCellsState[groupId]).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete item! Each group should have at least 1 item! 🤥'
            });
        } else {
            dispatch(deleteItem(groupId, itemId));
            dispatch(closeItemModalAction());
        }
    };

    return (
        <Modal opened={open} onClose={() => dispatch(closeItemModalAction())} title={<span className={classes.modalTitle}>{'Delete this item?'}</span>} centered>
            <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
            <span className={classes.modalFooter}>
                <Button color='red' onClick={handleDeleteItem}>
                    Delete
                </Button>
            </span>
        </Modal>
    );
}