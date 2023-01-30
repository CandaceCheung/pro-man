import express from 'express';
import dotenv from 'dotenv';
import Knex from 'knex';
import cors from 'cors';
import { AuthService } from './services/authServices';
import { AuthController } from './controllers/authControllers';
import { authRoutes } from './routes/authRoutes';
import { TableService } from './services/tableServices';
import { TableController } from './controllers/tableControllers';
import { tableRoutes } from './routes/tableRoutes';
import { KanbanService } from './services/kanbanServices';
import { KanbanController } from './controllers/kanbanControllers';
import { kanbanRoutes } from './routes/kanbanRoutes';
import { InvitationService } from './services/invitationServices';
import { InvitationController } from './controllers/invitationControllers';
import { invitationRoutes } from './routes/invitationRoutes';
import { NotificationService } from './services/notificationServices';
import { NotificationController } from './controllers/notificationController';
import { notificationRoutes } from './routes/notificationRoutes';
import { ProfileService } from './services/profileServices';
import { ProfileController } from './controllers/profileControllers';
import { profileRoutes } from './routes/profileRoutes';
import { MemberService } from './services/memberServices';
import { MemberController } from './controllers/memberControllers';
import { memberRoutes } from './routes/memberRoutes';
import { isLoggedIn } from './guard';

dotenv.config();

const knexConfig = require('./knexfile');
const configMode = process.env.NODE_ENV || 'development';
export const knex = Knex(knexConfig[configMode]);

const app = express();

export const authService = new AuthService(knex);
export const tableService = new TableService(knex);
export const kanbanService = new KanbanService(knex);
export const invitationService = new InvitationService(knex);
export const notificationService = new NotificationService(knex);
export const profileService = new ProfileService(knex);
export const memberService = new MemberService(knex);

export const authController = new AuthController(authService);
export const tableController = new TableController(tableService, kanbanService);
export const kanbanController = new KanbanController(kanbanService);
export const invitationController = new InvitationController(invitationService);
export const notificationController = new NotificationController(notificationService);
export const profileController = new ProfileController(profileService);
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
