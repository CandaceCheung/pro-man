import jwtSimple from 'jwt-simple';
import jwt from '../jwt';
import { Request, Response } from 'express';
import { InvitationService } from '../services/invitationService';
import nodemailer from 'nodemailer';
import { tableService } from '../app';

export class InvitationController {
	constructor(private invitationService: InvitationService) {}

	checkUsername = async (req: Request, res: Response) => {
		try {
			const value = req.body.value;
			const user = await this.invitationService.checkUsername(value);
			if (user) {
				res.json({
					success: true,
					msg: 'User found',
					userId: user.id
				});
			} else {
				res.json({
					success: false,
					msg: 'User not found'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during deletion'
			});
		}
	};

	deleteInvitation = async (req: Request, res: Response) => {
		try {
			const invitationId = req.params.invitationId;

			if (invitationId) {
				await this.invitationService.deleteInvitation(parseInt(invitationId));

				res.json({
					success: true,
					msg: 'Delete Success'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong during deletion'
			});
		}
	};

	getInvitationList = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			if (projectId) {
				const invitationList = await this.invitationService.getInvitationList(parseInt(projectId));

				res.json({
					success: true,
					msg: 'Get List Success',
					invitationList
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went wrong when fetching invitation records.'
			});
		}
	};

	acceptInvite = async (req: Request, res: Response) => {
		try {
			const invitationDetail = jwtSimple.decode(req.body.token, jwt.jwtSecret!);
			const invitationId = invitationDetail.id;
			const projectId = invitationDetail.projectId;
			const userId = req.body.userId;

			if (invitationDetail) {
				const check = await this.invitationService.checkValidity(invitationId, projectId, userId);
				if (!check.invitation || !check.invitation.validity) {
					res.json({
						success: false,
						msg: 'Join Failed: Invitation expired'
					});
				} else if (check.project.isDeleted) {
					res.json({
						success: false,
						msg: 'Join Failed: Target project no longer existed'
					});
				} else if (check.member) {
					res.json({
						success: false,
						msg: 'Join Failed: You are already a member'
					});
				} else {
					const invitation = await this.invitationService.acceptInvite(invitationId, projectId, userId);
					const tableList = await tableService.getTableList(userId);
					res.json({
						success: true,
						msg: 'Invitation Accepted!',
						invitation,
						tableList
					});
				}
			} else {
				res.json({
					success: false,
					msg: 'Join Failed: Token invalid'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: 'Server Error' });
		}
	};

	sendInvite = async (req: Request, res: Response) => {
		try {
			const projectId = req.body.projectId;
			const userId = req.body.userId;
			const email = req.body.email.trim();

			const invitation = await this.invitationService.inviteUser(projectId, userId, email);

			if (invitation) {
				if (invitation.status === 'accepted') {
					res.json({
						success: false,
						invitation,
						msg: 'Duplicate Request: Invitee Existed'
					});
					return;
				}

				const token = jwtSimple.encode(invitation, jwt.jwtSecret!);
				if (email.length > 0) {
					const emailContent = `
                        <p>Hello,</p>
                        <p>You have been invited to join Pro-man</p>
                        <p>Click the link below to accept invitation</p>
                        ${process.env.REACT_APP_PUBLIC_HOSTNAME}/?token=${token}
                    `;
					//send email
					let transporter = nodemailer.createTransport({
						host: 'smtp.office365.com',
						port: 587,
						secure: false,
						auth: {
							user: `${process.env.EMAIL_LOGIN}`,
							pass: `${process.env.EMAIL_PASSWORD}`
						}
					});

					await transporter.sendMail(
						{
							from: `"Pro-man Admin" <${process.env.EMAIL_LOGIN}>`,
							to: email,
							subject: 'Hello, Someone Invited You to Join Pro-man!',
							text: 'Invitation',
							html: emailContent
						},
						function (err, info) {
							if (err) {
								console.log(err);
								return;
							}
							console.log(info.response);
						}
					);
				}
			}
			res.json({
				success: true,
				invitation,
				msg: 'Invitation Sent'
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[INV] Invitation Failed' });
		}
	};
}
