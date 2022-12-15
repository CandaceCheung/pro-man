import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/:userID&:projectID', tableController.getTable);
    tableRoutes.get('/favorite/:userID', tableController.getFavorite);
    tableRoutes.get('/list/:userID', tableController.getTableList);
    tableRoutes.put('/updateTimeline', tableController.updateTimeline);
    tableRoutes.put('/updateDateline', tableController.updateDateline);
    tableRoutes.put('/updateItemGroupName', tableController.updateItemGroupName);
    tableRoutes.post('/insertItem', tableController.insertItem);
    tableRoutes.post('/insertItemGroup', tableController.insertItemGroup);
    tableRoutes.put('/reorderItems', tableController.reorderItems);
    tableRoutes.put('/reorderTypes', tableController.reorderTypes);

    return tableRoutes;
 }