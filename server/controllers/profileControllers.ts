import { Request, Response } from 'express';
import { ProfileService } from '../services/profileService';

export class ProfileController {
	constructor(private profileService: ProfileService) {}

	getProfile = async (req: Request, res: Response) => {
		try {
			const userId = req.user!.id;

			const result = await this.profileService.getProfileInfo(Number(userId));

			res.json({
				success: true,
				data: result
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[PRO01] Fail to Get Data.' });
		}
	};

	putProfile = async (req: Request, res: Response) => {
		try {
			const userId = req.user!.id;

			const { password, firstName, lastName } = req.body.putInfo;

			const result = await this.profileService.updateProfile(userId, {
				password,
				firstName,
				lastName
			});

			res.json({ result, success: true });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[PRO02] Fail to Put Data.' });
		}
	};
}
