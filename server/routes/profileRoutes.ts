import express from 'express';
import { profileController } from '../app';

export const profileRoutes = () => {
	const profileRoutes = express.Router();

	profileRoutes.get('/:userId', profileController.getProfile);
	profileRoutes.put('/update', profileController.putProfile);

	return profileRoutes;
};
