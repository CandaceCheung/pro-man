import express from "express";
import { notificationController } from "../app";

 export const notificationRoutes = () => {
    const notificationRoutes = express.Router();
    notificationRoutes.post('/', notificationController.sendMessage);
    
    return notificationRoutes;
 }