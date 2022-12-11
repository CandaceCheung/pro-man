import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/:userID', tableController.getTable);
    tableRoutes.put('/updateTimeline', tableController.updateTimeline);

    return tableRoutes;
 }