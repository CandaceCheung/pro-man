import { Knex } from 'knex';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getMemberInfo(item_id: number) {
		const itemCreator = await this.knex
			.select('users.id as user_id')
			.from('items')
			.join('users', '', '=', '')
			.where('user');

		return itemCreator;
	}

	async getKanbanInfo(project_id: number) {
		const kanbanDetail = await this.knex
			.select('projects.id as project_id')
			.from('states')
			.join('type_status', 'type_status.state_id', '=', 'states.id')
			.join('projects', 'states.project_id', '=', 'projects.id')
			.where('projects.id', '=', project_id);

		return kanbanDetail;
	}
}
