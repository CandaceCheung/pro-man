import { Knex } from 'knex';
import { format } from 'date-fns';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getKanbanInfo(project_Id: number) {
		const kanbanDetail = await this.knex
			.with('items', (qb) => {
				qb.select(
					'items.id as id',
					'items.name as name',
					'type_dates.datetime as date',
					this.knex.raw(
						'JSON_AGG(type_persons.name) as "membersList"'
					)
				)
					.from('items')
					.join('type_persons', 'type_persons.item_id', 'items.id')
					.join('type_dates', 'type_dates.item_id', 'items.id')
					.groupBy('items.id')
					.groupBy('type_dates.datetime')
					.where('items.project_id', project_Id);
			})
			.select(
				'states.id as id',
				'states.name as name',
				'states.color as color',
				'states.status_order as order',
				this.knex.raw('JSON_AGG(items.*) as "itemsList"')
			)
			.from('states')
			.join('projects', 'states.project_id', '=', 'projects.id')
			.leftJoin('type_status', 'type_status.state_id', '=', 'states.id')
			.leftJoin('items', 'type_status.item_id', '=', 'items.id')
			.where('states.project_id', project_Id)
			.groupBy('states.id')
			.orderBy('states.status_order');

		// for null status
		kanbanDetail.forEach((state) => {
			if (state.itemsList[0] === null) {
				state.itemsList = [];
			}
		});

		return kanbanDetail;
	}

	async getMemberList(project_Id: number) {
		const membersList = await this.knex
			.select('users.id', 'users.username')
			.from('users')
			.join('members', 'members.user_id', '=', 'users.id')
			.where('members.project_id', project_Id);
		return membersList;
	}

	async getGroupList(project_Id: number) {
		const groupsList = await this.knex
			.select('item_groups.id', 'item_groups.name')
			.from('item_groups')
			.where('item_groups.project_id', project_Id);
		return groupsList;
	}

	async addKanbanitem(
		projectId: number,
		stateId: number,
		userId: number,
		username: string,
		itemName: string,
		typePersonId: number,
		groupId: number,
		date: string
	) {
		const txn = await this.knex.transaction();
		try {
			const addItem = await txn
				.insert({
					name: itemName,
					project_id: projectId,
					item_group_id: groupId
				})
				.into('items')
				.returning('items.id');

			await txn
				.insert({ state_id: stateId, item_id: addItem[0].id })
				.into('type_status');

			await txn
				.insert({
					name: username,
					user_id: userId,
					type_id: typePersonId,
					item_id: addItem[0].id
				})
				.into('type_persons');

			await txn
				.insert({
					datetime: format(new Date(date), 'yyyy-MM-dd'),
					item_id: addItem[0].id
				})
				.into('type_dates');

			await txn.commit();

			return addItem[0].id as number;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async reorderKanban (order: number[]) {
		const txn = await this.knex.transaction();
		try {
			for (let i in order) {
				await txn.update({ status_order:parseInt(i)+1}).from('states').where('id',order[i]);
			}

			await txn.commit();

			
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
