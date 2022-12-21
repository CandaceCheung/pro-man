import express from "express";
import { memberController } from "../app";

 export const memberRoutes = () => {
    const memberRoutes = express.Router();

    memberRoutes.get('/:userId', memberController.getMemberList);
    memberRoutes.put('/avatar', memberController.changeAvatar);
    memberRoutes.post('/invitation', memberController.acceptInvitationThroughMember);

    return memberRoutes;
 }