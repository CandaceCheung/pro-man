import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import express from 'express';
import jwt from './jwt';
import { authService } from './app';
import { User } from './services/models';

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}

const permit = new Bearer({
	query: 'access_token'
});

export async function isLoggedIn(req: express.Request, res: express.Response, next: express.NextFunction) {
	try {
		const token = permit.check(req);
		if (!token) {
			return res.status(401).json({ msg: 'Permission Denied' });
		}
		const payload = jwtSimple.decode(token, jwt.jwtSecret!);
		// Querying Database is not compulsory
		const user: User = await authService.getUser(payload.id);
		if (user) {
			req.user = user;
			return next();
		} else {
			return res.status(401).json({ msg: 'Permission Denied' });
		}
	} catch (e) {
		return res.status(401).json({ msg: 'Permission Denied' });
	}
}
