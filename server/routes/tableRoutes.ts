import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/:userID&:projectID', tableController.getTable);
    tableRoutes.get('/favorite/:userID', tableController.getFavorite);
    tableRoutes.get('/list/:userID', tableController.getTableList);
    tableRoutes.get('/names/:userID', tableController.retrieveUserName);
    tableRoutes.get('/status/:projectID', tableController.getProjectStatus);
    tableRoutes.put('/favorite', tableController.likeProject);
    tableRoutes.put('/updateTimeline', tableController.updateTimeline);
    tableRoutes.put('/updateDateline', tableController.updateDateline);
    tableRoutes.put('/itemGroupName', tableController.updateItemGroupName);
    tableRoutes.put('/itemsOrder', tableController.reorderItems);
    tableRoutes.put('/typesOrder', tableController.reorderTypes);
    tableRoutes.put('/newItemName', tableController.renameItem);
    tableRoutes.put('/newTypeName', tableController.renameType);
    tableRoutes.put('/newText', tableController.updateText);
    tableRoutes.put('/newProjectName', tableController.renameProject);
    tableRoutes.put('/state', tableController.updateState);
    tableRoutes.post('/item', tableController.insertItem);
    tableRoutes.post('/itemGroup', tableController.insertItemGroup);
    tableRoutes.post('/newProject', tableController.insertNewProject);
    tableRoutes.post('/newState', tableController.addState);
    tableRoutes.post('/person', tableController.addPerson);
    tableRoutes.post('/transaction', tableController.addTransaction);
    tableRoutes.delete('/person', tableController.removePerson);
    tableRoutes.delete('/transaction', tableController.removeTransaction);
    tableRoutes.delete('/item', tableController.deleteItem);
    tableRoutes.delete('/itemGroup', tableController.deleteItemGroup);
    tableRoutes.delete('/project', tableController.deleteProject);

    return tableRoutes;
 }