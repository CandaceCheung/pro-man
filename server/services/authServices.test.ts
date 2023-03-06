import Knex from 'knex';
import { AuthService } from './authServices';
import bcrypt from 'bcryptjs';

const knexConfig = require('../knexfile');
const knex = Knex(knexConfig['test']);

describe('AuthService', () => {
	let authService: AuthService;

	beforeEach(async () => {
		jest.resetAllMocks();
		authService = new AuthService(knex);
		await knex
			.insert([
				{
					username: 'test1',
					password: 'abcd',
					role: 'admin',
					first_name: 'Test',
					last_name: 'One'
				},
				{
					username: 'test2',
					password: 'efgh',
					role: 'admin',
					first_name: 'Test',
					last_name: 'Two'
				}
			])
			.into('users');
	});

	describe('login', () => {
		it('should return user details when password is correct', async () => {
			jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
			const user = await authService.login('test1', 'abcd');

			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('created_at');
			expect(user).toHaveProperty('updated_at');
			expect(user).toMatchObject({
				username: 'test1',
				role: 'admin',
				first_name: 'Test',
				last_name: 'One'
			});
			expect(bcrypt.compareSync).toBeCalledTimes(1);
		});
		it('should return nothing when login is not success', async () => {
			jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false);
			const user = await authService.login('test1', 'wrong password');

			expect(user).toBeUndefined();
			expect(bcrypt.compareSync).toBeCalledTimes(1);
		});
	});

	describe('signup', () => {
		it('should return true when signup is successful', async () => {
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');

			// Record tables content before calling service for comparison
			const types = await knex('types');
			const typePersons = await knex('type_persons');
			const typeDates = await knex('type_dates');
			const typeTimes = await knex('type_times');
			const typeMoney = await knex('type_money');
			const typeStatus = await knex('type_status');
			const typeText = await knex('type_text');
			const transactions = await knex('transactions');

			const result = await authService.signUp('test3', 'password', 'Test', 'Three');

			// Check database
			const users = await knex('users').where('username', 'test3');
			expect(users.length).toBe(1);
			expect(users[0]).toMatchObject({
				password: 'hashedPassword',
				first_name: 'Test',
				last_name: 'Three',
				role: 'user'
			});

			const projects = await knex('projects').where('creator_id', users[0].id);
			expect(projects.length).toBe(1);
			expect(projects[0]).toMatchObject({
				name: 'New Project',
				is_deleted: false
			});

			expect(await knex('members').where('user_id', users[0].id).andWhere('project_id', projects[0].id)).toBeDefined();

			const itemGroups = await knex('item_groups').where('project_id', projects[0].id);
			expect(itemGroups.length).toBe(1);
			expect(itemGroups[0]).toMatchObject({
				name: 'New Group'
			});

			const states = await knex('states').where('project_id', projects[0].id);
			const defaultStates = ['Empty', 'Stuck', 'Done', 'Working on it', 'Checking'];
			const statusLabelsColor = ['#C4C4C4', '#FDAB3D', '#E2445C', '#00C875', '#0086C0', '#A25DDC', '#037F4C', '#579BFC', '#CAB641', '#FFCB00'];
			expect(states.length).toBe(defaultStates.length);
			for (let j in defaultStates) {
				expect(states[j]).toMatchObject({
					name: defaultStates[j],
					color: statusLabelsColor[j]
				});
			}

			const items = await knex('items').where({
				creator_id: users[0].id,
				project_id: projects[0].id,
				item_group_id: itemGroups[0].id
			});
			expect(items.length).toBe(1);
			expect(items[0]).toMatchObject({
				name: 'New Item',
				is_deleted: false,
				order: 1
			});

			// table content after calling the service to compare
			const newTypes = await knex('types');
			const newTypePersons = await knex('type_persons');
			const newTypeDates = await knex('type_dates');
			const newTypeTimes = await knex('type_times');
			const newTypeMoney = await knex('type_money');
			const newTypeStatus = await knex('type_status');
			const newTypeText = await knex('type_text');
			const newTransactions = await knex('transactions');

			expect(newTypes.length).toBe(types.length + 6);
			expect(newTypePersons.length).toBe(typePersons.length + 1);
			expect(newTypeDates.length).toBe(typeDates.length + 1);
			expect(newTypeTimes.length).toBe(typeTimes.length + 1);
			expect(newTypeMoney.length).toBe(typeMoney.length + 1);
			expect(newTypeStatus.length).toBe(typeStatus.length + 1);
			expect(newTypeText.length).toBe(typeText.length + 1);
			expect(newTransactions.length).toBe(transactions.length + 1);

			// Check service output
			expect(result).toBeTruthy();
			expect(bcrypt.hashSync).toBeCalledTimes(1);
		});

		it('should return false when signup is not successful', async () => {
			jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedPassword');
			const result = await authService.signUp('test1', 'password', 'first', 'last');
			expect(result).toBeFalsy();
			expect(bcrypt.hashSync).toBeCalledTimes(0);
		});
	});

	describe('getUser', () => {
		it('should return a user by id', async () => {
			// Insert the data for testing
			const insertUser = {
				username: 'testGetUser',
				password: 'abcd',
				role: 'admin',
				first_name: 'Test',
				last_name: 'One'
			}
			const id = (await knex('users').insert(insertUser).returning('id'))[0].id;
			
			// Removing password field to set expectedUser
			const { password, ...expectedUser } = insertUser;
			const actualUser = await authService.getUser(id);
			expect(actualUser).toMatchObject(expectedUser);
		});

		it('should return undefined when user does not exist', async () => {
			const id = -1;
			const actualUser = await authService.getUser(id);

			expect(actualUser).toBeUndefined();
		});
	});

	afterEach(async () => {
		await knex('transactions').delete();
		await knex('type_text').delete();
		await knex('type_money').delete();
		await knex('type_status').delete();
		await knex('type_times').delete();
		await knex('type_dates').delete();
		await knex('type_persons').delete();
		await knex('items').delete();
		await knex('item_groups').delete();
		await knex('members').delete();
		await knex('states').delete();
		await knex('projects').delete();
		await knex('users').delete();
	});

	afterAll(async () => {
		await knex.destroy();
	});
});
