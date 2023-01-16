import jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { AuthService } from '../services/authServices';
import { Request, Response } from 'express';

export class AuthController {
	constructor(private authService: AuthService) {}

	login = async (req: Request, res: Response) => {
		try {
			if (!req.body.username || !req.body.password) {
				res.status(401).json({ msg: 'Wrong Username/Password' });
				return;
			}
			const result = await this.authService.login(
				req.body.username,
				req.body.password
			);
			if (result) {
				const token = jwtSimple.encode(result, jwt.jwtSecret);
				res.json({
					success: true,
					data: result,
					token
				});
			} else {
				res.status(401).json({
					success: false,
					msg: 'Wrong Username/Password'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[LOG] Fail to login.' });
		}
	};

	signUp = async (req: Request, res: Response) => {
		try {
			if (!req.body.username || !req.body.password) {
				res.status(401).json({ msg: 'Missing Username/Password' });
				return;
			}
			const result = await this.authService.signUp(
				req.body.username,
				req.body.password,
				req.body.firstName,
				req.body.lastName
			);
			if (result) {
				res.json({
					success: true
				});
			} else {
				res.status(401).json({
					success: false,
					msg: 'Unable to sign up.'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[LOG] Fail to sign up.' });
		}
	};

	retrieveLogin = async (req: Request, res: Response) => {
		try {
			res.json({ payload: req.user });
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[LOG] Fail to retrieve login.' });
		}
	};
}
