import { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import { format } from 'date-fns';
import { getRandomColor } from '../seeds/users-info';

export class AuthService {
	constructor(private knex: Knex) {}

	async login(username: string, password: string) {
		const [user] = await this.knex('users').where('username', username);
		const isLogin = bcrypt.compareSync(password, user.password);
		if (isLogin) {
			delete user.password;
			return user;
		}
	}

	async signUp(username: string, password: string, firstName: string, lastName: string) {
		const [user] = await this.knex('users').where('username', username);
		if (!user) {
			const txn = await this.knex.transaction();
			try {
				const hashedPassword = bcrypt.hashSync(password, 10);
				const [{ user_id }] = await txn('users')
					.insert({
						username: username,
						password: hashedPassword,
						first_name: firstName.length ? firstName : undefined,
						last_name: lastName.length ? lastName : undefined,
						role: 'user'
					})
					.returning('id as user_id');
				if (user_id) {
					const [{ project_id }] = await txn('projects')
						.insert({
							name: 'New Project',
							creator_id: user_id,
							is_deleted: false
						})
						.returning('id as project_id');
					await txn('members').insert({
						user_id,
						project_id
					});
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
							creator_id: user_id,
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
							user_id,
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
					return 'success';
				}
			} catch (e) {
				await txn.rollback();
				throw e;
			}
		}
		return;
	}

	async getUser(id: number) {
		const [user] = await this.knex('users').where('id', id);
		if (user) {
			delete user.password;
			return user;
		} else {
			return;
		}
	}
}
