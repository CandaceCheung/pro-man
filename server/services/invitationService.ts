import { Knex } from 'knex';
import { keysToCamel } from '../utils/case';
export class InvitationService {
	constructor(private knex: Knex) {}

	async checkUsername(value: string) {
		const txn = await this.knex.transaction();

		try {
			const [user] = await txn
				.select('*')
				.from('users')
				.where('username', value);

			await txn.commit();
			return keysToCamel(user);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async inviteUser(projectId: number, userId: number, email: string) {
		const txn = await this.knex.transaction();

		try {
			const [check] = await txn
				.select('*')
				.from('invitations')
				.where('email', email)
				.where('project_id', projectId);

			if (check) {
				if (check.status !== 'accepted') {
					await txn('invitations')
						.update({ updated_at: new Date() })
						.where('id', check.id);
				}
				return keysToCamel(check);
			}

			const [invitation] = await txn
				.insert({
					user_id: userId,
					project_id: projectId,
					email: email,
					status: 'pending'
				})
				.into('invitations')
				.returning('*');

			await txn.commit();
			return keysToCamel(invitation);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async getInvitationList(projectId: number) {
		const txn = await this.knex.transaction();

		try {
			const invitationList = await txn
				.select('*')
				.from('invitations')
				.where('project_id', projectId)
				.orderBy('created_at', 'asc');

			await txn.commit();
			return keysToCamel(invitationList);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async deleteInvitation(invitationId: number) {
		const txn = await this.knex.transaction();

		try {
			await txn('invitations').where('id', invitationId).del();
			await txn.commit();
			return
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async checkValidity(
		invitationId: number,
		projectId: number,
		userId: number
	) {
		try {
			const [member] = await this.knex('members')
				.where('user_id', userId)
				.where('project_id', projectId);
			const [invitation] = await this.knex('invitations').where(
				'id',
				invitationId
			);
			const [project] = await this.knex('projects').where(
				'id',
				projectId
			);

			return { invitation, member, project };
		} catch (e) {
			throw e;
		}
	}

	async acceptInvite(
		invitationId: number,
		projectId: number,
		userId: number
	) {
		const txn = await this.knex.transaction();

		try {
			const [member] = await txn('members')
				.where('user_id', userId)
				.where('project_id', projectId);

			if (!member) {
				await txn('members').insert({
					user_id: userId,
					project_id: projectId
				});
			}
			const [invitation] = await txn('invitations')
				.update({
					status: 'accepted',
					validity: false
				})
				.where('id', invitationId)
				.returning('*');

			await txn.commit();
			return keysToCamel(invitation);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
