import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/:userID&:projectID', tableController.getTable);
    tableRoutes.get('/favorite/:userID', tableController.getFavorite);
    tableRoutes.get('/list/:userID', tableController.getTableList);
    tableRoutes.get('/names/:userID', tableController.retrieveUserName);
    tableRoutes.put('/favorite', tableController.likeProject);
    tableRoutes.put('/updateTimeline', tableController.updateTimeline);
    tableRoutes.put('/updateDateline', tableController.updateDateline);
    tableRoutes.put('/itemGroupName', tableController.updateItemGroupName);
    tableRoutes.put('/itemsOrder', tableController.reorderItems);
    tableRoutes.put('/typesOrder', tableController.reorderTypes);
    tableRoutes.put('/newItemName', tableController.renameItem);
    tableRoutes.post('/item', tableController.insertItem);
    tableRoutes.post('/itemGroup', tableController.insertItemGroup);
    tableRoutes.post('/newProject', tableController.insertNewProject);

    return tableRoutes;
 }