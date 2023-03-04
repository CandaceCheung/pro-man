import Knex from 'knex';
import { AuthService } from './authServices';
import bcrypt from 'bcryptjs';

const knexConfig = require('../knexfile');
const knex = Knex(knexConfig['test']);

describe('AuthService', () => {
	let authService: AuthService;
	let authIds: number[];

	beforeEach(async () => {
		jest.resetAllMocks();
		authService = new AuthService(knex);
		authIds = (
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
				.into('users')
				.returning('id')
		).map((user) => user.id);
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
			const result = await authService.signUp('test3', 'password', 'Test', 'Three');

			// Check DB for the inserts

			expect(result).toBeTruthy();
			expect(bcrypt.hashSync).toBeCalledTimes(1);

			// Clean up created database
		});
	});

	afterEach(async () => {
		await knex('users').whereIn('id', authIds).del();
	});

	afterAll(async () => {
		await knex.destroy();
	});
});
