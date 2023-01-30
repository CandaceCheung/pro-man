import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { closeItemGroupModalAction } from "../../redux/table/slice";
import { deleteItemGroup } from "../../redux/table/thunk";
import { useAppDispatch, useAppSelector } from "../../store";
import { useStyles } from "./styles";

export function ItemGroupModal() {
    const projectId = useAppSelector((state) => state.project.projectId);
    const itemCellsState = useAppSelector((state) => state.table.itemCells);
    const itemGroupModalState = useAppSelector((state) => state.table.itemGroupModal);
    const { open, itemGroupId } = itemGroupModalState;

    const { classes } = useStyles();
    const dispatch = useAppDispatch();

    const onDeleteGroup = (groupId: number | null, projectId: number) => {
        if (!groupId) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! Each project should have at least 1 item group! 🤥'
            });
            return;
        }

        if (Object.keys(itemCellsState).length <= 1) {
            showNotification({
                title: 'Item delete notification',
                message: 'Failed to delete group! Each project should have at least 1 item group! 🤥'
            });
        } else {
            dispatch(deleteItemGroup(groupId, projectId));
            dispatch(closeItemGroupModalAction());
        }
    };

    return (
        <Modal opened={open} onClose={() => dispatch(closeItemGroupModalAction())} title={<span className={classes.modalTitle}>{'Delete this item group?'}</span>} centered>
            <span className={classes.modalBody}>{'The action cannot be reversed! Think twice! 🤔'}</span>
            <span className={classes.modalFooter}>
                <Button color='red' onClick={() => onDeleteGroup(itemGroupId, projectId!)}>
                    Delete
                </Button>
            </span>
        </Modal>
    );
}