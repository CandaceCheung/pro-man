import { Knex } from 'knex';
import { keysToCamel } from '../utils/case';

export class NotificationService {
	constructor(private knex: Knex) {}

	async toggleRead(notificationId: number, checked: boolean) {
		const txn = await this.knex.transaction();

		try {
			const [check] = await txn('notifications')
				.update({
					status: checked
				})
				.where('id', notificationId)
				.returning('*');

			await txn.commit();
			return check.status;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
	async toggleDelete(notificationId: number) {
		const txn = await this.knex.transaction();

		try {
			const [check] = await txn('notifications')
				.update({
					is_deleted: true,
					status: true
				})
				.where('id', notificationId)
				.returning('*');

			await txn.commit();
			return check.is_deleted;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
	async toggleReceiverDelete(notificationId: number) {
		const txn = await this.knex.transaction();

		try {
			const [check] = await txn('notifications')
				.update({
					is_deleted_receiver: true
				})
				.where('id', notificationId)
				.returning('*');

			await txn.commit();
			return check.is_deleted_receiver;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async getMessages(userId: number) {
		const txn = await this.knex.transaction();

		try {
			const messages = await txn('notifications')
				.where('sender_id', userId)
				.orWhere('receiver_id', userId)
				.orderBy('status', 'asc')
				.orderBy('created_at', 'desc');

			await txn.commit();
			return keysToCamel(messages);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async sendMessage(
		sender: string,
		sender_id: number,
		receiver: string,
		receiver_id: number,
		text: string,
		messageType: 'message' | 'invite'
	) {
		const txn = await this.knex.transaction();

		try {
			const [message] = await txn('notifications')
				.insert({
					sender,
					sender_id,
					receiver,
					receiver_id,
					message: text,
					message_type: messageType
				})
				.returning('*');

			await txn.commit();
			return keysToCamel(message);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
