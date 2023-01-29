import { Knex } from 'knex';
import { keysToCamel } from '../utils/case';

export class MemberService {
	constructor(private knex: Knex) {}

	async checkMember(projectId: number, userId: number) {
		try {
			const [member] = await this.knex
				.select('*')
				.from('members')
				.where('user_id', userId)
				.andWhere('project_id', projectId);

			const [project] = await this.knex
				.select('*')
				.from('projects')
				.where('id', projectId);

			return { 
				member: keysToCamel(member), 
				project: keysToCamel(project) 
			};
		} catch (e) {
			throw e;
		}
	}

	async checkLinkage(projectId: number, userId: number) {
		try {
			const [check] = await this.knex
				.select('*')
				.from('projects')
				.join('items', 'items.project_id', 'projects.id')
				.join('item_groups', 'items.item_group_id', 'item_groups.id')
				.join('type_persons', 'type_persons.item_id', 'items.id')
				.where('projects.id', projectId)
				.where('type_persons.user_id', userId)
				.where('items.is_deleted', false)
				.where('item_groups.is_deleted', false);

			return !!check;
		} catch (e) {
			throw e;
		}
	}

	async getMember(membershipId: number) {
		try {
			const [member] = await this.knex
				.select('*')
				.from('members')
				.where('id', membershipId);

			return keysToCamel(member);
		} catch (e) {
			throw e;
		}
	}

	async deleteMember(membershipId: number) {
		try {
			await this.knex('members').delete().where('id', membershipId);
			return;
		} catch (e) {
			throw e;
		}
	}

	async createMember(projectId: number, userId: number) {
		try {
			const [member] = await this.knex('members')
				.insert({
					user_id: userId,
					project_id: projectId
				})
				.returning('*');

			return !!member;
		} catch (e) {
			throw e;
		}
	}

	async getMemberList(userId: number) {
		const txn = await this.knex.transaction();

		try {
			const memberList = await txn
				.with('projects', (qb) => {
					qb.select(
						'projects.id as project_id',
						'projects.name as project_name',
						'projects.creator_id',
						'projects.is_deleted'
					)
						.from('projects')
						.where('creator_id', userId);
				})
				.with('members', (qb) => {
					qb.select(
						'members.id as membership_id',
						'members.project_id',
						'members.user_id as member_user_id',
						'members.avatar as avatar'
					).from('members');
				})
				.select(
					'users.id as member_id',
					'users.last_name',
					'users.first_name',
					'users.username',
					txn.raw('JSON_agg(members.*) as members'),
					txn.raw('JSON_agg(projects.*) as projects')
				)
				.from('projects')
				.where('projects.creator_id', userId)
				.where('projects.is_deleted', false)
				.join('members', 'members.project_id', 'projects.project_id')
				.join('users', 'members.member_user_id', 'users.id')
				.groupBy('users.id');

			await txn.commit();
			return keysToCamel(memberList);
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async changeAvatar(membershipId: number[], avatar: number) {
		const txn = await this.knex.transaction();

		try {
			for (let id of membershipId) {
				await txn('members')
					.update({
						avatar
					})
					.where('id', id)
					.returning('*');
			}

			await txn.commit();
			return;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
