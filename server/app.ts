import express from 'express';
import dotenv from 'dotenv';
import Knex from 'knex';
import { AuthService } from './services/authServices';
import { AuthController } from './controllers/authControllers';
import { authRoutes } from './routes/authRoutes';
import { TableService } from './services/tableService';
import { TableController } from './controllers/tableControllers';
import { tableRoutes } from './routes/tableRoutes';
import { KanbanService } from './services/KanbanService';
import { kanbanRoutes } from './routes/kanbanRoutes';
import { KanbanController } from './controllers/kanbanControllers';
import cors from 'cors';
import { InvitationService } from './services/invitationService';
import { InvitationController } from './controllers/invitationController';
import { invitationRoutes } from './routes/invitationRoutes';

dotenv.config();

const knexConfig = require('./knexfile');
const configMode = process.env.NODE_ENV || 'development';
export const knex = Knex(knexConfig[configMode]);

const app = express();

export const authService = new AuthService(knex);
export const authController = new AuthController(authService);

export const tableService = new TableService(knex);
export const tableController = new TableController(tableService);

export const kanbanService = new KanbanService(knex);
export const kanbanController = new KanbanController(kanbanService);

export const invitationService = new InvitationService(knex);
export const invitationController = new InvitationController(invitationService);

app.use(express.json(), cors());

app.use('/auth', authRoutes());
app.use('/table', tableRoutes());
app.use('/kanban', kanbanRoutes());
app.use('/invitation', invitationRoutes());

const PORT = 8080;
app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`);
});
