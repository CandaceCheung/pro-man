import { format } from 'date-fns';
import { Knex } from 'knex';
import { getRandomColor } from '../seeds/users-info';

export class TableService {
	constructor(private knex: Knex) {}

	async getTableInfo(userID: number, projectID: number) {
		const projectsDetail = await this.knex
			.select(
				'projects.name as project_name',
				'projects.id as project_id',
				'projects.is_deleted as project_is_deleted',
				'users.id as user_id',
				'users.role',
				'projects.creator_id as project_creator_id',
				'members.project_id as joined_project_id',
				'items.id as item_id',
				'items.name as item_name',
				'items.creator_id as item_creator_id',
				'items.is_deleted as item_is_deleted',
				'items.order as vertical_order',
				'items.item_group_id',
				'item_groups.name as item_group_name',
				'type_persons.name as item_person_name',
				'type_persons.id as item_person_id',
				'type_persons.user_id as item_person_user_id',
				'type_dates.datetime as item_dates_datetime',
				'type_dates.color as item_datetime_color',
				'type_dates.id as item_datetime_id',
				'type_times.start_date as item_times_start_date',
				'type_times.end_date as item_times_end_date',
				'type_times.color as item_times_color',
				'type_times.id as item_times_id',
				'transactions.date as item_money_date',
				'transactions.cash_flow as item_money_cashflow',
				'transactions.id as transaction_id',
				'states.name as item_status_name',
				'states.color as item_status_color',
				'states.id as state_id',
				'type_text.id as item_text_id',
				'type_text.text as item_text_text',
				'types.order as horizontal_order',
				'types.name as element_name',
				'types.type as type_name',
				'types.id as horizontal_order_id'
			)
			.select(this.knex.raw(`to_char(type_dates.datetime, 'Mon DD, YYYY') as item_dates_date`))
			.from('members')
			.join('users', 'members.user_id', '=', 'users.id')
			.join('projects', 'members.project_id', '=', 'projects.id')
			.join('items', 'items.project_id', '=', 'projects.id')
			.join('item_groups', 'items.item_group_id', '=', 'item_groups.id')
			.join('type_persons', 'type_persons.item_id', '=', 'items.id')
			.join('type_dates', 'type_dates.item_id', '=', 'items.id')
			.join('type_times', 'type_times.item_id', '=', 'items.id')
			.join('type_money', 'type_money.item_id', '=', 'items.id')
			.join('transactions', 'transactions.type_money_id', '=', 'type_money.id')
			.join('type_status', 'type_status.item_id', '=', 'items.id')
			.join('states', 'type_status.state_id', '=', 'states.id')
			.join('type_text', 'type_text.item_id', '=', 'items.id')
			.join('types', function () {
				this.on('type_text.type_id', '=', 'types.id')
					.orOn('type_status.type_id', '=', 'types.id')
					.orOn('type_money.type_id', '=', 'types.id')
					.orOn('type_times.type_id', '=', 'types.id')
					.orOn('type_dates.type_id', '=', 'types.id')
					.orOn('type_persons.type_id', '=', 'types.id');
			})
			.where('users.id', userID)
			.andWhere('projects.id', projectID)
			.andWhere('items.is_deleted', false)
			.andWhere('item_groups.is_deleted', false)
			.andWhere('projects.is_deleted', false)
			.orderBy('project_id', 'asc')
			.orderBy('item_group_id', 'desc')
			.orderBy('vertical_order', 'asc')
			.orderBy('horizontal_order', 'asc')
			.orderBy('item_person_id', 'asc')
			.orderBy('item_money_date', 'asc');

		return projectsDetail;
	}

	async getTableList(userId: number) {
		const tableList = await this.knex
			.select('projects.creator_id as creator_id', 'projects.id as project_id', 'projects.name as project_name', 'members.id as member_table_id', 'users.username as username')
			.from('members')
			.join('users', 'members.user_id', '=', 'users.id')
			.join('projects', 'members.project_id', '=', 'projects.id')
			.where('members.user_id', '=', userId)
			.andWhere('projects.is_deleted', false)
			.orderBy('project_id', 'asc');

		return tableList;
	}

	async getLikeStatus(userId: number, projectId: number) {
		const [likeStatus] = await this.knex.select('*').from('favorite').where('favorite.user_id', userId).andWhere('favorite.project_id', projectId).limit(1);

		return likeStatus;
	}
	async deleteLike(userId: number, projectId: number) {
		await this.knex('favorite').del().where('favorite.user_id', userId).andWhere('favorite.project_id', projectId);

		return;
	}
	async likeProject(userId: number, projectId: number) {
		await this.knex('favorite').insert({
			user_id: userId,
			project_id: projectId
		});
		return;
	}

	async getFavorite(userId: number) {
		const favoriteList = await this.knex
			.select('projects.creator_id as creator_id', 'favorite.user_id as user_id', 'projects.id as project_id', 'projects.name as project_name', 'favorite.id as favorite_id')
			.from('favorite')
			.join('projects', 'favorite.project_id', '=', 'projects.id')
			.where('favorite.user_id', '=', userId);

		return favoriteList;
	}

	async getProjectStatus(projectId: number) {
		const statusList = await this.knex('states').select('id', 'name', 'color').where('project_id', projectId).orderBy('id', 'asc');
		return statusList;
	}

	async updateTimelineService(id: number, start: number, end: number, name: string, color: string) {
		const txn = await this.knex.transaction();
		try {
			const typeId = await txn('type_times')
				.update({
					start_date: start,
					end_date: end,
					color
				})
				.where('id', id)
				.returning('type_id');

			await txn('types')
				.update({
					name
				})
				.where('id', typeId[0].type_id);

			await txn.commit();
			return typeId[0].type_id;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async updateDatelineService(id: number, date: number, name: string, color: string) {
		const txn = await this.knex.transaction();
		try {
			const typeId = await txn('type_dates')
				.update({
					datetime: format(new Date(date), 'yyyy-MM-dd'),
					color
				})
				.where('id', id)
				.returning('type_id');

			await txn('types')
				.update({
					name
				})
				.where('id', typeId[0].type_id);

			await txn.commit();
			return typeId[0].type_id;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async updateItemGroupName(id: number, name: string) {
		await this.knex('item_groups')
			.update({
				name: name
			})
			.where('id', id);
	}

	async reorderItems(newOrder: number[]) {
		const txn = await this.knex.transaction();
		try {
			for (const i in newOrder) {
				const itemId = newOrder[i];
				await this.knex('items')
					.where('id', itemId)
					.update({ order: parseInt(i) + 1 });
			}
			await txn.commit();
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async reorderTypes(newOrder: number[]) {
		const txn = await this.knex.transaction();
		try {
			for (const i in newOrder) {
				const typeId = newOrder[i];
				await txn('types')
					.where('id', typeId)
					.update({ order: parseInt(i) + 1 });
			}
			await txn.commit();
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async renameItem(itemId: number, newName: string) {
		await this.knex('items')
			.update({
				name: newName
			})
			.where('id', itemId);
	}

	async renameType(typeId: number, newName: string) {
		await this.knex('types')
			.update({
				name: newName
			})
			.where('id', typeId);
	}

	async updateText(itemId: number, text: string) {
		await this.knex('type_text')
			.update({
				text: text
			})
			.where('item_id', itemId);
	}

	async renameProject(projectId: number, projectName: string) {
		await this.knex('projects')
			.update({
				name: projectName
			})
			.where('id', projectId);
	}

	async updateState(itemId: number, stateId: number) {
		const [state] = await this.knex('states').select('name', 'color').where('id', stateId);
		await this.knex('type_status')
			.update({
				state_id: stateId
			})
			.where('item_id', itemId);
		return {
			name: state.name,
			color: state.color
		};
	}

	async insertItem(projectId: number, userId: number, itemGroupId?: number, typesInput?: Array<{typesId: number; typesName: string; elementName: string}>, itemName?: string) {
		console.log(projectId, userId, itemGroupId, typesInput, itemName);
		const [{ username }] = await this.knex('users').select('username').where('id', userId);
		const [{ stateId }] = await this.knex('states').select('id as stateId').where('project_id', projectId).orderBy('stateId').limit(1);
		let groupId = itemGroupId;
		if (!groupId) {
			const [{ oldGroupId }] = await this.knex('item_groups').select('id as oldGroupId').where('project_id', projectId).andWhere('is_deleted', false).orderBy('oldGroupId', 'desc').limit(1);
			groupId = oldGroupId;
		}
		const txn = await this.knex.transaction();

		try {
			let types = typesInput;
			if (!types) {
				const [{ previousItemId }] = await this.knex('items').select('id as previousItemId').where('item_group_id', groupId).limit(1);
				types = await this.knex
					.select('types.id as typesId', 'types.type as typesName', 'types.name as elementName')
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
			}

			const typesIdPersons = types[0].typesId;
			const typesIdDates = types[1].typesId;
			const typesIdTimes = types[2].typesId;
			const typesIdMoney = types[3].typesId;
			const typesIdStatus = types[4].typesId;
			const typesIdText = types[5].typesId;

			await txn('items').where('item_group_id', groupId).increment('order', 1);

			const [{ itemId }] = await txn
				.insert({
					name: itemName || 'New Item',
					creator_id: userId,
					project_id: projectId,
					item_group_id: groupId,
					is_deleted: false,
					order: 1
				})
				.into('items')
				.returning('id as itemId');

			await txn
				.insert({
					name: username,
					user_id: userId,
					type_id: typesIdPersons,
					item_id: itemId
				})
				.into('type_persons');
			const date = format(new Date(Date.now()), 'yyyy-MM-dd');
			const [{ datetime }] = await txn
				.insert({
					datetime: date,
					color: getRandomColor(),
					type_id: typesIdDates,
					item_id: itemId
				})
				.into('type_dates')
				.returning('datetime');
			const [times] = await txn
				.insert({
					start_date: new Date(new Date().toDateString()).getTime(),
					end_date: new Date(new Date().toDateString()).getTime() + 86400000,
					color: getRandomColor(),
					type_id: typesIdTimes,
					item_id: itemId
				})
				.into('type_times')
				.returning(
					['start_date as startDate',
					'end_date as endDate']
				);
				console.log(times)
			const [{ typeMoneyId }] = await txn
				.insert({
					type_id: typesIdMoney,
					item_id: itemId
				})
				.into('type_money')
				.returning('id as typeMoneyId');
			await txn
				.insert({
					state_id: stateId,
					type_id: typesIdStatus,
					item_id: itemId
				})
				.into('type_status');
			const [{text}] = await txn
				.insert({
					text: '',
					type_id: typesIdText,
					item_id: itemId
				})
				.into('type_text')
				.returning('text');

			const [transactions] = await txn
				.insert({
					date: format(new Date(Date.now()), 'yyyy-MM-dd'),
					cash_flow: 0,
					type_money_id: typeMoneyId
				})
				.returning([
					'id', 'cash_flow as cashFlow', 'date'
				])
				.into('transactions');

				const [{ stateColor, stateName }] = await this.knex.select(
					'color as stateColor',
					'name as stateName'
				).from('states')
				.where('id', stateId);
	
				let itemCells = {};
				itemCells[groupId!] = {};
				itemCells[groupId!][itemId] = {};
				types.forEach((type) => {
					const typeId = type.typesId;
					itemCells[groupId!][itemId][typeId] = {
						item_id: itemId,
						item_name: itemName || 'New Item',
						type_id: type.typesId,
						type_name: type.typesName,
						element_name: type.elementName
					}
					switch (type.typesName) {
						case 'persons':
							itemCells[groupId!][itemId][typeId]['item_person_user_id'] = [userId];
							break;
						case 'dates':
							itemCells[groupId!][itemId][typeId]['item_dates_datetime'] = datetime;
							itemCells[groupId!][itemId][typeId]['item_dates_date'] = date;
							break;
						case 'times':
							itemCells[groupId!][itemId][typeId]['item_times_start_date'] = times.startDate;
							itemCells[groupId!][itemId][typeId]['item_times_end_date'] = times.endDate;
							break;
						case "money":
							itemCells[groupId!][itemId][typeId]['transaction_id'] = [transactions.id];
							itemCells[groupId!][itemId][typeId]['item_money_cashflow'] = [transactions.cashFlow];
							itemCells[groupId!][itemId][typeId]['item_money_date'] = transactions.date;
							break;
						case "status":
							itemCells[groupId!][itemId][typeId]['item_status_color'] = stateColor;
							itemCells[groupId!][itemId][typeId]['item_status_name'] = stateName;
							break;
						case "text":
							itemCells[groupId!][itemId][typeId]['item_text_text'] = text;
							break;
						default:
							break
					}
				});
			await txn.commit();
			return itemCells;
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async insertItemGroup(projectId: number, userId: number) {
		const txn = await this.knex.transaction();
		let itemGroupId: number;
		let itemGroupName: string;
		let type: {
			typesId: number,
			typesName: string,
			elementName: string
		}[];
		try {
			[{itemGroupId, itemGroupName}] = await txn
				.insert({
					project_id: projectId,
					name: 'New Group'
				})
				.into('item_groups')
				.returning([
					'id as itemGroupId',
					'name as itemGroupName'
				]);

			type = await txn
				.insert([
					{ type: 'persons', name: 'Persons', order: 1 },
					{ type: 'dates', name: 'Dates', order: 2 },
					{ type: 'times', name: 'Times', order: 3 },
					{ type: 'money', name: 'Money', order: 4 },
					{ type: 'status', name: 'Status', order: 5 },
					{ type: 'text', name: 'Text', order: 6 }
				])
				.into('types')
				.returning(
					['id as typesId', 'type as typesName', 'name as elementName']
				)
				.orderBy('typesId');
			await txn.commit();
		} catch (e) {
			await txn.rollback();
			throw e;
		}
		try {
			const itemCells = await this.insertItem(projectId, userId, itemGroupId, type);
			const typeIds = type.map((each) => each.typesId);
			return {
				itemCells,
				itemGroupId,
				itemGroupName,
				typeIds
			};
		} catch(e) {
			// Revert the previous inserts
			for (let each of type) {
				const typeId = each.typesId;
				await this.knex("types").where("id", typeId).del();
			}
			await this.knex("item_groups").where("id", itemGroupId).del();
			throw(e);
		}
	}

	async insertNewProject(userId: number) {
		const [{ username }] = await this.knex('users').select('username').where('id', userId);
		const txn = await this.knex.transaction();
		try {
			const [{ project_id, project_name }] = await txn('projects')
				.insert({
					name: 'New Project',
					creator_id: userId,
					is_deleted: false
				})
				.returning(['id as project_id', 'name as project_name']);
			const [{ member_table_id }] = await txn('members')
				.insert({
					user_id: userId,
					project_id
				})
				.returning('id as member_table_id');
			const [{ item_group_id }] = await txn('item_groups')
				.insert({
					project_id,
					name: 'New Group'
				})
				.returning('id as item_group_id');
			const defaultStates = ['Empty', 'Stuck', 'Done', 'Working on it', 'Checking'];
			const statusLabelsColor = ['#C4C4C4', '#FDAB3D', '#E2445C', '#00C875', '#0086C0', '#A25DDC', '#037F4C', '#579BFC', '#CAB641', '#FFCB00'];
			let state_id = null;
			for (let j in defaultStates) {
				if (j === '0') {
					[{ state_id }] = await txn('states')
						.insert({
							name: defaultStates[j],
							color: statusLabelsColor[j],
							project_id
						})
						.returning('id as state_id');
				} else {
					await txn('states').insert({
						name: defaultStates[j],
						color: statusLabelsColor[j],
						project_id
					});
				}
			}
			const [{ item_id }] = await txn('items')
				.insert({
					name: 'New Item',
					creator_id: userId,
					project_id,
					item_group_id,
					is_deleted: false,
					order: 1
				})
				.returning('id as item_id');
			const types_ids = await txn
				.insert([
					{ type: 'persons', name: 'Persons', order: 1 },
					{ type: 'dates', name: 'Dates', order: 2 },
					{ type: 'times', name: 'Times', order: 3 },
					{ type: 'money', name: 'Money', order: 4 },
					{ type: 'status', name: 'Status', order: 5 },
					{ type: 'text', name: 'Text', order: 6 }
				])
				.into('types')
				.returning('id');
			const typesId_persons = types_ids[0].id;
			const typesId_dates = types_ids[1].id;
			const typesId_times = types_ids[2].id;
			const typesId_money = types_ids[3].id;
			const typesId_status = types_ids[4].id;
			const typesId_text = types_ids[5].id;
			await txn
				.insert({
					name: username,
					user_id: userId,
					type_id: typesId_persons,
					item_id
				})
				.into('type_persons');
			await txn
				.insert({
					datetime: format(new Date(Date.now()), 'yyyy-MM-dd'),
					color: getRandomColor(),
					type_id: typesId_dates,
					item_id
				})
				.into('type_dates');
			await txn
				.insert({
					start_date: new Date(new Date().toDateString()).getTime(),
					end_date: new Date(new Date().toDateString()).getTime() + 86400000,
					color: getRandomColor(),
					type_id: typesId_times,
					item_id
				})
				.into('type_times');
			const [{ typeMoneyId }] = await txn
				.insert({
					type_id: typesId_money,
					item_id
				})
				.into('type_money')
				.returning('id as typeMoneyId');
			await txn
				.insert({
					state_id,
					type_id: typesId_status,
					item_id
				})
				.into('type_status');
			await txn
				.insert({
					text: '',
					type_id: typesId_text,
					item_id
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
			return { project_id, project_name, member_table_id, username };
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}

	async retrieveUserName(userId: number) {
		const [names] = await this.knex('users').select('first_name', 'last_name').where('id', userId);
		return names.first_name && names.last_name && names;
	}

	async addState(projectId: number, name: string, color: string) {
		const [{ status_order }] = await this.knex('states').select('status_order').where('project_id', projectId).orderBy('status_order', 'desc').limit(1);
		const [{ id }] = await this.knex('states')
			.insert({
				name,
				color,
				project_id: projectId,
				status_order: status_order + 1
			})
			.returning('id');
		return id;
	}
	async addPerson(itemId: number, personId: number, typeId: number) {
		const [{ username }] = await this.knex('users').select('username').where('id', personId);
		await this.knex('type_persons').insert({
			name: username,
			user_id: personId,
			type_id: typeId,
			item_id: itemId
		});
	}
	async addTransaction(date: string, cashFlow: number, itemId: number) {
		const [{ type_money_id }] = await this.knex('type_money').select('id as type_money_id').where('item_id', itemId);
		const [{ id }] = await this.knex('transactions')
			.insert({
				date,
				cash_flow: cashFlow,
				type_money_id
			})
			.returning('id');
		return id;
	}
	async removePerson(itemId: number, personId: number) {
		const ids = await this.knex('type_persons').where('item_id', itemId);
		if (ids.length <= 1) {
			return false;
		}
		await this.knex('type_persons')
			.where({
				item_id: itemId,
				user_id: personId
			})
			.del();
		return true;
	}
	async removeTransaction(itemId: number, transactionId: number) {
		const ids = await this.knex.select('transactions.id').from('type_money').join('transactions', 'transactions.type_money_id', '=', 'type_money.id').where('type_money.item_id', itemId);
		if (ids.length <= 1) {
			return false;
		}
		await this.knex('transactions')
			.where({
				id: transactionId
			})
			.del();
		return true;
	}
	async deleteItem(itemId: number, groupId: number) {
		const itemIds = await this.knex('items').select('id').where('item_group_id', groupId).andWhere('is_deleted', false);
		if (itemIds.length <= 1) {
			return false;
		}
		await this.knex('items')
			.update({
				is_deleted: true
			})
			.where('id', itemId);
		return true;
	}
	async deleteItemGroup(groupId: number, projectId: number) {
		const itemGroupIds = await this.knex('item_groups').select('id').where('project_id', projectId).andWhere('is_deleted', false);
		if (itemGroupIds.length <= 1) {
			return false;
		}
		await this.knex('item_groups')
			.update({
				is_deleted: true
			})
			.where('id', groupId);
		return true;
	}
	async deleteProject(projectId: number, userId: number) {
		const projectIds = await this.knex('projects').select('id').where('creator_id', userId).andWhere('is_deleted', false);
		if (projectIds.length <= 1) {
			return false;
		}
		await this.knex('projects')
			.update({
				is_deleted: true
			})
			.where('id', projectId);
		return true;
	}
}
