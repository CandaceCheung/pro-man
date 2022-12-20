import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export class ProfileService {
	constructor(private knex: Knex) {}

	async getProfileInfo(user_Id: number) {
		const userDetail = await this.knex
			.select(
				'users.id',
				'users.username',
				'users.first_name',
				'users.last_name'
			)
			.from('users')
			.where('id', user_Id);
		return userDetail;
	}

	async updateProfile(
		user_Id: number,
		{
			password,
			firstName,
			lastName
		}: { password?: string; firstName?: string; lastName?: string }
	) {
		const txn = await this.knex.transaction();

		try {
			let hashedPassword;
			if (password) {
				hashedPassword = bcrypt.hashSync(password, 10);
			}
			if (password || firstName || lastName) {
				await txn
					.update({
						first_name: firstName,
						last_name: lastName,
						password: hashedPassword
					})
					.from('users')
					.where('id', user_Id);
			}

			await txn.commit();
            
		} catch (e) {
			await txn.rollback();
			throw e;
		}
	}
}
