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
import { NotificationController } from './controllers/notificationController';
import { invitationRoutes } from './routes/invitationRoutes';
import { NotificationService } from './services/notificationService';
import { InvitationController } from './controllers/invitationController';
import { notificationRoutes } from './routes/notificationRoutes';
import { ProfileService } from './services/ProfileService';
import { ProfileController } from './controllers/profileControllers';
import { profileRoutes } from './routes/profileRoutes';
import { isLoggedIn } from './guard';
import { MemberService } from './services/memberServices';
import { MemberController } from './controllers/memberController';
import { memberRoutes } from './routes/memberRoutes';


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

export const notificationService = new NotificationService(knex);
export const notificationController = new NotificationController(notificationService);

export const profileService = new ProfileService(knex);
export const profileController = new ProfileController(profileService);

export const memberService = new MemberService(knex);
export const memberController = new MemberController(memberService);

app.use(express.json(), cors());

app.use('/auth', authRoutes());
app.use('/table', isLoggedIn, tableRoutes());
app.use('/kanban', isLoggedIn, kanbanRoutes());
app.use('/invitation', isLoggedIn, invitationRoutes());
app.use('/notification', isLoggedIn, notificationRoutes());
app.use('/profile', isLoggedIn, profileRoutes());
app.use('/member', isLoggedIn, memberRoutes());

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}/`);
});
