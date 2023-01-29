import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';

export class NotificationController {
	constructor(private notificationService: NotificationService) {}

	getMessages = async (req: Request, res: Response) => {
		try {
			const userId = req.params.userId;

			const message = await this.notificationService.getMessages(parseInt(userId));
			if (message) {
				res.json({
					success: true,
					message
				});
			} else {
				res.json({
					success: false,
					msg: 'No Messages in Database'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went Wrong During Reading Database'
			});
		}
	};

	sendMessage = async (req: Request, res: Response) => {
		try {
			const sender = req.body.sender;
			const senderId = req.body.senderId;
			const receiver = req.body.receiver;
			const receiverId = req.body.receiverId;
			const text = req.body.text;
			const messageType = req.body.messageType;

			const message = await this.notificationService.sendMessage(sender, senderId, receiver, receiverId, text, messageType);
			if (message) {
				res.json({
					success: true,
					msg: 'Message Sent',
					message
				});
			} else {
				res.json({
					success: false,
					msg: 'Send Message Failed'
				});
			}
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went Wrong During Reading Database'
			});
		}
	};

	toggleRead = async (req: Request, res: Response) => {
		try {
			const notificationId = req.body.notificationId;
			const checked = req.body.checked;

			const checkStatus = await this.notificationService.toggleRead(notificationId, checked);

			res.json({
				success: true,
				msg: checkStatus ? 'Message Read' : 'Message Unread',
				checkStatus
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went Wrong During Reading Database'
			});
		}
	};

	toggleDelete = async (req: Request, res: Response) => {
		try {
			const notificationId = req.body.notificationId;

			const isDeleted = await this.notificationService.toggleDelete(notificationId);

			res.json({
				success: true,
				msg: 'Message Deleted',
				isDeleted
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went Wrong During Reading Database'
			});
		}
	};

	toggleReceiverDelete = async (req: Request, res: Response) => {
		try {
			const notificationId = req.body.notificationId;

			const isDeletedByReceiver = await this.notificationService.toggleReceiverDelete(notificationId);

			res.json({
				success: true,
				msg: 'Message Deleted',
				isDeletedByReceiver
			});
		} catch (e) {
			console.error(e);
			res.status(500).json({
				msg: 'Something Went Wrong During Reading Database'
			});
		}
	};
}
