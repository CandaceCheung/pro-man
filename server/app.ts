import express from 'express';
import dotenv from 'dotenv'
import Knex from 'knex';
import { AuthService } from './services/authServices';
import { AuthController } from './controllers/authControllers';
import { authRoutes } from './routes/authRoutes';
import cors from 'cors';

dotenv.config();

const knexConfig = require('./knexfile');
const configMode = process.env.NODE_ENV || 'development';
export const knex = Knex(knexConfig[configMode]);

const app = express()

export const authService = new AuthService(knex);
export const authController = new AuthController(authService);

app.use(express.json(), cors());

console.log(process.env.NODE_ENV)

app.use('/login', authRoutes());

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`);
});
