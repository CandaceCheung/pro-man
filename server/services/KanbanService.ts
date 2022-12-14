import { Knex } from 'knex';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getKanbanInfo(project_id: number) {
		const kanbanDetail = await this.knex
		.with('items', (qb) => {
			qb.select(
				'items.id as id',
				'items.name as name',
				this.knex.raw('JSON_AGG(type_persons.name) as membersList')
			)
				.from('items')
				.join('type_persons','type_persons.item_id','items.id')
				.join('type_dates', 'type_dates.item_id', 'items.id')
				.groupBy('items.id')
				.where('items.project_id',project_id);
		})
		.select(
			'states.id as id',
			'states.name as name',
			'states.color as color',
			this.knex.raw('JSON_AGG(items.*) as itemsList')
		)
		.from('states')
		.join('projects', 'states.project_id', '=', 'projects.id')
		.join('kanban_order', 'kanban_order.state_id', '=', 'states.id')
		.join('type_status', 'type_status.state_id', '=', 'states.id')
		.join('items', 'type_status.item_id', '=', 'items.id')
		.where('projects.id', project_id)
		.groupBy('states.id');

		return kanbanDetail;
	}

	async changeKanbanOrder(kanban_order: number) {
		const column_order = await this.knex('kanban_order').where(
			'kanban_order.id'
		);

		return column_order;
	}
}
