import express from 'express';
import { notificationController } from '../app';

export const notificationRoutes = () => {
	const notificationRoutes = express.Router();
	notificationRoutes.post('/', notificationController.sendMessage);
	notificationRoutes.get('/:userId', notificationController.getMessages);
	notificationRoutes.put('/', notificationController.toggleRead);
	notificationRoutes.delete(
		'/:notificationId',
		notificationController.toggleDelete
	);
	notificationRoutes.delete(
		'/receiver/:notificationId',
		notificationController.toggleReceiverDelete
	);

	return notificationRoutes;
};
