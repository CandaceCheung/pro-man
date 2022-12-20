import { Knex } from 'knex';

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
			.from('users').where('id',user_Id);
        return userDetail;
	}
}
