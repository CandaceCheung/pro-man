import express from "express";
import { kanbanController } from "../app";

export const kanbanRoutes = () => {
    const kanbanRoutes = express.Router();

    kanbanRoutes.get('/:projectId', kanbanController.getKanban)

    return kanbanRoutes;
}