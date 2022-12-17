import express from "express";
import { invitationController } from "../app";

 export const invitationRoutes = () => {
    const invitationRoutes = express.Router();
    invitationRoutes.post('/', invitationController.sendInvite);
    invitationRoutes.put('/response', invitationController.acceptInvite);
    invitationRoutes.get('/:projectId', invitationController.getInvitationList);
    
    return invitationRoutes;
 }