import express from "express";
import { kanbanController } from "../app";

export const kanbanRoutes = () => {
    const kanbanRoutes = express.Router();

    kanbanRoutes.get('/:projectId', kanbanController.getKanban)
    kanbanRoutes.get('/member/:projectId', kanbanController.getMemberList)
    kanbanRoutes.get('/group/:projectId', kanbanController.getGroupList)
    kanbanRoutes.post('/addItem', kanbanController.postKanban)

    return kanbanRoutes;
}