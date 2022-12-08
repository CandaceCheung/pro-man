import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/', tableController.getTable);

    return tableRoutes;
 }