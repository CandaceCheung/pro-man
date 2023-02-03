import jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { AuthService } from '../services/authServices';
import { Request, Response } from 'express';

export class AuthController {
	constructor(private authService: AuthService) {}

	login = async (req: Request, res: Response) => {
		try {
			const { username, password } = req.body;
			if (!username || !password) {
				res.status(401).json({ msg: 'Wrong Username/Password' });
				return;
			}
			const result = await this.authService.login(username, password);
			if (result) {
				const token = jwtSimple.encode(result, jwt.jwtSecret!);
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
			const { username, password, firstName, lastName } = req.body;
			if (!username || !password) {
				res.status(401).json({ msg: 'Missing Username/Password' });
				return;
			}
			const result: boolean = await this.authService.signUp(username, password, firstName, lastName);
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
