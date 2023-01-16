import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('states', (table) => {
		table.integer('status_order');
	});

	await knex.schema.dropTable('kanban_order');
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('states', (table) => {
		table.integer('status_order_id');
	});

	await knex.schema.createTable('kanban_order', () => {});
}
