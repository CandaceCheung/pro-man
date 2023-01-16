import express from 'express';
import { invitationController } from '../app';

export const invitationRoutes = () => {
	const invitationRoutes = express.Router();
	invitationRoutes.post('/', invitationController.sendInvite);
	invitationRoutes.post('/username', invitationController.checkUsername);
	invitationRoutes.put('/response', invitationController.acceptInvite);
	invitationRoutes.get('/:projectId', invitationController.getInvitationList);
	invitationRoutes.delete(
		'/:projectId&:invitationId',
		invitationController.deleteInvitation
	);

	return invitationRoutes;
};
