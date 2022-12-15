import express from "express";
import { invitationController } from "../app";

 export const invitationRoutes = () => {
    const invitationRoutes = express.Router();
    invitationRoutes.post('/', invitationController.sendInvite);
   
    return invitationRoutes;
 }