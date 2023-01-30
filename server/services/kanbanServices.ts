import { Knex } from 'knex';
import { format } from 'date-fns';
import { getRandomColor } from '../seeds/users-info';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getKanbanInfo(project_Id: number) {
		const kanbanDetail = await this.knex
			.with('items', (qb) => {
				qb.select('items.id as id', 'items.name as name', 'type_dates.datetime as date', this.knex.raw('JSON_AGG(type_persons.name) as "membersList"'))
					.from('items')
					.join('type_persons', 'type_persons.item_id', 'items.id')
					.join('type_dates', 'type_dates.item_id', 'items.id')
					.join('item_groups', 'items.item_group_id', 'item_groups.id')
					.groupBy('items.id')
					.groupBy('type_dates.datetime')
					.where('items.project_id', project_Id)
					.where('items.is_deleted', false)
					.where('item_groups.is_deleted', false);
			})
			.select('states.id as id', 'states.name as name', 'states.color as color', 'states.status_order as order', this.knex.raw('JSON_AGG(items.*) as "itemsList"'))
			.from('states')
			.join('projects', 'states.project_id', '=', 'projects.id')
			.leftJoin('type_status', 'type_status.state_id', '=', 'states.id')
			.leftJoin('items', 'type_status.item_id', '=', 'items.id')
			.where('states.project_id', project_Id)
			.groupBy('states.id')
			.orderBy('states.status_order');

		// filter the deleted items (null)
		for (const status of kanbanDetail) {
			status.itemsList = status.itemsList.filter((item: any) => item !== null);
		}

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
			.select('users.id', 'users.username', 'users.first_name as firstName', 'users.last_name as lastName')
			.from('users')
			.join('members', 'members.user_id', '=', 'users.id')
			.where('members.project_id', project_Id);
		return membersList;
	}

	async getGroupList(project_Id: number) {
		const groupsList = await this.knex.select('item_groups.id', 'item_groups.name').from('item_groups').where('item_groups.project_id', project_Id);
		return groupsList;
	}

	async addKanbanitem(projectId: number, stateId: number, userId: number, itemName: string, memberName: string[], memberId: string[], date: Date, groupId: number) {
		const [{ previousItemId }] = await this.knex('items').select('id as previousItemId').where('item_group_id', groupId).limit(1);

		const types = await this.knex
			.select('types.id as typesId')
			.distinctOn('typesId')
			.from('items')
			.join('type_persons', 'type_persons.item_id', '=', 'items.id')
			.join('type_dates', 'type_dates.item_id', '=', 'items.id')
			.join('type_times', 'type_times.item_id', '=', 'items.id')
			.join('type_money', 'type_money.item_id', '=', 'items.id')
			.join('type_status', 'type_status.item_id', '=', 'items.id')
			.join('type_text', 'type_text.item_id', '=', 'items.id')
			.join('types', function () {
				this.on('type_text.type_id', '=', 'types.id')
					.orOn('type_status.type_id', '=', 'types.id')
					.orOn('type_money.type_id', '=', 'types.id')
					.orOn('type_times.type_id', '=', 'types.id')
					.orOn('type_dates.type_id', '=', 'types.id')
					.orOn('type_persons.type_id', '=', 'types.id');
			})
			.where('items.id', previousItemId)
			.orderBy('types.id', 'asc');

		const typesId_persons = types[0].typesId;
		const typesId_dates = types[1].typesId;
		const typesId_times = types[2].typesId;
		const typesId_money = types[3].typesId;
		const typesId_status = types[4].typesId;
		const typesId_text = types[5].typesId;

		const txn = await this.knex.transaction();
		try {
			await txn('items').where('item_group_id', groupId).increment('order', 1);

			const [{ itemId }] = await txn
				.insert({
					name: itemName,
					creator_id: userId,
					project_id: projectId,
					item_group_id: groupId,
					is_deleted: false,
					order: 1
				})
				.into('items')
				.returning('id as itemId');

			for (const id in memberId) {
				const user_id = memberId[id];
				const name = memberName[id];
				await txn
					.insert({
						name: name,
						user_id: parseInt(user_id),
						type_id: typesId_persons,
						item_id: itemId
					})
					.into('type_persons');
			}

			await txn
				.insert({
					datetime: format(new Date(date), 'yyyy-MM-dd'),
					color: getRandomColor(),
					type_id: typesId_dates,
					item_id: itemId
				})
				.into('type_dates');
			await txn
				.insert({
					start_date: new Date(new Date().toDateString()).getTime(),
					end_date: new Date(new Date().toDateString()).getTime() + 86400000,
					color: getRandomColor(),
					type_id: typesId_times,
					item_id: itemId
				})
				.into('type_times');
			const [{ typeMoneyId }] = await txn
				.insert({
					type_id: typesId_money,
					item_id: itemId
				})
				.into('type_money')
				.returning('id as typeMoneyId');
			await txn
				.insert({
					state_id: stateId,
					type_id: typesId_status,
					item_id: itemId
				})
				.into('type_status');
			await txn
				.insert({
					text: '',
					type_id: typesId_text,
					item_id: itemId
				})
				.into('type_text');

			await txn
				.insert({
					date: format(new Date(Date.now()), 'yyyy-MM-dd'),
					cash_flow: 0,
					type_money_id: typeMoneyId
				})
				.into('transactions');

			await txn.commit();

			return itemId;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async reorderKanban(order: number[]) {
		const txn = await this.knex.transaction();
		try {
			for (let i in order) {
				await txn
					.update({ status_order: parseInt(i) + 1 })
					.from('states')
					.where('id', order[i]);
			}

			await txn.commit();
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
