import Knex from 'knex';
import { AuthService } from './authServices';
import bcrypt from 'bcryptjs';
// import { format } from 'date-fns';
// import { getRandomColor } from '../seeds/users-info';

const knexConfig = require('../knexfile');
const knex = Knex(knexConfig['test']);

jest.mock('bcryptjs');
// jest.mock('date-fns');
// jest.mock('../seeds/users-info');

describe('AuthService', () => {
	let authService: AuthService;
	let authIds: number[];

	beforeEach(async () => {
		(bcrypt.compareSync as jest.Mock).mockReset();
		(bcrypt.compareSync as jest.Mock).mockClear();
		
		authService = new AuthService(knex);
		authIds = (await knex.insert([
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
			},
		]).into('users')
		.returning('id'))
		.map(user => user.id);
	});

	describe('login', () => {
		it('should return user details when password is correct', async () => {
			(bcrypt.compareSync as jest.Mock).mockReturnValue(true);
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
			(bcrypt.compareSync as jest.Mock).mockReturnValue(false);
			const user = await authService.login('test1', 'wrong password');

			expect(user).toBeUndefined();
			expect(bcrypt.compareSync).toBeCalledTimes(1);
		});
	});

	afterEach(async () => {
		await knex('users').whereIn('id', authIds).del();
	});

	afterAll(async () => {
		await knex.destroy();
	});
})