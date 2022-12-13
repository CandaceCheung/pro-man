import { Knex } from 'knex';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getKanbanInfo(project_id: number) {
		const kanbanDetail = await this.knex
			.select(
				'projects.id as project_id',
				'items.id as item_id',
				'items.name as item_name',
				'type_dates.datetime as item_dates_datetime',
				'states.id as state_id',
				'states.name as item_status_name',
				'states.color as itemStatusColor',
				'kanban_order.item_id_order as kanbanColumnOrder'
			)
			.from('states')
			.join('projects', 'states.project_id', '=', 'projects.id')
			.join('type_status', 'type_status.state_id', '=', 'states.id')
			.join('items','type_status.item_id', '=', 'items.id')
			.join('type_dates', 'type_dates.item_id', '=', 'items.id')
			.join('kanban_order', 'kanban_order.state_id', '=', 'states.id')
			.where('projects.id', project_id);
			

		return kanbanDetail;
	}

	async changeKanbanOrder(kanban_order: number) {
		const column_order = await this.knex('kanban_order').where(
			'kanban_order.id'
		);

		return column_order;
	}
}
